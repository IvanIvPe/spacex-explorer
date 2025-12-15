import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to SpaceX Explorer</h1>

      <Link href="/launches" className={styles.link}>Go to Launch List</Link>
    </main>
  );
}
