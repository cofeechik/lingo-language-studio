import { useEffect, useRef, useState } from "react";
import "./KineticWord.css";

interface Props {
  /** The word shown right now. */
  word: string;
  /** Every word this slot will ever hold — reserves the box so nothing jumps. */
  vocabulary: string[];
  className?: string;
}

/** Splitting a word into per-letter boxes drops kerning, so the animated
 *  layers are slightly wider than the same word set as one run. The ghost
 *  that reserves the box has to be split the same way or the last letter
 *  ends up clipped. */
function Letters({
  word,
  mode,
}: {
  word: string;
  mode: "in" | "out" | "ghost";
}) {
  return (
    <span className={`kw__layer kw__layer--${mode}`} aria-hidden="true">
      {Array.from(word).map((ch, i) => (
        <span
          className="kw__ch"
          key={`${ch}-${i}`}
          style={{ "--i": i } as React.CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/**
 * Swaps one word for another letter by letter. Screen readers get the plain
 * current word; the animated layers are hidden from them.
 */
export function KineticWord({ word, vocabulary, className = "" }: Props) {
  const [current, setCurrent] = useState(word);
  const [previous, setPrevious] = useState<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setPrevious(current);
    setCurrent(word);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word]);

  const longest = vocabulary.reduce(
    (a, b) => (b.length > a.length ? b : a),
    vocabulary[0] ?? word,
  );

  return (
    <span className={`kw ${className}`.trim()} aria-label={current} role="text">
      <Letters word={longest} mode="ghost" />
      {previous && previous !== current && (
        <Letters key={`out-${previous}`} word={previous} mode="out" />
      )}
      <Letters key={`in-${current}`} word={current} mode="in" />
    </span>
  );
}
