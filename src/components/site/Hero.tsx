'use client'

import { ArrowUpRight } from 'lucide-react'

const QUICK_LINKS = [
  {
    href: 'https://t.me/+N_X0TPh1rqVkMTBi',
    eyebrow: 'telegram',
    title: 'Телеграм-чат',
    text: 'Основной чат поездки: объявления, вопросы и быстрый контакт.',
    external: true,
  },
  {
    href: '/guide',
    eyebrow: '/guide',
    title: 'База знаний',
    text: 'Расписание, проживание, соседи, погода и всё важное перед поездкой.',
  },
  {
    href: '/workshop',
    eyebrow: '/workshop',
    title: 'Workshop',
    text: 'Раздел уже зарезервирован. Скоро здесь появятся детали воркшопов.',
  },
] as const

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 bg-pixel-grid opacity-100 pointer-events-none" />
      <div
        className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7B36FF 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #95CE17 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-10">
          <div className="max-w-[980px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag-chip bg-lime text-ink">2026</span>
              <span className="tag-chip border border-paper/15 bg-paper/10 text-paper">
                31 июля - 2 августа
              </span>
              <span className="tag-chip border border-paper/15 bg-paper/10 text-paper">
                Les Art Resort
              </span>
            </div>

            <h1 className="mt-8 font-display text-[14vw] font-extrabold leading-[0.95] tracking-tight sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[140px]">
              <span className="block text-paper">Консоль</span>
              <span className="block text-gradient-vibe">VIBE-6</span>
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-[780px]">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-paper/45">Год</div>
                <div className="mt-2 font-display text-2xl text-paper sm:text-3xl">2026</div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-paper/45">Локация</div>
                <div className="mt-2 font-display text-2xl text-paper sm:text-3xl">
                  Les Art Resort
                </div>
                <div className="mt-1 text-paper/55">Московская область</div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="group min-h-[180px] bg-paper/6 px-5 py-5 transition-colors hover:bg-paper/10 sm:px-6 sm:py-6"
                >
                  <div className="flex h-full flex-col">
                    <div className="font-mono text-xs uppercase tracking-widest text-paper/45">
                      {link.eyebrow}
                    </div>
                    <div className="mt-6 flex items-start justify-between gap-4">
                      <h2 className="font-display text-3xl leading-none text-paper">{link.title}</h2>
                      <ArrowUpRight
                        size={20}
                        className="mt-1 shrink-0 text-lime transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
                    <p className="mt-auto pt-8 text-sm leading-relaxed text-paper/70 sm:text-base">
                      {link.text}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
