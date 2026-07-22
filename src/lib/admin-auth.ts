import { cookies } from 'next/headers'

const ADMIN_AUTH_COOKIE = 'vibe_admin_session'
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD?.trim()

  if (!password) {
    throw new Error('ADMIN_PASSWORD is not configured')
  }

  return password
}

export function validateAdminPassword(password: string) {
  return password === getAdminPassword()
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const sessionValue = cookieStore.get(ADMIN_AUTH_COOKIE)?.value

  return sessionValue === getAdminPassword()
}

export async function createAdminSession() {
  const cookieStore = await cookies()

  cookieStore.set(ADMIN_AUTH_COOKIE, getAdminPassword(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ONE_WEEK_IN_SECONDS,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_AUTH_COOKIE)
}
