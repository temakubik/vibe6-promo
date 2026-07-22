'use client'

import { useMemo, useState } from 'react'
import { Users } from 'lucide-react'
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

export default function AdminDashboard({
  workshops,
}: {
  workshops: AdminWorkshopSummary[]
}) {
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(workshops[0]?.id ?? '')

  const selectedWorkshop = useMemo(
    () => workshops.find((workshop) => workshop.id === selectedWorkshopId) ?? workshops[0],
    [selectedWorkshopId, workshops]
  )

  if (!selectedWorkshop) {
    return (
      <div className="rounded-[28px] border-[4px] border-ink bg-white px-6 py-10 text-center text-ink/55">
        Пока нет воркшопов для отображения.
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
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
                {selectedWorkshop.slot} · {selectedWorkshop.day} · {selectedWorkshop.date} · {selectedWorkshop.time}
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
                      <ParticipantField label="Telegram" value={registration.telegramUsername} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-[24px] border-2 border-dashed border-ink/12 bg-paper px-5 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-vibe/10 text-vibe">
                <Users size={24} />
              </div>
              <div className="mt-4 text-lg text-ink">Пока никто не записался</div>
              <div className="mt-2 text-sm text-ink/55">
                Как только появятся регистрации, они будут показаны здесь.
              </div>
            </div>
          )}
        </div>
      </section>
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
