import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "lender",
    "slug": "settings",
    "title": "Settings",
    "subtitle": "Policy, limits and routing rules for your institution.",
    "panels": [
      {
        "title": "Credit policy",
        "body": "Minimum bureau score, income multiples and permitted products. Changes take effect at the next policy version."
      },
      {
        "title": "Monthly sanction cap",
        "body": "₹25 Cr. Routing pauses automatically at the cap rather than declining files.",
        "badge": {
          "text": "61% used",
          "tone": "info"
        }
      },
      {
        "title": "Routing rules",
        "body": "Geography, product and ticket size decide which files reach you."
      },
      {
        "title": "Notification preferences",
        "body": "SLA warnings, API incidents and cap alerts, per user."
      },
      {
        "title": "Data retention",
        "body": "Declined-file data is purged after 24 months unless a legal hold applies."
      },
      {
        "title": "Change control",
        "body": "Policy edits need a second approver before they go live.",
        "badge": {
          "text": "Two-person rule",
          "tone": "success"
        }
      }
    ],
    "emptyTitle": "No configuration yet",
    "emptyExplanation": "Your onboarding manager will publish the first policy version with you.",
    "metaTitle": "Lender settings",
    "metaDescription": "Configure credit policy, sanction caps, routing rules and notification preferences."
  };

export const Route = createFileRoute("/app/lender/settings")({
  head: () => ({
    meta: [
      { title: "Lender settings — ShriNeo Capital" },
      { name: "description", content: "Configure credit policy, sanction caps, routing rules and notification preferences." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Lender settings — ShriNeo Capital" },
      { property: "og:description", content: "Configure credit policy, sanction caps, routing rules and notification preferences." },
    ],
  }),
  component: LenderSettingsPage,
});

function LenderSettingsPage() {
  return <PortalPage spec={spec} />;
}
