import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "slug": "trust-score",
    "title": "SNV Trust Score",
    "subtitle": "Model version, drift and fairness monitoring.",
    "kpis": [
      {
        "label": "Model version",
        "value": "v4.2",
        "hint": "Live since 02 Feb 2026"
      },
      {
        "label": "Median score",
        "value": "63"
      },
      {
        "label": "Population drift",
        "value": "Low",
        "tone": "success"
      },
      {
        "label": "Fairness checks",
        "value": "Passed",
        "tone": "success"
      }
    ],
    "table": {
      "caption": "Score bands",
      "entity": "bands",
      "columns": [
        "Band",
        "Score range",
        "Share",
        "Approval rate",
        "90+ default"
      ],
      "rows": [
        [
          "A",
          "80–100",
          "18%",
          "72%",
          "0.4%"
        ],
        [
          "B+",
          "70–79",
          "24%",
          "58%",
          "0.9%"
        ],
        [
          "B",
          "60–69",
          "29%",
          "41%",
          "1.6%"
        ],
        [
          "C",
          "40–59",
          "22%",
          "19%",
          "3.2%"
        ],
        [
          "D",
          "0–39",
          "7%",
          "4%",
          "6.8%"
        ]
      ]
    },
    "panels": [
      {
        "title": "What the model may not use",
        "body": "Caste, religion, gender and area-level proxies for them are excluded from features and from monitoring segments."
      },
      {
        "title": "Explainability",
        "body": "Every score returns its top three contributing factors, which is what the borrower is shown."
      }
    ],
    "emptyTitle": "No model telemetry yet",
    "emptyExplanation": "Monitoring starts once the live model has scored its first thousand applications.",
    "metaTitle": "SNV Trust Score oversight",
    "metaDescription": "Monitor model version, score distribution, drift and fairness checks for the SNV Trust Score."
  };

export const Route = createFileRoute("/app/admin/trust-score")({
  head: () => ({
    meta: [
      { title: "SNV Trust Score oversight — ShriNeo Capital" },
      { name: "description", content: "Monitor model version, score distribution, drift and fairness checks for the SNV Trust Score." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "SNV Trust Score oversight — ShriNeo Capital" },
      { property: "og:description", content: "Monitor model version, score distribution, drift and fairness checks for the SNV Trust Score." },
    ],
  }),
  component: AdminTrustScorePage,
});

function AdminTrustScorePage() {
  return <PortalPage spec={spec} />;
}
