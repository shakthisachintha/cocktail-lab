'use client'

import { createContext, useEffect, useState } from 'react'

type ThemeContextType = {
    theme: 'light-theme' | 'dark-theme';
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: 'dark-theme', toggleTheme: () => { } });

export default function ThemeProvider({ children }: React.PropsWithChildren) {
    const [theme, setTheme] = useState<'light-theme' | 'dark-theme'>('dark-theme');

    useEffect(() => {
        // Update the html element class to the theme
        document.documentElement.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
}