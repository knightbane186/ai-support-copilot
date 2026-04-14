from app.core.config import get_settings
from app.services.storage import LocalDocumentStore


def document_store() -> LocalDocumentStore:
    settings = get_settings()
    return LocalDocumentStore(
        storage_root=settings.local_storage_path,
        index_path=settings.document_index_path,
    )
