'use client'

import { TagChip, SlashPill } from './Decor'
import { Target, Compass, Megaphone, Users2 } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="relative bg-ink text-paper py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-pixel-grid pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <TagChip variant="vibe">/about</TagChip>
          <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-paper leading-[1.05]">
            О мероприятии
          </h2>
        </div>

        {/* 2x2 grid of principle blocks */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          <PrincipleCard
            icon={Target}
            label="/goal"
            title="Цель"
            color="lime"
          >
            Сделать нешаблонный корпоратив, где сотрудники сплачиваются через
            совместную работу над реальными проектами, а не через принудительные
            сценарные игры.
          </PrincipleCard>

          <PrincipleCard
            icon={Compass}
            label="/principles"
            title="Принципы"
            color="cyan"
          >
            Мы берём на себя операционную часть через подрядчиков, чтобы
            сосредоточиться на идее, участии и качестве. Формат должен оставаться
            живым, дешёвым и хаотичным в хорошем смысле.
          </PrincipleCard>

          <PrincipleCard
            icon={Megaphone}
            label="/pitch"
            title="Как мы это продаём"
            color="pink"
          >
            <span className="block mb-3">
              <span className="text-paper/50 font-mono text-xs uppercase tracking-widest">вариант А — открытый</span>
              <br />
              Приезжайте вайбкодить и чилить: три дня, команды, мастер-классы, демо и костёр.
            </span>
            <span className="block">
              <span className="text-paper/50 font-mono text-xs uppercase tracking-widest">вариант Б — вуалированный, TBD</span>
              <br />
              Специальный формат встречи, где работа и отдых переплетаются. Детали — на месте.
            </span>
          </PrincipleCard>

          <PrincipleCard
            icon={Users2}
            label="/teams"
            title="Как работают команды"
            color="vibe"
          >
            Команды по 6–7 человек, формируются заранее. Учитываем равные силы и
            совместимость по вайбу: весёлые/спокойные, технические/менеджерские —
            чтобы каждый нашёл своё место.
          </PrincipleCard>
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 bg-paper/5 border border-paper/10 rounded-3xl">
          <div>
            <div className="font-display font-bold text-xl sm:text-2xl text-paper">
              Хочешь в команду?
            </div>
            <p className="mt-1 font-sans text-sm text-paper/60">
              Заполни короткую заявку — мы сами определим, в какую команду ты подойдёшь.
            </p>
          </div>
          <SlashPill as="a" href="#apply" variant="lime" className="shrink-0">
            /Подать_заявку →
          </SlashPill>
        </div>
      </div>
    </section>
  )
}

function PrincipleCard({
  icon: Icon,
  label,
  title,
  color,
  children,
}: {
  icon: any
  label: string
  title: string
  color: 'vibe' | 'lime' | 'cyan' | 'pink'
  children: React.ReactNode
}) {
  const accent =
    color === 'vibe' ? 'text-vibe'
    : color === 'lime' ? 'text-lime'
    : color === 'cyan' ? 'text-cyan'
    : 'text-pink'

  return (
    <div className="bg-paper/5 border border-paper/10 rounded-3xl p-6 sm:p-8 hover:bg-paper/[0.08] transition-colors">
      <div className="flex items-center justify-between mb-5">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${iconBg(color)}`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <span className={`font-mono text-xs uppercase tracking-widest ${accent}`}>
          {label}
        </span>
      </div>
      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-paper mb-3">
        {title}
      </h3>
      <div className="font-sans text-base sm:text-lg text-paper/75 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

function iconBg(c: string) {
  switch (c) {
    case 'vibe': return 'bg-vibe text-white'
    case 'lime': return 'bg-lime text-ink'
    case 'cyan': return 'bg-cyan text-ink'
    case 'pink': return 'bg-pink text-white'
    default: return 'bg-paper text-ink'
  }
}
