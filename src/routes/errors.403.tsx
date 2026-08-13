import { createFileRoute } from "@tanstack/react-router";

import { PermissionRestrictedPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/403")({
  head: () => ({
    meta: [
      { title: "Access restricted — ShriNeo Capital" },
      { name: "description", content: "This page isn't available for your role or account." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Access restricted — ShriNeo Capital" },
      {
        property: "og:description",
        content: "This page isn't available for your role or account.",
      },
    ],
  }),
  component: PermissionRestrictedPage,
});
