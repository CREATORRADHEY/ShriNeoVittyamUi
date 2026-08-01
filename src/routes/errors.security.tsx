import { createFileRoute } from "@tanstack/react-router";

import { SecurityRestrictionPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/security")({
  head: () => ({
    meta: [
      { title: "Action paused for your security — ShriNeo Capital" },
      { name: "description", content: "We paused an action to protect your account. No money moved." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Action paused for your security — ShriNeo Capital" },
      { property: "og:description", content: "We paused an action to protect your account. No money moved." },
    ],
  }),
  component: SecurityRestrictionPage,
});
