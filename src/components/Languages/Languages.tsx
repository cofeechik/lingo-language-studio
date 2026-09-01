import { ArrowIcon, LinkAction } from "../ui/Button";
import { useReveal } from "../../hooks/useReveal";
import { languages, type Language } from "../../data/languages";
import "./Languages.css";

function LanguageCard({ lang, delay }: { lang: Language; delay: number }) {
  const wide = Boolean(lang.wide);

  return (
    <article
      className={`lang-card reveal${wide ? " lang-card--wide" : ""}`}
      data-tone={lang.tone}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <div className="lang-card__media">
        <img
          className="lang-card__img"
          src={lang.image}
          alt={`${lang.name} язык — занятия в студии Lingo`}
          loading="lazy"
          decoding="async"
        />
        <span className="lang-card__code">{lang.code}</span>
        <span className="lang-card__native">{lang.native}</span>
      </div>

      <div className="lang-card__body">
        {wide ? (
          <h3 className="lang-card__headline">
            Самое востребованное направление студии
          </h3>
        ) : (
          <p className="lang-card__name">{lang.name}</p>
        )}

        <p className="lang-card__note">{lang.note}</p>

        <ul className="lang-card__focus">
          {lang.focus.map((f) => (
            <li className="lang-card__chip" key={f}>
              {f}
            </li>
          ))}
        </ul>

        <p className="lang-card__foot">
          <span>Смотреть программу</span>
          <ArrowIcon />
        </p>
      </div>

      <a
        className="lang-card__link"
        href="#trial"
        aria-label={`${lang.name} язык — смотреть программу`}
      />
    </article>
  );
}

export function Languages() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section className="languages" id="languages" ref={sectionRef}>
      <div className="shell">
        {/* ---------- Head ---------- */}
        <header className="languages__head">
          <div>
            <p className="languages__index section-index label reveal">
              01 — Языки
            </p>
            <h2
              className="languages__title h2 reveal"
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Шесть языков — <em>один</em> подход к обучению
            </h2>
          </div>

          <div
            className="languages__aside reveal"
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            <p>
              Каждое направление ведут преподаватели, для которых язык —
              профессия. Программа собирается под цель: разговор, работа, учёба
              или переезд.
            </p>
            <LinkAction href="#trial">Не знаете, с чего начать?</LinkAction>
          </div>
        </header>

        {/* ---------- Grid ---------- */}
        <div className="languages__grid">
          {languages.map((lang, i) => (
            <LanguageCard key={lang.id} lang={lang} delay={i * 70} />
          ))}

          <div
            className="languages__tile reveal"
            style={{ "--reveal-delay": "420ms" } as React.CSSProperties}
          >
            <span className="languages__tile-mark" aria-hidden="true">
              ✳
            </span>
            <div>
              <h3 className="languages__tile-title">
                Нужен язык, которого нет в списке?
              </h3>
              <p className="languages__tile-text">
                Напишите нам — подберём преподавателя под ваш запрос и формат
                занятий.
              </p>
            </div>
            <LinkAction href="#trial" light>
              Оставить заявку
            </LinkAction>
          </div>
        </div>
      </div>
    </section>
  );
}
