import { NextResponse } from 'next/server'
import { z } from 'zod'
import { workshopSlots } from '@/lib/workshops'
import {
  getWorkshopSignupCounts,
  normalizeTelegramUsername,
  upsertWorkshopSignup,
} from '@/lib/workshop-signups'

export const dynamic = 'force-dynamic'

const workshopSignupSchema = z.object({
  fullName: z.string().trim().min(3).max(120),
  telegramUsername: z.string().trim().min(2).max(120).regex(/^@?[A-Za-z0-9_]+$/, 'invalid_telegram'),
  selections: z.record(z.string(), z.string()),
})

const allWorkshopIds = workshopSlots.flatMap((slot) => slot.items.map((item) => item.id))
const emptyCounts = Object.fromEntries(allWorkshopIds.map((workshopId) => [workshopId, 0]))
const validSlotIds = new Set(workshopSlots.map((slot) => slot.id))
const workshopIdsBySlot = new Map(
  workshopSlots.map((slot) => [slot.id, new Set(slot.items.map((item) => item.id))])
)

export async function GET() {
  try {
    const counts = await getWorkshopSignupCounts(allWorkshopIds)
    return NextResponse.json({ counts })
  } catch (error) {
    console.error('Failed to load workshop signup counts', error)
    return NextResponse.json({ counts: emptyCounts, fallback: true })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payload = workshopSignupSchema.parse(body)
    const normalizedTelegramUsername = normalizeTelegramUsername(payload.telegramUsername)

    if (workshopSlots.some((slot) => !payload.selections[slot.id])) {
      return NextResponse.json(
        { message: 'Выбери по одному воркшопу в каждом слоте.' },
        { status: 400 }
      )
    }

    const hasInvalidSelection = Object.entries(payload.selections).some(([slotId, workshopId]) => {
      if (!validSlotIds.has(slotId)) {
        return true
      }

      return !workshopIdsBySlot.get(slotId)?.has(workshopId)
    })

    if (hasInvalidSelection) {
      return NextResponse.json({ message: 'Выбран некорректный воркшоп.' }, { status: 400 })
    }

    await upsertWorkshopSignup({
      fullName: payload.fullName,
      telegramUsername: normalizedTelegramUsername,
      selections: payload.selections,
    })
    const counts = await getWorkshopSignupCounts(allWorkshopIds)

    return NextResponse.json({ ok: true, counts })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Проверь данные формы.' }, { status: 400 })
    }

    if (error instanceof Error && error.message.includes('NOCODB_TOKEN is not configured')) {
      return NextResponse.json(
        { message: 'Форма записи ещё не подключена: не настроен доступ к NocoDB.' },
        { status: 503 }
      )
    }

    console.error('Failed to create workshop signup', error)
    return NextResponse.json(
      { message: 'Не удалось сохранить запись. Попробуй ещё раз.' },
      { status: 503 }
    )
  }
}
