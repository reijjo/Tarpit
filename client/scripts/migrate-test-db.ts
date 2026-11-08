import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const connectionString = process.env.TEST_DATABASE_URL;

if (!connectionString) {
  throw new Error("TEST_DATABASE_URL must be set before running E2E tests");
}

let databaseName: string;

try {
  databaseName = new URL(connectionString).pathname;
} catch {
  throw new Error("TEST_DATABASE_URL must be a valid PostgreSQL URL");
}

if (databaseName !== "/tarpit_test") {
  throw new Error("Refusing to migrate a database other than tarpit_test");
}

const result = spawnSync(
  "sqlx",
  ["migrate", "run", "--database-url", connectionString],
  {
    cwd: resolve(process.cwd(), "../server"),
    stdio: "inherit",
  },
);

if (result.error) {
  throw new Error(`Failed to run SQLx migrations: ${result.error.message}`);
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
