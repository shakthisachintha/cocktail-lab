'use client';
export function getFavouritesFromSessionStorage(): string[] {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
        const favourites = sessionStorage.getItem('favourites');
        return favourites ? JSON.parse(favourites) : [];
    } else {
        return [];
    }
}