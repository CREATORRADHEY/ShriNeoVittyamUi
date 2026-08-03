import { defineMcp } from "@lovable.dev/mcp-js";

import calculateEmiTool from "./tools/calculate-emi";
import getCompanyInfoTool from "./tools/get-company-info";
import getLoanProductTool from "./tools/get-loan-product";
import listLoanProductsTool from "./tools/list-loan-products";

// `defineTool` leaves `outputSchema` as `undefined`, which trips
// exactOptionalPropertyTypes when matched against AnyToolDefinition.
type AnyTool = Parameters<typeof defineMcp>[0]["tools"][number];

const tools = [
  listLoanProductsTool,
  getLoanProductTool,
  calculateEmiTool,
  getCompanyInfoTool,
].map((tool) => tool as unknown as AnyTool);



export default defineMcp({
  name: "trustworthy-finance-hub",
  title: "Trustworthy Finance Hub",
  version: "0.1.0",
  instructions:
    "Public tools for ShriNeo Capital, a Lending Service Provider in India. Use `list_loan_products` and `get_loan_product` for product, eligibility and document information, `calculate_emi` for indicative repayment estimates, and `get_company_info` for legal entity and grievance-redressal facts. All figures are indicative; participating lenders set final terms.",
  tools: [listLoanProductsTool, getLoanProductTool, calculateEmiTool, getCompanyInfoTool],
});
