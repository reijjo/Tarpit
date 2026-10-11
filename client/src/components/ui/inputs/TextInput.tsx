import styles from "./TextInput.module.css";

import { type ComponentProps, useId } from "react";

type TextInputProps = {
  label?: string;
  type?: string;
  inputSize?: "sm" | "md" | "lg";
} & ComponentProps<"input">;

export default function TextInput({
  label,
  type = "text",
  inputSize = "md",
  id,
  ...rest
}: TextInputProps) {
  const generatedId = useId();
  const inputid = id ?? generatedId;

  return (
    <div className={`${styles.text_input_wrapper} `}>
      {label && <label htmlFor={inputid}>{label}</label>}
      <input
        className={`${styles.text_input} ${styles[inputSize]}`}
        {...rest}
        id={inputid}
        type={type}
      />
    </div>
  );
}
