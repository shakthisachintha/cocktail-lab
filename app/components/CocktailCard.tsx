import { Cocktail } from "@/lib/types"
import Skeleton from 'react-loading-skeleton'
import FavouriteButton from './FavouriteButton'
import ImageWithFallback from './ImageWithFallback'
import './CocktailCard.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { t } from "@/i18n/locale_service"

interface Props {
    cocktail?: Cocktail
    onUnfavourite?: (id: string) => void,
    hasError?: boolean
}

export default function CocktailCard({ cocktail, onUnfavourite, hasError }: Props) {

    if (!cocktail) {
        return <div className='cocktail-card'>
            <Skeleton className="cover-image" height={250} />
            <div className='flex flex-col p-5'>
                <div className='flex justify-between mb-2'>
                    <div>
                        <Skeleton width={200} height={30} />
                        <Skeleton width={100} height={20} />
                    </div>
                    <Skeleton width={50} height={50} />
                </div>
                <div className='mt-5'>
                    <Skeleton count={2} />
                </div>
            </div>
            {hasError && <p className='error-text'>{t("cocktail_error")}</p>}
        </div>
    }

    return <div className='cocktail-card'>
        <ImageWithFallback className='cover-image' src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width={500} height={500} />
        <div className='flex flex-col p-5'>
            <div className='flex justify-between mb-2'>
                <div>
                    <h2 className='title-text'>{cocktail.strDrink}</h2>
                    <p className='category-text'>{cocktail.strCategory}</p>
                </div>
                <FavouriteButton onUnFavourite={onUnfavourite} cocktailId={cocktail.idDrink} />
            </div>
            <p className='instruction-text'>{cocktail.strInstructions}</p>
        </div>
    </div>
}
