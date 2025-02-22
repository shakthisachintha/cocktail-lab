import { Cocktail } from '@/lib/types'
import React from 'react'
import CocktailCard from './CocktailCard'

interface Props {
  data: Cocktail[]
}

const CocktailCardsContainer = ({ data }: Props) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
      {data.map((cocktail: Cocktail) => (
        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  )
}

export default CocktailCardsContainer