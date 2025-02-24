import QueryClientProvider from '@/lib/providers/QueryClientProvider'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import ThemeProvider from '../lib/providers/ThemeProvider'
import NavBar from './components/NavBar'
import './globals.css'
import { siteTitle } from '@/lib/constants'
import Footer from './components/Footer'

const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark-theme">
      <body className={inter.variable}>
        <ThemeProvider>
          <QueryClientProvider>
            <NavBar />
            <main className='container mx-auto px-2 mb-4'>
              {children}
            </main>
            <Footer />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


export const metadata: Metadata = {
  title: siteTitle,
  description: 'Cocktail Labs is a cocktail recipe app that fetches cocktails from theCocktailDB.com API.',
  keywords: ['cocktail', 'recipe', 'drink', 'alcohol'],
}
