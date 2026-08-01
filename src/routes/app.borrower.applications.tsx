import { createFileRoute } from "@tanstack/react-router";
import { FileClock } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  DataStaleBanner,
  EmptyState,
  InlineState,
  StatusBadge,
  StatusTimeline,
  TableState,
  type TimelineItem,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/borrower/applications")({
  head: () => ({
    meta: [
      { title: "Your applications — ShriNeo Capital" },
      {
        name: "description",
        content: "Track every loan application, what each status means and what happens next.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Your applications — ShriNeo Capital" },
      { property: "og:description", content: "Plain-language application tracking with clear next steps." },
    ],
  }),
  component: ApplicationsPage,
});

const TIMELINE: Record<string, TimelineItem[]> = {
  base: [
    {
      label: "Application submitted",
      meaning: "We received your details and shared them with matched lenders, as you agreed.",
      timestamp: "12 Mar 2026, 10:04",
      source: "ShriNeo Capital",
      state: "done",
    },
    {
      label: "Documents verified",
      meaning: "Your identity and bank statements passed the automated checks.",
      timestamp: "12 Mar 2026, 10:41",
      source: "Verification service",
      state: "done",
    },
    {
      label: "With lenders for review",
      meaning: "Six lenders are assessing your request. Each decides independently.",
      timestamp: "12 Mar 2026, 11:02",
      source: "Participating lenders",
      state: "current",
      nextAction: "No action needed from you right now.",
      expected: "Most lenders respond within 24 hours",
    },
    {
      label: "Offers available",
      meaning: "You compare offers side by side and choose one. You are never obliged to accept.",
      timestamp: "Pending",
      source: "ShriNeo Capital",
      state: "upcoming",
    },
    {
      label: "Disbursal by your chosen lender",
      meaning: "The lender transfers funds to your verified bank account.",
      timestamp: "Pending",
      source: "Lender",
      state: "upcoming",
    },
  ],
};

function ApplicationsPage() {
  const { application, data } = usePrototype();

  return (
    <PortalShell
      role="borrower"
      title="Your applications"
      subtitle="What has happened, what is happening now, and what comes next"
    >
      {data === "stale" ? <DataStaleBanner asOf="12 Mar 2026, 11:20 IST" /> : null}

      {data === "empty" ? (
        <EmptyState
          icon={FileClock}
          title="You haven't applied yet."
          explanation="When you submit an application it will appear here with a plain-language status at every stage."
          actions={[
            { label: "Apply for a loan", to: "/app/borrower/apply" },
            { label: "Estimate your EMI first", to: "/emi-calculator", variant: "outline" },
          ]}
        />
      ) : (
        <>
          {application === "rejected" ? (
            <InlineState
              tone="warning"
              title="No lender was able to approve this request"
              explanation="Lenders declined based on their own credit policies. This is a decision by each lender, not by ShriNeo Capital."
              safety="Your credit record is unaffected by applying again later, and your documents remain saved."
              actions={[
                { label: "See what may help", to: "/how-it-works", variant: "default" },
                { label: "Try a smaller amount", to: "/app/borrower/apply" },
              ]}
            />
          ) : null}
          {application === "closed" ? (
            <InlineState
              tone="neutral"
              title="This application is closed"
              explanation="It was completed and closed on 13 Mar 2026. Nothing further is outstanding."
              safety="Your closure letter and statements remain available to download."
              actions={[{ label: "Start a new application", to: "/app/borrower/apply", variant: "default" }]}
            />
          ) : null}

          <SectionCard
            title="Personal loan · SNV-APP-48213"
            description={`${formatINR(450000)} requested over 24 months`}
            actions={<StatusBadge tone={application === "rejected" ? "warning" : "info"}>In review</StatusBadge>}
          >
            <StatusTimeline items={TIMELINE["base"] ?? []} />
          </SectionCard>
        </>
      )}

      <SectionCard title="All applications">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">All loan applications and their current status</caption>
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Reference</th>
                <th scope="col" className="px-3 py-2 font-medium">Product</th>
                <th scope="col" className="px-3 py-2 font-medium">Amount</th>
                <th scope="col" className="px-3 py-2 font-medium">Status</th>
                <th scope="col" className="px-3 py-2 font-medium">Action</th>
              </tr>
            </thead>
            {data === "populated" && application !== "draft" ? (
              <tbody>
                {[
                  ["SNV-APP-48213", "Personal loan", 450000, "In review"],
                  ["SNV-APP-41902", "Business loan", 900000, "Closed"],
                ].map(([ref, product, amt, status]) => (
                  <tr key={String(ref)} className="border-b border-border">
                    <td className="num px-3 py-3 text-foreground">{ref}</td>
                    <td className="px-3 py-3 text-muted-foreground">{product}</td>
                    <td className="num px-3 py-3 text-foreground">{formatINR(Number(amt))}</td>
                    <td className="px-3 py-3">
                      <StatusBadge tone={status === "Closed" ? "neutral" : "info"}>{String(status)}</StatusBadge>
                    </td>
                    <td className="px-3 py-3">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <TableState
                kind={
                  data === "loading"
                    ? "loading"
                    : data === "failed"
                      ? "failed"
                      : data === "offline"
                        ? "offline"
                        : data === "stale"
                          ? "stale"
                          : data === "partial"
                            ? "partial"
                            : "empty"
                }
                columns={5}
                entity="applications"
              />
            )}
          </table>
        </div>
      </SectionCard>
    </PortalShell>
  );
}
