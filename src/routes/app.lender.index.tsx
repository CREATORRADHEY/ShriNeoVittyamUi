import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Lock } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  ChartState,
  DataStaleBanner,
  InlineState,
  KpiCard,
  NamedLoading,
  OfflineBanner,
  PartialDataNotice,
  PermissionNotice,
  RestrictedState,
  SkeletonBlock,
  StatusBadge,
  TableState,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/lender/")({
  head: () => ({
    meta: [
      { title: "Lender dashboard — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Credit pipeline, manual reviews, sanction limits, API health and portfolio risk for participating lenders.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Lender dashboard — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Dense decisioning surfaces for participating banks and NBFCs.",
      },
    ],
  }),
  component: LenderDashboard,
});

const PIPELINE = [
  { id: "SNV-24-118204", product: "Personal", amount: 300000, score: 742, snv: "B+", stage: "Auto-check passed", age: "14m", tone: "info" as const },
  { id: "SNV-24-118198", product: "Business", amount: 950000, score: 688, snv: "B", stage: "Manual review", age: "1h", tone: "warning" as const },
  { id: "SNV-24-118181", product: "Mortgage", amount: 2400000, score: 771, snv: "A", stage: "Docs verified", age: "3h", tone: "success" as const },
  { id: "SNV-24-118165", product: "Personal", amount: 180000, score: 641, snv: "C", stage: "Query raised", age: "5h", tone: "warning" as const },
  { id: "SNV-24-118147", product: "Home", amount: 4100000, score: 795, snv: "A", stage: "Sanction pending", age: "1d", tone: "info" as const },
];

