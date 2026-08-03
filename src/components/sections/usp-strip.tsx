import { Link } from "@tanstack/react-router";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type SVGProps,
} from "react";

import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ icons
   One line-icon family: 22px box, 1.5 stroke, currentColor, no fills. */

const svg: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

/** Central platform node linked to three neutral institution nodes. */
function PlatformNetworkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svg} {...props}>
      <rect x="9" y="9.5" width="6" height="5" rx="1.2" />
      <path d="M12 9.5V6.5M6.5 17.5 9.6 14M17.5 17.5 14.4 14" />
      <path d="M9.5 6.5h5M4 20.5v-2.2l2.5-1.4 2.5 1.4v2.2M15 20.5v-2.2l2.5-1.4 2.5 1.4v2.2" />
      <path d="M4 20.5h5M15 20.5h5M9.5 3.5h5v3h-5z" />
    </svg>
  );
}

/** Four connected workflow stages on a structured path. */
function WorkflowStagesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svg} {...props}>
      <rect x="2.75" y="4.5" width="5" height="5" rx="1.2" />
      <rect x="16.25" y="4.5" width="5" height="5" rx="1.2" />
      <rect x="16.25" y="14.5" width="5" height="5" rx="1.2" />
      <rect x="2.75" y="14.5" width="5" height="5" rx="1.2" />
      <path d="M7.75 7h8.5M18.75 9.5v5M16.25 17h-8.5M5.25 14.5v-5" />
    </svg>
  );
}

/** Payment moving between two parties with a confirmation marker. */
function RepaymentFlowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svg} {...props}>
      <rect x="2.5" y="7.5" width="5.5" height="9" rx="1.4" />
      <rect x="16" y="7.5" width="5.5" height="9" rx="1.4" />
      <path d="M8.75 10.25h6.5M15.25 10.25l-1.9-1.7M15.25 13.75h-6.5M8.75 13.75l1.9 1.7" />
      <path d="m10.4 19.9 1.3 1.3 2.6-2.7" />
    </svg>
  );
}

/** Status timeline with a timestamp indicator. */
function StatusTimelineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svg} {...props}>
      <path d="M4.5 5.5h9M4.5 12h6M4.5 18.5h5" />
      <circle cx="2.6" cy="5.5" r="0.9" />
      <circle cx="2.6" cy="12" r="0.9" />
      <circle cx="2.6" cy="18.5" r="0.9" />
      <circle cx="17.5" cy="15.5" r="4.5" />
      <path d="M17.5 13.4v2.3l1.5 1" />
    </svg>
  );
}

/* -------------------------------------------------------------------- data */

type Usp = {
  id: string;
  title: string;
  copy: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  to?: "/for-lenders" | "/how-it-works";
};

/* Coverage across every bank and NBFC is not formally approved, so the
   strip publishes the verified "multiple" wording. */
const USPS: Usp[] = [
  {
    id: "platform",
    title: "One platform for multiple banks and NBFCs",
    copy: "\n",
    Icon: PlatformNetworkIcon,
    to: "/for-lenders",
  },
  {
    id: "management",
    title: "End-to-end management",
    copy: "Manage applications from enquiry to disbursal.",
    Icon: WorkflowStagesIcon,
    to: "/how-it-works",
  },
  {
    id: "repayments",
    title: "Real-time repayments",
    copy: "Track repayment confirmations as they are received.",
    Icon: RepaymentFlowIcon,
  },
  {
    id: "updates",
    title: "Real-time updates",
    copy: "Follow application and loan-status changes clearly.",
    Icon: StatusTimelineIcon,
  },
];

const HOLD = 1600; // active duration per item
const PAUSE = 750; // extra rest after the fourth item
const STAGGER = 120; // entrance delay between items
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* ------------------------------------------------------------------ strip */

