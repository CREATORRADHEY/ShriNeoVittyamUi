import { useEffect, useRef, useState, type ReactNode } from "react";

import { useI18n } from "@/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------- ring maths */

const SIZE = 320;
const C = SIZE / 2;
const R = 118;
const STROKE = 13;
const GAP = 1.1; // hairline separation between bands, as in the reference
const DURATION = 500; // fast and smooth recalculation animation

const BANDS = [
  { from: 0, to: 40, color: "var(--band-low)" },
  { from: 40, to: 70, color: "var(--band-mid)" },
  { from: 70, to: 100, color: "var(--band-high)" },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const point = (value: number, radius: number) => {
  const angle = (value / 100) * Math.PI * 2 - Math.PI / 2;
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

type Signal = {
  key: string;
  descKey: string;
  icon: ReactNode;
  score: number;
};

const SIGNALS: Signal[] = [
  {
    key: "snv.signal.upi",
    descKey: "snv.signal.upi.desc",
    score: 78,
    icon: (
      <svg {...iconProps}>
        <path d="M4 8.5h13M14.5 6l2.5 2.5-2.5 2.5M20 15.5H7M9.5 13 7 15.5 9.5 18" />
      </svg>
    ),
  },
  {
    key: "snv.signal.bills",
    descKey: "snv.signal.bills.desc",
    score: 70,
    icon: (
      <svg {...iconProps}>
        <path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z" />
        <path d="M9 8h6M9 12h6M9 15.5h3.5" />
      </svg>
    ),
  },
  {
    key: "snv.signal.cashflow",
    descKey: "snv.signal.cashflow.desc",
    score: 85,
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 20h17M6.5 20v-5M11 20v-9M15.5 20v-6M20 20V7" />
      </svg>
    ),
  },
  {
    key: "snv.signal.repayment",
    descKey: "snv.signal.repayment.desc",
    score: 92,
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

function TrustScoreRing({
  progress,
  score,
  label,
}: {
  progress: number;
  score: number;
  label: string;
}) {
  const indicator = point(score, R);
  const shownMax = progress;

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={label}
      className="w-[250px] max-w-full overflow-visible sm:w-[290px] lg:w-[330px]"
    >
      {/* closed track — never an open gauge */}
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={STROKE} />

      {BANDS.map((band) => {
        const a = band.from + GAP;
        const b = band.to - GAP;
        if (shownMax <= a + 0.001) return null;
        const end = Math.min(b, shownMax);
        const p1 = point(a, R);
        const p2 = point(end, R);
        const large = (end - a) / 100 > 0.5 ? 1 : 0;
        return (
          <path
            key={band.from}
            d={`M${p1.x} ${p1.y} A${R} ${R} 0 ${large} 1 ${p2.x} ${p2.y}`}
            fill="none"
            stroke={band.color}
            strokeWidth={STROKE}
            strokeLinecap="butt"
          />
        );
      })}

      {/* hairline edges */}
      <circle cx={C} cy={C} r={R - STROKE / 2} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={1} />
      <circle cx={C} cy={C} r={R + STROKE / 2} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={1} />

      {/* boundary markers */}
      {[0, 40, 70].map((value) => {
        const inner = point(value, R - STROKE / 2 - 5);
        const outer = point(value, R + STROKE / 2 + 6);
        const label = point(value, R + STROKE / 2 + 20);
        return (
          <g key={value}>
            <line
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(255,255,255,0.34)"
              strokeWidth={1.2}
            />
            <text
              x={label.x}
              y={label.y + 4}
              textAnchor="middle"
              fill="rgba(185,198,232,0.78)"
              fontFamily="Poppins, sans-serif"
              fontSize={11}
              fontWeight={500}
            >
              {value}
            </text>
          </g>
        );
      })}

      {/* indicator — appears only once the sweep reaches the score */}
      <g opacity={shownMax >= score - 1 ? 1 : 0}>
        <circle
          cx={indicator.x}
          cy={indicator.y}
          r={8.5}
          fill="none"
          stroke="rgba(251,249,244,0.32)"
          strokeWidth={6}
        />
        <circle cx={indicator.x} cy={indicator.y} r={6} fill="#FBF9F4" />
      </g>

      {/* centre content — stable and readable throughout */}
      <text x={C} y={C - 30} textAnchor="middle" fill="#B9C6E8" fontSize={14} fontWeight={600}>
        SNV Trust Score
      </text>
      <text
        x={C}
        y={C + 22}
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Poppins, sans-serif"
        fontSize={60}
        fontWeight={600}
      >
        {Math.round(shownMax)}
      </text>
      <ScaleLabel />
    </svg>
  );
}

function ScaleLabel() {
  const { t } = useI18n();
  return (
    <text
      x={C}
      y={C + 46}
      textAnchor="middle"
      fill="rgba(185,198,232,0.8)"
      fontFamily="Poppins, sans-serif"
      fontSize={11.5}
      fontWeight={500}
    >
      {t("snv.scale")}
    </text>
  );
}

/* ---------------------------------------------------------------- section */

export function SnvTrustScoreSection() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  // Active signal state (starts with UPI activity)
  const [activeIdx, setActiveIdx] = useState(0);

  // Animate score changes smoothly using a simple timer
  const [progress, setProgress] = useState(SIGNALS[0]!.score);
  const [targetScore, setTargetScore] = useState(SIGNALS[0]!.score);
  const [revealed, setRevealed] = useState(true);

  // Set the target score based on active signal selection
  useEffect(() => {
    setTargetScore(SIGNALS[activeIdx]!.score);
  }, [activeIdx]);

  // Smooth rAF-based value interpolation when target score changes
  useEffect(() => {
    if (reduced) {
      setProgress(targetScore);
      return;
    }

    let frameId: number;
    const startValue = progress;
    const diff = targetScore - startValue;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      setProgress(startValue + easeOut(t) * diff);
      if (t < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setProgress(targetScore);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [targetScore, reduced]);

  // Initial scroll reveal setup
  useEffect(() => {
    if (reduced) return;
    setProgress(0);
    setRevealed(false);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setProgress(SIGNALS[activeIdx]!.score);
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played.current) return;
        played.current = true;
        observer.disconnect();
        setRevealed(true);
        setTargetScore(SIGNALS[activeIdx]!.score);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, activeIdx]);

  const reveal = cn(
    "transition-[opacity,transform] duration-[360ms] ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none",
    revealed ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0",
  );

  return (
    <section
      aria-labelledby="snv-trust-score-title"
      className="w-full bg-[linear-gradient(100deg,#001A5C_0%,#00246F_48%,#002B98_100%)] text-white"
    >
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1320px] px-5 py-[clamp(70px,6.2vw,92px)] sm:px-8 lg:px-12"
      >
        <div className="grid items-center gap-9 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={reveal}>
            <p className="font-mono text-[11px] font-semibold tracking-[0.13em] uppercase text-[#B9C6E8]">
              {t("snv.eyebrow")}
            </p>
            <h2
              id="snv-trust-score-title"
              className="font-display mt-[18px] text-[clamp(30px,3.1vw,42px)] leading-[1.14] font-semibold tracking-[-0.028em] text-pretty text-white"
            >
              {t("snv.title.line1")} {t("snv.title.line2")}
            </h2>
            <p className="mt-5 max-w-[480px] text-[17.5px] leading-[1.6] text-pretty text-[#B9C6E8]">
              {t("snv.body")}
            </p>

            {/* Interactive Grid: click to choose signal and change score dynamically */}
            <ul className="mt-[30px] grid grid-cols-2 gap-2.5">
              {SIGNALS.map((signal, i) => {
                const isActive = activeIdx === i;
                return (
                  <li key={signal.key}>
                    <button
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      style={{ transitionDelay: revealed ? `${120 + i * 70}ms` : "0ms" }}
                      className={cn(
                        "group flex w-full items-center gap-[11px] rounded-[10px] border px-[15px] py-[13px] text-left text-[14px] font-medium text-white",
                        "transition-[transform,opacity,background-color,border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.2,0,0,1)] will-change-transform",
                        revealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                        isActive
                          ? "border-saffron bg-white/[0.12] shadow-[0_0_15px_-3px_rgba(239,183,62,0.4)]"
                          : "border-white/15 bg-white/[0.05] hover:border-white/30 hover:bg-white/[0.1] hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.75)]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-[7px] text-[#C8D5F0] transition-[transform,background-color] duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
                          isActive ? "bg-saffron text-navy" : "bg-white/10 group-hover:scale-[1.06] group-hover:bg-white/[0.18]"
                        )}
                      >
                        {signal.icon}
                      </span>
                      <span className="min-w-0">{t(signal.key)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Dynamic Signal Description Panel (Matches choice card interactivity style) */}
            <div className="mt-5 rounded-[12px] border border-white/10 bg-white/[0.03] p-4 text-[14px] leading-relaxed text-[#B9C6E8] transition-all duration-300">
              <p className="font-semibold text-white mb-1">
                {t(SIGNALS[activeIdx]!.key)}:
              </p>
              <p>{t(SIGNALS[activeIdx]!.descKey)}</p>
            </div>
          </div>

          <div className={cn("flex flex-col items-center gap-[18px] p-2", reveal)}>
            <TrustScoreRing
              progress={progress}
              score={targetScore}
              label={t("snv.ring.aria")}
            />
            <span className="font-mono text-[11.5px] font-medium tracking-[0.1em] uppercase text-[rgba(185,198,232,0.85)]">
              {t("snv.illustrative")}
            </span>
          </div>
        </div>

        <p className="mt-[30px] flex items-start gap-2.5 text-[14px] leading-[1.6] text-white/72">
          <span className="mt-0.5 text-white/60">
            <LockIcon />
          </span>
          {t("snv.reassurance")}
        </p>
      </div>
    </section>
  );
}
