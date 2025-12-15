'use client';

import { useEffect } from 'react';
import styles from './styles/error.module.css';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Launches error:', error);
    }, [error]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Something went wrong!</h2>
            <p className={styles.message}>
                {error.message || 'Failed to load launches'}
            </p>
            <button onClick={reset} className={styles.button}>
                Try again
            </button>
        </div>
    );
}
