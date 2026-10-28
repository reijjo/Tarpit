# Tarpit

Betting tracker that you actually want to use.

Try it live (coming later...)

## Tech Stack

- **Frontend:** Next.js, TypeScript, Bun
- **Backend:** Rust, Axum, SQLx
- **Database:** PostgreSQL 18
- **Development:** Docker Compose

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Bun](https://bun.sh/)
- [Rust & Cargo](https://rustup.rs/)
- [Docker](https://www.docker.com/) or [OrbStack](https://orbstack.dev/)
- [SQLx CLI](https://github.com/launchbadge/sqlx/tree/main/sqlx-cli)

Install SQLx CLI if needed:

```bash
cargo install sqlx-cli --no-default-features --features postgres,rustls
```

### Installation

Clone the repository:

```bash
git clone https://github.com/reijjo/Tarpit.git
cd Tarpit
```

Install frontend dependencies:

```bash
cd client
bun install
cd ..
```

### Environment Variables

Copy the example environment files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

Fill in the required values in each file before starting the application.

- `.env.example` — template containing the required environment variables.
- `.env` / `.env.local` — local configuration files excluded from Git.

### Running the Application Locally

**1. Start PostgreSQL**

Make sure Docker or OrbStack is running.

```bash
cd server
docker compose up -d
```

**2. Run database migrations**

```bash
sqlx migrate run
```

**3. Start the backend**

```bash
cargo run
```

**4. Start the frontend**

In another terminal, from the project root:

```bash
cd client
bun run dev
```

The application runs at:

| Service         | URL                                                          |
| --------------- | ------------------------------------------------------------ |
| Frontend        | [http://localhost:3000](http://localhost:3000)               |
| Backend         | [http://localhost:3001](http://localhost:3001)               |
| Health check    | [http://localhost:3001/health](http://localhost:3001/health) |
| Readiness check | [http://localhost:3001/ready](http://localhost:3001/ready)   |

### Stopping the Database

From `server/`:

```bash
docker compose down
```

Database data persists in the Docker volume.

## Features

- [x] Backend health and readiness checks
- [ ] User registration and authentication
- [ ] Email verification
- [ ] Add, edit and delete bets
- [ ] Betting history and performance tracking
- [ ] Personal tippers and leagues
- [ ] Analytics and statistics
- [ ] User preferences
