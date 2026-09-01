import { Action } from "../ui/Action";
import "./Final.css";
import { trialHref } from "../lib/cta";

export function Final() {
  return (
    <section className="final section" id="trial" data-surface="primary">
      <div className="shell">
        <p className="final__word">¿Empezamos?</p>

        <div className="final__foot">
          <p className="final__text">
            Одно занятие, чтобы услышать свой уровень и понять, подходит ли вам
            этот способ учиться.
          </p>
          <Action tone="ink" href={trialHref()}>
            Записаться на пробный урок
          </Action>
        </div>
      </div>

      <div className="final__footer">
        <div className="shell final__footer-inner">
          <span className="final__mark">LINGO.</span>
          <span>Концепт-проект для портфолио — вымышленный бренд</span>
          <span>2026</span>
        </div>
      </div>
    </section>
  );
}
