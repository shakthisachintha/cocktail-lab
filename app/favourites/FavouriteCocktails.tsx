'use client';
import { Cocktail } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import CocktailCard from '../components/CocktailCard';
import { useQueries } from '@tanstack/react-query';
import { fetchCocktailById } from '@/lib/cocktail-db-utils';
import { getFavouritesFromSessionStorage } from '@/lib/utils';
interface LoadingCocktail {
    isLoading: boolean,
    isPlaceholderData: boolean,
    data?: Cocktail
}

const FavouriteCocktails = () => {
    const [favouriteIds, setFavouriteIds] = useState<string[]>([]);

    useEffect(() => {
        setFavouriteIds(getFavouritesFromSessionStorage());
    }, []);

    const favouriteDrinks = useQueries({
        queries: favouriteIds.map((id) => {
            return {
                queryKey: ['cocktail', id],
                queryFn: () => fetchCocktailById(id),
                staleTime: 1000 * 60 * 10
            }
        }),
    });

    const favourites: LoadingCocktail[] = favouriteDrinks.map((favourite) => ({
        isLoading: favourite.isLoading,
        isPlaceholderData: favourite.isPlaceholderData,
        data: favourite.data,
    }));

    const onUnFavourite = (id: string) => {
        setFavouriteIds((prev) => prev.filter((favId) => favId !== id));
    }

    return (
        <>
            {favourites.map(({ data }, idx) => (<CocktailCard onUnfavourite={onUnFavourite} key={`fav-cock-${idx}`} cocktail={data} />))}
        </>
    )
}

export default FavouriteCocktails

