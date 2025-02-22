'use client';
import { Cocktail } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import CocktailCard from '../components/CocktailCard';
import { getFavouritesFromSessionStorage } from '@/lib/utils';

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<Cocktail[]>([]);

  const fetchFavourites = async () => {
    const favouritesIds: string[] = getFavouritesFromSessionStorage();

    const results = await Promise.allSettled(
      favouritesIds.map(async (id) => {
        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        return data.drinks ? data.drinks[0] : null;
      })
    );

    // Filter out fulfilled promises and their values
    const cocktails = results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => (result as PromiseFulfilledResult<Cocktail>).value);

    setFavourites(cocktails);
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <>
      {favourites.map((cocktail) => (<CocktailCard key={cocktail.idDrink} cocktail={cocktail} />))}
    </>
  )
}

export default FavouritesPage