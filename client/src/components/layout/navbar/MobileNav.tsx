"use client";
import styles from "./MobileNav.module.css";

import { useState } from "react";

import Link from "next/link";

import { Menu, X } from "lucide-react";

import NavLinks from "./NavLinks";

const MOBILE_MENU_ID = "mobile-navigation-menu";

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  console.log("menuopen", menuOpen);

  return (
    <nav className={styles.mobile_nav} aria-label="Mobile navigation">
      <button
        type="button"
        className={styles.mobile_nav_btn}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls={MOBILE_MENU_ID}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {menuOpen && (
        <div
          id={MOBILE_MENU_ID}
          className={styles.nav_open}
          aria-label="Mobile menu"
          hidden={!menuOpen}
        >
          <div className={styles.nav_logo}>
            <Link href="/" onClick={closeMenu}>
              TÄRPIT
            </Link>
          </div>
          <NavLinks closeMenu={closeMenu} />
        </div>
      )}
    </nav>
  );
}
