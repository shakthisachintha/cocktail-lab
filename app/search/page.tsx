import { Cocktail } from "@/lib/types";
import CocktailCard from "../components/CocktailCard";
import { searchCocktails } from "@/lib/cocktail-db-utils";
interface SearchPageProps {
  searchParams: Promise<{ s?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { s: searchTerm } = await searchParams;

  if (!searchTerm) {
    return <div>No Cocktails found.</div>;
  }

  const cocktails = await searchCocktails(searchTerm);

  if (cocktails.length === 0) {
    return <div>No Cocktails found.</div>;
  }

  return (
    <div>
      <h1>Search Results for: {searchTerm}</h1>
      {cocktails.map((cocktail: Cocktail) => (
        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  );
}