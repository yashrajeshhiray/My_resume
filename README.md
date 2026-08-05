# Yash Hiray — Interactive Resume

A static portfolio site built with React, TypeScript, and Vite, deployed on GitHub Pages. It showcases experience, projects, and quantified impact, plus an on-device "Ask about Yash" search widget.

## How the search works

There is **no LLM and no server** — this is a fully static site. The search widget runs a hybrid retrieval pipeline entirely in the browser:

- **Lexical search**: a hand-rolled BM25 index over resume content chunks
- **Semantic search**: a quantized `all-MiniLM-L6-v2` embedding model, self-hosted under `public/models/` and run client-side via `@huggingface/transformers` (lazy-loaded only when the search widget opens)
- **Fusion**: Reciprocal Rank Fusion combines both rankings
- **Fit-for-role comparator**: matches a query's requirements against a skill taxonomy and cites real evidence for each match — no fabricated verdicts
- **Guardrails**: deterministic rules refuse off-topic, meta, and prompt-injection style queries before any retrieval runs

All content lives in `src/content/resume-content.ts` — the single source of truth for both the visual sections and the search corpus.

## Development

```bash
npm install
npm run fetch:model   # one-time: downloads the embedding model into public/models/
npm run dev            # regenerates embeddings, then starts the dev server
```

## Build

```bash
npm run build          # regenerates embeddings, then builds to dist/
npm run preview
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages automatically.
