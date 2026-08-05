import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "title": "System status",
    "subtitle": "Platform health, jobs and incidents.",
    "kpis": [
      {
        "label": "Uptime 30d",
        "value": "99.98%",
        "tone": "success"
      },
      {
        "label": "Queue depth",
        "value": "128"
      },
      {
        "label": "Failed jobs 24h",
        "value": "3",
        "tone": "warning"
      },
      {
        "label": "Open incidents",
        "value": "0",
        "tone": "success"
      }
    ],
    "table": {
      "caption": "Services",
      "entity": "services",
      "columns": [
        "Service",
        "Latency",
        "Error rate",
        "Last incident",
        "Status"
      ],
      "rows": [
        [
          "Application intake",
          "180 ms",
          "0.1%",
          "18 Feb 2026",
          {
            "text": "Healthy",
            "tone": "success"
          }
        ],
        [
          "Decision routing",
          "310 ms",
          "0.2%",
          "02 Mar 2026",
          {
            "text": "Healthy",
            "tone": "success"
          }
        ],
        [
          "Document pipeline",
          "1.2 s",
          "1.4%",
          "12 Mar 2026",
          {
            "text": "Degraded",
            "tone": "warning"
          }
        ],
        [
          "Notifications",
          "90 ms",
          "0.0%",
          "—",
          {
            "text": "Healthy",
            "tone": "success"
          }
        ]
      ]
    },
    "emptyTitle": "No telemetry available",
    "emptyExplanation": "Health data is retained for 90 days. Choose a more recent window.",
    "footnote": "The public-facing version of this page is available at /system-status.",
    "metaTitle": "System status",
    "metaDescription": "Internal view of platform health, background jobs, queue depth and open incidents."
  };

export const Route = createFileRoute("/app/admin/system")({
  head: () => ({
    meta: [
      { title: "System status — ShriNeo Capital" },
      { name: "description", content: "Internal view of platform health, background jobs, queue depth and open incidents." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "System status — ShriNeo Capital" },
      { property: "og:description", content: "Internal view of platform health, background jobs, queue depth and open incidents." },
    ],
  }),
  component: AdminSystemPage,
});

function AdminSystemPage() {
  return <PortalPage spec={spec} />;
}
