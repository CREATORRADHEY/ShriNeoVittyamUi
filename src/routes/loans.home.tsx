import { createFileRoute } from "@tanstack/react-router";
import { getProduct } from "@/config/products";
import { ProductPage } from "@/components/loans/product-page";

const product = getProduct("home");

export const Route = createFileRoute("/loans/home")({
  head: () => ({
    meta: [
      { title: "Home Loan — ShriNeo Capital" },
      { name: "description", content: product.summary + " Compare long-tenure offers on total cost, not only headline rate." },
      { property: "og:title", content: "Home Loan — ShriNeo Capital" },
      { property: "og:description", content: product.summary },
      { property: "og:url", content: "/loans/home" },
    ],
    links: [{ rel: "canonical", href: "/loans/home" }],
  }),
  component: () => <ProductPage product={product} />,
});
