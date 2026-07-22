'use client'

import { useActionState } from 'react'
import { LockKeyhole } from 'lucide-react'
import { loginToAdmin } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const initialState = {
  error: '',
}

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginToAdmin, initialState)

  return (
    <div className="w-full max-w-[440px] rounded-[32px] border-[4px] border-ink bg-white p-6 shadow-[0_18px_50px_rgba(16,15,14,0.08)] sm:p-7">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-vibe text-white">
        <LockKeyhole size={24} />
      </div>

      <div className="mt-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-vibe">
          Вход
        </div>
        <h1 className="mt-3 font-display text-4xl leading-[0.92] text-ink sm:text-5xl">
          Админка воркшопов
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/62 sm:text-base">
          Показывает, кто на какой воркшоп записался. Вход защищён одним паролем.
        </p>
      </div>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="admin-password"
            className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55"
          >
            Пароль
          </label>
          <Input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Введи пароль"
            className="h-12 rounded-2xl border-2 border-ink/10 bg-paper px-4 text-base text-ink focus-visible:border-vibe"
          />
        </div>

        {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-full bg-ink px-6 text-sm uppercase tracking-[0.12em] text-paper hover:bg-ink/90"
        >
          {isPending ? 'Проверяем...' : 'Войти'}
        </Button>
      </form>
    </div>
  )
}
