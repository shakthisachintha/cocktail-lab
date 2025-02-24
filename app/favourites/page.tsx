import { Metadata } from 'next';
import FavouriteCocktails from './FavouriteCocktails';
import GridContainer from '../components/GridContainer';
import { t } from '@/i18n/locale_service';
import { siteTitle } from '@/lib/constants';

const FavouritesPage = () => {

  return (
    <GridContainer title={t('favourites')} description={t('favourites_desc')}
      path={[{ label: t('favourites') }]}>
      <FavouriteCocktails />
    </GridContainer>
  )
}

export default FavouritesPage

export const metadata: Metadata = {
  title: `${t('favourites')} | ${siteTitle}`,
  description: t('favourites_desc'),
  keywords: ['favourites', 'cocktails', 'drinks', 'alcohol'],
}