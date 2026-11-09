import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "bun:test";

import LoginForm from "./LoginForm";

describe("LOGINFORM", () => {
  test("renders the login form", () => {
    render(<LoginForm />);

    const heading2 = screen.getByRole("heading", {
      level: 2,
      name: /nice to have/i,
    });
    expect(heading2).toBeTruthy();
  });
});
