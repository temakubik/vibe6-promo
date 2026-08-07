import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Челленджи',
  description: '30-дневные челленджи с общей группой, регулярными отчётами и регистрацией участников.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
