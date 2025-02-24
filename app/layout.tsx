import QueryClientProvider from '@/providers/QueryClientProvider'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import ThemeProvider from '../providers/ThemeProvider'
import NavBar from './components/NavBar'
import './globals.css'

const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ThemeProvider>
          <QueryClientProvider>
            <NavBar />
            <main className='container mx-auto px-2'>
              {children}
            </main>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


export const metadata: Metadata = {
  title: 'Cocktail Labs',
  description: 'Cocktail Labs is a cocktail recipe app that fetches random cocktails from an API.',
  keywords: ['cocktail', 'recipe', 'drink', 'alcohol'],
}
