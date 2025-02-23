import ImageWithFallback from "@/app/components/ImageWithFallback";
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

describe('ImageWithFallback', () => {
    it('should render the image', () => {
        render(<ImageWithFallback width={200} height={300} src="/image.png" alt="image" />);
        expect(screen.getByRole('img', { name: /image/i })).toHaveAttribute('src', expect.stringContaining('image.png'));
    });

    it('should render the fallback image when the image fails to load', async () => {
        render(
            <ImageWithFallback width={200} height={300} src="/notfound.png" alt="image" />
        );

        const img = screen.getByRole('img');
        fireEvent.error(img);

        await waitFor(() => {
            expect(img).toHaveAttribute('src', expect.stringContaining('fallback.png'));
        }, { timeout: 10000 });
    });
})
