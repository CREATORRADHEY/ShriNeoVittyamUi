import { useEffect, useRef, useState, type ReactNode } from "react";
import { useI18n } from "@/i18n";
import { homeContent } from "@/content/home-content";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/** Line icons transcribed verbatim from the approved landing reference. */
const STEP_ICONS: ReactNode[] = [
  <svg key="form" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="3.4" y="2.6" width="13.2" height="14.8" rx="2" {...strokeProps} />
    <path d="M6.8 7h6.4M6.8 10.4h6.4M6.8 13.8h3.4" {...strokeProps} />
  </svg>,
  <svg key="match" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="8.8" cy="8.8" r="5.4" {...strokeProps} />
    <path d="M12.8 12.8 17 17" {...strokeProps} />
  </svg>,
  <svg key="doc" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M4.6 2.6h6.6l4.4 4.4v10.4H4.6z" {...strokeProps} />
    <path d="M11.2 2.6V7h4.4M7.4 11h5.2M7.4 14h3.6" {...strokeProps} />
  </svg>,
  <svg key="bank" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M2.6 8.2 10 3.4l7.4 4.8" {...strokeProps} />
    <path d="M4.8 8.6v6.6M8 8.6v6.6M12 8.6v6.6M15.2 8.6v6.6M2.6 17.4h14.8" {...strokeProps} />
  </svg>,
];

/**
 * How it works — four rule-topped steps under a single progress line,
 * matching the approved landing reference (background #EEF3FB, hairline
 * rules #ECE7DD, progress #0051AE) in the site's own navy grading.
 */
export function HowItWorksSection() {
  const { language } = useI18n();
  const content = homeContent(language);
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShown(true);
      setSettled(true);
      return;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true);
      setSettled(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  // Once the sequence has played, drop the entrance animation so hover
  // transforms are never overridden by a lingering fill state.
  useEffect(() => {
    if (!shown || settled) return;
    const timer = setTimeout(() => setSettled(true), 900);
    return () => clearTimeout(timer);
  }, [shown, settled]);

  return (
    <section aria-labelledby="hiw-title" className="w-full bg-[#EEF3FB]">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1320px] px-5 py-[clamp(76px,7vw,100px)] sm:px-8 lg:px-12"
      >
        <div
          className={cn(
            "transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)]",
            shown ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0",
          )}
        >
          <p className="font-mono text-[11px] font-semibold tracking-[0.13em] uppercase text-[#0051AE]">
            {content.hiwEyebrow}
          </p>
          <h2
            id="hiw-title"
            className="font-display mt-4 text-[clamp(30px,3.1vw,42px)] leading-[1.14] font-semibold tracking-[-0.028em] text-[#002B98]"
          >
            {content.hiwTitle}
          </h2>
          <p className="mt-4 max-w-[560px] text-[17.5px] leading-[1.6] text-[#5B657D]">
            {content.hiwLead}
          </p>
        </div>

        <div className="relative mt-[clamp(50px,4.5vw,64px)]">
          {/* single hairline across the four steps, filling once on entrance */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 left-0 hidden h-px overflow-hidden bg-[#ECE7DD] lg:block"
          >
            <span
              className="block h-px origin-left bg-[#0051AE] transition-transform duration-[1100ms] ease-out motion-reduce:transition-none"
              style={{ transform: `scaleX(${shown ? 1 : 0})` }}
            />
          </span>

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.steps.map((step, i) => (
              <li
                key={step.title}
                className={cn(
                  "min-w-0 border-t border-[#ECE7DD] pt-[22px]",
                  !shown && "opacity-0",
                  shown && !settled && "animate-[shrineo-rise_330ms_cubic-bezier(0.2,0,0,1)_both]",
                )}
                style={shown && !settled ? { animationDelay: `${120 + i * 95}ms` } : undefined}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E6F1FB] text-[#0051AE]">
                    {STEP_ICONS[i]}
                  </span>
                  <span className="font-mono text-[12.5px] font-semibold tracking-[0.06em] text-[#B4BDCC]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-[18px] text-[18px] font-semibold tracking-[-0.015em] text-[#002B98]">
                  {step.title}
                </h3>
                <p className="mt-[9px] text-[14.5px] leading-[1.65] text-pretty text-[#5B657D]">
                  {step.body}
                </p>
              </li>

            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
