import SearchBox from "../../app/components/SearchBox";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

describe('SearchBox', () => {
    const renderSearchBox = () => {
        const onChange = vi.fn();
        render(<SearchBox onChange={onChange} />);

        return {
            input: screen.getByPlaceholderText(/search/i),
            user: userEvent.setup(),
            onChange,
        }
    }

    it('should render search box', () => {
        const { input } = renderSearchBox();
        expect(input).toBeInTheDocument();
    });

    it('should call onChange when enter is pressed', async () => {
        const { input, onChange, user } = renderSearchBox();
        
        const searchTerm = "search query";

        await user.type(input, searchTerm + '{enter}');
        expect(onChange).toHaveBeenCalledWith(searchTerm);
    });

    it('it should not call onChange on empty strings', async () => {
        const { input, onChange, user } = renderSearchBox();

        await user.type(input, '{enter}');
        expect(onChange).not.toHaveBeenCalled();
    });
})
