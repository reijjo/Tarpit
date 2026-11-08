import styles from "./DesktopNav.module.css";

import Image from "next/image";
import Link from "next/link";

import { LogOut } from "lucide-react";

import LinkButton from "@/components/ui/button/LinkButton";
import { signOut } from "@/lib/actions/auth";
import { User } from "@/lib/types/user";

import NavLinks from "./NavLinks";

type DesktopNavProps = {
  user: User | null;
  closeMenu?: () => void;
};

export default function DesktopNav({ user, closeMenu }: DesktopNavProps) {
  return (
    <div className={styles.desktop_nav}>
      <Link href="/" className={styles.nav_logo}>
        <Image src="/logo.svg" alt="Tärpit logo" width={24} height={24} />
        <p>TÄRPIT</p>
      </Link>
      <NavLinks user={user} />
      <div className={`${styles.btn_group} ${styles.nav_links}`}>
        {user ? (
          <LinkButton
            href="/login"
            size="sm"
            variant="danger"
            onClick={signOut}
            className={styles.link_wrapper}
          >
            <LogOut />
            <p>Logout</p>
          </LinkButton>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
