import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "lender",
    "slug": "portfolio",
    "title": "Portfolio",
    "subtitle": "Book composition, vintage and performance.",
    "kpis": [
      {
        "label": "Book size",
        "value": "₹184.2 Cr"
      },
      {
        "label": "Live accounts",
        "value": "9,412"
      },
      {
        "label": "Average ticket",
        "value": "₹1,95,700"
      },
      {
        "label": "Weighted APR",
        "value": "16.4%"
      }
    ],
    "table": {
      "caption": "Delinquency buckets",
      "entity": "buckets",
      "columns": [
        "Bucket",
        "Accounts",
        "Value",
        "Share",
        "Trend"
      ],
      "rows": [
        [
          "Current",
          "8,914",
          "₹172.1 Cr",
          "93.4%",
          {
            "text": "Stable",
            "tone": "success"
          }
        ],
        [
          "1–30 days",
          "331",
          "₹7.4 Cr",
          "4.0%",
          {
            "text": "Improving",
            "tone": "success"
          }
        ],
        [
          "31–90 days",
          "112",
          "₹3.4 Cr",
          "1.8%",
          {
            "text": "Watch",
            "tone": "warning"
          }
        ],
        [
          "90+ days",
          "55",
          "₹1.3 Cr",
          "0.8%",
          {
            "text": "Watch",
            "tone": "warning"
          }
        ]
      ]
    },
    "emptyTitle": "No portfolio data for this window",
    "emptyExplanation": "Choose a wider date range, or wait for the nightly aggregation to complete.",
    "metaTitle": "Portfolio",
    "metaDescription": "Book size, product mix, vintage performance and delinquency buckets for your sanctioned loans."
  };

export const Route = createFileRoute("/app/lender/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — ShriNeo Capital" },
      { name: "description", content: "Book size, product mix, vintage performance and delinquency buckets for your sanctioned loans." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Portfolio — ShriNeo Capital" },
      { property: "og:description", content: "Book size, product mix, vintage performance and delinquency buckets for your sanctioned loans." },
    ],
  }),
  component: LenderPortfolioPage,
});

function LenderPortfolioPage() {
  return <PortalPage spec={spec} />;
}
