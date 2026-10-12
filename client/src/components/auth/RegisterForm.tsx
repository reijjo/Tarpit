import styles from "./AuthForm.module.css";

import Button from "../ui/button/Button";
import TextInput from "../ui/inputs/TextInput";

export default function RegisterFrom() {
  return (
    <section
      className={`wrapper ${styles.auth_form_section} ${styles.register_form_section}`}
    >
      <div className={styles.auth_form_content}>
        <div className={styles.form_headers}>
          <h1>Create your account</h1>
          <h2 className="h3-style">Start tracking your bets at tärpit</h2>
        </div>
        <form className={styles.auth_form}>
          <TextInput
            label="email"
            inputSize="md"
            placeholder="email@email.com"
          />
          <Button type="submit" size="md">
            Continue
          </Button>
        </form>
      </div>
    </section>
  );
}
