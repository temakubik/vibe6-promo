export type ChallengeSignupInput = {
  name: string
  telegramUsername: string
  willingToBetMoney: boolean
  hasChallengeIdea: boolean
}

export type ChallengeSignupRecord = ChallengeSignupInput & {
  id: string
  createdAt: string
  updatedAt: string
}

const DEFAULT_NOCODB_API_URL = 'https://wo0dshyg.nocodb.com'
const DEFAULT_NOCODB_CHALLENGE_TABLE_ID = 'mzp0pmxpfsc0h7t'

const nocodbConfig = {
  apiUrl: process.env.NOCODB_API_URL?.trim() || DEFAULT_NOCODB_API_URL,
  tableId:
    process.env.NOCODB_CHALLENGE_TABLE_ID?.trim() || DEFAULT_NOCODB_CHALLENGE_TABLE_ID,
}

type ChallengeSignupNocodbRecord = {
  Id: number
  CreatedAt?: string
  UpdatedAt?: string
  Title?: string
  Telegram?: string
  'Willing To Bet Money'?: string | boolean
  'Has Challenge Idea'?: string | boolean
}

export function normalizeChallengeTelegramUsername(value: string) {
  const normalizedValue = value.trim().replace(/\s+/g, '').toLowerCase().replace(/^@+/, '')
  return normalizedValue ? `@${normalizedValue}` : ''
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

function parseChallengeBoolean(value: string | boolean | undefined) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    const normalizedValue = value.trim().toLowerCase()
    return ['true', '1', 'yes', 'y', 'on', 'да'].includes(normalizedValue)
  }

  return false
}

function normalizeChallengeTimestamp(value?: string) {
  if (!value) {
    return ''
  }

  const parsedDate = new Date(value)
  return Number.isNaN(parsedDate.getTime()) ? value : parsedDate.toISOString()
}

function mapChallengeSignupRecord(record: ChallengeSignupNocodbRecord): ChallengeSignupRecord {
  return {
    id: String(record.Id),
    name: record.Title?.trim() || 'Без имени',
    telegramUsername: normalizeChallengeTelegramUsername(record.Telegram ?? '') || '—',
    willingToBetMoney: parseChallengeBoolean(record['Willing To Bet Money']),
    hasChallengeIdea: parseChallengeBoolean(record['Has Challenge Idea']),
    createdAt: normalizeChallengeTimestamp(record.CreatedAt),
    updatedAt: normalizeChallengeTimestamp(record.UpdatedAt),
  }
}

async function listChallengeSignupRecords() {
  const params = new URLSearchParams({
    limit: '200',
  })
  const url = `${nocodbConfig.apiUrl}/api/v2/tables/${nocodbConfig.tableId}/records?${params.toString()}`
  const payload = await fetchNocodbJson<{
    list?: ChallengeSignupNocodbRecord[]
  }>(url)

  return payload.list ?? []
}

async function findChallengeSignupRecordByTelegram(telegramUsername: string) {
  const normalizedTelegramUsername = normalizeChallengeTelegramUsername(telegramUsername)
  const records = await listChallengeSignupRecords()

  return records.find(
    (record) => normalizeChallengeTelegramUsername(record.Telegram ?? '') === normalizedTelegramUsername
  )
}

export async function listChallengeSignups() {
  const records = await listChallengeSignupRecords()

  return records.map(mapChallengeSignupRecord)
}

export async function upsertChallengeSignup(input: ChallengeSignupInput) {
  const url = `${nocodbConfig.apiUrl}/api/v2/tables/${nocodbConfig.tableId}/records`
  const normalizedTelegramUsername = normalizeChallengeTelegramUsername(input.telegramUsername)
  const existingRecord = await findChallengeSignupRecordByTelegram(normalizedTelegramUsername)
  const payload = {
    Title: input.name.trim(),
    Telegram: normalizedTelegramUsername,
    'Willing To Bet Money': input.willingToBetMoney ? 'true' : 'false',
    'Has Challenge Idea': input.hasChallengeIdea ? 'true' : 'false',
  }

  if (existingRecord) {
    await fetchNocodbJson(url, {
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
  } else {
    await fetchNocodbJson(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }

  const savedRecord = await findChallengeSignupRecordByTelegram(normalizedTelegramUsername)

  if (!savedRecord) {
    throw new Error('Saved challenge signup record was not found')
  }

  return mapChallengeSignupRecord(savedRecord)
}
