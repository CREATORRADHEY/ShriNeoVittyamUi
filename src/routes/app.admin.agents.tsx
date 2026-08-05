import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "title": "Agents",
    "subtitle": "Onboarding, certification and conduct.",
    "kpis": [
      {
        "label": "Active agents",
        "value": "2,411"
      },
      {
        "label": "Pending verification",
        "value": "38",
        "tone": "warning"
      },
      {
        "label": "Certification lapsed",
        "value": "12",
        "tone": "warning"
      },
      {
        "label": "Conduct reports open",
        "value": "3",
        "tone": "error"
      }
    ],
    "table": {
      "caption": "Agents needing attention",
      "entity": "agents",
      "columns": [
        "Agent",
        "District",
        "Files 30d",
        "Quality",
        "Status"
      ],
      "rows": [
        [
          "AG-5108",
          "Ujjain",
          "9",
          "Good",
          {
            "text": "Pending KYC",
            "tone": "warning"
          }
        ],
        [
          "AG-4471",
          "Indore",
          "31",
          "Excellent",
          {
            "text": "Active",
            "tone": "success"
          }
        ],
        [
          "AG-3311",
          "Patna",
          "4",
          "Under review",
          {
            "text": "Suspended",
            "tone": "error"
          }
        ]
      ]
    },
    "emptyTitle": "Nothing needs your attention",
    "emptyExplanation": "Every agent is verified, certified and clear of open conduct reports.",
    "footnote": "A fee-collection report suspends the agent immediately, pending investigation.",
    "metaTitle": "Agent oversight",
    "metaDescription": "Approve agent onboarding, monitor certification and act on conduct reports."
  };

export const Route = createFileRoute("/app/admin/agents")({
  head: () => ({
    meta: [
      { title: "Agent oversight — ShriNeo Capital" },
      { name: "description", content: "Approve agent onboarding, monitor certification and act on conduct reports." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Agent oversight — ShriNeo Capital" },
      { property: "og:description", content: "Approve agent onboarding, monitor certification and act on conduct reports." },
    ],
  }),
  component: AdminAgentsPage,
});

function AdminAgentsPage() {
  return <PortalPage spec={spec} />;
}
