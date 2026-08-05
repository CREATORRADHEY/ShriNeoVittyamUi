import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "agent",
    "slug": "notifications",
    "title": "Notifications",
    "subtitle": "Lead assignments, lender queries and payout alerts.",
    "table": {
      "caption": "Notification history",
      "entity": "notifications",
      "columns": [
        "When",
        "Notification",
        "File",
        "Status"
      ],
      "rows": [
        [
          "12 Mar 2026, 11:20",
          "Lender query on bank statement",
          "SNV-24-118198",
          {
            "text": "Action needed",
            "tone": "warning"
          }
        ],
        [
          "11 Mar 2026, 09:02",
          "New lead assigned in Dewas",
          "LD-92014",
          {
            "text": "Unread",
            "tone": "info"
          }
        ],
        [
          "09 Mar 2026, 16:40",
          "File sanctioned",
          "SNV-24-118147",
          {
            "text": "Read",
            "tone": "neutral"
          }
        ]
      ]
    },
    "emptyTitle": "Nothing new",
    "emptyExplanation": "Assignments and lender queries will appear here, and we will also send you an SMS.",
    "metaTitle": "Agent notifications",
    "metaDescription": "Every alert about lead assignments, lender queries, document rejections and commission payouts."
  };

export const Route = createFileRoute("/app/agent/notifications")({
  head: () => ({
    meta: [
      { title: "Agent notifications — ShriNeo Capital" },
      { name: "description", content: "Every alert about lead assignments, lender queries, document rejections and commission payouts." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Agent notifications — ShriNeo Capital" },
      { property: "og:description", content: "Every alert about lead assignments, lender queries, document rejections and commission payouts." },
    ],
  }),
  component: AgentNotificationsPage,
});

function AgentNotificationsPage() {
  return <PortalPage spec={spec} />;
}
