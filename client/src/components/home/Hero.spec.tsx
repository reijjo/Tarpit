import { render, screen } from "@testing-library/react";
import { expect, test } from "bun:test";

import Hero from "./Hero";

test("renders the hero heading", () => {
  render(<Hero />);

  const heading = screen.getByRole("heading", {
    level: 1,
    name: "Track your bets without annoying Excel sheets",
  });

  expect(heading).toBeTruthy();
});
