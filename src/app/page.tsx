'use client'

import { Navbar } from '@/components/site/Navbar'
import { Hero } from '@/components/site/Hero'
import { KeyNumbers, WhatWillBe, ForWhom } from '@/components/site/Sections'
import { Program } from '@/components/site/Program'
import { About } from '@/components/site/About'
import { Location, Prizes } from '@/components/site/Location'
import { FAQ, FinalCTA, Footer } from '@/components/site/FAQ'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <KeyNumbers />
        <WhatWillBe />
        <ForWhom />
        <Program />
        <About />
        <Location />
        <Prizes />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
