'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Luggage,
  Plane,
  Shirt,
  Snowflake,
  Sparkles,
  Sun,
} from 'lucide-react'
import { TagChip } from '@/components/site/Decor'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  accommodationPlaces,
  guideSections,
  knowledgeBase,
  scheduleDays,
  scheduleNotes,
  type GuideSectionSlug,
  weatherLocations,
} from '@/lib/knowledge-base'
import { forestAccommodationEntries } from '@/lib/forest-accommodation'
import { moscowAccommodationNoStay, moscowAccommodationRooms } from '@/lib/moscow-accommodation'
import { getWorkshopSlotBySchedule } from '@/lib/workshops'

const KNOWLEDGE_COVER =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=photorealistic%20creative%20knowledge%20workspace%2C%20open%20notebook%2C%20sticky%20notes%2C%20laptop%20with%20clean%20interface%2C%20soft%20ambient%20light%2C%20editorial%20desk%20photography%2C%20premium%2C%20minimal%2C%20realistic&image_size=landscape_16_9'

const normalizeSearch = (value: string) =>
  value
    .toLowerCase()
    .replaceAll('ё', 'е')
    .replace(/\s+/g, ' ')
    .trim()

const getMapLinks = (query: string) => ({
  yandex: `https://yandex.ru/maps/?text=${encodeURIComponent(query)}`,
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
})

type WeatherForecastResponse = {
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_max: number[]
  }
}

type WeatherDay = {
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
  precipitationProbability: number
}

const weatherCodeMeta = (code: number) => {
  if (code === 0) {
    return { label: 'Солнечно', Icon: Sun }
  }

  if ([1, 2].includes(code)) {
    return { label: 'Малооблачно', Icon: CloudSun }
  }

  if (code === 3) {
    return { label: 'Облачно', Icon: Cloud }
  }

  if ([45, 48].includes(code)) {
    return { label: 'Туман', Icon: CloudFog }
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return { label: 'Морось', Icon: CloudDrizzle }
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { label: 'Дождь', Icon: CloudRain }
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { label: 'Снег', Icon: Snowflake }
  }

  if ([95, 96, 99].includes(code)) {
    return { label: 'Гроза', Icon: CloudLightning }
  }

  return { label: 'Переменная погода', Icon: Cloud }
}

const formatWeatherDate = (date: string) =>
  new Date(`${date}T12:00:00+03:00`).toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

const getForecastSummary = (day: WeatherDay) => {
  if (day.precipitationProbability >= 70) return 'Высокая вероятность дождя'
  if (day.precipitationProbability >= 40) return 'Возможны осадки'
  if (day.temperatureMax >= 28) return 'Будет жарко'
  if (day.temperatureMax <= 18) return 'Будет прохладно'
  return 'Комфортная погода'
}

type AccommodationPlace = 'moscow' | 'les-art-resort'

const accommodationPlaceMeta: Record<
  AccommodationPlace,
  { label: string; variant: 'lime' | 'pink' }
> = {
  moscow: {
    label: 'Москва',
    variant: 'lime',
  },
  'les-art-resort': {
    label: 'Les Art Resort',
    variant: 'pink',
  },
}

type AccommodationPresence = {
  place: AccommodationPlace
  roommates: string[]
  stay?: string
  isStaying: boolean
}

type AccommodationPersonResult = {
  person: string
  normalized: string
  presences: AccommodationPresence[]
}

const accommodationPlaceOrder: Record<AccommodationPlace, number> = {
  moscow: 0,
  'les-art-resort': 1,
}

const knownAccommodationPeople = Array.from(
  new Set([
    ...moscowAccommodationRooms.flatMap((room) => room.members),
    ...moscowAccommodationNoStay,
    ...forestAccommodationEntries.map((entry) => entry.person),
  ])
)

