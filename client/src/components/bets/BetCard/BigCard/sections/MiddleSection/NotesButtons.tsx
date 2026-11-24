import styles from "./NotesButtons.module.css";

import Button from "@/components/ui/button/Button";

type NotesButtonsProps = {
  notes: string | null;
};

export default function NotesButtons({ notes }: NotesButtonsProps) {
  return (
    <div className={styles.notes_buttons}>
      {notes && (
        <div className={styles.notes}>
          <p>Notes</p>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.btn_group}>
        <Button size="sm" variant="outline">
          Modify bet
        </Button>
      </div>
    </div>
  );
}
