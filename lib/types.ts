export type Cocktail = {
    idDrink: string
    strDrink: string
    strDrinkThumb: string
    strCategory: string
    strInstructions: string
}

export type BreadCrumbPath = {
    label: string
    href?: string
}

export type ErrorProps = {
    error?: Error & { digest?: string }
    reset?: () => void,
}
