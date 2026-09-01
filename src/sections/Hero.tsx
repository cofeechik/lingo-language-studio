import { Action, TextLink } from "../ui/Action";
import { KineticWord } from "../ui/KineticWord";
import { LevelScale } from "../ui/LevelScale";
import { useCycle } from "../lib/hooks";
import { greetings } from "../data/site";
import "./Hero.css";

const words = greetings.map((g) => g.word);

export function Hero() {
  const { index, advance } = useCycle(greetings.length, 2600);
  const active = greetings[index];

  return (
    <section className="hero section" id="top">
      <div className="shell hero__inner">
        <div className="hero__meta eyebrow">
          <span>Lingo — студия языков</span>
          <span className="hero__meta-langs" aria-hidden="true">
            {greetings.map((g) => (
              <span key={g.code} data-live={g.code === active.code}>
                {g.code}
              </span>
            ))}
          </span>
        </div>

        <div
          className="hero__greeting"
          onMouseEnter={advance}
          onClick={advance}
        >
          <KineticWord
            className="hero__kinetic"
            word={active.word}
            vocabulary={words}
          />
          <p className="hero__native eyebrow" key={active.code}>
            <b>{active.lang}</b>
            <span>{active.code}</span>
          </p>
        </div>

        <h1 className="hero__title">
          Говори на языке, <em>который тебе нужен.</em>
        </h1>

        <div className="hero__foot">
          <div className="hero__actions">
            <Action href="#trial">Записаться на пробный урок</Action>
            <TextLink href="#languages">Посмотреть языки</TextLink>
          </div>
          <p className="hero__note">
            Шесть языков, живой преподаватель и маршрут, который начинается
            там, где вы находитесь сейчас — а не с первой страницы учебника.
          </p>
        </div>

        <LevelScale
          className="hero__scale"
          progress={0.4}
          left="Начинаем там, где вы сейчас"
          right="Ведём до цели"
        />
      </div>
    </section>
  );
}
