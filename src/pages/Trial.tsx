import { useEffect, useMemo, useRef, useState } from "react";
import { Action, Arrow } from "../ui/Action";
import { HOME_HREF } from "../lib/cta";
import {
  steps,
  fieldLabels,
  readPrefill,
  type FieldKey,
  type Step,
} from "../data/trial";
import "./Trial.css";

type Answers = Partial<Record<FieldKey, string>>;
type ContactKind = "telegram" | "phone";

/** Where the finished application would go. Placeholder for a concept brand. */
const STUDIO_TELEGRAM = "lingo_studio";

function optionsOf(step: Step) {
  return step.kind === "choice" ? step.options : [];
}

/** The answer as it should read in the summary and in the message. */
function displayAnswer(step: Step, value: string) {
  if (step.kind !== "choice") return value;
  const option = step.options.find((o) => o.value === value);
  return option?.answer ?? option?.label ?? value;
}

export function Trial({ params }: { params: URLSearchParams }) {
  const prefill = useMemo(() => readPrefill(params), [params]);

  const [answers, setAnswers] = useState<Answers>(prefill.answers);
  const [index, setIndex] = useState(prefill.startAt);
  const [contactKind, setContactKind] = useState<ContactKind>("telegram");
  const [sent, setSent] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onSummary = index >= steps.length;
  const step = onSummary ? undefined : steps[index];

  // Each step starts from whatever was answered before, so going back keeps it.
  useEffect(() => {
    if (!step) return;
    setDraft(answers[step.key] ?? "");
    if (step.kind !== "choice") inputRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "instant" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const goNext = (value?: string) => {
    if (step && value !== undefined) {
      setAnswers((prev) => ({ ...prev, [step.key]: value }));
    }
    setIndex((i) => Math.min(i + 1, steps.length));
  };

  const goBack = () => setIndex((i) => Math.max(0, i - 1));

  /* ---------- Summary → a message you send yourself ---------- */
  const lines = useMemo(() => {
    const rows: { label: string; value: string }[] = [];
    steps.forEach((s) => {
      const raw = answers[s.key];
      if (raw) rows.push({ label: fieldLabels[s.key], value: displayAnswer(s, raw) });
    });
    if (prefill.tariff)
      rows.push({ label: fieldLabels.tariff, value: prefill.tariff });
    return rows;
  }, [answers, prefill.tariff]);

  const message = useMemo(
    () =>
      [
        "Заявка на пробный урок — LINGO",
        ...lines.map((l) => `${l.label}: ${l.value}`),
      ].join("\n"),
    [lines],
  );

  /* No backend and no bot API: Telegram's own share sheet opens with the
     text prefilled and the person picks the chat themselves. */
  const shareHref = `https://t.me/share/url?url=${encodeURIComponent(
    `https://t.me/${STUDIO_TELEGRAM}`,
  )}&text=${encodeURIComponent(message)}`;

  const progress = Math.min(index, steps.length) / steps.length;
  const canContinue = step?.kind === "choice" || draft.trim().length > 0;

  return (
    <main className="trial">
      <div className="shell trial__top">
        <a className="trial__mark" href={HOME_HREF}>
          LINGO<i>.</i>
        </a>
        <a className="trial__exit" href={HOME_HREF}>
          На главную
        </a>
      </div>

      <div className="shell trial__progress">
        <p className="trial__count">
          <span>
            {onSummary ? "Заявка" : `Шаг ${index + 1} из ${steps.length}`}
          </span>
          <span>Пробный урок</span>
        </p>
        <div className="trial__rail">
          <span style={{ "--p": progress } as React.CSSProperties} />
        </div>
      </div>

      <div className="shell trial__body">
        {step ? (
          <div className="trial__step" key={step.key}>
            <h1 className="trial__q">{step.question}</h1>

            {step.kind === "choice" && (
              <div className="trial__options">
                {optionsOf(step).map((o) => (
                  <button
                    className="trial__option"
                    type="button"
                    key={o.value}
                    aria-pressed={answers[step.key] === o.value}
                    onClick={() => goNext(o.value)}
                  >
                    <span className="trial__option-label">{o.label}</span>
                    {o.note && (
                      <span className="trial__option-note">{o.note}</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {step.kind === "text" && (
              <div className="trial__field">
                <input
                  className="trial__input"
                  ref={inputRef}
                  type="text"
                  value={draft}
                  placeholder={step.placeholder}
                  autoComplete="given-name"
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && canContinue && goNext(draft.trim())
                  }
                />
              </div>
            )}

            {step.kind === "contact" && (
              <div className="trial__field">
                <div className="trial__switch">
                  {(["telegram", "phone"] as ContactKind[]).map((kind) => (
                    <button
                      type="button"
                      key={kind}
                      aria-pressed={contactKind === kind}
                      onClick={() => setContactKind(kind)}
                    >
                      {kind === "telegram" ? "Telegram" : "Телефон"}
                    </button>
                  ))}
                </div>
                <input
                  className="trial__input"
                  ref={inputRef}
                  type={contactKind === "phone" ? "tel" : "text"}
                  inputMode={contactKind === "phone" ? "tel" : "text"}
                  value={draft}
                  placeholder={
                    contactKind === "phone" ? "+7 900 000-00-00" : "@username"
                  }
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && canContinue && goNext(draft.trim())
                  }
                />
              </div>
            )}

            {step.kind !== "choice" && step.hint && (
              <p className="trial__hint">{step.hint}</p>
            )}

            <div className="trial__controls">
              {index > 0 && (
                <button className="trial__back" type="button" onClick={goBack}>
                  <Arrow />
                  Назад
                </button>
              )}
              {step.kind !== "choice" && (
                <Action
                  className="trial__next"
                  href="#"
                  aria-disabled={!canContinue}
                  onClick={(e) => {
                    e.preventDefault();
                    if (canContinue) goNext(draft.trim());
                  }}
                >
                  {index === steps.length - 1 ? "К заявке" : "Далее"}
                </Action>
              )}
            </div>
          </div>
        ) : (
          <div className="trial__step">
            <h1 className="trial__summary-title">Ваша заявка</h1>

            <dl className="trial__list">
              {lines.map((l) => (
                <div className="trial__row" key={l.label}>
                  <dt>{l.label}</dt>
                  <dd>{l.value}</dd>
                </div>
              ))}
            </dl>

            <div className="trial__controls">
              <button
                className="trial__back"
                type="button"
                onClick={() => setIndex(0)}
              >
                <Arrow />
                Изменить ответы
              </button>
              <Action
                href={shareHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSent(true)}
              >
                Отправить анкету
              </Action>
            </div>

            {sent && (
              <p className="trial__sent">
                Telegram открылся в новой вкладке — выберите чат и отправьте
                собранное сообщение.
              </p>
            )}

            <p className="trial__note">
              LINGO — вымышленная студия, созданная для портфолио. Заявка никуда
              не уходит автоматически: у страницы нет сервера, она лишь собирает
              текст и передаёт его в Telegram, где отправляете его вы сами.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
