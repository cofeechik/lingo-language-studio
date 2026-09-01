import { Action, TextLink } from "../ui/Action";
import { plans } from "../data/site";
import "./Pricing.css";

export function Pricing() {
  return (
    <section className="pricing section" id="pricing">
      <div className="shell">
        <div className="head">
          <p className="head__eyebrow eyebrow">Тарифы</p>
          <h2 className="statement">
            Три формата.
            <br />
            Одна программа внутри.
          </h2>
          <p className="head__aside">
            Отличается не содержание, а то, сколько голосов звучит на занятии —
            и сколько внимания достаётся каждому.
          </p>
        </div>

        <div className="pricing__grid">
          {plans.map((p) => (
            <article
              className={`plan${p.featured ? " plan--featured" : ""}`}
              key={p.key}
            >
              <h3 className="plan__name">{p.name}</h3>
              <p className="plan__line">{p.line}</p>

              <p className="plan__price">
                <span className="plan__figure">{p.price}</span>
                <span className="plan__unit">{p.unit}</span>
              </p>

              <ul className="plan__items">
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="plan__cta">
                {p.featured ? (
                  <Action href="#trial">Записаться</Action>
                ) : (
                  <TextLink href="#trial">Записаться</TextLink>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="pricing__note">
          Значения приведены как часть дизайн-макета: Lingo — вымышленная
          студия, созданная для портфолио, и эти цифры не описывают реальные
          цены.
        </p>
      </div>
    </section>
  );
}
