import { useEffect, useState } from "react";
import { Button, LinkAction } from "../ui/Button";
import "./Header.css";

const NAV = [
  { label: "Языки", href: "#languages" },
  { label: "Обучение", href: "#method" },
  { label: "Преподаватели", href: "#teachers" },
  { label: "Тарифы", href: "#pricing" },
];

export function Header() {
  const [pinned, setPinned] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the drawer once the viewport is wide enough for the full nav.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={`header${pinned ? " header--pinned" : ""}`}>
      <div className="shell header__inner">
        <a className="header__brand" href="#top" aria-label="LINGO — на главную">
          <span className="header__wordmark">
            Lingo<span className="header__wordmark-dot">.</span>
          </span>
          <span className="header__brand-sub">Language Studio</span>
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {NAV.map((item) => (
            <a className="header__link" key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href="#trial">
            Связаться
          </a>
          <Button size="sm" href="#trial">
            Пробный урок
          </Button>
          <button
            className="header__burger"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="header__drawer" id="mobile-menu" data-open={open}>
        {NAV.map((item, i) => (
          <a
            className="header__drawer-link"
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
            <span className="header__drawer-index">
              {String(i + 1).padStart(2, "0")}
            </span>
          </a>
        ))}
        <div className="header__drawer-footer">
          <Button href="#trial" block>
            Записаться на пробный урок
          </Button>
          <LinkAction href="#languages">Посмотреть языки</LinkAction>
        </div>
      </div>
    </header>
  );
}
