export function getFavouritesFromSessionStorage(): string[] {
    const favourites = sessionStorage.getItem('favourites');
    return favourites ? JSON.parse(favourites) : [];
}