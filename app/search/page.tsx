import { Cocktail } from "@/lib/types";
import CocktailCard from "../components/CocktailCard";
import { searchCocktails } from "@/lib/cocktail-db-utils";
import GridContainer from "../components/GridContainer";
import { t } from "@/i18n/locale_service";
import { generatePageTitle, sanitizeUserInputs } from "@/lib/utils";
import Pagination from "../components/Pagination";
import { paginationEnablePageSize } from "@/lib/constants";
interface SearchPageProps {
  searchParams: Promise<{
    s: string,
    page: string
  }>;
}
const pageSize = paginationEnablePageSize;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { s: searchTerm, page: pageStr } = await searchParams;
  let cocktails: Cocktail[] = [];

  if (!searchTerm) {
    cocktails = [];
  } else {
    const sanitizedTerm = sanitizeUserInputs(searchTerm);
    cocktails = await searchCocktails(sanitizedTerm);
  }

  const page = parseInt(pageStr) || 1;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const drinksToDisplay = cocktails.slice(start, end);
  const enablePagination = cocktails.length > pageSize;
  const paginatedDescription = t("paginated_results_desc", [drinksToDisplay.length, cocktails.length, searchTerm]);

  return (
    <div>
      <GridContainer title={t("search_results")}
        description={paginatedDescription}
        path={[{ label: t("search") }]}>
        {drinksToDisplay.length > 0 ? drinksToDisplay.map((cocktail: Cocktail) => (
          <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
        )) : <NoSearchResults />}

      </GridContainer>

      {enablePagination && <div className="flex justify-center my-10">
        <Pagination currentPage={page} perPage={pageSize} total={cocktails.length} />
      </div>}
    </div>

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