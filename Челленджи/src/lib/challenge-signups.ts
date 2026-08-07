import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

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

const storageDirectory = path.join(process.cwd(), 'data')
const storageFilePath = path.join(storageDirectory, 'challenge-signups.json')

export function normalizeTelegramUsername(value: string) {
  const normalizedValue = value.trim().replace(/\s+/g, '').toLowerCase().replace(/^@+/, '')
  return normalizedValue ? `@${normalizedValue}` : ''
}

async function ensureStorageFile() {
  await mkdir(storageDirectory, { recursive: true })

  try {
    await readFile(storageFilePath, 'utf8')
  } catch {
    await writeFile(storageFilePath, '[]', 'utf8')
  }
}

export async function listChallengeSignups() {
  await ensureStorageFile()

  const rawValue = await readFile(storageFilePath, 'utf8')
  try {
    const parsed = JSON.parse(rawValue) as ChallengeSignupRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function upsertChallengeSignup(input: ChallengeSignupInput) {
  const signups = await listChallengeSignups()
  const normalizedTelegramUsername = normalizeTelegramUsername(input.telegramUsername)
  const timestamp = new Date().toISOString()
  const existingIndex = signups.findIndex(
    (signup) => normalizeTelegramUsername(signup.telegramUsername) === normalizedTelegramUsername
  )

  const nextRecord: ChallengeSignupRecord = {
    id: existingIndex >= 0 ? signups[existingIndex].id : crypto.randomUUID(),
    createdAt: existingIndex >= 0 ? signups[existingIndex].createdAt : timestamp,
    updatedAt: timestamp,
    name: input.name.trim(),
    telegramUsername: normalizedTelegramUsername,
    willingToBetMoney: input.willingToBetMoney,
    hasChallengeIdea: input.hasChallengeIdea,
  }

  if (existingIndex >= 0) {
    signups[existingIndex] = nextRecord
  } else {
    signups.push(nextRecord)
  }

  await writeFile(storageFilePath, JSON.stringify(signups, null, 2), 'utf8')

  return nextRecord
}
