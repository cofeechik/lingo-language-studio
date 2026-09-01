/**
 * Demo content for the LINGO concept landing.
 * LINGO is a fictional brand built for a portfolio piece — nothing here
 * describes a real school, real staff or real results.
 */

export interface Language {
  id: string;
  /** Language name in its own language — the card's typographic anchor. */
  native: string;
  /** Russian label shown under the native name. */
  name: string;
  /** Two-letter code used in the hero marquee and card meta. */
  code: string;
  /** Short editorial line about the direction — descriptive, not statistical. */
  note: string;
  /** Demo formats offered, phrased as course focus rather than facts. */
  focus: string[];
  image: string;
  /** Tone class controls the card's accent colour. */
  tone: "terracotta" | "sage" | "ochre" | "forest";
  /** Card gets extra column span in the asymmetric grid. */
  wide?: boolean;
}

export const languages: Language[] = [
  {
    id: "en",
    native: "English",
    name: "Английский",
    code: "EN",
    note: "Разговорная практика, деловая переписка и подготовка к международным экзаменам.",
    focus: ["Разговорный", "Для работы", "Экзамены"],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=70",
    tone: "terracotta",
    wide: true,
  },
  {
    id: "fr",
    native: "Français",
    name: "Французский",
    code: "FR",
    note: "Фонетика, живая речь и культурный контекст с первых занятий.",
    focus: ["С нуля", "Разговорный"],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=70",
    tone: "sage",
  },
  {
    id: "de",
    native: "Deutsch",
    name: "Немецкий",
    code: "DE",
    note: "Ясная грамматика без зубрёжки и лексика для учёбы и работы.",
    focus: ["Грамматика", "Для учёбы"],
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=70",
    tone: "ochre",
  },
  {
    id: "es",
    native: "Español",
    name: "Испанский",
    code: "ES",
    note: "Быстрый старт в речи и разговорные клубы с носителями языка.",
    focus: ["С нуля", "Клубы"],
    image:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=900&q=70",
    tone: "forest",
  },
  {
    id: "it",
    native: "Italiano",
    name: "Итальянский",
    code: "IT",
    note: "Язык через культуру: кино, кухня, музыка и живой диалог.",
    focus: ["Для путешествий"],
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=70",
    tone: "terracotta",
  },
  {
    id: "pt",
    native: "Português",
    name: "Португальский",
    code: "PT",
    note: "Европейский и бразильский варианты — на выбор с самого старта.",
    focus: ["С нуля", "Разговорный"],
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=70",
    tone: "sage",
  },
];

/** Marquee strip under the hero. */
export const marqueeItems = [
  "English",
  "Français",
  "Deutsch",
  "Español",
  "Italiano",
  "Português",
  "Nederlands",
  "Svenska",
];
