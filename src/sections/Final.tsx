import { Action } from "../ui/Action";
import { KineticWord } from "../ui/KineticWord";
import { useCycle } from "../lib/hooks";
import { invitations } from "../data/site";
import "./Final.css";

export function Final() {
  const { index, advance } = useCycle(invitations.length, 2400);

  return (
    <section className="final section" id="trial" data-surface="accent">
      <div className="shell">
        <p className="eyebrow">Пробный урок</p>

        <div className="final__word" onMouseEnter={advance} onClick={advance}>
          <KineticWord
            className="final__kinetic"
            word={invitations[index]}
            vocabulary={invitations}
          />
        </div>

        <div className="final__foot">
          <p className="final__text">
            Одно занятие, чтобы услышать свой уровень вслух и решить, ваш это
            способ учиться или нет.
          </p>
          <Action tone="ink" href="#trial">
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
