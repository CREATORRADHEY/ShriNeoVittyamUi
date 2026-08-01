import { createFileRoute } from "@tanstack/react-router";

import { TooManyAttemptsPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/429")({
  head: () => ({
    meta: [
      { title: "Please wait before trying again — ShriNeo Capital" },
      { name: "description", content: "Verification requests are briefly limited. Your progress is saved." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Please wait before trying again — ShriNeo Capital" },
      { property: "og:description", content: "Verification requests are briefly limited. Your progress is saved." },
    ],
  }),
  component: TooManyAttemptsPage,
});
