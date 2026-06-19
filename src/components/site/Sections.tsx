'use client'

import { ArrowUpRight, Users, Calendar, Trophy, Layers } from 'lucide-react'
import { TagChip, SlashPill, QrMark } from './Decor'

/* ============================================================
   KeyNumbers — 4 figures in a row
   ============================================================ */
export function KeyNumbers({ onApply }: { onApply: () => void }) {
  const items = [
    { value: '2', unit: 'дня', label: 'формат', color: 'vibe' },
    { value: '~80', unit: 'человек', label: 'участники', color: 'lime' },
    { value: '10–12', unit: 'команд', label: 'по 6–7 человек', color: 'cyan' },
    { value: 'TBD', unit: 'призовой фонд', label: 'скоро', color: 'pink' },
  ] as const

  const accentColor = (c: string) => {
    switch (c) {
      case 'vibe': return 'text-vibe'
      case 'lime': return 'text-lime'
      case 'cyan': return 'text-cyan'
      case 'pink': return 'text-pink'
      default: return 'text-ink'
    }
  }

  return (
    <section className="relative bg-ink text-paper py-16 sm:py-24 border-t border-paper/5">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-10">
          <TagChip variant="paper">/key_numbers</TagChip>
          <span className="hidden sm:block font-mono text-xs text-paper/40 uppercase tracking-widest">
            festival at a glance
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((it) => (
            <div
              key={it.label}
              className="bg-paper/5 border border-paper/10 rounded-3xl p-5 sm:p-7 hover:bg-paper/[0.08] transition-colors"
            >
              <div className={`font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-none ${accentColor(it.color)}`}>
                {it.value}
              </div>
              <div className="mt-3 font-display font-semibold text-paper text-base sm:text-lg">
                {it.unit}
              </div>
              <div className="mt-1 font-mono text-xs text-paper/50 uppercase tracking-wider">
                {it.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs text-paper/40 max-w-2xl">
          {/* meta detail about prize fund TBD */}
          * Призовой фонд за лучший проект по итогам презентаций. Детали — позже.
        </p>
      </div>
    </section>
  )
}

/* ============================================================
   Format — explanation of the short-hackathon corporate format
   ============================================================ */
export function Format() {
  return (
    <section className="relative bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <TagChip variant="vibe">/format</TagChip>
            <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.05]">
              Корпоратив в формате{' '}
              <span className="text-vibe">короткого хакатона</span>
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-3">
            <p className="font-sans text-lg sm:text-xl text-ink/80 leading-relaxed">
              Мы делимся на команды по 6–7 человек и за два дня создаём реальные
              продукты и сервисы. Вместо шаблонных активностей — живой процесс,
              где работа и отдых переплетаются.
            </p>
            <p className="mt-5 font-sans text-base sm:text-lg text-ink/60 leading-relaxed">
              Это про сплочение через общее дело, а не через скучные сценарные игры.
              Команды формируются заранее — с первого взгляда понятно, что здесь
              удобно работать вместе.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <SlashPill variant="cyan">/Connect</SlashPill>
              <SlashPill variant="vibe">/CREATE</SlashPill>
              <SlashPill variant="lime">/VIBE</SlashPill>
              <SlashPill variant="pink">/Chill</SlashPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   WhatWillBe — 4-card grid: Хакатон, Стендап, Музыка, Костёр
   ============================================================ */
export function WhatWillBe() {
  const items = [
    {
      title: 'Хакатон',
      desc: 'Команды получают задания и работают над проектами.',
      color: 'vibe',
      icon: Layers,
    },
    {
      title: 'Стендап',
      desc: 'Короткие спикины: делимся прогрессом и идеями.',
      color: 'cyan',
      icon: Users,
    },
    {
      title: 'Музыка',
      desc: 'Живая музыка в перерывах и вечером.',
      color: 'pink',
      icon: Calendar,
    },
    {
      title: 'Костёр',
      desc: 'Вечер первого дня: песни, атмосфера, общение.',
      color: 'lime',
      icon: Trophy,
    },
  ] as const

  const cardStyle = (c: string) => {
    switch (c) {
      case 'vibe': return { bg: 'bg-vibe', text: 'text-white', icon: 'text-white' }
      case 'cyan': return { bg: 'bg-cyan', text: 'text-ink', icon: 'text-ink' }
      case 'pink': return { bg: 'bg-pink', text: 'text-white', icon: 'text-white' }
      case 'lime': return { bg: 'bg-lime', text: 'text-ink', icon: 'text-ink' }
      default: return { bg: 'bg-ink', text: 'text-paper', icon: 'text-paper' }
    }
  }

  return (
    <section className="relative bg-paper py-20 sm:py-28 border-t border-ink/5">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <TagChip variant="lime">/what_will_be</TagChip>
            <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.05]">
              Что будет
            </h2>
          </div>
          <p className="font-mono text-sm text-ink/50 max-w-xs">
            четыре активности · работа и отдых переплетены
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((it) => {
            const s = cardStyle(it.color)
            return (
              <div
                key={it.title}
                className={`${s.bg} ${s.text} rounded-3xl p-6 lg:p-7 flex flex-col gap-4 min-h-[220px] hover:-translate-y-1 transition-transform`}
              >
                <div className="flex items-start justify-between">
                  <it.icon className={`${s.icon}`} size={28} strokeWidth={2.5} />
                  <span className="font-mono text-xs opacity-60 uppercase tracking-wider">
                    0{items.indexOf(it) + 1}
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl leading-tight">
                    {it.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm sm:text-base opacity-85 leading-relaxed">
                    {it.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ForWhom — text section about participants
   ============================================================ */
export function ForWhom() {
  return (
    <section className="relative bg-ink text-paper py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-pixel-grid opacity-100 pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <TagChip variant="paper">/for_whom</TagChip>
            <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-paper leading-[1.05]">
              Для кого
            </h2>
            <div className="mt-8 hidden lg:block">
              <QrMark variant="lime" className="w-32 h-32" seed={99} />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-paper/5 border border-paper/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-display font-extrabold text-5xl sm:text-6xl text-lime leading-none">
                  80
                </span>
                <div>
                  <div className="font-display font-semibold text-xl text-paper">участников</div>
                  <div className="font-mono text-xs text-paper/50 uppercase tracking-wider">
                    отборный состав
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-paper/5 border border-paper/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-display font-extrabold text-5xl sm:text-6xl text-cyan leading-none">
                  10–12
                </span>
                <div>
                  <div className="font-display font-semibold text-xl text-paper">команд</div>
                  <div className="font-mono text-xs text-paper/50 uppercase tracking-wider">
                    собранных с учётом равной силы и общего вайба
                  </div>
                </div>
              </div>
            </div>

            <p className="font-sans text-lg sm:text-xl text-paper/80 leading-relaxed">
              Мы формируем группы заранее, чтобы с первого взгляда было понятно —
              здесь удобно работать вместе. Учитываем равные силы и совместимость
              по вайбу: весёлые и спокойные, технические и менеджерские — каждый
              находит своё место.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
