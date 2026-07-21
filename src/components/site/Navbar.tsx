'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const QUICK_LINKS = [
  { href: 'https://t.me/+N_X0TPh1rqVkMTBi', label: 'Телеграм-чат', external: true },
  { href: '/guide', label: 'База знаний' },
  { href: '/workshop', label: 'Workshop' },
] as const

export function Navbar() {
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
          <a href="#top" className="flex items-center gap-2 group" aria-label="Консоль / vibe-6">
            <span
              className={cn(
                'font-display font-extrabold text-base sm:text-lg tracking-tight transition-colors',
                scrolled ? 'text-ink' : 'text-paper'
              )}
            >
              Консоль
            </span>
            <span className="font-display text-xs text-lime font-bold tracking-widest">/vibe-6</span>
          </a>

          <nav className="hidden md:flex items-center gap-2">
            {QUICK_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-colors',
                  scrolled
                    ? 'text-ink/70 hover:text-ink'
                    : 'text-paper/80 hover:text-paper'
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              scrolled ? 'text-ink hover:bg-ink/5' : 'text-paper hover:bg-paper/10'
            )}
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
            {QUICK_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                onClick={() => setOpen(false)}
                className="px-0 py-3 text-base font-medium text-ink/80"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
