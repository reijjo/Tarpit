"use client";
import styles from "./Footer.module.css";

import Image from "next/image";

import Overlay from "@/components/ui/overlay/Overlay";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content_wrapper}>
        <div className={`${styles.footer_content} wrapper`}>links etc</div>
      </div>
      <div className={styles.footer_image}>
        <Overlay bg="linear-gradient(to bottom, var(--primary-xxdark), transparent)" />
        <Image
          src="/images/footer31.png"
          alt="footer image"
          fill
          loading="eager"
        />
        <div className={styles.footer_copy}>
          <p>&copy; {year ?? 2026} Tärpit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
