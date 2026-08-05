import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "borrower",
    "slug": "agents",
    "title": "Find an agent",
    "subtitle": "Verified agents near you who can help you complete an application.",
    "notices": [
      {
        "tone": "info",
        "title": "An agent never charges you a fee",
        "explanation": "Agents are paid a commission by ShriNeo Capital after a loan is disbursed. If anyone asks you for money, refuse and report it.",
        "safety": "Reporting an agent does not affect your application.",
        "actions": [
          "Report an agent"
        ]
      }
    ],
    "table": {
      "caption": "Verified agents near you",
      "entity": "agents",
      "columns": [
        "Agent",
        "Location",
        "Languages",
        "Files completed",
        "Status"
      ],
      "rows": [
        [
          "AG-4471",
          "Indore, MP",
          "Hindi, English",
          "184",
          {
            "text": "Verified",
            "tone": "success"
          }
        ],
        [
          "AG-3920",
          "Dewas, MP",
          "Hindi",
          "96",
          {
            "text": "Verified",
            "tone": "success"
          }
        ],
        [
          "AG-5108",
          "Ujjain, MP",
          "Hindi, Marathi",
          "42",
          {
            "text": "New",
            "tone": "info"
          }
        ]
      ]
    },
    "emptyTitle": "No agents listed for your area yet",
    "emptyExplanation": "You can still apply on your own, or ask support to connect you with an agent in a nearby district.",
    "metaTitle": "Find an agent",
    "metaDescription": "Search verified ShriNeo Capital agents near you and see how they are paid before you engage one."
  };

export const Route = createFileRoute("/app/borrower/agents")({
  head: () => ({
    meta: [
      { title: "Find an agent — ShriNeo Capital" },
      { name: "description", content: "Search verified ShriNeo Capital agents near you and see how they are paid before you engage one." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Find an agent — ShriNeo Capital" },
      { property: "og:description", content: "Search verified ShriNeo Capital agents near you and see how they are paid before you engage one." },
    ],
  }),
  component: BorrowerAgentsPage,
});

function BorrowerAgentsPage() {
  return <PortalPage spec={spec} />;
}
