import { useEffect, useRef } from "react";
import { useScrollProgress, prefersReducedMotion } from "../lib/hooks";
import { steps } from "../data/site";
import "./Method.css";

const TICKS = [0, 50, 100];

export function Method() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const stepsRef = useRef<HTMLDivElement>(null);

  /* Each step opens its width axis when it arrives, one at a time. */
  useEffect(() => {
    const root = stepsRef.current;
    if (!root) return;
    const items = Array.from(
      root.querySelectorAll<HTMLElement>(".method__step"),
    );

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }),
      { threshold: 0.4 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="method section" id="method" data-surface="paper">
      <div className="shell" ref={ref}>
        <div className="head">
          <p className="head__eyebrow eyebrow">Как проходит обучение</p>
          <h2 className="statement">
            Не курс на всех.
            <br />
            Маршрут для одного.
          </h2>
          <p className="head__aside">
            Три момента, из которых складывается работа со студией — от первого
            разговора до того дня, когда язык перестаёт быть задачей.
          </p>
        </div>

        <div
          className="method__axis"
          style={{ "--p": progress } as React.CSSProperties}
        >
          <span className="method__axis-fill" />
          {TICKS.map((left, i) => (
            <span
              className="method__tick"
              key={left}
              style={{ left: `${left}%` }}
              data-passed={progress >= i / (TICKS.length - 1) - 0.02}
            />
          ))}
        </div>

        <div className="method__steps" ref={stepsRef}>
          {steps.map((s, i) => (
            <article
              className="method__step"
              key={s.key}
              style={{ "--drop": i } as React.CSSProperties}
            >
              <h3>
                <span className="method__word">{s.lead}</span>
                <span className="method__rest">{s.rest}</span>
              </h3>
              <p className="method__text">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
