import { createFileRoute } from "@tanstack/react-router";

import { PlatformErrorPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/500")({
  head: () => ({
    meta: [
      { title: "Request could not be completed — ShriNeo Capital" },
      {
        name: "description",
        content: "We couldn't complete that request. Your information is safe.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Request could not be completed — ShriNeo Capital" },
      {
        property: "og:description",
        content: "We couldn't complete that request. Your information is safe.",
      },
    ],
  }),
  component: PlatformErrorPage,
});
