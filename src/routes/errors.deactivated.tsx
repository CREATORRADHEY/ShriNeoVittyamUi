import { createFileRoute } from "@tanstack/react-router";

import { AccountDeactivatedPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/deactivated")({
  head: () => ({
    meta: [
      { title: "Account no longer active — ShriNeo Capital" },
      {
        name: "description",
        content: "Access historical records or start a reactivation request.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Account no longer active — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Access historical records or start a reactivation request.",
      },
    ],
  }),
  component: AccountDeactivatedPage,
});
