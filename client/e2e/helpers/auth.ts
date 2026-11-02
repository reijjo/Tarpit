import type { Page } from "@playwright/test";

export const testiukko = {
  email: "testi@ukko.com",
  username: "testiukko",
  password: "TestiUkko123!",
};

const defaultRegistration = {
  email: "register@example.com",
  username: "registeruser",
  password: "Register123!",
  passwordConfirm: "Register123!",
};

export async function submitRegistration(
  page: Page,
  overrides: Partial<typeof defaultRegistration> = {},
) {
  const values = { ...defaultRegistration, ...overrides };
  await page.goto("/register");
  await page.locator("form").evaluate((form: HTMLFormElement) => {
    form.noValidate = true;
  });
  await page.getByLabel("email").fill(values.email);
  await page.getByLabel("username").fill(values.username);
  await page.getByLabel("password", { exact: true }).fill(values.password);
  await page.getByLabel("Confirm password").fill(values.passwordConfirm);
  await page.getByRole("button", { name: "Create account" }).click();
}

export async function registerUser(page: Page) {
  await submitRegistration(page, {
    ...testiukko,
    passwordConfirm: testiukko.password,
  });
}
