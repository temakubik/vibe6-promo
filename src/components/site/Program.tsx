'use client'

import { TagChip } from './Decor'
import {
  Flame,
  Utensils,
  Users,
  Presentation,
  Coffee,
  Armchair,
  Moon,
  GraduationCap,
  Music,
  Compass,
  Luggage,
  MicVocal,
} from 'lucide-react'

type Slot = {
  time: string
  title: string
  icon: any
  color: 'vibe' | 'lime' | 'cyan' | 'pink' | 'ink' | 'paper'
}

const DAY1: Slot[] = [
  { time: '12:30 – 13:00', title: 'Онбординг',                 icon: Users,         color: 'cyan'  },
  { time: '13:00 – 15:00', title: 'Обед',                      icon: Utensils,      color: 'lime'  },
  { time: '15:00 – 17:00', title: 'Онбординг с Черняковым',    icon: MicVocal,      color: 'vibe'  },
  { time: '17:00 – 18:30', title: 'Отдых',                     icon: Armchair,      color: 'paper' },
  { time: '18:30 – 19:30', title: 'Ужин',                      icon: Utensils,      color: 'lime'  },
  { time: '19:30 – 21:30', title: 'Мастер-классы',             icon: GraduationCap, color: 'vibe'  },
  { time: '21:30 – 00:00', title: 'Вечерний костёр',           icon: Flame,         color: 'pink'  },
]

const DAY2: Slot[] = [
  { time: '09:00 – 10:00', title: 'Завтрак',                   icon: Coffee,        color: 'lime'  },
  { time: '10:30 – 12:00', title: 'Мастер-классы',             icon: GraduationCap, color: 'vibe'  },
  { time: '12:00 – 13:00', title: 'Отдых',                     icon: Armchair,      color: 'paper' },
  { time: '14:00 – 15:30', title: 'Мастер-классы',             icon: GraduationCap, color: 'vibe'  },
  { time: '16:00 – 17:00', title: 'Демо',                      icon: Presentation,  color: 'cyan'  },
  { time: '17:00 – 18:30', title: 'Отдых',                     icon: Armchair,      color: 'paper' },
  { time: '18:30 – 20:00', title: 'Ужин',                      icon: Utensils,      color: 'lime'  },
  { time: '20:00 – 22:00', title: 'JAM / Вечерина',            icon: Music,         color: 'pink'  },
]

const DAY3: Slot[] = [
  { time: '08:00 – 09:30', title: 'Завтрак',                   icon: Coffee,        color: 'lime'  },
  { time: '09:30 – 11:00', title: 'Рефлексия',                 icon: Compass,       color: 'cyan'  },
  { time: '11:00 – 12:00', title: 'Сборы и уезд',              icon: Luggage,       color: 'vibe'  },
]

type Day = {
  num: string
  name: string
  date: string
  accent: 'vibe' | 'lime' | 'cyan'
  slots: Slot[]
  footer: string
}

const DAYS: Day[] = [
  { num: '1', name: 'Пятница',     date: 'day one · open',  accent: 'vibe', slots: DAY1, footer: 'приезд, обед, онбординг и вечерний костёр' },
  { num: '2', name: 'Суббота',     date: 'day two · peak',  accent: 'lime', slots: DAY2, footer: 'мастер-классы, демо и вечерина до 22:00' },
  { num: '3', name: 'Воскресенье', date: 'day three · out', accent: 'cyan', slots: DAY3, footer: 'завтрак, рефлексия и отъезд до 12:00' },
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
          <p className="mt-4 font-sans text-lg sm:text-xl text-ink/70 max-w-3xl leading-relaxed">
            Три дня: пятница — приезд, онбординг и вечерний костёр;
            суббота — мастер-классы, демо и вечерина;
            воскресенье — рефлексия и отъезд.
          </p>
        </div>

        {/* Three-column day layout on lg, stacked on smaller */}
        <div className="grid gap-5 lg:gap-6 lg:grid-cols-3">
          {DAYS.map((d) => (
            <DayColumn key={d.num} day={d} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-ink/55 uppercase tracking-wider">
          <span className="text-ink/40">legend:</span>
          <LegendDot color="vibe"  label="программа" />
          <LegendDot color="lime"  label="еда" />
          <LegendDot color="cyan"  label="контент" />
          <LegendDot color="pink"  label="вечер" />
          <LegendDot color="paper" label="отдых" />
        </div>
      </div>
    </section>
  )
}

function DayColumn({ day }: { day: Day }) {
  const accentBg =
    day.accent === 'vibe' ? 'bg-vibe text-white'
    : day.accent === 'lime' ? 'bg-lime text-ink'
    : 'bg-cyan text-ink'
  const accentText =
    day.accent === 'vibe' ? 'text-vibe'
    : day.accent === 'lime' ? 'text-lime'
    : 'text-cyan'

  return (
    <div className="bg-white border border-ink/8 rounded-3xl p-5 sm:p-6 lg:p-7 flex flex-col lg:items-stretch">
      {/* Day header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className={`font-mono text-xs uppercase tracking-widest ${accentText}`}>
            {day.date}
          </div>
          <h3 className="mt-1 font-display font-extrabold text-3xl sm:text-4xl text-ink leading-none">
            {day.name}
          </h3>
        </div>
        <span className={`tag-chip ${accentBg}`}>
          day {day.num}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative flex-1 flex flex-col">
        <div className="absolute left-[18px] top-2 bottom-12 w-px bg-ink/10" />

        <ol className="space-y-2">
          {day.slots.map((s, i) => {
            const sc = slotColor(s.color)
            return (
              <li key={i} className="relative pl-12">
                <div className={`absolute left-0 top-1.5 w-9 h-9 rounded-full flex items-center justify-center ${sc.bg} ${sc.text} ring-4 ring-white`}>
                  <s.icon size={15} strokeWidth={2.5} />
                </div>
                <div className="bg-paper/60 hover:bg-paper rounded-xl px-4 py-2.5 transition-colors">
                  <div className="font-mono text-[11px] sm:text-xs text-ink/50 tracking-wide">
                    {s.time}
                  </div>
                  <div className="font-display font-bold text-base sm:text-lg text-ink leading-tight mt-0.5">
                    {s.title}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Footer note pinned to the bottom — keeps Sunday column balanced */}
        <div className="mt-auto pt-4 pl-12">
          <div className="border-t border-ink/8 pt-3 font-mono text-[11px] leading-snug text-ink/45">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${accentBg} mr-1.5 align-middle`} />
            {day.footer}
          </div>
        </div>
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  const c = slotColor(color)
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block w-2.5 h-2.5 rounded-full ${c.bg}`} />
      {label}
    </span>
  )
}

function slotColor(c: string) {
  switch (c) {
    case 'vibe':  return { bg: 'bg-vibe',  text: 'text-white' }
    case 'lime':  return { bg: 'bg-lime',  text: 'text-ink' }
    case 'cyan':  return { bg: 'bg-cyan',  text: 'text-ink' }
    case 'pink':  return { bg: 'bg-pink',  text: 'text-white' }
    case 'ink':   return { bg: 'bg-ink',   text: 'text-paper' }
    case 'paper': return { bg: 'bg-ink/10', text: 'text-ink' }
    default:      return { bg: 'bg-paper', text: 'text-ink' }
  }
}
