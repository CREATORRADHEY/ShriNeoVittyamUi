import { createFileRoute } from "@tanstack/react-router";

import { ServiceUnavailablePage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/503")({
  head: () => ({
    meta: [
      { title: "Service temporarily unavailable — ShriNeo Capital" },
      {
        name: "description",
        content:
          "A connected service is temporarily unavailable. See what is affected and what still works.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Service temporarily unavailable — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "A connected service is temporarily unavailable. See what is affected and what still works.",
      },
    ],
  }),
  component: ServiceUnavailablePage,
});
