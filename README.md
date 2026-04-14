# AI Support Copilot

AI Support Copilot is an internal knowledge assistant that lets teams upload documents and get grounded, cited answers through conversational search.

## Scope today

Today this repository contains the project structure plus the first implemented feature: document upload.

The rest of the product is still being built one feature at a time.

## Target product

The app is still designed around one clear function: help internal teams ask questions about company documents and get reliable answers with sources.

Planned source material:

- policies
- FAQs
- onboarding docs
- SOPs
- support manuals
- product notes

Planned core functions:

1. Document upload
2. Document processing
3. Semantic retrieval
4. Answer generation
5. Citations
6. Basic admin management

## Stack

- Frontend: Next.js
- Backend: Python + FastAPI
- Database: PostgreSQL + pgvector
- AI: OpenAI embeddings + retrieval-augmented generation
- Storage: Azure Blob Storage with local file fallback for development
- Auth: JWT planned next
- Infra: Docker, GitHub Actions, Terraform
- Hosting target: Azure

## Repository layout

```text
.
├── backend/
│   └── app/
│       ├── api/          route layer placeholder
│       ├── core/         settings/config placeholder
│       ├── db/           database layer placeholder
│       ├── models/       ORM model placeholder
│       ├── schemas/      request/response schema placeholder
│       └── services/     business logic placeholder
├── frontend/
│   ├── app/             overview, upload, chat, admin page scaffolds
│   ├── components/      shared UI shell
│   └── lib/             frontend helper placeholder
├── infra/terraform/     Azure infrastructure placeholder
├── docker-compose.yml   local structure scaffold
└── .github/workflows/   basic validation workflow
```

## What is implemented

- document upload endpoint in FastAPI
- local file storage for uploaded documents
- upload metadata index for listing uploaded files
- Next.js upload page connected to the backend
- app shell, backend layers, Docker, CI, and Terraform placeholders

## Local development

### 1. Configure environment

```bash
cp .env.example .env
```

### 2. Start the app

```bash
docker compose up --build
```

Available:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- API docs: `http://localhost:8000/docs`

## Running without Docker

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e .
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Suggested build order

1. Document processing
2. Semantic retrieval
3. Answer generation
4. Citations
5. Admin management
6. Auth

## Planned next

- JWT authentication and multi-tenant access control
- proper migrations with Alembic
- richer citation metadata such as page numbers
- async job queue for larger documents
- conversation history UI
- evaluation dataset and retrieval quality tests
- monitoring, tracing, and rate limiting

## Why this project works as a portfolio piece

This repo demonstrates:

- product thinking
- production-minded repo structure
- realistic stack selection
- clear separation of frontend, backend, and infra concerns
- incremental delivery with a working first slice
