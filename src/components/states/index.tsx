/**
 * Shared state foundations for every ShriNeo portal.
 * One vocabulary, role-specific density and copy.
 */
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Clock,
  FileWarning,
  Info,
  LifeBuoy,
  Lock,
  RefreshCw,
  ShieldAlert,
  Signal,
  Wrench,
  XCircle,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ tone */

export type Tone = "info" | "success" | "warning" | "error" | "neutral" | "offline";

const TONE: Record<
  Tone,
  { icon: ComponentType<{ className?: string }>; text: string; surface: string; border: string; label: string }
> = {
  info: { icon: Info, text: "text-info", surface: "bg-info-surface", border: "border-info/25", label: "Information" },
  success: {
    icon: CheckCircle2,
    text: "text-success",
    surface: "bg-success-surface",
    border: "border-success/25",
    label: "Completed",
  },
  warning: {
    icon: AlertTriangle,
    text: "text-warning",
    surface: "bg-warning-surface",
    border: "border-warning/30",
    label: "Action required",
  },
  error: {
    icon: XCircle,
    text: "text-destructive",
    surface: "bg-error-surface",
    border: "border-destructive/25",
    label: "Not completed",
  },
  neutral: {
    icon: CircleDashed,
    text: "text-muted-foreground",
    surface: "bg-surface",
    border: "border-border",
    label: "Status",
  },
  offline: {
    icon: Signal,
    text: "text-muted-foreground",
    surface: "bg-surface-strong",
    border: "border-border-strong",
    label: "Offline",
  },
};

export function toneVisual(tone: Tone) {
  return TONE[tone];
}

/* ------------------------------------------------------------ status badge */

export function StatusBadge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  const v = TONE[tone];
  const Icon = v.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        v.surface,
        v.border,
        v.text,
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5 shrink-0" />
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- actions */

export type StateAction = {
  label: string;
  to?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost" | "secondary";
};

function ActionButton({ action, full }: { action: StateAction; full?: boolean | undefined }) {
  const variant = action.variant ?? "default";
  const cls = full ? "w-full sm:w-auto" : undefined;
  if (action.to) {
    return (
      <Button asChild variant={variant} className={cls}>
        <Link to={action.to}>{action.label}</Link>
      </Button>
    );
  }
  return (
    <Button variant={variant} onClick={action.onClick} className={cls}>
      {action.label}
    </Button>
  );
}

export function ActionRow({ actions, full }: { actions: StateAction[]; full?: boolean | undefined }) {
  if (!actions.length) return null;
  return (
    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      {actions.map((a) => (
        <ActionButton key={a.label} action={a} full={full} />
      ))}
    </div>
  );
}

/* ----------------------------------------------------- the state contract */

export type StateContent = {
  /** What happened. */
  title: string;
  /** What it means, in plain language. */
  explanation?: string;
  /** Whether data, money, progress or the application is safe. */
  safety?: string;
  tone?: Tone;
  actions?: StateAction[];
  /** Small support path. */
  support?: string;
  reference?: { id?: string; timestamp?: string };
  meta?: ReactNode;
};

