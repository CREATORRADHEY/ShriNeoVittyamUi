import { useEffect, useRef, useState } from "react";
import { ClipboardList, Landmark, ScrollText, Wallet } from "lucide-react";
import { useI18n } from "@/i18n";
import { homeContent } from "@/content/home-content";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS = [ClipboardList, Landmark, ScrollText, Wallet];

/**
 * How it works — four compact, visually connected cards.
 * Copy is imported verbatim from the approved landing reference
 * (hiwEyebrow / hiwTitle / hiwLead / steps), localized EN + HI.
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
    <section
      aria-labelledby="hiw-title"
      className="bg-gradient-to-b from-background to-surface-warm"
    >
      <div ref={ref} className="container-page py-16 md:py-24">
        <div
          className={cn(
            "max-w-2xl transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)]",
            shown ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0",
          )}
        >
          <p className="label-micro text-primary">{content.hiwEyebrow}</p>
          <h2
            id="hiw-title"
            className="editorial mt-4 text-[clamp(1.9rem,3.6vw,2.75rem)] tracking-tight"
          >
            {content.hiwTitle}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">{content.hiwLead}</p>
        </div>

        <div className="relative mt-12">
          {/* connector — desktop only, fills once, never on tablet rows */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-[46px] right-0 left-0 hidden h-px overflow-hidden bg-border lg:block"
          >
            <span
              className="block h-px origin-left bg-brand-200 transition-transform duration-[800ms] ease-out"
              style={{ transform: `scaleX(${shown ? 1 : 0})` }}
            />
          </span>

          <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.steps.map((step, i) => {
              const Icon = ICONS[i]!;
              return (
                <li
                  key={step.title}
                  className={cn(
                    "group relative min-w-0 rounded-[13px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(0,20,80,0.05)]",
                    "transition-[transform,border-color,box-shadow] duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)]",
                    "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_6px_20px_rgba(0,20,80,0.08)]",
                    !shown && "opacity-0",
                    shown && !settled && "animate-[shrineo-rise_330ms_cubic-bezier(0.2,0,0,1)_both]",
                  )}
                  style={
                    shown && !settled ? { animationDelay: `${120 + i * 95}ms` } : undefined
                  }
                >

                  <div className="flex items-center justify-between gap-3">
                    <span className="num text-sm font-semibold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      aria-hidden
                      className="size-5 shrink-0 stroke-[1.4] text-primary/70 transition-transform duration-[180ms] group-hover:translate-x-px"
                    />
                  </div>
                  <h3 className="mt-4 text-base leading-snug font-semibold tracking-[-0.015em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-sm">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
