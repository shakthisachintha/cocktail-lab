'use client';
import { numberFetchItemsInHomePage, QueryKeys, siteTitle } from '@/lib/constants';
import { useRandomInfiniteDrinks } from '@/lib/hooks';
import { Cocktail } from '@/lib/types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Button } from './components/Button';
import CocktailCard from './components/CocktailCard';
import GridContainer from './components/GridContainer';
import { RedoOutlined } from '@ant-design/icons';
import { t } from '@/i18n/locale_service';


export default function Home() {
  const previousCocktails = useRef<string[]>([]);
  const queryClient = useQueryClient();
  const { data, fetchNextPage, isFetchingNextPage, isLoading, isFetching, isPending, isError } = useRandomInfiniteDrinks();
  const allCocktails: Cocktail[] = data?.pages || [];

  const uniqueCocktails = allCocktails.filter((cocktail) => {
    if (previousCocktails.current.includes(cocktail.idDrink)) {
      return false;
    }
    return true;
  });

  uniqueCocktails.forEach((cocktail) => {
    queryClient.setQueryData(QueryKeys.cocktailById(cocktail.idDrink), cocktail);
  });

  useEffect(() => {
    if ((!isFetchingNextPage && !isPending && !isError) && uniqueCocktails.length < numberFetchItemsInHomePage) {
      fetchNextPage();
    }
  }, [uniqueCocktails, isFetchingNextPage, fetchNextPage, isError, isPending]);

  const handleRefresh = () => {
    previousCocktails.current = [
      ...previousCocktails.current,
      ...uniqueCocktails.map((cocktail) => cocktail.idDrink)
    ];
    queryClient.resetQueries({ queryKey: [QueryKeys.randomCocktails] });
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
            <CocktailCard hasError={isError} key={`placeholder-${idx}`} />
          ))}
      </GridContainer>

    </div>
  );
}
