import styles from "./TextInput.module.css";

import { type ComponentProps, useId } from "react";

type TextInputProps = {
  label?: string;
  type?: string;
  inputSize?: "sm" | "md" | "lg";
  inputError?: string[];
} & ComponentProps<"input">;

export default function TextInput({
  label,
  type = "text",
  inputSize = "md",
  id,
  inputError = [],
  ...rest
}: TextInputProps) {
  const generatedId = useId();
  const inputid = id ?? generatedId;
  const isInvalid = inputError && inputError.length > 0;

  return (
    <div className={`${styles.text_input_wrapper} `}>
      {label && <label htmlFor={inputid}>{label}</label>}
      <input
        className={`${styles.text_input} ${styles[inputSize]} ${isInvalid ? styles.invalid_input : ""}`}
        {...rest}
        id={inputid}
        type={type}
      />
      {isInvalid && (
        <ul className={styles.input_error_wrapper} role="list">
          {inputError.map((e) => (
            <li key={e[0]} className={styles.input_error}>
              {e}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
