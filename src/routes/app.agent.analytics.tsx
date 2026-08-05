import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "agent",
    "slug": "analytics",
    "title": "Analytics",
    "subtitle": "Where your files convert, and where they stall.",
    "kpis": [
      {
        "label": "Lead to file",
        "value": "48%"
      },
      {
        "label": "File to sanction",
        "value": "61%"
      },
      {
        "label": "Median turnaround",
        "value": "2.4 days"
      },
      {
        "label": "Document rejection rate",
        "value": "9%",
        "tone": "warning"
      }
    ],
    "panels": [
      {
        "title": "Biggest drop-off",
        "body": "Bank statement uploads. Files that use account aggregator instead of PDFs sanction about a day faster."
      },
      {
        "title": "Best performing product",
        "body": "Personal loans up to ₹5,00,000, where the automated decision returns within minutes."
      },
      {
        "title": "Coverage",
        "body": "Indore, Dewas and Ujjain. Adding one more district would raise your assigned lead volume."
      },
      {
        "title": "Quality score",
        "body": "Strong. Fewer than one in ten of your files receives a lender query.",
        "badge": {
          "text": "Top quartile",
          "tone": "success"
        }
      }
    ],
    "emptyTitle": "Not enough activity to report",
    "emptyExplanation": "Analytics appear once you have completed five files, so the numbers mean something.",
    "metaTitle": "Agent analytics",
    "metaDescription": "Understand your conversion rate, drop-off points and turnaround times across products."
  };

export const Route = createFileRoute("/app/agent/analytics")({
  head: () => ({
    meta: [
      { title: "Agent analytics — ShriNeo Capital" },
      { name: "description", content: "Understand your conversion rate, drop-off points and turnaround times across products." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Agent analytics — ShriNeo Capital" },
      { property: "og:description", content: "Understand your conversion rate, drop-off points and turnaround times across products." },
    ],
  }),
  component: AgentAnalyticsPage,
});

function AgentAnalyticsPage() {
  return <PortalPage spec={spec} />;
}
