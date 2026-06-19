'use client'

import { TagChip } from './Decor'
import { Wifi, LayoutGrid, Armchair, Car, Laptop, Shirt, MapPin } from 'lucide-react'

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
          <div className="lg:col-span-7 relative bg-ink text-paper rounded-3xl p-7 sm:p-10 overflow-hidden min-h-[360px] flex flex-col">
            <div className="absolute inset-0 bg-pixel-grid pointer-events-none" />
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #FF3697 0%, transparent 70%)' }}
            />

            <div className="relative z-10 flex items-start justify-between mb-auto">
              <div>
                <span className="tag-chip bg-paper/10 text-paper border border-paper/15">
                  venue · TBD
                </span>
                <h3 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
                  Площадка в формате{' '}
                  <span className="text-lime">буткемпа</span>
                </h3>
                <p className="mt-4 font-sans text-base sm:text-lg text-paper/70 max-w-md leading-relaxed">
                  Хороший интернет и зоны для команд. Точное название и адрес — скоро.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 flex items-end justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-paper/50 uppercase tracking-widest">
                <MapPin size={14} /> address coming soon
              </div>
              <div className="font-mono text-[10px] text-paper/30 tracking-widest">
                #vibe6 · 2026
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
                <ConditionItem icon={Wifi} text="Хороший интернет (важно для работы)" />
                <ConditionItem icon={LayoutGrid} text="Зоны в формате буткемпов" />
                <ConditionItem icon={Armchair} text="Комфортные места для уединения команд" />
                <ConditionItem icon={Car} text="Парковка, зал для вечерней программы" />
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
                <ConditionItem icon={Laptop} text="Ноутбук и зарядка" />
                <ConditionItem icon={Shirt} text="Удобная одежда на вечер" />
                <ConditionItem icon={MapPin} text="Дополнительно по необходимости" />
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
                Инструкция появится здесь, когда подтвердится площадка:
                адрес, как проехать, парковка, время заезда.
              </p>
            </div>
            <span className="tag-chip bg-paper text-ink border border-ink/10 shrink-0">
              coming soon
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

/* ============================================================
   Prizes — section about prize fund
   ============================================================ */
export function Prizes() {
  return (
    <section className="relative bg-paper py-20 sm:py-28 border-t border-ink/5">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="bg-vibe text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Decorative big prize text */}
          <div
            aria-hidden
            className="absolute -top-10 -right-10 font-display font-extrabold text-[200px] sm:text-[260px] leading-none text-white/5 pointer-events-none select-none"
          >
            TBD
          </div>

          <div className="relative">
            <TagChip variant="lime">/prizes</TagChip>
            <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05] max-w-2xl">
              Призы и награды
            </h2>
            <p className="mt-5 font-sans text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
              Призовой фонд за лучший проект по итогам презентаций.
              Команды показывают результат — жюри выбирает победителей.
            </p>
            <p className="mt-4 font-mono text-xs text-white/60 uppercase tracking-widest">
              · детали — позже ·
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
