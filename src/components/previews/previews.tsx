import { formatINR, formatPercent } from "@/lib/format";
import { StatusPill } from "@/components/design-system/section";
import { UiPreview } from "@/components/sections/blocks";

/**
 * Realistic, self-consistent product previews used as marketing visuals.
 * Every figure below is demonstration data and is labelled as such.
 */

const DEMO_LOAN = { amount: 300000, rate: 11.5, apr: 12.4, emi: 9885, tenure: 36 };

export function BorrowerDashboardPreview() {
  return (
    <UiPreview title="Borrower dashboard">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Active application", value: "Personal Loan" },
          { label: "Requested amount", value: formatINR(DEMO_LOAN.amount) },
          { label: "Stage", value: "Lender review" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            <p className="num mt-1 text-sm font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <ol className="mt-4 space-y-2.5">
        {[
          ["Application submitted", "done"],
          ["Documents verified", "done"],
          ["Lender review", "active"],
          ["Decision", "todo"],
          ["Disbursal", "todo"],
        ].map(([label, state]) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <span
              aria-hidden
              className={
                state === "done"
                  ? "size-2.5 rounded-full bg-success"
                  : state === "active"
                    ? "size-2.5 rounded-full bg-primary ring-4 ring-accent"
                    : "size-2.5 rounded-full border border-border-strong"
              }
            />
            <span className={state === "todo" ? "text-muted-foreground" : "font-medium"}>
              {label}
            </span>
            {state === "active" ? (
              <span className="ml-auto">
                <StatusPill tone="info">In progress</StatusPill>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </UiPreview>
  );
}

export function OfferHighlightPreview() {
  return (
    <UiPreview title="Offer comparison" label="Demonstration data">
      <ul className="space-y-2.5">
        {[
          { lender: "Participating Bank A", emi: 9885, apr: 12.4, best: true },
          { lender: "Participating NBFC B", emi: 10086, apr: 14.1, best: false },
          { lender: "Participating Bank C", emi: 7583, apr: 12.9, best: false },
        ].map((offer) => (
          <li
            key={offer.lender}
            className={
              offer.best
                ? "flex items-center justify-between gap-3 rounded-lg border border-primary bg-accent p-3"
                : "flex items-center justify-between gap-3 rounded-lg border border-border p-3"
            }
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{offer.lender}</p>
              <p className="num text-xs text-muted-foreground">APR {formatPercent(offer.apr, 1)}</p>
            </div>
            <p className="num shrink-0 text-sm font-semibold">{formatINR(offer.emi)}/mo</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Ranked by total cost of borrowing. Final terms are set by the participating lender.
      </p>
    </UiPreview>
  );
}

export function NeoChatPreview() {
  const turns = [
    { role: "user", text: "Which loan may fit my needs?" },
    {
      role: "neo",
      text: "Tell me the purpose and amount. I will explain which products are eligible and what each will cost you in total.",
    },
    { role: "user", text: "What does APR mean?" },
    {
      role: "neo",
      text: "APR is the yearly cost of the loan including interest and fees, so two offers can be compared fairly.",
    },
  ];

  return (
    <UiPreview title="Neo — guided support" label="Demonstration conversation">
      <ul className="space-y-2.5">
        {turns.map((turn) => (
          <li
            key={turn.text}
            className={
              turn.role === "user"
                ? "ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm border border-border bg-card px-3 py-2 text-sm"
                : "w-fit max-w-[85%] rounded-xl rounded-bl-sm bg-accent px-3 py-2 text-sm text-accent-foreground"
            }
          >
            {turn.text}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Neo provides guidance. Final loan decisions are made by participating lenders.
      </p>
    </UiPreview>
  );
}

export function KfsPreview() {
  const rows: [string, string][] = [
    ["Participating lender", "Participating Bank A"],
    ["Loan amount", formatINR(DEMO_LOAN.amount)],
    ["Interest rate p.a.", formatPercent(DEMO_LOAN.rate, 1)],
    ["APR (all-inclusive)", formatPercent(DEMO_LOAN.apr, 1)],
    ["Processing fee", formatINR(3540)],
    ["Monthly EMI", formatINR(DEMO_LOAN.emi)],
    ["Tenure", `${DEMO_LOAN.tenure} months`],
    ["Total repayment", formatINR(DEMO_LOAN.emi * DEMO_LOAN.tenure)],
    ["Cooling-off period", "3 days from signing"],
  ];

  return (
    <UiPreview title="Key Fact Statement" label="Illustrative example">
      <dl className="divide-y divide-border">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 py-2">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="num text-right text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </UiPreview>
  );
}

export function AgentDashboardPreview() {
  return (
    <UiPreview title="Agent workspace" label="Demonstration data">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Open leads", value: "6" },
          { label: "Files in review", value: "3" },
          { label: "Ledger balance", value: formatINR(18400) },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            <p className="num mt-1 text-sm font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      <table className="mt-4 w-full text-sm">
        <caption className="sr-only">Demonstration list of assisted applications</caption>
        <thead>
          <tr className="text-left text-[11px] text-muted-foreground uppercase">
            <th scope="col" className="pb-2 font-medium">
              File
            </th>
            <th scope="col" className="pb-2 font-medium">
              Product
            </th>
            <th scope="col" className="pb-2 text-right font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[
            ["SNV-10428", "Business Loan", "Consent pending"],
            ["SNV-10431", "Personal Loan", "Documents verified"],
            ["SNV-10436", "Home Loan", "Lender review"],
          ].map(([id, product, status]) => (
            <tr key={id}>
              <td className="num py-2">{id}</td>
              <td className="py-2 text-muted-foreground">{product}</td>
              <td className="py-2 text-right">
                <StatusPill tone="neutral">{status}</StatusPill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </UiPreview>
  );
}
