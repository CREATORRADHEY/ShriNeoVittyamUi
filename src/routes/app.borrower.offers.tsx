import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  DataStaleBanner,
  EmptyState,
  InlineState,
  LongWaitPanel,
  PartialDataNotice,
  StatusBadge,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/borrower/offers")({
  head: () => ({
    meta: [
      { title: "Your offers — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Compare lender offers on APR, total repayment and fees before you accept anything.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Your offers — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Side-by-side lender offers with total cost shown up front.",
      },
    ],
  }),
  component: OffersPage,
});

const OFFERS = [
  {
    lender: "SBI Digital Finance",
    apr: "12.8%",
    emi: 11540,
    total: 415440,
    fee: 3500,
    expiry: "22 Aug, 18:00",
    best: true,
  },
  {
    lender: "Kaveri Bank",
    apr: "13.4%",
    emi: 11640,
    total: 419040,
    fee: 4500,
    expiry: "23 Aug, 12:00",
  },
  {
    lender: "Meridian NBFC",
    apr: "14.1%",
    emi: 11790,
    total: 424440,
    fee: 2500,
    expiry: "24 Aug, 09:00",
  },
];

function OffersPage() {
  const { data, application } = usePrototype();

  return (
    <PortalShell
      role="borrower"
      title="Your offers"
      subtitle="Every figure below is the cost you would actually pay"
    >
      {data === "stale" ? <DataStaleBanner asOf="12 Mar 2026, 11:20 IST" /> : null}
      {data === "partial" ? <PartialDataNotice missing="one lender's fee schedule" /> : null}

      {data === "loading" ? (
        <LongWaitPanel
          stage={2}
          stages={[
            "Sharing your consented details with matched lenders",
            "Lenders assessing your request",
            "Preparing your comparison",
          ]}
          expected="Most offers arrive within 2 minutes"
        />
      ) : null}

      {data === "empty" || application === "rejected" ? (
        <EmptyState
          icon={Scale}
          title="No offers are available yet."
          explanation="Lenders either haven't responded yet or were unable to approve this request under their own credit policy. This is their decision, not ShriNeo Capital's."
          actions={[
            { label: "Adjust amount or tenure", to: "/app/borrower/apply" },
            { label: "Understand lender criteria", to: "/how-it-works", variant: "outline" },
          ]}
        />
      ) : null}

      {data === "populated" || data === "stale" || data === "partial" ? (
        <>
          <InlineState
            tone="info"
            title="Comparing offers does not affect your credit record"
            explanation="You can review these offers as long as they remain valid. A footprint is only created when you accept one and the lender proceeds."
          />

          <SectionCard
            title="Three offers matched"
            description="Sorted by total amount repayable — not by the headline rate."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {OFFERS.map((o) => (
                <article
                  key={o.lender}
                  className={`flex flex-col rounded-xl border p-5 ${
                    o.best ? "border-primary bg-primary/5" : "border-border bg-surface"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{o.lender}</h3>
                    {o.best ? <StatusBadge tone="success">Lowest total cost</StatusBadge> : null}
                  </div>
                  <dl className="mt-4 space-y-2 text-sm">
                    {[
                      ["APR", o.apr],
                      ["Monthly EMI", formatINR(o.emi)],
                      ["Total repayable", formatINR(o.total)],
                      ["Processing fee", o.fee === 0 ? "None" : formatINR(o.fee)],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-3">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="num font-medium text-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="num mt-3 text-xs text-warning">Valid until {o.expiry}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" aria-label={`Accept ${o.lender} offer`}>
                      Accept {o.lender} Offer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label={`View ${o.lender} Key Fact Statement (KFS)`}
                    >
                      View {o.lender} KFS
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>

          <InlineState
            tone="warning"
            title="One offer expires in under 6 hours"
            explanation="If an offer lapses you can ask the lender to re-issue it, though the terms may change."
            actions={[{ label: "Request a refreshed offer" }]}
          />
        </>
      ) : null}

      {data === "failed" ? (
        <InlineState
          tone="error"
          live
          title="We couldn't load your offers"
          explanation="The request to our offer service didn't complete. Your offers still exist and nothing was accepted or withdrawn."
          safety="No offer was accepted on your behalf. No credit footprint was created."
          actions={[
            { label: "Try again", variant: "default", onClick: () => window.location.reload() },
            { label: "Contact support", to: "/contact" },
          ]}
        />
      ) : null}
    </PortalShell>
  );
}
