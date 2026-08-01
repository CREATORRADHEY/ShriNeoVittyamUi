import { createFileRoute } from "@tanstack/react-router";
import { getProduct } from "@/config/products";
import { ProductPage } from "@/components/loans/product-page";

const product = getProduct("sachet");

export const Route = createFileRoute("/loans/sachet")({
  head: () => ({
    meta: [
      { title: "Sachet Loan — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Small-ticket credit for short-term needs. This product is planned for Phase 2 and is not yet operational.",
      },
      { property: "og:title", content: "Sachet Loan — ShriNeo Capital" },
      { property: "og:description", content: product.summary },
      { property: "og:url", content: "/loans/sachet" },
    ],
    links: [{ rel: "canonical", href: "/loans/sachet" }],
  }),
  component: () => <ProductPage product={product} />,
});
