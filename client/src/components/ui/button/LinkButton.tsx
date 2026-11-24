import styles from "./Button.module.css";

import type { ComponentProps } from "react";

import Link, { type LinkProps } from "next/link";

type LinkButtonProps = LinkProps &
  Omit<ComponentProps<"a">, keyof LinkProps> & {
    variant?: "cta" | "outline" | "danger";
    size?: "sm" | "md" | "lg";
    href: LinkProps["href"];
  };

export default function LinkButton({
  variant = "cta",
  size = "md",
  className,
  children,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}
