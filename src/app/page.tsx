'use client'

import { useState, useCallback } from 'react'
import { Navbar } from '@/components/site/Navbar'
import { Hero } from '@/components/site/Hero'
import { KeyNumbers, Format, WhatWillBe, ForWhom } from '@/components/site/Sections'
import { Program } from '@/components/site/Program'
import { About } from '@/components/site/About'
import { Location, Prizes } from '@/components/site/Location'
import { FAQ, FinalCTA, Footer } from '@/components/site/FAQ'
import { ApplyModal } from '@/components/site/ApplyModal'

export default function Home() {
  const [applyOpen, setApplyOpen] = useState(false)
  const openApply = useCallback(() => setApplyOpen(true), [])

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar onApply={openApply} />

      <main className="flex-1">
        <Hero onApply={openApply} />
        <KeyNumbers onApply={openApply} />
        <Format />
        <WhatWillBe />
        <ForWhom />
        <Program />
        <About />
        <Location />
        <Prizes />
        <FAQ />
        <FinalCTA onApply={openApply} />
      </main>

      <Footer />

      <ApplyModal open={applyOpen} onOpenChange={setApplyOpen} />
    </div>
  )
}