const resolveKnownAccommodationPerson = (name: string) => {
  const normalized = normalizeSearch(name)
  const exactMatch = knownAccommodationPeople.find((person) => normalizeSearch(person) === normalized)
  if (exactMatch) return exactMatch

  const partialMatches = knownAccommodationPeople.filter((person) => {
    const candidate = normalizeSearch(person)
    return candidate.startsWith(`${normalized} `) || normalized.startsWith(`${candidate} `)
  })

  if (partialMatches.length === 1) {
    return partialMatches[0]
  }

  return name
}

const accommodationLookup = (() => {
  const byPerson = new Map<string, AccommodationPersonResult>()

  const ensurePerson = (personName: string) => {
    const person = resolveKnownAccommodationPerson(personName)
    const normalized = normalizeSearch(person)
    const existing = byPerson.get(normalized)

    if (existing) {
      return existing
    }

    const created: AccommodationPersonResult = {
      person,
      normalized,
      presences: [],
    }

    byPerson.set(normalized, created)
    return created
  }

  const upsertPresence = (personName: string, presence: AccommodationPresence) => {
    const person = ensurePerson(personName)
    const roommates = Array.from(
      new Set(
        presence.roommates
          .map(resolveKnownAccommodationPerson)
          .filter((roommate) => normalizeSearch(roommate) !== person.normalized)
      )
    )

    const existingPresence = person.presences.find((item) => item.place === presence.place)
    if (!existingPresence) {
      person.presences.push({
        ...presence,
        roommates,
      })
      return
    }

    existingPresence.roommates = Array.from(new Set([...existingPresence.roommates, ...roommates]))
    existingPresence.stay = existingPresence.stay ?? presence.stay
    existingPresence.isStaying = existingPresence.isStaying || presence.isStaying
  }

  for (const room of moscowAccommodationRooms) {
    const members = room.members.map(resolveKnownAccommodationPerson)

    if (members.length < 2) {
      for (const person of members) {
        upsertPresence(person, {
          place: 'moscow',
          roommates: [],
          isStaying: false,
        })
      }

      continue
    }

    for (const person of members) {
      upsertPresence(person, {
        place: 'moscow',
        roommates: members.filter((member) => member !== person),
        isStaying: true,
      })
    }
  }

  for (const name of moscowAccommodationNoStay) {
    upsertPresence(name, {
      place: 'moscow',
      roommates: [],
      isStaying: false,
    })
  }

  for (const entry of forestAccommodationEntries) {
    upsertPresence(entry.person, {
      place: 'les-art-resort',
      roommates: entry.roommates,
      stay: entry.stay,
      isStaying: true,
    })
  }

  return Array.from(byPerson.values())
    .map((person) => ({
      ...person,
      presences: person.presences.sort(
        (a, b) => accommodationPlaceOrder[a.place] - accommodationPlaceOrder[b.place]
      ),
    }))
    .sort((a, b) => a.person.localeCompare(b.person, 'ru'))
})()

