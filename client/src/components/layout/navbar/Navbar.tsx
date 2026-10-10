import styles from "./Navbar.module.css";

import DesktopNav from "./DesktopNav";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <DesktopNav />
    </nav>
  );
}
