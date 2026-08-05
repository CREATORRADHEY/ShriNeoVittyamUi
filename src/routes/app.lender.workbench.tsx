import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "lender",
    "slug": "workbench",
    "title": "Credit workbench",
    "subtitle": "One file at a time, in a fixed decision order.",
    "kpis": [
      {
        "label": "In queue",
        "value": "42"
      },
      {
        "label": "Assigned to you",
        "value": "8"
      },
      {
        "label": "Breaching SLA in 2h",
        "value": "3",
        "tone": "warning"
      },
      {
        "label": "Decided today",
        "value": "27",
        "tone": "success"
      }
    ],
    "table": {
      "caption": "Decision queue",
      "entity": "applications",
      "columns": [
        "Application",
        "Product",
        "Amount",
        "Bureau",
        "SNV band",
        "Stage"
      ],
      "rows": [
        [
          "SNV-24-118204",
          "Personal",
          "₹3,00,000",
          "742",
          "B+",
          {
            "text": "Ready to decide",
            "tone": "info"
          }
        ],
        [
          "SNV-24-118198",
          "Business",
          "₹9,50,000",
          "688",
          "B",
          {
            "text": "Manual review",
            "tone": "warning"
          }
        ],
        [
          "SNV-24-118181",
          "Mortgage",
          "₹24,00,000",
          "771",
          "A",
          {
            "text": "Docs verified",
            "tone": "success"
          }
        ]
      ]
    },
    "panels": [
      {
        "title": "Decision order is fixed",
        "body": "Files are served oldest first within each SLA band, so no file can be skipped quietly."
      },
      {
        "title": "Every decision needs a reason",
        "body": "Declines require a reason code, which is what the borrower is shown in plain language."
      }
    ],
    "emptyTitle": "The queue is clear",
    "emptyExplanation": "No file is waiting on you. New applications appear here the moment they pass automated checks.",
    "footnote": "PII is masked by default. Unmasking is logged with your user ID and stated reason.",
    "metaTitle": "Credit workbench",
    "metaDescription": "Review applications in a fixed decision order with bureau, bank and trust signals side by side."
  };

export const Route = createFileRoute("/app/lender/workbench")({
  head: () => ({
    meta: [
      { title: "Credit workbench — ShriNeo Capital" },
      { name: "description", content: "Review applications in a fixed decision order with bureau, bank and trust signals side by side." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Credit workbench — ShriNeo Capital" },
      { property: "og:description", content: "Review applications in a fixed decision order with bureau, bank and trust signals side by side." },
    ],
  }),
  component: LenderWorkbenchPage,
});

function LenderWorkbenchPage() {
  return <PortalPage spec={spec} />;
}
