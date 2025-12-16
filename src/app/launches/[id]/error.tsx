'use client';

import Link from 'next/link';
import ErrorComponent from '@/components/ui/Error/Error';
import Button from '@/components/ui/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <ErrorComponent
            error={error}
            reset={reset}
            message={error.message || 'Failed to load launch details'}
        >
            <Link href="/launches">
                <Button variant="secondary">Back to Launches</Button>
            </Link>
        </ErrorComponent>
    );
}
