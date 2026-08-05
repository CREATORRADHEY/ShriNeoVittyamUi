import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "borrower",
    "slug": "messages",
    "title": "Messages",
    "subtitle": "Conversations with your lender, your agent and ShriNeo support.",
    "table": {
      "caption": "Recent conversations",
      "entity": "messages",
      "columns": [
        "From",
        "Subject",
        "Last update",
        "Status"
      ],
      "rows": [
        [
          "Kaveri Bank",
          "Address proof needs a clearer scan",
          "12 Mar 2026",
          {
            "text": "Action needed",
            "tone": "warning"
          }
        ],
        [
          "Agent AG-4471",
          "Documents received, thank you",
          "10 Mar 2026",
          {
            "text": "Read",
            "tone": "neutral"
          }
        ],
        [
          "ShriNeo support",
          "Your grievance SNV-GR-2211 is closed",
          "04 Mar 2026",
          {
            "text": "Resolved",
            "tone": "success"
          }
        ]
      ]
    },
    "emptyTitle": "No messages yet",
    "emptyExplanation": "When a lender, agent or our support team needs something from you, the message appears here and you also get an SMS.",
    "footnote": "We never ask for a one-time password, a PIN or a payment over chat.",
    "metaTitle": "Messages",
    "metaDescription": "Read and reply to messages from your lender, agent and ShriNeo Capital support in one thread list."
  };

export const Route = createFileRoute("/app/borrower/messages")({
  head: () => ({
    meta: [
      { title: "Messages — ShriNeo Capital" },
      { name: "description", content: "Read and reply to messages from your lender, agent and ShriNeo Capital support in one thread list." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Messages — ShriNeo Capital" },
      { property: "og:description", content: "Read and reply to messages from your lender, agent and ShriNeo Capital support in one thread list." },
    ],
  }),
  component: BorrowerMessagesPage,
});

function BorrowerMessagesPage() {
  return <PortalPage spec={spec} />;
}
