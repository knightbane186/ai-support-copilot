export default function AdminPage() {
  return (
    <section className="section panel">
      <div className="section-head">
        <div>
          <span className="eyebrow">Step 3</span>
          <h1>Admin document management</h1>
        </div>
        <button className="button-secondary" disabled type="button">
          Refresh
        </button>
      </div>

      <div className="doc-list">
        <article className="doc-card">
          <strong>Document inventory</strong>
          <p className="muted">
            This section will list uploaded documents, processing status, chunk counts, and error
            states.
          </p>
          <div className="meta-row">
            <span className="status">planned</span>
            <span>delete</span>
            <span>reprocess</span>
          </div>
        </article>
        <div className="empty">Structure only. Admin actions will be implemented later.</div>
      </div>
    </section>
  );
}
