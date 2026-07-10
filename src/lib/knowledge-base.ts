export const knowledgeBase = {
  title: 'База знаний Vibe-6',
  dates: '31 июля - 2 августа',
  location: 'Les Art Resort',
  heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=photorealistic%20luxury%20forest%20resort%20hotel%20exterior%20at%20blue%20hour%2C%20warm%20architectural%20lighting%2C%20modern%20wooden%20buildings%2C%20green%20lawn%2C%20high-end%20hospitality%20photography%2C%20cinematic%2C%20ultra-detailed%2C%20realistic&image_size=landscape_16_9',
  sections: {
    packing: {
      title: 'Что взять с собой',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=photorealistic%20travel%20essentials%20neatly%20arranged%20on%20a%20light%20linen%20bed%2C%20passport%2C%20swimwear%2C%20casual%20clothes%2C%20toiletries%2C%20summer%20weekend%20packing%2C%20editorial%20lifestyle%20photography%2C%20soft%20natural%20light%2C%20realistic&image_size=landscape_16_9',
      items: [
        'Паспорт — без него не получится заселиться в номер.',
        'Личные вещи и лекарства.',
        'Репелент — локация рядом с лесом.',
        'Купальник или плавки и вещи для бани — на площадке есть SPA, бани и открытый бассейн.',
        'Спортивную форму и футбольную обувь, если планируешь играть в футбол.',
        'Хорошее настроение.',
      ],
    },
    principles: {
      title: 'Принципы',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=photorealistic%20creative%20team%20discussion%20in%20a%20stylish%20retreat%20space%2C%20people%20collaborating%20around%20a%20table%2C%20warm%20light%2C%20thoughtful%20atmosphere%2C%20modern%20offsite%20workshop%2C%20editorial%20photography%2C%20realistic&image_size=landscape_16_9',
      items: [
        {
          title: 'Будь собой. Но про личные границы не забывай.',
          text: 'Настоящесть — это суперсила. А уважение к другим делает компанию ещё лучше.',
        },
        {
          title: 'Участвуй во всём.',
          text: 'Попробуй всё, даже если сначала кажется: «Это не про меня». Самые яркие моменты обычно начинаются именно так.',
        },
        {
          title: 'Будь открыт новому.',
          text: 'Новым людям, идеям, разговорам и впечатлениям. Никогда не знаешь, где тебя ждёт лучший момент этих выходных.',
        },
        {
          title: 'Позаботься о себе.',
          text: 'Мы позаботились о программе, дороге, проживании, еде и атмосфере. Всё остальное — в твоих руках.',
        },
      ],
    },
    dressCode: {
      title: 'Dress-код: «Музыкальный джем»',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=photorealistic%20fashionable%20summer%20resort%20outfits%20in%20olive%2C%20pistachio%2C%20cream%20and%20beige%2C%20mediterranean%20evening%20garden%20party%2C%20linen%20and%20flowing%20fabrics%2C%20elegant%20lifestyle%20editorial%2C%20realistic&image_size=landscape_16_9',
      intro: [
        'Палитра: оливка, фисташка, хаки и все оттенки сливочного — молочный, кремовый, песочный, лён и айвори.',
        'Общий вайб — средиземноморский джем где-то между Тосканой и виноградником.',
      ],
      items: [
        'Цвета: зелёный в разных оттенках + белый, кремовый или бежевый.',
        'Ткани: лён, хлопок, шёлк, вискоза. Всё лёгкое, струящееся и дышащее.',
        'Девушкам: сарафаны, платья макси, юбки, топы с кружевом, костюмы с широкими брюками.',
        'Парням: льняная рубашка, свободные брюки, лёгкий костюм.',
        'Обувь: сандалии, лоферы, эспадрильи, кеды.',
        'Аксессуары: соломенные сумки и шляпы, очки, платки, украшения.',
        'Можно прийти в кимоно или халате, если это попадает в настроение.',
      ],
      avoid:
        'Нежелательны неоновые цвета, строгие офисные костюмы и футболки с логотипами компаний.',
      outro:
        'Если сомневаешься, собирай образ по вайбу, а не по формальности.',
    },
    flight: {
      title: 'Если рейс задержался',
      contact: '@daniilkasyanov',
      intro:
        'Если рейс задерживается или план меняется, сразу напиши Дане. Он поможет сориентироваться по дальнейшим действиям.',
      vnk: [
        'Из Внуково вызывай Яндекс Такси прямо до Les Art Resort.',
        'Компания возмещает до 2 000 ₽ за поездку.',
        'Если рядом коллеги, лучше объединиться.',
      ],
      svoDme: [
        'Из Шереметьево или Домодедово доезжай Аэроэкспрессом до Москвы.',
        'Дальше вызывай Яндекс Такси до Les Art Resort.',
        'Аэроэкспресс возмещается полностью.',
        'Такси возмещается до 2 000 ₽.',
        'Сумму сверх лимита оплачиваешь самостоятельно.',
      ],
      reimbursements: [
        'Сохрани чеки на Аэроэкспресс.',
        'Сохрани чеки за такси.',
        'Сохрани документы или уведомления о задержке рейса, если они есть.',
        'Прикладывай всё к файлу на возмещение расходов с пометкой «Задержка рейса».',
      ],
    },
  },
} as const

