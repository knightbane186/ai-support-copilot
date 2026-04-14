from datetime import datetime

from pydantic import BaseModel


class DocumentRead(BaseModel):
    id: str
    filename: str
    content_type: str | None
    size_bytes: int
    storage_path: str
    status: str
    uploaded_at: datetime


class DocumentListResponse(BaseModel):
    items: list[DocumentRead]


class UploadResponse(BaseModel):
    document: DocumentRead
    message: str
