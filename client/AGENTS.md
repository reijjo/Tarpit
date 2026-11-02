# Frontend instructions

## Commands

- Start the frontend: `bun run dev`
- Run e2e tests: `bun run test:e2e`

## Architecture

- `src/app/` — routes and layouts
- `src/components/` — UI grouped by feature or purpose, such as `auth/`, `home/`, `layout/`, and `ui/`
- `src/lib/` — services, actions, forms, types, and validations
- `e2e/` — Playwright end-to-end tests, grouped by feature (for example, `auth/`)
- Component-specific styles use CSS Modules; shared styles are in `src/styles/` and `src/app/`

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
