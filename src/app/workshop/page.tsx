import WorkshopPageClient from './WorkshopPageClient'
import { workshopSlots } from '@/lib/workshops'

type WorkshopPageProps = {
  searchParams?: Promise<{
    slot?: string | string[]
  }>
}

const fallbackSlotId = workshopSlots[0]?.id ?? ''

export default async function WorkshopPage({ searchParams }: WorkshopPageProps) {
  const resolvedSearchParams = await searchParams
  const slotValue = resolvedSearchParams?.slot
  const slotFromQuery = Array.isArray(slotValue) ? slotValue[0] : slotValue
  const initialSlotId =
    slotFromQuery && workshopSlots.some((slot) => slot.id === slotFromQuery)
      ? slotFromQuery
      : fallbackSlotId

  return <WorkshopPageClient initialSlotId={initialSlotId} />
}
