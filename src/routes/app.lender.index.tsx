import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Lock, Search, Eye } from "lucide-react";
import { useState } from "react";

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
import { toast } from "sonner";

export const Route = createFileRoute("/app/lender/")({
  head: () => ({
    meta: [
      { title: "Lender Dashboard — ShriNeo Capital" },
      {
        name: "description",
        content: "Credit pipeline, manual reviews, sanction limits, API health and portfolio risk.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LenderDashboard,
});

const PIPELINE = [
  { id: "SNV-24-118204", product: "Personal", amount: 350000, score: 742, snv: "A", stage: "Auto-check passed", age: "14m", tone: "success" as const },
  { id: "SNV-24-118198", product: "Business", amount: 950000, score: 688, snv: "B", stage: "Manual review", age: "1h", tone: "warning" as const },
  { id: "SNV-24-118181", product: "Sachet", amount: 50000, score: 771, snv: "A", stage: "Sachet Auto-check", age: "3h", tone: "success" as const },
  { id: "SNV-24-118165", product: "Personal", amount: 180000, score: 641, snv: "C", stage: "Query raised", age: "5h", tone: "warning" as const },
  { id: "SNV-24-118147", product: "Home", amount: 4100000, score: 795, snv: "A", stage: "Sanction pending", age: "1d", tone: "info" as const },
];

function LenderDashboard() {
  const { account, data } = usePrototype();
  const [filterStage, setFilterStage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedView, setSavedView] = useState<string>("all-files");
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredPipeline = PIPELINE.filter(row => {
    // Custom views filtering
    if (savedView === "high-bureau" && row.score < 700) return false;
    if (savedView === "manual-only" && row.stage !== "Manual review") return false;

    const matchesStage = filterStage === "All" || row.stage === filterStage;
    const matchesSearch = row.id.toLowerCase().includes(searchQuery.toLowerCase()) || row.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <PortalShell
      role="lender"
      title="Credit Operations Workbench"
      subtitle="SBI Digital Finance · Jaipur central desk"
      banner={banner}
      actions={
        <div className="flex items-center gap-2">
          <StatusBadge tone={data === "failed" ? "error" : data === "stale" ? "warning" : "success"}>
            {data === "failed" ? "API offline" : "API healthy"}
          </StatusBadge>
          <Button asChild size="sm">
            <Link to="/app/lender/workbench">Open Workbench</Link>
          </Button>
        </div>
      }
    >
      {account === "suspended" || account === "restricted" ? (
        <RestrictedState />
      ) : data === "loading" ? (
        <div className="space-y-4">
          <NamedLoading label="Loading today's credit pipeline" />
          <SkeletonBlock rows={8} />
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6 text-xs">
            <KpiCard label="New applications" value="128" hint="Today" />
            <KpiCard label="Manual reviews due" value="17" hint="7 breach SLA in 2h" tone="warning" />
            <KpiCard label="Sanctioned value" value={formatINR(18400000)} hint="Month to date" />
            <KpiCard label="Sanction limit used" value="61%" hint="Of monthly cap" />
            <KpiCard label="NPA (90+)" value="1.8%" hint="Threshold 2.5%" />
            <KpiCard label="PII Audits Logged" value="14" hint="Last 24h" tone="success" />
          </div>

          <SectionCard
            title="Applications Work Queue"
            description="Sticky filters by verification stage. Click any row to load detail underwriting workbench."
          >
            {/* Filters Bar & Saved Views */}
            <div className="flex flex-col gap-3 mb-4 bg-surface p-3 rounded-lg border border-border">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {["All", "Auto-check passed", "Manual review", "Sachet Auto-check", "Query raised", "Sanction pending"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => { setFilterStage(st); setCurrentPage(1); }}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all ${filterStage === st ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground"}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-semibold">Saved View:</span>
                  <select
                    value={savedView}
                    onChange={(e) => { setSavedView(e.target.value); setCurrentPage(1); }}
                    className="rounded border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground focus:outline-none"
                  >
                    <option value="all-files">All Sourced Files</option>
                    <option value="high-bureau">High Bureau Score (&gt;700)</option>
                    <option value="manual-only">Manual Underwriting Queue</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search application ID..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full rounded border border-border bg-background pl-8 pr-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full min-w-[860px] border-collapse">
                <caption className="sr-only">Applications awaiting a credit decision</caption>
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground bg-surface">
                    <th scope="col" className="p-3">Application ID</th>
                    <th scope="col" className="p-3">Product</th>
                    <th scope="col" className="p-3">Amount</th>
                    <th scope="col" className="p-3">CIBIL Score</th>
                    <th scope="col" className="p-3">SNV Trust Score</th>
                    <th scope="col" className="p-3">Stage</th>
                    <th scope="col" className="p-3">Age</th>
                    <th scope="col" className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPipeline.map((row) => (
                    <tr key={row.id} className="border-b border-border last:border-0 hover:bg-neutral-50">
                      <td className="p-3 font-semibold text-foreground">{row.id}</td>
                      <td className="p-3 text-muted-foreground">{row.product}</td>
                      <td className="num p-3 text-foreground font-semibold">{formatINR(row.amount)}</td>
                      <td className="num p-3 text-foreground">{row.score}</td>
                      <td className="p-3 text-foreground font-semibold">{row.snv}</td>
                      <td className="p-3"><StatusBadge tone={row.tone}>{row.stage}</StatusBadge></td>
                      <td className="num p-3 text-muted-foreground">{row.age}</td>
                      <td className="p-3 text-right">
                        <Button asChild size="xs" variant="outline">
                          <Link to="/app/lender/workbench" search={{ id: row.id }}>
                            <Eye className="size-3 mr-1" /> Audit File
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredPipeline.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-muted-foreground">
                        No applications matched the selected filters or saved views.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-border pt-4 mt-3">
              <span className="text-[11px] text-muted-foreground">
                Showing {filteredPipeline.length} of {filteredPipeline.length} entries
              </span>
              <div className="flex gap-1.5">
                <Button
                  size="xs"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); toast.info("Simulating previous page load..."); }}
                >
                  Previous
                </Button>
                <button type="button" className="px-2 py-0.5 text-xs font-semibold text-foreground bg-primary/10 rounded">
                  {currentPage}
                </button>
                <Button
                  size="xs"
                  variant="outline"
                  disabled={true} // Only one page of mock records
                  onClick={() => toast.info("No further pages available.")}
                >
                  Next
                </Button>
              </div>
            </div>
          </SectionCard>

          <div className="grid gap-4 xl:grid-cols-3 text-xs">
            <SectionCard title="Sachet Loan Disbursal Trend" className="xl:col-span-2">
              <div className="flex h-36 items-end gap-2 pt-4">
                {[38, 52, 44, 61, 58, 72, 66, 81, 74, 88, 79, 92].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="PII Audit Access Policies">
              <div className="space-y-3">
                <p className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                  <Lock aria-hidden className="size-4 shrink-0 mt-0.5" />
                  Borrower PII (Personal Identifiable Information) details are locked by default under security rules. Every unmasking event requires a logged reason.
                </p>
                <StatusBadge tone="success">Operational compliance active</StatusBadge>
              </div>
            </SectionCard>
          </div>
        </>
      )}
    </PortalShell>
  );
}
