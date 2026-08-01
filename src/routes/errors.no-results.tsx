import { createFileRoute } from "@tanstack/react-router";

import { NoResultsPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/no-results")({
  head: () => ({
    meta: [
      { title: "No matching results — ShriNeo Capital" },
      { name: "description", content: "No records match the filters applied. Clear filters or modify your search." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "No matching results — ShriNeo Capital" },
      { property: "og:description", content: "No records match the filters applied. Clear filters or modify your search." },
    ],
  }),
  component: NoResultsPage,
});
