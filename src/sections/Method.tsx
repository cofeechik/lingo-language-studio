import { useScrollProgress } from "../lib/hooks";
import { steps } from "../data/site";
import "./Method.css";

export function Method() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section className="method section" id="method">
      <div className="shell">
        <div className="method__head">
          <h2 className="section-title">
            Не курс на всех.
            <br />
            <em>Маршрут</em> для одного.
          </h2>
          <p className="section-note">
            Три момента, из которых складывается работа со студией — от первого
            разговора до того дня, когда язык перестаёт быть задачей.
          </p>
        </div>

        <div
          className="method__track"
          ref={ref}
          style={{ "--p": progress } as React.CSSProperties}
        >
          <div className="method__rail" aria-hidden="true">
            <span className="method__fill" />
          </div>

          <ol className="method__steps">
            {steps.map((s, i) => {
              const reached = progress >= i / steps.length;
              return (
                <li className="step" key={s.key} data-on={reached}>
                  <span className="step__node" data-on={reached} />
                  <span className="step__n">{s.n}</span>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__rest">{s.rest}</p>
                  <p className="step__text">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
