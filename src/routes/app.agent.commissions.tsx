import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "agent",
    "title": "Commissions",
    "subtitle": "What you have earned, what is due, and when it pays out.",
    "kpis": [
      {
        "label": "Paid this month",
        "value": "₹42,300",
        "tone": "success"
      },
      {
        "label": "Pending payout",
        "value": "₹18,750"
      },
      {
        "label": "Next payout",
        "value": "07 Apr 2026"
      },
      {
        "label": "Lifetime earnings",
        "value": "₹6,84,120"
      }
    ],
    "table": {
      "caption": "Commission ledger",
      "entity": "commission entries",
      "columns": [
        "File",
        "Disbursed",
        "Loan amount",
        "Commission",
        "Status"
      ],
      "rows": [
        [
          "SNV-24-118147",
          "09 Mar 2026",
          "₹41,00,000",
          "₹12,300",
          {
            "text": "Pending",
            "tone": "info"
          }
        ],
        [
          "SNV-24-117902",
          "28 Feb 2026",
          "₹5,00,000",
          "₹6,450",
          {
            "text": "Paid",
            "tone": "success"
          }
        ],
        [
          "SNV-24-117744",
          "19 Feb 2026",
          "₹2,00,000",
          "₹2,600",
          {
            "text": "Paid",
            "tone": "success"
          }
        ]
      ]
    },
    "emptyTitle": "No commission entries yet",
    "emptyExplanation": "An entry is created the day a file you sourced is disbursed.",
    "footnote": "Commission is paid by ShriNeo Capital and is never deducted from the borrower's loan amount.",
    "metaTitle": "Commissions",
    "metaDescription": "Track earned, pending and paid commissions with the payout date for each disbursed file."
  };

export const Route = createFileRoute("/app/agent/commissions")({
  head: () => ({
    meta: [
      { title: "Commissions — ShriNeo Capital" },
      { name: "description", content: "Track earned, pending and paid commissions with the payout date for each disbursed file." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Commissions — ShriNeo Capital" },
      { property: "og:description", content: "Track earned, pending and paid commissions with the payout date for each disbursed file." },
    ],
  }),
  component: AgentCommissionsPage,
});

function AgentCommissionsPage() {
  return <PortalPage spec={spec} />;
}
