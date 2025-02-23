import { Metadata } from 'next';
import FavouriteCocktails from './FavouriteCocktails';
import GridContainer from '../components/GridContainer';

const FavouritesPage = () => {

  return (
    <GridContainer title='Favourites' description='Your favourite drinks on Cocktail Labs.'
      path={[{ label: 'Favourites' }]}>
      <FavouriteCocktails />
    </GridContainer>
  )
}

export default FavouritesPage

export const metadata: Metadata = {
  title: 'Favourites | Cocktail Labs',
  description: 'Your favourite drinks on Cocktail Labs.'
}