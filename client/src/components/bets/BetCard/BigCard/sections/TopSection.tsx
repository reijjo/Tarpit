import styles from "./TopSection.module.css";

import { SetStateAction } from "react";

import { ChevronUp } from "lucide-react";

import StatusDropdown from "@/components/bets/status-dropdown/StatusDropdown";
import { BET_STATUSES } from "@/lib/types/bets";
import type { BetStatus, FinalType } from "@/lib/types/bets";

type TopSectionProps = {
  freebet: boolean;
  finalType: FinalType;
  status: BetStatus;
  selectedLabel?: string;
  onClose: (value: SetStateAction<boolean>) => void;
  onStatusChange: (status: BetStatus) => void;
};

export default function TopSection({
  freebet,
  finalType,
  status,
  selectedLabel,
  onClose,
  onStatusChange,
}: TopSectionProps) {
  return (
    <div className={styles.top_section}>
      <div className={styles.finaltype_freebet}>
        <b>{finalType}</b>
        {freebet && <span>Freebet</span>}
      </div>
      <button className={styles.close_btn} onClick={() => onClose(false)}>
        <p>Close</p> <ChevronUp size={16} />
      </button>
      <div className={styles.finaltype_status}>
        <StatusDropdown
          value={status}
          options={BET_STATUSES}
          onChange={onStatusChange}
          selectedLabel={selectedLabel}
        />
      </div>
    </div>
  );
}
