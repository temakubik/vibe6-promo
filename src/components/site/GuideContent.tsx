'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, Luggage, Plane, Shirt, Sparkles } from 'lucide-react'
import { TagChip } from '@/components/site/Decor'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { guideSections, knowledgeBase, scheduleDays, type GuideSectionSlug } from '@/lib/knowledge-base'

const KNOWLEDGE_COVER =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=photorealistic%20creative%20knowledge%20workspace%2C%20open%20notebook%2C%20sticky%20notes%2C%20laptop%20with%20clean%20interface%2C%20soft%20ambient%20light%2C%20editorial%20desk%20photography%2C%20premium%2C%20minimal%2C%20realistic&image_size=landscape_16_9'

export function GuideShell({
  currentSlug,
}: {
  currentSlug?: GuideSectionSlug
}) {
  const activeSlug = currentSlug ?? guideSections[0].slug

  return (
    <>
      <section className="relative overflow-hidden border-b border-paper/10 bg-ink text-paper">
        <div className="absolute inset-0 bg-pixel-grid opacity-100 pointer-events-none" />
        <div
          className="absolute -top-20 right-0 h-64 w-64 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #7B36FF 0%, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-[1280px] px-4 pb-8 pt-24 sm:px-6 lg:px-10 lg:pb-10">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper"
            >
              <ArrowLeft size={16} />
              На главную
            </Link>
            {currentSlug ? (
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 text-sm text-paper/50 transition-colors hover:text-paper"
              >
                К базе знаний
              </Link>
            ) : null}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div>
              <h1 className="font-display text-4xl leading-none sm:text-6xl lg:text-7xl">
                База знаний
              </h1>
            </div>
            <div className="lg:justify-self-end">
              <img
                src={KNOWLEDGE_COVER}
                alt="Иллюстрация базы знаний"
                className="h-28 w-full rounded-[24px] border border-paper/10 object-cover shadow-2xl sm:h-32 lg:w-[320px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <Tabs defaultValue={activeSlug} className="gap-6">
            <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <TabsList className="h-auto min-w-max gap-2 rounded-full bg-transparent p-0">
                {guideSections.map((section) => (
                  <TabsTrigger
                    key={section.slug}
                    value={section.slug}
                    className="h-auto rounded-full border border-ink/10 bg-white px-4 py-2.5 font-display text-sm text-ink/70 shadow-sm transition-all data-[state=active]:border-vibe data-[state=active]:bg-vibe data-[state=active]:text-white data-[state=active]:shadow-none sm:px-5 sm:text-base"
                  >
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {guideSections.map((section) => (
              <TabsContent key={section.slug} value={section.slug}>
                <GuideSectionContent slug={section.slug} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  )
}

export function GuideSectionContent({ slug }: { slug: GuideSectionSlug }) {
  switch (slug) {
    case 'schedule':
      return <ScheduleSection />
    case 'packing':
      return <PackingSection />
    case 'principles':
      return <PrinciplesSection />
    case 'dress-code':
      return <DressCodeSection />
    case 'flight-delay':
      return <FlightDelaySection />
    default:
      return null
  }
}

function ScheduleSection() {
  return (
    <section className="border-t border-ink/5 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <TagChip variant="cyan">/schedule</TagChip>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
              Расписание по дням
            </h2>
          </div>
          <p className="max-w-md text-sm text-ink/60 sm:text-base">
            Предварительная программа из базы знаний, перенесённая в формат сайта.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {scheduleDays.map((day) => (
            <article
              key={day.id}
              className="rounded-3xl border border-ink/8 bg-paper p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <span className={`tag-chip ${accentTag(day.accent)}`}>{day.label}</span>
                <span className="font-mono text-xs uppercase tracking-widest text-ink/45">
                  {day.date}
                </span>
              </div>
              <h3 className="mt-4 font-display text-3xl">{day.title}</h3>
              <ul className="mt-6 space-y-3">
                {day.items.map((item) => (
                  <li key={`${day.id}-${item.time}`} className="rounded-2xl bg-white px-4 py-3">
                    <div className="font-mono text-xs uppercase tracking-wide text-ink/50">
                      {item.time}
                    </div>
                    <div className="mt-1 text-base font-semibold text-ink">{item.title}</div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PackingSection() {
  return (
    <section className="border-t border-ink/5 bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <TagChip variant="lime">/packing</TagChip>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
            {knowledgeBase.sections.packing.title}
          </h2>
          <p className="mt-4 max-w-md text-base text-ink/65">
            Чек-лист поездки без лишних заглушек: всё, что прямо указано в базе знаний.
          </p>
          <img
            src={knowledgeBase.sections.packing.image}
            alt="Что взять с собой"
            className="mt-8 h-[280px] w-full rounded-[28px] object-cover"
          />
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {knowledgeBase.sections.packing.items.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-ink/8 bg-paper p-5 text-sm leading-relaxed text-ink/80 sm:text-base"
              >
                <Luggage size={18} className="mb-4 text-vibe" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PrinciplesSection() {
  return (
    <section className="border-t border-paper/10 bg-ink py-16 text-paper sm:py-20">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <TagChip variant="paper">/principles</TagChip>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
            {knowledgeBase.sections.principles.title}
          </h2>
          <img
            src={knowledgeBase.sections.principles.image}
            alt="Принципы Vibe-6"
            className="mt-8 h-[280px] w-full rounded-[28px] object-cover"
          />
        </div>

        <div className="space-y-4 lg:col-span-7">
          {knowledgeBase.sections.principles.items.map((item, index) => (
            <article
              key={item.title}
              className="rounded-3xl border border-paper/10 bg-paper/5 p-6"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-lime">
                0{index + 1}
              </div>
              <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
              <p className="mt-2 text-paper/75">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DressCodeSection() {
  return (
    <section className="border-t border-ink/5 py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <TagChip variant="pink">/dress_code</TagChip>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
            {knowledgeBase.sections.dressCode.title}
          </h2>
          <div className="mt-5 space-y-3 text-base text-ink/70">
            {knowledgeBase.sections.dressCode.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <img
            src={knowledgeBase.sections.dressCode.image}
            alt="Dress-code Vibe-6"
            className="h-[320px] w-full rounded-[28px] object-cover"
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {knowledgeBase.sections.dressCode.items.map((item) => (
              <div key={item} className="rounded-2xl border border-ink/8 bg-white p-4">
                <div className="flex items-start gap-3">
                  <Shirt size={18} className="mt-0.5 shrink-0 text-pink" />
                  <span className="text-sm leading-relaxed text-ink/80 sm:text-base">{item}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-pink/20 bg-pink/5 p-5">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="mt-0.5 shrink-0 text-pink" />
              <div>
                <p className="text-sm font-semibold text-ink sm:text-base">Чего лучше избегать</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/70 sm:text-base">
                  {knowledgeBase.sections.dressCode.avoid}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
                  {knowledgeBase.sections.dressCode.outro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FlightDelaySection() {
  return (
    <section className="border-t border-ink/5 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <TagChip variant="cyan">/flight_delay</TagChip>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
              {knowledgeBase.sections.flight.title}
            </h2>
          </div>
          <div className="rounded-full border border-ink/8 bg-paper px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink/60">
            контакт: {knowledgeBase.sections.flight.contact}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-3xl border border-ink/8 bg-paper p-6">
            <Plane size={22} className="text-vibe" />
            <h3 className="mt-4 font-display text-2xl">Сначала напиши Дане</h3>
            <p className="mt-3 text-ink/70">{knowledgeBase.sections.flight.intro}</p>
          </article>

          <article className="rounded-3xl border border-ink/8 bg-paper p-6">
            <h3 className="font-display text-2xl">Если прилетаешь во Внуково</h3>
            <ul className="mt-4 space-y-3">
              {knowledgeBase.sections.flight.vnk.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/80 sm:text-base">
                  <Check size={16} className="mt-1 shrink-0 text-lime" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-ink/8 bg-paper p-6">
            <h3 className="font-display text-2xl">Если прилетаешь в Шереметьево или Домодедово</h3>
            <ul className="mt-4 space-y-3">
              {knowledgeBase.sections.flight.svoDme.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/80 sm:text-base">
                  <Check size={16} className="mt-1 shrink-0 text-lime" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-5 rounded-3xl border border-ink/8 bg-ink p-6 text-paper sm:p-8">
          <h3 className="font-display text-3xl">Что сохранить для компенсации</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {knowledgeBase.sections.flight.reimbursements.map((item) => (
              <div key={item} className="rounded-2xl border border-paper/10 bg-paper/5 p-4 text-paper/80">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-vibe px-6 py-4 font-display text-white transition-transform hover:-translate-y-px"
          >
            Вернуться на главную
            <ArrowUpRight size={18} />
          </Link>
          <a
            href="https://t.me/+N_X0TPh1rqVkMTBi"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-4 font-display text-ink"
          >
            Телеграм-чат
          </a>
        </div>
      </div>
    </section>
  )
}

function accentTag(accent: string) {
  switch (accent) {
    case 'vibe':
      return 'bg-vibe text-white'
    case 'lime':
      return 'bg-lime text-ink'
    case 'cyan':
      return 'bg-cyan text-ink'
    default:
      return 'bg-paper text-ink'
  }
}
