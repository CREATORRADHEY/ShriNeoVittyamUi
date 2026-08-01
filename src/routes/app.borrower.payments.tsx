import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";

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

export const Route = createFileRoute("/app/borrower/payments")({
  head: () => ({
    meta: [
      { title: "Repayments — ShriNeo Capital" },
      {
        name: "description",
        content: "Your EMI schedule, payment history and what to do if a payment fails.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Repayments — ShriNeo Capital" },
      { property: "og:description", content: "EMI schedule, receipts and clear failed-payment recovery." },
    ],
  }),
  component: PaymentsPage,
});

const HISTORY = [
  ["01 Mar 2026", 21460, "Paid", "success"],
  ["01 Feb 2026", 21460, "Paid", "success"],
  ["01 Jan 2026", 21460, "Failed — retried and paid", "warning"],
  ["01 Dec 2025", 21460, "Paid", "success"],
] as const;

function PaymentsPage() {
  const { data, application } = usePrototype();
  const loading = data === "loading";

  return (
    <PortalShell
      role="borrower"
      title="Repayments"
      subtitle="Collected by your lender. ShriNeo Capital never holds your money."
    >
      {data === "stale" ? <DataStaleBanner asOf="12 Mar 2026, 06:00 IST" /> : null}

      {data === "empty" || application === "submitted" ? (
        <EmptyState
          icon={Receipt}
          title="No repayments due yet."
          explanation="Your EMI schedule appears here once a lender disburses your loan."
          actions={[{ label: "Track your application", to: "/app/borrower/applications" }]}
        />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard label="Next EMI" value={formatINR(21460)} hint="Due 01 Apr 2026" state={loading ? "loading" : "ready"} />
            <KpiCard label="Outstanding principal" value={formatINR(318740)} state={loading ? "loading" : "ready"} />
            <KpiCard label="EMIs paid" value="9 of 24" state={loading ? "loading" : "ready"} />
            <KpiCard
              label="Interest paid to date"
              value={formatINR(38210)}
              state={data === "partial" ? "empty" : loading ? "loading" : "ready"}
              {...(data === "partial"
                ? { hint: "Not received from the lender yet — shown as unavailable, not zero." }
                : {})}
            />
          </div>

          <InlineState
            tone="info"
            title="Payments are made to your lender, Kaveri Bank"
            explanation="Your EMI is collected by auto-debit from your registered bank account. ShriNeo Capital does not collect, hold or transfer repayments."
            actions={[{ label: "View mandate details" }]}
          />

          {data === "failed" ? (
            <InlineState
              tone="error"
              live
              title="Your March EMI could not be collected"
              explanation="The auto-debit was declined by your bank, most commonly because of insufficient balance on the due date."
              safety="No penalty has been applied yet. You have until 07 Apr 2026 to pay before your lender charges a late fee."
              actions={[
                { label: "Pay now", variant: "default" },
                { label: "Change payment date" },
                { label: "Talk to support", to: "/contact", variant: "ghost" },
              ]}
            />
          ) : null}

          <SectionCard
            title="Payment history"
            actions={<Button size="sm" variant="outline">Download statement</Button>}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <caption className="sr-only">Repayment history for loan SNV-LN-20418</caption>
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
                          <Button size="sm" variant="ghost">Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </SectionCard>
        </>
      )}
    </PortalShell>
  );
}
