import type { Page } from "@playwright/test";

export const testiukko = {
  email: "testi@ukko.com",
  username: "testiukko",
  password: "TestiUkko123!",
};

export async function registerUser(page: Page) {
  await page.goto("/register");

  await page.getByLabel("Email").fill(testiukko.email);
  await page.getByLabel("Username").fill(testiukko.username);
  await page.getByLabel("password", { exact: true }).fill(testiukko.password);
  await page.getByLabel("Confirm password").fill(testiukko.password);

  await page.getByRole("button", { name: "Create account" }).click();
}
