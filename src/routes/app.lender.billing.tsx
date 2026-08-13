import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
  role: "lender",
  title: "Billing and ledgers",
  subtitle: "Sourcing fees, invoices and reconciliation.",
  kpis: [
    {
      label: "Invoiced this month",
      value: "₹34,80,000",
    },
    {
      label: "Settled",
      value: "₹28,10,000",
      tone: "success",
    },
    {
      label: "Outstanding",
      value: "₹6,70,000",
    },
    {
      label: "Reconciliation exceptions",
      value: "2",
      tone: "warning",
    },
  ],
  table: {
    caption: "Invoices",
    entity: "invoices",
    columns: ["Invoice", "Period", "Amount", "Due", "Status"],
    rows: [
      [
        "INV-2026-031",
        "Mar 2026",
        "₹6,70,000",
        "15 Apr 2026",
        {
          text: "Open",
          tone: "info",
        },
      ],
      [
        "INV-2026-024",
        "Feb 2026",
        "₹28,10,000",
        "15 Mar 2026",
        {
          text: "Settled",
          tone: "success",
        },
      ],
      [
        "INV-2026-017",
        "Jan 2026",
        "₹25,40,000",
        "15 Feb 2026",
        {
          text: "Settled",
          tone: "success",
        },
      ],
    ],
  },
  emptyTitle: "No invoices in this period",
  emptyExplanation:
    "Invoices are raised on the first working day of each month for the month before.",
  restrictedFor: ["agent", "borrower"],
  metaTitle: "Billing and ledgers",
  metaDescription:
    "Sourcing fee invoices, settlement status and reconciliation exceptions for your account.",
};

export const Route = createFileRoute("/app/lender/billing")({
  head: () => ({
    meta: [
      { title: "Billing and ledgers — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Sourcing fee invoices, settlement status and reconciliation exceptions for your account.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Billing and ledgers — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "Sourcing fee invoices, settlement status and reconciliation exceptions for your account.",
      },
    ],
  }),
  component: LenderBillingPage,
});

function LenderBillingPage() {
  return <PortalPage spec={spec} />;
}
