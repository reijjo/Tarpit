import styles from "./Button.module.css";

import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "cta" | "outline";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "cta",
  size = "md",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
