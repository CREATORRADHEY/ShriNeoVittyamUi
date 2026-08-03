/**
 * ShriNeo motion tokens (mirror of the CSS custom properties in styles.css).
 * Import these instead of hard-coding durations in components.
 */
export const MOTION = {
  instant: 80,
  fast: 140,
  standard: 220,
  moderate: 300,
  slow: 450,
} as const;

export const EASE = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  enter: "cubic-bezier(0, 0, 0.2, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const;

/** Stagger delay for a small group (max five items, 50ms apart). */
export function stagger(index: number, step = 50, max = 5) {
  return Math.min(index, max - 1) * step;
}

import { useEffect, useState } from "react";

/** True when the visitor asked the OS to reduce motion. SSR-safe. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
