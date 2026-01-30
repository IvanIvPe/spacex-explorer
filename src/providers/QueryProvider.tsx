'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useThemeStore } from '@/stores/useThemeStore';

export default function QueryProvider({ children }: { children: ReactNode }) {
    const theme = useThemeStore((state) => state.theme);
    const hasHydrated = useThemeStore((state) => state.hasHydrated);
    
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
            },
        },
    }));

    useEffect(() => {
        useFavoritesStore.persist.rehydrate();
        useThemeStore.persist.rehydrate();
    }, []);

    useEffect(() => {
        if (hasHydrated) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme, hasHydrated]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
