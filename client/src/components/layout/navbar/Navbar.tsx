import styles from "./Navbar.module.css";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <DesktopNav />
      <MobileNav />
    </nav>
  );
}
