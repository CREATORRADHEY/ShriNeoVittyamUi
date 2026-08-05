import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "lender",
    "title": "Manual reviews",
    "subtitle": "Files the automated policy could not decide on its own.",
    "kpis": [
      {
        "label": "Open reviews",
        "value": "17"
      },
      {
        "label": "Breaching SLA in 2h",
        "value": "7",
        "tone": "warning"
      },
      {
        "label": "Median review time",
        "value": "38 min"
      },
      {
        "label": "Overturn rate",
        "value": "12%"
      }
    ],
    "table": {
      "caption": "Referred files",
      "entity": "reviews",
      "columns": [
        "Application",
        "Referral reason",
        "Amount",
        "Age",
        "Reviewer",
        "Status"
      ],
      "rows": [
        [
          "SNV-24-118198",
          "Income volatility",
          "₹9,50,000",
          "1h",
          "Unassigned",
          {
            "text": "Open",
            "tone": "warning"
          }
        ],
        [
          "SNV-24-118165",
          "Address mismatch",
          "₹1,80,000",
          "5h",
          "A. Rao",
          {
            "text": "In review",
            "tone": "info"
          }
        ],
        [
          "SNV-24-118120",
          "Thin bureau file",
          "₹4,20,000",
          "1d",
          "N. Iyer",
          {
            "text": "Awaiting docs",
            "tone": "warning"
          }
        ]
      ]
    },
    "emptyTitle": "No file needs a human right now",
    "emptyExplanation": "Automated policy is deciding everything in the current window.",
    "metaTitle": "Manual reviews",
    "metaDescription": "Work the files that automated policy referred for human judgement, with the referral reason on each."
  };

export const Route = createFileRoute("/app/lender/reviews")({
  head: () => ({
    meta: [
      { title: "Manual reviews — ShriNeo Capital" },
      { name: "description", content: "Work the files that automated policy referred for human judgement, with the referral reason on each." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Manual reviews — ShriNeo Capital" },
      { property: "og:description", content: "Work the files that automated policy referred for human judgement, with the referral reason on each." },
    ],
  }),
  component: LenderReviewsPage,
});

function LenderReviewsPage() {
  return <PortalPage spec={spec} />;
}
