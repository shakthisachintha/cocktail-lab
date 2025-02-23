import CocktailCard from "@/app/components/CocktailCard";
import { render, screen } from "@testing-library/react"

describe('CocktailCard', () => {
    it('should render loading skeleton when cocktail details are unavailable', () => {
        render(<CocktailCard />);
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
        expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('should render cocktail details when cocktail is available', () => {
        const cocktail = {
            idDrink: '1',
            strDrink: 'Margarita',
            strCategory: 'Cocktail',
            strInstructions: 'Mix it all up',
            strDrinkThumb: 'https://example.com/margarita.jpg'
        };
        render(<CocktailCard cocktail={cocktail} />);
        // there are two images and expect the first one to be the cocktail image
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', expect.stringContaining('margarita.jpg'));
        expect(screen.getByRole('heading')).toHaveTextContent(cocktail.strDrink);
        expect(screen.getAllByRole('paragraph')[0]).toHaveTextContent(cocktail.strCategory);
        expect(screen.getByRole('button', { name: /favourite/i })).toBeInTheDocument();
    });
})
