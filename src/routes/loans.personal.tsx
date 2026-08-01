import { createFileRoute } from "@tanstack/react-router";
import { getProduct } from "@/config/products";
import { ProductPage } from "@/components/loans/product-page";

const product = getProduct("personal");

export const Route = createFileRoute("/loans/personal")({
  head: () => ({
    meta: [
      { title: "Personal Loan — ShriNeo Capital" },
      { name: "description", content: product.summary + " Compare offers from participating lenders with clear fees and APR." },
      { property: "og:title", content: "Personal Loan — ShriNeo Capital" },
      { property: "og:description", content: product.summary },
      { property: "og:url", content: "/loans/personal" },
    ],
    links: [{ rel: "canonical", href: "/loans/personal" }],
  }),
  component: () => <ProductPage product={product} />,
});
