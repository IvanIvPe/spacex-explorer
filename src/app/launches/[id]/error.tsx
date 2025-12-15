'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './styles/error.module.css';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Launch details error:', error);
    }, [error]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Something went wrong!</h2>
            <p className={styles.message}>
                {error.message || 'Failed to load launch details'}
            </p>
            <div className={styles.actions}>
                <button onClick={reset} className={styles.button}>
                    Try again
                </button>
                <Link href="/launches" className={styles.buttonSecondary}>
                    Back to Launches
                </Link>
            </div>
        </div>
    );
}
