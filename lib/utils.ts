import { maxUserInputSize, siteTitle } from "./constants";

export function getFavouritesFromSessionStorage(): string[] {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
        const favourites = sessionStorage.getItem('favourites');
        return favourites ? JSON.parse(favourites) : [];
    } else {
        return [];
    }
}

export function generatePageTitle(pageName: string) {
    return `${pageName} | ${siteTitle}`;
}

export function sanitizeUserInputs(term: string, maxLength = maxUserInputSize): string {
    let sanitized = term.trim().slice(0, maxLength);
    // Allow only alphanumeric characters and spaces
    sanitized = sanitized.replace(/[^a-zA-Z0-9 ]/g, '');
    return sanitized;
}
