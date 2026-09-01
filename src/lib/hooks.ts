import { useCallback, useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Adds `.in` to every `.rise` inside the ref once it enters the viewport.
 * Used only on section statements — not on every element on the page.
 */
export function useRise<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(".rise"));
    if (targets.length === 0) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}

/**
 * Cycles an index on an interval. Pauses while the tab is hidden and can be
 * advanced by hand — the hero word answers to hover.
 */
export function useCycle(length: number, ms: number, enabled = true) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  const stop = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = undefined;
  }, []);

  const start = useCallback(() => {
    stop();
    if (!enabled || length < 2) return;
    timer.current = window.setInterval(
      () => setIndex((i) => (i + 1) % length),
      ms,
    );
  }, [enabled, length, ms, stop]);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % length);
    start();
  }, [length, start]);

  useEffect(() => {
    start();
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [start, stop]);

  return { index, advance };
}

/** Vertical scroll progress of an element through the viewport, 0 → 1. */
export function useScrollProgress<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const span = r.height + window.innerHeight * 0.6;
      const passed = window.innerHeight * 0.8 - r.top;
      setProgress(Math.min(1, Math.max(0, passed / span)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}
