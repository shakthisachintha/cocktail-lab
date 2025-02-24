import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { Cocktail } from "./types"
import { searchCacheStaleTimeMins } from "./constants";

const API_KEY = '1';
const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}`;

const callApiWithErrorHandling = async (path: string, options?: RequestInit): Promise<Cocktail[]> => {
    const res = await fetch(BASE_URL + path, options);
    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${path}`);
    }
    const { drinks } = await res.json();
    return drinks || [];
}

export const fetchCocktailById = async (id: string): Promise<Cocktail> => {
    const res = await callApiWithErrorHandling("/lookup.php?i=" + id)
    return res[0];
}

export const searchCocktails = async (searchTerm: string): Promise<Cocktail[]> => {
    return callApiWithErrorHandling(`/search.php?s=${searchTerm}`, { next: { revalidate: searchCacheStaleTimeMins * 60 }, cache: 'force-cache' });
}

export const fetchRandomCocktail = async (): Promise<Cocktail> => {
    const res = await callApiWithErrorHandling('/random.php');
    return res[0];
}
