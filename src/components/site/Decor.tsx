'use client'

import { cn } from '@/lib/utils'

/**
 * Decorative QR-style pixel mark — modular graphic that evokes
 * QR codes / pixel art used as a firm carrier in the Vibe-6 brand.
 * Pattern is deterministic per `seed` so SSR and client match.
 */
export function QrMark({
  className,
  size = 7,
  seed = 42,
  variant = 'ink',
}: {
  className?: string
  size?: number
  seed?: number
  variant?: 'ink' | 'vibe' | 'lime' | 'cyan' | 'pink' | 'paper'
}) {
  // Simple deterministic PRNG (mulberry32)
  const rand = (n: number) => {
    let t = (n + 0x6D2B79F5) | 0
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  // Pre-compute the grid pattern — keep the three corner "finder" squares solid
  const cells: boolean[] = []
  const isFinder = (r: number, c: number) => {
    const inCorner = (cr: number, cc: number) =>
      r >= cr && r < cr + 3 && c >= cc && c < cc + 3
    return inCorner(0, 0) || inCorner(0, size - 3) || inCorner(size - 3, 0)
  }
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isFinder(r, c)) {
        cells.push(true)
      } else {
        cells.push(rand(seed * 100 + r * size + c) > 0.55)
      }
    }
  }

  const variantClass = {
    ink: 'text-ink',
    vibe: 'text-vibe',
    lime: 'text-lime',
    cyan: 'text-cyan',
    pink: 'text-pink',
    paper: 'text-paper',
  }[variant]

  return (
    <div
      className={cn(
        'qr-mark',
        variantClass,
        className
      )}
      aria-hidden="true"
    >
      {cells.map((on, i) => (
        <div
          key={i}
          className={on ? 'opacity-100' : 'opacity-0'}
        />
      ))}
    </div>
  )
}

/**
 * Slash command pill — the brand's signature nav element.
 * `/Connect`, `/CREATE`, `/VIBE`, `/Chill`
 */
export function SlashPill({
  children,
  variant = 'vibe',
  className,
  as: Tag = 'span',
  ...props
}: {
  children: React.ReactNode
  variant?: 'cyan' | 'vibe' | 'lime' | 'pink' | 'paper' | 'ink'
  className?: string
  as?: any
  [key: string]: any
}) {
  const variantClass = {
    cyan: 'slash-pill-cyan',
    vibe: 'slash-pill-vibe',
    lime: 'slash-pill-lime',
    pink: 'slash-pill-pink',
    paper: 'slash-pill-paper',
    ink: 'slash-pill-ink',
  }[variant]
  return (
    <Tag
      className={cn('slash-pill', variantClass, className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

/**
 * Small tag chip — used for category labels (e.g. "FORMAT", "FAQ").
 */
export function TagChip({
  children,
  variant = 'lime',
  className,
}: {
  children: React.ReactNode
  variant?: 'lime' | 'vibe' | 'cyan' | 'pink' | 'ink' | 'paper'
  className?: string
}) {
  const styles: Record<string, string> = {
    lime: 'bg-lime text-ink',
    vibe: 'bg-vibe text-white',
    cyan: 'bg-cyan text-ink',
    pink: 'bg-pink text-white',
    ink: 'bg-ink text-paper',
    paper: 'bg-paper text-ink border border-ink/10',
  }
  return (
    <span className={cn('tag-chip', styles[variant], className)}>
      {children}
    </span>
  )
}
