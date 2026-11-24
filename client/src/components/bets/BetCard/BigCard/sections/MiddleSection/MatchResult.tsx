import styles from "./MatchResult.module.css";

import { BetLeg } from "@/lib/types/bets";

type MatchResultProps = {
  leg: BetLeg;
};

export default function MatchResult({ leg }: MatchResultProps) {
  return (
    <div className={styles.match}>
      <div className={styles.teams}>
        <p className={styles.team}>{leg.homeTeam}</p>
        <p className={styles.muted}>vs</p>
        <p className={styles.team}>{leg.awayTeam}</p>
        {leg.livebet && (
          <div className={styles.live}>
            <p>·</p>
            <p>live bet</p>
          </div>
        )}
      </div>
      <div className={styles.results}>
        <span className={`font-nums`}>{leg.homeResult}</span>
        <span>-</span>
        <span className={`font-nums`}>{leg.awayResult}</span>
      </div>
    </div>
  );
}
