import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "slug": "fraud",
    "title": "Fraud",
    "subtitle": "Signals, cases and the action taken on each.",
    "notices": [
      {
        "tone": "warning",
        "title": "Three cases involve the same device fingerprint",
        "explanation": "Applications SNV-24-118012, 118044 and 118071 were submitted from one device within nine minutes, using different identities.",
        "safety": "All three files are held. No disbursal has been made and no borrower has been declined on this basis alone.",
        "actions": [
          "Open the linked cases",
          "Notify the lenders"
        ]
      }
    ],
    "kpis": [
      {
        "label": "Open cases",
        "value": "23",
        "tone": "warning"
      },
      {
        "label": "Confirmed this month",
        "value": "7",
        "tone": "error"
      },
      {
        "label": "False positives",
        "value": "31%"
      },
      {
        "label": "Value protected",
        "value": "₹1.8 Cr",
        "tone": "success"
      }
    ],
    "table": {
      "caption": "Open cases",
      "entity": "cases",
      "columns": [
        "Case",
        "Signal",
        "Reference",
        "Raised",
        "Status"
      ],
      "rows": [
        [
          "FR-2026-118",
          "Device reuse across identities",
          "SNV-24-118071",
          "12 Mar 2026",
          {
            "text": "Under review",
            "tone": "warning"
          }
        ],
        [
          "FR-2026-114",
          "Altered bank statement",
          "SNV-24-117902",
          "10 Mar 2026",
          {
            "text": "Confirmed",
            "tone": "error"
          }
        ],
        [
          "FR-2026-109",
          "Agent fee collection report",
          "AG-3311",
          "08 Mar 2026",
          {
            "text": "Investigating",
            "tone": "warning"
          }
        ]
      ]
    },
    "emptyTitle": "No open fraud cases",
    "emptyExplanation": "Signals are evaluated continuously. A new case opens the moment one crosses threshold.",
    "footnote": "A fraud signal never declines an application on its own. A human closes every case with a stated reason.",
    "metaTitle": "Fraud monitoring",
    "metaDescription": "Review fraud signals, open cases and the action taken, with a full evidence trail on each."
  };

export const Route = createFileRoute("/app/admin/fraud")({
  head: () => ({
    meta: [
      { title: "Fraud monitoring — ShriNeo Capital" },
      { name: "description", content: "Review fraud signals, open cases and the action taken, with a full evidence trail on each." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Fraud monitoring — ShriNeo Capital" },
      { property: "og:description", content: "Review fraud signals, open cases and the action taken, with a full evidence trail on each." },
    ],
  }),
  component: AdminFraudPage,
});

function AdminFraudPage() {
  return <PortalPage spec={spec} />;
}
