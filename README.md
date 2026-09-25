# amankumarchhari.vercel.app

Portfolio of **Aman Kumar Chhari**, full-stack & applied AI engineer.
A terminal-style site with a written case study and a set of system diagrams for each project.

## Stack

Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS 4 · react-icons · JetBrains Mono

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

Everything personal lives in `src/content/`, not in the components:

- `src/content/site.ts`: name, role, intro, education, experience, achievements, skills, links
- `src/content/projects.ts`: one entry per case study: summary, architecture, decisions, failure handling, numbers, and the diagrams (`system` for the illustrated system design, `diagrams` for flows and state machines)

Project screenshots go in `public/projects/`, the resume in `public/`.

## Deploy

Pushing to `main` deploys to Vercel production.
