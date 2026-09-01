import { useEffect, useRef } from "react";
import { Button, LinkAction } from "../ui/Button";
import { useReveal } from "../../hooks/useReveal";
import { marqueeItems } from "../../data/languages";
import "./Hero.css";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=75";

/** Descriptive promises — deliberately non-statistical (LINGO is a concept brand). */
const META = [
  { mark: "—", text: "Индивидуально и в мини-группах" },
  { mark: "—", text: "Онлайн и в студии" },
  { mark: "—", text: "Программа под вашу цель" },
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const CURRENT_LEVEL = 2; // demo state for the level card

export function Hero() {
  const sectionRef = useReveal<HTMLElement>();
  const imgRef = useRef<HTMLImageElement>(null);

  /* Light parallax on the hero photo — a few dozen pixels, nothing more. */
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const shift = Math.min(window.scrollY * 0.06, 34);
      img.style.setProperty("--hero-shift", `${-shift}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="shell hero__inner">
        {/* ---------- Copy ---------- */}
        <div className="hero__copy">
          <p className="hero__eyebrow label reveal">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Lingo — студия языков
          </p>

          <h1
            className="hero__title display reveal"
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            Учим языки так,
            <br />
            чтобы вы{" "}
            <span className="hero__accent">
              заговорили
              <svg
                className="hero__accent-stroke"
                viewBox="0 0 320 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8.5C58 3.5 128 1.8 196 3.2c42 .9 82 2.9 122 5.6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p
            className="hero__lead lead reveal"
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            Разговорная практика с первого занятия, живой преподаватель и
            понятный маршрут — от вашего уровня до цели, ради которой вы
            начинаете.
          </p>

          <div
            className="hero__actions reveal"
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            <Button size="lg" href="#trial" withArrow>
              Записаться на пробный урок
            </Button>
            <LinkAction href="#languages">Подобрать программу</LinkAction>
          </div>

          <ul
            className="hero__meta reveal"
            style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
          >
            {META.map((item) => (
              <li className="hero__meta-item" key={item.text}>
                <span className="hero__meta-mark" aria-hidden="true">
                  {item.mark}
                </span>
                <span className="hero__meta-text">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Media stack ---------- */}
        <div
          className="hero__media reveal"
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        >
          <div className="hero__frame" aria-hidden="true" />

          <figure className="hero__figure grain">
            <img
              className="hero__img"
              ref={imgRef}
              src={HERO_IMAGE}
              alt="Студентка занимается языком за столом с учебником и ноутбуком"
              loading="eager"
              decoding="async"
            />
            <figcaption className="hero__caption">
              Lingo Studio — Concept
            </figcaption>
          </figure>

          <span className="hero__badge">
            <span aria-hidden="true">✳</span>
            Первый урок — знакомство
          </span>

          {/* Demo lesson card — illustrative UI state, not real data */}
          <div className="hero__card">
            <div className="hero__card-top">
              <span className="hero__card-lang">Français</span>
              <span className="hero__card-tag">Маршрут</span>
            </div>

            <div
              className="hero__levels"
              role="img"
              aria-label={`Пример маршрута: текущий уровень ${LEVELS[CURRENT_LEVEL]}, цель ${LEVELS[LEVELS.length - 1]}`}
            >
              {LEVELS.map((lvl, i) => (
                <span
                  className="hero__level"
                  key={lvl}
                  data-on={i < CURRENT_LEVEL}
                  data-current={i === CURRENT_LEVEL}
                  style={{ animationDelay: `${700 + i * 90}ms` }}
                />
              ))}
            </div>

            <div className="hero__card-scale">
              <span>{LEVELS[0]}</span>
              <span>{LEVELS[LEVELS.length - 1]}</span>
            </div>

            <p className="hero__card-note">
              Уровень определяем на первом занятии — и строим программу от него.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Language marquee ---------- */}
      <div className="hero__marquee" aria-hidden="true">
        {[0, 1].map((track) => (
          <div className="hero__marquee-track" key={track}>
            {marqueeItems.map((lang) => (
              <span className="hero__marquee-item" key={`${track}-${lang}`}>
                {lang}
                <span className="hero__marquee-sep">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="visually-hidden">
        Языки студии: {marqueeItems.join(", ")}.
      </p>
    </section>
  );
}
