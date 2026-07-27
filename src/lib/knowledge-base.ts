export const knowledgeBase = {
  title: 'База знаний Vibe-6',
  dates: '31 июля - 2 августа',
  location: 'Les Art Resort',
  heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=photorealistic%20luxury%20forest%20resort%20hotel%20exterior%20at%20blue%20hour%2C%20warm%20architectural%20lighting%2C%20modern%20wooden%20buildings%2C%20green%20lawn%2C%20high-end%20hospitality%20photography%2C%20cinematic%2C%20ultra-detailed%2C%20realistic&image_size=landscape_16_9',
  sections: {
    packing: {
      title: 'Что взять с собой',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=photorealistic%20travel%20essentials%20neatly%20arranged%20on%20a%20light%20linen%20bed%2C%20passport%2C%20swimwear%2C%20casual%20clothes%2C%20toiletries%2C%20summer%20weekend%20packing%2C%20editorial%20lifestyle%20photography%2C%20soft%20natural%20light%2C%20realistic&image_size=landscape_16_9',
      note: 'Ноутбук обязателен: он понадобится для участия в воркшопах.',
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
    slug: 'resort-map',
    title: 'Лес-резорт',
    description: 'Карта территории Les Art Resort и поиск корпусов, площадок и сервисов.',
    tag: '/resort_map',
    accent: 'lime',
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
    tag: '/neighbors',
    accent: 'lime',
  },
  {
    slug: 'transport',
    title: 'Транспорт',
    description: 'Поиск по имени: автобус, самостоятельно, машина, такси и пометки по направлениям.',
    tag: '/transport',
    accent: 'cyan',
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

export const resortMapPlaces = [
  {
    markers: 'A',
    title: 'Корпуса «CASA»',
    searchTerms: 'каса жильё жилые корпуса',
    description:
      'Пять жилых корпусов в правой части карты, рядом со зданием «OPERA». Номера корпусов отмечены отдельно.',
  },
  {
    markers: 'B',
    title: 'Виллы',
    searchTerms: 'вилла жильё дома',
    description:
      'Десять вилл в центральной части территории, западнее здания «OPERA». На карте виллы пронумерованы от 1 до 10.',
  },
  {
    markers: 'C',
    title: 'Таунхаусы «FAMILIA»',
    searchTerms: 'фамилия таунхаус жильё дома',
    description:
      'Десять таунхаусов в верхней левой части карты. Номера домов отмечены от 1 до 10.',
  },
  {
    markers: 'D',
    title: 'Здание «OPERA»',
    searchTerms: 'опера здание',
    description:
      'Большое здание в центральной правой части карты, между корпусами «CASA» и виллами.',
  },
  {
    markers: 'E',
    title: 'Здание «ACADEMIA»',
    searchTerms: 'академия здание',
    description:
      'Большое здание в левой части территории, рядом со спортивными площадками и комплексом «AQUARIUM».',
  },
  {
    markers: 'F',
    title: 'Горка для катания «MONTI»',
    searchTerms: 'монти горка катание',
    description:
      'Горка в верхней левой части карты, ниже пункта проката «DEPO» и рядом с детской площадкой «NEMO».',
  },
  {
    markers: 'G',
    title: 'Павильон «BELVEDER»',
    searchTerms: 'бельведер павильон',
    description:
      'Павильон в нижней левой части центральной зоны, рядом с Аллеей Звезд.',
  },
  {
    markers: 'H',
    title: 'Пункт проката «DEPO»',
    searchTerms: 'депо прокат аренда',
    description:
      'Пункт проката в верхней левой части карты, рядом с таунхаусами «FAMILIA» и горкой «MONTI».',
  },
  {
    markers: 'I, J',
    title: 'Спортивные площадки',
    searchTerms: 'спорт площадка',
    description:
      'Спортивные площадки находятся в левой части территории, рядом со зданием «ACADEMIA» и парковкой R.',
  },
  {
    markers: 'K',
    title: 'Комплекс «AQUARIUM»',
    searchTerms: 'аквариум комплекс временно закрыт не работает',
    description:
      'Комплекс рядом со зданием «ACADEMIA» и комплексом «LAGUNA». По информации на карте временно не работает.',
  },
  {
    markers: 'L',
    title: 'Комплекс «LAGUNA»',
    searchTerms: 'лагуна комплекс',
    description:
      'Комплекс в левой центральной части территории, рядом с «AQUARIUM».',
  },
  {
    markers: 'M',
    title: 'ЭКО-огород',
    searchTerms: 'эко огород сад',
    description:
      'ЭКО-огород находится в нижней центральной части карты, рядом с мини-гольфом.',
  },
  {
    markers: 'N',
    title: 'Мини-гольф',
    searchTerms: 'мини гольф игра',
    description:
      'Площадка мини-гольфа в нижней центральной части территории, рядом с ЭКО-огородом и парковкой T.',
  },
  {
    markers: 'O',
    title: 'Детская площадка «NEMO»',
    searchTerms: 'немо дети детская площадка',
    description:
      'Детская площадка в верхней левой части карты, между таунхаусами «FAMILIA» и горкой «MONTI».',
  },
  {
    markers: 'P',
    title: 'Фонтан «SIMONA»',
    searchTerms: 'симона фонтан',
    description:
      'Фонтан в левой центральной части территории, между спортивными площадками и комплексом «AQUARIUM».',
  },
  {
    markers: 'Q',
    title: 'Часовня',
    searchTerms: 'часовня церковь',
    description:
      'Часовня в центральной части карты, севернее вилл и западнее здания «OPERA».',
  },
  {
    markers: 'R, S, T',
    title: 'Парковка',
    searchTerms: 'парковка стоянка машина автомобиль авто въезд',
    description:
      'Парковки отмечены в трёх частях территории: R — слева, S — у нижнего левого въезда, T — у нижнего правого въезда.',
  },
  {
    markers: 'U',
    title: 'Аллея Звезд',
    searchTerms: 'аллея звёзд прогулка',
    description:
      'Аллея Звезд находится в центральной части территории, между павильоном «BELVEDER» и виллами.',
  },
] as const

export const scheduleDays = [
  {
    id: 'day-1',
    label: 'День 1',
    title: 'Пятница',
    date: '31 июля',
    accent: 'vibe',
    items: [
      { time: '12:00', title: 'Заезд группы (78 чел.)' },
      { time: '12:00 - 13:00', title: 'Онбординг', place: 'Конференц-зал «Турандот»' },
      { time: '13:00 - 15:00', title: 'Обед', place: 'Ресторан Podium' },
      {
        time: '15:00 - 17:00',
        title: 'Онбординг с Черняковым',
        place: 'Конференц-зал «Турандот»',
      },
      { time: '17:00 - 18:30', title: 'Отдых / заселение в номера' },
      { time: '18:30 - 19:30', title: 'Ужин', place: 'Ресторан Podium' },
      { time: '19:30 - 21:00', title: 'Воркшопы', place: '«Турандот», «Травиата», «Богема»' },
      {
        time: '21:00 - 23:00',
        title: 'Вечерние мероприятия',
        place: 'Футбольная площадка, Спа-центр, зал боулинг/бильярд',
      },
    ],
  },
  {
    id: 'day-2',
    label: 'День 2',
    title: 'Суббота',
    date: '1 августа',
    accent: 'lime',
    items: [
      { time: '09:00 - 10:00', title: 'Завтрак', place: 'Ресторан Podium' },
      { time: '10:30 - 12:00', title: 'Воркшопы', place: '«Турандот», «Травиата», «Богема»' },
      { time: '12:00 - 13:00', title: 'Свободное время' },
      { time: '14:00 - 15:30', title: 'Воркшопы', place: '«Турандот», «Травиата», «Богема»' },
      {
        time: '16:00 - 17:00',
        title: 'Демо',
        place: '«Богема»',
        seating: 'Стулья без столов, лицом к экрану',
      },
      { time: '17:00 - 18:30', title: 'Свободное время' },
      { time: '18:30 - 19:30', title: 'Ужин', place: 'Ресторан Podium' },
      { time: '19:30 - 23:00', title: 'JAM / Вечеринка', place: '«Бельведер»', seating: 'Фуршет' },
    ],
  },
  {
    id: 'day-3',
    label: 'День 3',
    title: 'Воскресенье',
    date: '2 августа',
    accent: 'cyan',
    items: [
      { time: '08:00 - 10:30', title: 'Завтрак', place: 'Ресторан Podium' },
      { time: '10:30 - 12:00', title: 'Рефлексия', place: 'Конференц-зал «Турандот»' },
      { time: '12:00 - 13:00', title: 'Выселение из гостиницы' },
      { time: '13:00 - 13:30', title: 'Обед', place: 'Ресторан Podium' },
      { time: '13:30 - 14:00', title: 'Погрузка в автобус' },
      { time: '14:00', title: 'Отправление в Москву' },
    ],
  },
] as const

export const scheduleNotes = [
  'Заселение в отель начнётся после 17:00 31.07. До этого багаж можно сдать на ресепшн.',
  'Для футбольного поля и боулинг/бильярд организаторы обеспечат доступ через контактное лицо отеля.',
  'На вечеринке в «Бельведер» рассадка фуршетная.',
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
