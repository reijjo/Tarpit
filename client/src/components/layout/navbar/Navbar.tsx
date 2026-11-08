import styles from "./Navbar.module.css";

import { getCurrentUser } from "@/lib/services/auth";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className={styles.nav}>
      <DesktopNav user={user} />
      <MobileNav user={user} />
    </nav>
  );
}
