import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "lender",
    "slug": "team",
    "title": "Team",
    "subtitle": "Who can see what, and who approved it.",
    "kpis": [
      {
        "label": "Active users",
        "value": "18"
      },
      {
        "label": "Credit approvers",
        "value": "6"
      },
      {
        "label": "Pending invitations",
        "value": "2"
      },
      {
        "label": "Dormant 90 days",
        "value": "1",
        "tone": "warning"
      }
    ],
    "table": {
      "caption": "Users",
      "entity": "users",
      "columns": [
        "User",
        "Role",
        "Approval limit",
        "Last active",
        "Status"
      ],
      "rows": [
        [
          "A. Rao",
          "Credit approver",
          "₹25,00,000",
          "Today",
          {
            "text": "Active",
            "tone": "success"
          }
        ],
        [
          "N. Iyer",
          "Credit analyst",
          "—",
          "Today",
          {
            "text": "Active",
            "tone": "success"
          }
        ],
        [
          "P. Sharma",
          "Read only",
          "—",
          "82 days ago",
          {
            "text": "Dormant",
            "tone": "warning"
          }
        ]
      ]
    },
    "emptyTitle": "No users invited yet",
    "emptyExplanation": "Invite your credit team and assign approval limits before the first file arrives.",
    "footnote": "Every permission change is written to the audit log with the approver's identity.",
    "metaTitle": "Team and permissions",
    "metaDescription": "Manage lender users, roles and approval limits, with every permission change recorded."
  };

export const Route = createFileRoute("/app/lender/team")({
  head: () => ({
    meta: [
      { title: "Team and permissions — ShriNeo Capital" },
      { name: "description", content: "Manage lender users, roles and approval limits, with every permission change recorded." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Team and permissions — ShriNeo Capital" },
      { property: "og:description", content: "Manage lender users, roles and approval limits, with every permission change recorded." },
    ],
  }),
  component: LenderTeamPage,
});

function LenderTeamPage() {
  return <PortalPage spec={spec} />;
}
