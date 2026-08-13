import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
  role: "agent",
  title: "My files",
  subtitle: "Applications you started, with what each one is waiting on.",
  kpis: [
    {
      label: "Active files",
      value: "14",
    },
    {
      label: "Awaiting documents",
      value: "5",
      tone: "warning",
    },
    {
      label: "With lender",
      value: "6",
    },
    {
      label: "Disbursed this month",
      value: "3",
      tone: "success",
    },
  ],
  table: {
    caption: "Your files",
    entity: "files",
    columns: ["Application", "Borrower", "Product", "Amount", "Waiting on", "Status"],
    rows: [
      [
        "SNV-24-118204",
        "R. Verma",
        "Personal",
        "₹3,00,000",
        "Lender decision",
        {
          text: "With lender",
          tone: "info",
        },
      ],
      [
        "SNV-24-118198",
        "S. Khan",
        "Business",
        "₹9,50,000",
        "Bank statement",
        {
          text: "Action needed",
          tone: "warning",
        },
      ],
      [
        "SNV-24-118147",
        "M. Patel",
        "Home",
        "₹41,00,000",
        "Nothing",
        {
          text: "Sanctioned",
          tone: "success",
        },
      ],
    ],
  },
  emptyTitle: "You have not started a file yet",
  emptyExplanation:
    "Start an application for a borrower and it will appear here with its live status.",
  metaTitle: "My files",
  metaDescription:
    "Every application you started, its current stage and the exact item it is waiting on.",
};

export const Route = createFileRoute("/app/agent/files")({
  head: () => ({
    meta: [
      { title: "My files — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Every application you started, its current stage and the exact item it is waiting on.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "My files — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "Every application you started, its current stage and the exact item it is waiting on.",
      },
    ],
  }),
  component: AgentFilesPage,
});

function AgentFilesPage() {
  return <PortalPage spec={spec} />;
}
