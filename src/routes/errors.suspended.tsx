import { createFileRoute } from "@tanstack/react-router";

import { AccountSuspendedPage } from "@/components/states/negative-pages";

export const Route = createFileRoute("/errors/suspended")({
  head: () => ({
    meta: [
      { title: "Account temporarily restricted — ShriNeo Capital" },
      {
        name: "description",
        content: "What remains available while your account is under review.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Account temporarily restricted — ShriNeo Capital" },
      {
        property: "og:description",
        content: "What remains available while your account is under review.",
      },
    ],
  }),
  component: AccountSuspendedPage,
});
