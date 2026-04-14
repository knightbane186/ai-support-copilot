from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from threading import Lock
from uuid import uuid4


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


@dataclass
class StoredDocument:
    id: str
    filename: str
    content_type: str | None
    size_bytes: int
    storage_path: str
    status: str
    uploaded_at: str


class LocalDocumentStore:
    def __init__(self, storage_root: Path, index_path: Path):
        self.storage_root = storage_root
        self.index_path = index_path
        self._lock = Lock()
        self.storage_root.mkdir(parents=True, exist_ok=True)
        self.index_path.parent.mkdir(parents=True, exist_ok=True)
        if not self.index_path.exists():
            self.index_path.write_text("[]", encoding="utf-8")

    def list_documents(self) -> list[StoredDocument]:
        payload = json.loads(self.index_path.read_text(encoding="utf-8"))
        return [StoredDocument(**item) for item in payload]

    def save_document(self, filename: str, content_type: str | None, content: bytes) -> StoredDocument:
        extension = Path(filename).suffix
        document_id = str(uuid4())
        stored_name = f"{document_id}{extension}"
        target = self.storage_root / stored_name
        target.write_bytes(content)

        document = StoredDocument(
            id=document_id,
            filename=filename,
            content_type=content_type,
            size_bytes=len(content),
            storage_path=str(target),
            status="uploaded",
            uploaded_at=utcnow().isoformat(),
        )

        with self._lock:
            existing = self.list_documents()
            existing.insert(0, document)
            self.index_path.write_text(
                json.dumps([asdict(item) for item in existing], indent=2),
                encoding="utf-8",
            )

        return document
