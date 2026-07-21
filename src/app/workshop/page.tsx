'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { TagChip } from '@/components/site/Decor'
import { workshopSlots, type WorkshopItem } from '@/lib/workshops'

const totalWorkshops = workshopSlots.reduce((sum, slot) => sum + slot.items.length, 0)
const initialSlotId = workshopSlots[0]?.id ?? ''
const deviceStorageKey = 'vibe6-workshop-device-id'

type VoteSummary = {
  counts: Record<string, number>
  selections: Record<string, string | null>
}

export default function WorkshopPage() {
  const searchParams = useSearchParams()
  const slotFromQuery = searchParams.get('slot')
  const initialSelectedSlotId =
    slotFromQuery && workshopSlots.some((slot) => slot.id === slotFromQuery) ? slotFromQuery : initialSlotId

  const [activeSlotId, setActiveSlotId] = useState(initialSelectedSlotId)
  const [voteSummary, setVoteSummary] = useState<VoteSummary>({ counts: {}, selections: {} })
  const [votesLoading, setVotesLoading] = useState(true)
  const [pendingWorkshopId, setPendingWorkshopId] = useState<string | null>(null)
  const [voteError, setVoteError] = useState<string | null>(null)
  const deviceIdRef = useRef('')
  const activeSlot = workshopSlots.find((slot) => slot.id === activeSlotId) ?? workshopSlots[0]

  useEffect(() => {
    const existingDeviceId = window.localStorage.getItem(deviceStorageKey)
    const nextDeviceId = existingDeviceId ?? createDeviceId()

    if (!existingDeviceId) {
      window.localStorage.setItem(deviceStorageKey, nextDeviceId)
    }

    deviceIdRef.current = nextDeviceId

    void loadVotes(nextDeviceId)
  }, [])

  const loadVotes = async (deviceId: string) => {
    setVotesLoading(true)

    try {
      const response = await fetch(`/api/workshop-votes?deviceId=${encodeURIComponent(deviceId)}`, {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('votes_load_failed')
      }

      const data = (await response.json()) as VoteSummary
      setVoteSummary(data)
      setVoteError(null)
    } catch {
      setVoteError('Не получилось загрузить отметки. Попробуй обновить страницу.')
    } finally {
      setVotesLoading(false)
    }
  }

  const handleWorkshopVote = async (slotId: string, workshopId: string) => {
    if (!deviceIdRef.current) return

    const selectedWorkshopId = voteSummary.selections[slotId]
    const nextWorkshopId = selectedWorkshopId === workshopId ? null : workshopId

    setPendingWorkshopId(workshopId)

    try {
      const response = await fetch('/api/workshop-votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId: deviceIdRef.current,
          slotId,
          workshopId: nextWorkshopId,
        }),
      })

      if (!response.ok) {
        throw new Error('votes_update_failed')
      }

      const data = (await response.json()) as VoteSummary
      setVoteSummary(data)
      setVoteError(null)
    } catch {
      setVoteError('Не получилось сохранить выбор. Попробуй ещё раз.')
    } finally {
      setPendingWorkshopId(null)
    }
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="relative overflow-hidden border-b border-ink/8 bg-ink text-paper">
        <div className="absolute inset-0 bg-pixel-grid opacity-100 pointer-events-none" />
        <div
          className="absolute -top-24 right-0 h-64 w-64 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #7B36FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-24 left-0 h-64 w-64 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #95CE17 0%, transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-[1280px] px-4 pb-12 pt-24 sm:px-6 lg:px-10 lg:pb-16">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper"
            >
              <ArrowLeft size={16} />
              На главную
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-sm text-paper/50 transition-colors hover:text-paper"
            >
              К базе знаний
            </Link>
            <Link
              href="/guide/schedule"
              className="inline-flex items-center gap-2 text-sm text-paper/50 transition-colors hover:text-paper"
            >
              К расписанию
            </Link>
          </div>

          <div className="mt-8 max-w-[980px]">
            <TagChip variant="lime">/workshop</TagChip>
            <h1 className="mt-6 font-display text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
              Воркшопы Vibe-6
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-paper/72 sm:text-lg">
              Собрали все воркшопы из трёх слотов в одном месте: время, день и темы, чтобы
              быстро выбрать, куда идти и что не пропустить.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:max-w-[860px]">
            <HeroStat value={`${totalWorkshops}`} label="воркшопов" />
            <HeroStat value={`${workshopSlots.length}`} label="слота" />
            <HeroStat value="2" label="дня программы" />
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="space-y-8">
            <section className="border-b border-ink/8 pb-8">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
                  Слоты
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {workshopSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setActiveSlotId(slot.id)}
                      className={`rounded-full border px-4 py-2 font-display text-lg transition-colors ${
                        slot.id === activeSlot?.id
                          ? 'border-vibe bg-vibe text-white'
                          : 'border-ink/10 bg-white text-ink hover:border-ink/25'
                      }`}
                    >
                      {slot.slot.replace('Слот ', '')}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {activeSlot ? (
              <section className="border-b border-ink/8 pb-8 last:border-b-0 last:pb-0">
                <div className="grid gap-4 border-b border-ink/10 pb-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="font-mono text-sm uppercase tracking-[0.18em] text-vibe">
                    {activeSlot.slot}
                  </div>
                  <div className="font-display text-2xl leading-none sm:text-3xl">{activeSlot.day}</div>
                  <div className="font-display text-2xl leading-none sm:text-3xl">{activeSlot.time}</div>
                  <div className="font-display text-2xl leading-none sm:text-3xl">{activeSlot.date}</div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink/60">
                  <div>Можно выбрать только один воркшоп в этом слоте.</div>
                  {votesLoading ? <div>Загружаем отметки…</div> : null}
                  {voteError ? <div className="text-pink">{voteError}</div> : null}
                </div>

                <div className="mt-6 grid gap-5 xl:grid-cols-3">
                  {activeSlot.items.map((item) => (
                    <WorkshopCard
                      key={item.id}
                      item={item}
                      slotId={activeSlot.id}
                      votesCount={voteSummary.counts[item.id] ?? 0}
                      isSelected={voteSummary.selections[activeSlot.id] === item.id}
                      isPending={pendingWorkshopId === item.id}
                      onVote={handleWorkshopVote}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/guide/schedule"
              className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-display text-lg text-ink"
            >
              Расписание
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-display text-lg text-ink"
            >
              База знаний
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-display text-lg text-ink"
            >
              Вернуться на главную
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[24px] border border-paper/12 bg-paper/6 px-5 py-5">
      <div className="font-display text-4xl leading-none text-paper">{value}</div>
      <div className="mt-2 font-mono text-xs uppercase tracking-widest text-paper/50">{label}</div>
    </div>
  )
}

function WorkshopCard({
  item,
  slotId,
  votesCount,
  isSelected,
  isPending,
  onVote,
}: {
  item: WorkshopItem
  slotId: string
  votesCount: number
  isSelected: boolean
  isPending: boolean
  onVote: (slotId: string, workshopId: string) => void
}) {
  const initials = getInitials(item.speaker)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] border-[4px] border-ink bg-paper shadow-[0_10px_30px_rgba(16,15,14,0.06)]">
      <div className="border-b-[4px] border-ink bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink text-lg font-semibold text-paper">
            {initials}
          </div>
          <div className="font-display text-2xl leading-[0.95] text-ink sm:text-3xl">
            {item.speaker}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-stretch bg-[#BBEE54] px-4 py-4">
        <div className="flex w-full flex-col gap-4">
          <div className="text-[1.4rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[1.75rem]">
            {item.title}
          </div>
          <div className="mt-auto flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onVote(slotId, item.id)}
              disabled={isPending}
              className={`rounded-full border px-4 py-2 font-display text-base transition-colors ${
                isSelected
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/20 bg-white/75 text-ink hover:bg-white'
              } disabled:cursor-wait disabled:opacity-70`}
            >
              {isPending ? 'Сохраняем…' : isSelected ? 'Выбран' : 'Пойду'}
            </button>
            <div className="font-mono text-xs uppercase tracking-widest text-ink/70">
              {votesCount} {formatParticipants(votesCount)}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function createDeviceId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `device-${Math.random().toString(36).slice(2)}`
}

function formatParticipants(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) return 'идёт'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'идут'
  return 'идут'
}
