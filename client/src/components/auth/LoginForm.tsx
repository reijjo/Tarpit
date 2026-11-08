"use client";
import styles from "./AuthForm.module.css";

import { useActionState } from "react";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import TextInput from "@/components/ui/inputs/TextInput";
import { signIn } from "@/lib/actions/auth";
import { initialLoginState } from "@/lib/forms/login-state";

import Notification from "../ui/notification/Notification";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signIn,
    initialLoginState,
  );

  return (
    <section
      className={`wrapper ${styles.auth_form_section} ${styles.login_form_section}`}
    >
      <div className={styles.auth_form_content}>
        <div className={styles.form_headers}>
          <h1 className="h3-style">Login</h1>
          <h2 className="h6-style">Nice to have you here!</h2>
        </div>
        <form className={styles.auth_form} action={formAction}>
          <TextInput
            label="Username/Email"
            inputSize="md"
            placeholder="Your email/username"
            name="login"
            id="login"
            autoComplete="username"
            defaultValue={state.values.login}
            inputError={state.errors.login}
          />
          <TextInput
            label="Password"
            inputSize="md"
            type="password"
            placeholder="Your password"
            autoComplete="current-password"
            name="password"
            id="password"
            inputError={state.errors.password}
          />

          {state.errors.form && (
            <Notification
              key={state.notificationId}
              message={state.errors.form[0] ?? "Please try again."}
              variant="error"
            />
          )}

          <Button type="submit" size="md" disabled={isPending}>
            {isPending ? "Logging in ..." : "Login"}
          </Button>

          <div className={styles.auth_form_footer}>
            <p>Account missing?</p>
            <div className={styles.auth_form_footer_link}>
              <p>Please</p>
              <Link href="/register">register</Link>
              <p>first!</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
