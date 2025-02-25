import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { fetchCocktailById, fetchRandomCocktail } from "./cocktail-db-utils";
import { cocktailCacheStaleTimeMins, QueryKeys } from "./constants";
import { Cocktail } from "./types";

export const useFavouriteDrinks = (favouriteIds: string[]) => useQueries({
    queries: favouriteIds.map((id) => {
        return {
            queryKey: QueryKeys.cocktailById(id),
            queryFn: () => fetchCocktailById(id),
            staleTime: 1000 * 60 * cocktailCacheStaleTimeMins,
        }
    }),
});

export const useNrandomCocktails = (n: number) => useQueries({
    queries: Array.from({ length: n }, () => {
        return {
            queryKey: [QueryKeys.randomCocktails],
            queryFn: async () => {
                return await fetchRandomCocktail();
            },
        }
    }),
});

export const useRandomInfiniteDrinks = () => useInfiniteQuery<Cocktail>({
    queryKey: [QueryKeys.randomCocktails],
    queryFn: async () => {
        return await fetchRandomCocktail();
    },
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    initialPageParam: 1,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
});