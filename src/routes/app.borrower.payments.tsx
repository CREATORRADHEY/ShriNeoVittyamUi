import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Receipt, CheckCircle2, ShieldAlert, FileText, Landmark } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  DataStaleBanner,
  EmptyState,
  InlineState,
  KpiCard,
  StatusBadge,
  TableState,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/borrower/payments")({
  head: () => ({
    meta: [
      { title: "Repayments — ShriNeo Capital" },
      {
        name: "description",
        content: "Your EMI schedule, payment history and mandate status.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PaymentsPage,
});

const HISTORY = [
  ["05 Mar 2026", 11540, "Paid via NACH", "success"],
  ["05 Feb 2026", 11540, "Paid via NACH", "success"],
  ["05 Jan 2026", 11540, "Failed — retried and paid", "warning"],
  ["05 Dec 2025", 11540, "Paid via NACH", "success"],
  ["05 Nov 2025", 11540, "Paid via NACH", "success"],
  ["05 Oct 2025", 11540, "Paid via NACH", "success"],
] as const;

function PaymentsPage() {
  const { data, application, activeLoan, activePayment, account } = usePrototype();
  const [mandateOpen, setMandateOpen] = useState(false);
  const loading = data === "loading";

  const isNewOrEmpty = account === "new" || data === "empty" || (!activeLoan && application !== "closed");

  return (
    <PortalShell
      role="borrower"
      title="Repayments"
      subtitle="Collected by your lender. ShriNeo Capital never holds your money."
    >
      {data === "stale" ? <DataStaleBanner asOf="12 Mar 2026, 06:00 IST" /> : null}

      {isNewOrEmpty ? (
        <EmptyState
          icon={Receipt}
          title="No repayments due yet."
          explanation="Your EMI schedule appears here once a lender disburses your loan."
          actions={[{ label: "Track your application", to: "/app/borrower/applications" }]}
        />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              label="Next EMI"
              value={application === "closed" ? "₹0" : formatINR(11540)}
              hint={application === "closed" ? "Loan closed" : "Due 05 Apr 2026"}
              state={loading ? "loading" : "ready"}
            />
            <KpiCard
              label="Outstanding Principal"
              value={application === "closed" ? "₹0" : formatINR(284350)}
              state={loading ? "loading" : "ready"}
            />
            <KpiCard
              label="EMIs Paid"
              value={application === "closed" ? "36 of 36" : "6 of 36"}
              state={loading ? "loading" : "ready"}
            />
            <KpiCard
              label="Interest Paid to Date"
              value={application === "closed" ? formatINR(65440) : formatINR(14780)}
              state={data === "partial" ? "empty" : loading ? "loading" : "ready"}
            />
          </div>

          {application === "closed" ? (
            <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 text-xs">
              <CheckCircle2 className="size-5 shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <p className="font-semibold text-sm">Loan Account Settled</p>
                <p className="mt-1">
                  Outstanding principal is zero. Auto-debit bank mandate has been deactivated.
                </p>
              </div>
            </div>
          ) : (
            <InlineState
              tone="info"
              title="Auto-debit Mandate is Active with SBI Digital Finance"
              explanation="Your EMIs are collected automatically from your State Bank of India account ending in *9204."
              actions={[{ label: "View mandate details", onClick: () => setMandateOpen(true) }]}
            />
          )}

          {data === "failed" && application !== "closed" ? (
            <InlineState
              tone="error"
              live
              title="Your March EMI payment failed"
              explanation="The auto-debit on 05 Mar declined due to insufficient balance."
              safety="No penalty has been applied yet. Retrying via NACH on 15 Mar. Pay manually now to prevent late fees."
              actions={[
                { label: "Pay Manually via Gateway", variant: "default", onClick: () => toast.success("Gateway interface launched.") },
                { label: "Retry Mandate", onClick: () => toast.success("Mandate retry scheduled.") },
                { label: "Support Ticket", to: "/app/borrower/support", variant: "ghost" },
              ]}
            />
          ) : null}

          <SectionCard
            title="Payment History Ledger"
            actions={<Button size="sm" variant="outline" onClick={() => toast.success("Full statements downloaded.")}>Download statement</Button>}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <caption className="sr-only">Repayment ledger for loan LN-2026-092</caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th scope="col" className="px-3 py-2 font-medium">Date</th>
                    <th scope="col" className="px-3 py-2 font-medium">Amount</th>
                    <th scope="col" className="px-3 py-2 font-medium">Status</th>
                    <th scope="col" className="px-3 py-2 font-medium">Receipt</th>
                  </tr>
                </thead>
                {loading || data === "failed" || data === "offline" ? (
                  <TableState
                    kind={loading ? "loading" : data === "offline" ? "offline" : "failed"}
                    columns={4}
                    entity="payments"
                  />
                ) : (
                  <tbody>
                    {HISTORY.map(([date, amount, status, tone]) => (
                      <tr key={date} className="border-b border-border">
                        <td className="num px-3 py-3 text-foreground">{date}</td>
                        <td className="num px-3 py-3 text-foreground">{formatINR(amount)}</td>
                        <td className="px-3 py-3">
                          <StatusBadge tone={tone}>{status}</StatusBadge>
                        </td>
                        <td className="px-3 py-3">
                          <Button size="sm" variant="ghost" onClick={() => toast.success(`Receipt for ${date} downloaded.`)}>Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </SectionCard>

          {/* MANDATE DETAILS DIALOG OVERLAY */}
          {mandateOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <div className="w-full max-w-[400px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] space-y-4">
                <div className="flex items-center gap-2">
                  <Landmark className="size-6 text-primary" />
                  <h3 className="font-bold text-base text-foreground">e-Mandate Details</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Lender Beneficiary</span>
                    <span className="font-semibold text-foreground">SBI Digital Finance</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Bank Account</span>
                    <span className="font-semibold text-foreground">State Bank of India (*9204)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Mandate Limit</span>
                    <span className="font-semibold text-foreground">₹20,000 per month</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Mandate ID</span>
                    <span className="font-mono text-foreground font-semibold">UMRN9938491024</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="size-3.5" /> Active & Verified
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-border flex justify-end">
                  <Button size="sm" onClick={() => setMandateOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PortalShell>
  );
}
