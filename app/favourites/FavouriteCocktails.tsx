'use client';
import { Cocktail } from '@/lib/types';
import React from 'react'
import CocktailCard from '../components/CocktailCard';
import { getFavouritesFromSessionStorage } from '@/lib/utils';
import { useQueries } from '@tanstack/react-query';

interface LoadingCocktail {
    isLoading: boolean,
    isPlaceholderData: boolean,
    data?: Cocktail
}

const FavouriteCocktails = () => {
    const favouritesIds: string[] = getFavouritesFromSessionStorage();

    const favouriteDrinks = useQueries({
        queries: favouritesIds.map((id) => {
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

    return (
        <>
            {favourites.map(({ data }, idx) => (<CocktailCard key={`fav-cock-${idx}`} cocktail={data} />))}
        </>
    )
}

const fetchCocktailById = async (id: string): Promise<Cocktail> => {
    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id);
    const { drinks } = await res.json();
    if (drinks) {
        return drinks[0] as Cocktail;
    } else {
        throw new Error(`Drink not found for the id ${id}`);
    }
}

export default FavouriteCocktails

