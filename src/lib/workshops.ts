export type WorkshopItem = {
  id: string
  speaker: string
  title: string
}

export type WorkshopSlot = {
  id: string
  slot: string
  day: string
  date: string
  time: string
  items: WorkshopItem[]
}

type WorkshopScheduleKey = `${string}__${string}`

export const workshopSlots: WorkshopSlot[] = [
  {
    id: 'slot-a',
    slot: 'Слот A',
    day: 'Пятница',
    date: '31 июля',
    time: '19:30 - 21:00',
    items: [
      {
        id: 'slot-a-agent-anatomy',
        speaker: 'Вячеслав Макушин',
        title: '«Анатомия» агента: инструкции, скиллы, MCP — без кода',
      },
      {
        id: 'slot-a-ai-tools',
        speaker: 'Станислав Климов',
        title: 'Создание специализированных рабочих инструментов с помощью AI',
      },
      {
        id: 'slot-a-driver-budgeting',
        speaker: 'Чехломин Сергей',
        title: 'Бюджетирование на основе драйверов',
      },
    ],
  },
  {
    id: 'slot-b',
    slot: 'Слот B',
    day: 'Суббота',
    date: '1 августа',
    time: '10:30 - 12:00',
    items: [
      {
        id: 'slot-b-self-check-loop',
        speaker: 'Мирон Шибанов',
        title: 'Петля, а не промпт: ИИ, который сам себя проверяет',
      },
      {
        id: 'slot-b-open-data',
        speaker: 'Тыртов Александр',
        title: 'Хакни реальность: как забирать открытые данные без API',
      },
      {
        id: 'slot-b-external-brain',
        speaker: 'Серёжа Попов',
        title: '«Внешний мозг: строим окружение и память для работы с ИИ»',
      },
    ],
  },
  {
    id: 'slot-c',
    slot: 'Слот C',
    day: 'Суббота',
    date: '1 августа',
    time: '14:00 - 15:30',
    items: [
      {
        id: 'slot-c-500-chats',
        speaker: 'Серёжа Попов',
        title: '«Прожевать 500 чатов: ИИ-анализ переписок, звонков и документов»',
      },
      {
        id: 'slot-c-agi-platform',
        speaker: 'Никита Помящий',
        title: 'Клод Клодыч и другие: свой агент на АГИ-платформе',
      },
      {
        id: 'slot-c-datalens',
        speaker: 'Павел Смирнов',
        title: 'Из таблицы в решение: процессные и бизнес-метрики в DataLens с помощью ИИ',
      },
    ],
  },
]

export const workshopSlotById = new Map(workshopSlots.map((slot) => [slot.id, slot]))

export const workshopSlotByScheduleKey = new Map<WorkshopScheduleKey, WorkshopSlot>(
  workshopSlots.map((slot) => [`${slot.date}__${slot.time}`, slot])
)

export const workshopItemById = new Map(
  workshopSlots.flatMap((slot) => slot.items.map((item) => [item.id, { ...item, slotId: slot.id }]))
)

export function getWorkshopSlotBySchedule(date: string, time: string) {
  return workshopSlotByScheduleKey.get(`${date}__${time}`)
}
