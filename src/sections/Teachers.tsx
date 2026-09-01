import { teachers } from "../data/site";
import "./Teachers.css";

export function Teachers() {
  return (
    <section className="teachers section" id="teachers" data-surface="paper">
      <div className="shell">
        <div className="head">
          <p className="head__eyebrow eyebrow">Преподаватели</p>
          <h2 className="statement">
            Язык слышно
            <br />
            в живом человеке.
          </h2>
          <p className="head__aside">
            Занятие ведёт не платформа и не запись, а человек, который слышит,
            где вы сбиваетесь, и умеет это объяснить.
          </p>
        </div>

        <div className="teachers__sheet">
          {teachers.map((t) => (
            <article
              className="teacher"
              key={t.key}
              style={
                {
                  "--ratio": t.ratio,
                  "--offset": `${t.offset}px`,
                } as React.CSSProperties
              }
            >
              <div className="teacher__frame">
                <img
                  src={t.image}
                  alt={`Преподаватель студии Lingo — ${t.name}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="teacher__name">{t.name}</h3>
              <p className="teacher__langs">{t.langs}</p>
              <p className="teacher__role">{t.role}</p>
            </article>
          ))}
        </div>

        <p className="teachers__note">
          Lingo — концепт-бренд, созданный для портфолио. Имена и фотографии на
          этой странице — часть дизайн-макета, а не реальная команда.
        </p>
      </div>
    </section>
  );
}
