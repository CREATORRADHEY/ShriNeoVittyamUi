import { defineTool } from "@lovable.dev/mcp-js";

import { products } from "@/config/products";

export default defineTool({
  name: "list_loan_products",
  title: "List loan products",
  description:
    "List every ShriNeo Capital loan product with its indicative amount range, tenure range and indicative interest rate band.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const rows = products.map((p) => ({
      slug: p.slug,
      name: p.name,
      path: p.path,
      summary: p.summary,
      comingSoon: Boolean(p.phase2),
      amountRangeInr: p.range,
      tenure: p.tenure,
      indicativeAnnualRatePercent: p.indicativeRate,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { products: rows },
    };
  },
});
