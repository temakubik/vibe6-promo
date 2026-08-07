'use client'

import { useMemo, useState } from 'react'
import { FileDown, Users } from 'lucide-react'
import { TagChip } from '@/components/site/Decor'
import { cn } from '@/lib/utils'
import type { WorkshopRegistrationEntry } from '@/lib/workshop-signups'

type AdminWorkshopSummary = {
  id: string
  speaker: string
  title: string
  slot: string
  day: string
  date: string
  time: string
  registrations: WorkshopRegistrationEntry[]
}

type AdminChallengeSummary = {
  id: string
  name: string
  telegramUsername: string
  willingToBetMoney: boolean
  hasChallengeIdea: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard({
  workshops,
  challenges,
}: {
  workshops: AdminWorkshopSummary[]
  challenges: AdminChallengeSummary[]
}) {
  const [selectedMode, setSelectedMode] = useState<'workshops' | 'challenges'>(
    workshops.length ? 'workshops' : 'challenges'
  )
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(workshops[0]?.id ?? '')
  const [selectedChallengeId, setSelectedChallengeId] = useState(challenges[0]?.id ?? '')

  const selectedWorkshop = useMemo(
    () => workshops.find((workshop) => workshop.id === selectedWorkshopId) ?? workshops[0],
    [selectedWorkshopId, workshops]
  )
  const selectedChallenge = useMemo(
    () => challenges.find((challenge) => challenge.id === selectedChallengeId) ?? challenges[0],
    [challenges, selectedChallengeId]
  )

  if (selectedMode === 'workshops' && !selectedWorkshop) {
    return (
      <EmptyAdminState text="Пока нет воркшопов для отображения." />
    )
  }

  if (selectedMode === 'challenges' && !selectedChallenge) {
    return (
      <>
        <ModeSwitch selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
        <EmptyAdminState text="Пока нет заявок на челленджи." />
      </>
    )
  }

  return (
    <div className="space-y-6">
      <ModeSwitch selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
        {selectedMode === 'workshops' && selectedWorkshop ? (
          <>
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="overflow-hidden rounded-[28px] border-[4px] border-ink bg-white">
                <div className="border-b-[4px] border-ink bg-[#BBEE54] px-5 py-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
                    Воркшопы
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-ink/70">
                    Нажми на автора, чтобы справа увидеть список участников.
                  </div>
                </div>

                <div className="max-h-[70vh] space-y-3 overflow-y-auto px-4 py-4">
                  {workshops.map((workshop) => {
                    const isActive = workshop.id === selectedWorkshop.id

                    return (
                      <button
                        key={workshop.id}
                        type="button"
                        onClick={() => setSelectedWorkshopId(workshop.id)}
                        className={cn(
                          'w-full rounded-[22px] border-[3px] px-4 py-4 text-left transition-colors',
                          isActive
                            ? 'border-vibe bg-vibe/5 shadow-[0_0_0_4px_rgba(123,54,255,0.12)]'
                            : 'border-ink/10 bg-paper hover:border-vibe/65 hover:bg-vibe/5'
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-display text-xl leading-[0.95] text-ink">
                              {workshop.speaker}
                            </div>
                            <div className="mt-2 text-sm leading-snug text-ink/62">
                              {workshop.title}
                            </div>
                          </div>
                          <div className="shrink-0 rounded-full bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-paper">
                            {workshop.registrations.length}
                          </div>
                        </div>

                        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
                          {workshop.slot} · {workshop.day} · {workshop.time}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            <section className="overflow-hidden rounded-[28px] border-[4px] border-ink bg-white">
              <div className="border-b-[4px] border-ink bg-paper px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-vibe">
                      {selectedWorkshop.slot} · {selectedWorkshop.day} · {selectedWorkshop.date} ·{' '}
                      {selectedWorkshop.time}
                    </div>
                    <h2 className="mt-3 text-[1.75rem] leading-[0.95] tracking-[-0.03em] text-ink sm:text-[2.2rem]">
                      {selectedWorkshop.title}
                    </h2>
                    <div className="mt-3 font-display text-xl leading-none text-ink/70">
                      {selectedWorkshop.speaker}
                    </div>
                  </div>

                  <div className="rounded-[22px] border-2 border-vibe/25 bg-vibe/5 px-4 py-3">
                    <div className="font-display text-3xl leading-none text-ink">
                      {selectedWorkshop.registrations.length}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
                      записались
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-5 sm:px-6">
                {selectedWorkshop.registrations.length ? (
                  <div className="space-y-3">
                    <div className="hidden rounded-[20px] border border-ink/10 bg-paper px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(180px,220px)] sm:gap-4">
                      <div>Имя</div>
                      <div>Фамилия</div>
                      <div>Telegram</div>
                    </div>

                    {selectedWorkshop.registrations.map((registration) => {
                      const { firstName, lastName } = splitFullName(registration.fullName)

                      return (
                        <div
                          key={`${selectedWorkshop.id}-${registration.telegramUsername}-${registration.fullName}`}
                          className="rounded-[22px] border-2 border-vibe/20 bg-vibe/5 px-4 py-4"
                        >
                          <div className="space-y-3 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(180px,220px)] sm:gap-4 sm:space-y-0">
                            <ParticipantField label="Имя" value={firstName} />
                            <ParticipantField label="Фамилия" value={lastName} />
                            <ParticipantField
                              label="Telegram"
                              value={registration.telegramUsername}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <EmptyPanelState text="Пока никто не записался" />
                )}
              </div>
            </section>
          </>
        ) : selectedChallenge ? (
          <>
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="overflow-hidden rounded-[28px] border-[4px] border-ink bg-white">
                <div className="border-b-[4px] border-ink bg-[#DFF4BE] px-5 py-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
                    Челленджи
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-ink/70">
                    Выбери заявку, чтобы справа увидеть детали и скачать список в CSV.
                  </div>
                </div>

                <div className="max-h-[70vh] space-y-3 overflow-y-auto px-4 py-4">
                  {challenges.map((challenge) => {
                    const isActive = challenge.id === selectedChallenge.id

                    return (
                      <button
                        key={challenge.id}
                        type="button"
                        onClick={() => setSelectedChallengeId(challenge.id)}
                        className={cn(
                          'w-full rounded-[22px] border-[3px] px-4 py-4 text-left transition-colors',
                          isActive
                            ? 'border-lime bg-lime/10 shadow-[0_0_0_4px_rgba(149,206,23,0.16)]'
                            : 'border-ink/10 bg-paper hover:border-lime/65 hover:bg-lime/5'
                        )}
                      >
                        <div className="font-display text-xl leading-[0.95] text-ink">
                          {challenge.name}
                        </div>
                        <div className="mt-2 text-sm leading-snug text-ink/62">
                          {challenge.telegramUsername}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {challenge.willingToBetMoney ? (
                            <TagChip variant="lime">Со ставкой</TagChip>
                          ) : (
                            <TagChip variant="paper">Без ставки</TagChip>
                          )}
                          {challenge.hasChallengeIdea ? (
                            <TagChip variant="vibe">Идея есть</TagChip>
                          ) : (
                            <TagChip variant="paper">Думает</TagChip>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            <section className="overflow-hidden rounded-[28px] border-[4px] border-ink bg-white">
              <div className="border-b-[4px] border-ink bg-paper px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-vibe">
                      /challenges
                    </div>
                    <h2 className="mt-3 text-[1.75rem] leading-[0.95] tracking-[-0.03em] text-ink sm:text-[2.2rem]">
                      {selectedChallenge.name}
                    </h2>
                    <div className="mt-3 text-base leading-snug text-ink/70">
                      {selectedChallenge.telegramUsername}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="/api/admin/challenge-signups.csv"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-5 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      <FileDown size={16} />
                      Скачать CSV
                    </a>
                    <div className="rounded-[22px] border-2 border-lime/25 bg-lime/10 px-4 py-3">
                      <div className="font-display text-3xl leading-none text-ink">
                        {challenges.length}
                      </div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
                        заявок
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 px-5 py-5 sm:px-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <DetailCard
                    label="Имя"
                    value={selectedChallenge.name}
                    accentClassName="border-vibe/20 bg-vibe/5"
                  />
                  <DetailCard
                    label="Telegram"
                    value={selectedChallenge.telegramUsername}
                    accentClassName="border-cyan/25 bg-cyan/10"
                  />
                  <DetailCard
                    label="Готов поставить деньги"
                    value={selectedChallenge.willingToBetMoney ? 'Да' : 'Нет'}
                    accentClassName="border-lime/25 bg-lime/10"
                  />
                  <DetailCard
                    label="Идея челленджа"
                    value={selectedChallenge.hasChallengeIdea ? 'Уже есть' : 'Ещё думает'}
                    accentClassName="border-ink/10 bg-paper"
                  />
                </div>

                <div className="rounded-[24px] border border-ink/10 bg-paper px-4 py-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ParticipantField
                      label="Создано"
                      value={formatDateTime(selectedChallenge.createdAt)}
                    />
                    <ParticipantField
                      label="Обновлено"
                      value={formatDateTime(selectedChallenge.updatedAt)}
                    />
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </div>
  )
}

function ModeSwitch({
  selectedMode,
  setSelectedMode,
}: {
  selectedMode: 'workshops' | 'challenges'
  setSelectedMode: (mode: 'workshops' | 'challenges') => void
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => setSelectedMode('workshops')}
        className={cn(
          'inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm uppercase tracking-[0.12em] transition-colors',
          selectedMode === 'workshops'
            ? 'border-vibe bg-vibe text-white'
            : 'border-ink/10 bg-white text-ink hover:border-vibe/45 hover:bg-vibe/5'
        )}
      >
        Воркшопы
      </button>
      <button
        type="button"
        onClick={() => setSelectedMode('challenges')}
        className={cn(
          'inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm uppercase tracking-[0.12em] transition-colors',
          selectedMode === 'challenges'
            ? 'border-lime bg-lime text-ink'
            : 'border-ink/10 bg-white text-ink hover:border-lime/45 hover:bg-lime/10'
        )}
      >
        Челленджи
      </button>
    </div>
  )
}

function DetailCard({
  label,
  value,
  accentClassName,
}: {
  label: string
  value: string
  accentClassName: string
}) {
  return (
    <div className={cn('rounded-[22px] border px-4 py-4', accentClassName)}>
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">{label}</div>
      <div className="mt-3 text-lg leading-snug text-ink">{value}</div>
    </div>
  )
}

function EmptyAdminState({ text }: { text: string }) {
  return (
    <div className="rounded-[28px] border-[4px] border-ink bg-white px-6 py-10 text-center text-ink/55">
      {text}
    </div>
  )
}

function EmptyPanelState({ text }: { text: string }) {
  return (
    <div className="rounded-[24px] border-2 border-dashed border-ink/12 bg-paper px-5 py-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-vibe/10 text-vibe">
        <Users size={24} />
      </div>
      <div className="mt-4 text-lg text-ink">{text}</div>
      <div className="mt-2 text-sm text-ink/55">
        Как только появятся регистрации, они будут показаны здесь.
      </div>
    </div>
  )
}

function ParticipantField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45 sm:hidden">
        {label}
      </div>
      <div className="mt-1 text-base leading-snug text-ink sm:mt-0">{value || '—'}</div>
    </div>
  )
}

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return { firstName: '—', lastName: '—' }
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '—' }
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  }
}

function formatDateTime(value: string) {
  if (!value) {
    return '—'
  }

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsedDate)
}
