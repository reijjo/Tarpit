import styles from "./BottomSection.module.css";

import { BetLeg } from "@/lib/types/bets";
import { formatBetDate } from "@/lib/utils/parsers";

type BottomSectionProps = {
  bookmaker: string;
  tipper: string;
  legs: BetLeg[];
};

export default function BottomSection({
  bookmaker,
  tipper,
  legs,
}: BottomSectionProps) {
  return (
    <div className={styles.bottom_section}>
      <span>{formatBetDate(legs)}</span>
      <div className={styles.bookmaker_tipper}>
        {bookmaker && <span>{bookmaker}</span>}{" "}
        {tipper && <span>{tipper}</span>}
      </div>
    </div>
  );
}
