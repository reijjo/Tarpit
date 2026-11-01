import { expect, test } from "@playwright/test";

test.describe("Login page", () => {
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
