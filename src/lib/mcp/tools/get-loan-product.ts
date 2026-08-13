import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { products } from "@/config/products";

export default defineTool({
  name: "get_loan_product",
  title: "Get loan product details",
  description:
    "Get full public details for one ShriNeo Capital loan product: eligibility, required documents, FAQs and indicative pricing.",
  inputSchema: {
    slug: z.string().describe("Product slug: personal, business, home, mortgage or sachet."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const product = products.find((p) => p.slug === slug.trim().toLowerCase());
    if (!product) {
      throw new ToolError(
        `Unknown product "${slug}". Available slugs: ${products.map((p) => p.slug).join(", ")}.`,
      );
    }

    const detail = {
      slug: product.slug,
      name: product.name,
      path: product.path,
      summary: product.summary,
      description: product.description,
      comingSoon: Boolean(product.phase2),
      amountRangeInr: product.range,
      tenure: product.tenure,
      indicativeAnnualRatePercent: product.indicativeRate,
      whyShriNeo: product.whyShriNeo,
      eligibility: product.eligibility,
      documents: product.documents,
      faqs: product.faqs,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(detail, null, 2) }],
      structuredContent: detail,
    };
  },
});
