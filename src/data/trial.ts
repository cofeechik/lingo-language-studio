/**
 * The seven-step trial-lesson form: one question per screen.
 * LINGO is a fictional brand — nothing here is sent to a real school.
 */

export interface Choice {
  value: string;
  label: string;
  /** Stored instead of `label` when the answer needs a fuller wording. */
  answer?: string;
  note?: string;
}

export type Step =
  | {
      key: FieldKey;
      kind: "text";
      question: string;
      placeholder: string;
      hint?: string;
    }
  | { key: FieldKey; kind: "choice"; question: string; options: Choice[] }
  | { key: "contact"; kind: "contact"; question: string; hint?: string };

export type FieldKey =
  | "name"
  | "language"
  | "level"
  | "format"
  | "goal"
  | "time"
  | "contact";

export const steps: Step[] = [
  {
    key: "name",
    kind: "text",
    question: "Как вас зовут?",
    placeholder: "Имя",
  },
  {
    key: "language",
    kind: "choice",
    question: "Какой язык учим?",
    options: [
      { value: "english", label: "English" },
      { value: "deutsch", label: "Deutsch" },
      { value: "espanol", label: "Español" },
      { value: "francais", label: "Français" },
      { value: "italiano", label: "Italiano" },
      { value: "portugues", label: "Português" },
    ],
  },
  {
    key: "level",
    kind: "choice",
    question: "Какой у вас уровень?",
    options: [
      { value: "a1", label: "A1", note: "Первые слова" },
      { value: "a2", label: "A2", note: "Простые фразы" },
      { value: "b1", label: "B1", note: "Бытовой разговор" },
      { value: "b2", label: "B2", note: "Свободнее и точнее" },
      { value: "c1", label: "C1", note: "Почти без усилий" },
      { value: "c2", label: "C2", note: "Как на родном" },
      {
        value: "unknown",
        label: "Не знаю уровень",
        answer: "Определим уровень на пробном занятии",
      },
    ],
  },
  {
    key: "format",
    kind: "choice",
    question: "Где вам удобнее заниматься?",
    options: [
      { value: "online", label: "Онлайн" },
      { value: "studio", label: "В студии" },
    ],
  },
  {
    key: "goal",
    kind: "choice",
    question: "Ради чего учите язык?",
    options: [
      { value: "speak", label: "Разговорный" },
      { value: "work", label: "Для работы" },
      { value: "travel", label: "Для путешествий" },
      { value: "exam", label: "Экзамены" },
      { value: "zero", label: "С нуля" },
    ],
  },
  {
    key: "time",
    kind: "choice",
    question: "Когда вам удобно заниматься?",
    options: [
      { value: "morning", label: "Утро" },
      { value: "day", label: "День" },
      { value: "evening", label: "Вечер" },
    ],
  },
  {
    key: "contact",
    kind: "contact",
    question: "Куда прислать время пробного урока?",
    hint: "Заявка никуда не отправляется автоматически — вы сами выберете чат в Telegram.",
  },
];

/** Human-readable label for each answer line in the summary. */
export const fieldLabels: Record<FieldKey | "tariff", string> = {
  name: "Имя",
  language: "Язык",
  level: "Уровень",
  format: "Формат",
  goal: "Цель",
  time: "Время",
  contact: "Контакт",
  tariff: "Тариф",
};

/* ------------------------------------------------------------------
   Context arriving from the landing page: /trial?language=…&course=…
   ------------------------------------------------------------------ */

/** Course keys on the landing page → goal options in the form. */
const COURSE_TO_GOAL: Record<string, string> = {
  speak: "speak",
  work: "work",
  travel: "travel",
  exam: "exam",
  zero: "zero",
  // "teens" has no matching goal — the step simply stays unanswered
};

const TARIFF_LABELS: Record<string, string> = {
  solo: "Соло — один на один с преподавателем",
  duo: "Дуэт — вдвоём с другом или коллегой",
  group: "Группа — мини-группа одного уровня",
};

const languageValues = new Set(
  (steps.find((s) => s.key === "language") as Extract<Step, { kind: "choice" }>)
    .options.map((o) => o.value),
);

export interface Prefill {
  answers: Partial<Record<FieldKey, string>>;
  /** Chosen plan, carried through to the summary without its own step. */
  tariff?: string;
  /** Index of the first unanswered step. */
  startAt: number;
}

export function readPrefill(params: URLSearchParams): Prefill {
  const answers: Partial<Record<FieldKey, string>> = {};

  const language = params.get("language")?.toLowerCase();
  if (language && languageValues.has(language)) answers.language = language;

  const course = params.get("course")?.toLowerCase();
  if (course && COURSE_TO_GOAL[course]) answers.goal = COURSE_TO_GOAL[course];

  const tariffKey = params.get("tariff")?.toLowerCase();
  const tariff = tariffKey ? TARIFF_LABELS[tariffKey] : undefined;

  // Always open on the first question — prefilled steps just arrive answered.
  return { answers, tariff, startAt: 0 };
}
