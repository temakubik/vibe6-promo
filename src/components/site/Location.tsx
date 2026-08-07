'use client'

import type { MouseEvent as ReactMouseEvent } from 'react'
import { TagChip } from './Decor'
import { Wifi, LayoutGrid, Armchair, Car, Shirt, MapPin, Plane, Bath } from 'lucide-react'
import { knowledgeBase } from '@/lib/knowledge-base'

export function Location() {
  return (
    <section id="location" className="relative bg-paper py-20 sm:py-28 border-t border-ink/5">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <TagChip variant="pink">/location</TagChip>
          <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.05]">
            Локация
          </h2>
        </div>

          <div className="grid lg:grid-cols-12 gap-6">
          {/* Big placeholder card */}
            <div
              className="group lg:col-span-7 relative overflow-hidden rounded-3xl bg-ink text-paper min-h-[360px] transition-transform duration-300 will-change-transform"
              onMouseMove={handleLocationCardMove}
              onMouseLeave={resetLocationCardTilt}
              style={{
                transform:
                  'perspective(1400px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) translateY(var(--lift, 0px))',
              }}
            >
              <img
                src={knowledgeBase.heroImage}
                alt="Les Art Resort"
                className="absolute inset-0 h-full w-full object-cover opacity-100 scale-[1.02] transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ink/40 via-ink/25 to-ink/75" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_44%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,255,255,0.22), transparent 28%)',
                }}
              />
              <div className="absolute inset-0 bg-pixel-grid pointer-events-none" />
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #FF3697 0%, transparent 70%)' }}
              />

              <div className="relative z-10 flex h-full flex-col p-7 sm:p-10">
                <div className="mb-auto flex items-start justify-between">
                  <div>
                    <span className="tag-chip bg-paper/10 text-paper border border-paper/15">
                      venue · confirmed
                    </span>
                    <h3 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
                      {knowledgeBase.location}
                    </h3>
                    <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-paper/75 sm:text-lg">
                      Лесная площадка с проживанием, SPA, банями, открытым бассейном и
                      зонами для совместной работы и мастер-классов.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-8 flex items-end justify-between gap-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-paper/60 uppercase tracking-widest">
                    <MapPin size={14} /> Moscow region · Les Art Resort
                  </div>
                  <div className="font-mono text-[10px] text-paper/30 tracking-widest">
                    {knowledgeBase.dates}
                  </div>
                </div>
              </div>
            </div>

          {/* Right column: what's here + checklist */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-ink/8 rounded-3xl p-6">
                <h3 className="font-display font-bold text-xl text-ink mb-4">
                  Что здесь есть
                </h3>
                <ul className="space-y-3">
                  <ConditionItem icon={Wifi} text="Хороший интернет для работы и демо" />
                  <ConditionItem icon={LayoutGrid} text="Зоны для работы, общения и мастер-классов" />
                  <ConditionItem icon={Bath} text="SPA, бани и открытый бассейн" />
                  <ConditionItem icon={Armchair} text="Места для отдыха между активностями" />
                  <ConditionItem icon={Car} text="Трансферная и такси-логистика до отеля" />
                </ul>
              </div>

              <div className="bg-white border border-ink/8 rounded-3xl p-6">
                <h3 className="font-display font-bold text-xl text-ink mb-1">
                  Чек-лист
                </h3>
                <p className="font-mono text-xs text-ink/50 uppercase tracking-wider mb-4">
                  что брать с собой
                </p>
                <ul className="space-y-3">
                  <ConditionItem icon={MapPin} text="Паспорт для заселения" />
                  <ConditionItem icon={Bath} text="Купальник или плавки и вещи для бани" />
                  <ConditionItem icon={Shirt} text="Одежду по dress-code и для вечерней программы" />
                </ul>
              </div>
            </div>
          </div>

        {/* Logistics note */}
          <div className="mt-6 bg-white border border-ink/8 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-xl text-ink mb-1">
                  Как добраться
                </h3>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  Для рейсов с задержкой уже есть отдельная инструкция: Внуково — такси до
                  отеля, Шереметьево и Домодедово — Аэроэкспресс до Москвы и затем такси.
                </p>
              </div>
              <span className="tag-chip bg-paper text-ink border border-ink/10 shrink-0">
                <Plane size={14} /> transfer guide
              </span>
            </div>
          </div>
      </div>
    </section>
  )
}

function ConditionItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-paper flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={15} className="text-ink" strokeWidth={2.5} />
      </div>
      <span className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed pt-1">
        {text}
      </span>
    </li>
  )
}

function handleLocationCardMove(event: ReactMouseEvent<HTMLDivElement>) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const rotateY = ((x / rect.width) - 0.5) * 10
  const rotateX = (0.5 - (y / rect.height)) * 10

  card.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`)
  card.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`)
  card.style.setProperty('--lift', '-4px')
  card.style.setProperty('--glow-x', `${((x / rect.width) * 100).toFixed(2)}%`)
  card.style.setProperty('--glow-y', `${((y / rect.height) * 100).toFixed(2)}%`)
}

function resetLocationCardTilt(event: ReactMouseEvent<HTMLDivElement>) {
  const card = event.currentTarget
  card.style.setProperty('--rotate-x', '0deg')
  card.style.setProperty('--rotate-y', '0deg')
  card.style.setProperty('--lift', '0px')
  card.style.setProperty('--glow-x', '50%')
  card.style.setProperty('--glow-y', '50%')
}
