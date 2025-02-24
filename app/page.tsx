'use client';
import { fetchRandomCocktail } from '@/lib/cocktail-db-utils';
import { Cocktail } from '@/lib/types';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Button } from './components/Button';
import CocktailCard from './components/CocktailCard';
import GridContainer from './components/GridContainer';

const NUMBER_FETCH_ITEMS = 5;

export default function Home() {
  // useInfiniteQuery fetches one cocktail per "page"
  const queryClient = useQueryClient();
  const { data, fetchNextPage, isFetchingNextPage, isLoading, isFetching } = useInfiniteQuery<Cocktail>({
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

  // Flatten the pages into one list
  const allCocktails: Cocktail[] = data?.pages || [];

  // Filter out duplicates based on the cocktail's idDrink
  const uniqueCocktails = allCocktails.filter(
    (cocktail, index, self) =>
      index === self.findIndex((c) => c.idDrink === cocktail.idDrink)
  );

  // If we don't have 5 unique cocktails yet, and we’re not already fetching, trigger the next fetch.
  useEffect(() => {
    if (uniqueCocktails.length < NUMBER_FETCH_ITEMS && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [uniqueCocktails, isFetchingNextPage, fetchNextPage]);

  // Refresh button handler that resets the query, causing it to refetch
  const handleRefresh = () => {
    queryClient.resetQueries({ queryKey: ['randomCocktail'] });
  };

  const RefreshButton = ({ loading, onClick }: { loading: boolean, onClick: () => void }) => {
    return <Button loading={loading} onClick={onClick}>Refresh</Button>
  };

return (
  <div>
    <GridContainer
      title='Cheers to a New Cocktail 🍹'
      description='Click the refresh button to fetch new cocktails.'
      extras={
        <RefreshButton loading={isLoading || isFetching} onClick={handleRefresh} />
      }
    >
      {uniqueCocktails.map((cocktail: Cocktail) => (
        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
      ))}
      {new Array(NUMBER_FETCH_ITEMS - uniqueCocktails.length)
        .fill(null)
        .map((_, idx) => (
          <CocktailCard key={`placeholder-${idx}`} />
        ))}
    </GridContainer>
  </div>
);
}
