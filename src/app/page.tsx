import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to SpaceX Explorer</h1>
      <Link href="/launches" className={styles.link}> <Button variant="primary">Go to Launch List</Button> </Link>
    </main>
  );
}
