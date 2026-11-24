import styles from "./StakeOddsProfit.module.css";

import { BetStatus } from "@/lib/types/bets";
import { calculateProfit } from "@/lib/utils/parsers";

type StakeOddsProfitProps = {
  stake: number;
  finalOdds: number;
  status: BetStatus;
};

export default function StakeOddsProfit({
  stake,
  finalOdds,
  status,
}: StakeOddsProfitProps) {
  return (
    <div className={styles.stake_odds_profit}>
      <div className={styles.stake_wrapper}>
        <span className={styles.stake_label}>Stake</span>
        <span className={`font-nums`}>{Number(stake).toFixed(2)}u</span>
      </div>
      <div className={styles.stake_wrapper}>
        <span className={styles.stake_label}>Odds</span>
        <span className={`font-nums`}>{Number(finalOdds).toFixed(2)}</span>
      </div>
      <div className={styles.stake_wrapper}>
        <span className={styles.stake_label}>Profit</span>
        <span className={status !== "pending" ? "font-nums" : ""}>
          {status === "pending"
            ? "Not settled"
            : calculateProfit(stake, finalOdds, status)}
        </span>
      </div>
    </div>
  );
}
