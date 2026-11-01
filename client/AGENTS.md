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
