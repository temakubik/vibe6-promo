import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { workshopItemById, workshopSlotById, workshopSlots } from '@/lib/workshops'

type VoteSummary = {
  counts: Record<string, number>
  selections: Record<string, string | null>
}

async function buildVoteSummary(deviceId?: string): Promise<VoteSummary> {
  const votes = await db.workshopVote.findMany({
    select: {
      deviceId: true,
      slotId: true,
      workshopId: true,
    },
  })

  const counts = Object.fromEntries(
    workshopSlots.flatMap((slot) => slot.items.map((item) => [item.id, 0]))
  ) as Record<string, number>

  const selections = Object.fromEntries(
    workshopSlots.map((slot) => [slot.id, null])
  ) as Record<string, string | null>

  for (const vote of votes) {
    if (vote.workshopId in counts) {
      counts[vote.workshopId] += 1
    }

    if (deviceId && vote.deviceId === deviceId && vote.slotId in selections) {
      selections[vote.slotId] = vote.workshopId
    }
  }

  return { counts, selections }
}

export async function GET(request: NextRequest) {
  const deviceId = request.nextUrl.searchParams.get('deviceId')?.trim() || undefined
  const summary = await buildVoteSummary(deviceId)

  return NextResponse.json(summary)
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    deviceId?: string
    slotId?: string
    workshopId?: string | null
  }

  const deviceId = body.deviceId?.trim()
  const slotId = body.slotId?.trim()
  const workshopId = body.workshopId?.trim() || null

  if (!deviceId || !slotId) {
    return NextResponse.json({ error: 'deviceId и slotId обязательны' }, { status: 400 })
  }

  const slot = workshopSlotById.get(slotId)
  if (!slot) {
    return NextResponse.json({ error: 'Неизвестный слот' }, { status: 400 })
  }

  if (workshopId) {
    const workshop = workshopItemById.get(workshopId)
    if (!workshop || workshop.slotId !== slotId) {
      return NextResponse.json({ error: 'Воркшоп не принадлежит выбранному слоту' }, { status: 400 })
    }

    await db.workshopVote.upsert({
      where: {
        deviceId_slotId: {
          deviceId,
          slotId,
        },
      },
      update: {
        workshopId,
      },
      create: {
        deviceId,
        slotId,
        workshopId,
      },
    })
  } else {
    await db.workshopVote.deleteMany({
      where: {
        deviceId,
        slotId,
      },
    })
  }

  const summary = await buildVoteSummary(deviceId)
  return NextResponse.json(summary)
}
