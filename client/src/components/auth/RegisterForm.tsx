"use client";
import styles from "./AuthForm.module.css";

import { useActionState } from "react";

import Button from "@/components/ui/button/Button";
import TextInput from "@/components/ui/inputs/TextInput";
import Notification from "@/components/ui/notification/Notification";
import { registerUser } from "@/lib/actions/auth";
import { initialRegisterState } from "@/lib/forms/register-state";

export default function RegisterFrom() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialRegisterState,
  );

  console.log("stat", state);

  return (
    <section
      className={`wrapper ${styles.auth_form_section} ${styles.register_form_section}`}
    >
      <div className={styles.auth_form_content}>
        <div className={styles.form_headers}>
          <h1 className="h3-style">Create your account</h1>
          <h2 className="h6-style">Start tracking your bets at tärpit</h2>
        </div>
        <form className={styles.auth_form} action={formAction}>
          <TextInput
            label="email"
            inputSize="md"
            placeholder="email@email.com"
            name="email"
            id="email"
            type="email"
            autoComplete="off"
            defaultValue={state.values.email}
            inputError={state.errors.email}
          />
          <TextInput
            label="username"
            inputSize="md"
            placeholder="username"
            name="username"
            id="username"
            autoComplete="username"
            defaultValue={state.values.username}
            inputError={state.errors.username}
          />
          <TextInput
            label="password"
            inputSize="md"
            placeholder="password"
            name="password"
            id="password"
            autoComplete="off"
            type="password"
            inputError={state.errors.password}
          />
          <TextInput
            label="confirm password"
            inputSize="md"
            placeholder="confirm password"
            name="passwordConfirm"
            id="passwordConfirm"
            autoComplete="off"
            type="password"
            inputError={state.errors.passwordConfirm}
          />
          {state.success && (
            <Notification
              message={state.message ?? "all good"}
              variant="success"
            />
          )}

          {state.errors.form && (
            <Notification
              message={state.errors.form[0] ?? "Please try again"}
              variant="error"
            />
          )}

          <Button type="submit" size="md" disabled={isPending}>
            <p>{isPending ? "Creating user..." : "Create account"}</p>
          </Button>
        </form>
      </div>
    </section>
  );
}
