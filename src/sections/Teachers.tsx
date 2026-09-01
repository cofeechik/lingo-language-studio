import { teachers } from "../data/site";
import "./Teachers.css";

export function Teachers() {
  return (
    <section className="teachers section" id="teachers">
      <div className="shell">
        <div className="teachers__head">
          <h2 className="section-title">
            Язык слышно
            <br />в <em>живом человеке</em>.
          </h2>
          <p className="section-note">
            Занятие ведёт не платформа и не запись, а человек, который слышит,
            где вы сбиваетесь, и умеет это объяснить.
          </p>
        </div>

        <div className="teachers__sheet">
          {teachers.map((t) => (
            <article
              className={`tch tch--${t.size}`}
              key={t.key}
              data-key={t.key}
              style={{ "--ratio": t.ratio } as React.CSSProperties}
            >
              <div className="tch__frame">
                <img
                  src={t.image}
                  alt={`Преподаватель студии Lingo — ${t.name}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="tch__meta">
                <h3 className="tch__name">{t.name}</h3>
                <p className="tch__langs">{t.langs}</p>
                <p className="tch__role">{t.role}</p>
              </div>
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
