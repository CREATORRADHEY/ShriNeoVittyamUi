import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "borrower",
    "slug": "profile",
    "title": "Profile",
    "subtitle": "Your details, consents and login security.",
    "panels": [
      {
        "title": "Personal details",
        "body": "Name, date of birth and PAN are locked once verified. To correct them, raise a support request with proof."
      },
      {
        "title": "Contact details",
        "body": "Mobile 98••••••21 and email r••••@example.com. Changing either needs a fresh verification."
      },
      {
        "title": "Language",
        "body": "Interface language is set to English. You can switch to Hindi at any time from the header."
      },
      {
        "title": "Active consents",
        "body": "Bureau check consent and account aggregator consent are active until 12 Sep 2026.",
        "badge": {
          "text": "Revocable",
          "tone": "info"
        }
      },
      {
        "title": "Login security",
        "body": "OTP on every new device. We will always tell you when a new device signs in.",
        "badge": {
          "text": "On",
          "tone": "success"
        }
      },
      {
        "title": "Download your data",
        "body": "Request a copy of everything held about you. We deliver it within 30 days."
      }
    ],
    "emptyTitle": "Profile not set up yet",
    "emptyExplanation": "Complete your first application and your verified details will appear here.",
    "footnote": "Withdrawing a consent stops future data pulls. It does not delete a loan already sanctioned.",
    "metaTitle": "Profile and consents",
    "metaDescription": "Manage your personal details, language, active consents and login security settings."
  };

export const Route = createFileRoute("/app/borrower/profile")({
  head: () => ({
    meta: [
      { title: "Profile and consents — ShriNeo Capital" },
      { name: "description", content: "Manage your personal details, language, active consents and login security settings." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Profile and consents — ShriNeo Capital" },
      { property: "og:description", content: "Manage your personal details, language, active consents and login security settings." },
    ],
  }),
  component: BorrowerProfilePage,
});

function BorrowerProfilePage() {
  return <PortalPage spec={spec} />;
}
