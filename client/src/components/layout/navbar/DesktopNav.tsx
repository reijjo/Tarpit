import styles from "./DesktopNav.module.css";

import Image from "next/image";
import Link from "next/link";

import NavLinks from "./NavLinks";

export default function DesktopNav() {
  return (
    <div className={styles.desktop_nav}>
      <Link href="/" className={styles.nav_logo}>
        <Image src="/logo.svg" alt="Tärpit logo" width={24} height={24} />
        <p>TÄRPIT</p>
      </Link>
      <NavLinks />
    </div>
  );
}
