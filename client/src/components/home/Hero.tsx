import styles from "./Hero.module.css";

import LinkButton from "../ui/button/LinkButton";
import Pile from "./Pile";

export default function Hero() {
  return (
    <section className={styles.hero_section}>
      <div className={`${styles.hero_content} wrapper`}>
        <h1>
          Track your bets without annoying <span>Excel sheets</span>.
        </h1>
        <p className={styles.hero_desc}>
          A better way to keep track of your bets. And you can also find betting
          tips here.
        </p>
        <div className={styles.hero_cta}>
          <LinkButton href="/register" size="md">
            Register here
          </LinkButton>
          <LinkButton href="/tips" size="md" variant="outline">
            Check betting tips
          </LinkButton>
        </div>
      </div>

      <Pile side="left" />
      <Pile side="right" />
    </section>
  );
}
