# AGENTS.md

## Project

Tärpit is a sports betting tracking app. The frontend uses Next.js, React, TypeScript and CSS Modules. The backend uses Rust, Axum, SQLx and PostgreSQL.

## Repository layout

- `client/` — Next.js frontend
- `server/` — Rust backend and database migrations
- `bruno/` — API request collection

## Working style

- Follow the existing project structure and conventions.
- DO NOT assume anything. Ask if something is unclear.
- Make the smallest change that solves the problem.
- Follow the official standards and best practices for the framework, language, packages, or crates in use.
- Keep code clear and easy to understand even if I have hangover and my brain isn't working properly.
- Touch only what you must. Clean up your own mess.
- Avoid generic boilerplate answers; re-check the repo and task if the answer starts sounding generic.

## Environment files

- Do not open, read, or print `.env` files or other files containing secrets.
- If a task requires an environment variable, check its name in `.env.example`, documentation, or code without reading its value.

## Testing

- Before changing or adding tests, inspect the relevant implementation and existing tests. Run the relevant checks for the code you change.
- Keep tests short and simple that does the job. No need to complicate things.
- Add only a small number of high-value tests for the behavior being changed.
- Prefer one test per important behavior or risk; avoid redundant boundary permutations and speculative edge cases.
- Keep test files focused and concise. Don’t add test helpers or infrastructure unless they materially simplify or enable necessary coverage.
- When adding tests or investigating a vulnerability, modify test files only. If a test fails or a vulnerability is found, report the finding without changing production code. Make production fixes only when explicitly asked.
