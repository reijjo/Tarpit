import { expect, test } from "@playwright/test";

import { registerUser } from "../helpers/auth";
import { clearDatabase } from "../helpers/database";

test.describe("Register page", () => {
  test.describe.configure({ mode: "serial" });

  test.describe("Registration", () => {
    test.beforeEach(async () => {
      await clearDatabase();
    });

    test("user can register successfully", async ({ page }) => {
      await registerUser(page);

      await expect(page.getByText(/check your email/i)).toBeVisible();
    });
  });

  test.describe("Mobile viewport", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("email field remains interactive while the mobile menu is closed", async ({
      page,
    }) => {
      await page.goto("/register");

      await page.getByLabel("email").fill("user@example.com");

      await expect(page.getByLabel("email")).toHaveValue("user@example.com");
    });
  });
});
