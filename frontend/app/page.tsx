const structure = [
  {
    title: "Upload surface",
    body: "A page where internal documents will be uploaded and queued for processing."
  },
  {
    title: "Chat surface",
    body: "A page where users will ask grounded questions and receive answers with citations."
  },
  {
    title: "Admin surface",
    body: "A page where admins will review document status, failures, and reprocessing."
  },
  {
    title: "Backend layers",
    body: "API, services, schemas, models, and database modules are laid out for incremental work."
  },
  {
    title: "Infra shell",
    body: "Docker, GitHub Actions, and Terraform files are present as project scaffolding."
  },
  {
    title: "Next step",
    body: "Implement one vertical slice at a time, starting with document upload."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="panel hero-copy">
          <span className="eyebrow">One clear product</span>
          <h1>Internal knowledge answers, grounded in source documents.</h1>
          <p>
            Today this repo is only the project structure. The goal is still the same: a support
            copilot that lets teams upload internal documents and get reliable answers with
            citations. We will implement it one feature at a time.
          </p>
          <div className="stats">
            <div className="stat">
              <strong>3</strong>
              Product pages scaffolded
            </div>
            <div className="stat">
              <strong>6</strong>
              Core functions planned
            </div>
            <div className="stat">
              <strong>1</strong>
              Clear product direction
            </div>
          </div>
        </div>
        <aside className="panel callout">
          <div>
            <span className="eyebrow">Definition</span>
            <h2>Not a chatbot. A document-grounded support assistant.</h2>
          </div>
          <div className="callout-list">
            <div className="callout-item">Policies and FAQs</div>
            <div className="callout-item">Onboarding docs and SOPs</div>
            <div className="callout-item">Support manuals and product notes</div>
          </div>
        </aside>
      </section>

      <section className="section grid-3">
        {structure.map((item) => (
          <article key={item.title} className="feature-card">
            <h3>{item.title}</h3>
            <p className="muted">{item.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
