import { Metadata } from 'next';
import FavouriteCocktails from './FavouriteCocktails';
import BreadCrumbs from '../components/BreadCrumbs';

const FavouritesPage = () => {
  
  return (
    <>
      <BreadCrumbs items={['Home', 'Favourites']} />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
        <FavouriteCocktails />
      </div>
    </>
  )
}

export default FavouritesPage

export const metadata: Metadata = {
  title: 'Cocktail Labs - Favourites',
  description: 'Your favourite drinks on Cocktail Labs'
}