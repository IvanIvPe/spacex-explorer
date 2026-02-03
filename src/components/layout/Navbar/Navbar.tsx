"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import styles from "./Navbar.module.css";
import { Home, Rocket, Star, LucideIcon } from "lucide-react";

const NavBarItems: {name: string; href: string; icon: LucideIcon}[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Launches", href: "/launches", icon: Rocket },
    { name: "Favorites", href: "/favorites", icon: Star },
]

export default function Navbar({navbarItems = NavBarItems}: {navbarItems?: {name: string; href: string; icon: LucideIcon}[]}) {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <Rocket className={styles.logoIcon} size={24} />
                SpaceX Explorer
            </Link>

            <div className={styles.navRight}>
                <ul className={styles.navList}>
                    {navbarItems.map((item) => (
                        <li key={item.name} className={styles.navItem}>
                            <Link href={item.href} className={styles.navLink}>
                                <item.icon 
                                    className={styles.navIcon} 
                                    style={item.name === "Favorites" ? {color: 'gold'} : {}} 
                                    size={18}
                                />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ThemeToggle />
            </div>
        </nav>
    );
}