import { Cocktail } from "@/lib/types";
import CocktailCard from "../components/CocktailCard";
import { searchCocktails } from "@/lib/cocktail-db-utils";
import GridContainer from "../components/GridContainer";
import { t } from "@/i18n/locale_service";
import { generatePageTitle, sanitizeUserInputs } from "@/lib/utils";
interface SearchPageProps {
  searchParams: Promise<{ s?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { s: searchTerm } = await searchParams;
  let cocktails: Cocktail[] = [];

  if (!searchTerm) {
    cocktails = [];
  } else {
    const sanitizedTerm = sanitizeUserInputs(searchTerm);
    cocktails = await searchCocktails(sanitizedTerm);
  }

  return (
    <GridContainer title={t("search_results")} description={t("search_results_desc", [cocktails.length, searchTerm])}
      path={[{ label: t("search") }]}>
      {cocktails.length > 0 ? cocktails.map((cocktail: Cocktail) => (
        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
      )) : <NoSearchResults />}
    </GridContainer>
  );
}

const NoSearchResults = () =>
  <div>
    <h2 className="sub-title-text">{t("no_results")}</h2>
  </div>;

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { s } = await searchParams;
  const searchTerm = s?.trim();

  return {
    title: generatePageTitle(t("search")),
    description: t("serach_restults_desc_2", [searchTerm]),
  };
}