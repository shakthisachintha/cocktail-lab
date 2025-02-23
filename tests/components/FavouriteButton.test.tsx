// FavouriteButton.test.tsx
import FavouriteButton from '@/app/components/FavouriteButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FavouriteButton functionality', () => {
  const cocktailId = '123';

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('adds the cocktailId to sessionStorage on first click and removes it on second click', async () => {
    render(<FavouriteButton cocktailId={cocktailId} />);
    
    expect(sessionStorage.getItem('favourites')).toBeNull();

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Favourite' });

    // First click: adds cocktailId to sessionStorage
    await user.click(button);
    let favourites = JSON.parse(sessionStorage.getItem('favourites') || '[]');
    expect(favourites).toContain(cocktailId);

    // Second click: removes cocktailId from sessionStorage
    await user.click(button);
    favourites = JSON.parse(sessionStorage.getItem('favourites') || '[]');
    expect(favourites).not.toContain(cocktailId);
  });
});
