(function () {
  'use strict';

  var doc = document;
  var originalText = new WeakMap();
  var originalAttr = new WeakMap();
  var langNames = { en: 'EN', ru: 'RU', uz: 'UZ' };

  var ru = {
    'Home': 'Главная',
    'Rooms & Suites': 'Номера и люксы',
    'Dining': 'Завтрак',
    'Gallery': 'Галерея',
    'About': 'О нас',
    'Contact': 'Контакты',
    'Book a stay': 'Забронировать',
    'Book your stay': 'Забронировать',
    'Explore rooms': 'Посмотреть номера',
    'Nukus, Karakalpakstan': 'Нукус, Каракалпакстан',
    'Quiet luxury,': 'Спокойная роскошь,',
    'warmly kept.': 'с теплым приемом.',
    'IDEAL Hotel is a calm retreat of oak-warmed rooms, generous breakfasts and unhurried service — a considered base for work or rest.': 'IDEAL Hotel — спокойное место с теплыми интерьерами, сытными завтраками и внимательным сервисом для работы и отдыха.',
    'Check-in': 'Заезд',
    'Check-out': 'Выезд',
    'Guests': 'Гости',
    '1 guest': '1 гость',
    '2 guests': '2 гостя',
    '3 guests': '3 гостя',
    '4 guests': '4 гостя',
    'Check availability': 'Проверить наличие',
    'Welcome to IDEAL': 'Добро пожаловать в IDEAL',
    'A landmark of calm, built around the guest.': 'Тихий ориентир гостеприимства, созданный вокруг гостя.',
    'Behind a classic white façade you\'ll find something quieter and more modern — interiors of warm oak, honed stone and soft light, arranged with restraint. Every room is made for rest; every detail, for ease.': 'За классическим белым фасадом скрываются современные и спокойные интерьеры: теплое дерево, камень и мягкий свет. Каждый номер создан для отдыха, каждая деталь — для удобства.',
    'From a 24-hour welcome at reception to a daily buffet breakfast, free private parking and a central Nukus address near the Savitsky Museum, IDEAL Hotel is built to make a stay feel effortless.': 'Круглосуточная стойка регистрации, ежедневный завтрак «шведский стол», бесплатная частная парковка и центральное расположение рядом с музеем Савицкого делают пребывание простым и комфортным.',
    'Our story': 'Наша история',
    'The house': 'Отель',
    'Four reasons to settle in': 'Четыре причины остановиться',
    'Twin, double or twin, triple and suite layouts — each with air conditioning, private bathroom, city view and free Wi-Fi.': 'Номера twin, double/twin, triple и suite — в каждом кондиционер, отдельная ванная, вид на город и бесплатный Wi-Fi.',
    'View rooms': 'Номера',
    'Breakfast & Dining': 'Завтрак и ресторан',
    'A daily buffet with hot and cold choices, plus an on-site restaurant and minimarket for easy meals.': 'Ежедневный шведский стол с горячими и холодными блюдами, ресторан и мини-маркет на территории.',
    'See dining': 'Подробнее о завтраке',
    'Spaces & Events': 'Пространства',
    'An elegant private room for meetings and gatherings, framed by greenery and warm light.': 'Элегантное пространство для встреч и небольших мероприятий в теплой атмосфере.',
    'Enquire': 'Спросить',
    'Location': 'Расположение',
    'At ул. А. Досназарова, 100А in Nukus, close to the Savitsky Museum, local bazaar and about 1.5 km from Nukus Airport.': 'Адрес: ул. А. Досназарова, 100А, Нукус. Рядом музей Савицкого, базар, до аэропорта около 1,5 км.',
    'Directions': 'Как добраться',
    'Superb rating': 'Оценка гостей',
    'Location score': 'Оценка расположения',
    'Guest reviews': 'Отзывов гостей',
    'To Nukus Airport': 'До аэропорта Нукуса',
    'Where you\'ll stay': 'Где вы остановитесь',
    'Rooms made for rest': 'Номера для отдыха',
    'All rooms & suites': 'Все номера',
    'In every stay': 'В каждом проживании',
    'The comforts, included': 'Комфорт включен',
    'Free Wi-Fi': 'Бесплатный Wi-Fi',
    'Fast, complimentary internet throughout the hotel and in every room.': 'Быстрый бесплатный интернет во всем отеле и в каждом номере.',
    'Breakfast buffet': 'Завтрак шведский стол',
    'A generous spread of hot, cold, sweet and savoury choices served daily.': 'Каждый день подаются горячие, холодные, сладкие и несладкие блюда.',
    'Secure parking': 'Охраняемая парковка',
    'Private on-site parking, free for resident guests.': 'Бесплатная частная парковка на территории для гостей отеля.',
    '24-hour reception': 'Круглосуточная стойка регистрации',
    'A real welcome at any hour, plus concierge and luggage support.': 'Прием гостей в любое время, помощь с багажом и поездками.',
    'Airport shuttle': 'Трансфер из аэропорта',
    'Arrange transport to or from Nukus Airport on request.': 'По запросу организуем трансфер в аэропорт Нукуса или из него.',
    'Air conditioning': 'Кондиционер',
    'Individually controlled climate and blackout drapery in all rooms.': 'Индивидуальный климат-контроль и плотные шторы во всех номерах.',
    'A quieter kind of stay': 'Более спокойное проживание',
    'Reserve your room': 'Забронируйте номер',
    'Your quiet retreat is ready when you are.': 'Ваш тихий отдых ждет вас.',
    'Tell us your dates and we\'ll take care of the rest. No payment now — just a friendly confirmation from our team.': 'Сообщите даты, а мы позаботимся об остальном. Оплата сейчас не требуется — команда подтвердит наличие.',
    'Explore': 'Навигация',
    'Stay': 'Проживание',
    'ул. А. Досназарова, 100А, 230100 Nukus': 'ул. А. Досназарова, 100А, 230100 Нукус',
    'ул. А. Досназарова, 100А, 230100 Nukus, Karakalpakstan': 'ул. А. Досназарова, 100А, 230100 Нукус, Каракалпакстан',
    'Reception open 24 hours': 'Стойка регистрации работает 24 часа',
    'A quiet landmark of warm hospitality in Nukus, Karakalpakstan — considered rooms, generous breakfasts and the kind of calm that makes a stay feel like a retreat.': 'Тихий ориентир теплого гостеприимства в Нукусе, Каракалпакстан: продуманные номера, щедрые завтраки и спокойствие, которое делает поездку похожей на отдых.',
    'IDEAL HOTEL': 'IDEAL HOTEL',
    'Reservation inquiry': 'Запрос на бронирование',
    'Request your stay': 'Запросить проживание',
    'First & last name': 'Имя и фамилия',
    'Your name': 'Ваше имя',
    'Email': 'Эл. почта',
    'Please enter your name': 'Пожалуйста, введите имя',
    'Enter a valid email': 'Введите корректный email',
    'Enter a check-in date (today or later)': 'Укажите дату заезда (сегодня или позже)',
    'Check-out must be after check-in': 'Дата выезда должна быть позже даты заезда',
    'Phone': 'Телефон',
    'Optional': 'Необязательно',
    'Room type': 'Тип номера',
    'No preference': 'Без предпочтений',
    'Twin Room': 'Номер Twin',
    'Standard Suite': 'Стандартный люкс',
    'Triple Room': 'Трехместный номер',
    'Single Room': 'Одноместный номер',
    'Anything we should know?': 'Что нам нужно знать?',
    'Message': 'Сообщение',
    'Arrival time, occasion, requests…': 'Время прибытия, повод, пожелания…',
    'Tell us about your stay…': 'Расскажите о поездке…',
    'Send inquiry': 'Отправить запрос',
    'No payment is taken now — our team replies within a few hours to confirm availability.': 'Оплата сейчас не требуется — команда ответит в течение нескольких часов и подтвердит наличие.',
    'Thank you': 'Спасибо',
    'Your request has reached our reservations desk. We\'ll be in touch shortly to confirm your stay at IDEAL Hotel.': 'Ваш запрос отправлен в отдел бронирования. Мы скоро свяжемся с вами для подтверждения.',
    'Your request has reached our reservations desk. We\'ll reply shortly to confirm your stay.': 'Ваш запрос отправлен в отдел бронирования. Мы скоро ответим для подтверждения.',
    'Close': 'Закрыть',
    'Open menu': 'Открыть меню',
    'Image viewer': 'Просмотр изображения',
    'Previous': 'Назад',
    'Next': 'Вперед',
    'Room': 'Номер',
    'Four room types,': 'Четыре типа номеров,',
    'one quiet standard.': 'один спокойный стандарт.',
    'Every room at IDEAL Hotel includes air conditioning, a private bathroom, flat-screen TV, free Wi-Fi, tea and coffee facilities, city views and terrace access. Breakfast is included, and no prepayment is needed for direct reservation inquiries.': 'В каждом номере IDEAL Hotel есть кондиционер, отдельная ванная, телевизор, бесплатный Wi-Fi, чай и кофе, вид на город и выход на террасу. Завтрак включен, предоплата для прямого запроса не нужна.',
    'Two separate beds, city views and a terrace — a practical, comfortable choice for friends or colleagues.': 'Две отдельные кровати, вид на город и терраса — удобный вариант для друзей или коллег.',
    'A large double bed, warm wood detail and the essentials for an easy central Nukus stay.': 'Большая двуспальная кровать, теплые деревянные детали и все необходимое для удобного пребывания в центре Нукуса.',
    'Three single beds with city views, terrace access and the same included breakfast and Wi-Fi.': 'Три односпальные кровати, вид на город, терраса, включенный завтрак и Wi-Fi.',
    'A private suite with a large double bed, city views, terrace access and a little more privacy.': 'Отдельный люкс с большой двуспальной кроватью, видом на город, террасой и большей приватностью.',
    '20 m²': '20 м²',
    'Two single beds': 'Две односпальные кровати',
    'One large double bed': 'Одна большая двуспальная кровать',
    'Three single beds': 'Три односпальные кровати',
    'Up to 2 guests': 'До 2 гостей',
    'Up to 3 guests': 'До 3 гостей',
    'View room': 'Подробнее',
    'Book': 'Бронь',
    '/ night': '/ ночь',
    'City view': 'Вид на город',
    'Terrace': 'Терраса',
    'Flat-screen TV': 'Телевизор',
    'Ensuite bathroom': 'Собственная ванная',
    'Tea & coffee': 'Чай и кофе',
    'Private suite': 'Отдельный люкс',
    'Bathrobes & slippers': 'Халаты и тапочки',
    'Home  /  Rooms & Suites': 'Главная / Номера и люксы',
    'Keep exploring': 'Другие варианты',
    'Other rooms': 'Другие номера',
    'All rooms': 'Все номера',
    'Ask a question': 'Задать вопрос',
    'per night, incl. breakfast': 'за ночь, завтрак включен',
    'Size': 'Площадь',
    'Beds': 'Кровати',
    'Sleeps': 'Гостей',
    'Outlook': 'Вид',
    'In this room': 'В номере',
    'Calm, kept': 'Спокойствие',
    'with care.': 'и забота.',
    'Who we are': 'Кто мы',
    'A modern house behind a classic façade.': 'Современный отель за классическим фасадом.',
    'IDEAL Hotel was built on a simple belief: that real luxury is quiet. Behind a stately white exterior, we made interiors that feel calm and contemporary — warm oak joinery, honed stone, soft light and space used generously.': 'IDEAL Hotel основан на простой идее: настоящая роскошь спокойна. За белым фасадом — современные интерьеры с теплым деревом, камнем, мягким светом и продуманным пространством.',
    'From a 24-hour welcome to a generous breakfast buffet, everything here is arranged to make a stay feel effortless. Guests regularly mention the central location, spotless rooms, helpful reception team and comfortable beds.': 'Круглосуточный прием, щедрый завтрак и продуманные детали делают проживание легким. Гости часто отмечают центральное расположение, чистоту, отзывчивую команду и удобные кровати.',
    'What guides us': 'Наши принципы',
    'Three quiet commitments': 'Три тихих обещания',
    'Warmth, always': 'Тепло — всегда',
    'A genuine welcome at any hour. We remember names, anticipate needs, and treat every guest as we would a visitor to our own home.': 'Искренний прием в любое время. Мы внимательны к потребностям гостей и относимся к каждому как к гостю в собственном доме.',
    'Quiet over loud': 'Спокойствие важнее шума',
    'Restraint in everything — calm interiors, considered detail, and the kind of service you feel rather than notice.': 'Сдержанность во всем: спокойные интерьеры, продуманные детали и сервис, который ощущается естественно.',
    'Cared-for spaces': 'Ухоженные пространства',
    'Spotless rooms, fresh linen and warm materials, maintained with the attention that makes a place feel truly looked after.': 'Безупречно чистые номера, свежее белье и теплые материалы, за которыми тщательно ухаживают.',
    'Room categories': 'Категории номеров',
    'Guest essentials': 'Важное для гостей',
    'Everything practical, close at hand': 'Все важное — рядом',
    'Central Nukus': 'Центр Нукуса',
    'Set at ул. А. Досназарова, 100А, close to the Savitsky Museum, local bazaar and river area.': 'Адрес ул. А. Досназарова, 100А: рядом музей Савицкого, местный базар и район у реки.',
    'Easy Arrival': 'Легкий приезд',
    'Nukus Airport is about 1.5 km away, with shuttle service available on request.': 'Аэропорт Нукуса примерно в 1,5 км, трансфер доступен по запросу.',
    'Daily Comfort': 'Ежедневный комфорт',
    'Free Wi-Fi, private parking, daily housekeeping, room service and 24-hour reception.': 'Бесплатный Wi-Fi, частная парковка, ежедневная уборка, room service и круглосуточная стойка.',
    'For Families': 'Для семей',
    'Family rooms are available, children are welcome, and rooms are non-smoking.': 'Есть семейные номера, дети принимаются, номера для некурящих.',
    'Breakfast included': 'Завтрак включен',
    'Parking & Wi-Fi': 'Парковка и Wi-Fi',
    'Check-in from': 'Заезд с',
    'Where we are': 'Где мы',
    'Well-placed, easily reached.': 'Удобное расположение и простой приезд.',
    'IDEAL Hotel sits within easy reach of Nukus\'s key connections, with secure on-site parking and an airport shuttle available on request. Whether you\'re here for business, museum visits or a short stay between trips, arrival is simple.': 'IDEAL Hotel удобно расположен в Нукусе, с частной парковкой и трансфером из аэропорта по запросу. Для работы, музеев или короткой остановки — добраться легко.',
    'Directions & contact': 'Маршрут и контакты',
    'A breakfast': 'Завтрак,',
    'worth waking for.': 'ради которого стоит проснуться.',
    'The morning table': 'Утренний стол',
    'Generous, fresh, and made with care.': 'Щедро, свежо и с заботой.',
    'Mornings at IDEAL begin with a buffet of hot and cold dishes, sweet and savoury choices, fresh fruit, salads, breads, tea and coffee.': 'Утро в IDEAL начинается со шведского стола: горячие и холодные блюда, сладкие и несладкие варианты, фрукты, салаты, хлеб, чай и кофе.',
    'Breakfast is included with stays, and guests also have an on-site restaurant for lunch or dinner and a minimarket for everyday convenience.': 'Завтрак включен в проживание. На территории также есть ресторан для обеда или ужина и мини-маркет для повседневных нужд.',
    'On the buffet': 'На шведском столе',
    'A taste of the spread': 'Что подают',
    'Fresh & cold': 'Свежее и холодное',
    'Fruit, salads, greens, olives, yoghurt, cheeses and light cold dishes.': 'Фрукты, салаты, зелень, оливки, йогурт, сыры и легкие холодные блюда.',
    'Hot & savoury': 'Горячее и сытное',
    'A rotating selection of warm breakfast dishes, eggs, pastries and regional favourites.': 'Горячие блюда на завтрак, яйца, выпечка и региональные блюда.',
    'Restaurant & minimarket': 'Ресторан и мини-маркет',
    'Diverse dishes from the on-site restaurant, with a minimarket for quick essentials.': 'Разнообразные блюда в ресторане отеля и мини-маркет для быстрых покупок.',
    'Good to know': 'Полезно знать',
    'Hours & service': 'Время и сервис',
    'Included with': 'Включено в',
    'Every room': 'Каждый номер',
    'Room service': 'Room service',
    'On request': 'По запросу',
    'Restaurant': 'Ресторан',
    'On site': 'На территории',
    'Minimarket': 'Мини-маркет',
    'Dietary needs': 'Особое питание',
    'Gladly accommodated': 'Учтем по возможности',
    'Travelling with an early start or specific dietary needs? Let us know in advance and we\'ll have something ready for you.': 'Ранний выезд или особые пожелания к питанию? Сообщите заранее, и мы подготовимся.',
    'Contact the team': 'Связаться с командой',
    'Contact': 'Контакты',
    'We would love': 'Будем рады',
    'to host you.': 'принять вас.',
    'Reach us': 'Связаться',
    'Get in touch': 'Напишите нам',
    'Address': 'Адрес',
    'Telephone': 'Телефон',
    'Reception': 'Стойка регистрации',
    'Open 24 hours': 'Работает 24 часа',
    'Open in Google Maps': 'Открыть в Google Maps',
    'Reservation inquiry': 'Запрос на бронирование',
    'Location': 'Расположение',
    'Central Nukus, easy arrival.': 'Центр Нукуса, удобный приезд.',
    'Nukus Airport': 'Аэропорт Нукуса',
    'About 1.5 km': 'Около 1,5 км',
    'Nukus train station': 'Ж/д станция Нукус',
    'About 4.6 km': 'Около 4,6 км',
    'Savitsky Museum': 'Музей Савицкого',
    'About 10 minutes on foot': 'Около 10 минут пешком',
    'Nearby': 'Рядом',
    'Bazaar, river area, local dining': 'Базар, район у реки, местная еда',
    'House rules': 'Правила проживания',
    'Good to know before arrival.': 'Важно знать до приезда.',
    '14:00 – 15:00': '14:00 – 15:00',
    '12:00 – 13:00': '12:00 – 13:00',
    'Children': 'Дети',
    'Welcome': 'Добро пожаловать',
    'Pets': 'Животные',
    'Not allowed': 'Не допускаются',
    'Parties/events': 'Вечеринки/мероприятия',
    'Not permitted': 'Не разрешены',
    'Payment': 'Оплата',
    'Visa, Mastercard, cash': 'Visa, Mastercard, наличные',
    'All rights reserved.': 'Все права защищены.'
  };

  var uz = {
    'Home': 'Bosh sahifa',
    'Rooms & Suites': 'Xonalar va lyukslar',
    'Dining': 'Nonushta',
    'Gallery': 'Galereya',
    'About': 'Biz haqimizda',
    'Contact': 'Aloqa',
    'Book a stay': 'Bron qilish',
    'Book your stay': 'Bron qilish',
    'Explore rooms': 'Xonalarni ko‘rish',
    'Nukus, Karakalpakstan': 'Nukus, Qoraqalpog‘iston',
    'Quiet luxury,': 'Sokin qulaylik,',
    'warmly kept.': 'samimiy mehmondo‘stlik.',
    'IDEAL Hotel is a calm retreat of oak-warmed rooms, generous breakfasts and unhurried service — a considered base for work or rest.': 'IDEAL Hotel — iliq interyerli xonalar, to‘yimli nonushta va e’tiborli xizmatga ega sokin maskan.',
    'Check-in': 'Kirish',
    'Check-out': 'Chiqish',
    'Guests': 'Mehmonlar',
    '1 guest': '1 mehmon',
    '2 guests': '2 mehmon',
    '3 guests': '3 mehmon',
    '4 guests': '4 mehmon',
    'Check availability': 'Mavjudligini tekshirish',
    'Welcome to IDEAL': 'IDEALga xush kelibsiz',
    'A landmark of calm, built around the guest.': 'Mehmon uchun yaratilgan sokin va qulay mehmonxona.',
    'Behind a classic white façade you\'ll find something quieter and more modern — interiors of warm oak, honed stone and soft light, arranged with restraint. Every room is made for rest; every detail, for ease.': 'Klassik oq fasad ortida zamonaviy va sokin interyerlar bor: iliq yog‘och, tosh va yumshoq yorug‘lik. Har bir xona dam olish uchun, har bir detal qulaylik uchun.',
    'From a 24-hour welcome at reception to a daily buffet breakfast, free private parking and a central Nukus address near the Savitsky Museum, IDEAL Hotel is built to make a stay feel effortless.': '24 soat ishlaydigan resepshn, har kungi bufet nonushta, bepul xususiy avtoturargoh va Savitskiy muzeyi yaqinidagi markaziy joylashuv turishni oson qiladi.',
    'Our story': 'Bizning hikoya',
    'The house': 'Mehmonxona',
    'Four reasons to settle in': 'To‘xtash uchun to‘rt sabab',
    'Twin, double or twin, triple and suite layouts — each with air conditioning, private bathroom, city view and free Wi-Fi.': 'Twin, double/twin, triple va suite xonalari — har birida konditsioner, alohida hammom, shahar manzarasi va bepul Wi-Fi bor.',
    'View rooms': 'Xonalar',
    'Breakfast & Dining': 'Nonushta va restoran',
    'A daily buffet with hot and cold choices, plus an on-site restaurant and minimarket for easy meals.': 'Har kuni issiq va sovuq taomlar bilan bufet, restoran va minimarket.',
    'See dining': 'Nonushta haqida',
    'Spaces & Events': 'Joylar',
    'An elegant private room for meetings and gatherings, framed by greenery and warm light.': 'Uchrashuvlar va kichik tadbirlar uchun iliq muhitdagi alohida joy.',
    'Enquire': 'So‘rov yuborish',
    'Location': 'Joylashuv',
    'At ул. А. Досназарова, 100А in Nukus, close to the Savitsky Museum, local bazaar and about 1.5 km from Nukus Airport.': 'Nukusdagi ул. А. Досназарова, 100А manzilida, Savitskiy muzeyi va bozori yaqinida, aeroportdan taxminan 1,5 km.',
    'Directions': 'Yo‘nalish',
    'Superb rating': 'Mehmonlar bahosi',
    'Location score': 'Joylashuv bahosi',
    'Guest reviews': 'Mehmon sharhlari',
    'To Nukus Airport': 'Nukus aeroportigacha',
    'Where you\'ll stay': 'Qayerda turasiz',
    'Rooms made for rest': 'Dam olish uchun xonalar',
    'All rooms & suites': 'Barcha xonalar',
    'In every stay': 'Har bir turishda',
    'The comforts, included': 'Qulayliklar kiritilgan',
    'Free Wi-Fi': 'Bepul Wi-Fi',
    'Fast, complimentary internet throughout the hotel and in every room.': 'Mehmonxona bo‘ylab va har bir xonada tezkor bepul internet.',
    'Breakfast buffet': 'Bufet nonushta',
    'A generous spread of hot, cold, sweet and savoury choices served daily.': 'Har kuni issiq, sovuq, shirin va sho‘r taomlar tortiladi.',
    'Secure parking': 'Xavfsiz avtoturargoh',
    'Private on-site parking, free for resident guests.': 'Mehmonlar uchun bepul xususiy avtoturargoh.',
    '24-hour reception': '24 soat resepshn',
    'A real welcome at any hour, plus concierge and luggage support.': 'Istalgan vaqtda kutib olish, yuk va safar bo‘yicha yordam.',
    'Airport shuttle': 'Aeroport transferi',
    'Arrange transport to or from Nukus Airport on request.': 'So‘rov bo‘yicha Nukus aeroportiga yoki aeroportdan transfer tashkil qilamiz.',
    'Air conditioning': 'Konditsioner',
    'Individually controlled climate and blackout drapery in all rooms.': 'Har bir xonada alohida iqlim nazorati va qalin pardalar.',
    'A quieter kind of stay': 'Sokinroq turar joy',
    'Reserve your room': 'Xonani bron qiling',
    'Your quiet retreat is ready when you are.': 'Sokin dam olish maskaningiz tayyor.',
    'Tell us your dates and we\'ll take care of the rest. No payment now — just a friendly confirmation from our team.': 'Sanalarni yuboring, qolganini biz hal qilamiz. Hozir to‘lov olinmaydi — jamoamiz tasdiqlaydi.',
    'Explore': 'Bo‘limlar',
    'Stay': 'Turar joy',
    'ул. А. Досназарова, 100А, 230100 Nukus': 'ул. А. Досназарова, 100А, 230100 Nukus',
    'ул. А. Досназарова, 100А, 230100 Nukus, Karakalpakstan': 'ул. А. Досназарова, 100А, 230100 Nukus, Qoraqalpog‘iston',
    'Reception open 24 hours': 'Resepshn 24 soat ochiq',
    'A quiet landmark of warm hospitality in Nukus, Karakalpakstan — considered rooms, generous breakfasts and the kind of calm that makes a stay feel like a retreat.': 'Nukus, Qoraqalpog‘istondagi samimiy mehmondo‘stlik maskani: puxta xonalar, to‘yimli nonushta va safarni dam olishdek his qildiradigan sokinlik.',
    'Reservation inquiry': 'Bron so‘rovi',
    'Request your stay': 'Turar joy so‘rovi',
    'First & last name': 'Ism va familiya',
    'Your name': 'Ismingiz',
    'Email': 'Email',
    ‘Please enter your name’: ‘Iltimos, ismingizni kiriting’,
    ‘Enter a valid email’: ‘To’g’ri email kiriting’,
    ‘Enter a check-in date (today or later)’: ‘Kirish sanasini kiriting (bugun yoki undan keyin)’,
    ‘Check-out must be after check-in’: ‘Chiqish sanasi kirish sanasidan keyin bo’lishi kerak’,
    'Phone': 'Telefon',
    'Optional': 'Ixtiyoriy',
    'Room type': 'Xona turi',
    'No preference': 'Farqi yo‘q',
    'Twin Room': 'Twin xona',
    'Standard Suite': 'Standart lyuks',
    'Triple Room': 'Uch kishilik xona',
    'Single Room': 'Bir kishilik xona',
    'Anything we should know?': 'Biz bilishimiz kerak bo‘lgan narsa bormi?',
    'Message': 'Xabar',
    'Arrival time, occasion, requests…': 'Kelish vaqti, sabab, istaklar…',
    'Tell us about your stay…': 'Safaringiz haqida yozing…',
    'Send inquiry': 'So‘rov yuborish',
    'No payment is taken now — our team replies within a few hours to confirm availability.': 'Hozir to‘lov olinmaydi — jamoamiz bir necha soat ichida javob beradi.',
    'Thank you': 'Rahmat',
    'Your request has reached our reservations desk. We\'ll be in touch shortly to confirm your stay at IDEAL Hotel.': 'So‘rovingiz bron bo‘limiga yuborildi. Tez orada tasdiqlash uchun bog‘lanamiz.',
    'Your request has reached our reservations desk. We\'ll reply shortly to confirm your stay.': 'So‘rovingiz bron bo‘limiga yuborildi. Tez orada javob beramiz.',
    'Close': 'Yopish',
    'Open menu': 'Menyuni ochish',
    'Image viewer': 'Rasmni ko‘rish',
    'Previous': 'Oldingi',
    'Next': 'Keyingi',
    'Room': 'Xona',
    'Four room types,': 'To‘rt xil xona,',
    'one quiet standard.': 'bitta sokin standart.',
    'Every room at IDEAL Hotel includes air conditioning, a private bathroom, flat-screen TV, free Wi-Fi, tea and coffee facilities, city views and terrace access. Breakfast is included, and no prepayment is needed for direct reservation inquiries.': 'Damirdagi har bir xonada konditsioner, alohida hammom, televizor, bepul Wi-Fi, choy va qahva, shahar manzarasi va terassaga chiqish bor. Nonushta kiritilgan, to‘g‘ridan-to‘g‘ri so‘rov uchun oldindan to‘lov shart emas.',
    'Two separate beds, city views and a terrace — a practical, comfortable choice for friends or colleagues.': 'Ikki alohida karavot, shahar manzarasi va terassa — do‘stlar yoki hamkasblar uchun qulay tanlov.',
    'A large double bed, warm wood detail and the essentials for an easy central Nukus stay.': 'Katta ikki kishilik karavot, iliq yog‘och detallar va Nukus markazida qulay turish uchun zarur narsalar.',
    'Three single beds with city views, terrace access and the same included breakfast and Wi-Fi.': 'Uchta bir kishilik karavot, shahar manzarasi, terassa, nonushta va Wi-Fi kiritilgan.',
    'A private suite with a large double bed, city views, terrace access and a little more privacy.': 'Katta ikki kishilik karavot, shahar manzarasi, terassa va ko‘proq maxfiylikka ega lyuks.',
    '20 m²': '20 m²',
    'Two single beds': 'Ikki bir kishilik karavot',
    'One large double bed': 'Bitta katta ikki kishilik karavot',
    'Three single beds': 'Uchta bir kishilik karavot',
    'Up to 2 guests': '2 mehmon gacha',
    'Up to 3 guests': '3 mehmon gacha',
    'View room': 'Batafsil',
    'Book': 'Bron',
    '/ night': '/ tun',
    'City view': 'Shahar manzarasi',
    'Terrace': 'Terassa',
    'Flat-screen TV': 'Televizor',
    'Ensuite bathroom': 'Alohida hammom',
    'Tea & coffee': 'Choy va qahva',
    'Private suite': 'Alohida lyuks',
    'Bathrobes & slippers': 'Xalat va shippaklar',
    'Keep exploring': 'Boshqa variantlar',
    'Other rooms': 'Boshqa xonalar',
    'All rooms': 'Barcha xonalar',
    'Ask a question': 'Savol berish',
    'per night, incl. breakfast': 'bir tun uchun, nonushta kiritilgan',
    'Size': 'Maydon',
    'Beds': 'Karavotlar',
    'Sleeps': 'Sig‘imi',
    'Outlook': 'Manzara',
    'In this room': 'Xonada',
    'Calm, kept': 'Sokinlik',
    'with care.': 'va g‘amxo‘rlik.',
    'Who we are': 'Biz kimmiz',
    'A modern house behind a classic façade.': 'Klassik fasad ortidagi zamonaviy mehmonxona.',
    'IDEAL Hotel was built on a simple belief: that real luxury is quiet. Behind a stately white exterior, we made interiors that feel calm and contemporary — warm oak joinery, honed stone, soft light and space used generously.': 'IDEAL Hotel oddiy fikrga asoslangan: haqiqiy qulaylik sokin bo‘ladi. Oq fasad ortida iliq yog‘och, tosh, yumshoq yorug‘lik va puxta rejalangan joylar bor.',
    'From a 24-hour welcome to a generous breakfast buffet, everything here is arranged to make a stay feel effortless. Guests regularly mention the central location, spotless rooms, helpful reception team and comfortable beds.': '24 soat resepshn va to‘yimli bufet nonushta turishni oson qiladi. Mehmonlar markaziy joylashuv, tozalik, yordamchi jamoa va qulay karavotlarni tez-tez ta’kidlaydi.',
    'What guides us': 'Bizning tamoyillar',
    'Three quiet commitments': 'Uchta sokin va’da',
    'Warmth, always': 'Har doim samimiyat',
    'A genuine welcome at any hour. We remember names, anticipate needs, and treat every guest as we would a visitor to our own home.': 'Istalgan vaqtda samimiy kutib olish. Har bir mehmonni uyimizdagi mehmondek qabul qilamiz.',
    'Quiet over loud': 'Shovqindan ko‘ra sokinlik',
    'Restraint in everything — calm interiors, considered detail, and the kind of service you feel rather than notice.': 'Hammasida vazminlik: sokin interyer, puxta detallar va seziladigan, lekin bezovta qilmaydigan xizmat.',
    'Cared-for spaces': 'Parvarishlangan joylar',
    'Spotless rooms, fresh linen and warm materials, maintained with the attention that makes a place feel truly looked after.': 'Toza xonalar, yangi choyshablar va iliq materiallar — hammasi e’tibor bilan saqlanadi.',
    'Room categories': 'Xona kategoriyalari',
    'Guest essentials': 'Mehmonlar uchun muhim',
    'Everything practical, close at hand': 'Kerakli hamma narsa yaqin',
    'Central Nukus': 'Nukus markazi',
    'Set at ул. А. Досназарова, 100А, close to the Savitsky Museum, local bazaar and river area.': 'ул. А. Досназарова, 100А manzilida, Savitskiy muzeyi, mahalliy bozor va daryo hududiga yaqin.',
    'Easy Arrival': 'Oson kelish',
    ‘Nukus Airport is about 1.5 km away, with shuttle service available on request.’: ‘Nukus aeroporti taxminan 1,5 km uzoqlikda, transfer soʼrov boʼyicha mavjud.’,
    'Daily Comfort': 'Kundalik qulaylik',
    'Free Wi-Fi, private parking, daily housekeeping, room service and 24-hour reception.': 'Bepul Wi-Fi, xususiy avtoturargoh, kundalik tozalash, room service va 24 soat resepshn.',
    'For Families': 'Oilalar uchun',
    'Family rooms are available, children are welcome, and rooms are non-smoking.': 'Oilaviy xonalar bor, bolalar qabul qilinadi, xonalar chekilmaydigan.',
    'Breakfast included': 'Nonushta kiritilgan',
    'Parking & Wi-Fi': 'Parking va Wi-Fi',
    'Check-in from': 'Kirish vaqti',
    'Where we are': 'Qayerdamiz',
    'Well-placed, easily reached.': 'Qulay joylashuv, oson yetib borish.',
    'IDEAL Hotel sits within easy reach of Nukus\'s key connections, with secure on-site parking and an airport shuttle available on request. Whether you\'re here for business, museum visits or a short stay between trips, arrival is simple.': 'IDEAL Hotel Nukusdagi asosiy joylarga yaqin, xususiy avtoturargoh va aeroport transferi mavjud. Ish, muzey yoki qisqa safar uchun kelish oson.',
    'Directions & contact': 'Yo‘nalish va aloqa',
    'A breakfast': 'Nonushta,',
    'worth waking for.': 'uyg‘onishga arziydi.',
    'The morning table': 'Ertalabki dasturxon',
    'Generous, fresh, and made with care.': 'To‘yimli, yangi va e’tibor bilan.',
    'Mornings at IDEAL begin with a buffet of hot and cold dishes, sweet and savoury choices, fresh fruit, salads, breads, tea and coffee.': 'IDEALda tong issiq va sovuq taomlar, shirin va sho‘r tanlovlar, mevalar, salatlar, non, choy va qahvali bufet bilan boshlanadi.',
    'Breakfast is included with stays, and guests also have an on-site restaurant for lunch or dinner and a minimarket for everyday convenience.': 'Nonushta turishga kiritilgan. Tushlik yoki kechki ovqat uchun restoran va kundalik qulaylik uchun minimarket bor.',
    'On the buffet': 'Bufetda',
    'A taste of the spread': 'Nimalar bor',
    'Fresh & cold': 'Yangi va sovuq',
    'Fruit, salads, greens, olives, yoghurt, cheeses and light cold dishes.': 'Mevalar, salatlar, ko‘katlar, zaytun, yogurt, pishloqlar va yengil sovuq taomlar.',
    'Hot & savoury': 'Issiq va to‘yimli',
    'A rotating selection of warm breakfast dishes, eggs, pastries and regional favourites.': 'Issiq nonushta taomlari, tuxum, pishiriqlar va mahalliy taomlar.',
    'Restaurant & minimarket': 'Restoran va minimarket',
    'Diverse dishes from the on-site restaurant, with a minimarket for quick essentials.': 'Mehmonxona restoranida turli taomlar, tezkor xaridlar uchun minimarket.',
    'Good to know': 'Bilish foydali',
    'Hours & service': 'Vaqt va xizmat',
    'Included with': 'Kiritilgan',
    'Every room': 'Har bir xona',
    'Room service': 'Room service',
    'On request': 'So‘rov bo‘yicha',
    'Restaurant': 'Restoran',
    'On site': 'Hududda',
    'Minimarket': 'Minimarket',
    'Dietary needs': 'Maxsus ovqatlanish',
    'Gladly accommodated': 'Imkon qadar inobatga olinadi',
    'Travelling with an early start or specific dietary needs? Let us know in advance and we\'ll have something ready for you.': 'Erta ketasizmi yoki maxsus ovqatlanish kerakmi? Oldindan ayting, tayyorlab qo‘yamiz.',
    'Contact the team': 'Jamoa bilan bog‘lanish',
    'We would love': 'Sizni qabul qilishdan',
    'to host you.': 'mamnunmiz.',
    'Reach us': 'Biz bilan bog‘laning',
    'Get in touch': 'Aloqaga chiqing',
    'Address': 'Manzil',
    'Telephone': 'Telefon',
    'Reception': 'Resepshn',
    'Open 24 hours': '24 soat ochiq',
    'Open in Google Maps': 'Google Mapsda ochish',
    'Central Nukus, easy arrival.': 'Nukus markazi, oson kelish.',
    'Nukus Airport': 'Nukus aeroporti',
    'About 1.5 km': 'Taxminan 1,5 km',
    'Nukus train station': 'Nukus vokzali',
    'About 4.6 km': 'Taxminan 4,6 km',
    'Savitsky Museum': 'Savitskiy muzeyi',
    'About 10 minutes on foot': 'Taxminan 10 daqiqa piyoda',
    'Nearby': 'Yaqinda',
    'Bazaar, river area, local dining': 'Bozor, daryo hududi, mahalliy ovqatlanish',
    'House rules': 'Mehmonxona qoidalari',
    'Good to know before arrival.': 'Kelishdan oldin bilish kerak.',
    '14:00 – 15:00': '14:00 – 15:00',
    '12:00 – 13:00': '12:00 – 13:00',
    'Children': 'Bolalar',
    'Welcome': 'Qabul qilinadi',
    'Pets': 'Uy hayvonlari',
    'Not allowed': 'Ruxsat etilmaydi',
    'Parties/events': 'Bazm/tadbirlar',
    'Not permitted': 'Ruxsat etilmaydi',
    'Payment': 'To‘lov',
    'Visa, Mastercard, cash': 'Visa, Mastercard, naqd',
    'All rights reserved.': 'Barcha huquqlar himoyalangan.'
  };

  var dictionaries = { ru: ru, uz: uz };

  function addSwitcher() {
    if (doc.querySelector('.lang-switcher')) return;
    var headerRight = doc.querySelector('.header-right');
    if (headerRight) {
      headerRight.insertAdjacentHTML('afterbegin', renderSwitcher('desktop'));
    }
    var mobile = doc.querySelector('.mobile-menu');
    if (mobile) {
      mobile.insertAdjacentHTML('beforeend', renderSwitcher('mobile'));
    }
  }

  function renderSwitcher(scope) {
    return '<div class="lang-switcher lang-switcher--' + scope + '" aria-label="Language">' +
      ['en', 'ru', 'uz'].map(function (code) {
        return '<button type="button" data-lang="' + code + '">' + langNames[code] + '</button>';
      }).join('') +
      '</div>';
  }

  function getOriginalAttr(el, attr) {
    var attrs = originalAttr.get(el);
    if (!attrs) {
      attrs = {};
      originalAttr.set(el, attrs);
    }
    if (!Object.prototype.hasOwnProperty.call(attrs, attr)) attrs[attr] = el.getAttribute(attr);
    return attrs[attr];
  }

  function translateTextNode(node, dict) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    var original = originalText.get(node);
    var trimmed = original.trim();
    if (!trimmed) return;
    var translated = dict[trimmed] || trimmed;
    node.nodeValue = original.replace(trimmed, translated);
  }

  function translateAttributes(dict) {
    doc.querySelectorAll('[placeholder], [aria-label], [alt], [title]').forEach(function (el) {
      ['placeholder', 'aria-label', 'alt', 'title'].forEach(function (attr) {
        if (!el.hasAttribute(attr)) return;
        var original = getOriginalAttr(el, attr);
        el.setAttribute(attr, dict[original] || original);
      });
    });
  }

  function translateOptions(dict) {
    doc.querySelectorAll('option').forEach(function (option) {
      if (!originalText.has(option.firstChild || option)) {
        option.setAttribute('data-i18n-original', option.textContent);
      }
      var original = option.getAttribute('data-i18n-original') || option.textContent;
      option.textContent = dict[original] || original;
    });
  }

  function walkText(dict) {
    var walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('script, style, .lang-switcher')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) { translateTextNode(node, dict); });
  }

  function updateButtons(lang) {
    doc.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });
  }

  var observer;

  function observeMutations() {
    if (observer) observer.observe(doc.body, { childList: true, subtree: true, characterData: true });
  }

  function applyLanguage(lang) {
    if (observer) observer.disconnect();
    var dict = dictionaries[lang] || {};
    doc.documentElement.lang = lang === 'en' ? 'en' : lang;
    walkText(dict);
    translateOptions(dict);
    translateAttributes(dict);
    updateButtons(lang);
    localStorage.setItem('damir-lang', lang);
    window.setTimeout(observeMutations, 0);
  }

  addSwitcher();
  doc.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-lang]');
    if (!btn) return;
    applyLanguage(btn.getAttribute('data-lang'));
  });

  var requested = new URLSearchParams(location.search).get('lang');
  var current = langNames[requested] ? requested : (localStorage.getItem('damir-lang') || 'en');
  applyLanguage(current);

  observer = new MutationObserver(function () {
    var lang = localStorage.getItem('damir-lang') || 'en';
    if (lang !== 'en') applyLanguage(lang);
  });
  observeMutations();
})();
