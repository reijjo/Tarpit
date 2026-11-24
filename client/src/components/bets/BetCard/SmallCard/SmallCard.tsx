import styles from "./SmallCard.module.css";

import StatusDropdown from "@/components/bets/status-dropdown/StatusDropdown";
import { BET_STATUSES } from "@/lib/types/bets";
import type { BetLeg, BetStatus } from "@/lib/types/bets";
import { calculateProfit } from "@/lib/utils/parsers";

type SmallCardProps = {
  stake: number;
  legs: BetLeg[];

  onOpen: () => void;
  onStatusChange: (status: BetStatus) => void;
  odds: number;
  status: BetStatus;
  statusStyle: "pending" | "won" | "lost" | "push";
};

export default function SmallCard({
  status,
  onOpen,
  onStatusChange,
  stake,
  legs,
  odds,
  statusStyle,
}: SmallCardProps) {
  const parseBet = (legs: BetLeg[]): string => {
    return legs
      .map((leg) => {
        const selections = leg.selections.map((s) => s.selection).join(", ");

        if (["moneyline", "three_way", "handicap"].includes(leg.betType)) {
          return selections;
        }

        return `${leg.homeTeam} / ${leg.awayTeam} - ${selections}`;
      })
      .join(" · ");
  };

  return (
    <div className={`${styles.small_card} ${styles[statusStyle]}`}>
      <div className={styles.small_card_content}>
        <button type="button" className={styles.open_button} onClick={onOpen}>
          <h2 className="font-nums">{stake}u</h2>
          <p className={styles.parsed_bet}>{parseBet(legs)}</p>
          <h2 className={`${styles.odds} font-nums`}>
            {Number(odds).toFixed(2)}
          </h2>
        </button>
        <StatusDropdown
          value={status}
          options={BET_STATUSES}
          onChange={onStatusChange}
          selectedLabel={
            status === "pending"
              ? undefined
              : calculateProfit(stake, odds, status)
          }
        />
      </div>
    </div>
  );
}
