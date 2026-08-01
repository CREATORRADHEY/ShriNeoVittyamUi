import { useEffect, useRef } from "react";

/**
 * Scroll-reveal for elements marked with `.reveal` inside the returned ref.
 * GSAP + ScrollTrigger are loaded lazily on the client only, so SSR and the
 * initial bundle stay untouched. Honors prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const scope = useRef<T | null>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (!targets.length) return;

    if (reduced) {
      targets.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        targets.forEach((el) => {
          const delay = Number(el.dataset["revealDelay"] ?? 0);
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        });
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return scope;
}
