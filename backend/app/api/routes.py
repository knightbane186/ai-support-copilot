from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.api.deps import document_store
from app.core.config import get_settings
from app.schemas.documents import DocumentListResponse, DocumentRead, UploadResponse
from app.services.storage import LocalDocumentStore

router = APIRouter()
settings = get_settings()


ALLOWED_EXTENSIONS = {".pdf", ".txt", ".md", ".doc", ".docx"}


def serialize_document(document) -> DocumentRead:
    return DocumentRead(
        id=document.id,
        filename=document.filename,
        content_type=document.content_type,
        size_bytes=document.size_bytes,
        storage_path=document.storage_path,
        status=document.status,
        uploaded_at=datetime.fromisoformat(document.uploaded_at),
    )


@router.get("/health")
def healthcheck() -> dict:
    return {
        "status": "ok",
        "service": settings.app_name,
        "phase": "structure-only",
    }


@router.get("/structure")
def structure() -> dict:
    return {
        "frontend_pages": ["/", "/upload", "/chat", "/admin"],
        "backend_modules": ["api", "core", "db", "models", "schemas", "services"],
        "next_step": "Continue with document processing after upload.",
    }


@router.get("/documents", response_model=DocumentListResponse)
def list_documents(store: LocalDocumentStore = Depends(document_store)) -> DocumentListResponse:
    return DocumentListResponse(items=[serialize_document(item) for item in store.list_documents()])


@router.post("/documents/upload", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile = File(...),
    store: LocalDocumentStore = Depends(document_store),
) -> UploadResponse:
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required.")

    extension = Path(file.filename).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Allowed: PDF, TXT, MD, DOC, DOCX.",
        )

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    max_bytes = settings.max_upload_size_mb * 1024 * 1024
    if len(content) > max_bytes:
        raise HTTPException(
            status_code=400,
            detail=f"File exceeds the {settings.max_upload_size_mb} MB upload limit.",
        )

    stored = store.save_document(
        filename=file.filename,
        content_type=file.content_type,
        content=content,
    )
    return UploadResponse(
        document=serialize_document(stored),
        message="Document uploaded successfully.",
    )
