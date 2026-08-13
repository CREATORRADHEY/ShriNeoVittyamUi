import { createFileRoute } from "@tanstack/react-router";

import { OfflinePage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/offline")({
  head: () => ({
    meta: [
      { title: "You're offline — ShriNeo Capital" },
      {
        name: "description",
        content: "Reconnect to continue. Saved information stays available on this device.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "You're offline — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Reconnect to continue. Saved information stays available on this device.",
      },
    ],
  }),
  component: OfflinePage,
});
