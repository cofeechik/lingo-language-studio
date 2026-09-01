import { useEffect, useRef, useState } from "react";
import { LEVELS } from "../data/site";
import "./LevelScale.css";

interface Props {
  /** How far along the scale the accent rail is drawn, 0 → 1. */
  progress?: number;
  left?: string;
  right?: string;
  className?: string;
}

export function LevelScale({
  progress = 0.42,
  left,
  right,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reachedUpTo = Math.round(progress * (LEVELS.length - 1));

  return (
    <div
      className={`scale ${shown ? "in" : ""} ${className}`.trim()}
      ref={ref}
      style={{ "--p": progress } as React.CSSProperties}
    >
      {(left || right) && (
        <p className="scale__caption eyebrow">
          <span>{left}</span>
          <span>{right}</span>
        </p>
      )}

      <div className="scale__rail">
        <span className="scale__fill" />
      </div>

      <ol className="scale__marks">
        {LEVELS.map((lvl, i) => (
          <li
            className="scale__mark"
            key={lvl}
            data-reached={i <= reachedUpTo}
            style={{ "--k": i / (LEVELS.length - 1) } as React.CSSProperties}
          >
            {lvl}
          </li>
        ))}
      </ol>
    </div>
  );
}
