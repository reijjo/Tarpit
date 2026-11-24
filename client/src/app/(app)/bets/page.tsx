import styles from "./page.module.css";

import { redirect } from "next/navigation";

import BetCard from "@/components/bets/BetCard/BetCard";
import BetsHeader from "@/components/bets/BetsHeader";
import { getCurrentUser } from "@/lib/services/auth";
import { getBetsPageData } from "@/lib/services/bets";
import { unwrap } from "@/lib/utils/api";

export default async function Bets() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { bets, options } = await getBetsPageData();
  const betList = unwrap(bets);
  const betOptions = unwrap(options);

  return (
    <main className={`${styles.bets_page} wrapper`}>
      <BetsHeader />
      {betList.map((bet) => (
        <BetCard key={bet.id} bet={bet} betOptions={betOptions} />
      ))}
    </main>
  );
}
