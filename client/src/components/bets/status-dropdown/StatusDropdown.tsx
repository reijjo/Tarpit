import styles from "./StatusDropdown.module.css";

import { ChevronDown } from "lucide-react";

import type { BetStatus } from "@/lib/types/bets";

type StatusDropdownProps = {
  value: BetStatus;
  options: readonly BetStatus[];
  onChange: (status: BetStatus) => void;
  variant?: "card" | "selection";
  label?: string;
  selectedLabel?: string;
};

const STATUS_LABELS: Record<BetStatus, string> = {
  pending: "Pending",
  won: "Won",
  lost: "Lost",
  half_won: "Half won",
  half_lost: "Half lost",
  push: "Push",
};

export default function StatusDropdown({
  value,
  options,
  onChange,
  variant = "card",
  label = "Bet status",
  selectedLabel,
}: StatusDropdownProps) {
  return (
    <div
      className={`${styles.status_dropdown} ${styles[variant]} ${styles[value]} ${selectedLabel ? styles.has_selected_label : ""}`}
    >
      {selectedLabel && (
        <span className={styles.selected_label} aria-hidden="true">
          {selectedLabel}
        </span>
      )}
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value as BetStatus)}
      >
        {options.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" size={16} />
    </div>
  );
}
