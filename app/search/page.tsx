import { Cocktail } from "@/lib/types";
import CocktailCard from "../components/CocktailCard";
import { searchCocktails } from "@/lib/cocktail-db-utils";
import GridContainer from "../components/GridContainer";
interface SearchPageProps {
  searchParams: Promise<{ s?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { s } = await searchParams;
  const searchTerm = s?.trim();
  let cocktails: Cocktail[] = [];

  if (!searchTerm) {
    cocktails = [];
  } else {
    cocktails = await searchCocktails(searchTerm);
  }

  return (
      <GridContainer title="Search Results" description={`Showing ${cocktails.length} results for "${searchTerm}"`}
        path={[{ label: "Search" }]}>
        {cocktails.length > 0 ? cocktails.map((cocktail: Cocktail) => (
          <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
        )) : <NoSearchResults />}
      </GridContainer>
  );
}

const NoSearchResults = () =>
  <div className="text-center text-gray-500">
    <p>No search results found.</p>
  </div>;

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { s } = await searchParams;
  const searchTerm = s?.trim();

  return {
    title: `Search | Cocktail Labs`,
    description: `Search results for ${searchTerm}.`,
  };
}