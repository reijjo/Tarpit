import Link, { type LinkProps } from "next/link";
import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type LinkButtonProps = LinkProps &
  Omit<ComponentProps<"a">, keyof LinkProps> & {
    variant?: "cta" | "outline";
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
