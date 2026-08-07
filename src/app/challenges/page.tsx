import type { Metadata } from 'next'
import { Footer } from '@/components/site/FAQ'
import { Navbar } from '@/components/site/Navbar'
import ChallengesPageClient from './ChallengesPageClient'

export const metadata: Metadata = {
  title: 'Челленджи | Vibe - 6',
  description:
    '30-дневный формат челленджей: один вызов на участника, общая группа, регулярные отчёты и регистрация.',
}

export default function ChallengesPage() {
  return (
    <>
      <Navbar />
      <ChallengesPageClient />
      <Footer />
    </>
  )
}
