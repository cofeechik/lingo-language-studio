import { Arrow } from "../ui/Action";
import { courses } from "../data/site";
import "./Courses.css";

export function Courses() {
  return (
    <section className="courses section" id="courses">
      <div className="shell">
        <div className="head">
          <p className="head__eyebrow eyebrow">Направления</p>
          <h2 className="statement">
            Язык нужен не вообще.
            <br />А для чего-то.
          </h2>
          <p className="head__aside">
            Выберите повод — программа, лексика и темп занятий соберутся вокруг
            него. Направление можно поменять по дороге.
          </p>
        </div>
      </div>

      <div className="courses__grid">
        {courses.map((c) => (
          <article className="courses__cell" key={c.key}>
            <h3 className="courses__title">{c.title}</h3>
            <p className="courses__text">{c.text}</p>
            <Arrow className="courses__go" />
            <a
              className="courses__link"
              href="#trial"
              aria-label={`${c.title} — записаться на пробный урок`}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
