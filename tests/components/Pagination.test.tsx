import Pagination from "@/app/components/Pagination";
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import mockRouter from 'next-router-mock';

describe('Pagination', () => {

    beforeAll(() => {
        vi.mock('next/navigation', async () => {
            const { useRouter } = await vi.importActual<typeof import('next-router-mock')>('next-router-mock');
            const useSearchParams = vi.fn().mockImplementation(() => {
                const router = useRouter();
                return new URLSearchParams(router.query?.toString());
            });
            return {
                useRouter: vi.fn().mockImplementation(useRouter),
                useSearchParams,
            };
        });
    });

    // 4 is the number of additional buttons (Previous, Next, First, Last)
    const additionalButtons = 4;
    const renderPagination = () => {
        const data = { currentPage: 2, perPage: 5, total: 15 };
        render(<Pagination {...data} />);
        const nextPageButton = screen.getByRole('button', { name: 'next-page' });
        const previousPageButton = screen.getByRole('button', { name: 'previous-page' });
        const firstPageButton = screen.getByRole('button', { name: 'first-page' });
        const lastPageButton = screen.getByRole('button', { name: 'last-page' });
        return {
            nextPageButton,
            previousPageButton,
            firstPageButton,
            lastPageButton,
            data,
            user: userEvent.setup(),
        }
    }

    it('should render the correct number of pages', () => {
        const { data } = renderPagination();
        const pageButtons = screen.getAllByRole('button');

        expect(pageButtons).toHaveLength(Math.ceil(data.total / data.perPage) + additionalButtons);
        pageButtons.slice(additionalButtons / 2, -(additionalButtons / 2)).forEach((button, index) => {
            expect(button).toHaveTextContent((index + 1).toString());
        });
    });

    it('should navigate to the correct page when page number clicked', async () => {
        const { user } = renderPagination();
        const page = 2;

        const secondPageButton = screen.getByRole('button', { name: page.toString() });
        await user.click(secondPageButton);

        expect(screen.getByRole('button', { name: page.toString() })).toHaveClass('btn-blue');
        expect(mockRouter.query.page).toBe(page.toString());
    });

    it("should navigate correctly with the next and previous buttons", async () => {
        const { user, nextPageButton, previousPageButton } = renderPagination();
        const page = 2;

        await user.click(nextPageButton);

        waitFor(() => {
            expect(screen.getByRole('button', { name: (page + 1).toString() })).toHaveClass('btn-blue');
            expect(mockRouter.query.page).toBe((page + 1).toString());
        });

        await user.click(previousPageButton);
        waitFor(() => {
            expect(screen.getByRole('button', { name: page.toString() })).toHaveClass('btn-blue');
            expect(mockRouter.query.page).toBe(page.toString());
        });
    });

    it("should navigate correctly with the first and last buttons", async () => {
        const { user, lastPageButton, firstPageButton, data } = renderPagination();
        const lastPage = Math.ceil(data.total / data.perPage);

        await user.click(lastPageButton);
        waitFor(() => {
            expect(screen.getByRole('button', { name: lastPage.toString() })).toHaveClass('btn-blue');
            expect(mockRouter.query.page).toBe(lastPage.toString());
        });

        await user.click(firstPageButton);
        waitFor(() => {
            expect(screen.getByRole('button', { name: '1' })).toHaveClass('btn-blue');
            expect(mockRouter.query.page).toBe('1');
        });
    });
})
