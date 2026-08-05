import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "lender",
    "slug": "api-status",
    "title": "API status",
    "subtitle": "Live health of every integration between us and you.",
    "kpis": [
      {
        "label": "Decision API",
        "value": "Healthy",
        "tone": "success"
      },
      {
        "label": "Median latency",
        "value": "310 ms"
      },
      {
        "label": "Error rate",
        "value": "0.2%",
        "hint": "Last hour"
      },
      {
        "label": "Open incidents",
        "value": "0",
        "tone": "success"
      }
    ],
    "table": {
      "caption": "Endpoints",
      "entity": "endpoints",
      "columns": [
        "Endpoint",
        "Purpose",
        "Latency",
        "Uptime 30d",
        "Status"
      ],
      "rows": [
        [
          "/decision",
          "Automated credit decision",
          "310 ms",
          "99.97%",
          {
            "text": "Healthy",
            "tone": "success"
          }
        ],
        [
          "/documents",
          "Document pull",
          "820 ms",
          "99.91%",
          {
            "text": "Healthy",
            "tone": "success"
          }
        ],
        [
          "/disbursal",
          "Disbursal confirmation",
          "440 ms",
          "99.99%",
          {
            "text": "Healthy",
            "tone": "success"
          }
        ],
        [
          "/webhooks",
          "Status callbacks",
          "—",
          "99.80%",
          {
            "text": "Degraded",
            "tone": "warning"
          }
        ]
      ]
    },
    "panels": [
      {
        "title": "What happens if an endpoint fails",
        "body": "Files queue in order and nothing is auto-declined. When the endpoint recovers, the queue drains oldest first."
      },
      {
        "title": "Incident contact",
        "body": "Integration desk, reachable 24×7 for severity-one incidents."
      }
    ],
    "emptyTitle": "No telemetry for this window",
    "emptyExplanation": "Health data is retained for 90 days. Choose a more recent window.",
    "metaTitle": "API status",
    "metaDescription": "Live health, latency and recent incidents for the decisioning, document and disbursal integrations."
  };

export const Route = createFileRoute("/app/lender/api-status")({
  head: () => ({
    meta: [
      { title: "API status — ShriNeo Capital" },
      { name: "description", content: "Live health, latency and recent incidents for the decisioning, document and disbursal integrations." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "API status — ShriNeo Capital" },
      { property: "og:description", content: "Live health, latency and recent incidents for the decisioning, document and disbursal integrations." },
    ],
  }),
  component: LenderApiStatusPage,
});

function LenderApiStatusPage() {
  return <PortalPage spec={spec} />;
}
