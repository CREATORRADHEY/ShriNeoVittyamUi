import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "agent",
    "slug": "leads",
    "title": "Leads",
    "subtitle": "People who asked for help, with the next action for each.",
    "kpis": [
      {
        "label": "Open leads",
        "value": "23"
      },
      {
        "label": "Contacted today",
        "value": "9"
      },
      {
        "label": "Ageing over 3 days",
        "value": "4",
        "tone": "warning"
      },
      {
        "label": "Converted this month",
        "value": "11",
        "tone": "success"
      }
    ],
    "table": {
      "caption": "Assigned leads",
      "entity": "leads",
      "columns": [
        "Lead",
        "Need",
        "Amount",
        "Age",
        "Next action",
        "Status"
      ],
      "rows": [
        [
          "LD-92014",
          "Business loan",
          "₹9,50,000",
          "2h",
          "Call back",
          {
            "text": "New",
            "tone": "info"
          }
        ],
        [
          "LD-91988",
          "Personal loan",
          "₹3,00,000",
          "1d",
          "Collect PAN",
          {
            "text": "In progress",
            "tone": "info"
          }
        ],
        [
          "LD-91940",
          "Home loan",
          "₹41,00,000",
          "4d",
          "Follow up",
          {
            "text": "Ageing",
            "tone": "warning"
          }
        ]
      ]
    },
    "emptyTitle": "No leads assigned right now",
    "emptyExplanation": "New leads in your districts are assigned automatically. You will get an alert the moment one arrives.",
    "suspendedNote": "You can view existing leads while your account is under review, but new leads are paused.",
    "metaTitle": "Leads",
    "metaDescription": "Work your assigned leads with clear next actions, ageing and conversion status."
  };

export const Route = createFileRoute("/app/agent/leads")({
  head: () => ({
    meta: [
      { title: "Leads — ShriNeo Capital" },
      { name: "description", content: "Work your assigned leads with clear next actions, ageing and conversion status." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Leads — ShriNeo Capital" },
      { property: "og:description", content: "Work your assigned leads with clear next actions, ageing and conversion status." },
    ],
  }),
  component: AgentLeadsPage,
});

function AgentLeadsPage() {
  return <PortalPage spec={spec} />;
}
