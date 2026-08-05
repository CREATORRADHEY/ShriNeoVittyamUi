import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "agent",
    "slug": "profile",
    "title": "Profile",
    "subtitle": "Your identity, coverage and payout details.",
    "panels": [
      {
        "title": "Agent code",
        "body": "AG-4471, active since 14 Aug 2024. Quote this code in every conversation with the desk."
      },
      {
        "title": "Coverage",
        "body": "Indore, Dewas and Ujjain. Add or remove districts with 48 hours' notice."
      },
      {
        "title": "KYC status",
        "body": "PAN and Aadhaar verified. Re-verification is due 14 Aug 2026.",
        "badge": {
          "text": "Verified",
          "tone": "success"
        }
      },
      {
        "title": "Payout account",
        "body": "Kaveri Bank ••••4412. Changing it pauses payouts for one cycle as a fraud control."
      },
      {
        "title": "Login security",
        "body": "OTP on every new device, and a session log you can review.",
        "badge": {
          "text": "On",
          "tone": "success"
        }
      },
      {
        "title": "Certification",
        "body": "Valid to 31 Dec 2026. Lapsed certification pauses new lead assignment."
      }
    ],
    "emptyTitle": "Profile not set up yet",
    "emptyExplanation": "Complete onboarding and your verified agent details will appear here.",
    "metaTitle": "Agent profile",
    "metaDescription": "Manage your verified identity, service districts, bank payout details and login security."
  };

export const Route = createFileRoute("/app/agent/profile")({
  head: () => ({
    meta: [
      { title: "Agent profile — ShriNeo Capital" },
      { name: "description", content: "Manage your verified identity, service districts, bank payout details and login security." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Agent profile — ShriNeo Capital" },
      { property: "og:description", content: "Manage your verified identity, service districts, bank payout details and login security." },
    ],
  }),
  component: AgentProfilePage,
});

function AgentProfilePage() {
  return <PortalPage spec={spec} />;
}
