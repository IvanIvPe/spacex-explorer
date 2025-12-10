"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <Image
                    src="/rocketlogo.png"
                    alt="SpaceX Explorer Logo"
                    width={64}
                    height={64}
                    className={styles.logoImage}
                />
                SpaceX Explorer
            </Link>

            <ul className={styles.navList}>
                <li>
                    <Link href="/" className={styles.navLink}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/launches" className={styles.navLink}>
                        Launches
                    </Link>
                </li>
                <li>
                    <Link href="/favorites" className={styles.navLink}>
                        Favorites
                    </Link>
                </li>
            </ul>
        </nav>
    );
}