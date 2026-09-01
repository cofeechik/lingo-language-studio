import { Arrow } from "../ui/Action";
import { courses } from "../data/site";
import "./Courses.css";

export function Courses() {
  return (
    <section className="courses section" id="courses">
      <div className="shell">
        <div className="courses__head">
          <h2 className="section-title">
            Язык нужен не вообще.
            <br />А <em>для чего-то</em>.
          </h2>
          <p className="section-note">
            Выберите повод — программа, лексика и темп занятий соберутся вокруг
            него. Направление можно поменять по дороге.
          </p>
        </div>

        <div className="courses__grid">
          {courses.map((c) => (
            <article
              className={`cell${c.tone === "secondary" ? " cell--secondary" : ""}`}
              key={c.key}
            >
              <h3 className="cell__title">{c.title}</h3>
              <p className="cell__text">{c.text}</p>
              <Arrow className="cell__go" />
              <a
                className="cell__link"
                href="#trial"
                aria-label={`${c.title} — записаться на пробный урок`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
