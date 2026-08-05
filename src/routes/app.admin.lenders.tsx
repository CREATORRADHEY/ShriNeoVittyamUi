import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "title": "Lenders",
    "subtitle": "Partner institutions, limits and integration health.",
    "kpis": [
      {
        "label": "Live partners",
        "value": "14"
      },
      {
        "label": "In integration",
        "value": "3"
      },
      {
        "label": "Caps near limit",
        "value": "2",
        "tone": "warning"
      },
      {
        "label": "Degraded integrations",
        "value": "1",
        "tone": "warning"
      }
    ],
    "table": {
      "caption": "Partners",
      "entity": "lenders",
      "columns": [
        "Lender",
        "Products",
        "Cap used",
        "Approval rate",
        "Status"
      ],
      "rows": [
        [
          "Kaveri Bank",
          "Personal, Home",
          "48%",
          "39%",
          {
            "text": "Live",
            "tone": "success"
          }
        ],
        [
          "Aarambh Finance",
          "Personal, Business",
          "92%",
          "44%",
          {
            "text": "Cap warning",
            "tone": "warning"
          }
        ],
        [
          "Sahyog NBFC",
          "Sachet",
          "—",
          "—",
          {
            "text": "Integrating",
            "tone": "info"
          }
        ]
      ]
    },
    "emptyTitle": "No partners configured",
    "emptyExplanation": "Add a lender to start routing applications to them.",
    "metaTitle": "Lender oversight",
    "metaDescription": "Monitor partner institutions, their sanction caps, approval rates and integration health."
  };

export const Route = createFileRoute("/app/admin/lenders")({
  head: () => ({
    meta: [
      { title: "Lender oversight — ShriNeo Capital" },
      { name: "description", content: "Monitor partner institutions, their sanction caps, approval rates and integration health." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Lender oversight — ShriNeo Capital" },
      { property: "og:description", content: "Monitor partner institutions, their sanction caps, approval rates and integration health." },
    ],
  }),
  component: AdminLendersPage,
});

function AdminLendersPage() {
  return <PortalPage spec={spec} />;
}
