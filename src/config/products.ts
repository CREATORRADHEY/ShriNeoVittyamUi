import type { LucideIcon } from "lucide-react";
import { Building2, HandCoins, Home, Landmark, Wallet } from "lucide-react";

export type ProductSlug = "personal" | "business" | "home" | "mortgage" | "sachet";

export type TenureModel = "months" | "years";

export type LoanProduct = {
  slug: ProductSlug;
  name: string;
  path: string;
  icon: LucideIcon;
  summary: string;
  description: string;
  phase2?: boolean;
  /** Indicative, configurable range in rupees. */
  range: { min: number; max: number };
  tenure: { model: TenureModel; min: number; max: number; default: number };
  indicativeRate: { min: number; max: number };
  whyShriNeo: string[];
  eligibility: string[];
  documents: { label: string; why: string }[];
  faqs: { q: string; a: string }[];
};

export const products: LoanProduct[] = [
  {
    slug: "personal",
    name: "Personal Loan",
    path: "/loans/personal",
    icon: Wallet,
    summary: "Unsecured funding for planned personal needs.",
    description:
      "For education, medical costs, a wedding or consolidating existing borrowing. No security is required, so lenders assess income stability and repayment history closely.",
    range: { min: 10_000, max: 5_00_000 },
    tenure: { model: "months", min: 6, max: 60, default: 24 },
    indicativeRate: { min: 11, max: 24 },
    whyShriNeo: [
      "Compare offers from every matching participating lender side by side.",
      "Fees, APR and total repayment are shown before you sign anything.",
      "Assistance in English or Hindi, online or through a verified local agent.",
    ],
    eligibility: [
      "Indian resident, typically 21 to 58 years at application",
      "Salaried or self-employed with documented income",
      "Valid PAN and Aadhaar for KYC",
      "An active bank account in your own name",
    ],
    documents: [
      { label: "PAN card", why: "Required by lenders for credit bureau checks." },
      { label: "Aadhaar or other address proof", why: "Confirms your identity and address." },
      { label: "Last 6 months bank statement", why: "Shows income stability and existing EMIs." },
      { label: "Salary slips or income proof", why: "Used to assess repayment capacity." },
    ],
    faqs: [
      {
        q: "Does applying affect my credit score?",
        a: "Lenders run a bureau check with your consent, which may be recorded as an enquiry. We ask for that consent explicitly before any check.",
      },
      {
        q: "Who decides my interest rate?",
        a: "The participating lender does. ShriNeo displays the terms each lender offers you and does not change them.",
      },
    ],
  },
  {
    slug: "business",
    name: "Business Loan",
    path: "/loans/business",
    icon: Building2,
    summary: "Working capital and growth funding for small businesses.",
    description:
      "For inventory, equipment, receivable gaps or expansion. Lenders review business vintage, banking turnover and filings alongside your personal credit profile.",
    range: { min: 50_000, max: 50_00_000 },
    tenure: { model: "months", min: 6, max: 84, default: 36 },
    indicativeRate: { min: 13, max: 26 },
    whyShriNeo: [
      "One set of documents is shared with all matching lenders, with your consent.",
      "Bank statement analysis through Account Aggregator instead of manual PDFs.",
      "Clear view of processing fees and total cost before you commit.",
    ],
    eligibility: [
      "Business operating for at least 12 months, as required by the lender",
      "Business bank account with regular turnover",
      "GST registration where applicable",
      "Valid PAN for the proprietor, firm or company",
    ],
    documents: [
      { label: "Business PAN and registration proof", why: "Establishes the borrowing entity." },
      { label: "Last 12 months business bank statement", why: "Shows turnover and cash flow." },
      { label: "GST returns where applicable", why: "Corroborates declared revenue." },
      { label: "ITR for the last 1 to 2 years", why: "Used to assess profitability." },
    ],
    faqs: [
      {
        q: "Do I need to pledge collateral?",
        a: "Some lenders offer unsecured business loans; others require security. Each offer states this before you select it.",
      },
      {
        q: "How long does review take?",
        a: "It depends on the lender and on how quickly documents are verified. You can follow every stage in the application timeline.",
      },
    ],
  },
  {
    slug: "home",
    name: "Home Loan",
    path: "/loans/home",
    icon: Home,
    summary: "Long-tenure funding to buy, build or renovate a home.",
    description:
      "Secured against the property. Because tenures are long, small differences in rate and fees make a large difference to total repayment — so compare carefully.",
    range: { min: 3_00_000, max: 2_00_00_000 },
    tenure: { model: "years", min: 5, max: 30, default: 20 },
    indicativeRate: { min: 8.3, max: 12 },
    whyShriNeo: [
      "Compare long-tenure offers on total cost, not only on headline rate.",
      "Property and income documents are collected once and reused across lenders.",
      "Every stage from sanction to disbursal is tracked with timestamps.",
    ],
    eligibility: [
      "Indian resident with documented, stable income",
      "Property with clear, verifiable title",
      "Typically 21 to 60 years at application, subject to lender policy",
      "Own contribution (margin) as required by the lender",
    ],
    documents: [
      { label: "Identity and address proof", why: "Mandatory KYC for a secured facility." },
      { label: "Income proof or ITR", why: "Determines eligible loan amount and tenure." },
      { label: "Property documents", why: "The lender must verify title before sanction." },
      { label: "Bank statements", why: "Shows repayment capacity and existing obligations." },
    ],
    faqs: [
      {
        q: "Can I prepay a home loan?",
        a: "Prepayment and foreclosure terms differ by lender and rate type. The Key Fact Statement shown before signing states the applicable terms.",
      },
      {
        q: "Is the property valuation done by ShriNeo?",
        a: "No. The participating lender arranges legal and technical verification of the property.",
      },
    ],
  },
  {
    slug: "mortgage",
    name: "Mortgage Loan",
    path: "/loans/mortgage",
    icon: Landmark,
    summary: "Loan against residential or commercial property you already own.",
    description:
      "Also called Loan Against Property. Larger amounts at lower rates than unsecured borrowing, because your property is offered as security.",
    range: { min: 5_00_000, max: 5_00_00_000 },
    tenure: { model: "years", min: 3, max: 20, default: 12 },
    indicativeRate: { min: 9, max: 16 },
    whyShriNeo: [
      "Understand exactly what is being pledged and on what terms.",
      "Compare loan-to-value, rate and fees across participating lenders.",
      "Foreclosure and cooling-off terms are stated before you sign.",
    ],
    eligibility: [
      "Ownership of a residential or commercial property with clear title",
      "Documented income from salary or business",
      "Property free of disputes and existing charges, unless the lender permits",
      "Valid PAN and Aadhaar for KYC",
    ],
    documents: [
      { label: "Property title documents", why: "The property is the security for this loan." },
      { label: "Identity and address proof", why: "Mandatory KYC." },
      { label: "Income proof or ITR", why: "Determines eligible amount and tenure." },
      { label: "Existing loan statements", why: "Shows charges already on the property." },
    ],
    faqs: [
      {
        q: "What happens if I miss repayments?",
        a: "A secured loan places your property at risk. Lenders follow their published recovery policy, and we encourage speaking to the lender early if you expect difficulty.",
      },
      {
        q: "How much can I borrow against my property?",
        a: "Lenders apply their own loan-to-value limits after valuation. Offers you receive will state the amount each lender is willing to sanction.",
      },
    ],
  },
  {
    slug: "sachet",
    name: "Sachet Loan",
    path: "/loans/sachet",
    icon: HandCoins,
    summary: "Small-ticket credit for short-term needs.",
    description:
      "Small-ticket credit for short-term needs like immediate household bills, small emergencies, or business working capital.",
    range: { min: 1_000, max: 50_000 },
    tenure: { model: "months", min: 1, max: 12, default: 3 },
    indicativeRate: { min: 12, max: 24 },
    whyShriNeo: [
      "Compare micro-credit terms transparently before choosing.",
      "See the total cost, interest rate, and fees upfront.",
      "Quick secure verification via digital locker or Account Aggregator.",
    ],
    eligibility: [
      "Indian resident, typically 18 to 60 years at application",
      "Salaried or self-employed with regular income source",
      "Valid PAN and Aadhaar for instant e-KYC",
      "Active bank account with UPI or digital banking setup",
    ],
    documents: [
      { label: "PAN card", why: "Required for identity and credit bureau verification." },
      { label: "Aadhaar number", why: "Used for secure instant e-KYC consent." },
      {
        label: "Last 3 months bank statements",
        why: "To verify regular cash flow and determine loan eligibility.",
      },
    ],
    faqs: [
      {
        q: "How fast is a Sachet Loan disbursed?",
        a: "Once approved, participating lenders typically disburse micro-credit funds directly into your bank account within a few hours.",
      },
      {
        q: "Are there pre-closure fees?",
        a: "Most participating lenders do not charge foreclosure fees for small-ticket loans. Refer to the Key Fact Statement before signing.",
      },
    ],
  },
];

export function getProduct(slug: ProductSlug) {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
}
