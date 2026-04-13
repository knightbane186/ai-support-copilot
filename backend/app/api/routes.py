from fastapi import APIRouter

from app.core.config import get_settings

router = APIRouter()
settings = get_settings()

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
        "next_step": "Pick one feature and implement it end-to-end.",
    }
