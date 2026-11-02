import { Client } from "pg";

export async function clearDatabase() {
  const connectionString = process.env.TEST_DATABASE_URL;

  if (
    !connectionString ||
    new URL(connectionString).pathname !== "/tarpit_test"
  ) {
    throw new Error("Invalid test database");
  }

  const client = new Client({ connectionString });

  try {
    await client.connect();
    await client.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  } finally {
    await client.end();
  }
}
