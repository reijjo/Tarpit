"use client";
import styles from "./MobileNav.module.css";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Key, LogOut, Menu, UserRound, X } from "lucide-react";

import { signOut } from "@/lib/actions/auth";
import { User } from "@/lib/types/user";

import NavLinks from "./NavLinks";

const MOBILE_MENU_ID = "mobile-navigation-menu";

type MobileNavProps = {
  user: User | null;
};

export default function MobileNav({ user }: MobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      ) {
        closeMenu();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className={styles.mobile_nav}
      aria-label="Mobile navigation"
    >
      <Link href="/" className={styles.nav_logo} onClick={closeMenu}>
        <Image src="/logo.svg" alt="" width={44} height={44} />
        <p>TÄRPIT</p>
      </Link>
      <button
        type="button"
        ref={menuButtonRef}
        className={`${styles.mobile_nav_btn} ${menuOpen ? styles.menu_open : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls={MOBILE_MENU_ID}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <div
        id={MOBILE_MENU_ID}
        className={`${styles.nav_open} ${menuOpen ? styles.is_open : ""}`}
        aria-label="Mobile menu"
        inert={!menuOpen}
      >
        <div className={styles.mobile_links}>
          <NavLinks closeMenu={closeMenu} user={user} />
          <div className={`${styles.extra_links} ${styles.nav_links}`}>
            {user ? (
              <form action={signOut}>
                <button
                  type="submit"
                  onClick={closeMenu}
                  className={`${styles.logout_button} ${styles.link_wrapper}`}
                >
                  <LogOut size={18} className={styles.nav_icon} />
                  <p>Logout</p>
                </button>
              </form>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className={styles.link_wrapper}
                >
                  <Key size={18} className={styles.nav_icon} />
                  <p>Login</p>
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className={styles.link_wrapper}
                >
                  <UserRound size={18} className={styles.nav_icon} />
                  <p>Register</p>
                </Link>
              </>
            )}
          </div>
        </div>
        <p className={styles.mobile_menu_copy}>&copy; 2026 Reijjo</p>
      </div>
    </nav>
  );
}
