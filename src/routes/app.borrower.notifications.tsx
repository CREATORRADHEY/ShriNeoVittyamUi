import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "borrower",
    "slug": "notifications",
    "title": "Notifications",
    "subtitle": "Every alert we have sent you, newest first.",
    "table": {
      "caption": "Notification history",
      "entity": "notifications",
      "columns": [
        "When",
        "Notification",
        "Channel",
        "Status"
      ],
      "rows": [
        [
          "12 Mar 2026, 11:20",
          "Document query raised on SNV-24-118204",
          "SMS, email",
          {
            "text": "Unread",
            "tone": "warning"
          }
        ],
        [
          "09 Mar 2026, 18:04",
          "Two offers are ready to compare",
          "App",
          {
            "text": "Read",
            "tone": "neutral"
          }
        ],
        [
          "01 Mar 2026, 07:00",
          "EMI of ₹21,460 collected successfully",
          "SMS",
          {
            "text": "Read",
            "tone": "neutral"
          }
        ]
      ]
    },
    "emptyTitle": "Nothing to catch up on",
    "emptyExplanation": "Alerts about your applications, offers and repayments will collect here.",
    "metaTitle": "Notifications",
    "metaDescription": "A record of every alert sent to you about applications, offers, documents and repayments."
  };

export const Route = createFileRoute("/app/borrower/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — ShriNeo Capital" },
      { name: "description", content: "A record of every alert sent to you about applications, offers, documents and repayments." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Notifications — ShriNeo Capital" },
      { property: "og:description", content: "A record of every alert sent to you about applications, offers, documents and repayments." },
    ],
  }),
  component: BorrowerNotificationsPage,
});

function BorrowerNotificationsPage() {
  return <PortalPage spec={spec} />;
}
