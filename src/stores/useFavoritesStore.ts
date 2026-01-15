import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      
      addFavorite: (id: string) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds
            : [...state.favoriteIds, id],
        })),
      
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
      
      isFavorite: (id: string) => get().favoriteIds.includes(id),
    }),
    {
      name: 'spacex_favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
