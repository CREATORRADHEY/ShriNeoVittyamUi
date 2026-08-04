/**
 * Editorial articles used by the homepage teaser, the /blog listing and the
 * /blog/$slug article pages. Content is written in-house — no invented authors
 * and no invented publication dates.
 */

export type BlogArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  read: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "apr-interest-and-fees",
    category: "Borrowing basics",
    title: "APR, interest and fees: what you actually pay",
    excerpt:
      "The lowest headline rate is rarely the cheapest loan. Here is how to read an offer end to end before you sign.",
    read: "6 min read",
    intro:
      "Two offers can carry the same interest rate and still cost very different amounts. The difference sits in fees, tenure and how the lender charges them.",
    sections: [
      {
        heading: "Interest rate is only the starting point",
        body: [
          "The interest rate describes what the lender charges on the outstanding principal. It does not include a processing fee, documentation charges, insurance bundled with the loan, or any charge deducted before disbursal.",
          "A loan advertised at a lower rate can cost more overall once a higher processing fee is added, particularly on shorter tenures where the fee is spread over fewer instalments.",
        ],
      },
      {
        heading: "APR brings the cost together",
        body: [
          "The Annual Percentage Rate expresses interest and mandatory charges as a single annualised figure, which makes two offers directly comparable.",
          "When you compare offers on ShriNeo, offers are ranked by total cost rather than by headline rate, and the ranking is never influenced by a commercial arrangement.",
        ],
      },
      {
        heading: "Check the total repayment before you sign",
        body: [
          "Total repayment is the number that decides affordability: principal, interest and every fee over the full tenure.",
          "A longer tenure lowers the EMI and raises the total repayment. Choose the shortest tenure whose EMI you can comfortably service every month.",
        ],
      },
      {
        heading: "Questions worth asking every lender",
        body: [
          "What is the processing fee, and is it deducted from the disbursal? Is there a prepayment or foreclosure charge? Is any insurance premium being financed inside the loan? What is charged if an instalment is missed?",
          "The Key Fact Statement issued by the participating lender must answer all of these before you accept an offer.",
        ],
      },
    ],
  },
  {
    slug: "no-cibil-history",
    category: "Credit",
    title: "No CIBIL history? You still have a credit story",
    excerpt:
      "UPI activity, utility bills and business cash flow describe financial discipline that a bureau file misses.",
    read: "5 min read",
    intro:
      "A thin bureau file is not the same as a poor one. Many first-time borrowers in India have never taken formal credit, so there is nothing for a bureau to score.",
    sections: [
      {
        heading: "Why a bureau file can be empty",
        body: [
          "Credit bureaus record formal borrowing. If you have never held a loan or a credit card, there is no repayment record to summarise, so a score may not be generated at all.",
          "Lenders read that as missing information rather than as evidence of risk, which is why additional evidence matters.",
        ],
      },
      {
        heading: "Evidence that describes repayment discipline",
        body: [
          "Consistent bank inflows, regular UPI settlements in a shop, timely rent and utility payments, GST filings and stable business vintage all describe financial behaviour over time.",
          "These categories are only used with your explicit consent, and consent can be withdrawn.",
        ],
      },
      {
        heading: "Where the SNV Trust Score fits",
        body: [
          "The SNV Trust Score summarises consented signals on a 0 to 100 scale. It is not a CIBIL score and it does not replace one.",
          "It does not approve or reject an application. The final credit decision always rests with the participating lender.",
        ],
      },
    ],
  },
  {
    slug: "agent-commissions-and-payouts",
    category: "For agents",
    title: "How commissions and payouts work on ShriNeo",
    excerpt:
      "Per-product commission, disclosed before you submit a case and paid against a visible schedule after disbursal.",
    read: "4 min read",
    intro:
      "Agent earnings on ShriNeo are disclosed up front and tied to a specific case, so there is no ambiguity about what is owed or when.",
    sections: [
      {
        heading: "Commission is disclosed before submission",
        body: [
          "Each product carries a stated commission structure. You see it before you submit a case, not after.",
          "The borrower never pays an agent fee. Agent compensation comes from the participating lender arrangement.",
        ],
      },
      {
        heading: "Eligibility follows lender-confirmed disbursal",
        body: [
          "Commission becomes eligible after lender-confirmed disbursal. Submission, approval or sanction alone does not create an entitlement.",
          "Every payout is traceable to a case reference in the ledger.",
        ],
      },
      {
        heading: "Recovery is case-linked and appealable",
        body: [
          "A recovery adjustment can only be raised against a matching lender fee reversal, proven misrepresentation, or a documented policy breach.",
          "A borrower missing a payment does not, on its own, create a recovery. Every recovery carries a case reference, a reason, a cap at the commission paid on that case, a notice date with a response window, and an appeal route.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}
