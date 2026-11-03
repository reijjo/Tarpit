import { describe, expect, test } from "bun:test";

import { registerSchema } from "./auth";

describe("Register schema", () => {
  test("rejects an invalid email", () => {
    const result = registerSchema.safeParse({
      email: "invalid-email",
      username: "tester",
      password: "Password123!",
      passwordConfirm: "Password123!",
    });

    expect(result.success).toBe(false);
  });
});
