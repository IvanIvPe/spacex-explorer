'use client';

import { useThemeStore } from '@/stores/useThemeStore';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme, hasHydrated } = useThemeStore();

  if (!hasHydrated) {
    return <div className={styles.placeholder} aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className={theme === 'dark' ? styles.sunIcon : styles.moonIcon} />
    </button>
  );
}
