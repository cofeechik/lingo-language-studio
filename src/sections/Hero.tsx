import { Action, TextLink } from "../ui/Action";
import { KineticWord } from "../ui/KineticWord";
import { LevelScale } from "../ui/LevelScale";
import { useCycle } from "../lib/hooks";
import { greetings } from "../data/site";
import "./Hero.css";
import { trialHref } from "../lib/cta";

const words = greetings.map((g) => g.word);

export function Hero() {
  const { index, advance } = useCycle(greetings.length, 2600);
  const active = greetings[index];

  return (
    <section className="hero section" id="top">
      <div className="shell hero__inner">
        <p className="hero__kicker">LINGO — СТУДИЯ ЯЗЫКОВ</p>

        <div
          className="hero__greeting"
          onMouseEnter={advance}
          onClick={advance}
        >
          <KineticWord
            className="hero__word"
            word={active.word}
            vocabulary={words}
          />
          <p className="hero__lang" key={active.code}>
            <span className="hero__lang-dot" aria-hidden="true" />
            {active.lang}
            <span className="hero__lang-code">{active.code}</span>
          </p>
        </div>

        <h1 className="hero__title">
          Говори на языке,
          <br />
          <em>который тебе нужен.</em>
        </h1>

        <div className="hero__foot">
          <div className="hero__actions">
            <Action href={trialHref()}>Записаться на пробный урок</Action>
            <TextLink href="#languages">Посмотреть языки</TextLink>
          </div>
          <p className="hero__note">
            Шесть языков, живой преподаватель и маршрут, который начинается
            там, где вы находитесь сейчас — а не с первой страницы учебника.
          </p>
        </div>

        <LevelScale
          className="hero__scale"
          left="Начинаем там, где вы сейчас"
          right="Ведём до цели"
        />
      </div>
    </section>
  );
}
