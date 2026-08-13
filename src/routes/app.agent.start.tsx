import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
  role: "agent",
  title: "Start an application",
  subtitle: "Begin a file on behalf of a borrower, with their consent recorded first.",
  notices: [
    {
      tone: "info",
      title: "Consent is captured before anything else",
      explanation:
        "The borrower receives an OTP and a plain-language summary of what will be checked. Nothing is submitted until they approve it on their own phone.",
      safety: "You never see the borrower's OTP, and no check runs without their approval.",
      actions: ["Begin a new file", "Resume a draft"],
    },
  ],
  panels: [
    {
      title: "1 · Borrower details",
      body: "Name, mobile and the amount they need. Two minutes of typing, nothing more.",
    },
    {
      title: "2 · Consent",
      body: "The borrower approves the bureau and bank-statement checks on their own device.",
    },
    {
      title: "3 · Documents",
      body: "Upload from the camera. Blurred pages are rejected on the spot rather than three days later.",
    },
    {
      title: "4 · Submit",
      body: "The file routes to every eligible lender at once. You and the borrower see the same status.",
    },
  ],
  emptyTitle: "No drafts saved",
  emptyExplanation:
    "Drafts are kept for 14 days so you can finish a file after collecting a missing paper.",
  footnote:
    "Never collect money from a borrower. Your commission is paid by ShriNeo Capital after disbursal.",
  metaTitle: "Start an application",
  metaDescription:
    "Begin an application for a borrower with consent captured up front and every step recorded.",
};

export const Route = createFileRoute("/app/agent/start")({
  head: () => ({
    meta: [
      { title: "Start an application — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Begin an application for a borrower with consent captured up front and every step recorded.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Start an application — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "Begin an application for a borrower with consent captured up front and every step recorded.",
      },
    ],
  }),
  component: AgentStartPage,
});

function AgentStartPage() {
  return <PortalPage spec={spec} />;
}
