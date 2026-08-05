import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "slug": "borrowers",
    "title": "Borrowers",
    "subtitle": "Search, inspect and support any borrower account.",
    "kpis": [
      {
        "label": "Registered",
        "value": "1,84,210"
      },
      {
        "label": "Active applications",
        "value": "3,918"
      },
      {
        "label": "Support escalations",
        "value": "14",
        "tone": "warning"
      },
      {
        "label": "New this week",
        "value": "6,204",
        "tone": "success"
      }
    ],
    "table": {
      "caption": "Recent borrowers",
      "entity": "borrowers",
      "columns": [
        "Borrower",
        "State",
        "Applications",
        "Active loans",
        "Status"
      ],
      "rows": [
        [
          "BR-482011",
          "Madhya Pradesh",
          "2",
          "1",
          {
            "text": "Active",
            "tone": "success"
          }
        ],
        [
          "BR-481990",
          "Maharashtra",
          "1",
          "0",
          {
            "text": "In application",
            "tone": "info"
          }
        ],
        [
          "BR-481944",
          "Bihar",
          "3",
          "0",
          {
            "text": "Under review",
            "tone": "warning"
          }
        ]
      ]
    },
    "emptyTitle": "No borrower matches that search",
    "emptyExplanation": "Try a mobile number, application ID or borrower ID instead of a name.",
    "footnote": "Borrower PII is masked until you unmask it with a stated reason, which is logged.",
    "metaTitle": "Borrower oversight",
    "metaDescription": "Search borrower accounts, inspect application history and act on support escalations."
  };

export const Route = createFileRoute("/app/admin/borrowers")({
  head: () => ({
    meta: [
      { title: "Borrower oversight — ShriNeo Capital" },
      { name: "description", content: "Search borrower accounts, inspect application history and act on support escalations." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Borrower oversight — ShriNeo Capital" },
      { property: "og:description", content: "Search borrower accounts, inspect application history and act on support escalations." },
    ],
  }),
  component: AdminBorrowersPage,
});

function AdminBorrowersPage() {
  return <PortalPage spec={spec} />;
}
