import Link from "next/link";
import LinkButton from "@/components/ui/button/LinkButton";
import styles from "./DesktopNav.module.css";

export default function DesktopNav() {
  return (
    <div className={`wrapper ${styles.desktop_nav_content}`}>
      <div className={styles.nav_logo}>
        <Link href="/">TÄRPIT</Link>
      </div>
      <div className={styles.nav_links}>
        <Link href="/tips">betting tips</Link>
        <LinkButton href="/login" size="sm">
          Login
        </LinkButton>
        <LinkButton href="/register" size="sm" variant="outline">
          Register
        </LinkButton>
      </div>
    </div>
  );
}
