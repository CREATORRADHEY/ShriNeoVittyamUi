import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "agent",
    "slug": "training",
    "title": "Training",
    "subtitle": "Short modules that keep your certification current.",
    "kpis": [
      {
        "label": "Modules complete",
        "value": "7 of 9"
      },
      {
        "label": "Certification",
        "value": "Valid",
        "tone": "success",
        "hint": "Expires 31 Dec 2026"
      },
      {
        "label": "Due this month",
        "value": "1",
        "tone": "warning"
      },
      {
        "label": "Average score",
        "value": "88%"
      }
    ],
    "table": {
      "caption": "Your modules",
      "entity": "modules",
      "columns": [
        "Module",
        "Duration",
        "Required by",
        "Status"
      ],
      "rows": [
        [
          "Fair practice code",
          "18 min",
          "Completed",
          {
            "text": "Complete",
            "tone": "success"
          }
        ],
        [
          "Data consent and privacy",
          "22 min",
          "Completed",
          {
            "text": "Complete",
            "tone": "success"
          }
        ],
        [
          "Recognising fraud attempts",
          "15 min",
          "31 Mar 2026",
          {
            "text": "Due",
            "tone": "warning"
          }
        ],
        [
          "Explaining APR to a borrower",
          "12 min",
          "30 Jun 2026",
          {
            "text": "Not started",
            "tone": "neutral"
          }
        ]
      ]
    },
    "emptyTitle": "No modules assigned",
    "emptyExplanation": "Your training plan is issued when your agent account is activated.",
    "metaTitle": "Agent training",
    "metaDescription": "Complete the required modules on fair practice, data consent and fraud prevention to stay certified."
  };

export const Route = createFileRoute("/app/agent/training")({
  head: () => ({
    meta: [
      { title: "Agent training — ShriNeo Capital" },
      { name: "description", content: "Complete the required modules on fair practice, data consent and fraud prevention to stay certified." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Agent training — ShriNeo Capital" },
      { property: "og:description", content: "Complete the required modules on fair practice, data consent and fraud prevention to stay certified." },
    ],
  }),
  component: AgentTrainingPage,
});

function AgentTrainingPage() {
  return <PortalPage spec={spec} />;
}
