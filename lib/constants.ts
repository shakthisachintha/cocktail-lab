export const siteTitle = 'Cocktail Labs';
export const maxUserInputSize = 50;
export const cocktailCacheStaleTimeMins = 10;
export const searchCacheStaleTimeMins = 5;
export const numberFetchItemsInHomePage = 5;
export const paginationEnablePageSize = 6;

export const Routes = {
    home: '/',
    favourites: '/favourites',
    search: '/search'
}

export const StaticImageAssets = {
    logo: '/logo.png',
    fallback: '/fallback.png'
} 

export const QueryKeys = {
    cocktailById: (id: string) => ['cocktail', id],
    searchCocktails: (query: string) => ['search', query],
    favouriteDrinks: 'favourites',
    randomCocktails: 'randomCocktails'
}