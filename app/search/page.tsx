import { Cocktail } from "@/lib/types";
import CocktailCard from "../components/CocktailCard";

interface SearchPageProps {
  searchParams: Promise<{ s?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { s: searchTerm } = await searchParams;

  if (!searchTerm) {
    return <div>No Cocktails found.</div>;
  }

  const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchTerm);
  const cocktails = await res.json() as { drinks?: Cocktail[] }

  if (!cocktails.drinks) {
    return <div>No Cocktails found.</div>;
  }

  return (
    <div>
      <h1>Search Results for: {searchTerm}</h1>
      {cocktails.drinks.map((cocktail: Cocktail) => (
        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  );
}