/** Full-width in-page state: use as the main content of a page region. */
export function PageState({
  title,
  explanation,
  safety,
  tone = "info",
  actions = [],
  support,
  reference,
  meta,
  compact,
  className,
  illustration,
}: StateContent & { compact?: boolean; className?: string; illustration?: ReactNode }) {
  const v = TONE[tone];
  const Icon = v.icon;
  return (
    <section
      aria-labelledby={undefined}
      className={cn(
        "rounded-xl border border-border bg-card",
        compact ? "p-6" : "p-8 sm:p-10",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-6", !compact && "sm:flex-row sm:items-start sm:gap-10")}>
        <div className="min-w-0 flex-1">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium",
              v.surface,
              v.border,
              v.text,
            )}
          >
            <Icon aria-hidden className="size-3.5" />
            {v.label}
          </span>
          <h2
            tabIndex={-1}
            className={cn(
              "editorial mt-4 text-balance text-foreground",
              compact ? "text-xl" : "text-2xl sm:text-3xl",
            )}
          >
            {title}
          </h2>
          {explanation ? (
            <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted-foreground">
              {explanation}
            </p>
          ) : null}
          {safety ? (
            <p className="mt-4 flex max-w-[62ch] items-start gap-2 rounded-lg border border-border bg-surface p-3 text-sm text-foreground">
              <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>{safety}</span>
            </p>
          ) : null}
          {meta}
          <ActionRow actions={actions} full />
          {support ? (
            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <LifeBuoy aria-hidden className="size-4" />
              {support}
            </p>
          ) : null}
          {reference ? (
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
              {reference.id ? (
                <div className="flex gap-2">
                  <dt>Reference ID</dt>
                  <dd className="num text-foreground">{reference.id}</dd>
                </div>
              ) : null}
              {reference.timestamp ? (
                <div className="flex gap-2">
                  <dt>Recorded</dt>
                  <dd className="num text-foreground">{reference.timestamp}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>
        {illustration ? <div className="shrink-0">{illustration}</div> : null}
      </div>
    </section>
  );
}

/** Compact banner-style state for cards, table headers and form sections. */
export function InlineState({
  title,
  explanation,
  safety,
  tone = "info",
  actions = [],
  className,
  live,
}: StateContent & { className?: string; live?: boolean }) {
  const v = TONE[tone];
  const Icon = v.icon;
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      aria-live={live ? (tone === "error" ? "assertive" : "polite") : undefined}
      className={cn("rounded-lg border p-4", v.surface, v.border, className)}
    >
      <div className="flex items-start gap-3">
        <Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", v.text)} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {explanation ? <p className="mt-1 text-sm text-muted-foreground">{explanation}</p> : null}
          {safety ? <p className="mt-1 text-sm text-foreground">{safety}</p> : null}
          {actions.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {actions.map((a) =>
                a.to ? (
                  <Button key={a.label} asChild size="sm" variant={a.variant ?? "outline"}>
                    <Link to={a.to}>{a.label}</Link>
                  </Button>
                ) : (
                  <Button
                    key={a.label}
                    size="sm"
                    variant={a.variant ?? "outline"}
                    onClick={a.onClick}
                  >
                    {a.label}
                  </Button>
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------- named state kinds */

export function EmptyState({
  title,
  explanation,
  actions = [],
  compact,
  icon: Icon = CircleDashed,
}: {
  title: string;
  explanation?: string;
  actions?: StateAction[];
  compact?: boolean;
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start rounded-xl border border-dashed border-border-strong bg-surface",
        compact ? "p-5" : "p-8 text-left",
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-card">
        <Icon aria-hidden className="size-4 text-muted-foreground" />
      </span>
      <p className={cn("mt-3 font-semibold text-foreground", compact ? "text-sm" : "text-base")}>
        {title}
      </p>
      {explanation ? (
        <p className="mt-1 max-w-[52ch] text-sm text-muted-foreground">{explanation}</p>
      ) : null}
      {actions.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {actions.map((a) =>
            a.to ? (
              <Button key={a.label} asChild size="sm" variant={a.variant ?? "default"}>
                <Link to={a.to}>{a.label}</Link>
              </Button>
            ) : (
              <Button key={a.label} size="sm" variant={a.variant ?? "default"} onClick={a.onClick}>
                {a.label}
              </Button>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}

export function ErrorState(props: Omit<StateContent, "tone"> & { compact?: boolean }) {
  return <PageState tone="error" {...props} />;
}

export function OfflineState({ resumeTo }: { resumeTo?: string }) {
  return (
    <PageState
      tone="offline"
      title="You're offline."
      explanation="Reconnect to continue. Any information already saved on this device will remain available."
      safety="Nothing you have entered has been discarded. Your last saved draft is intact."
      actions={[
        { label: "Retry connection", onClick: () => window.location.reload() },
        ...(resumeTo ? [{ label: "Return to saved draft", to: resumeTo, variant: "outline" as const }] : []),
      ]}
      support="Offline-safe content: your saved draft, uploaded document list and EMI calculator."
    />
  );
}

export function RestrictedState({
  borrowerVoice,
  reason,
  reviewWindow,
}: {
  borrowerVoice?: boolean;
  reason?: string;
  reviewWindow?: string;
}) {
  return (
    <PageState
      tone="warning"
      title={borrowerVoice ? "This page isn't available for your account." : "You don't have access to this page."}
      explanation={
        borrowerVoice
          ? reason ?? "Some activity is paused while our team completes a review of your account."
          : "Your current role does not include permission to view or change this information."
      }
      safety="Your application data and any repayment records remain safe and unchanged."
      actions={[
        { label: "Return to dashboard", to: "/prototype" },
        { label: borrowerVoice ? "Contact support" : "Request access", to: "/contact", variant: "outline" },
      ]}
      {...(reviewWindow ? { support: `Expected review completion: ${reviewWindow}.` } : {})}
    />
  );
}

export function MaintenanceState({ window: w }: { window?: string }) {
  return (
    <PageState
      tone="neutral"
      title="We're carrying out scheduled maintenance."
      explanation="Planned platform work is in progress. This is not an outage and no action is needed from you."
      safety="Applications, documents and repayment records are unaffected and remain saved."
      actions={[{ label: "Refresh status", onClick: () => window.location.reload() }]}
      support={w ? `Expected return to service: ${w}.` : "Expected return time will be published here."}
    />
  );
}

export function SessionExpiredState() {
  return (
    <PageState
      tone="info"
      title="Your session has ended."
      explanation="For your security, you need to sign in again. Your saved progress has not been removed."
      safety="Everything you completed before the session ended is stored against your application."
      actions={[
        { label: "Return to prototype login", to: "/prototype" },
        { label: "Go to homepage", to: "/", variant: "outline" },
      ]}
    />
  );
}

/* --------------------------------------------------------------- banners */

export function DataStaleBanner({ asOf, onRefresh }: { asOf: string; onRefresh?: () => void }) {
  return (
    <InlineState
      tone="warning"
      title="You're viewing saved data"
      explanation={`Live figures could not be refreshed. Values shown were last confirmed ${asOf}.`}
      actions={[{ label: "Refresh now", onClick: onRefresh ?? (() => window.location.reload()) }]}
    />
  );
}

export function PartialDataNotice({ missing }: { missing: string }) {
  return (
    <InlineState
      tone="warning"
      title="Some information is still loading"
      explanation={`${missing} did not respond in time. Everything else on this page is complete and accurate.`}
      actions={[{ label: "Retry missing sections", onClick: () => window.location.reload() }]}
    />
  );
}

export function OfflineBanner() {
  return (
    <div
      role="status"
      className="flex items-center gap-2 rounded-lg border border-border-strong bg-surface-strong px-3 py-2 text-sm text-foreground"
    >
      <Signal aria-hidden className="size-4 text-muted-foreground" />
      <span className="font-medium">You're offline.</span>
      <span className="text-muted-foreground">Saved information stays available on this device.</span>
    </div>
  );
}

export function RetryPanel({
  title = "We couldn't load this section.",
  explanation = "The request didn't complete. This is a temporary problem on our side, not with your account.",
  onRetry,
}: {
  title?: string;
  explanation?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start gap-3">
        <FileWarning aria-hidden className="mt-0.5 size-4 shrink-0 text-destructive" />
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 max-w-[56ch] text-sm text-muted-foreground">{explanation}</p>
          <p className="mt-1 text-sm text-foreground">Nothing was changed in your application.</p>
          <Button
            size="sm"
            variant="outline"
            className="mt-4"
            onClick={onRetry ?? (() => window.location.reload())}
          >
            <RefreshCw aria-hidden className="size-4" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SupportEscalation({ reference }: { reference?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-sm font-semibold text-foreground">Still need help?</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Raise a support request, or escalate to the Grievance Officer if a request has not been
        resolved within the published window.
      </p>
      {reference ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Quote reference <span className="num text-foreground">{reference}</span>.
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="outline">
          <Link to="/contact">Contact support</Link>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <Link to="/grievance-redressal">Grievance redressal</Link>
        </Button>
      </div>
    </div>
  );
}

export function PermissionNotice({ what }: { what: string }) {
  return (
    <InlineState
      tone="neutral"
      title="Restricted for your role"
      explanation={`${what} is hidden because your role does not include this permission. An access request is recorded in the audit log.`}
      actions={[{ label: "Request access", to: "/contact", variant: "outline" }]}
    />
  );
}

export function SecurityRestrictionNotice({
  action,
  reference,
}: {
  action: string;
  reference: string;
}) {
  return (
    <div className="rounded-xl border border-warning/30 bg-warning-surface p-5">
      <div className="flex items-start gap-3">
        <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-warning" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            We paused this action to protect your account.
          </p>
          <p className="mt-1 max-w-[60ch] text-sm text-muted-foreground">
            {action} was stopped before it completed while we confirm the request came from you.
          </p>
          <p className="mt-1 text-sm text-foreground">
            No money moved and no application data was changed.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Audit reference <span className="num text-foreground">{reference}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm">Verify it was you</Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/contact">Contact support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- loading */

export function SkeletonBlock({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)} role="status" aria-label="Loading content">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" style={{ width: `${100 - i * 12}%` }} />
      ))}
    </div>
  );
}

export function NamedLoading({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6" role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <RefreshCw aria-hidden className="size-4 animate-spin text-info motion-reduce:animate-none" />
        <p className="text-sm font-medium text-foreground">{label}</p>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-strong">
        <div className="h-full w-1/3 rounded-full bg-info" />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        This usually takes a few seconds. You can stay on this page.
      </p>
    </div>
  );
}

export function LongWaitPanel({
  stage,
  stages,
  expected,
}: {
  stage: number;
  stages: string[];
  expected?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <Clock aria-hidden className="size-4 text-info" />
        <p className="text-sm font-semibold text-foreground">In progress — you don't need to wait here</p>
      </div>
      <ol className="mt-4 space-y-3">
        {stages.map((s, i) => {
          const done = i < stage;
          const current = i === stage;
          return (
            <li key={s} className="flex items-start gap-3">
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                  done && "border-success bg-success-surface text-success",
                  current && "border-info bg-info-surface text-info",
                  !done && !current && "border-border bg-surface text-muted-foreground",
                )}
              >
                {done ? "✓" : i + 1}
              </span>
              <div>
                <p
                  className={cn(
                    "text-sm",
                    current ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s}
                </p>
                {current ? (
                  <p className="text-xs text-muted-foreground">
                    Currently in progress{expected ? ` · expected ${expected}` : ""}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm" variant="outline">
          Notify me when this updates
        </Button>
        <Button size="sm" variant="ghost">
          Save and exit
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- timeline */

export type TimelineItem = {
  label: string;
  meaning: string;
  timestamp: string;
  source: string;
  nextAction?: string;
  expected?: string;
  tone?: Tone;
  state: "done" | "current" | "upcoming";
};

export function StatusTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {items.map((item) => {
        const v = TONE[item.tone ?? (item.state === "done" ? "success" : item.state === "current" ? "info" : "neutral")];
        const Icon = v.icon;
        return (
          <li key={item.label} className="relative">
            <span
              aria-hidden
              className={cn(
                "absolute -left-[31px] flex size-5 items-center justify-center rounded-full border bg-card",
                v.border,
              )}
            >
              <Icon className={cn("size-3", v.text)} />
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <span className="num text-xs text-muted-foreground">{item.timestamp}</span>
              <span className="text-xs text-muted-foreground">· {item.source}</span>
            </div>
            <p className="mt-1 max-w-[62ch] text-sm text-muted-foreground">{item.meaning}</p>
            {item.nextAction ? (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground">
                <ArrowRight aria-hidden className="size-3.5 text-info" />
                {item.nextAction}
              </p>
            ) : null}
            {item.expected ? (
              <p className="mt-1 text-xs text-muted-foreground">Expected: {item.expected}</p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------ form errors */

export function ErrorSummary({ errors }: { errors: { id: string; message: string }[] }) {
  if (!errors.length) return null;
  return (
    <div
      role="alert"
      aria-labelledby="error-summary-title"
      className="rounded-lg border border-destructive/25 bg-error-surface p-4"
    >
      <p id="error-summary-title" className="text-sm font-semibold text-foreground">
        {errors.length} {errors.length === 1 ? "detail needs" : "details need"} your attention before
        you continue
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {errors.map((e) => (
          <li key={e.id}>
            <a href={`#${e.id}`} className="text-destructive underline underline-offset-2">
              {e.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-destructive">
      <AlertTriangle aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/* --------------------------------------------------- component-level states */

export function TableState({
  kind,
  columns,
  entity = "records",
  onRetry,
}: {
  kind: "loading" | "empty" | "no-results" | "failed" | "stale" | "restricted" | "offline" | "partial";
  columns: number;
  entity?: string;
  onRetry?: () => void;
}) {
  if (kind === "loading") {
    return (
      <tbody>
        {Array.from({ length: 5 }).map((_, r) => (
          <tr key={r} className="border-b border-border">
            {Array.from({ length: columns }).map((__, c) => (
              <td key={c} className="px-3 py-3">
                <Skeleton className="h-3.5 w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
  const map = {
    empty: {
      tone: "neutral" as Tone,
      title: `No ${entity} yet.`,
      body: "Records will appear here as soon as activity begins.",
      cta: null,
    },
    "no-results": {
      tone: "neutral" as Tone,
      title: "No matching results",
      body: "No records match the filters you've applied.",
      cta: "Clear filters",
    },
    failed: {
      tone: "error" as Tone,
      title: `We couldn't load these ${entity}.`,
      body: "The request didn't complete. No records were changed or removed.",
      cta: "Try again",
    },
    stale: {
      tone: "warning" as Tone,
      title: "Showing saved data",
      body: "Live values could not be refreshed. Figures may have moved since they were saved.",
      cta: "Refresh",
    },
    restricted: {
      tone: "warning" as Tone,
      title: "Restricted for your role",
      body: "You don't have permission to view these records.",
      cta: "Request access",
    },
    offline: {
      tone: "offline" as Tone,
      title: "You're offline",
      body: "Records already loaded on this device stay available.",
      cta: "Retry connection",
    },
    partial: {
      tone: "warning" as Tone,
      title: "Some rows are incomplete",
      body: "One source didn't respond. Missing values are shown as “—”, not as zero.",
      cta: "Retry",
    },
  }[kind];

  const v = TONE[map.tone];
  const Icon = v.icon;
  return (
    <tbody>
      <tr>
        <td colSpan={columns} className="px-3 py-10">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <Icon aria-hidden className={cn("size-5", v.text)} />
            <p className="mt-2 text-sm font-semibold text-foreground">{map.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{map.body}</p>
            {map.cta ? (
              <Button
                size="sm"
                variant="outline"
                className="mt-4"
                onClick={onRetry ?? (() => window.location.reload())}
              >
                {map.cta}
              </Button>
            ) : null}
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export function ChartState({
  kind,
  label,
}: {
  kind: "loading" | "empty" | "failed" | "stale" | "partial" | "restricted";
  label: string;
}) {
  const map: Record<typeof kind, { tone: Tone; title: string; body: string }> = {
    loading: { tone: "info", title: `Preparing ${label}`, body: "Plotting the latest confirmed values." },
    empty: { tone: "neutral", title: "Nothing to plot yet", body: "This chart appears once activity is recorded." },
    failed: {
      tone: "error",
      title: `We couldn't draw ${label}`,
      body: "The data request didn't complete. Underlying records are unaffected.",
    },
    stale: { tone: "warning", title: "Saved values shown", body: "Live refresh failed; the last confirmed series is plotted." },
    partial: { tone: "warning", title: "Incomplete series", body: "One period is missing and is shown as a gap, not as zero." },
    restricted: { tone: "warning", title: "Restricted for your role", body: "This metric is not available to your permissions." },
  };
  const m = map[kind];
  const v = TONE[m.tone];
  const Icon = v.icon;
  return (
    <div className="flex h-44 flex-col items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface px-4 text-center">
      <Icon aria-hidden className={cn("size-5", v.text)} />
      <p className="mt-2 text-sm font-semibold text-foreground">{m.title}</p>
      <p className="mt-1 max-w-[40ch] text-xs text-muted-foreground">{m.body}</p>
    </div>
  );
}

export function KpiCard({
  label,
  value,
  hint,
  state = "ready",
  tone = "neutral",
}: {
  label: string;
  value?: string;
  hint?: string;
  state?: "ready" | "loading" | "failed" | "stale" | "restricted" | "empty";
  tone?: Tone;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="label-micro text-muted-foreground">{label}</p>
      {state === "loading" ? (
        <Skeleton className="mt-3 h-6 w-24" />
      ) : state === "failed" ? (
        <p className="mt-2 text-sm text-destructive">Not available — request failed</p>
      ) : state === "restricted" ? (
        <p className="mt-2 text-sm text-muted-foreground">Restricted for your role</p>
      ) : state === "empty" ? (
        <p className="mt-2 num text-2xl text-muted-foreground">—</p>
      ) : (
        <p className={cn("num mt-2 text-2xl font-semibold", TONE[tone].text === "text-muted-foreground" ? "text-foreground" : TONE[tone].text)}>
          {value}
        </p>
      )}
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      {state === "stale" ? (
        <p className="mt-2 flex items-center gap-1 text-xs text-warning">
          <Clock aria-hidden className="size-3" /> Saved value
        </p>
      ) : null}
    </div>
  );
}

export function MaintenanceIcon() {
  return <Wrench aria-hidden className="size-5 text-muted-foreground" />;
}
