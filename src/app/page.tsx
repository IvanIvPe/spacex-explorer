import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Space X Explorer</h1>
      <p>Discover SpaceX launches and manage your favorite ones!</p>
    </main>
  );
}
