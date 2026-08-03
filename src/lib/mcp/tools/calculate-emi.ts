import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { calculateEmi } from "@/lib/emi";
import { formatINR } from "@/lib/format";

export default defineTool({
  name: "calculate_emi",
  title: "Calculate EMI",
  description:
    "Calculate a reducing-balance monthly EMI, total interest and total repayment for a loan amount, annual interest rate and tenure in months. Indicative estimate only — actual lender terms are final.",
  inputSchema: {
    principal: z.number().describe("Loan amount in rupees, e.g. 500000."),
    annualRatePercent: z
      .number()
      .describe("Nominal annual interest rate as a percentage, e.g. 12.5."),
    tenureMonths: z.number().describe("Repayment tenure in months, e.g. 24."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ principal, annualRatePercent, tenureMonths }) => {
    if (principal <= 0 || tenureMonths <= 0 || annualRatePercent < 0) {
      throw new ToolError(
        "principal and tenureMonths must be greater than zero, and annualRatePercent cannot be negative.",
      );
    }

    const result = calculateEmi({
      principal,
      annualRatePercent,
      tenureMonths: Math.round(tenureMonths),
    });

    const text = [
      `Monthly EMI: ${formatINR(result.monthlyEmi)}`,
      `Total interest: ${formatINR(result.totalInterest)}`,
      `Total repayment: ${formatINR(result.totalRepayment)}`,
      "Indicative estimate only. Final terms are set by the participating lender.",
    ].join("\n");

    return {
      content: [{ type: "text", text }],
      structuredContent: { ...result, currency: "INR" },
    };
  },
});
