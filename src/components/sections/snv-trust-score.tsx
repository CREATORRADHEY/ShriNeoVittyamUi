import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------- ring maths */

const SCORE = 68; // illustrative demonstration value only
const SIZE = 280;
const C = SIZE / 2;
const R = 104;
const STROKE = 14;
const CIRC = 2 * Math.PI * R;
const DURATION = 950;

const BANDS = [
  { from: 0, to: 40, color: "var(--band-low)" },
  { from: 40, to: 70, color: "var(--band-mid)" },
  { from: 70, to: 100, color: "var(--band-high)" },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const point = (value: number, radius: number) => {
  const angle = ((value / 100) * 360 - 90) * (Math.PI / 180);
  return { x: C + radius * Math.cos(angle), y: C + radius * Math.sin(angle) };
};

/* ------------------------------------------------------------------- icons */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
  className: "size-[18px] shrink-0",
};

const SIGNALS = [
  {
    label: "UPI & bank activity",
    icon: (
      <svg {...iconProps}>
        <path d="M4 8.5h13M14.5 6l2.5 2.5-2.5 2.5M20 15.5H7M9.5 13 7 15.5 9.5 18" />
      </svg>
    ),
  },
  {
    label: "Utility & mobile bills",
    icon: (
      <svg {...iconProps}>
        <path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z" />
        <path d="M9 8h6M9 12h6M9 15.5h3.5" />
      </svg>
    ),
  },
  {
    label: "Business cash flow",
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 20h17M6.5 20v-5M11 20v-9M15.5 20v-6M20 20V7" />
      </svg>
    ),
  },
  {
    label: "Repayment history",
    icon: (
      <svg {...iconProps}>
        <path d="M4 12a8 8 0 1 1 2.6 5.9" />
        <path d="M4 17.5V12h5.5" />
        <path d="M12 8.5V12l2.5 1.6" />
      </svg>
    ),
  },
];

function LockIcon() {
  return (
    <svg {...iconProps} className="size-4 shrink-0">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V7.75a4 4 0 0 1 8 0v2.75" />
    </svg>
  );
}

/* ------------------------------------------------------------------- ring */

function TrustScoreRing({ progress }: { progress: number }) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`SNV Trust Score illustration. Illustrative SNV Trust Score of ${SCORE} on a 0 to 100 scale.`}
      className="w-[250px] max-w-full sm:w-[280px] lg:w-[320px]"
    >
      {/* closed track — the ring is never an open gauge */}
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="var(--color-ink-foreground)"
        strokeOpacity={0.12}
        strokeWidth={STROKE}
      />

      {BANDS.map((band) => {
        const span = band.to - band.from;
        const shown = Math.min(Math.max(progress - band.from, 0), span);
        if (shown <= 0) return null;
        return (
          <circle
            key={band.from}
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke={band.color}
            strokeWidth={STROKE}
            strokeLinecap="butt"
            strokeDasharray={`${(shown / 100) * CIRC} ${CIRC}`}
            transform={`rotate(${(band.from / 100) * 360 - 90} ${C} ${C})`}
          />
        );
      })}

      {/* boundary markers */}
      {[0, 40, 70].map((value) => {
        const { x, y } = point(value, R + 26);
        return (
          <text
            key={value}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--color-brand-300)"
            fontFamily="var(--font-mono)"
            fontSize={12}
          >
            {value}
          </text>
        );
      })}

      {/* indicator — appears only once progress reaches the score */}
      {progress >= SCORE - 0.5 ? (
        <g>
          <circle cx={point(SCORE, R).x} cy={point(SCORE, R).y} r={11} fill="var(--color-ivory)" fillOpacity={0.18} />
          <circle cx={point(SCORE, R).x} cy={point(SCORE, R).y} r={5} fill="var(--color-ivory)" />
        </g>
      ) : null}

      {/* centre content */}
      <text
        x={C}
        y={C - 26}
        textAnchor="middle"
        fill="var(--color-brand-300)"
        fontSize={13}
        fontWeight={600}
      >
        SNV Trust Score
      </text>
      <text
        x={C}
        y={C + 14}
        textAnchor="middle"
        fill="var(--color-ink-foreground)"
        fontFamily="var(--font-mono)"
        fontSize={52}
        fontWeight={600}
      >
        {SCORE}
      </text>
      <text
        x={C}
        y={C + 42}
        textAnchor="middle"
        fill="var(--color-brand-300)"
        fontFamily="var(--font-mono)"
        fontSize={12}
      >
        0–100 scale
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- section */

export function SnvTrustScoreSection() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const played = useRef(false);

  // Completed state is the safe default when JS or the observer never runs.
  const [progress, setProgress] = useState(SCORE);
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    if (reduced) return;
    setProgress(0);
    setRevealed(false);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setProgress(SCORE);
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played.current) return;
        played.current = true;
        observer.disconnect();
        setRevealed(true);

        const start = performance.now();
        const step = (now: number) => {
          if (document.hidden) {
            // Skip to the finished state rather than burning frames.
            setProgress(SCORE);
            frame.current = null;
            return;
          }
          const t = Math.min((now - start) / DURATION, 1);
          setProgress(easeOut(t) * SCORE);
          if (t < 1) {
            frame.current = requestAnimationFrame(step);
          } else {
            frame.current = null; // one pass only, no loop
          }
        };
        frame.current = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const reveal = cn(
    "transition-[opacity,transform] duration-[360ms] ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none",
    revealed ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0",
  );

  return (
    <section
      aria-labelledby="snv-trust-score-title"
      className="border-b border-ink-foreground/10 bg-[linear-gradient(105deg,var(--color-navy-deep),var(--color-navy-mid)_58%,var(--color-navy-bright))] text-ink-foreground"
    >
      <div
        ref={ref}
        className="mx-auto grid w-full max-w-[1320px] items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      >
        <div className={reveal}>
          <p className="label-micro text-brand-300">Beyond CIBIL</p>
          <h2
            id="snv-trust-score-title"
            className="editorial mt-4 text-[clamp(1.9rem,3.6vw,2.75rem)] tracking-tight"
          >
            Credit that looks past your
            <br />
            bureau history.
          </h2>
          <p className="mt-5 max-w-[46ch] text-base text-ink-foreground/75">
            Over 400 million Indians and small businesses are financially reliable, yet invisible to
            credit bureaus.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {SIGNALS.map((signal) => (
              <li
                key={signal.label}
                className="flex items-center gap-2.5 rounded-[10px] border border-brand-300/25 bg-ink-foreground/[0.04] px-3.5 py-3 text-sm text-ink-foreground/90"
              >
                <span className="text-brand-300">{signal.icon}</span>
                <span className="min-w-0">{signal.label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 hidden items-center gap-2 text-sm text-ink-foreground/70 lg:flex">
            <span className="text-brand-300">
              <LockIcon />
            </span>
            Encrypted, consent-based, never sold.
          </p>
        </div>

        <div className={cn("flex flex-col items-center", reveal)}>
          <TrustScoreRing progress={reduced ? SCORE : progress} />
          <p className="label-micro mt-5 text-brand-300">Illustrative example</p>
        </div>

        <p className="flex items-center justify-center gap-2 text-sm text-ink-foreground/70 lg:hidden">
          <span className="text-brand-300">
            <LockIcon />
          </span>
          Encrypted, consent-based, never sold.
        </p>
      </div>
    </section>
  );
}
