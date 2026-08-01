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
  ProcessTimeline,
  RelatedGuides,
  type JourneyStep,
} from "@/components/sections/blocks";
import { AccountAggregatorArt, PrivacyControlArt } from "@/components/illustrations";

export const Route = createFileRoute("/account-aggregator")({
  head: () => ({
    meta: [
      { title: "Account Aggregator Explained — Sharing bank data with consent" },
      {
        name: "description",
        content:
          "How the Account Aggregator framework lets you share bank statements with a participating lender without sharing passwords: purpose, duration and revocation explained.",
      },
      { property: "og:title", content: "Account Aggregator Explained — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Five consent steps, no banking passwords, and a stated purpose and duration.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/account-aggregator" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/account-aggregator" }],
  }),
  component: AccountAggregatorPage,
});

const consentSteps: JourneyStep[] = [
  { title: "Choose your bank account", body: "Select the account whose statements are relevant to this application.", actor: "you" },
  { title: "Review the requested data", body: "You see exactly which data categories and period are being asked for.", actor: "you" },
  { title: "Approve purpose and duration", body: "The purpose and the access period are stated before you approve.", actor: "you" },
  { title: "Data is shared securely", body: "Your bank sends the data through the consent framework — not by email or upload.", actor: "shrineo" },
  { title: "Manage the consent", body: "Consent can be managed or withdrawn according to the provider's rules.", actor: "you" },
];

function AccountAggregatorPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Data and consent"
        title="Account Aggregator, explained"
        body="Instead of collecting PDF statements, a lender can read a consented, time-bound view of your bank data. You decide what is shared, for what purpose and for how long."
        actions={
          <Button asChild size="lg" variant="outline" className="min-h-11">
            <Link to="/trust-center">See all data commitments</Link>
          </Button>
        }
        aside={
          <FigureCard tone="card" caption="Bank accounts → consent layer → a limited view for the lending workflow.">
            <AccountAggregatorArt />
          </FigureCard>
        }
      />

      <Section labelledBy="steps-title">
        <SectionHeading
          id="steps-title"
          title="The five consent steps"
          body="Nothing is fetched before you approve, and the approval is specific."
        />
        <div className="mt-10">
          <ProcessTimeline steps={consentSteps} />
        </div>
      </Section>

      <Section tone="surface" labelledBy="rules-title">
        <SectionHeading id="rules-title" title="What ShriNeo will and will not do" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <ul className="space-y-3 rounded-xl border border-border bg-card p-6 text-sm">
            {[
              "We state the purpose of every data request in plain language.",
              "We state how long access lasts before you approve it.",
              "We record the consent with a timestamp you can review later.",
              "We use the data only for the purpose you approved.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <StatusPill tone="success">Will</StatusPill>
                <span className="min-w-0 text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-3 rounded-xl border border-border bg-card p-6 text-sm">
            {[
              "We never ask for your net-banking password or PIN.",
              "We never ask you to share a banking OTP with an agent.",
              "We do not fetch data after the approved period ends.",
              "We do not sell your financial data.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <StatusPill tone="error">Never</StatusPill>
                <span className="min-w-0 text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <MediaSplit
        eyebrow="Your record"
        title="See who accessed what, and why"
        mediaSide="left"
        body="Your account keeps a consent history and a data-access history, so a data request is never invisible after the fact."
        media={
          <FigureCard caption="Access log entries with purpose, timestamp and a control to withdraw.">
            <PrivacyControlArt />
          </FigureCard>
        }
        points={[
          "Every consent is listed with its purpose, scope and expiry.",
          "Every access is logged with the requesting party and the reason.",
          "Withdrawal is available wherever the provider's rules permit it.",
        ]}
      />

      <Section labelledBy="faq-title">
        <SectionHeading id="faq-title" title="Common questions" />
        <div className="mt-8">
          <FaqGroups
            groups={[
              {
                group: "Safety",
                items: [
                  {
                    q: "Does the aggregator see my data?",
                    a: "The framework is designed so the aggregator passes data between your bank and the recipient without reading it.",
                  },
                  {
                    q: "Can I use manual upload instead?",
                    a: "Yes. Statement upload remains available, though verification usually takes longer.",
                  },
                ],
              },
              {
                group: "Scope",
                items: [
                  {
                    q: "How much history is requested?",
                    a: "Only the period relevant to the product — typically six months for personal loans and twelve for business loans.",
                  },
                  {
                    q: "What happens after my application ends?",
                    a: "Access stops at the end of the approved period, and the consent record remains visible in your account.",
                  },
                ],
              },
            ]}
          />
        </div>
        <div className="mt-8 max-w-3xl">
          <DisclosureBlock>
            Data shared through the framework supports the participating lender's assessment. The
            lending decision remains with the lender.
          </DisclosureBlock>
        </div>
      </Section>

      <RelatedGuides
        links={[
          { to: "/key-fact-statement", label: "Key Fact Statement", body: "Every cost, disclosed before signing." },
          { to: "/trust-center", label: "Trust Center", body: "Roles, data handling and grievance routes." },
          { to: "/how-it-works", label: "How ShriNeo works", body: "Where consent sits in the journey." },
        ]}
      />

      <DarkCta
        title="Share less, prove more."
        body="Consented bank data can replace paperwork while keeping you in control of scope and duration."
        primary={{ to: "/auth/signup", label: "Start your application" }}
        secondary={{ to: "/trust-center", label: "Read our data commitments" }}
      />
    </PublicShell>
  );
}
