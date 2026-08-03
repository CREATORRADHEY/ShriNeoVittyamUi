import { Link } from "@tanstack/react-router";
import type { ReactElement, SVGProps } from "react";

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
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  to?: "/for-lenders" | "/how-it-works";
};

/* Coverage across every bank and NBFC is not formally approved, so the
   strip publishes the verified "multiple" wording. */
const USPS: Usp[] = [
  {
    id: "platform",
    title: "One platform for multiple banks and NBFCs",
    Icon: PlatformNetworkIcon,
    to: "/for-lenders",
  },
  {
    id: "management",
    title: "End-to-end management",
    Icon: WorkflowStagesIcon,
    to: "/how-it-works",
  },
  { id: "repayments", title: "Real-time repayments", Icon: RepaymentFlowIcon },
  { id: "updates", title: "Real-time updates", Icon: StatusTimelineIcon },
];

/* ------------------------------------------------------------------ strip */

function Item({ usp }: { usp: Usp }) {
  const content = (
    <>
      <usp.Icon className="size-[20px] shrink-0 text-primary/85 transition-colors duration-200 group-hover:text-primary-hover" />
      <span className="whitespace-nowrap text-[13px] font-medium leading-none text-foreground/85 transition-colors duration-200 group-hover:text-foreground">
        {usp.title}
      </span>
    </>
  );

  const shell =
    "group flex items-center gap-2.5 rounded-full px-4 py-2 transition-colors duration-200 hover:bg-primary/[0.05]";

  return usp.to ? (
    <Link
      to={usp.to}
      className={cn(
        shell,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      {content}
    </Link>
  ) : (
    <div className={shell}>{content}</div>
  );
}

export function UspStrip() {
  const reduced = usePrefersReducedMotion();

  // Two identical tracks make the translate(-50%) loop seamless.
  const track = [...USPS, ...USPS];

  return (
    <section
      aria-label="What the ShriNeo platform does"
      className="border-y border-border bg-background"
    >
      {reduced ? (
        <ul className="container-page flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3">
          {USPS.map((usp) => (
            <li key={usp.id} className="min-w-0">
              <Item usp={usp} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className={cn(
            "group/marquee relative overflow-hidden py-2.5",
            "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
          )}
        >
          <ul
            className="flex w-max items-center [animation:usp-marquee_34s_linear_infinite] group-hover/marquee:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          >
            {track.map((usp, index) => (
              <li
                key={`${usp.id}-${index}`}
                aria-hidden={index >= USPS.length}
                className="flex shrink-0 items-center"
              >
                <Item usp={usp} />
                <span aria-hidden className="mx-3 h-3.5 w-px bg-border" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
