import styles from "./DesktopNav.module.css";

import Link from "next/link";

import NavLinks from "./NavLinks";

export default function DesktopNav() {
  return (
    <div className={`wrapper ${styles.desktop_nav}`}>
      <div className={styles.nav_logo}>
        <Link href="/">TÄRPIT</Link>
      </div>
      <NavLinks />
    </div>
  );
}
