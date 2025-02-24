'use client';
import { numberFetchItemsInHomePage, siteTitle } from '@/lib/constants';
import { useRandomInfiniteDrinks } from '@/lib/hooks';
import { Cocktail } from '@/lib/types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Button } from './components/Button';
import CocktailCard from './components/CocktailCard';
import GridContainer from './components/GridContainer';
import { RedoOutlined } from '@ant-design/icons';
import { t } from '@/i18n/locale_service';


export default function Home() {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, isFetchingNextPage, isLoading, isFetching } = useRandomInfiniteDrinks();

  const allCocktails: Cocktail[] = data?.pages || [];

  // Filter out duplicates based on the cocktail's idDrink
  const uniqueCocktails = allCocktails.filter(
    (cocktail, index, self) =>
      index === self.findIndex((c) => c.idDrink === cocktail.idDrink)
  );

  // If we don't have 5 unique cocktails yet, and we’re not already fetching, trigger the next fetch.
  useEffect(() => {
    if (uniqueCocktails.length < numberFetchItemsInHomePage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [uniqueCocktails, isFetchingNextPage, fetchNextPage]);

  // Refresh button handler that resets the query, causing it to refetch
  const handleRefresh = () => {
    queryClient.resetQueries({ queryKey: ['randomCocktail'] });
  };

  const RefreshButton = ({ loading, onClick }: { loading: boolean, onClick: () => void }) => {
    return <Button icon={<RedoOutlined />} loading={loading} onClick={onClick}> </Button>
  };

  return (
    <div>

      <header className="landing-header">
        <h1 className="">{t("welcome_text", [siteTitle])}</h1>
        <p className="md:text-xl max-w-2xl mx-auto">{t("welcome_desc")}</p>
      </header>

      <GridContainer
        title="Start Exploring"
        description="Here are some random cocktails to get you started."
        extras={<RefreshButton loading={isLoading || isFetching} onClick={handleRefresh} />}
      >
        {uniqueCocktails.map((cocktail: Cocktail) => (
          <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
        ))}
        {new Array(numberFetchItemsInHomePage - uniqueCocktails.length)
          .fill(null)
          .map((_, idx) => (
            <CocktailCard key={`placeholder-${idx}`} />
          ))}
      </GridContainer>

    </div>
  );
}