export function UspStrip() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLUListElement>(null);
  const timer = useRef<number | null>(null);
  const resume = useRef<number | null>(null);

  const [animatable, setAnimatable] = useState(false);
  const [entered, setEntered] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [held, setHeld] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  // Only opt into entrance motion once JS has hydrated, so the markup is
  // fully visible when JavaScript never runs.
  useIsoLayoutEffect(() => {
    if (!reduced) setAnimatable(true);
  }, [reduced]);

  // Viewport observation: one-time entrance plus loop gating.
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setEntered(true);
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pause while the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const paused = reduced || !entered || !inView || !visible || held !== null;
  const current = held ?? active;

  // A single advance timer for the emphasis loop.
  useEffect(() => {
    if (paused) return;
    const first = active === 0 && !timer.current;
    const delay = (active === USPS.length - 1 ? HOLD + PAUSE : HOLD) + (first ? 800 : 0);
    timer.current = window.setTimeout(() => {
      setActive((index) => (index + 1) % USPS.length);
    }, delay);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = null;
    };
  }, [active, paused]);

  useEffect(
    () => () => {
      if (resume.current) window.clearTimeout(resume.current);
    },
    [],
  );

  const hold = (index: number) => {
    if (resume.current) {
      window.clearTimeout(resume.current);
      resume.current = null;
    }
    setHeld(index);
  };

  const release = (index: number) => {
    if (resume.current) window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => {
      setHeld(null);
      setActive((index + 1) % USPS.length);
      resume.current = null;
    }, 1500);
  };

  const revealed = !animatable || entered;

  return (
    <section aria-label="What the ShriNeo platform does" className="border-y border-border bg-background">
      <ul
        ref={ref}
        className="container-page grid grid-cols-2 lg:grid-cols-4"
      >
        {USPS.map((usp, index) => {
          const isActive = !reduced && entered && current === index;
          const content = (
            <>
              <usp.Icon
                className={cn(
                  "mt-0.5 size-[22px] shrink-0 transition-[color,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
                  isActive ? "-translate-y-px text-primary-hover" : "text-primary/85",
                )}
              />
              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-sm leading-snug text-balance transition-colors duration-200",
                    isActive ? "font-semibold text-foreground" : "font-medium text-foreground/85",
                  )}
                >
                  {usp.title}
                </span>
                <span className="mt-1 hidden text-xs leading-snug text-muted-foreground sm:block">
                  {usp.copy}
                </span>
              </span>
            </>
          );

          const shell = cn(
            "relative flex h-full min-h-[88px] items-center gap-3 px-4 py-4 sm:px-6 sm:py-5",
            "transition-[opacity,transform,background-color] ease-[cubic-bezier(0,0,0.2,1)]",
            "motion-safe:duration-[320ms]",
            revealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            isActive ? "bg-primary/[0.035]" : "bg-transparent",
          );

          return (
            <li
              key={usp.id}
              className={cn(
                "relative min-w-0 border-border",
                index % 2 === 1 && "border-l lg:border-l",
                index > 1 && "border-t lg:border-t-0",
                index === 2 && "lg:border-l",
                index === 3 && "lg:border-l",
              )}
              style={revealed ? undefined : { transitionDelay: `${index * STAGGER}ms` }}
              onMouseEnter={() => hold(index)}
              onMouseLeave={() => release(index)}
            >
              {usp.to ? (
                <Link
                  to={usp.to}
                  className={cn(shell, "hover:bg-primary/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background")}
                  style={{ transitionDelay: revealed ? "0ms" : `${index * STAGGER}ms` }}
                  onFocus={() => hold(index)}
                  onBlur={() => release(index)}
                >
                  {content}
                </Link>
              ) : (
                <div className={shell} style={{ transitionDelay: revealed ? "0ms" : `${index * STAGGER}ms` }}>
                  {content}
                </div>
              )}

              {/* Decorative progress line — never announced. */}
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
                {isActive ? (
                  <span
                    key={`${usp.id}-${active}-${held ?? "auto"}`}
                    className="block h-full origin-left bg-primary-hover"
                    style={
                      held === index
                        ? { transform: "scaleX(1)" }
                        : { animation: `usp-progress ${HOLD}ms linear forwards` }
                    }
                  />
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
