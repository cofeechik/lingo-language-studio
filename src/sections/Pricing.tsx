import { Action, TextLink } from "../ui/Action";
import { plans } from "../data/site";
import "./Pricing.css";
import { trialHref } from "../lib/cta";

export function Pricing() {
  return (
    <section className="pricing section" id="pricing" data-surface="ink">
      <div className="shell">
        <div className="pricing__head">
          <h2 className="section-title">
            Три формата.
            <br />
            <em>Одна программа</em> внутри.
          </h2>
          <p className="section-note">
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
              <div className="plan__top">
                <h3 className="plan__name">{p.name}</h3>
                {p.featured && <span className="plan__flag">Популярный</span>}
              </div>
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
                  <Action href={trialHref({ tariff: p.key })}>Записаться</Action>
                ) : (
                  <TextLink href={trialHref({ tariff: p.key })}>Записаться</TextLink>
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
