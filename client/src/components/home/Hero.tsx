import Overlay from "../ui/overlay/Overlay";
import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={styles.hero_section}>
      <Overlay />
      <Image
        src="/images/home/dena-excel.png"
        loading="eager"
        alt="Burning Excel sheets"
        style={{ objectFit: "cover", objectPosition: "50% 0%" }}
        fill
      />
      <div className={`wrapper ${styles.hero_content}`}>
        <h1>Track your bets without annoying Excel sheets</h1>
      </div>
    </section>
  );
}
