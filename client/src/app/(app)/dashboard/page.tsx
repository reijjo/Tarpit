import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/services/auth";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  console.log("user", user);

  return (
    <main className={`wrapper`}>
      <h1>DASHBOAARRRD GRRR</h1>
    </main>
  );
}
