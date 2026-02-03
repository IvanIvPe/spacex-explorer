'use client';

import { useEffect, ReactNode } from 'react';
import Button from '@/components/ui/Button';
import styles from './Error.module.css';
import { AlertTriangle } from 'lucide-react';

interface ErrorComponentProps {
    error?: Error & { digest?: string };
    reset?: () => void;
    title?: string;
    message?: string;
    children?: ReactNode;
}

export default function ErrorComponent({
    error,
    reset,
    title = 'Something went wrong!',
    message,
    children,
}: ErrorComponentProps) {
    useEffect(() => {
        if (error) {
            console.error('Error:', error);
        }
    }, [error]);

    const displayMessage = message || error?.message || 'An error occurred';

    return (
        <div className={styles.container}>
            <AlertTriangle className={styles.icon} size={64} />
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.message}>{displayMessage}</p>
            <div className={styles.actions}>
                {reset && (
                    <Button onClick={reset} variant="primary">
                        Try again
                    </Button>
                )}
                {children}
            </div>
        </div>
    );
}
