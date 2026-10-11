import styles from "./NavLinks.module.css";

import Link from "next/link";

import LinkButton from "@/components/ui/button/LinkButton";

type NavLinksProps = {
  closeMenu?: () => void;
};

export default function NavLinks({ closeMenu }: NavLinksProps) {
  return (
    <div className={styles.nav_links}>
      <Link href="/" onClick={closeMenu}>
        homepage
      </Link>
      <Link href="/tips" onClick={closeMenu}>
        betting tips
      </Link>
      <div className={styles.btn_group}>
        <LinkButton
          href="/login"
          size="sm"
          variant="outline"
          onClick={closeMenu}
        >
          Login
        </LinkButton>
        <LinkButton href="/register" size="sm" onClick={closeMenu}>
          Register
        </LinkButton>
      </div>
    </div>
  );
}
