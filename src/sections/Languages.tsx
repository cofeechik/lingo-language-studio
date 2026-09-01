import { useCallback, useRef, useState } from "react";
import { TextLink } from "../ui/Action";
import { useRise } from "../lib/hooks";
import { languages } from "../data/site";
import "./Languages.css";

export function Languages() {
  const sectionRef = useRise<HTMLElement>();
  const peekRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  /* The peek image tracks the pointer through CSS vars — no re-render. */
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = peekRef.current;
    if (!el) return;
    el.style.setProperty("--x", `${e.clientX}px`);
    el.style.setProperty("--y", `${e.clientY}px`);
  }, []);

  const active = languages.find((l) => l.id === hovered);

  return (
    <section
      className="langs section"
      id="languages"
      ref={sectionRef}
      onMouseMove={onMove}
    >
      <div className="shell">
        <div className="head">
          <p className="head__eyebrow eyebrow">Языки студии</p>
          <h2 className="statement rise">
            Шесть языков. Один способ<br />
            их наконец услышать.
          </h2>
          <p className="head__aside rise">
            Направление выбирается не по популярности, а по тому, где язык вам
            нужен: в разговоре, в работе, в переезде или в дороге.
          </p>
        </div>

        <ul className="langs__list">
          {languages.map((l) => (
            <li
              className="langs__row"
              key={l.id}
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <p className="langs__name">
                {l.native}
                <span className="langs__hello">{l.hello}</span>
              </p>

              <p className="langs__aside">{l.note}</p>

              <a
                className="langs__link"
                href="#trial"
                aria-label={`${l.ru} язык — записаться на пробный урок`}
                onFocus={() => setHovered(l.id)}
                onBlur={() => setHovered(null)}
              />
            </li>
          ))}
        </ul>

        <div className="langs__foot">
          <p>Не нашли нужный язык? Подберём преподавателя под запрос.</p>
          <TextLink href="#trial">Написать студии</TextLink>
        </div>
      </div>

      <div className="langs__peek" ref={peekRef} data-on={Boolean(active)}>
        {active && (
          <img src={active.image} alt="" loading="lazy" decoding="async" />
        )}
      </div>
    </section>
  );
}
