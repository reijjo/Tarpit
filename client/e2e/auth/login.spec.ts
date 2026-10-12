import { expect, test } from "@playwright/test";

test.describe("Login page", () => {
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

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("link", { name: "Register" })).toBeVisible();

    await page.getByRole("link", { name: "Register" }).click();
    await expect(page).toHaveURL(/\/register$/);
  });
});
