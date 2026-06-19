'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SlashPill } from './Decor'

const NAV_LINKS = [
  { href: '#program', label: 'Программа' },
  { href: '#about', label: 'О мероприятии' },
  { href: '#location', label: 'Локация' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar({ onApply }: { onApply: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-paper/85 backdrop-blur-md border-b border-ink/10'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 group" aria-label="Konsol Festival">
            <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-ink">
              KONSOL
            </span>
            <span className="font-mono text-xs text-vibe font-bold tracking-widest">/VIBE.6</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-full text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <SlashPill
              as="button"
              variant="vibe"
              onClick={onApply}
              className="cursor-pointer"
            >
              /Подать_заявку
            </SlashPill>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-ink/5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Меню"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-paper border-t border-ink/10">
          <div className="mx-auto max-w-[1280px] px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-base font-medium text-ink/80 hover:bg-ink/5"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                onApply()
              }}
              className="mt-2 slash-pill slash-pill-vibe justify-center"
            >
              /Подать_заявку
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
