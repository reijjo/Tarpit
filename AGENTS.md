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
