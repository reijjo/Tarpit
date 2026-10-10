"use client";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`wrapper`}>&copy; {year ?? 2026}</div>
    </footer>
  );
}
