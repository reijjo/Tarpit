import styles from "./RegisterForm.module.css";

import Button from "../ui/button/Button";
import TextInput from "../ui/inputs/TextInput";

export default function RegisterFrom() {
  return (
    <section className={`wrapper ${styles.register_form_section}`}>
      <div className={styles.register_form_content}>
        <div className={styles.form_headers}>
          <h1 className="h1-style">Create your account</h1>
          <h2 className="h4-style">Start tracking your bets at tärpit</h2>
        </div>
        <form className={styles.register_form}>
          <TextInput label="email" inputSize="md" />
          <Button type="submit" size="md">
            Continue
          </Button>
        </form>
      </div>
    </section>
  );
}
