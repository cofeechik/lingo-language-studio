import { useEffect, useRef, useState } from "react";
import { LEVELS, LEVEL_REACHED } from "../data/site";
import "./LevelScale.css";

interface Props {
  left?: string;
  right?: string;
  className?: string;
}

export function LevelScale({ left, right, className = "" }: Props) {
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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The rail stops in the middle of the last reached label.
  const progress = (LEVEL_REACHED + 0.5) / LEVELS.length;

  return (
    <div
      className={`scale ${shown ? "in" : ""} ${className}`.trim()}
      ref={ref}
      style={{ "--p": progress } as React.CSSProperties}
    >
      <ol className="scale__marks">
        {LEVELS.map((lvl, i) => (
          <li
            className="scale__mark"
            key={lvl}
            data-reached={i <= LEVEL_REACHED}
            data-current={i === LEVEL_REACHED}
          >
            {lvl}
          </li>
        ))}
      </ol>

      <div className="scale__rail">
        <span className="scale__fill" />
      </div>

      {(left || right) && (
        <p className="scale__caption">
          <span>{left}</span>
          <span>{right}</span>
        </p>
      )}
    </div>
  );
}
