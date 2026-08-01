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
import { CoolingOffArt, KfsArt } from "@/components/illustrations";
import { KfsPreview } from "@/components/previews/previews";

export const Route = createFileRoute("/key-fact-statement")({
  head: () => ({
    meta: [
      { title: "Key Fact Statement Explained — Every cost, before you sign" },
      {
        name: "description",
        content:
          "What a Key Fact Statement contains: lender, amount, interest rate, APR, fees, EMI, tenure, total repayment, cooling-off terms and grievance contact.",
      },
      { property: "og:title", content: "Key Fact Statement Explained — ShriNeo Capital" },
      {
        property: "og:description",
        content: "The single document that states the full cost of a loan before you sign it.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/key-fact-statement" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/key-fact-statement" }],
  }),
  component: KfsPage,
});

const fields = [
  ["Participating lender", "The bank or NBFC that sanctions and disburses the loan."],
  ["Loan amount", "The sanctioned principal, which may differ from the amount requested."],
  ["Interest rate", "The rate per annum and whether it is fixed or floating."],
  ["APR", "Interest and fees combined into one annualised cost figure."],
  ["Processing fee", "The one-time fee and any applicable taxes on it."],
  ["Monthly EMI", "The instalment amount and the due date."],
  ["Tenure", "The number of instalments and the schedule."],
  ["Total repayment", "Everything you will pay across the full tenure."],
  ["Cooling-off terms", "The window in which you may exit, and what remains payable."],
  ["Grievance contact", "Where to complain and how quickly you should expect a response."],
];

function KfsPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Before you sign"
        title="The Key Fact Statement"
        body="One standardised document, issued by the participating lender, that states every financial term of your loan in a comparable format. You see it before you e-sign — never after."
        actions={
          <Button asChild size="lg" variant="outline" className="min-h-11">
            <Link to="/compare-offers">How offers are compared</Link>
          </Button>
        }
        aside={
          <FigureCard tone="card" caption="A structured statement of terms, values and responsibilities.">
            <KfsArt />
          </FigureCard>
        }
      />

      <Section labelledBy="anatomy-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              id="anatomy-title"
              title="What it must contain"
              body="If a figure is missing from the Key Fact Statement, do not sign."
            />
            <dl className="mt-8 divide-y divide-border">
              {fields.map(([term, body]) => (
                <div key={term} className="py-3">
                  <dt className="text-sm font-semibold">{term}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:sticky lg:top-24">
            <KfsPreview />
          </div>
        </div>
      </Section>

      <MediaSplit
        eyebrow="Cooling-off"
        title="A window to change your mind"
        mediaSide="left"
        body="After signing, a cooling-off period lets you exit the loan within a stated deadline. The exact date and the amount that remains payable are shown in your loan details."
        media={
          <FigureCard caption="Signing, the cooling-off window, and the borrower-controlled exit inside it.">
            <CoolingOffArt />
          </FigureCard>
        }
        points={[
          "The deadline is shown as a date, not as vague wording.",
          "Interest for the days used and certain charges may remain payable.",
          "The cancellation action appears directly in your loan detail screen.",
        ]}
      />

      <Section tone="surface" labelledBy="faq-title">
        <SectionHeading id="faq-title" title="Questions about the statement" />
        <div className="mt-8">
          <FaqGroups
            groups={[
              {
                group: "Issuing",
                items: [
                  {
                    q: "Who issues the Key Fact Statement?",
                    a: "The participating lender. ShriNeo displays it to you unchanged and keeps a record of when it was delivered.",
                  },
                  {
                    q: "Can the terms change after I sign?",
                    a: "The signed terms are what bind you. Any change requires a fresh disclosure and your agreement.",
                  },
                ],
              },
              {
                group: "Using it",
                items: [
                  {
                    q: "Can I download and keep it?",
                    a: "Yes. It stays available in your documents area for the life of the loan.",
                  },
                  {
                    q: "What if I do not understand a charge?",
                    a: "Ask Neo for a plain-language explanation, or raise a query with the lender before signing.",
                  },
                ],
              },
            ]}
          />
        </div>
        <div className="mt-8 max-w-3xl">
          <DisclosureBlock>
            Values shown on this page are an illustrative example. Your own statement is issued by
            the participating lender and reflects the terms offered to you.
          </DisclosureBlock>
        </div>
      </Section>

      <RelatedGuides
        links={[
          { to: "/compare-offers", label: "Compare loan offers", body: "Rate versus APR and how to choose." },
          { to: "/emi-calculator", label: "EMI calculator", body: "Estimate instalments before you apply." },
          { to: "/account-aggregator", label: "Account Aggregator", body: "Consent-based bank data sharing." },
        ]}
      />

      <DarkCta
        title="Never sign a loan you cannot explain."
        body="Every ShriNeo application shows the Key Fact Statement before the e-sign step."
        primary={{ to: "/auth/signup", label: "Start your application" }}
        secondary={{ to: "/trust-center", label: "Visit the Trust Center" }}
        note="Final approval and loan terms are determined by the participating lender."
      />
    </PublicShell>
  );
}
