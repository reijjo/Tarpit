import styles from "./AuthForm.module.css";

import Button from "@/components/ui/button/Button";
import TextInput from "@/components/ui/inputs/TextInput";

export default function LoginForm() {
  return (
    <section
      className={`wrapper ${styles.auth_form_section} ${styles.login_form_section}`}
    >
      <div className={styles.auth_form_content}>
        <div className={styles.form_headers}>
          <h1>Login</h1>
          <h2 className="h3-style">Nice to have you here!</h2>
        </div>
        <form className={styles.auth_form}>
          <TextInput
            label="Username/Email"
            inputSize="md"
            placeholder="Your email/username"
          />
          <TextInput
            label="Password"
            inputSize="md"
            type="password"
            placeholder="Your password"
            autoComplete="off"
          />
          <Button type="submit" size="md">
            Login
          </Button>
        </form>
      </div>
    </section>
  );
}
