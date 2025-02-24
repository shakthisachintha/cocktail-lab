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


export const useRandomInfiniteDrinks = () => useInfiniteQuery<Cocktail>({
    queryKey: ['randomCocktail'],
    queryFn: async () => {
        await new Promise<void>(res => setTimeout(() => res(), 1000));
        return await fetchRandomCocktail();
    },
    // We'll use the page count simply to trigger the next page.
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    initialPageParam: 1,
    staleTime: Infinity,             // Keep data fresh indefinitely
    refetchOnMount: false,           // Do not refetch when remounting
    refetchOnWindowFocus: false,     // Do not refetch on window focus
});