import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";
import { SectionCard } from "@/components/portal/portal-shell";
import { StatusBadge, type Tone } from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";

const spec: PortalPageSpec = {
  role: "agent",
  title: "Commissions",
  subtitle: "What you have earned, what is due, and when it pays out.",
  kpis: [
    {
      label: "Paid this month",
      value: "₹42,300",
      tone: "success",
    },
    {
      label: "Pending payout",
      value: "₹18,750",
    },
    {
      label: "Next payout",
      value: "07 Apr 2026",
    },
    {
      label: "Lifetime earnings",
      value: "₹6,84,120",
    },
  ],
  table: {
    caption: "Commission ledger",
    entity: "commission entries",
    columns: ["File", "Disbursed", "Loan amount", "Commission", "Status"],
    rows: [
      [
        "SNV-24-118147",
        "09 Mar 2026",
        "₹41,00,000",
        "₹12,300",
        {
          text: "Pending",
          tone: "info",
        },
      ],
      [
        "SNV-24-117902",
        "28 Feb 2026",
        "₹5,00,000",
        "₹6,450",
        {
          text: "Paid",
          tone: "success",
        },
      ],
      [
        "SNV-24-117744",
        "19 Feb 2026",
        "₹2,00,000",
        "₹2,600",
        {
          text: "Paid",
          tone: "success",
        },
      ],
    ],
  },
  emptyTitle: "No commission entries yet",
  emptyExplanation: "An entry is created the day a file you sourced is disbursed.",
  footnote: "Commission is paid by ShriNeo Capital and is never deducted from the borrower's loan amount.",
  metaTitle: "Commissions",
  metaDescription: "Track earned, pending and paid commissions with the payout date for each disbursed file.",
};

export const Route = createFileRoute("/app/agent/commissions")({
  head: () => ({
    meta: [
      { title: "Commissions — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Track earned, pending and paid commissions with the payout date for each disbursed file.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Commissions — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "Track earned, pending and paid commissions with the payout date for each disbursed file.",
      },
    ],
  }),
  component: AgentCommissionsPage,
});

type RecoveryCase = {
  ref: string;
  reason: string;
  cap: number;
  noticeDate: string;
  windowDays: number;
  status:
    | "Notice Issued"
    | "Agent Responding"
    | "Under Review"
    | "Upheld"
    | "Partially Upheld"
    | "Withdrawn"
    | "Appealed"
    | "Appeal Decided";
};

const INITIAL_RECOVERIES: RecoveryCase[] = [
  {
    ref: "CASE-2026-0412",
    reason: "Lender fee reversal",
    cap: 6400,
    noticeDate: "10 Mar 2026",
    windowDays: 30,
    status: "Notice Issued",
  },
  {
    ref: "CASE-2026-0294",
    reason: "Proven misrepresentation",
    cap: 4500,
    noticeDate: "15 Feb 2026",
    windowDays: 30,
    status: "Under Review",
  },
];

const statusTones: Record<RecoveryCase["status"], Tone> = {
  "Notice Issued": "warning",
  "Agent Responding": "info",
  "Under Review": "info",
  Upheld: "error",
  "Partially Upheld": "warning",
  Withdrawn: "success",
  Appealed: "info",
  "Appeal Decided": "success",
};

function RecoveryLedger() {
  const [recoveries, setRecoveries] = useState<RecoveryCase[]>(INITIAL_RECOVERIES);

  const handleAppeal = (ref: string) => {
    setRecoveries((prev) =>
      prev.map((item) => (item.ref === ref ? { ...item, status: "Appealed" as const } : item))
    );
  };

  return (
    <div className="mt-8">
      <SectionCard
        title="Recovery adjustments ledger"
        description="Adjustments are case-linked only. Under our rules, your wallet balance can never go below zero."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[50rem] text-left text-sm">
            <caption className="sr-only">Recovery adjustments ledger</caption>
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">
                  Case Reference
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Reason
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Cap (Max Recovery)
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Notice & Window
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-2 font-medium text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recoveries.map((item) => (
                <tr key={item.ref} className="border-b border-border last:border-b-0">
                  <td className="px-3 py-3 font-semibold text-foreground">{item.ref}</td>
                  <td className="px-3 py-3 text-muted-foreground">{item.reason}</td>
                  <td className="num px-3 py-3 font-semibold text-foreground">
                    {formatINR(item.cap)}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {item.noticeDate} ({item.windowDays}d window)
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge tone={statusTones[item.status]}>{item.status}</StatusBadge>
                  </td>
                  <td className="px-3 py-3 text-right">
                    {item.status === "Notice Issued" || item.status === "Agent Responding" ? (
                      <Button size="xs" variant="outline" onClick={() => handleAppeal(item.ref)}>
                        Appeal
                      </Button>
                    ) : item.status === "Appealed" ? (
                      <span className="text-xs italic text-muted-foreground">Appeal pending</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function AgentCommissionsPage() {
  return <PortalPage spec={spec} extra={<RecoveryLedger />} />;
}
