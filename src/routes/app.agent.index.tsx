import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, IndianRupee, ShieldCheck, UserCheck } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  DataStaleBanner,
  EmptyState,
  InlineState,
  KpiCard,
  NamedLoading,
  OfflineBanner,
  PartialDataNotice,
  RestrictedState,
  RetryPanel,
  SkeletonBlock,
  StatusBadge,
  TableState,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/agent/")({
  head: () => ({
    meta: [
      { title: "Agent dashboard — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Work queues, borrower consent status, files in progress and commission visibility for ShriNeo Capital agents.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Agent dashboard — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Leads, files and commissions for verified ShriNeo agents.",
      },
    ],
  }),
  component: AgentDashboard,
});

const LEADS = [
  { name: "Sunita Rao", product: "Personal loan", amount: 250000, consent: "Approved", age: "2h" },
  { name: "Imran Qureshi", product: "Business loan", amount: 800000, consent: "Pending", age: "5h" },
  { name: "Deepa Nair", product: "Home loan", amount: 3200000, consent: "Approved", age: "1d" },
  { name: "Mahesh Patil", product: "Mortgage loan", amount: 1500000, consent: "Expired", age: "2d" },
];

function AgentDashboard() {
  const { account, data } = usePrototype();

  const banner =
    account === "new" ? (
      <InlineState
        tone="warning"
        title="Verification pending — you can prepare, but not submit"
        explanation="Your KYC is submitted and your agreement is accepted. Training module 2 of 4 is still open."
        actions={[{ label: "Continue training", variant: "default" }, { label: "View checklist" }]}
      />
    ) : account === "action-required" ? (
      <InlineState
        tone="warning"
        title="Payout on hold — bank verification required"
        explanation="A penny-drop verification on your registered account did not match the name on your PAN."
        safety="Earned commission is not lost. It stays in your ledger until verification succeeds."
        actions={[{ label: "Update bank details", variant: "default" }]}
      />
    ) : data === "offline" ? (
      <OfflineBanner />
    ) : data === "stale" ? (
      <DataStaleBanner asOf="today at 08:40 IST" />
    ) : data === "partial" ? (
      <PartialDataNotice missing="Commission reconciliation for March" />
    ) : null;

  return (
    <PortalShell
      role="agent"
      title="Agent workspace"
      subtitle="Verified agent · Nashik · demonstration data"
      banner={banner}
      actions={
        <Button asChild size="sm">
          <Link to="/app/agent/start">Start application</Link>
        </Button>
      }
    >
      {account === "suspended" || account === "restricted" ? (
        <RestrictedState
          reason="Your agent account is temporarily restricted while a commission pattern is reviewed."
          reviewWindow="within 5 working days"
        />
      ) : data === "failed" ? (
        <RetryPanel
          title="We couldn't load your workspace."
          explanation="Leads and file status didn't load on this attempt. No lead was reassigned and no file was changed."
        />
      ) : data === "loading" ? (
        <div className="space-y-5">
          <NamedLoading label="Loading your work queue" />
          <SkeletonBlock rows={6} />
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="New leads" value={data === "empty" ? "0" : "4"} hint="Assigned in last 48h" state={data === "empty" ? "empty" : "ready"} />
            <KpiCard label="Files in progress" value={data === "empty" ? "0" : "11"} hint="3 awaiting borrower" state={data === "empty" ? "empty" : "ready"} />
            <KpiCard
              label="Commission earned"
              value={formatINR(48250)}
              hint="Eligible after lender-confirmed disbursal"
              state={data === "stale" ? "stale" : data === "empty" ? "empty" : "ready"}
            />
            <KpiCard
              label="Clawback adjustment"
              value={account === "action-required" ? `− ${formatINR(6400)}` : formatINR(0)}
              hint="First-payment default recovery"
              tone={account === "action-required" ? "warning" : "neutral"}
            />
          </div>

          <SectionCard
            title="Work queue"
            description="Consent status is shown on every row — no file can progress without borrower approval."
            actions={<StatusBadge tone="info">Filtered: active</StatusBadge>}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <caption className="sr-only">Assigned leads with consent status</caption>
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th scope="col" className="px-3 py-2 font-medium">Borrower</th>
                    <th scope="col" className="px-3 py-2 font-medium">Product</th>
                    <th scope="col" className="px-3 py-2 font-medium">Requested</th>
                    <th scope="col" className="px-3 py-2 font-medium">Consent</th>
                    <th scope="col" className="px-3 py-2 font-medium">Age</th>
                  </tr>
                </thead>
                {data === "empty" ? (
                  <TableState kind="empty" columns={5} entity="leads" />
                ) : (
                  <tbody>
                    {LEADS.map((l) => (
                      <tr key={l.name} className="border-b border-border last:border-0">
                        <th scope="row" className="px-3 py-2.5 text-left font-medium text-foreground">
                          {l.name}
                        </th>
                        <td className="px-3 py-2.5 text-muted-foreground">{l.product}</td>
                        <td className="num px-3 py-2.5 text-foreground">{formatINR(l.amount)}</td>
                        <td className="px-3 py-2.5">
                          <StatusBadge
                            tone={l.consent === "Approved" ? "success" : l.consent === "Pending" ? "warning" : "error"}
                          >
                            {l.consent}
                          </StatusBadge>
                        </td>
                        <td className="num px-3 py-2.5 text-muted-foreground">{l.age}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </SectionCard>

          {data === "empty" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <EmptyState
                compact
                title="No new leads are assigned right now."
                explanation="Leads are distributed as borrowers request assistance in your service area."
                actions={[{ label: "Start an application with borrower consent", to: "/app/agent/start" }]}
              />
              <EmptyState
                compact
                title="No commission has been earned yet."
                explanation="Commission becomes eligible after a participating lender confirms disbursal."
                actions={[{ label: "How commission works", to: "/for-agents", variant: "outline" }]}
              />
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              <SectionCard title="Consent gate" className="lg:col-span-1">
                <div className="flex items-start gap-3">
                  <UserCheck aria-hidden className="mt-0.5 size-5 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Every file requires an OTP approved by the borrower on their own mobile. There is
                    no bypass, and every consent event is recorded.
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="mt-4">
                  <Link to="/app/agent/leads">Open consent requests</Link>
                </Button>
              </SectionCard>

              <SectionCard title="Earnings and payouts" className="lg:col-span-2">
                <ul className="divide-y divide-border text-sm">
                  {[
                    { label: "Estimated (files in review)", value: formatINR(21400), tone: "neutral" as const, note: "Not payable until disbursal is confirmed" },
                    { label: "Earned and verified", value: formatINR(48250), tone: "success" as const, note: "Included in next payout run" },
                    { label: "TDS deducted", value: `− ${formatINR(4825)}`, tone: "neutral" as const, note: "Statutory deduction at source" },
                    { label: "Payout scheduled", value: "18 Mar 2026", tone: "info" as const, note: "To your verified bank account" },
                  ].map((row) => (
                    <li key={row.label} className="flex flex-wrap items-center justify-between gap-2 py-3">
                      <div>
                        <p className="font-medium text-foreground">{row.label}</p>
                        <p className="text-xs text-muted-foreground">{row.note}</p>
                      </div>
                      <span className="num font-semibold text-foreground">{row.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <IndianRupee aria-hidden className="size-4 text-muted-foreground" />
                  <Button asChild size="sm" variant="outline">
                    <Link to="/app/agent/commissions">Open commission ledger</Link>
                  </Button>
                </div>
              </SectionCard>
            </div>
          )}

          <SectionCard title="Compliance" description="Renewals keep your verified status active.">
            <div className="flex flex-wrap items-center gap-3">
              <ShieldCheck aria-hidden className="size-5 text-primary" />
              <StatusBadge tone={account === "new" ? "warning" : "success"}>
                {account === "new" ? "Training renewal due" : "Training current until 12 Sep 2026"}
              </StatusBadge>
              <Button asChild size="sm" variant="ghost">
                <Link to="/app/agent/training">
                  Open training
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
            </div>
          </SectionCard>
        </>
      )}
    </PortalShell>
  );
}
