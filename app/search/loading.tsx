import CocktailCard from "../components/CocktailCard";
import GridContainer from "../components/GridContainer";

export default function SearchPageLoader() {
    return (
        <div>
            <GridContainer title="Search Results" description="Loading search results..."
                path={[{ label: "Search" }]}>
                {new Array(10).fill(null).map((_c, idx) => (
                    <CocktailCard key={`loading-${idx}`} />
                ))}
            </GridContainer>
        </div >
    );
}