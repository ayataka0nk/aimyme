import type { Metadata } from 'next'

import './globals.css'
import './theme.css'
import { NavigationContextProvider } from '@/templates/Navigation/NavigationContext'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'AImyMe',
  description: 'For Ayataka App'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="light">
        <NavigationContextProvider>
          <Suspense>{children}</Suspense>
        </NavigationContextProvider>
      </body>
    </html>
  )
}
