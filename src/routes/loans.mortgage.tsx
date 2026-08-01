import { createFileRoute } from "@tanstack/react-router";
import { getProduct } from "@/config/products";
import { ProductPage } from "@/components/loans/product-page";

const product = getProduct("mortgage");

export const Route = createFileRoute("/loans/mortgage")({
  head: () => ({
    meta: [
      { title: "Mortgage Loan (Loan Against Property) — ShriNeo Capital" },
      {
        name: "description",
        content:
          product.summary + " Understand loan-to-value, rate and fees before you pledge property.",
      },
      { property: "og:title", content: "Mortgage Loan — ShriNeo Capital" },
      { property: "og:description", content: product.summary },
      { property: "og:url", content: "/loans/mortgage" },
    ],
    links: [{ rel: "canonical", href: "/loans/mortgage" }],
  }),
  component: () => <ProductPage product={product} />,
});
