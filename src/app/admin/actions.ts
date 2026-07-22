'use server'

import { redirect } from 'next/navigation'
import { clearAdminSession, createAdminSession, validateAdminPassword } from '@/lib/admin-auth'

export async function loginToAdmin(_: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get('password') ?? '').trim()

  if (!password) {
    return { error: 'Введи пароль.' }
  }

  try {
    if (!validateAdminPassword(password)) {
      return { error: 'Неверный пароль.' }
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('ADMIN_PASSWORD is not configured')) {
      return { error: 'Админка ещё не подключена: не настроен ADMIN_PASSWORD.' }
    }

    throw error
  }

  await createAdminSession()
  redirect('/admin')
}

export async function logoutFromAdmin() {
  await clearAdminSession()
  redirect('/admin')
}
