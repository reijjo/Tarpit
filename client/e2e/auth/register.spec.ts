import { expect, test } from "@playwright/test";

import { registerUser, submitRegistration } from "../helpers/auth";
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

    test("duplicate email is rejected", async ({ page }) => {
      await registerUser(page);
      await expect(page.getByText(/check your email/i)).toBeVisible();
      await submitRegistration(page, {
        email: "testi@ukko.com",
        username: "anotheruser",
      });

      await expect(
        page.getByText("Email is already registered.", { exact: true }),
      ).toBeVisible();
    });

    test("duplicate username is rejected regardless of case", async ({
      page,
    }) => {
      await registerUser(page);
      await expect(page.getByText(/check your email/i)).toBeVisible();
      await submitRegistration(page, {
        email: "another@example.com",
        username: "TESTIUKKO",
      });
      await expect(
        page.getByText("Username is already registered.", { exact: true }),
      ).toBeVisible();
    });

    test("shows errors for invalid registration details", async ({ page }) => {
      await submitRegistration(page, {
        email: "invalid-email",
        username: "bad username",
        password: "short",
        passwordConfirm: "different",
      });

      await expect(
        page.getByText("Invalid email.", { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByText(
          "Username can only contain letters, numbers, '-', and '_'",
          { exact: true },
        ),
      ).toBeVisible();
      await expect(
        page.getByText("Min 8 characters in password", { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByText("Passwords do not match", { exact: true }),
      ).toBeVisible();
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
