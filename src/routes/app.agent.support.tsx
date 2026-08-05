import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "agent",
    "title": "Support",
    "subtitle": "Reach the agent desk, or escalate a stuck file.",
    "kpis": [
      {
        "label": "Open tickets",
        "value": "2"
      },
      {
        "label": "Average first reply",
        "value": "2h"
      },
      {
        "label": "Escalated files",
        "value": "1",
        "tone": "warning"
      },
      {
        "label": "Resolved this month",
        "value": "6",
        "tone": "success"
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
          "SNV-AS-3312",
          "Lender not responding on SNV-24-118198",
          "11 Mar 2026",
          {
            "text": "Escalated",
            "tone": "warning"
          }
        ],
        [
          "SNV-AS-3290",
          "Commission entry missing",
          "06 Mar 2026",
          {
            "text": "In progress",
            "tone": "info"
          }
        ]
      ]
    },
    "emptyTitle": "No open tickets",
    "emptyExplanation": "Raise a ticket and the agent desk responds within one working day.",
    "footnote": "Agent desk: 1800-000-111, Monday to Saturday, 9:00 to 19:00 IST.",
    "metaTitle": "Agent support",
    "metaDescription": "Contact the agent desk, track your tickets and escalate a file that has stopped moving."
  };

export const Route = createFileRoute("/app/agent/support")({
  head: () => ({
    meta: [
      { title: "Agent support — ShriNeo Capital" },
      { name: "description", content: "Contact the agent desk, track your tickets and escalate a file that has stopped moving." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Agent support — ShriNeo Capital" },
      { property: "og:description", content: "Contact the agent desk, track your tickets and escalate a file that has stopped moving." },
    ],
  }),
  component: AgentSupportPage,
});

function AgentSupportPage() {
  return <PortalPage spec={spec} />;
}
