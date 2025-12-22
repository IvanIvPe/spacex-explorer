'use client';

import ErrorComponent from '@/components/ui/Error/Error';

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
            message={error.message || 'Failed to load launches'}
        />
    );
}
