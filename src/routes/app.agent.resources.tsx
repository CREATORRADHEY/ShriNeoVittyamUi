import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
  role: "agent",
  title: "Resources",
  subtitle: "Approved material you may share with a borrower.",
  panels: [
    {
      title: "Document checklist",
      body: "One page, printable, in Hindi and English. Covers identity, address, income and bank proof.",
    },
    {
      title: "Key fact statement explainer",
      body: "How to walk a borrower through APR, fees and the cooling-off period without over-promising.",
    },
    {
      title: "Consent script",
      body: "Exact wording to use when asking a borrower to approve a bureau or bank-statement check.",
    },
    {
      title: "What you must never say",
      body: "No guarantees of approval, no promises about interest rates, no collecting money.",
      badge: {
        text: "Compliance",
        tone: "warning",
      },
    },
  ],
  table: {
    caption: "Downloads",
    entity: "resources",
    columns: ["Resource", "Language", "Updated", "Format"],
    rows: [
      ["Document checklist", "Hindi, English", "01 Mar 2026", "PDF"],
      ["Fair practice summary", "Hindi, English", "12 Feb 2026", "PDF"],
      ["Consent script", "Hindi", "12 Feb 2026", "PDF"],
    ],
  },
  emptyTitle: "No resources published yet",
  emptyExplanation: "Approved material appears here as soon as compliance signs it off.",
  metaTitle: "Agent resources",
  metaDescription:
    "Download approved explainers, checklists and disclosure material you can share with borrowers.",
};

export const Route = createFileRoute("/app/agent/resources")({
  head: () => ({
    meta: [
      { title: "Agent resources — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Download approved explainers, checklists and disclosure material you can share with borrowers.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Agent resources — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "Download approved explainers, checklists and disclosure material you can share with borrowers.",
      },
    ],
  }),
  component: AgentResourcesPage,
});

function AgentResourcesPage() {
  return <PortalPage spec={spec} />;
}
