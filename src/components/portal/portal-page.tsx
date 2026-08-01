import type { ReactNode } from "react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  DataStaleBanner,
  EmptyState,
  InlineState,
  KpiCard,
  PartialDataNotice,
  StatusBadge,
  TableState,
  type Tone,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { usePrototype, type Role } from "@/prototype/state";

export type PortalPageSpec = {
  role: Role;
  title: string;
  subtitle: string;
  /** Metadata used by the generated route file. */
  metaTitle: string;
  metaDescription: string;
  kpis?: { label: string; value: string; hint?: string; tone?: Tone }[];
  notices?: { tone: Tone; title: string; explanation: string; safety?: string; actions?: string[] }[];
  table?: {
    caption: string;
    entity: string;
    columns: string[];
    rows: (string | { text: string; tone: Tone })[][];
  };
  panels?: { title: string; body: string; badge?: { text: string; tone: Tone } }[];
  emptyTitle: string;
  emptyExplanation: string;
  restrictedFor?: Role[];
  /** Copy shown when the account is under review. */
  suspendedNote?: string;
  footnote?: string;
  extra?: ReactNode;
};

function tableKind(data: string) {
  switch (data) {
    case "loading":
      return "loading" as const;
    case "failed":
      return "failed" as const;
    case "offline":
      return "offline" as const;
    case "stale":
      return "stale" as const;
    case "partial":
      return "partial" as const;
    default:
      return "empty" as const;
  }
}

export function PortalPage({ spec }: { spec: PortalPageSpec }) {
  const { data, account, role } = usePrototype();
  const populated = data === "populated" || data === "stale" || data === "partial";
  const restricted = spec.restrictedFor?.includes(role) ?? false;

  return (
    <PortalShell role={spec.role} title={spec.title} subtitle={spec.subtitle}>
      {data === "stale" ? <DataStaleBanner asOf="12 Mar 2026, 11:20 IST" /> : null}
      {data === "partial" ? <PartialDataNotice missing="one upstream source" /> : null}
      {data === "offline" ? (
        <InlineState
          tone="offline"
          title="You're offline"
          explanation="Records already loaded on this device stay readable. New changes will sync when you reconnect."
          safety="Nothing you have entered has been discarded."
        />
      ) : null}
      {account === "suspended" && spec.suspendedNote ? (
        <InlineState
          tone="warning"
          title="Limited while your account is under review"
          explanation={spec.suspendedNote}
          safety="Existing records remain visible and unchanged."
        />
      ) : null}
      {restricted ? (
        <InlineState
          tone="warning"
          title="Restricted for your role"
          explanation="Your permissions allow you to see that this area exists, but not the records inside it."
          safety="No data was exposed and this attempt was recorded in the access log."
          actions={[{ label: "Request access", to: "/contact" }]}
        />
      ) : null}

      {!restricted && spec.notices?.length
        ? spec.notices.map((n) => (
            <InlineState
              key={n.title}
              tone={n.tone}
              title={n.title}
              explanation={n.explanation}
              {...(n.safety ? { safety: n.safety } : {})}
              actions={(n.actions ?? []).map((label) => ({ label }))}
            />
          ))
        : null}

      {!restricted && spec.kpis?.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {spec.kpis.map((k) => (
            <KpiCard
              key={k.label}
              label={k.label}
              value={k.value}
              state={
                data === "loading"
                  ? "loading"
                  : data === "failed"
                    ? "failed"
                    : data === "empty"
                      ? "empty"
                      : data === "stale"
                        ? "stale"
                        : "ready"
              }
              {...(k.hint ? { hint: k.hint } : {})}
              {...(k.tone ? { tone: k.tone } : {})}
            />
          ))}
        </div>
      ) : null}

      {!restricted && spec.panels?.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {spec.panels.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                {p.badge ? <StatusBadge tone={p.badge.tone}>{p.badge.text}</StatusBadge> : null}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      ) : null}

      {!restricted && spec.table ? (
        <SectionCard
          title={spec.table.caption}
          actions={
            <Button size="sm" variant="outline">
              Export
            </Button>
          }
        >
          {data === "empty" ? (
            <EmptyState
              title={spec.emptyTitle}
              explanation={spec.emptyExplanation}
              actions={[{ label: "Refresh", variant: "outline" }]}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <caption className="sr-only">{spec.table.caption}</caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    {spec.table.columns.map((c) => (
                      <th key={c} scope="col" className="px-3 py-2 font-medium">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                {populated ? (
                  <tbody>
                    {spec.table.rows.map((row, i) => (
                      <tr key={i} className="border-b border-border">
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-3 text-foreground">
                            {typeof cell === "string" ? (
                              <span className={j === 0 ? "num" : "text-muted-foreground"}>{cell}</span>
                            ) : (
                              <StatusBadge tone={cell.tone}>{cell.text}</StatusBadge>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <TableState
                    kind={tableKind(data)}
                    columns={spec.table.columns.length}
                    entity={spec.table.entity}
                  />
                )}
              </table>
            </div>
          )}
        </SectionCard>
      ) : null}

      {spec.extra}

      {spec.footnote ? <p className="text-xs text-muted-foreground">{spec.footnote}</p> : null}
    </PortalShell>
  );
}
