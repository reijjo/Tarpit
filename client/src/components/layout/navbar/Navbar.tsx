import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={`wrapper ${styles.nav_content}`}>
        <div className={styles.nav_logo}>
          <Link href="/">TÄRPIT</Link>
        </div>
        <div className={styles.nav_links}>
          <Link href="/tips">betting tips</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
}
