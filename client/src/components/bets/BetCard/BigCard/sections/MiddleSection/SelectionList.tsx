import styles from "./SelectionList.module.css";

import { useState } from "react";

import type { BetLeg, BetStatus } from "@/lib/types/bets";

import StatusDropdown from "@/components/bets/status-dropdown/StatusDropdown";

type SelectionListProps = {
  pick: BetLeg;
};

export default function SelectionList({ pick }: SelectionListProps) {
  const [selectionStatuses, setSelectionStatuses] = useState<
    Record<string, BetStatus>
  >(
    () =>
      Object.fromEntries(
        pick.selections.map((selection) => [
          selection.id,
          selection.result ?? "pending",
        ]),
      ) as Record<string, BetStatus>,
  );

  return (
    <ul className={styles.selection_list}>
      {pick.selections.map((selection) => (
        <li key={selection.id}>
          <span className={styles.selection_text}>
            <span
              className={styles.selection_label}
              title={selection.selection}
            >
              {selection.selection}
            </span>
          </span>

          {pick.betType === "bet_builder" && (
            <StatusDropdown
              variant="selection"
              label={`${selection.selection} status`}
              value={selectionStatuses[selection.id] ?? "pending"}
              options={["pending", "won", "lost"]}
              onChange={(nextStatus) =>
                setSelectionStatuses((current) => ({
                  ...current,
                  [selection.id]: nextStatus,
                }))
              }
            />
          )}
        </li>
      ))}
    </ul>
  );
}
