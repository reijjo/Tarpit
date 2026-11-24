import styles from "./BetsHeader.module.css";

import LinkButton from "@/components/ui/button/LinkButton";

export default function BetsHeader() {
  return (
    <section className={styles.header_wrapper}>
      <h1>Bets</h1>
      <LinkButton href="/bets/add">Add bet</LinkButton>
    </section>
  );
}
