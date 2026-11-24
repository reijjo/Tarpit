import styles from "./MiddleSection.module.css";

import { BetLeg, BetOption, BetStatus } from "@/lib/types/bets";
import { getOptionName } from "@/lib/utils/bet-options";
import { formatBetType } from "@/lib/utils/parsers";

import MatchResult from "./MatchResult";
import NotesButtons from "./NotesButtons";
import SelectionList from "./SelectionList";
import StakeOddsProfit from "./StakeOddsProfit";

type MiddleSectionProps = {
  stake: number;
  finalOdds: number;
  notes: string | null;
  betLegs: BetLeg[];
  categories: BetOption[];
  status: BetStatus;
};

export default function MiddleSection({
  stake,
  finalOdds,
  notes,
  betLegs,
  categories,
  status,
}: MiddleSectionProps) {
  console.log("betLegs", betLegs);

  return (
    <div className={styles.middle_section}>
      <StakeOddsProfit stake={stake} finalOdds={finalOdds} status={status} />
      {betLegs.map((b) => (
        <div className={styles.leg} key={b.id}>
          <MatchResult leg={b} />

          <div className={styles.picks}>
            <div className={styles.pick_info}>
              <span>{getOptionName(categories, b.categoryId)}</span>
              <span>{formatBetType(b.betType)}</span>
              <span className={`font-nums`}>{Number(b.odds).toFixed(2)}</span>
            </div>

            <SelectionList pick={b} />
          </div>
        </div>
      ))}

      <NotesButtons notes={notes} />
    </div>
  );
}
