'use client'

import { TagChip } from './Decor'
import { Flame, Code2, Utensils, Users, Presentation, Sunrise, Moon } from 'lucide-react'

type Slot = {
  time?: string
  title: string
  desc: string
  icon: any
  color: 'vibe' | 'lime' | 'cyan' | 'pink' | 'ink' | 'paper'
}

const DAY1: Slot[] = [
  {
    title: 'Приезд и регистрация',
    desc: 'Welcome-обед, знакомство, погружение в атмосферу.',
    icon: Sunrise,
    color: 'lime',
  },
  {
    title: 'Разделение на команды',
    desc: 'Получаем задания, начинаем работу.',
    icon: Users,
    color: 'cyan',
  },
  {
    title: 'Работа',
    desc: 'Coding / prototyping до вечера, с перерывом на ужин.',
    icon: Code2,
    color: 'vibe',
  },
  {
    title: 'Вечерний блок',
    desc: 'Костёр, песни, сосиски, неформальное общение.',
    icon: Flame,
    color: 'pink',
  },
]

const DAY2: Slot[] = [
  {
    title: 'Работа',
    desc: 'Продолжение проектов до обеда.',
    icon: Code2,
    color: 'vibe',
  },
  {
    title: 'Обед',
    desc: 'Перерыв, перезагрузка перед финалом.',
    icon: Utensils,
    color: 'lime',
  },
  {
    title: 'Презентации проектов',
    desc: 'Каждая команда показывает результат.',
    icon: Presentation,
    color: 'cyan',
  },
  {
    title: 'Вечерняя программа',
    desc: '18:00–22:00, формат TBD.',
    icon: Moon,
    color: 'pink',
  },
]

export function Program() {
  return (
    <section id="program" className="relative bg-paper py-20 sm:py-28 border-t border-ink/5">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <TagChip variant="cyan">/program</TagChip>
          <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.05]">
            Программа
          </h2>
          <p className="mt-4 font-sans text-lg sm:text-xl text-ink/70 max-w-2xl leading-relaxed">
            Пятница — работа и вечерний костёр. Суббота — презентации и финальная программа.
          </p>
        </div>

        {/* Two-column day layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <DayColumn
            dayLabel="День 1"
            dayName="Пятница"
            accent="vibe"
            slots={DAY1}
          />
          <DayColumn
            dayLabel="День 2"
            dayName="Суббота"
            accent="lime"
            slots={DAY2}
          />
        </div>

        {/* Note */}
        <p className="mt-10 font-mono text-xs text-ink/50">
          * Для каждого пункта можно добавить время, когда оно подтвердится.
        </p>
      </div>
    </section>
  )
}

function DayColumn({
  dayLabel,
  dayName,
  accent,
  slots,
}: {
  dayLabel: string
  dayName: string
  accent: 'vibe' | 'lime'
  slots: Slot[]
}) {
  const accentBg = accent === 'vibe' ? 'bg-vibe text-white' : 'bg-lime text-ink'
  const accentText = accent === 'vibe' ? 'text-vibe' : 'text-lime'

  return (
    <div className="bg-white border border-ink/8 rounded-3xl p-5 sm:p-7 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className={`font-mono text-xs uppercase tracking-widest ${accentText}`}>
            {dayLabel}
          </div>
          <h3 className="mt-1 font-display font-extrabold text-3xl sm:text-4xl text-ink">
            {dayName}
          </h3>
        </div>
        <span className={`tag-chip ${accentBg}`}>
          day {dayLabel.slice(-1)}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-ink/10" />

        <ol className="space-y-3">
          {slots.map((s, i) => (
            <li key={i} className="relative pl-12">
              {/* Node */}
              <div className={`absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center ${slotColor(s.color).bg} ${slotColor(s.color).text}`}>
                <s.icon size={16} strokeWidth={2.5} />
              </div>
              <div className="bg-paper/60 hover:bg-paper rounded-2xl p-4 transition-colors">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="font-display font-bold text-lg text-ink">
                    {s.title}
                  </h4>
                  {s.time && (
                    <span className="font-mono text-xs text-ink/50 whitespace-nowrap">
                      {s.time}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-sans text-sm text-ink/65 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function slotColor(c: string) {
  switch (c) {
    case 'vibe': return { bg: 'bg-vibe', text: 'text-white' }
    case 'lime': return { bg: 'bg-lime', text: 'text-ink' }
    case 'cyan': return { bg: 'bg-cyan', text: 'text-ink' }
    case 'pink': return { bg: 'bg-pink', text: 'text-white' }
    case 'ink': return { bg: 'bg-ink', text: 'text-paper' }
    default: return { bg: 'bg-paper', text: 'text-ink' }
  }
}
