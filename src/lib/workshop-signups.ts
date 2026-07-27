import { workshopSlots } from '@/lib/workshops'

const DEFAULT_NOCODB_API_URL = 'https://wo0dshyg.nocodb.com'
const DEFAULT_NOCODB_BASE_ID = 'pvz9cd9rg6xfe2m'
const DEFAULT_NOCODB_TABLE_ID = 'myxakedeny1a4ll'
const DEFAULT_NOCODB_VIEW_ID = 'vwo5jpv2mf0boiel'

const nocodbConfig = {
  apiUrl: process.env.NOCODB_API_URL?.trim() || DEFAULT_NOCODB_API_URL,
  baseId: process.env.NOCODB_BASE_ID?.trim() || DEFAULT_NOCODB_BASE_ID,
  tableId: process.env.NOCODB_TABLE_ID?.trim() || DEFAULT_NOCODB_TABLE_ID,
  viewId: process.env.NOCODB_VIEW_ID?.trim() || DEFAULT_NOCODB_VIEW_ID,
}

export type WorkshopSelections = Record<string, string>

export type UpsertWorkshopSignupInput = {
  fullName: string
  telegramUsername: string
  selections: WorkshopSelections
}

export type WorkshopRegistrationEntry = {
  fullName: string
  telegramUsername: string
  slotId: string
}

type WorkshopSignupRecord = {
  Id: number
  Title?: string
  Telegram?: string
  'Workshop ID'?: string
  'Workshop Title'?: string
  'Slot ID'?: string
}

function getNocodbToken() {
  const token = process.env.NOCODB_TOKEN?.trim()

  if (!token) {
    throw new Error('NOCODB_TOKEN is not configured')
  }

  return token
}

async function fetchNocodbJson<T>(url: string, init?: RequestInit): Promise<T> {
  const token = getNocodbToken()
  const response = await fetch(url, {
    ...init,
    cache: 'no-store',
    headers: {
      accept: 'application/json',
      'xc-token': token,
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`NocoDB request failed: ${response.status} ${errorText}`)
  }

  return response.json() as Promise<T>
}

export function normalizeTelegramUsername(value: string) {
  const normalizedValue = value.trim().replace(/\s+/g, '').toLowerCase().replace(/^@+/, '')
  return normalizedValue ? `@${normalizedValue}` : ''
}

function safeJsonParse<T>(value?: string) {
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function serializeSelections(selections: WorkshopSelections) {
  return JSON.stringify(
    Object.fromEntries(Object.entries(selections).filter(([, workshopId]) => workshopId))
  )
}

function buildSelectionTitles(selections: WorkshopSelections) {
  const titleByWorkshopId = new Map(
    workshopSlots.flatMap((slot) => slot.items.map((item) => [item.id, item.title] as const))
  )

  return Object.fromEntries(
    Object.entries(selections)
      .filter(([, workshopId]) => workshopId)
      .map(([slotId, workshopId]) => [slotId, titleByWorkshopId.get(workshopId) ?? ''])
  )
}

function parseSelections(record: WorkshopSignupRecord): WorkshopSelections {
  const rawWorkshopIds = record['Workshop ID']
  const rawSlotIds = record['Slot ID']
  const jsonSelections = safeJsonParse<WorkshopSelections>(rawWorkshopIds)

  if (jsonSelections && typeof jsonSelections === 'object' && !Array.isArray(jsonSelections)) {
    return Object.fromEntries(
      Object.entries(jsonSelections).filter(
        ([slotId, workshopId]) => Boolean(slotId) && typeof workshopId === 'string' && workshopId
      )
    )
  }

  if (rawWorkshopIds && rawSlotIds) {
    return { [rawSlotIds]: rawWorkshopIds }
  }

  return {}
}

function parseCountResponse(payload: unknown) {
  if (typeof payload === 'number') {
    return payload
  }

  if (typeof payload === 'string') {
    return Number(payload) || 0
  }

  if (payload && typeof payload === 'object') {
    if ('count' in payload) {
      return Number(payload.count) || 0
    }

    if ('data' in payload && payload.data && typeof payload.data === 'object' && 'count' in payload.data) {
      return Number(payload.data.count) || 0
    }
  }

  return 0
}

export async function getWorkshopSignupCounts(workshopIds: string[]) {
  const counts = Object.fromEntries(workshopIds.map((workshopId) => [workshopId, 0]))
  const records = await listWorkshopSignupRecords()

  records.forEach((record) => {
    const selections = parseSelections(record)

    Object.values(selections).forEach((workshopId) => {
      if (workshopId in counts) {
        counts[workshopId] += 1
      }
    })
  })

  return counts
}

export async function getWorkshopRegistrationsByWorkshop(workshopIds: string[]) {
  const registrations = Object.fromEntries(
    workshopIds.map((workshopId) => [workshopId, [] as WorkshopRegistrationEntry[]])
  )
  const records = await listWorkshopSignupRecords()

  records.forEach((record) => {
    const fullName = record.Title?.trim() || 'Без имени'
    const telegramUsername = normalizeTelegramUsername(record.Telegram ?? '')
    const selections = parseSelections(record)

    Object.entries(selections).forEach(([slotId, workshopId]) => {
      if (!(workshopId in registrations)) {
        return
      }

      registrations[workshopId].push({
        fullName,
        telegramUsername: telegramUsername || '—',
        slotId,
      })
    })
  })

  Object.values(registrations).forEach((entries) => {
    entries.sort((left, right) => left.fullName.localeCompare(right.fullName, 'ru'))
  })

  return registrations
}

async function listWorkshopSignupRecords(where?: string) {
  const params = new URLSearchParams({
    limit: '200',
  })

  if (where) {
    params.set('where', where)
  }

  const url = `${nocodbConfig.apiUrl}/api/v2/tables/${nocodbConfig.tableId}/records?${params.toString()}`
  const payload = await fetchNocodbJson<{
    list?: WorkshopSignupRecord[]
  }>(url)

  return payload.list ?? []
}

async function findWorkshopSignupRecordByTelegram(telegramUsername: string) {
  const normalizedTelegramUsername = normalizeTelegramUsername(telegramUsername)
  const records = await listWorkshopSignupRecords()

  return records.find(
    (record) => normalizeTelegramUsername(record.Telegram ?? '') === normalizedTelegramUsername
  )
}

export async function upsertWorkshopSignup(input: UpsertWorkshopSignupInput) {
  const url = `${nocodbConfig.apiUrl}/api/v2/tables/${nocodbConfig.tableId}/records`
  const normalizedTelegramUsername = normalizeTelegramUsername(input.telegramUsername)
  const serializedSelections = serializeSelections(input.selections)
  const serializedSelectionTitles = JSON.stringify(buildSelectionTitles(input.selections))
  const serializedSlotIds = JSON.stringify(
    Object.keys(input.selections).filter((slotId) => input.selections[slotId])
  )
  const existingRecord = await findWorkshopSignupRecordByTelegram(normalizedTelegramUsername)

  const payload = {
    Title: input.fullName.trim(),
    Telegram: normalizedTelegramUsername,
    'Workshop ID': serializedSelections,
    'Workshop Title': serializedSelectionTitles,
    'Slot ID': serializedSlotIds,
  }

  if (existingRecord) {
    return fetchNocodbJson(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          Id: existingRecord.Id,
          ...payload,
        },
      ]),
    })
  }

  return fetchNocodbJson(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
