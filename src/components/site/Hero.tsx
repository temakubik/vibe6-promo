'use client'

import { ArrowUpRight, HelpCircle } from 'lucide-react'
import { SlashPill, QrMark, PixelCluster } from './Decor'

export function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-ink text-paper overflow-hidden flex flex-col"
    >
      {/* Pixel grid backdrop */}
      <div className="absolute inset-0 bg-pixel-grid opacity-100 pointer-events-none" />
      {/* Gradient glow */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7B36FF 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #95CE17 0%, transparent 70%)' }}
      />

      {/* Top scanline strip */}
      <div className="relative z-10 h-16" />

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: text */}
            <div className="lg:col-span-8">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="tag-chip bg-lime text-ink">
                  ·  2026  ·
                </span>
                <span className="tag-chip bg-paper/10 text-paper border border-paper/15">
                  bootcamp format
                </span>
                <span className="tag-chip bg-paper/10 text-paper border border-paper/15">
                  location · TBD
                </span>
              </div>

              {/* H1 */}
              <h1 className="font-display font-extrabold tracking-tight leading-[0.95] text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[140px]">
                <span className="block text-paper">KONSOL</span>
                <span className="block">
                  <span className="text-gradient-vibe">FESTIVAL</span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-display font-semibold text-paper leading-tight">
                Два дня. Команды. Реальные проекты.
              </p>

              {/* Meta line */}
              <p className="mt-3 font-mono text-sm text-paper/60 tracking-wide">
                2026 · площадка в формате буткемпа · [город/регион TBD]
              </p>

              {/* Slash commands preview */}
              <div className="mt-8 flex flex-wrap gap-2">
                <SlashPill variant="cyan">/Connect</SlashPill>
                <SlashPill variant="vibe">/CREATE</SlashPill>
                <SlashPill variant="lime">/VIBE</SlashPill>
                <SlashPill variant="pink">/Chill</SlashPill>
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={onApply}
                  className="group inline-flex items-center gap-2 bg-vibe hover:bg-vibe/90 text-white font-display font-bold text-base px-6 py-4 rounded-full transition-all hover:translate-y-[-1px]"
                >
                  Оставить заявку
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 bg-transparent border border-paper/20 hover:border-paper/40 text-paper font-display font-semibold text-base px-6 py-4 rounded-full transition-colors"
                >
                  <HelpCircle size={18} />
                  Задать вопрос
                </a>
              </div>
            </div>

            {/* Right: decorative cluster */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="relative w-full max-w-[320px]">
                <div className="float-slow">
                  <div className="bg-paper/5 border border-paper/10 rounded-3xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-paper/60 uppercase tracking-widest">
                        register
                      </span>
                      <QrMark variant="lime" className="w-12 h-12" seed={13} />
                    </div>
                    <div className="bg-ink rounded-2xl p-5 border border-paper/5">
                      <PixelCluster
                        variant="mixed"
                        seed={21}
                        className="w-full"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <div className="font-display font-bold text-paper text-sm">
                          scan to apply
                        </div>
                        <div className="font-mono text-xs text-paper/50">
                          #vibe6 · 2026
                        </div>
                      </div>
                      <ArrowUpRight size={20} className="text-lime" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker at the bottom */}
      <div className="relative z-10 border-t border-paper/10 bg-ink overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap py-3">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-6 px-3 font-mono text-sm text-paper/70">
              <TickerItem text="KONSOL FESTIVAL / VIBE.6" />
              <TickerItem text="2 ДНЯ" accent="lime" />
              <TickerItem text="~80 УЧАСТНИКОВ" />
              <TickerItem text="10–12 КОМАНД" accent="cyan" />
              <TickerItem text="ХАКАТОН + КОСТЁР + МУЗЫКА" />
              <TickerItem text="2026" accent="vibe" />
              <TickerItem text="/Connect /CREATE /VIBE /Chill" accent="pink" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TickerItem({
  text,
  accent,
}: {
  text: string
  accent?: 'lime' | 'cyan' | 'vibe' | 'pink'
}) {
  const color =
    accent === 'lime'
      ? 'text-lime'
      : accent === 'cyan'
      ? 'text-cyan'
      : accent === 'vibe'
      ? 'text-vibe'
      : accent === 'pink'
      ? 'text-pink'
      : 'text-paper/70'
  return (
    <span className={`uppercase tracking-wider font-semibold ${color}`}>
      {text}
      <span className="text-paper/30 mx-6">·</span>
    </span>
  )
}
