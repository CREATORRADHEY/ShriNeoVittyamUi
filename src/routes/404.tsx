import { createFileRoute } from "@tanstack/react-router";

import { NotFoundPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "Page not found — ShriNeo Capital" },
      {
        name: "description",
        content:
          "We couldn't find that page. Return to your dashboard or contact ShriNeo Capital support.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Page not found — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "We couldn't find that page. Return to your dashboard or contact ShriNeo Capital support.",
      },
    ],
  }),
  component: NotFoundPage,
});
