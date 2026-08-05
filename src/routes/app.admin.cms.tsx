import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
    "role": "admin",
    "title": "CMS",
    "subtitle": "Public content, translations and approval state.",
    "kpis": [
      {
        "label": "Published pages",
        "value": "62"
      },
      {
        "label": "Awaiting approval",
        "value": "4",
        "tone": "warning"
      },
      {
        "label": "Missing Hindi",
        "value": "7",
        "tone": "warning"
      },
      {
        "label": "Changed this week",
        "value": "11"
      }
    ],
    "table": {
      "caption": "Pages",
      "entity": "pages",
      "columns": [
        "Page",
        "Owner",
        "Hindi",
        "Updated",
        "Status"
      ],
      "rows": [
        [
          "/loans/personal",
          "Product",
          "Complete",
          "11 Mar 2026",
          {
            "text": "Published",
            "tone": "success"
          }
        ],
        [
          "/trust-center/security",
          "Compliance",
          "Complete",
          "09 Mar 2026",
          {
            "text": "Published",
            "tone": "success"
          }
        ],
        [
          "/blog/apr-and-fees",
          "Editorial",
          "Missing",
          "12 Mar 2026",
          {
            "text": "Awaiting approval",
            "tone": "warning"
          }
        ]
      ]
    },
    "emptyTitle": "No pages match this filter",
    "emptyExplanation": "Clear the filter to see the full content inventory.",
    "footnote": "Pages carrying a regulatory statement need compliance approval before they publish.",
    "metaTitle": "Content management",
    "metaDescription": "Manage public pages, translations and the approval state of every published change."
  };

export const Route = createFileRoute("/app/admin/cms")({
  head: () => ({
    meta: [
      { title: "Content management — ShriNeo Capital" },
      { name: "description", content: "Manage public pages, translations and the approval state of every published change." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Content management — ShriNeo Capital" },
      { property: "og:description", content: "Manage public pages, translations and the approval state of every published change." },
    ],
  }),
  component: AdminCmsPage,
});

function AdminCmsPage() {
  return <PortalPage spec={spec} />;
}
