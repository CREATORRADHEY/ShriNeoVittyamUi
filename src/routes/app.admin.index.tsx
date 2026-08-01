import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ShieldAlert } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  ChartState,
  DataStaleBanner,
  EmptyState,
  InlineState,
  KpiCard,
  NamedLoading,
  OfflineBanner,
  PartialDataNotice,
  PermissionNotice,
  SkeletonBlock,
  StatusBadge,
  TableState,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/admin/")({
  head: () => ({
    meta: [
      { title: "Executive dashboard — ShriNeo Capital admin" },
      {
        name: "description",
        content:
          "Platform health, fraud alerts, grievance SLA, partner limits and reconciliation oversight for ShriNeo Capital operations.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Executive dashboard — ShriNeo Capital admin" },
      {
        property: "og:description",
        content: "Operational oversight across borrowers, agents, lenders and platform systems.",
      },
    ],
  }),
  component: AdminDashboard,
});

const SERVICES = [
  { name: "Application intake", state: "Operational", tone: "success" as const },
  { name: "KYC provider", state: "Operational", tone: "success" as const },
  { name: "Account Aggregator", state: "Degraded — slow responses", tone: "warning" as const },
  { name: "Credit bureau", state: "Operational", tone: "success" as const },
  { name: "Lender API — Aarambh", state: "Incident — retries queued", tone: "error" as const },
  { name: "Payments and mandates", state: "Operational", tone: "success" as const },
];

const QUEUES = [
  { queue: "Manual KYC review", open: 42, sla: "6h", risk: "Within SLA", tone: "success" as const },
  { queue: "Fraud alerts", open: 9, sla: "2h", risk: "3 breaching", tone: "error" as const },
  { queue: "Agent verification", open: 15, sla: "24h", risk: "Within SLA", tone: "success" as const },
  { queue: "Grievances", open: 6, sla: "3 working days", risk: "2 at risk", tone: "warning" as const },
];

function AdminDashboard() {
  const { account, data } = usePrototype();
  const restricted: boolean = account === "restricted";

  const banner = restricted ? (
    <PermissionNotice what="Revenue reconciliation and consent record exports" />
  ) : data === "failed" ? (
    <InlineState
      tone="error"
      title="Platform incident — one lender integration is down"
      explanation="Applications routed to Aarambh Finance are queued and retried automatically. Other partners are unaffected."
      safety="No application has been rejected because of this incident."
      actions={[{ label: "Open incident timeline", to: "/app/admin/system" }, { label: "Notify partners" }]}
    />
  ) : account === "action-required" ? (
    <InlineState
      tone="warning"
      title="Fraud alert volume is 3.4× the 30-day average"
      explanation="Alerts cluster around two agent codes in the same district. Investigation queue has been prioritised automatically."
      actions={[{ label: "Open fraud queue", to: "/app/admin/fraud" }]}
    />
  ) : data === "stale" ? (
    <DataStaleBanner asOf="today at 06:00 IST" />
  ) : data === "offline" ? (
    <OfflineBanner />
  ) : data === "partial" ? (
    <PartialDataNotice missing="Revenue reconciliation for the current day" />
  ) : null;

  return (
    <PortalShell
      role="admin"
      title="Executive dashboard"
      subtitle="Platform-wide oversight · demonstration data"
      banner={banner}
      actions={
        <StatusBadge tone={data === "failed" ? "error" : account === "action-required" ? "warning" : "success"}>
          {data === "failed" ? "Partial degradation" : account === "action-required" ? "Elevated risk" : "All systems healthy"}
        </StatusBadge>
      }
    >
      {data === "loading" ? (
        <div className="space-y-4">
          <NamedLoading label="Aggregating platform metrics" />
          <SkeletonBlock rows={8} />
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <KpiCard label="Applications today" value={data === "empty" ? "0" : "1,284"} state={data === "empty" ? "empty" : "ready"} />
            <KpiCard label="Disbursed value (MTD)" value={formatINR(94200000)} state={data === "stale" ? "stale" : "ready"} />
            <KpiCard label="Active agents" value="612" hint="15 awaiting verification" />
            <KpiCard label="Open fraud cases" value={account === "action-required" ? "31" : "9"} tone={account === "action-required" ? "error" : "neutral"} />
            <KpiCard label="Grievance SLA" value="96%" hint="Target 98%" tone="warning" />
            <KpiCard label="Reconciliation" value={restricted ? "" : data === "partial" ? "" : "Matched"} state={restricted ? "restricted" : data === "partial" ? "failed" : "ready"} />
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <SectionCard title="System status" description="Live view of every dependency." className="xl:col-span-1">
              <ul className="space-y-2.5 text-sm">
                {SERVICES.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-3">
                    <span className="text-foreground">{s.name}</span>
                    <StatusBadge tone={data === "failed" && s.name.includes("Lender") ? "error" : s.tone}>
                      {s.state.split(" — ")[0]}
                    </StatusBadge>
                  </li>
                ))}
              </ul>
              <Button asChild size="sm" variant="outline" className="mt-4">
                <Link to="/app/admin/system">
                  <Activity aria-hidden className="size-4" />
                  Open system status
                </Link>
              </Button>
            </SectionCard>

            <SectionCard title="Operational queues" className="xl:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <caption className="sr-only">Open operational queues and SLA risk</caption>
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th scope="col" className="px-3 py-2 font-medium">Queue</th>
                      <th scope="col" className="px-3 py-2 font-medium">Open</th>
                      <th scope="col" className="px-3 py-2 font-medium">SLA</th>
                      <th scope="col" className="px-3 py-2 font-medium">Risk</th>
                    </tr>
                  </thead>
                  {data === "empty" ? (
                    <TableState kind="empty" columns={4} entity="queue items" />
                  ) : data === "failed" ? (
                    <TableState kind="partial" columns={4} entity="queues" />
                  ) : (
                    <tbody>
                      {QUEUES.map((q) => (
                        <tr key={q.queue} className="border-b border-border last:border-0">
                          <th scope="row" className="px-3 py-2 text-left font-medium text-foreground">{q.queue}</th>
                          <td className="num px-3 py-2 text-foreground">{q.open}</td>
                          <td className="px-3 py-2 text-muted-foreground">{q.sla}</td>
                          <td className="px-3 py-2"><StatusBadge tone={q.tone}>{q.risk}</StatusBadge></td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </SectionCard>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <SectionCard title="Application volume" className="xl:col-span-2">
              {data === "empty" ? (
                <ChartState kind="empty" label="application volume" />
              ) : data === "partial" ? (
                <ChartState kind="partial" label="application volume" />
              ) : data === "failed" ? (
                <ChartState kind="failed" label="application volume" />
              ) : (
                <div className="flex h-44 items-end gap-1.5">
                  {[42, 48, 55, 51, 63, 59, 71, 66, 74, 81, 77, 86, 92, 88].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard title="Fraud watch">
              {account === "action-required" ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <ShieldAlert aria-hidden className="mt-0.5 size-4 text-destructive" />
                    <p className="text-sm text-muted-foreground">
                      Two agent codes account for 61% of new alerts. Payouts for both are held
                      pending investigation.
                    </p>
                  </div>
                  <Button asChild size="sm">
                    <Link to="/app/admin/fraud">Open investigation queue</Link>
                  </Button>
                </div>
              ) : (
                <EmptyState
                  compact
                  title="No open fraud alerts."
                  explanation="Alerts appear here the moment a rule or model threshold is crossed."
                />
              )}
            </SectionCard>
          </div>
        </>
      )}
    </PortalShell>
  );
}
