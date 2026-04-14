"use client";

import { useEffect, useState } from "react";

import { fetchDocuments, uploadDocument, type DocumentItem } from "@/lib/api";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function loadDocuments() {
    try {
      setDocuments(await fetchDocuments());
    } catch {
      setDocuments([]);
    }
  }

  useEffect(() => {
    void loadDocuments();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) {
      setMessage("Choose a file before uploading.");
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const result = await uploadDocument(selectedFile);
      setMessage(`${result.message} File: ${result.document.filename}`);
      setSelectedFile(null);
      event.currentTarget.reset();
      await loadDocuments();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section className="section panel">
      <div className="section-head">
        <div>
          <span className="eyebrow">Step 1</span>
          <h1>Upload internal source documents</h1>
        </div>
      </div>

      <form className="stack" onSubmit={onSubmit}>
        <div className="answer-card">
          <h2>Upload is live</h2>
          <p className="muted">
            You can now upload PDF, DOCX, DOC, TXT, and Markdown files. This first slice only
            stores the file and records upload metadata.
          </p>
        </div>

        {message ? (
          <div className="message">
            <p>{message}</p>
          </div>
        ) : null}

        <label className="label">
          <span>Select a document</span>
          <input
            className="file-input"
            type="file"
            accept=".pdf,.txt,.md,.doc,.docx"
            onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
          />
        </label>
        <div className="button-row">
          <button className="button" disabled={isUploading} type="submit">
            {isUploading ? "Uploading..." : "Upload document"}
          </button>
        </div>
      </form>

      <div className="section stack">
        <div className="answer-card">
          <h2>Uploaded documents</h2>
          <p className="muted">
            Document processing, chunking, retrieval, and citations are still pending.
          </p>
        </div>

        {documents.length ? (
          <div className="doc-list">
            {documents.map((document) => (
              <article className="doc-card" key={document.id}>
                <strong>{document.filename}</strong>
                <div className="meta-row">
                  <span className="status">{document.status}</span>
                  <span>{Math.max(1, Math.round(document.size_bytes / 1024))} KB</span>
                  <span>{new Date(document.uploaded_at).toLocaleString()}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">No documents uploaded yet.</div>
        )}
      </div>
    </section>
  );
}
