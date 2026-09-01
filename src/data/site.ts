/**
 * LINGO is a fictional brand made for a portfolio piece.
 * Nothing below states a fact about a real school: no counts, percentages,
 * ratings, awards, addresses or testimonials presented as real.
 */

/* ---------- Hero: the word that keeps changing language ---------- */
export interface Greeting {
  word: string;
  code: string;
  lang: string;
}

export const greetings: Greeting[] = [
  { word: "HOLA", code: "ES", lang: "Español" },
  { word: "HELLO", code: "EN", lang: "English" },
  { word: "BONJOUR", code: "FR", lang: "Français" },
  { word: "HALLO", code: "DE", lang: "Deutsch" },
  { word: "CIAO", code: "IT", lang: "Italiano" },
];

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
/** How far the demo route has been walked — the first three read as reached. */
export const LEVEL_REACHED = 2;

/* ---------- Languages ---------- */
export interface LanguageRow {
  id: string;
  /** Value passed to the trial form as ?language= */
  slug: string;
  native: string;
  ru: string;
  code: string;
  hello: string;
  tags: string[];
  image: string;
}

export const languages: LanguageRow[] = [
  {
    id: "en",
    slug: "english",
    native: "English",
    ru: "Английский",
    code: "EN",
    hello: "Hello",
    tags: ["Разговор", "Работа", "Экзамены"],
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=520&q=72",
  },
  {
    id: "de",
    slug: "deutsch",
    native: "Deutsch",
    ru: "Немецкий",
    code: "DE",
    hello: "Hallo",
    tags: ["Учёба", "Работа", "Переезд"],
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=520&q=72",
  },
  {
    id: "es",
    slug: "espanol",
    native: "Español",
    ru: "Испанский",
    code: "ES",
    hello: "Hola",
    tags: ["Разговор", "Путешествия"],
    image:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=520&q=72",
  },
  {
    id: "fr",
    slug: "francais",
    native: "Français",
    ru: "Французский",
    code: "FR",
    hello: "Bonjour",
    tags: ["Фонетика", "Живая речь"],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=520&q=72",
  },
  {
    id: "it",
    slug: "italiano",
    native: "Italiano",
    ru: "Итальянский",
    code: "IT",
    hello: "Ciao",
    tags: ["Культура", "Разговор"],
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=520&q=72",
  },
  {
    id: "pt",
    slug: "portugues",
    native: "Português",
    ru: "Португальский",
    code: "PT",
    hello: "Olá",
    tags: ["Европейский и бразильский"],
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=520&q=72",
  },
];

/* ---------- How it works ---------- */
export const steps = [
  {
    key: "listen",
    n: "01",
    title: "Слушаем",
    rest: "как вы говорите сейчас",
    text: "Первое занятие — разговор, а не тест. Преподаватель слышит уровень в речи и называет точку старта.",
  },
  {
    key: "route",
    n: "02",
    title: "Собираем",
    rest: "маршрут до вашей цели",
    text: "Цель формулируете вы: собеседование, переезд, экзамен или свободный разговор. Программа строится от неё назад.",
  },
  {
    key: "speak",
    n: "03",
    title: "Говорим",
    rest: "с первого занятия",
    text: "Грамматика приходит следом за речью, а не вместо неё. Каждое занятие — минимум половина времени вслух.",
  },
];

/* ---------- Courses ---------- */
export const courses = [
  {
    key: "speak",
    title: "Разговорный",
    text: "Снять барьер и начать говорить без пауз на перевод в голове.",
  },
  {
    key: "work",
    title: "Для работы",
    text: "Созвоны, переписка, презентации и собеседования на языке.",
  },
  {
    key: "zero",
    title: "С нуля",
    text: "Первые слова, звуки и фразы — без страха ошибиться.",
    tone: "secondary" as const,
  },
  {
    key: "exam",
    title: "Экзамены",
    text: "Формат, тайминг и стратегия под конкретный международный экзамен.",
  },
  {
    key: "travel",
    title: "Для поездок",
    text: "Компактный набор: аэропорт, отель, кафе, разговор на улице.",
  },
  {
    key: "teens",
    title: "Подросткам",
    text: "Язык через то, что уже интересно: музыка, игры, сериалы.",
  },
];

/* ---------- Teachers (fictional) ----------
   `size` drives the editorial composition: one large portrait, two medium,
   one small — deliberately not a row of equal cards. */
export const teachers = [
  {
    key: "a",
    name: "Мария",
    langs: "Español · Português",
    role: "Разговорные группы",
    size: "lg" as const,
    ratio: "4 / 5",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=78",
  },
  {
    key: "b",
    name: "Тимур",
    langs: "English",
    role: "Английский для работы",
    size: "md" as const,
    ratio: "3 / 4",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=720&q=78",
  },
  {
    key: "c",
    name: "Клара",
    langs: "Deutsch",
    role: "С нуля и до B2",
    size: "md" as const,
    ratio: "1 / 1",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=720&q=78",
  },
  {
    key: "d",
    name: "Люк",
    langs: "Français · Italiano",
    role: "Фонетика и произношение",
    size: "sm" as const,
    ratio: "4 / 5",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=560&q=78",
  },
];

/* ---------- Pricing — demonstration figures for a concept brand ---------- */
export const plans = [
  {
    key: "solo",
    name: "Соло",
    price: "2 400",
    unit: "₽ / занятие",
    line: "Один на один с преподавателем",
    items: [
      "Индивидуальный темп",
      "Гибкое расписание",
      "Программа под вашу цель",
      "Разбор речи после занятия",
    ],
  },
  {
    key: "duo",
    name: "Дуэт",
    price: "1 500",
    unit: "₽ / занятие",
    line: "Вдвоём с другом или коллегой",
    items: [
      "Диалог на каждом занятии",
      "Общий маршрут на двоих",
      "Одно расписание",
      "Разбор речи после занятия",
    ],
    featured: true,
  },
  {
    key: "group",
    name: "Группа",
    price: "900",
    unit: "₽ / занятие",
    line: "Мини-группа одного уровня",
    items: [
      "Много практики вслух",
      "Разговорные клубы",
      "Фиксированное расписание",
      "Материалы студии",
    ],
  },
];
