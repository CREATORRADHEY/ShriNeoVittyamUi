/**
 * Branded full-page negative states. Shared foundation, role-aware content.
 */
import { Link } from "@tanstack/react-router";

import { PageState, SupportEscalation, type StateAction, type Tone } from "@/components/states";
import { org } from "@/config/org";
import { ROLE_HOME, ROLE_LABEL, usePrototype } from "@/prototype/state";

/** A calm financial-path figure: one route ends, a marked alternate continues. */
export function PathFigure({ variant = "diverge" }: { variant?: "diverge" | "system" | "signal" }) {
  return (
    <svg
      viewBox="0 0 260 200"
      role="img"
      aria-label="Illustration of a financial pathway with a marked alternate route"
      className="h-auto w-[220px] text-primary sm:w-[260px]"
    >
      <rect x="0.5" y="0.5" width="259" height="199" rx="12" className="fill-surface stroke-border" />
      <g stroke="currentColor" fill="none" strokeWidth="1.25" opacity="0.28">
        {[40, 80, 120, 160, 200].map((x) => (
          <line key={x} x1={x} y1="16" x2={x} y2="184" />
        ))}
        {[50, 100, 150].map((y) => (
          <line key={y} x1="16" y1={y} x2="244" y2={y} />
        ))}
      </g>
      {variant === "diverge" ? (
        <>
          <path
            d="M28 150 C 70 150, 84 110, 120 108"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M120 108 C 150 106, 160 140, 196 140"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 6"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M120 108 C 152 106, 164 60, 214 56"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="214" cy="56" r="6" className="fill-primary" />
          <g stroke="currentColor" strokeWidth="2" opacity="0.55">
            <line x1="190" y1="134" x2="202" y2="146" />
            <line x1="202" y1="134" x2="190" y2="146" />
          </g>
        </>
      ) : null}
      {variant === "system" ? (
        <>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={40 + i * 62}
              y={72}
              width="46"
              height="56"
              rx="6"
              className="fill-card stroke-border-strong"
              strokeWidth="1.25"
            />
          ))}
          <line x1="86" y1="100" x2="102" y2="100" stroke="currentColor" strokeWidth="2" />
          <line
            x1="148"
            y1="100"
            x2="164"
            y2="100"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 5"
          />
          <circle cx="63" cy="100" r="5" className="fill-primary" />
          <circle cx="125" cy="100" r="5" className="fill-primary" opacity="0.4" />
          <circle cx="187" cy="100" r="5" className="fill-primary" opacity="0.18" />
        </>
      ) : null}
      {variant === "signal" ? (
        <>
          {[26, 46, 66].map((r, i) => (
            <path
              key={r}
              d={`M ${130 - r} 132 A ${r} ${r} 0 0 1 ${130 + r} 132`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity={0.5 - i * 0.14}
              strokeDasharray={i === 2 ? "4 6" : undefined}
            />
          ))}
          <circle cx="130" cy="132" r="5" className="fill-primary" />
        </>
      ) : null}
    </svg>
  );
}

export type FullPageStateProps = {
  code?: string;
  title: string;
  explanation: string;
  safety?: string;
  tone?: Tone;
  actions: StateAction[];
  support?: string;
  reference?: { id?: string; timestamp?: string };
  figure?: "diverge" | "system" | "signal";
  detail?: React.ReactNode;
  showSupportPanel?: boolean;
};

export function FullPageState({
  code,
  title,
  explanation,
  safety,
  tone = "info",
  actions,
  support,
  reference,
  figure = "diverge",
  detail,
  showSupportPanel,
}: FullPageStateProps) {
  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-5 py-8 sm:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="editorial text-lg text-foreground">{org.brandName}</span>
          </Link>
          {code ? (
            <span className="num rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground">
              {code}
            </span>
          ) : null}
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <PageState
              tone={tone}
              title={title}
              explanation={explanation}
              {...(safety ? { safety } : {})}
              actions={actions}
              {...(support ? { support } : {})}
              {...(reference ? { reference } : {})}
              className="border-0 bg-transparent p-0"
              {...(detail ? { meta: <div className="mt-6">{detail}</div> } : {})}
            />
          </div>
          <div className="hidden lg:block">
            <PathFigure variant={figure} />
          </div>
        </div>

        {showSupportPanel ? (
          <div className="max-w-xl">
            <SupportEscalation {...(reference?.id ? { reference: reference.id } : {})} />
          </div>
        ) : null}

        <footer className="mt-10 border-t border-border pt-5 text-xs text-muted-foreground">
          {org.brandLine} · {org.roleStatement}
        </footer>
      </div>
    </main>
  );
}

/** Primary CTA returns the signed-in prototype role to its own dashboard. */
export function useRoleHomeAction(label = "Go to dashboard"): StateAction {
  const { role } = usePrototype();
  return { label: `${label} (${ROLE_LABEL[role]})`, to: ROLE_HOME[role] };
}

export function referenceStamp(prefix: string) {
  return {
    id: `${prefix}-4F2C-90B7`,
    timestamp: "12 Mar 2026, 14:32 IST",
  };
}
