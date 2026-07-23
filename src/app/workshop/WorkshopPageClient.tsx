'use client'

import { type CSSProperties, type FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { TagChip } from '@/components/site/Decor'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { workshopSlots, type WorkshopItem, type WorkshopSlot } from '@/lib/workshops'

const totalWorkshops = workshopSlots.reduce((sum, slot) => sum + slot.items.length, 0)
const defaultFormValues = {
  firstName: '',
  lastName: '',
  telegramUsername: '',
  selections: Object.fromEntries(workshopSlots.map((slot) => [slot.id, ''])) as Record<string, string>,
}

type SignupStep = 0 | 1 | 2 | 3 | 4

function normalizeTelegramUsername(value: string) {
  const trimmedValue = value.replace(/\s+/g, '').toLowerCase()
  const strippedValue = trimmedValue.replace(/^@+/, '')

  return strippedValue ? `@${strippedValue}` : ''
}

export default function WorkshopPageClient() {
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false)
  const [signupStep, setSignupStep] = useState<SignupStep>(0)
  const [formValues, setFormValues] = useState(defaultFormValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function closeSignupDialog() {
    setIsSignupDialogOpen(false)
    setSignupStep(0)
    setFormValues(defaultFormValues)
    setSubmitError(null)
    setIsSubmitting(false)
  }

  function openSignupDialog() {
    setIsSignupDialogOpen(true)
    setSignupStep(0)
    setFormValues(defaultFormValues)
    setSubmitError(null)
  }

  function handleSlotSelection(slotId: string, workshopId: string) {
    const currentStepIndex = workshopSlots.findIndex((slot) => slot.id === slotId)

    setFormValues((currentValues) => ({
      ...currentValues,
      selections: {
        ...currentValues.selections,
        [slotId]: workshopId,
      },
    }))
    setSubmitError(null)

    if (currentStepIndex === -1) {
      return
    }

    if (currentStepIndex < workshopSlots.length - 1) {
      setSignupStep((currentStepIndex + 1) as SignupStep)
      return
    }

    setSignupStep(3)
  }

  async function handleSignupSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const firstName = formValues.firstName.trim()
    const lastName = formValues.lastName.trim()
    const fullName = `${firstName} ${lastName}`.trim()
    const telegramUsername = normalizeTelegramUsername(formValues.telegramUsername)
    const selections = formValues.selections

    if (firstName.length < 2 || lastName.length < 2 || telegramUsername.length < 2) {
      setSubmitError('Заполни имя, фамилию и ник в Telegram.')
      return
    }

    if (!/^@[A-Za-z0-9_]+$/.test(telegramUsername)) {
      setSubmitError('Укажи корректный ник в Telegram.')
      return
    }

    if (workshopSlots.some((slot) => !selections[slot.id])) {
      setSubmitError('Выбери по одному воркшопу в каждом слоте.')
      return
    }

    try {
      setIsSubmitting(true)
      setSubmitError(null)

      const response = await fetch('/api/workshop-signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          telegramUsername,
          selections,
        }),
      })
      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.message || 'Не удалось сохранить запись.')
      }

      setSignupStep(4)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не удалось сохранить запись.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentSelectionStep = signupStep < workshopSlots.length ? workshopSlots[signupStep] : null
  const isSuccessStep = signupStep === 4

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

          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 lg:max-w-[860px]">
            <HeroStat value={`${totalWorkshops}`} label="воркшопов" />
            <HeroStat value={`${workshopSlots.length}`} label="слота" />
            <HeroStat value="2" label="дня программы" />
          </div>

          <div className="mt-8">
            <Button
              type="button"
              onClick={openSignupDialog}
              className="cta-pulse-mobile h-12 w-full rounded-full bg-[#BBEE54] px-7 text-sm uppercase tracking-[0.12em] text-ink hover:bg-[#a9dd42] sm:w-auto"
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="space-y-8">
            {workshopSlots.map((slot) => (
              <section key={slot.id} className="border-b border-ink/8 pb-8 last:border-b-0 last:pb-0">
                <div className="border-b border-ink/10 pb-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="font-mono text-xs uppercase tracking-[0.18em] text-vibe sm:text-sm">
                      {slot.slot}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xl leading-none text-ink sm:gap-x-5 sm:text-2xl lg:text-3xl">
                      <span>{slot.day}</span>
                      <span className="text-ink/25" aria-hidden="true">·</span>
                      <span>{slot.date}</span>
                      <span className="text-ink/25" aria-hidden="true">·</span>
                      <span>{slot.time}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {slot.items.map((item) => (
                    <WorkshopCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-display text-lg text-ink"
            >
              Вход в админку
              <ArrowUpRight size={16} />
            </Link>
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

      <Dialog open={isSignupDialogOpen} onOpenChange={(isOpen) => !isOpen && closeSignupDialog()}>
        <DialogContent className="flex max-h-[calc(100dvh-1rem)] flex-col overflow-hidden rounded-[32px] border-[4px] border-ink bg-paper p-0 sm:max-h-[calc(100dvh-2rem)] sm:max-w-[560px] [&_[data-slot='dialog-close']]:top-3 [&_[data-slot='dialog-close']]:right-3 [&_[data-slot='dialog-close']]:flex [&_[data-slot='dialog-close']]:h-10 [&_[data-slot='dialog-close']]:w-10 [&_[data-slot='dialog-close']]:items-center [&_[data-slot='dialog-close']]:justify-center [&_[data-slot='dialog-close']]:rounded-full [&_[data-slot='dialog-close']]:border [&_[data-slot='dialog-close']]:border-ink/20 [&_[data-slot='dialog-close']]:bg-paper [&_[data-slot='dialog-close']]:text-ink/75 [&_[data-slot='dialog-close']]:opacity-100 [&_[data-slot='dialog-close']]:shadow-none [&_[data-slot='dialog-close']]:transition-colors [&_[data-slot='dialog-close']]:hover:bg-paper [&_[data-slot='dialog-close']]:hover:text-ink [&_[data-slot='dialog-close']_svg]:size-4 sm:[&_[data-slot='dialog-close']]:top-4 sm:[&_[data-slot='dialog-close']]:right-4">
          <div className="rounded-t-[28px] border-b-[4px] border-ink bg-[#BBEE54] px-4 py-4 sm:px-6 sm:py-6">
            <DialogHeader className="gap-2 text-left sm:gap-3">
              <DialogTitle className="max-w-[360px] font-display text-[1.5rem] leading-[0.94] tracking-[-0.03em] text-balance text-ink sm:max-w-[420px] sm:text-[2.35rem]">
                Регистрация на воркшопы
              </DialogTitle>
            </DialogHeader>
          </div>

          <form
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain space-y-3 px-4 pb-4 pt-1 sm:space-y-4 sm:px-5 sm:pb-5"
            onSubmit={handleSignupSubmit}
          >
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {[
                ...workshopSlots.map((slot) => ({
                  key: slot.id,
                  label: slot.slot.replace('Слот ', ''),
                  isDone: Boolean(formValues.selections[slot.id]),
                })),
                {
                  key: 'contacts',
                  label: 'Контакт',
                  isDone:
                    Boolean(formValues.firstName.trim()) &&
                    Boolean(formValues.lastName.trim()) &&
                    Boolean(formValues.telegramUsername.trim()),
                },
              ].map((step, index) => (
                <div
                  key={step.key}
                  className={cn(
                    'rounded-full border px-2 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] sm:px-3 sm:py-2 sm:text-[11px] sm:tracking-[0.16em]',
                    index === signupStep
                      ? 'border-ink bg-ink text-paper'
                      : step.isDone
                        ? 'border-[#BBEE54] bg-[#BBEE54] text-ink'
                        : 'border-ink/10 bg-white text-ink/55'
                  )}
                >
                  {step.label}
                </div>
              ))}
            </div>

            {isSuccessStep ? (
              <div className="relative overflow-hidden rounded-[24px] border-[4px] border-ink bg-[#BBEE54] px-4 py-8 text-center sm:px-6 sm:py-10">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        'success-confetti-piece absolute top-[-12%] h-3 w-2 rounded-full',
                        index % 4 === 0 && 'bg-vibe',
                        index % 4 === 1 && 'bg-pink',
                        index % 4 === 2 && 'bg-cyan',
                        index % 4 === 3 && 'bg-white'
                      )}
                      style={
                        {
                          left: `${6 + index * 5.2}%`,
                          animationDelay: `${(index % 6) * 0.14}s`,
                          animationDuration: `${2.8 + (index % 5) * 0.22}s`,
                          transform: `rotate(${index * 21}deg)`,
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>

                <div className="relative">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-ink bg-white text-[1.6rem] shadow-[0_10px_30px_rgba(16,15,14,0.12)]">
                    ✦
                  </div>
                  <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
                    Готово
                  </div>
                  <h3 className="mt-3 font-display text-[2rem] leading-[0.92] tracking-[-0.03em] text-ink sm:text-[2.5rem]">
                    Заявка отправлена
                  </h3>
                  <p className="mx-auto mt-3 max-w-[320px] text-sm leading-relaxed text-ink/70 sm:text-base">
                    Мы сохранили твой выбор по слотам. Если планы изменятся, можно отправить форму
                    ещё раз и обновить запись.
                  </p>
                </div>
              </div>
            ) : currentSelectionStep ? (
              <div className="space-y-2.5 sm:space-y-3">
                <div className="rounded-2xl border-2 border-ink/10 bg-white px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55 sm:text-[11px] sm:tracking-[0.16em]">
                    {currentSelectionStep.slot} · {currentSelectionStep.day} · {currentSelectionStep.time}
                  </div>
                  <div className="mt-1 text-xs text-ink/65 sm:mt-2 sm:text-sm">
                    Выбери один воркшоп, затем откроется следующий слот.
                  </div>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  {currentSelectionStep.items.map((item) => {
                    const isActive = formValues.selections[currentSelectionStep.id] === item.id

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSlotSelection(currentSelectionStep.id, item.id)}
                        className={cn(
                          'w-full rounded-[22px] border-[3px] bg-white px-3 py-3 text-left transition-colors sm:rounded-[24px] sm:p-4',
                          isActive
                            ? 'border-vibe bg-vibe/5 shadow-[0_0_0_4px_rgba(123,54,255,0.12)]'
                            : 'border-ink/10 hover:border-vibe/65 hover:bg-vibe/5'
                        )}
                      >
                        <div className="font-display text-lg leading-[0.95] text-ink sm:text-xl">
                          {item.speaker}
                        </div>
                        <div className="mt-2 text-sm leading-snug text-ink sm:mt-3 sm:text-[15px]">
                          {item.title}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="rounded-[22px] border-2 border-vibe bg-white p-3.5 shadow-[0_0_0_4px_rgba(123,54,255,0.08)] sm:rounded-[24px] sm:p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55 sm:text-[11px] sm:tracking-[0.16em]">
                    Ваши данные
                  </div>

                  <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                    <div>
                      <Input
                        id="workshop-signup-first-name"
                        value={formValues.firstName}
                        onChange={(event) =>
                          setFormValues((currentValues) => ({
                            ...currentValues,
                            firstName: event.target.value,
                          }))
                        }
                        placeholder="Имя"
                        className="h-11 rounded-2xl border-2 border-vibe/25 bg-paper px-4 text-sm text-ink focus-visible:border-vibe sm:h-12 sm:text-base"
                      />
                    </div>

                    <div>
                      <Input
                        id="workshop-signup-last-name"
                        value={formValues.lastName}
                        onChange={(event) =>
                          setFormValues((currentValues) => ({
                            ...currentValues,
                            lastName: event.target.value,
                          }))
                        }
                        placeholder="Фамилия"
                        className="h-11 rounded-2xl border-2 border-vibe/25 bg-paper px-4 text-sm text-ink focus-visible:border-vibe sm:h-12 sm:text-base"
                      />
                    </div>

                    <div>
                      <Input
                        id="workshop-signup-telegram"
                        value={formValues.telegramUsername}
                        onChange={(event) =>
                          setFormValues((currentValues) => ({
                            ...currentValues,
                            telegramUsername: normalizeTelegramUsername(event.target.value),
                          }))
                        }
                        placeholder="@telegram"
                        className="h-11 rounded-2xl border-2 border-vibe/25 bg-paper px-4 text-sm text-ink focus-visible:border-vibe sm:h-12 sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] border-2 border-ink/10 bg-white p-3.5 sm:rounded-[24px] sm:p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55 sm:text-[11px] sm:tracking-[0.16em]">
                    Вы выбрали
                  </div>
                  <div className="mt-2.5 space-y-2.5 sm:mt-3 sm:space-y-3">
                    {workshopSlots.map((slot) => {
                      const selectedItem = slot.items.find((item) => item.id === formValues.selections[slot.id])

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSignupStep(workshopSlots.findIndex((item) => item.id === slot.id) as SignupStep)}
                          className="w-full rounded-2xl border-2 border-vibe/45 bg-vibe/5 px-3 py-2.5 text-left transition-colors hover:border-vibe hover:bg-vibe/10 sm:px-4 sm:py-3"
                        >
                          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-vibe sm:text-[11px] sm:tracking-[0.16em]">
                            {slot.slot}
                          </div>
                          <div className="mt-1 text-xs text-ink sm:text-sm">
                            {selectedItem ? selectedItem.title : 'Не выбрано'}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {!isSuccessStep && submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}

            <div className="flex flex-col gap-2 pt-1 sm:pt-2">
              {signupStep > 0 && !isSuccessStep ? (
                signupStep === 3 ? (
                  <>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 rounded-full bg-ink px-5 text-xs uppercase tracking-[0.1em] text-paper hover:bg-ink/90 sm:h-12 sm:px-6 sm:text-sm sm:tracking-[0.12em]"
                    >
                      {isSubmitting ? 'Сохраняем...' : 'Записаться'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSignupStep((signupStep - 1) as SignupStep)}
                      className="h-11 rounded-full border-2 border-ink px-5 text-xs uppercase tracking-[0.1em] text-ink sm:h-12 sm:px-6 sm:text-sm sm:tracking-[0.12em]"
                    >
                      Назад
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSignupStep((signupStep - 1) as SignupStep)}
                    className="h-11 rounded-full border-2 border-ink px-5 text-xs uppercase tracking-[0.1em] text-ink sm:h-12 sm:px-6 sm:text-sm sm:tracking-[0.12em]"
                  >
                    Назад
                  </Button>
                )
              ) : null}
              {isSuccessStep ? (
                <Button
                  type="button"
                  onClick={closeSignupDialog}
                  className="h-11 rounded-full bg-ink px-5 text-xs uppercase tracking-[0.1em] text-paper hover:bg-ink/90 sm:h-12 sm:px-6 sm:text-sm sm:tracking-[0.12em]"
                >
                  Готово
                </Button>
              ) : null}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[18px] border border-paper/12 bg-paper/6 px-3 py-4 sm:rounded-[24px] sm:px-5 sm:py-5">
      <div className="font-display text-3xl leading-none text-paper sm:text-4xl">{value}</div>
      <div className="mt-2 font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-paper/60 sm:text-xs sm:tracking-widest">
        {label}
      </div>
    </div>
  )
}

function WorkshopCard({
  item,
}: {
  item: WorkshopItem
}) {
  const initials = getInitials(item.speaker)

  return (
    <article className="overflow-hidden rounded-[24px] border-[3px] border-ink bg-[#BBEE54] text-left shadow-[0_8px_24px_rgba(16,15,14,0.06)]">
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink text-base font-semibold text-paper sm:h-14 sm:w-14 sm:rounded-2xl sm:text-lg">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-base font-semibold leading-tight text-ink sm:text-lg">
              {item.speaker}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
              Спикер
            </div>
          </div>
        </div>

        <h2 className="mt-4 max-w-5xl text-[1.35rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:mt-5 sm:text-[1.65rem]">
          {item.title}
        </h2>

        <p className="mt-3 max-w-5xl text-[15px] font-normal leading-[1.5] text-ink/80 sm:text-base">
          {item.description}
        </p>
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
