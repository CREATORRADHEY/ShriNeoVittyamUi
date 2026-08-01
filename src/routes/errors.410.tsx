import { createFileRoute } from "@tanstack/react-router";

import { LinkExpiredPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/410")({
  head: () => ({
    meta: [
      { title: "Link expired — ShriNeo Capital" },
      { name: "description", content: "This link has expired. Request a new invitation, code or download link." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Link expired — ShriNeo Capital" },
      { property: "og:description", content: "This link has expired. Request a new invitation, code or download link." },
    ],
  }),
  component: LinkExpiredPage,
});
