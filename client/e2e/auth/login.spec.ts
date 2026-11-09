import { expect, test } from "@playwright/test";

import { loginUser, registerUser, submitLogin } from "../helpers/auth";
import { clearDatabase } from "../helpers/database";

test.describe("Login page", () => {
  test.describe("Login form", () => {
    test.describe.configure({ mode: "serial" });

    test.beforeEach(async ({ page }) => {
      await clearDatabase();
      await registerUser(page);
    });

    test("successfully logged in", async ({ page }) => {
      await loginUser(page);
      await expect(page).toHaveURL(/\/dashboard$/);
    });

    test("login credential not found", async ({ page }) => {
      await submitLogin(page, {
        login: "badabim",
      });

      await expect(page.getByText(/no such user/i)).toBeVisible();
    });

    test("SQL injection in login does not authenticate", async ({ page }) => {
      await submitLogin(page, {
        login: "testiukko' OR '1'='1",
      });

      await expect(page.getByText(/no such user/i)).toBeVisible();
      await expect(page).toHaveURL(/\/login$/);
    });

    test("too short login", async ({ page }) => {
      await submitLogin(page, {
        login: "ba",
      });

      await expect(page.getByText(/min 3/i)).toBeVisible();
    });

    test("wrong password", async ({ page }) => {
      await submitLogin(page, {
        password: "b".repeat(50),
      });

      await expect(page.getByText(/wrong password/i)).toBeVisible();
    });

    test("SQL injection in password does not authenticate", async ({ page }) => {
      await submitLogin(page, {
        password: "' OR '1'='1",
      });

      await expect(page.getByText(/wrong password/i)).toBeVisible();
      await expect(page).toHaveURL(/\/login$/);
    });

    test("too long password", async ({ page }) => {
      await submitLogin(page, {
        password: "b".repeat(51),
      });

      await expect(page.getByText(/max 50/i)).toBeVisible();
    });
  });

  test.describe("Mobile viewport", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("fields remain interactive while the mobile menu is closed", async ({
      page,
    }) => {
      await page.goto("/login");

      await page.getByLabel("Username/Email").fill("user@example.com");
      await page.getByLabel("Password").fill("password");

      await expect(page.getByLabel("Username/Email")).toHaveValue(
        "user@example.com",
      );
      await expect(page.getByLabel("Password")).toHaveValue("password");
    });

    test("mobile navigation links work when the menu is opened", async ({
      page,
    }) => {
      await page.goto("/login");

      const mobileNav = page.getByRole("navigation", {
        name: "Mobile navigation",
      });

      await mobileNav.getByRole("button", { name: "Open menu" }).click();

      const registerLink = mobileNav.getByRole("link", {
        name: "Register",
        exact: true,
      });

      await expect(registerLink).toBeVisible();
      await registerLink.click();

      await expect(page).toHaveURL(/\/register$/);
    });
  });
});
