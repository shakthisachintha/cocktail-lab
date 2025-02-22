import Image from 'next/image'
import { Cocktail } from "@/lib/types"
import FavouriteButton from './FavouriteButton'

interface Props {
    cocktail?: Cocktail
}

export default function CocktailCard({ cocktail }: Props) {

    if (!cocktail) {
        return <div>Loading...</div>
    }

    return <div className='border p-5'>
        <Image src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width={500} height={500} />
        <div className='flex justify-between items-center'>
            <div>
                <h2>{cocktail.strDrink}</h2>
                <p>{cocktail.strCategory}</p>
            </div>

            <FavouriteButton cocktailId={cocktail.idDrink} />
        </div>
    </div>
}
