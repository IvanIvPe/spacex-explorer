const FAVORITES_KEY = 'spacex_favorites';

export const getFavorites = (): string[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
};

export const saveFavorites = (favorites: string[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const toggleFavorite = (id: string): string[] => {
    const favorites = getFavorites();
    const newFavorites = favorites.includes(id)
        ? favorites.filter(favId => favId !== id)
        : [...favorites, id];
    saveFavorites(newFavorites);
    return newFavorites;
};

export const isFavorite = (id: string): boolean => {
    return getFavorites().includes(id);
};
