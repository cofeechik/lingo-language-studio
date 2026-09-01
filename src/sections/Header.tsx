import { useEffect, useState } from "react";
import { Action } from "../ui/Action";
import "./Header.css";

const NAV = [
  { label: "Языки", href: "#languages" },
  { label: "Обучение", href: "#method" },
  { label: "Направления", href: "#courses" },
  { label: "Преподаватели", href: "#teachers" },
  { label: "Тарифы", href: "#pricing" },
];

export function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <header className={`hdr${stuck ? " hdr--stuck" : ""}`}>
      <div className="shell hdr__bar">
        <a className="hdr__mark" href="#top">
          LINGO<i>.</i>
        </a>

        <nav className="hdr__nav" aria-label="Основная навигация">
          {NAV.map((n) => (
            <a className="hdr__link" key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hdr__right">
          <Action size="sm" href="#trial">
            Пробный урок
          </Action>
          <button
            className="hdr__burger"
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="hdr__menu" id="menu" data-open={open}>
        {NAV.map((n) => (
          <a
            className="hdr__menu-link"
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </a>
        ))}
        <div className="hdr__menu-foot">
          <Action href="#trial" wide>
            Записаться на пробный урок
          </Action>
        </div>
      </div>
    </header>
  );
}
