export default function ChatPage() {
  return (
    <section className="section">
      <div className="panel">
        <div className="section-head">
          <div>
            <span className="eyebrow">Step 2</span>
            <h1>Ask a question against uploaded knowledge</h1>
          </div>
        </div>

        <form className="form-grid">
          <label className="label">
            <span>Support question</span>
            <textarea
              className="textarea"
              placeholder="What is our refund policy for enterprise customers?"
              disabled
            />
          </label>
          <div className="button-row">
            <button className="button" disabled type="button">
              Ask question
            </button>
          </div>
        </form>
      </div>

      <div className="section stack">
        <article className="answer-card">
          <span className="eyebrow">Planned output</span>
          <p>
            This page will show a grounded answer, supporting citations, and conversation state
            once retrieval and generation are implemented.
          </p>
        </article>
        <div className="empty">Structure only. Chat and citation logic will be added later.</div>
      </div>
    </section>
  );
}
