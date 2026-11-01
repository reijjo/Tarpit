import styles from "./AuthForm.module.css";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import TextInput from "@/components/ui/inputs/TextInput";

export default function LoginForm() {
  return (
    <section
      className={`wrapper ${styles.auth_form_section} ${styles.login_form_section}`}
    >
      <div className={styles.auth_form_content}>
        <div className={styles.form_headers}>
          <h1 className="h3-style">Login</h1>
          <h2 className="h6-style">Nice to have you here!</h2>
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
          <div className={styles.auth_form_footer}>
            <p>Account missing?</p>
            <p>Please</p>
            <Link href="/register">register</Link>
            <p>first!</p>
          </div>
        </form>
      </div>
    </section>
  );
}
