import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/services/auth";

export default async function Bets() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className={`wrapper`}>
      <h1>BETS GRRR</h1>
    </main>
  );
}
