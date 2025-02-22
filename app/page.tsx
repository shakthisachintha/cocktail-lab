'use client';
import { Cocktail } from "@/lib/types";
import { useEffect, useState } from "react";
import CocktailCardsContainer from "./components/CocktailCardsContainer";

const fetchRandomCocktail = async () => {
  const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  const cocktails = await res.json() as { drinks: Cocktail[] }
  return cocktails.drinks[0]
}

// Async generator function that yields unique cocktails
async function* uniqueRandomCocktailsGenerator(count: number) {
  const fetchedIds = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 10;

  while (fetchedIds.size < count && attempts < maxAttempts) {
    attempts++;
    const cocktail = await fetchRandomCocktail();
    if (!fetchedIds.has(cocktail.idDrink)) {
      fetchedIds.add(cocktail.idDrink);
      yield cocktail;
    }
    // Optionally, add a small delay between requests to ease server load:
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}
export default function Home() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    const loadCocktails = async () => {
      // Using for-await-of to iterate over the generator as results become available
      for await (const cocktail of uniqueRandomCocktailsGenerator(5)) {
        setCocktails(prev => [...prev, cocktail]);
      }
    };
    loadCocktails();
  }, []);

  return (
    <div>
      <div className="flex justify-end items-center">
        {/* Optionally add a Load More button or similar */}
      </div>
      <CocktailCardsContainer data={cocktails} />
    </div>
  );
}