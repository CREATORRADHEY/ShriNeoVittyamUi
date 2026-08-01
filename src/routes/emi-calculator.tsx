import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading } from "@/components/design-system/section";
import {
  DarkCta,
  DisclosureBlock,
  FaqGroups,
  FigureCard,
  MediaSplit,
  PageHero,
  RelatedGuides,
} from "@/components/sections/blocks";
import { LoanCostArt, RepaymentArt } from "@/components/illustrations";
import { EmiCalculator } from "@/components/loans/emi-calculator";

export const Route = createFileRoute("/emi-calculator")({
  head: () => ({
    meta: [
      { title: "EMI Calculator — Estimate your monthly instalment" },
      {
        name: "description",
        content:
          "Estimate the monthly EMI and total repayment for a loan amount, interest rate and tenure using the standard reducing-balance method. Illustrative example only.",
      },
      { property: "og:title", content: "EMI Calculator — ShriNeo Capital" },
      {
        property: "og:description",
        content: "See how amount, rate and tenure change your EMI and total repayment.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/emi-calculator" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/emi-calculator" }],
  }),
  component: EmiCalculatorPage,
});

function EmiCalculatorPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Tools"
        title="EMI calculator"
        body="Test how the loan amount, interest rate and tenure change your monthly instalment and the total you repay. Every figure here is an estimate."
        aside={
          <FigureCard tone="card" caption="Principal, interest, fee and taxes make up total repayment.">
            <LoanCostArt />
          </FigureCard>
        }
      />

      <Section labelledBy="calc-title">
        <SectionHeading
          id="calc-title"
          title="Estimate your instalment"
          body="Reducing-balance method, the same basis participating lenders use for EMI schedules."
        />
        <div className="mt-8">
          <EmiCalculator minAmount={10_000} maxAmount={50_00_000} defaultAmount={5_00_000} />
        </div>
        <div className="mt-8 max-w-3xl">
          <DisclosureBlock>
            Illustrative example. The rate you receive depends on the participating lender's
            assessment, and the binding figures appear in the Key Fact Statement before you sign.
          </DisclosureBlock>
        </div>
      </Section>

      <MediaSplit
        eyebrow="Reading the result"
        title="A lower EMI is not always a cheaper loan"
        mediaSide="left"
        body="Extending the tenure reduces the monthly instalment but increases the interest you pay in total. Compare both numbers before deciding."
        media={
          <FigureCard caption="Completed instalments, the upcoming due month and confirmation.">
            <RepaymentArt />
          </FigureCard>
        }
        points={[
          "Check the EMI against your existing monthly obligations, not only your income.",
          "Compare total repayment across tenures before choosing the longest one.",
          "Ask about foreclosure and prepayment terms if you expect to repay early.",
        ]}
      />

      <Section tone="surface" labelledBy="faq-title">
        <SectionHeading id="faq-title" title="About this calculator" />
        <div className="mt-8">
          <FaqGroups
            groups={[
              {
                group: "Method",
                items: [
                  {
                    q: "How is the EMI calculated?",
                    a: "Using the standard reducing-balance formula on the principal, the monthly rate and the number of instalments.",
                  },
                  {
                    q: "Are fees included?",
                    a: "No. The estimate covers principal and interest. Processing fees and taxes are shown separately in the Key Fact Statement.",
                  },
                ],
              },
              {
                group: "Next steps",
                items: [
                  {
                    q: "Will my actual rate match this?",
                    a: "Not necessarily. The rate is set by the participating lender based on its assessment of your profile.",
                  },
                  {
                    q: "Does using the calculator affect my credit score?",
                    a: "No. Nothing here is shared with a bureau or a lender. A bureau check happens only with your explicit consent inside an application.",
                  },
                ],
              },
            ]}
          />
        </div>
      </Section>

      <RelatedGuides
        links={[
          { to: "/compare-offers", label: "Compare loan offers", body: "Rate versus APR, and how ranking works." },
          { to: "/key-fact-statement", label: "Key Fact Statement", body: "The binding cost disclosure before signing." },
          { to: "/loans", label: "All loan products", body: "Indicative amounts and tenures by product." },
        ]}
      />

      <DarkCta
        title="Happy with the estimate?"
        body="See the offers you are actually eligible for, with the full cost of each."
        primary={{ to: "/auth/signup", label: "Start your application" }}
        secondary={{ to: "/compare-offers", label: "How comparison works" }}
        note="Estimated EMI. Final terms are determined by the participating lender."
      />
    </PublicShell>
  );
}
