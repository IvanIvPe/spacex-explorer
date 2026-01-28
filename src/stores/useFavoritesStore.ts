import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      hasHydrated: false,
      setHasHydrated: (hydrated: boolean) => set({ hasHydrated: hydrated }),
      
      removeFavorite: (id: string) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((favId) => favId !== id),
        })),
       
      toggleFavorite: (id: string) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favId) => favId !== id)
            : [...state.favoriteIds, id],
        })),
    }),
    {
      name: 'spacex_favorites',
      storage:
        typeof window !== 'undefined'
          ? createJSONStorage(() => window.localStorage)
          : undefined,
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
      skipHydration: true,
      onRehydrateStorage: () => (state, error) => {
        if (!error) {
          state?.setHasHydrated(true);
        }
      },
    }
  )
);
