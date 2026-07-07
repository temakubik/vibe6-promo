'use client'

import Link from 'next/link'
import { ArrowUpRight, Luggage, Plane, Shirt } from 'lucide-react'
import { TagChip } from './Decor'
import { knowledgeBase } from '@/lib/knowledge-base'

const previewCards = [
  {
    title: 'Что взять с собой',
    text: 'Паспорт, вещи, лекарства, репелент, купальник и всё для бани.',
    icon: Luggage,
    color: 'bg-lime text-ink',
  },
  {
    title: 'Dress-code',
    text: 'Оливка, фисташка, сливочные оттенки и средиземноморский вайб.',
    icon: Shirt,
    color: 'bg-pink text-white',
  },
  {
    title: 'Если рейс задержался',
    text: 'Есть готовая инструкция по трансферу и компенсациям.',
    icon: Plane,
    color: 'bg-cyan text-ink',
  },
] as const

export function GuidePreview() {
  return (
    <section className="border-t border-ink/5 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <TagChip variant="vibe">/knowledge_base</TagChip>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] text-ink sm:text-5xl">
              База знаний Vibe-6
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/65 sm:text-lg">
              Собрали всё важное в отдельную страницу: расписание, список вещей,
              dress-code, организационные детали и логистику по перелётам.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="tag-chip bg-paper text-ink border border-ink/10">
                {knowledgeBase.dates}
              </span>
              <span className="tag-chip bg-paper text-ink border border-ink/10">
                {knowledgeBase.location}
              </span>
            </div>

            <Link
              href="/guide"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-vibe px-6 py-4 font-display text-white transition-transform hover:-translate-y-px"
            >
              Открыть базу знаний
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4 lg:col-span-7 sm:grid-cols-3">
            {previewCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-ink/8 bg-white p-5 shadow-sm"
              >
                <div className={`inline-flex rounded-2xl p-3 ${card.color}`}>
                  <card.icon size={18} />
                </div>
                <h3 className="mt-5 font-display text-2xl text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
