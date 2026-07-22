'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TagChip, SlashPill, QrMark } from './Decor'
import { ArrowUpRight, Send } from 'lucide-react'

const FAQ_ITEMS = [
  {
    q: 'Кто может участвовать?',
    a: 'Сотрудники отборного состава, ~80 человек. Состав формируется заранее.',
  },
  {
    q: 'Нужно ли уметь программировать?',
    a: 'Нет. Главное — интерес к темам мастер-классов, желание общаться и брать новое в работу.',
  },
  {
    q: 'Что с техникой?',
    a: 'Нужен ноутбук. Интернет и рабочие места организованы на площадке.',
  },
  {
    q: 'Где будет проходить?',
    a: 'На площадке Les Art Resort. Точные организационные детали и программа появятся ближе к мероприятию.',
  },
  {
    q: 'Нужно ли платить?',
    a: 'TBD: бесплатно / частично / полностью. Детали подтвердим ближе к событию.',
  },
  {
    q: 'Что со сном?',
    a: 'TBD: ночлег на площадке / отель / самостоятельный. Подробности — вместе с подтверждением локации.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative bg-paper py-20 sm:py-28 border-t border-ink/5">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left header */}
          <div className="lg:col-span-5">
            <TagChip variant="cyan">/faq</TagChip>
            <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.05]">
              Частые вопросы
            </h2>
            <p className="mt-5 font-sans text-base sm:text-lg text-ink/65 leading-relaxed max-w-md">
              Не нашли ответ?{' '}
              <a
                href="https://t.me/+N_X0TPh1rqVkMTBi"
                className="text-vibe font-semibold underline underline-offset-4 hover:no-underline"
              >
                Перейдите в Телеграм-чат
              </a>{' '}
              — мы ответим лично.
            </p>

            <div className="mt-8 hidden lg:block">
              <div className="inline-flex items-center gap-3 bg-white border border-ink/8 rounded-2xl p-4">
                <QrMark variant="vibe" className="w-12 h-12" seed={77} />
                <div>
                  <div className="font-mono text-xs text-ink/50 uppercase tracking-widest">
                    chat · updates
                  </div>
                  <div className="font-display font-bold text-ink text-sm">
                    Телеграм-чат
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right accordion */}
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white border border-ink/8 rounded-2xl px-5 sm:px-6 data-[state=open]:shadow-sm transition-shadow"
                >
                  <AccordionTrigger className="font-display font-bold text-lg sm:text-xl text-ink text-left hover:no-underline py-5">
                    <span className="flex items-start gap-3">
                      <span className="font-mono text-xs text-vibe mt-1.5 shrink-0">
                        0{i + 1}
                      </span>
                      <span>{item.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-base text-ink/70 leading-relaxed pb-5 pl-7">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FinalCTA — bottom CTA screen
   ============================================================ */
export function FinalCTA() {
  return (
    <section
      id="contacts"
      className="relative bg-ink text-paper py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-pixel-grid pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7B36FF 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 text-center">
        <div className="flex justify-center mb-6">
          <TagChip variant="lime">/connect</TagChip>
        </div>

        <h2 className="font-display font-extrabold tracking-tight leading-[0.95] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl">
          <span className="block text-paper">Остаёмся на связи?</span>
        </h2>

        <p className="mt-6 font-sans text-lg sm:text-2xl text-paper/75 max-w-2xl mx-auto leading-relaxed">
          Подключайся к Телеграм-чату и следи за обновлениями программы, мастер-классов и логистики.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://t.me/+N_X0TPh1rqVkMTBi"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 bg-vibe hover:bg-vibe/90 text-white font-display font-bold text-lg px-8 py-5 rounded-full transition-all hover:translate-y-[-1px]"
          >
            Телеграм-чат
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="/guide"
            className="inline-flex items-center gap-2 bg-transparent border border-paper/20 hover:border-paper/40 text-paper font-display font-semibold text-lg px-8 py-5 rounded-full transition-colors"
          >
            База знаний
          </a>
        </div>

        {/* Bottom slash commands reminder */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          <SlashPill variant="cyan">/Connect</SlashPill>
          <SlashPill variant="vibe">/CREATE</SlashPill>
          <SlashPill variant="lime">/VIBE</SlashPill>
          <SlashPill variant="pink">/Chill</SlashPill>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Footer
   ============================================================ */
export function Footer() {
  return (
    <footer className="relative bg-ink text-paper border-t border-paper/10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-2xl tracking-tight text-paper">
                KONSOL
              </span>
              <span className="font-mono text-sm text-vibe font-bold tracking-widest">
                /VIBE-6
              </span>
            </div>
            <p className="mt-3 font-sans text-sm text-paper/60 max-w-xs leading-relaxed">
              Три дня, реальное общение и новые знания. Мастер-классы, темы по ИИ и вайб-кодингу, вечерняя программа.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="font-mono text-xs text-paper/40 uppercase tracking-widest mb-3">
              /nav
            </div>
            <ul className="space-y-2">
              <li><a href="#program" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">Программа</a></li>
              <li><a href="/guide" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">База знаний</a></li>
              <li><a href="#about" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">О мероприятии</a></li>
              <li><a href="#location" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">Локация</a></li>
              <li><a href="#faq" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="font-mono text-xs text-paper/40 uppercase tracking-widest mb-3">
              /contacts
            </div>
            <ul className="space-y-2">
              <li>
                <span className="inline-flex items-center gap-2 font-sans text-sm text-paper/80">
                  <Send size={14} /> звонить
                </span>
              </li>
              <li>
                <span className="font-sans text-sm text-paper/80">чат</span>
              </li>
              <li>
                <a
                  href="https://t.me/+N_X0TPh1rqVkMTBi"
                  className="font-sans text-sm text-paper/80 hover:text-cyan transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Телеграм-чат
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="font-sans text-sm text-paper/80 hover:text-cyan transition-colors"
                >
                  Вход в админку
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-6 border-t border-paper/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="font-mono text-xs text-paper/40">
            © 2026 KONSOL / VIBE-6
          </div>
          <div className="font-mono text-xs text-paper/40">
            connect · create · vibe · chill
          </div>
        </div>
      </div>
    </footer>
  )
}
