"use client";
import styles from "./NavLinks.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChartLine,
  FishingRod,
  House,
  LayoutDashboard,
  List,
  Plus,
} from "lucide-react";

import { User } from "@/lib/types/user";

type NavLinksProps = {
  closeMenu?: () => void;
  user: User | null;
};

const publicLinks = [
  { to: "/", desc: "homepage", icon: House },
  { to: "/tips", desc: "betting tips", icon: FishingRod },
];
const loggedLinks = [
  {
    to: "/dashboard",
    desc: "dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/bets",
    desc: "bets",
    icon: List,
  },
  {
    to: "/bets/add",
    desc: "add bet",
    icon: Plus,
  },
  {
    to: "/analytics",
    desc: "analytics",
    icon: ChartLine,
  },
  { to: "/tips", desc: "betting tips", icon: FishingRod },
];

export default function NavLinks({ closeMenu, user }: NavLinksProps) {
  const pathname = usePathname();
  const links = user ? loggedLinks : publicLinks;

  return (
    <div className={styles.nav_links}>
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <Link
            key={link.to}
            href={link.to}
            onClick={closeMenu}
            className={`${styles.link_wrapper} ${pathname === link.to ? styles.im_here : ""}`}
          >
            <Icon size={18} aria-hidden="true" className={styles.nav_icon} />
            <p>{link.desc}</p>
          </Link>
        );
      })}
    </div>
  );
}
