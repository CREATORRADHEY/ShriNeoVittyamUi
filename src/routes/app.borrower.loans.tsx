import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "borrower",
    "slug": "loans",
    "title": "My loans",
    "subtitle": "Active and closed loans, with the lender responsible for each.",
    "kpis": [
      {
        "label": "Active loans",
        "value": "1"
      },
      {
        "label": "Outstanding principal",
        "value": "₹3,18,740"
      },
      {
        "label": "Next EMI",
        "value": "₹21,460",
        "hint": "Due 01 Apr 2026"
      },
      {
        "label": "Closed loans",
        "value": "2"
      }
    ],
    "table": {
      "caption": "Your loans",
      "entity": "loans",
      "columns": [
        "Loan ID",
        "Product",
        "Lender",
        "Sanctioned",
        "Outstanding",
        "Status"
      ],
      "rows": [
        [
          "SNV-LN-20418",
          "Personal loan",
          "Kaveri Bank",
          "₹5,00,000",
          "₹3,18,740",
          {
            "text": "Active",
            "tone": "success"
          }
        ],
        [
          "SNV-LN-19022",
          "Business loan",
          "Aarambh Finance",
          "₹2,00,000",
          "₹0",
          {
            "text": "Closed",
            "tone": "neutral"
          }
        ],
        [
          "SNV-LN-17781",
          "Sachet loan",
          "Kaveri Bank",
          "₹25,000",
          "₹0",
          {
            "text": "Closed",
            "tone": "neutral"
          }
        ]
      ]
    },
    "emptyTitle": "You do not have a loan yet",
    "emptyExplanation": "Once a lender disburses an approved application, the loan appears here with its schedule and lender details.",
    "footnote": "ShriNeo Capital is a lending service provider. Your loan agreement is with the lender named against each account.",
    "metaTitle": "My loans",
    "metaDescription": "Track active and closed loans, outstanding balances and the lender responsible for each account."
  };

export const Route = createFileRoute("/app/borrower/loans")({
  head: () => ({
    meta: [
      { title: "My loans — ShriNeo Capital" },
      { name: "description", content: "Track active and closed loans, outstanding balances and the lender responsible for each account." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "My loans — ShriNeo Capital" },
      { property: "og:description", content: "Track active and closed loans, outstanding balances and the lender responsible for each account." },
    ],
  }),
  component: BorrowerLoansPage,
});

function BorrowerLoansPage() {
  return <PortalPage spec={spec} />;
}
