import React from 'react';
import Link from 'next/link';
import styles from '@/app/components/Navbar/Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      
      <Link href="/" className={styles.logo}>
        <img 
            src="/rocketlogo.png" 
            alt="App Logo" 
            className={styles.logoImage} 
        />
        <span className={styles.logoText}>Space X Explorer</span>
      </Link>

      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/favorites" className={styles.navLink}>Favorites</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/launch-list" className={styles.navLink}>Launch List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;