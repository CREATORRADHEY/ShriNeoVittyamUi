import { createFileRoute } from "@tanstack/react-router";

import { NegativePageIndex } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/")({
  head: () => ({
    meta: [
      { title: "Negative state index — ShriNeo Capital" },
      {
        name: "description",
        content: "Index of every branded ShriNeo Capital error, empty and restricted state page.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Negative state index — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Index of every branded ShriNeo Capital error, empty and restricted state page.",
      },
    ],
  }),
  component: NegativePageIndex,
});
