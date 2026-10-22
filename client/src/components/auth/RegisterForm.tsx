"use client";
import styles from "./AuthForm.module.css";

import { useActionState } from "react";

import Button from "@/components/ui/button/Button";
import TextInput from "@/components/ui/inputs/TextInput";
import { registerUser } from "@/lib/actions/auth";
import { initialRegisterState } from "@/lib/forms/register-state";

export default function RegisterFrom() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialRegisterState,
  );

  console.log("STATE", state);

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
          />
          <TextInput
            label="username"
            inputSize="md"
            placeholder="username"
            name="username"
            id="username"
            autoComplete="username"
            defaultValue={state.values.username}
          />
          <TextInput
            label="password"
            inputSize="md"
            placeholder="password"
            name="password"
            id="password"
            autoComplete="off"
            type="password"
          />
          <TextInput
            label="confirm password"
            inputSize="md"
            placeholder="confirm password"
            name="passwordConfirm"
            id="passwordConfirm"
            autoComplete="off"
            type="password"
          />
          <Button type="submit" size="md" disabled={isPending}>
            <p>{isPending ? "Creating user..." : "Create account"}</p>
          </Button>
        </form>
      </div>
    </section>
  );
}
