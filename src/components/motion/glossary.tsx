import type { ReactNode } from "react";
import { InfoTip } from "@/components/motion/overlays";

/**
 * Shared glossary for the terms borrowers most often stumble over.
 *
 * A tooltip is a convenience, never the only place a fact lives: every
 * definition here is also stated in full on a route we link to.
 */
export const GLOSSARY = {
  apr: {
    term: "APR",
    definition:
      "Annual Percentage Rate — interest plus mandatory fees, expressed as a yearly rate. It shows the real cost of a loan better than the headline rate.",
  },
  processingFee: {
    term: "Processing fee",
    definition:
      "A one-time charge the lender applies for assessing and setting up the loan. It is disclosed in the Key Fact Statement before you sign.",
  },
  totalRepayment: {
    term: "Total repayment",
    definition:
      "Everything you pay back over the full tenure: principal, interest, fees and applicable taxes.",
  },
  kfs: {
    term: "Key Fact Statement",
    definition:
      "The lender's standard summary of your loan: APR, every fee, the EMI schedule, foreclosure terms and the cooling-off period. It is shown before you sign.",
  },
  coolingOff: {
    term: "Cooling-off period",
    definition:
      "A short window after signing in which you may exit the loan by repaying principal and proportionate interest, without a prepayment penalty.",
  },
  accountAggregator: {
    term: "Account Aggregator",
    definition:
      "An RBI-regulated way to share bank data with your consent. Access is read-only, purpose-specific and time-limited, and you can revoke it.",
  },
  cibil: {
    term: "CIBIL score",
    definition:
      "A credit bureau score based on your borrowing and repayment history. Having no score is not the same as having a poor one.",
  },
  trustScore: {
    term: "SNV Trust Score",
    definition:
      "An advisory pre-screening indicator we share with lenders. It is not a credit score and it does not approve or decline any loan.",
  },
  lsp: {
    term: "Lending Service Provider",
    definition:
      "An entity that sources and services applications on behalf of lenders. ShriNeo Capital is an LSP; it is not a bank or an NBFC and does not lend its own funds.",
  },
  estimatedAmount: {
    term: "Estimated amount",
    definition:
      "An indicative figure based on what you entered. The lender sets the final amount after assessing your application.",
  },
  dataRecency: {
    term: "Data recency",
    definition:
      "How current the information a lender is looking at is. Older income or banking data usually means more manual review.",
  },
} as const;

export type GlossaryKey = keyof typeof GLOSSARY;

/**
 * Inline glossary trigger. Hover or focus on desktop, tap on mobile (where it
 * opens as a small bottom sheet with an explicit close).
 */
export function Term({ id, children }: { id: GlossaryKey; children?: ReactNode }) {
  const entry = GLOSSARY[id];
  return (
    <InfoTip term={(children as string | undefined) ?? entry.term} label={`What is ${entry.term}?`}>
      {entry.definition}
    </InfoTip>
  );
}

/** Icon-only variant, for use beside a label that already reads well. */
export function TermHint({ id }: { id: GlossaryKey }) {
  const entry = GLOSSARY[id];
  return <InfoTip label={`What is ${entry.term}?`}>{entry.definition}</InfoTip>;
}
