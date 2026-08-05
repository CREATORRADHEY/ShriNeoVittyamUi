import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "slug": "audit",
    "title": "Audit",
    "subtitle": "Platform-wide, append-only activity record.",
    "kpis": [
      {
        "label": "Events today",
        "value": "48,204"
      },
      {
        "label": "Admin actions",
        "value": "312"
      },
      {
        "label": "Denied attempts",
        "value": "9",
        "tone": "warning"
      },
      {
        "label": "Retention",
        "value": "8 years"
      }
    ],
    "table": {
      "caption": "Recent administrative events",
      "entity": "audit events",
      "columns": [
        "When",
        "Actor",
        "Event",
        "Reference",
        "Result"
      ],
      "rows": [
        [
          "12 Mar 2026, 11:31",
          "admin.rakesh",
          "Suspended agent",
          "AG-3311",
          {
            "text": "Recorded",
            "tone": "success"
          }
        ],
        [
          "12 Mar 2026, 10:58",
          "admin.neha",
          "Published CMS page",
          "/trust-center",
          {
            "text": "Recorded",
            "tone": "success"
          }
        ],
        [
          "12 Mar 2026, 09:12",
          "ops.vikram",
          "Attempted bulk export",
          "Borrowers",
          {
            "text": "Denied",
            "tone": "error"
          }
        ]
      ]
    },
    "emptyTitle": "No events in this window",
    "emptyExplanation": "Widen the date range to see earlier activity.",
    "footnote": "No user, including a platform administrator, can edit or delete an audit record.",
    "metaTitle": "Platform audit log",
    "metaDescription": "Append-only record of administrative actions, data access and configuration changes."
  };

export const Route = createFileRoute("/app/admin/audit")({
  head: () => ({
    meta: [
      { title: "Platform audit log — ShriNeo Capital" },
      { name: "description", content: "Append-only record of administrative actions, data access and configuration changes." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Platform audit log — ShriNeo Capital" },
      { property: "og:description", content: "Append-only record of administrative actions, data access and configuration changes." },
    ],
  }),
  component: AdminAuditPage,
});

function AdminAuditPage() {
  return <PortalPage spec={spec} />;
}
