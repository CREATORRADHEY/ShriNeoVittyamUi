import { createFileRoute } from "@tanstack/react-router";
import { getProduct } from "@/config/products";
import { ProductPage } from "@/components/loans/product-page";

const product = getProduct("business");

export const Route = createFileRoute("/loans/business")({
  head: () => ({
    meta: [
      { title: "Business Loan — ShriNeo Capital" },
      { name: "description", content: product.summary + " Compare working capital and growth funding offers from participating lenders." },
      { property: "og:title", content: "Business Loan — ShriNeo Capital" },
      { property: "og:description", content: product.summary },
      { property: "og:url", content: "/loans/business" },
    ],
    links: [{ rel: "canonical", href: "/loans/business" }],
  }),
  component: () => <ProductPage product={product} />,
});