export function GuideShell({
  currentSlug,
}: {
  currentSlug?: GuideSectionSlug
}) {
  const initialSlug = currentSlug ?? guideSections[0].slug
  const [activeSlug, setActiveSlug] = useState<GuideSectionSlug>(initialSlug)

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
          <div className="lg:hidden">
            <div className="pb-2">
              <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
                Раздел базы знаний
              </div>
              <Select value={activeSlug} onValueChange={(value) => setActiveSlug(value as GuideSectionSlug)}>
                <SelectTrigger className="mt-3 h-12 w-full rounded-none border-x-0 border-t-0 border-b border-ink/10 bg-transparent px-0 font-display text-base text-ink shadow-none">
                  <SelectValue placeholder="Выбери раздел" />
                </SelectTrigger>
                <SelectContent>
                  {guideSections.map((section) => (
                    <SelectItem key={section.slug} value={section.slug}>
                      {section.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:mt-0 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
            <aside className="hidden lg:block lg:sticky lg:top-24">
              <div className="bg-paper px-5 py-4">
                <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
                  Разделы базы знаний
                </div>
                <div className="mt-4 border-t border-ink/10">
                  {guideSections.map((section) => (
                    <button
                      key={section.slug}
                      type="button"
                      onClick={() => setActiveSlug(section.slug)}
                      className={`w-full border-b border-ink/10 px-0 py-3 text-left font-display text-[1.35rem] leading-tight transition-colors ${
                        section.slug === activeSlug
                          ? 'text-ink'
                          : 'text-ink/35 hover:text-ink/70'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              <GuideSectionContent slug={activeSlug} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function GuideSectionContent({ slug }: { slug: GuideSectionSlug }) {
  switch (slug) {
    case 'schedule':
      return <ScheduleSection />
    case 'places':
      return <PlacesSection />
    case 'weather':
      return <WeatherSection />
    case 'moscow-accommodation':
      return <MoscowAccommodationSection />
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

function WeatherSection() {
  const [activeLocationId, setActiveLocationId] = useState(weatherLocations[0].id)
  const [state, setState] = useState<{
    loading: boolean
    error: boolean
    data: Record<string, WeatherDay[]>
  }>({
    loading: true,
    error: false,
    data: {},
  })

  useEffect(() => {
    let cancelled = false

    const loadWeather = async () => {
      try {
        const results = await Promise.all(
          weatherLocations.map(async (location) => {
            const url =
              `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}` +
              `&longitude=${location.longitude}` +
              '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
              '&forecast_days=7&timezone=Europe%2FMoscow'

            const response = await fetch(url)
            if (!response.ok) throw new Error('weather_request_failed')

            const json = (await response.json()) as WeatherForecastResponse
            const days = json.daily.time.map((date, index) => ({
              date,
              weatherCode: json.daily.weather_code[index],
              temperatureMax: Math.round(json.daily.temperature_2m_max[index]),
              temperatureMin: Math.round(json.daily.temperature_2m_min[index]),
              precipitationProbability: json.daily.precipitation_probability_max[index],
            }))

            return [location.id, days] as const
          })
        )

        if (cancelled) return

        setState({
          loading: false,
          error: false,
          data: Object.fromEntries(results),
        })
      } catch {
        if (cancelled) return
        setState({ loading: false, error: true, data: {} })
      }
    }

    loadWeather()

    return () => {
      cancelled = true
    }
  }, [])

  const activeLocation = weatherLocations.find((location) => location.id === activeLocationId) ?? weatherLocations[0]
  const activeForecast = state.data[activeLocation.id] ?? []

  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-[1040px] px-3 sm:px-4 lg:px-6">
        <div className="mb-8">
          <TagChip variant="cyan">/weather</TagChip>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
            Погода
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Живой прогноз на ближайшие 7 дней, чтобы быстро понять: будет жарко, дождливо
            или комфортно.
          </p>
        </div>

        {state.loading ? (
          <div className="space-y-6 text-ink/60">
            <div className="border-b border-ink/10 py-6">Загружаем прогноз для Москвы…</div>
            <div className="border-b border-ink/10 py-6">Загружаем прогноз для Les Art Resort…</div>
          </div>
        ) : state.error ? (
          <div className="border-b border-ink/10 py-6 text-ink/65">
            Не получилось загрузить прогноз. Попробуйте обновить страницу чуть позже.
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-4">
              {weatherLocations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => setActiveLocationId(location.id)}
                  className={`px-4 py-2 font-display text-lg transition-colors ${
                    location.id === activeLocation.id ? 'text-ink' : 'text-ink/35 hover:text-ink/70'
                  }`}
                >
                  {location.title}
                </button>
              ))}
            </div>

            <article className="pt-8">
              <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
                Ближайшие 7 дней
              </div>
              <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                {activeLocation.title}
              </h3>
              <p className="mt-2 text-base text-ink/65">{activeLocation.subtitle}</p>
              <a
                href={`https://open-meteo.com/en/docs?latitude=${activeLocation.latitude}&longitude=${activeLocation.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm text-ink/65"
              >
                Источник прогноза: Open-Meteo
                <ArrowUpRight size={14} />
              </a>

              <div className="mt-6 space-y-3">
                {activeForecast.map((day) => {
                  const meta = weatherCodeMeta(day.weatherCode)
                  const summary = getForecastSummary(day)

                  return (
                    <div
                      key={`${activeLocation.id}-${day.date}`}
                      className="grid gap-3 border-b border-ink/8 py-4 sm:grid-cols-[140px_minmax(0,1fr)_110px]"
                    >
                      <div className="font-mono text-xs uppercase tracking-wide text-ink/50 sm:pt-1">
                        {formatWeatherDate(day.date)}
                      </div>

                      <div className="flex items-start gap-3">
                        <meta.Icon size={20} className="mt-0.5 shrink-0 text-cyan" />
                        <div>
                          <div className="text-base font-semibold text-ink">{meta.label}</div>
                          <div className="mt-1 text-sm text-ink/65">{summary}</div>
                          <div className="mt-1 text-sm text-ink/55">
                            Осадки: {day.precipitationProbability}%
                          </div>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="font-display text-2xl text-ink">{day.temperatureMax}°</div>
                        <div className="text-sm text-ink/55">ночью {day.temperatureMin}°</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  )
}

function PlacesSection() {
  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-[1040px] px-3 sm:px-4 lg:px-6">
        <div className="mb-8">
          <TagChip variant="paper">/places</TagChip>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
            Проживание
          </h2>
        </div>

        <div className="space-y-10">
          {accommodationPlaces.map((place) => {
            const maps = getMapLinks(place.address)

            return (
              <article key={place.id} className="border-b border-ink/10 pb-10 last:border-b-0 last:pb-0">
                <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
                  {place.period}
                </div>
                <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                  {place.title}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/70 sm:text-lg">
                  {place.description}
                </p>

                <div className="mt-6 space-y-4">
                  <div className="border-b border-ink/8 pb-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
                      Адрес
                    </div>
                    <div className="mt-2 text-base text-ink">{place.address}</div>
                  </div>

                  <div className="border-b border-ink/8 pb-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
                      Сайт
                    </div>
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-base text-ink underline underline-offset-4"
                    >
                      Перейти на сайт
                      <ArrowUpRight size={16} />
                    </a>
                  </div>

                  <div className="border-b border-ink/8 pb-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
                      Важно
                    </div>
                    <ul className="mt-3 space-y-3">
                      {place.notes.map((note) => (
                        <li key={note} className="flex items-start gap-3 text-sm text-ink/75 sm:text-base">
                          <Check size={16} className="mt-1 shrink-0 text-lime" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={maps.yandex}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-display text-lg text-ink"
                  >
                    Яндекс Карты
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={maps.google}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-display text-lg text-ink"
                  >
                    Google Maps
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function MoscowAccommodationSection() {
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    const q = normalizeSearch(query)
    if (!q) return []

    return accommodationLookup.filter((person) => person.normalized.includes(q))
  }, [query])

  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-[1040px] px-3 sm:px-4 lg:px-6">
        <div className="mb-8">
          <div>
            <TagChip variant="lime">/neighbors</TagChip>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
              Соседи
            </h2>
          </div>
        </div>

        <div className="bg-transparent">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
              /search
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Например: Иванов или Артём"
              className="h-12 w-full border-0 border-b border-ink/10 bg-transparent px-0 font-sans text-base text-ink outline-none placeholder:text-ink/35 focus:border-vibe"
            />
          </div>

          {!normalizeSearch(query) ? (
            <div className="mt-6 text-sm text-ink/65">
              Поиск работает по подстроке: можно вводить имя, фамилию или часть.
            </div>
          ) : null}

          {matches.length ? (
            <div className="mt-6 space-y-3">
              {matches.map((row) => (
                <div key={row.normalized} className="border-b border-ink/8 py-4">
                  <div className="font-display text-xl text-ink">{row.person}</div>
                  <div className="mt-3 space-y-3">
                    {row.presences.map((presence) => (
                      <div key={`${row.normalized}-${presence.place}`} className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <TagChip variant={accommodationPlaceMeta[presence.place].variant}>
                            {accommodationPlaceMeta[presence.place].label}
                          </TagChip>
                          {presence.stay ? (
                            <div className="font-mono text-xs uppercase tracking-widest text-red-500">
                              {presence.stay}
                            </div>
                          ) : null}
                        </div>
                        <div className="text-sm text-ink/70">
                          {presence.isStaying
                            ? presence.roommates.length
                              ? `Соседи: ${presence.roommates.join(', ')}`
                              : 'Соседи не указаны'
                            : 'Не живет в гостинице'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : normalizeSearch(query) ? (
            <div className="mt-6 text-sm text-ink/65">
              Ничего не найдено.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function ScheduleSection() {
  const [activeDayId, setActiveDayId] = useState(scheduleDays[0].id)
  const activeDay = scheduleDays.find((day) => day.id === activeDayId) ?? scheduleDays[0]

  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-[1040px] px-3 sm:px-4 lg:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

        <div className="-mx-4 overflow-x-auto border-b border-ink/10 px-4 pb-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-2">
            {scheduleDays.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => setActiveDayId(day.id)}
                className={`whitespace-nowrap px-4 py-2 font-display text-lg transition-colors ${
                  day.id === activeDay.id ? 'text-ink' : 'text-ink/35 hover:text-ink/70'
                }`}
              >
                {day.title}
              </button>
            ))}
          </div>
        </div>

        <article className="pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className={`tag-chip ${accentTag(activeDay.accent)}`}>{activeDay.label}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-ink/45">
              {activeDay.date}
            </span>
          </div>
          <h3 className="mt-4 font-display text-3xl">{activeDay.title}</h3>
          <ul className="mt-6 space-y-3">
            {activeDay.items.map((item) => {
              const workshopSlot = item.title === 'Воркшопы'
                ? getWorkshopSlotBySchedule(activeDay.date, item.time)
                : undefined

              return (
                <li
                  key={`${activeDay.id}-${item.time}-${item.title}`}
                  className="border-b border-ink/8 px-0 py-4"
                >
                  <div className="font-mono text-xs uppercase tracking-wide text-ink/50">
                    {item.time}
                  </div>
                  <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                    <div className="min-w-0 text-base font-semibold text-ink">{item.title}</div>
                    {item.place ? (
                      <div className="md:max-w-[42%] md:text-right">
                        <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
                          Место
                        </div>
                        <div className="mt-1 text-sm text-ink/70">{item.place}</div>
                      </div>
                    ) : null}
                  </div>
                  {item.seating ? (
                    <div className="mt-3 text-sm text-ink/70">
                      <span className="font-mono text-xs uppercase tracking-widest text-ink/45">
                        Рассадка
                      </span>
                      <div className="mt-1">{item.seating}</div>
                    </div>
                  ) : null}
                  {workshopSlot ? (
                    <ScheduleWorkshopPreview slot={workshopSlot} />
                  ) : null}
                </li>
              )
            })}
          </ul>

          <div className="mt-10 bg-ink/5 px-4 py-4 text-sm text-ink sm:px-5 sm:text-base">
            <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
              Примечания
            </div>
            <ul className="mt-3 space-y-3">
              {scheduleNotes.map((note) => (
                <li key={note} className="flex items-start gap-3 text-ink/75">
                  <Check size={16} className="mt-1 shrink-0 text-lime" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}

function ScheduleWorkshopPreview({
  slot,
}: {
  slot: ReturnType<typeof getWorkshopSlotBySchedule>
}) {
  if (!slot) return null

  return (
    <div className="mt-4 rounded-[24px] border border-vibe/12 bg-vibe/5 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <TagChip variant="vibe">{slot.slot}</TagChip>
          <div className="font-mono text-xs uppercase tracking-widest text-ink/45">
            {slot.day} · {slot.time}
          </div>
        </div>
        <Link
          href={`/workshop?slot=${slot.id}`}
          className="inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-sm text-ink/70 transition-colors hover:text-ink"
        >
          Все детали и отметка
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {slot.items.map((workshop) => (
          <Link
            key={workshop.id}
            href={`/workshop?slot=${slot.id}`}
            className="rounded-[20px] border border-ink/8 bg-white px-4 py-4 transition-colors hover:border-vibe/25 hover:bg-paper"
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-vibe">
              {workshop.speaker}
            </div>
            <div className="mt-2 text-sm leading-relaxed text-ink/82 sm:text-base">
              {workshop.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function PackingSection() {
  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-[1040px] px-3 sm:px-4 lg:px-6">
        <div>
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
            className="mt-8 h-[280px] w-full object-cover"
          />
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="bg-lime/12 px-4 py-4 text-sm text-ink sm:px-5 sm:text-base">
              <div className="font-display text-lg text-ink">Важно</div>
              <p className="mt-2 max-w-2xl text-ink/80">
                {knowledgeBase.sections.packing.note}
              </p>
            </div>
          </div>
          {knowledgeBase.sections.packing.items.map((item) => (
            <div
              key={item}
              className="border-b border-ink/8 py-4 text-sm leading-relaxed text-ink/80 sm:text-base"
            >
              <div className="flex items-start gap-3">
                <Luggage size={18} className="mt-0.5 shrink-0 text-vibe" />
                <span>{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PrinciplesSection() {
  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-[1040px] px-3 sm:px-4 lg:px-6">
        <div>
          <TagChip variant="ink">/principles</TagChip>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
            {knowledgeBase.sections.principles.title}
          </h2>
          <img
            src={knowledgeBase.sections.principles.image}
            alt="Принципы Vibe-6"
            className="mt-8 h-[280px] w-full object-cover"
          />
        </div>

        <div className="mt-8 space-y-4">
          {knowledgeBase.sections.principles.items.map((item, index) => (
            <article
              key={item.title}
              className="border-b border-ink/10 py-5 last:border-b-0"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-lime">
                0{index + 1}
              </div>
              <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
              <p className="mt-2 text-ink/75">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DressCodeSection() {
  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-[1040px] px-3 sm:px-4 lg:px-6">
        <div>
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

        <img
          src={knowledgeBase.sections.dressCode.image}
          alt="Dress-code Vibe-6"
          className="mt-8 h-[320px] w-full object-cover object-[center_22%]"
        />

        <div className="mt-6 space-y-1">
          {knowledgeBase.sections.dressCode.items.map((item) => (
            <div key={item} className="border-b border-ink/8 py-4">
              <div className="flex items-start gap-3">
                <Shirt size={18} className="mt-0.5 shrink-0 text-pink" />
                <span className="text-sm leading-relaxed text-ink/80 sm:text-base">{item}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-pink/8 px-5 py-5">
          <div className="flex items-start gap-3">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-pink" />
            <div>
              <p className="text-sm font-semibold text-ink sm:text-base">Лучше не выбирать</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/80 sm:text-base">
                {knowledgeBase.sections.dressCode.avoid}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
                {knowledgeBase.sections.dressCode.outro}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FlightDelaySection() {
  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-[1040px] px-3 sm:px-4 lg:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <TagChip variant="cyan">/flight_delay</TagChip>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">
              {knowledgeBase.sections.flight.title}
            </h2>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-ink/60">
            контакт: {knowledgeBase.sections.flight.contact}
          </div>
        </div>

        <div className="space-y-8">
          <article className="px-0 py-2">
            <Plane size={22} className="text-vibe" />
            <h3 className="mt-4 font-display text-2xl">Сначала напиши Дане</h3>
            <p className="mt-3 text-ink/70">{knowledgeBase.sections.flight.intro}</p>
          </article>

          <article className="px-0 py-2">
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

          <article className="px-0 py-2">
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

        <div className="mt-8 border-t border-ink/10 pt-8">
          <h3 className="font-display text-3xl">Что сохранить для компенсации</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {knowledgeBase.sections.flight.reimbursements.map((item) => (
              <div key={item} className="border-b border-ink/8 py-4 text-ink/80">
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