function LenderDashboard() {
  const { account, data } = usePrototype();
  const restricted: boolean = account === "restricted";

  const banner =
    account === "action-required" ? (
      <InlineState
        tone="warning"
        title="Sanction limit at 92% of the configured monthly cap"
        explanation="New applications will continue to route to you until the cap is reached, then they pause automatically"
        safety="Files already sanctioned are unaffected"
        actions={[{ label: "Review limit configuration" }, { label: "Contact partnership desk" }]}
      />
    ) : data === "failed" ? (
      <InlineState
        tone="error"
        title="Decision API is not responding"
        explanation="Automated decisioning is paused. Files are queued in order and none have been rejected by default"
        safety="No application was auto-declined during this window"
        actions={[{ label: "Open API status", to: "/app/lender/api-status" }, { label: "Retry connection" }]}
      />
    ) : data === "stale" ? (
      <DataStaleBanner asOf="today at 07:55 IST" />
    ) : data === "offline" ? (
      <OfflineBanner />
    ) : data === "partial" ? (
      <PartialDataNotice missing="Portfolio NPA aggregation" />
    ) : null;

  return (
    <PortalShell
      role="lender"
      title="Credit operations"
      subtitle="IDFC First Bank · demonstration environment"
      banner={banner}
      actions={
        <div className="flex items-center gap-2">
          <StatusBadge tone={data === "failed" ? "error" : data === "stale" ? "warning" : "success"}>
            {data === "failed" ? "API offline" : data === "stale" ? "Data delayed" : "API healthy"}
          </StatusBadge>
          <Button asChild size="sm">
            <Link to="/app/lender/workbench">Open workbench</Link>
          </Button>
        </div>
      }
    >
      {restricted ? (
        <RestrictedState />
      ) : data === "loading" ? (
        <div className="space-y-4">
          <NamedLoading label="Loading today's credit pipeline" />
          <SkeletonBlock rows={8} />
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <KpiCard label="New applications" value={data === "empty" ? "0" : "128"} hint="Today" state={data === "empty" ? "empty" : "ready"} />
            <KpiCard label="Manual reviews" value={data === "empty" ? "0" : "17"} hint="7 breach SLA in 2h" tone="warning" state={data === "empty" ? "empty" : "ready"} />
            <KpiCard label="Sanctioned value" value={formatINR(18400000)} hint="Month to date" state={data === "stale" ? "stale" : "ready"} />
            <KpiCard label="Sanction limit used" value={account === "action-required" ? "92%" : "61%"} hint="Of configured cap" tone={account === "action-required" ? "warning" : "neutral"} />
            <KpiCard label="NPA (90+)" value="1.8%" hint="Threshold 2.5%" state={data === "partial" ? "failed" : "ready"} />
            <KpiCard label="FPD" value="0.9%" hint="Threshold 1.2%" state={restricted ? "restricted" : "ready"} />
          </div>

          <SectionCard
            title="Pipeline"
            description="Sticky filters, frozen borrower column, and a fixed decision order."
            actions={
              <Button size="sm" variant="outline">
                <Filter aria-hidden className="size-4" />
                Filters
              </Button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-sm">
                <caption className="sr-only">Applications awaiting a credit decision</caption>
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th scope="col" className="px-3 py-2 font-medium">Application</th>
                    <th scope="col" className="px-3 py-2 font-medium">Product</th>
                    <th scope="col" className="px-3 py-2 font-medium">Amount</th>
                    <th scope="col" className="px-3 py-2 font-medium">Bureau</th>
                    <th scope="col" className="px-3 py-2 font-medium">SNV band</th>
                    <th scope="col" className="px-3 py-2 font-medium">Stage</th>
                    <th scope="col" className="px-3 py-2 font-medium">Age</th>
                  </tr>
                </thead>
                {data === "empty" ? (
                  <TableState kind="no-results" columns={7} entity="applications" />
                ) : data === "failed" ? (
                  <TableState kind="failed" columns={7} entity="applications" />
                ) : data === "partial" ? (
                  <tbody>
                    {PIPELINE.map((r, i) => (
                      <tr key={r.id} className="border-b border-border last:border-0">
                        <th scope="row" className="num px-3 py-2 text-left font-medium text-foreground">{r.id}</th>
                        <td className="px-3 py-2 text-muted-foreground">{r.product}</td>
                        <td className="num px-3 py-2 text-foreground">{formatINR(r.amount)}</td>
                        <td className="num px-3 py-2 text-foreground">{i % 2 ? "—" : r.score}</td>
                        <td className="px-3 py-2 text-foreground">{i % 2 ? "—" : r.snv}</td>
                        <td className="px-3 py-2"><StatusBadge tone={r.tone}>{r.stage}</StatusBadge></td>
                        <td className="num px-3 py-2 text-muted-foreground">{r.age}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    {PIPELINE.map((r) => (
                      <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface">
                        <th scope="row" className="num px-3 py-2 text-left font-medium text-foreground">{r.id}</th>
                        <td className="px-3 py-2 text-muted-foreground">{r.product}</td>
                        <td className="num px-3 py-2 text-foreground">{formatINR(r.amount)}</td>
                        <td className="num px-3 py-2 text-foreground">{restricted ? "Masked" : r.score}</td>
                        <td className="px-3 py-2 text-foreground">{r.snv}</td>
                        <td className="px-3 py-2"><StatusBadge tone={r.tone}>{r.stage}</StatusBadge></td>
                        <td className="num px-3 py-2 text-muted-foreground">{r.age}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            {data === "partial" ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Missing bureau values are shown as “—”. They are not treated as zero and must not be
                used in a decision.
              </p>
            ) : null}
          </SectionCard>

          <div className="grid gap-4 xl:grid-cols-3">
            <SectionCard title="Disbursal trend" className="xl:col-span-2">
              {data === "failed" ? (
                <ChartState kind="failed" label="the disbursal trend" />
              ) : data === "empty" ? (
                <ChartState kind="empty" label="the disbursal trend" />
              ) : data === "stale" ? (
                <ChartState kind="stale" label="the disbursal trend" />
              ) : (
                <div className="flex h-44 items-end gap-2">
                  {[38, 52, 44, 61, 58, 72, 66, 81, 74, 88, 79, 92].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard title="Field permissions">
              {restricted ? (
                <PermissionNotice what="Borrower contact information and full bureau reports" />
              ) : (
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Lock aria-hidden className="size-4" />
                    PII is masked by default and unmasked only with a logged reason.
                  </p>
                  <StatusBadge tone="success">Audit logging active</StatusBadge>
                </div>
              )}
            </SectionCard>
          </div>
        </>
      )}
    </PortalShell>
  );
}
