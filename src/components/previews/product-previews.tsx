import { ArrowUpRight, Check } from "lucide-react";
import { formatINR } from "@/lib/format";
import { StatusPill } from "@/components/design-system/section";

/**
 * Three production-grade product previews used as marketing visuals.
 * All figures are one self-consistent demonstration application.
 */

const DEMO = {
  amount: 300000,
  tenure: 36,
  applicationId: "SNV-2026-004182",
};

const offers = [
  {
    lender: "Aarambh Finance",
    rate: 11.5,
    apr: 12.4,
    emi: 9885,
    fee: 3540,
    total: 355860,
    match: "Lowest total cost for your profile",
    selected: true,
  },
  {
    lender: "Meridian Bank",
    rate: 11.2,
    apr: 12.9,
    emi: 9843,
    fee: 6000,
    total: 360348,
    match: "Lowest headline rate, higher fee",
    selected: false,
  },
  {
    lender: "Setu Capital NBFC",
    rate: 12.6,
    apr: 13.1,
    emi: 10061,
    fee: 2500,
    total: 364696,
    match: "Fastest indicative decision",
    selected: false,
  },
];

function Chrome({
  title,
  children,
  note = "Demonstration data",
}: {
  title: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-panel)]">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5">
        <p className="truncate text-xs font-semibold text-foreground">{title}</p>
        <p className="label-micro shrink-0 text-muted-foreground">{note}</p>
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}

/* ------------------------------------------------- 1. Offer comparison */

export function OfferComparisonPanel() {
  return (
    <Chrome title="Compare eligible offers · Personal Loan">
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3">
        <p className="text-sm text-muted-foreground">
          <span className="num font-medium text-foreground">{formatINR(DEMO.amount)}</span> over{" "}
          <span className="num font-medium text-foreground">{DEMO.tenure}</span> months
        </p>
        <p className="label-micro text-muted-foreground">Ranked by total cost</p>
      </div>

      <div className="-mx-1 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <caption className="sr-only">
            Three demonstration lender offers compared on rate, APR, EMI, processing fee and total
            repayment
          </caption>
          <thead>
            <tr className="border-y border-border text-left">
              {["Lender", "Rate", "APR", "EMI", "Fee", "Total repayment"].map((head, i) => (
                <th
                  key={head}
                  scope="col"
                  className={`label-micro py-2 font-semibold text-muted-foreground ${i === 0 ? "pl-1" : "text-right"}`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr
                key={offer.lender}
                className={
                  offer.selected ? "border-b border-border bg-accent/60" : "border-b border-border"
                }
              >
                <th scope="row" className="py-3 pl-1 text-left align-top font-medium">
                  <span className="flex items-center gap-2">
                    {offer.selected ? (
                      <span
                        aria-hidden
                        className="grid size-4 shrink-0 place-items-center rounded-full bg-success/15 text-success"
                      >
                        <Check className="size-3" />
                      </span>
                    ) : (
                      <span
                        aria-hidden
                        className="size-4 shrink-0 rounded-full border border-border-strong"
                      />
                    )}
                    <span className="min-w-0">
                      {offer.lender}
                      <span className="block text-xs font-normal text-muted-foreground">
                        {offer.match}
                      </span>
                    </span>
                  </span>
                </th>
                <td className="num py-3 text-right align-top">{offer.rate}%</td>
                <td className="num py-3 text-right align-top font-medium">{offer.apr}%</td>
                <td className="num py-3 text-right align-top">{formatINR(offer.emi)}</td>
                <td className="num py-3 text-right align-top text-muted-foreground">
                  {formatINR(offer.fee)}
                </td>
                <td className="num py-3 pr-1 text-right align-top font-semibold">
                  {formatINR(offer.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Offers are not ranked by commercial arrangement. Final terms are set by the participating
        lender.
      </p>
    </Chrome>
  );
}

/* ------------------------------------------------ 2. Borrower dashboard */

export function BorrowerDashboardPanel() {
  return (
    <Chrome title="Your applications">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Application", value: "Personal Loan" },
          { label: "Requested", value: formatINR(DEMO.amount) },
          { label: "Indicative EMI", value: formatINR(offers[0]!.emi) },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-surface p-3">
            <p className="label-micro text-muted-foreground">{stat.label}</p>
            <p className="num mt-1.5 text-sm font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-border">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2.5">
          <p className="num text-xs text-muted-foreground">{DEMO.applicationId}</p>
          <StatusPill tone="info">Lender review</StatusPill>
        </div>
        <ul className="divide-y divide-border">
          {[
            { label: "Key Fact Statement reviewed", meta: "12 Mar, 10:24" },
            { label: "Consent recorded (bank statements)", meta: "12 Mar, 10:26" },
            { label: "Application sent to Aarambh Finance", meta: "12 Mar, 10:31" },
          ].map((row) => (
            <li key={row.label} className="flex items-center gap-3 px-3 py-2.5 text-sm">
              <Check aria-hidden className="size-4 shrink-0 text-success" />
              <span className="min-w-0 flex-1 truncate">{row.label}</span>
              <span className="num shrink-0 text-xs text-muted-foreground">{row.meta}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
        Open full application
        <ArrowUpRight aria-hidden className="size-3.5" />
      </p>
    </Chrome>
  );
}

/* --------------------------------------------- 3. Application tracking */

const stages = [
  { label: "Application submitted", state: "done", meta: "12 Mar" },
  { label: "Documents verified", state: "done", meta: "13 Mar" },
  { label: "Lender review", state: "active", meta: "In progress" },
  { label: "Decision", state: "todo", meta: "Lender" },
  { label: "Disbursal to your bank account", state: "todo", meta: "Lender" },
] as const;

export function ApplicationTrackingPanel() {
  return (
    <Chrome title={`Application ${DEMO.applicationId}`}>
      <ol className="relative space-y-0">
        {stages.map((stage, i) => (
          <li key={stage.label} className="relative flex gap-4 pb-5 last:pb-0">
            {i < stages.length - 1 ? (
              <span
                aria-hidden
                className={`absolute top-5 left-[7px] h-full w-px ${stage.state === "done" ? "bg-success/50" : "bg-border"}`}
              />
            ) : null}
            <span
              aria-hidden
              className={
                stage.state === "done"
                  ? "z-10 mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-success text-white"
                  : stage.state === "active"
                    ? "z-10 mt-1 size-4 shrink-0 rounded-full border-2 border-primary bg-card ring-4 ring-accent"
                    : "z-10 mt-1 size-4 shrink-0 rounded-full border border-border-strong bg-card"
              }
            >
              {stage.state === "done" ? <Check className="size-2.5" /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={`block text-sm ${stage.state === "todo" ? "text-muted-foreground" : "font-medium"}`}
              >
                {stage.label}
              </span>
              <span className="num block text-xs text-muted-foreground">{stage.meta}</span>
            </span>
            {stage.state === "active" ? <StatusPill tone="info">Awaiting lender</StatusPill> : null}
          </li>
        ))}
      </ol>
      <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
        Stages marked “Lender” are controlled by the participating lender.
      </p>
    </Chrome>
  );
}
