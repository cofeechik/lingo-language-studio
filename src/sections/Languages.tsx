import { TextLink } from "../ui/Action";
import { useEnter } from "../lib/hooks";
import { languages } from "../data/site";
import "./Languages.css";
import { trialHref } from "../lib/cta";

export function Languages() {
  const sectionRef = useEnter<HTMLElement>();

  return (
    <section className="langs section" id="languages" ref={sectionRef}>
      <div className="shell">
        <div className="langs__head enter">
          <h2 className="section-title">
            Шесть языков.
            <br />
            <em>Один способ</em> их услышать.
          </h2>
          <p className="section-note">
            Направление выбирается не по популярности, а по тому, где язык вам
            нужен: в разговоре, в работе, в переезде или в дороге.
          </p>
        </div>

        <ul className="langs__list">
          {languages.map((l) => (
            <li className="langs__row" key={l.id}>
              <div className="langs__inner">
                <div className="langs__lead">
                  <span className="langs__name">{l.native}</span>
                  <span className="langs__hello">{l.hello}</span>
                  <span className="langs__rule" aria-hidden="true" />
                </div>

                <p className="langs__tags">
                  {l.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </p>
              </div>

              <div className="langs__photo" aria-hidden="true">
                <img src={l.image} alt="" loading="lazy" decoding="async" />
              </div>

              <a
                className="langs__link"
                href={trialHref({ language: l.slug })}
                aria-label={`${l.ru} язык — записаться на пробный урок`}
              />
            </li>
          ))}
        </ul>

        <p className="langs__foot">
          <TextLink href={trialHref()}>
            Нужен язык, которого здесь нет — напишите студии
          </TextLink>
        </p>
      </div>
    </section>
  );
}
