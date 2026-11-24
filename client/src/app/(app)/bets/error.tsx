"use client";

import Button from "@/components/ui/button/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log("Bets error: ", error);

  return (
    <div>
      <p>Failed to load bets.</p>
      <Button variant="danger" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
