export default function UploadPage() {
  return (
    <section className="section panel">
      <div className="section-head">
        <div>
          <span className="eyebrow">Step 1</span>
          <h1>Upload internal source documents</h1>
        </div>
      </div>

      <div className="stack">
        <div className="answer-card">
          <h2>Planned responsibilities</h2>
          <p className="muted">
            This page will handle file selection, upload submission, and processing feedback for
            PDFs, DOCX files, text files, and internal manuals.
          </p>
        </div>
        <div className="message">
          <p>Structure only. Upload logic will be implemented in the next step.</p>
        </div>
        <label className="label">
          <span>Planned input</span>
          <input className="file-input" type="file" disabled />
        </label>
        <div className="button-row">
          <button className="button" disabled type="button">
            Upload and process
          </button>
        </div>
      </div>
    </section>
  );
}
