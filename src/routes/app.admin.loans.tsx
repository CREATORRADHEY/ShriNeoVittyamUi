import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "slug": "loans",
    "title": "Loan oversight",
    "subtitle": "Every application and loan across the platform.",
    "kpis": [
      {
        "label": "Applications today",
        "value": "1,842"
      },
      {
        "label": "Sanctioned today",
        "value": "648",
        "tone": "success"
      },
      {
        "label": "Stuck over 72h",
        "value": "57",
        "tone": "warning"
      },
      {
        "label": "Disbursed value MTD",
        "value": "₹212.4 Cr"
      }
    ],
    "table": {
      "caption": "Files needing attention",
      "entity": "loans",
      "columns": [
        "Application",
        "Product",
        "Lender",
        "Amount",
        "Age",
        "Stage"
      ],
      "rows": [
        [
          "SNV-24-117411",
          "Business",
          "Aarambh Finance",
          "₹9,50,000",
          "4d",
          {
            "text": "Stalled",
            "tone": "warning"
          }
        ],
        [
          "SNV-24-117388",
          "Home",
          "Kaveri Bank",
          "₹41,00,000",
          "3d",
          {
            "text": "Docs pending",
            "tone": "warning"
          }
        ],
        [
          "SNV-24-117204",
          "Personal",
          "Kaveri Bank",
          "₹3,00,000",
          "5d",
          {
            "text": "No lender response",
            "tone": "error"
          }
        ]
      ]
    },
    "emptyTitle": "Nothing is stuck",
    "emptyExplanation": "Every live file is moving inside its expected turnaround.",
    "metaTitle": "Loan oversight",
    "metaDescription": "Track every application and loan across products, lenders and stages in one place."
  };

export const Route = createFileRoute("/app/admin/loans")({
  head: () => ({
    meta: [
      { title: "Loan oversight — ShriNeo Capital" },
      { name: "description", content: "Track every application and loan across products, lenders and stages in one place." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Loan oversight — ShriNeo Capital" },
      { property: "og:description", content: "Track every application and loan across products, lenders and stages in one place." },
    ],
  }),
  component: AdminLoansPage,
});

function AdminLoansPage() {
  return <PortalPage spec={spec} />;
}
