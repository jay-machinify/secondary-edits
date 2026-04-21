# Secondary Code Edits — Training UI

A self-contained browser UI that ramps people up on **secondary code edits** in healthcare payment integrity.

Built in native TypeScript (no React, no bundler). Content is hand-authored and source-cited to CMS / NCCI / AAPC references.

## What's inside

- **Walkthrough** — a 10-step guided intro (the recommended first step)
- **Explainers** — one deep-dive article per edit category (NCCI PTP, MUE, global surgery, modifiers, duplicates, frequency, age/gender/POS, medical necessity, unbundling)
- **Tutorials** — interactive lessons with quiz-style decision checkpoints
- **Examples** — a gallery of worked claim scenarios showing the edit firing + resolution
- **Glossary** — searchable reference for CPT / HCPCS / ICD-10 / CARC / RARC / LCD / NCD / modifiers / etc.

All claims shown are **fictional and for training only**. There is no PHI and no real patient data anywhere in this app.

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080).

Other scripts:
- `npm run build` — compile TS once
- `npm run watch` — recompile on save
- `npm run serve` — just serve the static files (assumes already built)
- `npm run clean` — remove `dist/`

## How it's built

- TypeScript → `tsc` → `dist/*.js` (ES2022 modules), loaded directly by `index.html`
- Hash-based router (`#/walkthrough/3`, `#/explainers/ncci-ptp`, etc.)
- Views are plain functions returning HTML strings; `render()` does `innerHTML` + event delegation
- Progress persisted in `localStorage` so completed steps survive refreshes

See `src/` for the layout. Content lives under `src/content/` as typed TS modules.

## Editing content

- **Walkthrough:** `src/content/walkthrough.ts`
- **Explainers:** `src/content/explainers/<slug>.ts` (+ register in `explainers/index.ts`)
- **Tutorials:** `src/content/tutorials/<slug>.ts` (+ register in `tutorials/index.ts`)
- **Examples:** `src/content/examples/<slug>.ts` (+ register in `examples/index.ts`)
- **Glossary:** `src/content/glossary.ts`

See `CONTENT_SOURCES.md` for the authoritative references that back the content.
