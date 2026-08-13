import { createFileRoute } from "@tanstack/react-router";

import { UnsupportedBrowserPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/unsupported-browser")({
  head: () => ({
    meta: [
      { title: "Browser not fully supported — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Some features may not work in this browser version. Guidance and safe continuation.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Browser not fully supported — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "Some features may not work in this browser version. Guidance and safe continuation.",
      },
    ],
  }),
  component: UnsupportedBrowserPage,
});
