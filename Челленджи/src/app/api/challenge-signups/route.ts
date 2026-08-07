import { NextResponse } from 'next/server'
import { z } from 'zod'
import { normalizeTelegramUsername, upsertChallengeSignup } from '../../../lib/challenge-signups'

export const dynamic = 'force-dynamic'

const challengeSignupSchema = z.object({
  name: z.string().trim().min(2).max(120),
  telegramUsername: z.string().trim().min(2).max(120).regex(/^@?[A-Za-z0-9_]+$/, 'invalid_telegram'),
  willingToBetMoney: z.boolean(),
  hasChallengeIdea: z.boolean(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payload = challengeSignupSchema.parse(body)

    await upsertChallengeSignup({
      name: payload.name,
      telegramUsername: normalizeTelegramUsername(payload.telegramUsername),
      willingToBetMoney: payload.willingToBetMoney,
      hasChallengeIdea: payload.hasChallengeIdea,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Проверь данные формы.' }, { status: 400 })
    }

    console.error('Failed to create challenge signup', error)
    return NextResponse.json(
      { message: 'Не удалось сохранить заявку. Попробуй ещё раз.' },
      { status: 503 }
    )
  }
}
