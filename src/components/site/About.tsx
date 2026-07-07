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
            Сделать трёхдневную встречу, где сотрудники знакомятся, общаются и
            получают новые знания через живые мастер-классы и неформальное общение.
          </PrincipleCard>

          <PrincipleCard
            icon={Compass}
            label="/principles"
            title="Принципы"
            color="cyan"
          >
            Опытные коллеги делятся практикой с теми, кто только ускоряется в
            вайб-кодинге, ИИ и смежных темах. В центре не соревнование, а обмен
            опытом, польза и нормальный человеческий контакт.
          </PrincipleCard>

          <PrincipleCard
            icon={Megaphone}
            label="/pitch"
            title="Как мы это объясняем"
            color="pink"
          >
            Три дня, реальное общение, новые знания. Внутри — мастер-классы от
            опытных сотрудников, темы по вайб-кодингу и ИИ, а вечером —
            неформальная программа без скучного официоза.
          </PrincipleCard>

          <PrincipleCard
            icon={Users2}
            label="/flow"
            title="Как проходит мероприятие"
            color="vibe"
          >
            Днём — мастер-классы, разговоры и практика. Чуть позже добавим полную
            программу из 9 мероприятий. Вечером — общение и вечерняя программа,
            чтобы знакомиться друг с другом не только в рабочих ролях.
          </PrincipleCard>
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 bg-paper/5 border border-paper/10 rounded-3xl">
          <div>
            <div className="font-display font-bold text-xl sm:text-2xl text-paper">
              Остаёмся на связи?
            </div>
            <p className="mt-1 font-sans text-sm text-paper/60">
              Переходи в Телеграм-чат и следи за обновлениями программы.
            </p>
          </div>
          <SlashPill as="a" href="https://t.me/+N_X0TPh1rqVkMTBi" variant="lime" className="shrink-0">
            /Телеграм_чат →
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
