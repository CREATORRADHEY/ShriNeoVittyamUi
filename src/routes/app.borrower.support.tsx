import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "borrower",
    "slug": "support",
    "title": "Support",
    "subtitle": "Get help, or escalate if we have not resolved something.",
    "kpis": [
      {
        "label": "Open tickets",
        "value": "1"
      },
      {
        "label": "Average first reply",
        "value": "4h",
        "hint": "Last 30 days"
      },
      {
        "label": "Resolved this year",
        "value": "3"
      },
      {
        "label": "Escalations",
        "value": "0"
      }
    ],
    "panels": [
      {
        "title": "Call us",
        "body": "1800-000-000, Monday to Saturday, 9:00 to 19:00 IST. Calls are recorded for quality and dispute handling."
      },
      {
        "title": "Write to us",
        "body": "support@shrineocapital.com — we acknowledge within one working day."
      },
      {
        "title": "Grievance redressal",
        "body": "If a complaint is not resolved in 30 days you may escalate to the RBI Ombudsman. The full route is set out on our grievance page."
      },
      {
        "title": "Report a fraud attempt",
        "body": "If anyone asks you for a fee, an OTP or a payment to release a loan, stop and report it immediately.",
        "badge": {
          "text": "Priority",
          "tone": "error"
        }
      }
    ],
    "table": {
      "caption": "Your tickets",
      "entity": "tickets",
      "columns": [
        "Ticket",
        "Subject",
        "Raised",
        "Status"
      ],
      "rows": [
        [
          "SNV-SR-8841",
          "Change EMI debit date",
          "10 Mar 2026",
          {
            "text": "In progress",
            "tone": "info"
          }
        ],
        [
          "SNV-SR-8620",
          "Statement not received",
          "22 Feb 2026",
          {
            "text": "Resolved",
            "tone": "success"
          }
        ]
      ]
    },
    "emptyTitle": "You have not raised anything yet",
    "emptyExplanation": "Start a request and we will keep the whole conversation in one place.",
    "metaTitle": "Support",
    "metaDescription": "Raise a request, track your tickets and escalate to the grievance officer if a matter is unresolved."
  };

export const Route = createFileRoute("/app/borrower/support")({
  head: () => ({
    meta: [
      { title: "Support — ShriNeo Capital" },
      { name: "description", content: "Raise a request, track your tickets and escalate to the grievance officer if a matter is unresolved." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Support — ShriNeo Capital" },
      { property: "og:description", content: "Raise a request, track your tickets and escalate to the grievance officer if a matter is unresolved." },
    ],
  }),
  component: BorrowerSupportPage,
});

function BorrowerSupportPage() {
  return <PortalPage spec={spec} />;
}
