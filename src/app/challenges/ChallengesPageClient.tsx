'use client'

import { FormEvent, useState } from 'react'

type FormValues = {
  name: string
  telegramUsername: string
  willingToBetMoney: boolean
  hasChallengeIdea: boolean
}

const defaultFormValues: FormValues = {
  name: '',
  telegramUsername: '',
  willingToBetMoney: false,
  hasChallengeIdea: false,
}

function normalizeTelegramUsername(value: string) {
  const normalizedValue = value.trim().replace(/\s+/g, '').toLowerCase().replace(/^@+/, '')
  return normalizedValue ? `@${normalizedValue}` : ''
}

export default function ChallengesPageClient() {
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = formValues.name.trim()
    const telegramUsername = normalizeTelegramUsername(formValues.telegramUsername)

    if (name.length < 2 || telegramUsername.length < 2) {
      setSubmitError('Заполни имя и Telegram.')
      return
    }

    if (!/^@[A-Za-z0-9_]+$/.test(telegramUsername)) {
      setSubmitError('Укажи корректный Telegram.')
      return
    }

    try {
      setIsSubmitting(true)
      setSubmitError(null)

      const response = await fetch('/api/challenge-signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          telegramUsername,
          willingToBetMoney: formValues.willingToBetMoney,
          hasChallengeIdea: formValues.hasChallengeIdea,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.message || 'Не удалось сохранить заявку.')
      }

      setIsSuccess(true)
      setFormValues(defaultFormValues)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не удалось сохранить заявку.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-paper pt-16 text-ink">
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 bg-pixel-grid opacity-100 pointer-events-none" />
        <div
          className="absolute -top-24 right-0 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #7B36FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #95CE17 0%, transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-[920px] px-4 pb-16 pt-20 sm:px-6 lg:pb-24">
          <div className="max-w-[760px]">
            <div className="inline-flex rounded-full bg-lime px-4 py-2 font-display text-sm text-ink">
              /challenge
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
              Челленджи
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/75 sm:text-lg">
              Отдельный 30-дневный формат для тех, кто хочет выбрать себе личный челлендж,
              держать темп вместе с другими участниками и регулярно отчитываться в общей группе.
            </p>
          </div>

          <div className="mt-12 rounded-[28px] border border-paper/12 bg-paper/8 px-5 py-5 backdrop-blur sm:px-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
              Ритм формата
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] border border-paper/10 bg-ink/20 px-4 py-4">
                <div className="font-display text-3xl text-paper">30</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-paper/60">
                  дней фокуса
                </div>
              </div>
              <div className="rounded-[22px] border border-paper/10 bg-ink/20 px-4 py-4">
                <div className="font-display text-3xl text-paper">1</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-paper/60">
                  группа поддержки
                </div>
              </div>
              <div className="rounded-[22px] border border-paper/10 bg-ink/20 px-4 py-4">
                <div className="font-display text-3xl text-paper">∞</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-paper/60">
                  повторяемый ритм
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-[920px] space-y-8 px-4 sm:px-6">
          <article className="rounded-[30px] border border-ink/8 bg-white px-5 py-6 shadow-[0_10px_32px_rgba(16,15,14,0.04)] sm:px-6">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-vibe">
              Как это работает
            </div>
            <div className="mt-5 space-y-4">
              {[
                'Каждый участник выбирает себе один челлендж.',
                'Продолжительность фиксированная: 30 дней подряд.',
                'Все участники находятся в одной общей группе.',
                'Внутри челленджа важны регулярные отчёты о прогрессе.',
              ].map((item, index) => (
                <div
                  key={item}
                  className="grid gap-3 border-t border-ink/8 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[72px_minmax(0,1fr)] sm:items-start"
                >
                  <div className="font-display text-3xl leading-none text-vibe">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <p className="text-base leading-relaxed text-ink/78 sm:text-lg">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[30px] border border-ink/8 bg-white px-5 py-6 shadow-[0_10px_32px_rgba(16,15,14,0.04)] sm:px-6">
            <div
              className="absolute right-0 top-0 h-32 w-32 rounded-full opacity-10 blur-3xl"
              style={{ background: 'radial-gradient(circle, #79EDFF 0%, transparent 70%)' }}
            />
            <div className="relative">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-ink/45">
                Условия
              </div>
              <div className="mt-5 max-w-[760px] space-y-5 text-base leading-relaxed text-ink/72 sm:text-lg">
                <p>
                  Идея проста: выбрать понятный для себя челлендж и держать его
                  <strong className="font-semibold text-ink"> без пауз все 30 дней</strong>.
                </p>
                <p>
                  Отчётность нужна не для контроля, а чтобы поддерживать ритм, видеть движение и не
                  выпадать из процесса, когда первоначальный заряд уже прошёл.
                </p>
                <p>
                  Дополнительно можно ввести
                  <strong className="font-semibold text-ink"> финансовую ставку на участие</strong>{' '}
                  как личный уровень ответственности. Сейчас мы собираем готовность к такому
                  формату, а финальные правила можно утвердить уже внутри группы.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[22px] border border-ink/8 bg-paper px-4 py-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
                    Фокус
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-ink/75 sm:text-base">
                    Один челлендж, одна понятная цель, один цикл на 30 дней.
                  </div>
                </div>
                <div className="rounded-[22px] border border-ink/8 bg-paper px-4 py-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
                    Ритм
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-ink/75 sm:text-base">
                    Регулярные короткие отчёты вместо редких больших обещаний.
                  </div>
                </div>
                <div className="rounded-[22px] border border-ink/8 bg-paper px-4 py-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
                    Поддержка
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-ink/75 sm:text-base">
                    Общая группа помогает не терять темп и видеть, что ты не один.
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[30px] border-[4px] border-ink bg-white px-5 py-6 shadow-[0_18px_50px_rgba(16,15,14,0.08)] sm:px-6">
            <div className="max-w-[620px]">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-vibe">
                Регистрация
              </div>
              <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.03em] sm:text-5xl">
                Войти в челлендж
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65 sm:text-base">
                Заполни форму, чтобы попасть в общий список участников. Если идея ещё не выбрана,
                можно зайти сейчас, а сам челлендж сформулировать позже.
              </p>
            </div>

            {isSuccess ? (
              <div className="mt-6 rounded-[26px] border border-lime/30 bg-paper px-5 py-6">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-lime">
                  Готово
                </div>
                <div className="mt-3 font-display text-3xl leading-[0.94] sm:text-4xl">
                  Заявка сохранена
                </div>
                <p className="mt-3 max-w-[520px] text-sm leading-relaxed text-ink/72 sm:text-base">
                  Ты в списке. Мы записали имя, Telegram и отметки по формату участия.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm uppercase tracking-[0.1em] text-paper"
                >
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      value={formValues.name}
                      onChange={(event) =>
                        setFormValues((currentValues) => ({
                          ...currentValues,
                          name: event.target.value,
                        }))
                      }
                      placeholder="Имя"
                      className="h-12 w-full rounded-[18px] border border-ink/10 bg-paper px-4 text-base outline-none transition-colors focus:border-vibe"
                    />
                  </div>

                  <div>
                    <input
                      value={formValues.telegramUsername}
                      onChange={(event) =>
                        setFormValues((currentValues) => ({
                          ...currentValues,
                          telegramUsername: normalizeTelegramUsername(event.target.value),
                        }))
                      }
                      placeholder="@telegram"
                      className="h-12 w-full rounded-[18px] border border-ink/10 bg-paper px-4 text-base outline-none transition-colors focus:border-vibe"
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <label className="flex items-start gap-3 rounded-[20px] border border-ink/8 bg-paper px-4 py-4">
                    <input
                      type="checkbox"
                      checked={formValues.willingToBetMoney}
                      onChange={(event) =>
                        setFormValues((currentValues) => ({
                          ...currentValues,
                          willingToBetMoney: event.target.checked,
                        }))
                      }
                      className="mt-1 h-4 w-4 accent-vibe"
                    />
                    <span className="text-sm leading-relaxed text-ink/75 sm:text-base">
                      Готов поставить деньги как дополнительную мотивацию.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 rounded-[20px] border border-ink/8 bg-paper px-4 py-4">
                    <input
                      type="checkbox"
                      checked={formValues.hasChallengeIdea}
                      onChange={(event) =>
                        setFormValues((currentValues) => ({
                          ...currentValues,
                          hasChallengeIdea: event.target.checked,
                        }))
                      }
                      className="mt-1 h-4 w-4 accent-vibe"
                    />
                    <span className="text-sm leading-relaxed text-ink/75 sm:text-base">
                      У меня уже есть идея челленджа. Если нет, я ещё подумаю.
                    </span>
                  </label>
                </div>

                {submitError ? <p className="text-sm text-[#D91A60]">{submitError}</p> : null}

                <div className="flex flex-col gap-3 border-t border-ink/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[420px] text-sm leading-relaxed text-ink/55">
                    Регистрация короткая: сейчас фиксируем участие, а детали челленджа можно
                    докрутить уже внутри общей группы.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-vibe px-6 text-sm uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#6926e8] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? 'Сохраняем...' : 'Зарегистрироваться'}
                  </button>
                </div>
              </form>
            )}
          </article>
        </div>
      </section>
    </main>
  )
}
