import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
  role: "admin",
  title: "Settings",
  subtitle: "Platform configuration and access control.",
  panels: [
    {
      title: "Roles and permissions",
      body: "Four base roles with least-privilege defaults. Elevated permissions expire automatically after 24 hours.",
    },
    {
      title: "Data retention",
      body: "Declined-application data purges after 24 months. Audit and consent records are held for eight years.",
    },
    {
      title: "Two-person rules",
      body: "Suspending an agent, changing a sanction cap and publishing a regulatory page each need a second approver.",
      badge: {
        text: "Enforced",
        tone: "success",
      },
    },
    {
      title: "Languages",
      body: "English and Hindi are published. Seven further languages are staged behind a flag.",
    },
    {
      title: "Feature flags",
      body: "Sachet loans are enabled for prototype journeys only, not for live disbursal.",
    },
    {
      title: "Incident policy",
      body: "Severity-one incidents page the on-call engineer and post to the public status page within 15 minutes.",
    },
  ],
  emptyTitle: "No configuration loaded",
  emptyExplanation: "Settings load from the live configuration service. Retry in a moment.",
  metaTitle: "Platform settings",
  metaDescription:
    "Configure platform-wide policy, roles, retention and the controls that require two approvals.",
};

export const Route = createFileRoute("/app/admin/settings")({
  head: () => ({
    meta: [
      { title: "Platform settings — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Configure platform-wide policy, roles, retention and the controls that require two approvals.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Platform settings — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "Configure platform-wide policy, roles, retention and the controls that require two approvals.",
      },
    ],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  return <PortalPage spec={spec} />;
}
