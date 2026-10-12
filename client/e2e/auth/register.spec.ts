import { expect, test } from "@playwright/test";

test.describe("Register page", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("email field remains interactive while the mobile menu is closed", async ({
    page,
  }) => {
    await page.goto("/register");

    await page.getByLabel("email").fill("user@example.com");

    await expect(page.getByLabel("email")).toHaveValue("user@example.com");
  });
});
