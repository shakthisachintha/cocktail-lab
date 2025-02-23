import BreadCrumbs from "@/app/components/BreadCrumbs";
import { render, screen } from "@testing-library/react"

describe('BreadCrumb', () => {
    it('should render home link by default', () => {
        render(<BreadCrumbs items={[]} />);
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    });

    it('should render the correct number of breadcrumbs', () => {
        const items = [
            { label: 'Search', href: '/search' },
            { label: 'Favourites', href: '/favourites' },
        ];
        render(<BreadCrumbs items={items} />);
        const links = screen.getAllByRole('link');
        
        expect(links).toHaveLength(3);
        for (let i = 0; i < items.length; i++) {
            expect(links[i]).toHaveTextContent(items[i].label);
        }
    });
})
