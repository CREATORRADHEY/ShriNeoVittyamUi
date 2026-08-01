import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, StatusPill } from "@/components/design-system/section";
import {
  DarkCta,
  DisclosureBlock,
  FaqGroups,
  FigureCard,
  MediaSplit,
  PageHero,
  RelatedGuides,
} from "@/components/sections/blocks";
import { CompareOffersArt, LoanCostArt } from "@/components/illustrations";
import { OfferComparisonPreview } from "@/components/loans/offer-comparison-preview";
import { OfferHighlightPreview } from "@/components/previews/previews";

export const Route = createFileRoute("/compare-offers")({
  head: () => ({
    meta: [
      { title: "Compare Loan Offers — Rate, APR, EMI and total repayment" },
      {
        name: "description",
        content:
          "What a ShriNeo loan offer contains, how interest rate differs from APR, how offers are ranked, and how to choose between them. Demonstration comparison included.",
      },
      { property: "og:title", content: "Compare Loan Offers — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Rate versus APR, EMI, fees, tenure and total repayment explained side by side.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/compare-offers" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/compare-offers" }],
  }),
  component: CompareOffersPage,
});

const anatomy = [
  {
    term: "Participating lender",
    body: "The bank or NBFC that will assess, sanction and disburse the loan. ShriNeo does not lend.",
  },
  { term: "Loan amount", body: "The amount the lender is willing to sanction, which may differ from what you requested." },
  { term: "Interest rate", body: "The lender's charge on the outstanding principal, expressed per annum." },
  {
    term: "APR",
    body: "Interest plus fees expressed as one yearly figure. The fairest single number for comparing two offers.",
  },
  { term: "EMI", body: "The fixed monthly instalment across the tenure, on a reducing-balance basis." },
  { term: "Processing fee", body: "A one-time charge, usually deducted before disbursal, plus applicable taxes." },
  { term: "Tenure", body: "How long you repay. A longer tenure lowers the EMI and raises total interest." },
  { term: "Total repayment", body: "Principal plus all interest and charges over the full tenure." },
  { term: "Match reason", body: "Why this lender matched your profile — stated in plain language." },
];

function CompareOffersPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Offers"
        title="Compare before you choose"
        body="Two offers can share the same interest rate and still cost very differently. ShriNeo puts every matching lender on the same rows so the comparison is honest."
        actions={
          <>
            <Button asChild size="lg" className="min-h-11">
              <Link to="/auth/signup">See your eligible offers</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11">
              <Link to="/emi-calculator">Estimate an EMI</Link>
            </Button>
          </>
        }
        aside={
          <FigureCard tone="card" caption="Three offers aligned on identical cost rows.">
            <CompareOffersArt />
          </FigureCard>
        }
      />

      <Section labelledBy="demo-title">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading
            id="demo-title"
            title="A demonstration comparison"
            body="Wide table on desktop, stacked cards on smaller screens. The figures below are illustrative."
          />
          <StatusPill tone="neutral">Demonstration data</StatusPill>
        </div>

        <div className="mt-8 hidden lg:block">
          <OfferComparisonPreview />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:hidden">
          {[
            { lender: "Participating Bank A", rate: "11.5%", apr: "12.4%", emi: "₹9,885", fee: "₹3,540", total: "₹3,55,860", reason: "Lowest total repayment for this amount and tenure." },
            { lender: "Participating NBFC B", rate: "12.9%", apr: "14.1%", emi: "₹10,086", fee: "₹5,900", total: "₹3,63,096", reason: "Criteria most closely match the profile provided." },
            { lender: "Participating Bank C", rate: "11.9%", apr: "12.9%", emi: "₹7,583", fee: "₹4,130", total: "₹3,18,486", reason: "Longer tenure lowers the instalment but raises interest." },
          ].map((offer) => (
            <article key={offer.lender} className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold">{offer.lender}</h3>
              <dl className="mt-3 divide-y divide-border text-sm">
                {[
                  ["Interest rate p.a.", offer.rate],
                  ["APR", offer.apr],
                  ["Monthly EMI", offer.emi],
                  ["Processing fee", offer.fee],
                  ["Total repayment", offer.total],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-3 py-1.5">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="num font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">{offer.reason}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 max-w-3xl">
          <DisclosureBlock>
            Offers are displayed using a disclosed ranking method. Final terms are determined by the
            participating lender.
          </DisclosureBlock>
        </div>
      </Section>

      <Section tone="surface" labelledBy="anatomy-title">
        <SectionHeading
          id="anatomy-title"
          title="What appears in an offer"
          body="Nine fields, every one of them defined."
        />
        <dl className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {anatomy.map((item) => (
            <div key={item.term} className="border-t border-border pt-4">
              <dt className="text-sm font-semibold">{item.term}</dt>
              <dd className="mt-1.5 text-sm text-muted-foreground">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <MediaSplit
        eyebrow="Rate versus APR"
        title="The headline rate is not the price"
        body="A lower interest rate with a large processing fee can cost more than a slightly higher rate with no fee. APR folds both into one comparable number."
        mediaSide="left"
        media={
          <FigureCard caption="Total repayment split across principal, interest, fee and taxes.">
            <LoanCostArt />
          </FigureCard>
        }
        points={[
          "Compare APR first, then check the EMI fits your monthly budget.",
          "Check total repayment before extending the tenure to reduce the EMI.",
          "Read foreclosure and prepayment terms if you may repay early.",
        ]}
      />

      <Section labelledBy="choose-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              id="choose-title"
              title="How to select an offer"
              body="Selecting an offer opens the Key Fact Statement. You are not committed until you e-sign."
            />
            <ol className="mt-6 space-y-3 text-sm">
              {[
                "Shortlist by APR, not by headline rate.",
                "Check the EMI against your existing monthly obligations.",
                "Open the Key Fact Statement and read the charges section in full.",
                "Confirm the cooling-off window and how to exercise it.",
                "e-Sign only when every figure is clear to you.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="num text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <OfferHighlightPreview />
        </div>
      </Section>

      <Section tone="surface" labelledBy="faq-title">
        <SectionHeading id="faq-title" title="Questions about offers" />
        <div className="mt-8">
          <FaqGroups
            groups={[
              {
                group: "Ranking",
                items: [
                  {
                    q: "Can a lender pay to appear first?",
                    a: "No. The default ranking is total cost of borrowing, and the method is disclosed on the comparison screen.",
                  },
                  {
                    q: "Are any matching offers hidden?",
                    a: "No. Every offer returned by a matching participating lender is shown to you.",
                  },
                ],
              },
              {
                group: "Validity",
                items: [
                  {
                    q: "How long is an offer valid?",
                    a: "Each offer states its own validity. Once it lapses, the lender may re-quote on current terms.",
                  },
                  {
                    q: "What if no lender responds yet?",
                    a: "The comparison screen shows the waiting state explicitly rather than an empty list, and updates as responses arrive.",
                  },
                ],
              },
            ]}
          />
        </div>
      </Section>

      <RelatedGuides
        links={[
          { to: "/key-fact-statement", label: "Key Fact Statement", body: "What must be disclosed before you sign." },
          { to: "/emi-calculator", label: "EMI calculator", body: "Test amount, rate and tenure combinations." },
          { to: "/how-it-works", label: "How ShriNeo works", body: "The full journey, stage by stage." },
        ]}
      />

      <DarkCta
        title="Compare eligible offers, then decide."
        primary={{ to: "/auth/signup", label: "Start your application" }}
        secondary={{ to: "/loans", label: "Browse loan products" }}
        note="Final approval and loan terms are determined by the participating lender."
      />
    </PublicShell>
  );
}
