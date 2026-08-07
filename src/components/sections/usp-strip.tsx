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

/** Classical Bank/Building Icon for Lenders platform */
function BankIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svg} {...props}>
      <path d="M3 22h18" />
      <path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
      <path d="M3 11h18M12 2 3 7h18z" />
    </svg>
  );
}

/** Document/Sheet Icon for Workflow Stages */
function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svg} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

/** User/Person Silhouette Icon for Repayment */
function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svg} {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/** Circular Reload/Refresh Icon for Status/Updates */
function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svg} {...props}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M16 3h5v5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 21H3v-5" />
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
    Icon: BankIcon,
    to: "/for-lenders",
  },
  {
    id: "management",
    title: "End-to-end management",
    Icon: DocumentIcon,
    to: "/how-it-works",
  },
  { id: "repayments", title: "Real-time repayments", Icon: UserIcon },
  { id: "updates", title: "Real-time updates", Icon: RefreshIcon },
];

/* ------------------------------------------------------------------ strip */

function Item({ usp }: { usp: Usp }) {
  const content = (
    <>
      <usp.Icon className="size-[18px] shrink-0 text-primary/85 transition-colors duration-200 group-hover:text-primary-hover" />
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
      className="border-b border-border bg-background"
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
