import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Guthinabailu Organic Food Products',
  description: 'Pure organic products directly from our farms to your table. Experience the authentic taste of nature with our premium organic honey and virgin coconut oil.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-stone-50 text-gray-800`}>
        {children}
      </body>
    </html>
  )
} 