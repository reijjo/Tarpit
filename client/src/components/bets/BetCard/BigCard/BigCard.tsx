import styles from "./BigCard.module.css";

import type { Bet, BetOptions, BetStatus } from "@/lib/types/bets";
import { getOptionName } from "@/lib/utils/bet-options";
import { calculateProfit } from "@/lib/utils/parsers";

import BottomSection from "./sections/BottomSection";
import MiddleSection from "./sections/MiddleSection/MiddleSection";
import TopSection from "./sections/TopSection";

type BigCardProps = {
  bet: Bet;
  betOptions: BetOptions;
  status: BetStatus;
  statusStyle: "pending" | "won" | "lost" | "push";
  onStatusChange: (status: BetStatus) => void;
  onClose: () => void;
};

export default function BigCard({
  bet,
  betOptions,
  status,
  statusStyle,
  onStatusChange,
  onClose,
}: BigCardProps) {
  const tipper = getOptionName(betOptions.tippers, bet.tipperId);
  const bookmaker = getOptionName(betOptions.bookmakers, bet.bookmakerId);

  return (
    <div className={`${styles.big_card} ${styles[statusStyle]}`}>
      <TopSection
        freebet={bet.freebet}
        finalType={bet.finalType}
        status={status}
        selectedLabel={
          status === "pending"
            ? undefined
            : calculateProfit(bet.stake, bet.finalOdds, status)
        }
        onStatusChange={onStatusChange}
        onClose={() => onClose()}
      />
      <MiddleSection
        stake={bet.stake}
        finalOdds={bet.finalOdds}
        notes={bet.notes}
        betLegs={bet.legs}
        categories={betOptions.categories}
        status={status}
      />
      <BottomSection
        bookmaker={bookmaker}
        tipper={tipper}
        legs={bet.legs}
      />
    </div>
  );
}
