'use client';
import { t } from '@/i18n/locale_service';
import { useFavouriteDrinks } from '@/lib/hooks';
import { Cocktail } from '@/lib/types';
import { getFavouritesFromSessionStorage } from '@/lib/utils';
import { useEffect, useState } from 'react';
import CocktailCard from '../components/CocktailCard';
interface LoadingCocktail {
    isLoading: boolean,
    isPlaceholderData: boolean,
    data?: Cocktail,
    error: boolean
}

const FavouriteCocktails = () => {
    const [favouriteIds, setFavouriteIds] = useState<string[]>([]);

    useEffect(() => {
        setFavouriteIds(getFavouritesFromSessionStorage());
    }, []);

    const favouriteDrinks = useFavouriteDrinks(favouriteIds);

    const favourites: LoadingCocktail[] = favouriteDrinks.map((favourite) => ({
        isLoading: favourite.isLoading,
        isPlaceholderData: favourite.isPlaceholderData,
        data: favourite.data,
        error: favourite.isError,
    }));

    const onUnFavourite = (id: string) => {
        setFavouriteIds((prev) => prev.filter((favId) => favId !== id));
    }

    return (
        favourites.length > 0 ?
            favourites.map((favourite, idx) => (
                <CocktailCard hasError={favourite.error} key={favourite.data?.idDrink || `fav-${idx}`} cocktail={favourite.data} onUnfavourite={onUnFavourite} />
            ))
            : <NoFavourites />
    )
}

const NoFavourites = () => {
    return <div>
        <h2 className="sub-title-text">{t("no_favourites")}</h2>
    </div>;
}


export default FavouriteCocktails

