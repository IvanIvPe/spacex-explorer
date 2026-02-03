import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { getLaunchStats } from "@/services/spacexApi";
import { Rocket } from "lucide-react";

export default async function Footer() {
    const currentYear = new Date().getFullYear();
    const stats = await getLaunchStats();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.brandSection}>
                    <div className={styles.brandLogo}>
                        <Rocket className={styles.rocketIcon} size={28} />
                        <span className={styles.brandName}>SpaceX Explorer</span>
                    </div>
                    <p className={styles.tagline}>
                        Explore the universe of SpaceX missions, rockets, and the future of space travel.
                    </p>
                    <div className={styles.socialLinks}>
                        <a href="https://twitter.com/spacex" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Follow SpaceX on Twitter">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/spacex" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Watch SpaceX on YouTube">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/spacex" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Follow SpaceX on Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className={styles.linksSection}>
                    <h4 className={styles.sectionTitle}>Explore</h4>
                    <nav className={styles.footerNav}>
                        <Link href="/" className={styles.footerLink}>Home</Link>
                        <Link href="/launches" className={styles.footerLink}>Launches</Link>
                        <Link href="/favorites" className={styles.footerLink}>Favorites</Link>
                    </nav>
                </div>

                <div className={styles.infoSection}>
                    <h4 className={styles.sectionTitle}>Info</h4>
                    <div className={styles.infoItems}>
                        <a href="https://www.spacex.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Official SpaceX</a>
                    </div>
                </div>

                <div className={styles.statsSection}>
                    <h4 className={styles.sectionTitle}>Stats</h4>
                    <div className={styles.statItems}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{stats.totalLaunches}</span>
                            <span className={styles.statLabel}>Launches</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{stats.totalLandings}</span>
                            <span className={styles.statLabel}>Landings</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{stats.totalReflights}</span>
                            <span className={styles.statLabel}>Reflights</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p className={styles.copyright}>
                    &copy; {currentYear} SpaceX Explorer by Ivan. All rights reserved.
                </p>
                <p className={styles.disclaimer}>
                    This project is created for educational purposes and is not affiliated with SpaceX
                </p>
            </div>
        </footer>
    );
}