import styles from "./page.module.css";

import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className={`homepage ${styles.page}`}>
      <Hero />
    </main>
  );
}
