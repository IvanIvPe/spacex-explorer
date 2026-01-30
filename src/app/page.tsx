import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to SpaceX Explorer</h1>
      <Button asChild variant="primary">
        <Link href="/launches">Go to Launch List</Link>
      </Button>
    </main>
  );
}
