import type { Locator } from "@playwright/test";

export const inputInjectionPayloads = [
  "<script>alert(1)</script>",
  '\"><img src=x onerror=alert(1)>',
  "<svg onload=alert(1)>",
  "javascript:alert(1)",
] as const;

export const sqlInjectionPayloads = [
  "' OR '1'='1",
  "\") OR (\"1\"=\"1",
  "'; DROP TABLE users; --",
  "' UNION SELECT NULL --",
] as const;

export async function fillWithPayloads(
  locator: Locator,
  payloads: readonly string[],
  afterFill: (payload: string, index: number) => Promise<void>,
) {
  for (const [index, payload] of payloads.entries()) {
    await locator.fill(payload);
    await afterFill(payload, index);
  }
}
