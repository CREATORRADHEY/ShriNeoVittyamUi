import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "lender",
    "title": "Risk",
    "subtitle": "Early warning indicators against your configured thresholds.",
    "kpis": [
      {
        "label": "FPD",
        "value": "0.9%",
        "hint": "Threshold 1.2%",
        "tone": "success"
      },
      {
        "label": "NPA (90+)",
        "value": "1.8%",
        "hint": "Threshold 2.5%",
        "tone": "success"
      },
      {
        "label": "Roll rate 1→30",
        "value": "4.2%",
        "hint": "Threshold 4.0%",
        "tone": "warning"
      },
      {
        "label": "Fraud flags open",
        "value": "6",
        "tone": "warning"
      }
    ],
    "table": {
      "caption": "Concentration",
      "entity": "segments",
      "columns": [
        "Segment",
        "Exposure",
        "Share",
        "Limit",
        "Status"
      ],
      "rows": [
        [
          "Personal, MP",
          "₹41.2 Cr",
          "22.4%",
          "25%",
          {
            "text": "Within limit",
            "tone": "success"
          }
        ],
        [
          "Business, MP",
          "₹28.9 Cr",
          "15.7%",
          "15%",
          {
            "text": "Breached",
            "tone": "error"
          }
        ],
        [
          "Home, PAN India",
          "₹62.4 Cr",
          "33.9%",
          "40%",
          {
            "text": "Within limit",
            "tone": "success"
          }
        ]
      ]
    },
    "emptyTitle": "No risk data for this window",
    "emptyExplanation": "Indicators are recalculated nightly. Pick a completed period to see them.",
    "metaTitle": "Risk indicators",
    "metaDescription": "First payment default, roll rates, fraud flags and concentration against your configured thresholds."
  };

export const Route = createFileRoute("/app/lender/risk")({
  head: () => ({
    meta: [
      { title: "Risk indicators — ShriNeo Capital" },
      { name: "description", content: "First payment default, roll rates, fraud flags and concentration against your configured thresholds." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Risk indicators — ShriNeo Capital" },
      { property: "og:description", content: "First payment default, roll rates, fraud flags and concentration against your configured thresholds." },
    ],
  }),
  component: LenderRiskPage,
});

function LenderRiskPage() {
  return <PortalPage spec={spec} />;
}
