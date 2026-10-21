"use client";
import styles from "./AuthForm.module.css";

import Button from "@/components/ui/button/Button";
import TextInput from "@/components/ui/inputs/TextInput";

export default function RegisterFrom() {
  return (
    <section
      className={`wrapper ${styles.auth_form_section} ${styles.register_form_section}`}
    >
      <div className={styles.auth_form_content}>
        <div className={styles.form_headers}>
          <h1 className="h3-style">Create your account</h1>
          <h2 className="h6-style">Start tracking your bets at tärpit</h2>
        </div>
        <form className={styles.auth_form}>
          <TextInput
            label="email"
            inputSize="md"
            placeholder="email@email.com"
            name="email"
            id="email"
            type="email"
            autoComplete="off"
          />
          <TextInput
            label="username"
            inputSize="md"
            placeholder="username"
            name="username"
            id="username"
            autoComplete="username"
          />
          <TextInput
            label="password"
            inputSize="md"
            placeholder="password"
            name="password"
            id="password"
            autoComplete="off"
          />
          <Button type="submit" size="md">
            <p>Create account</p>
          </Button>
        </form>
      </div>
    </section>
  );
}
