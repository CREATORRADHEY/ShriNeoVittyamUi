import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "slug": "consent",
    "title": "Consent records",
    "subtitle": "Who consented to what, when, and for how long.",
    "kpis": [
      {
        "label": "Active consents",
        "value": "1,42,880"
      },
      {
        "label": "Withdrawn 30d",
        "value": "412"
      },
      {
        "label": "Expiring in 30d",
        "value": "2,104",
        "tone": "warning"
      },
      {
        "label": "Purpose violations",
        "value": "0",
        "tone": "success"
      }
    ],
    "table": {
      "caption": "Recent consent events",
      "entity": "consent records",
      "columns": [
        "Reference",
        "Purpose",
        "Given",
        "Expires",
        "Status"
      ],
      "rows": [
        [
          "CN-884120",
          "Bureau enquiry",
          "12 Mar 2026",
          "12 Sep 2026",
          {
            "text": "Active",
            "tone": "success"
          }
        ],
        [
          "CN-884101",
          "Account aggregator pull",
          "11 Mar 2026",
          "11 Jun 2026",
          {
            "text": "Active",
            "tone": "success"
          }
        ],
        [
          "CN-883940",
          "Bureau enquiry",
          "02 Mar 2026",
          "—",
          {
            "text": "Withdrawn",
            "tone": "neutral"
          }
        ]
      ]
    },
    "emptyTitle": "No consent records in this window",
    "emptyExplanation": "Widen the date range to see earlier consents.",
    "footnote": "Withdrawing consent stops all future data pulls for that purpose within one working day.",
    "metaTitle": "Consent records",
    "metaDescription": "An auditable record of every borrower consent, its purpose, expiry and withdrawal status."
  };

export const Route = createFileRoute("/app/admin/consent")({
  head: () => ({
    meta: [
      { title: "Consent records — ShriNeo Capital" },
      { name: "description", content: "An auditable record of every borrower consent, its purpose, expiry and withdrawal status." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Consent records — ShriNeo Capital" },
      { property: "og:description", content: "An auditable record of every borrower consent, its purpose, expiry and withdrawal status." },
    ],
  }),
  component: AdminConsentPage,
});

function AdminConsentPage() {
  return <PortalPage spec={spec} />;
}
