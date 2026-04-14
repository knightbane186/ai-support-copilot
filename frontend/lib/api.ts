export type DocumentItem = {
  id: string;
  filename: string;
  content_type: string | null;
  size_bytes: number;
  storage_path: string;
  status: string;
  uploaded_at: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

async function handle<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const maybeJson = await response.json().catch(() => ({ detail: "Request failed." }));
    throw new Error(maybeJson.detail ?? "Request failed.");
  }

  return response.json() as Promise<T>;
}

export async function fetchDocuments(): Promise<DocumentItem[]> {
  const response = await fetch(`${API_BASE_URL}/documents`, {
    cache: "no-store"
  });
  const payload = await handle<{ items: DocumentItem[] }>(response);
  return payload.items;
}

export async function uploadDocument(file: File) {
  const form = new FormData();
  form.append("file", file);

  const response = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: "POST",
    body: form
  });

  return handle<{ document: DocumentItem; message: string }>(response);
}
