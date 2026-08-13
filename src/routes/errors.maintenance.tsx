import { createFileRoute } from "@tanstack/react-router";

import { MaintenancePage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/maintenance")({
  head: () => ({
    meta: [
      { title: "Scheduled maintenance — ShriNeo Capital" },
      {
        name: "description",
        content: "Planned platform maintenance is in progress. Records are unaffected.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Scheduled maintenance — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Planned platform maintenance is in progress. Records are unaffected.",
      },
    ],
  }),
  component: MaintenancePage,
});
