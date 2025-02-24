import { t } from "@/i18n/locale_service";
import CocktailCard from "../components/CocktailCard";
import GridContainer from "../components/GridContainer";

export default function SearchPageLoader() {
    return (
        <div>
            <GridContainer title={t("search_results")} description={t("results_loading")}
                path={[{ label: t("search") }]}>
                {new Array(10).fill(null).map((_c, idx) => (
                    <CocktailCard key={`loading-${idx}`} />
                ))}
            </GridContainer>
        </div >
    );
}