export const guideSections = [
  {
    slug: 'schedule',
    title: 'Расписание',
    description: 'Программа по дням: от онбординга и мастер-классов до рефлексии и выезда.',
    tag: '/schedule',
    accent: 'vibe',
  },
  {
    slug: 'places',
    title: 'Проживание',
    description: 'Два места проживания: Москва перед выездом и Les Art Resort на площадке.',
    tag: '/places',
    accent: 'paper',
  },
  {
    slug: 'weather',
    title: 'Погода',
    description: 'Живой прогноз на ближайшие 7 дней для Москвы и Les Art Resort.',
    tag: '/weather',
    accent: 'cyan',
  },
  {
    slug: 'moscow-accommodation',
    title: 'Соседи',
    description: 'Кто с кем живёт: поиск по имени и состав номеров.',
    tag: '/moscow',
    accent: 'lime',
  },
  {
    slug: 'packing',
    title: 'Что взять с собой',
    description: 'Короткий список самого важного: документы, вещи, лекарства, репелент и баня.',
    tag: '/packing',
    accent: 'lime',
  },
  {
    slug: 'principles',
    title: 'Принципы',
    description: 'Как прожить Vibe-6: уважать границы, быть открытым и участвовать во всём.',
    tag: '/principles',
    accent: 'paper',
  },
  {
    slug: 'dress-code',
    title: 'Dress-code',
    description: 'Музыкальный джем в оливке, фисташке и сливочных оттенках.',
    tag: '/dress_code',
    accent: 'pink',
  },
  {
    slug: 'flight-delay',
    title: 'Если рейс задержался',
    description: 'Готовая инструкция по трансферу, компенсациям и тому, что сохранить.',
    tag: '/flight_delay',
    accent: 'cyan',
  },
] as const

export type GuideSectionSlug = (typeof guideSections)[number]['slug']

export const scheduleDays = [
  {
    id: 'day-1',
    label: 'День 1',
    title: 'Пятница',
    date: '31 июля',
    accent: 'vibe',
    items: [
      { time: '12:30 - 13:00', title: 'Онбординг' },
      { time: '13:00 - 15:00', title: 'Обед' },
      { time: '15:00 - 17:00', title: 'Онбординг с Черняковым' },
      { time: '17:00 - 18:30', title: 'Отдых' },
      { time: '18:30 - 19:30', title: 'Ужин' },
      { time: '19:30 - 21:30', title: 'Мастер-классы' },
      { time: '21:30 - 00:00', title: 'Вечерняя программа' },
    ],
  },
  {
    id: 'day-2',
    label: 'День 2',
    title: 'Суббота',
    date: '1 августа',
    accent: 'lime',
    items: [
      { time: '09:00 - 10:00', title: 'Завтрак' },
      { time: '10:30 - 12:00', title: 'Мастер-классы' },
      { time: '12:00 - 13:00', title: 'Отдых' },
      { time: '14:00 - 15:30', title: 'Мастер-классы' },
      { time: '16:00 - 17:00', title: 'Демо' },
      { time: '17:00 - 18:30', title: 'Отдых' },
      { time: '18:30 - 20:00', title: 'Ужин' },
      { time: '20:00 - 22:00', title: 'JAM / Вечерина' },
    ],
  },
  {
    id: 'day-3',
    label: 'День 3',
    title: 'Воскресенье',
    date: '2 августа',
    accent: 'cyan',
    items: [
      { time: '08:00 - 11:00', title: 'Завтрак' },
      { time: '11:00 - 13:00', title: 'Рефлексия' },
      { time: '13:00 - 13:30', title: 'Обед' },
      { time: '14:00', title: 'Выезд из отеля' },
    ],
  },
] as const

export const accommodationPlaces = [
  {
    id: 'moscow-hotel',
    period: '30 июля',
    title: 'Sheraton Palace Moscow Hotel',
    address: 'Москва, 1-я Тверская-Ямская улица, 19',
    website: 'https://palacemoscow.ru/',
    description:
      'Городской отель в центре Москвы. На официальном сайте его описывают как комфортный отель для бизнес-поездок и отдыха.',
    notes: [
      'Завтрак включён.',
      'Заселение с 14:00.',
      'Если приехали раньше, багаж можно оставить на хранение.',
    ],
  },
  {
    id: 'les-art-resort',
    period: '31 июля - 2 августа',
    title: 'Les Art Resort',
    address: 'Московская область, Рузский муниципальный округ, территория База отдыха Прометей, 1',
    website: 'https://lesresort.ru/',
    description:
      'Загородный resort в лесной зоне Подмосковья: номера, SPA, бассейны, рестораны и бары. Это основная площадка мероприятия.',
    notes: [
      'Основное место проведения Vibe-6.',
      'Примерно в часе езды от Москвы.',
    ],
  },
] as const

export const weatherLocations = [
  {
    id: 'moscow',
    title: 'Москва',
    subtitle: 'Sheraton Palace Moscow Hotel',
    latitude: 55.7756,
    longitude: 37.5868,
  },
  {
    id: 'les-art-resort',
    title: 'Les Art Resort',
    subtitle: 'Основная площадка мероприятия',
    latitude: 55.534062,
    longitude: 36.374645,
  },
] as const
