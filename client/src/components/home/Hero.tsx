import styles from "./Hero.module.css";

import Image from "next/image";

import { ChevronDown } from "lucide-react";

import LinkButton from "../ui/button/LinkButton";

export default function Hero() {
  return (
    <section className={`${styles.hero_section} wrapper`}>
      <div className={styles.hero_content}>
        <h1>
          Track your bets without annoying <span>Excel sheets</span>.
        </h1>
        <p className={styles.hero_desc}>
          A better way to keep track of your bets. And you can also find betting
          tips here.
        </p>
        <div className={styles.hero_cta}>
          <LinkButton href="/register" size="md">
            Start here!
          </LinkButton>
          <LinkButton href="/tips" size="md" variant="outline">
            Check betting tips
          </LinkButton>
        </div>
      </div>
      <div className={styles.hero_image_wrapper}>
        <Image
          src="/images/home/crumpled.png"
          loading="eager"
          alt="Excel sheets"
          sizes="(min-width: 1000px) 50vw, 0px"
          style={{ objectFit: "contain" }}
          fill
        />
      </div>
      <div className={styles.hero_check_features}>
        <p>See how it works</p>
        <ChevronDown />
      </div>
    </section>
  );
}
