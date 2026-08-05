import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "title": "Reports",
    "subtitle": "Regulatory and management reporting.",
    "table": {
      "caption": "Scheduled reports",
      "entity": "reports",
      "columns": [
        "Report",
        "Frequency",
        "Last run",
        "Recipient",
        "Status"
      ],
      "rows": [
        [
          "Digital lending disclosures",
          "Monthly",
          "01 Mar 2026",
          "Compliance",
          {
            "text": "Filed",
            "tone": "success"
          }
        ],
        [
          "Grievance summary",
          "Monthly",
          "01 Mar 2026",
          "Board",
          {
            "text": "Filed",
            "tone": "success"
          }
        ],
        [
          "Portfolio performance",
          "Weekly",
          "10 Mar 2026",
          "Management",
          {
            "text": "Filed",
            "tone": "success"
          }
        ],
        [
          "Fair practice audit",
          "Quarterly",
          "01 Jan 2026",
          "Compliance",
          {
            "text": "Due 01 Apr",
            "tone": "warning"
          }
        ]
      ]
    },
    "emptyTitle": "No reports configured",
    "emptyExplanation": "Add a schedule and the first report generates on the next cycle.",
    "metaTitle": "Reports",
    "metaDescription": "Generate regulatory and management reports, and track what has already been filed."
  };

export const Route = createFileRoute("/app/admin/reports")({
  head: () => ({
    meta: [
      { title: "Reports — ShriNeo Capital" },
      { name: "description", content: "Generate regulatory and management reports, and track what has already been filed." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Reports — ShriNeo Capital" },
      { property: "og:description", content: "Generate regulatory and management reports, and track what has already been filed." },
    ],
  }),
  component: AdminReportsPage,
});

function AdminReportsPage() {
  return <PortalPage spec={spec} />;
}
