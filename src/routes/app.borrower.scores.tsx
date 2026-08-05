import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "borrower",
    "slug": "scores",
    "title": "Scores",
    "subtitle": "Your bureau score and your SNV Trust Score, explained side by side.",
    "kpis": [
      {
        "label": "Bureau score",
        "value": "742",
        "hint": "Refreshed 01 Mar 2026"
      },
      {
        "label": "SNV Trust Score",
        "value": "68",
        "hint": "Out of 100"
      },
      {
        "label": "Repayment record",
        "value": "On time",
        "tone": "success"
      },
      {
        "label": "Score checks",
        "value": "Soft only",
        "hint": "No impact on your bureau score"
      }
    ],
    "panels": [
      {
        "title": "What helps your score",
        "body": "Paying every EMI on the due date, keeping card usage below a third of your limit, and holding accounts open for longer."
      },
      {
        "title": "What holds it back",
        "body": "Missed or part payments, several new loan enquiries in a short window, and very high credit utilisation."
      },
      {
        "title": "Why the SNV Trust Score exists",
        "body": "It reads verified income patterns, repayment behaviour and stability signals, so a thin bureau file does not by itself decide the outcome.",
        "badge": {
          "text": "Beyond bureau",
          "tone": "info"
        }
      },
      {
        "title": "Who can see it",
        "body": "Only lenders you choose to send an application to, and only for that application.",
        "badge": {
          "text": "Consent led",
          "tone": "success"
        }
      }
    ],
    "emptyTitle": "No score available yet",
    "emptyExplanation": "Scores appear after your first consented check. We use a soft enquiry, which never affects your bureau score.",
    "metaTitle": "Your scores",
    "metaDescription": "See your bureau score and SNV Trust Score, what moves them and how lenders read them."
  };

export const Route = createFileRoute("/app/borrower/scores")({
  head: () => ({
    meta: [
      { title: "Your scores — ShriNeo Capital" },
      { name: "description", content: "See your bureau score and SNV Trust Score, what moves them and how lenders read them." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Your scores — ShriNeo Capital" },
      { property: "og:description", content: "See your bureau score and SNV Trust Score, what moves them and how lenders read them." },
    ],
  }),
  component: BorrowerScoresPage,
});

function BorrowerScoresPage() {
  return <PortalPage spec={spec} />;
}
