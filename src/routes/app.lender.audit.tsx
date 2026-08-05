import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "lender",
    "title": "Audit",
    "subtitle": "An append-only record of decisions and data access.",
    "kpis": [
      {
        "label": "Events today",
        "value": "1,284"
      },
      {
        "label": "PII unmask events",
        "value": "23"
      },
      {
        "label": "Failed access attempts",
        "value": "1",
        "tone": "warning"
      },
      {
        "label": "Retention",
        "value": "8 years"
      }
    ],
    "table": {
      "caption": "Recent events",
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
          "12 Mar 2026, 11:22",
          "A. Rao",
          "Sanctioned application",
          "SNV-24-118181",
          {
            "text": "Recorded",
            "tone": "success"
          }
        ],
        [
          "12 Mar 2026, 11:05",
          "N. Iyer",
          "Unmasked borrower PAN",
          "SNV-24-118198",
          {
            "text": "Recorded",
            "tone": "info"
          }
        ],
        [
          "12 Mar 2026, 09:41",
          "P. Sharma",
          "Attempted export",
          "Portfolio",
          {
            "text": "Denied",
            "tone": "error"
          }
        ]
      ]
    },
    "emptyTitle": "No events in this window",
    "emptyExplanation": "The log is never empty for long. Widen the date range to see earlier activity.",
    "footnote": "Audit records cannot be edited or deleted by any user, including administrators.",
    "metaTitle": "Audit log",
    "metaDescription": "Append-only record of credit decisions, PII unmasking and permission changes with actor and reason."
  };

export const Route = createFileRoute("/app/lender/audit")({
  head: () => ({
    meta: [
      { title: "Audit log — ShriNeo Capital" },
      { name: "description", content: "Append-only record of credit decisions, PII unmasking and permission changes with actor and reason." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Audit log — ShriNeo Capital" },
      { property: "og:description", content: "Append-only record of credit decisions, PII unmasking and permission changes with actor and reason." },
    ],
  }),
  component: LenderAuditPage,
});

function LenderAuditPage() {
  return <PortalPage spec={spec} />;
}
