import { createFileRoute } from "@tanstack/react-router";

import { ScriptFailurePage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/script-failure")({
  head: () => ({
    meta: [
      { title: "Page could not load correctly — ShriNeo Capital" },
      { name: "description", content: "Part of this page failed to load. Reload or return to your dashboard." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Page could not load correctly — ShriNeo Capital" },
      { property: "og:description", content: "Part of this page failed to load. Reload or return to your dashboard." },
    ],
  }),
  component: ScriptFailurePage,
});
