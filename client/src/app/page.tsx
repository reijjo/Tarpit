import Hero from "@/components/home/Hero";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={`homepage ${styles.page}`}>
      <Hero />
    </main>
  );
}
