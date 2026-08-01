import { createFileRoute } from "@tanstack/react-router";

import { SessionEndedPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/401")({
  head: () => ({
    meta: [
      { title: "Session ended — ShriNeo Capital" },
      { name: "description", content: "Your session has ended. Sign in again to continue; saved progress is preserved." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Session ended — ShriNeo Capital" },
      { property: "og:description", content: "Your session has ended. Sign in again to continue; saved progress is preserved." },
    ],
  }),
  component: SessionEndedPage,
});
