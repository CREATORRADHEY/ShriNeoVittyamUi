import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading } from "@/components/design-system/section";
import {
  DarkCta,
  FigureCard,
  MediaSplit,
  PageHero,
  ProcessTimeline,
  RelatedGuides,
  type JourneyStep,
} from "@/components/sections/blocks";
import {
  AgentAssistArt,
  DirectFundFlowArt,
  SecureKycArt,
  TrackingArt,
} from "@/components/illustrations";
import { BorrowerDashboardPreview } from "@/components/previews/previews";
import { EditorialHero, HeroPanel, StatementBand } from "@/components/sections/editorial";
import { JourneyFigure } from "@/components/illustrations/core";
import photoFamily from "@/assets/photo-family.jpg";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How ShriNeo Works — Every stage of a loan application" },
      {
        name: "description",
        content:
          "The full ShriNeo journey: sign up, KYC, consent, offer comparison, Key Fact Statement, e-sign, lender review, disbursal and repayment — direct and agent-assisted.",
      },
      { property: "og:title", content: "How ShriNeo Works" },
      {
        property: "og:description",
        content: "Every stage of a ShriNeo loan application, and who is responsible at each one.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/how-it-works" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: HowItWorksPage,
});

const directPath: JourneyStep[] = [
  { title: "Sign up", body: "Mobile number and OTP. No documents needed to start.", actor: "you" },
  { title: "Complete KYC", body: "DigiLocker, document upload or a guided capture.", actor: "you" },
  { title: "Choose a product", body: "Pick the loan type and the amount you need.", actor: "you" },
  {
    title: "Complete the application",
    body: "Income, employment or business details and existing obligations.",
    actor: "you",
  },
  {
    title: "Provide consent",
    body: "Bureau check, bank data and e-sign are each consented to separately.",
    actor: "you",
  },
  {
    title: "Compare offers",
    body: "Matching lenders return rate, APR, EMI, fees and total repayment.",
    actor: "shrineo",
  },
  {
    title: "Review the Key Fact Statement",
    body: "Every charge, the schedule, foreclosure terms and the cooling-off window.",
    actor: "you",
  },
  { title: "e-Sign", body: "You confirm with an OTP; the consent is timestamped.", actor: "you" },
  {
    title: "Lender review",
    body: "The lender may approve, ask for more information, or decline.",
    actor: "lender",
  },
  {
    title: "Track the outcome",
    body: "Every status change appears with a date and the next expected action.",
    actor: "shrineo",
  },
  {
    title: "Disbursal",
    body: "The lender credits the verified bank account directly.",
    actor: "lender",
  },
  {
    title: "Repayment",
    body: "EMIs are collected by the lender under the mandate you approved.",
    actor: "lender",
  },
];

const agentPath: JourneyStep[] = [
  { title: "Agent raises a request", body: "A verified agent requests permission to assist.", actor: "shrineo" },
  { title: "You approve by OTP", body: "Nothing happens until you confirm the request.", actor: "you" },
  {
    title: "Assisted completion",
    body: "The agent prepares the file with you; documents stay in ShriNeo's system.",
    actor: "shrineo",
  },
  { title: "You review and sign", body: "Offers and the Key Fact Statement are shown to you, not to the agent alone.", actor: "you" },
  { title: "Lender review", body: "Same review process as a direct application.", actor: "lender" },
  {
    title: "You can revoke access",
    body: "Agent access can be withdrawn at any time from your account.",
    actor: "you",
  },
];

function HowItWorksPage() {
  return (
    <PublicShell>
      <EditorialHero
        eyebrow="The full journey"
        title="How ShriNeo works"
        body="Twelve stages from sign-up to repayment. Steps you complete are separated from steps the participating lender controls, so it is always clear who is acting next."
        image={{
          src: photoFamily,
          alt: "A family working through their loan application together at home",
        }}
        note="Final approval and loan terms are determined by the participating lender."
        actions={
          <>
            <Button asChild size="lg" className="min-h-12 rounded-lg px-6 text-base">
              <Link to="/auth/signup">Start your application</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 rounded-lg border-border-strong px-6 text-base"
            >
              <Link to="/compare-offers">See how offers compare</Link>
            </Button>
          </>
        }
        panels={
          <HeroPanel label="Live status" meta="Example">
            <ol className="space-y-2 text-sm">
              {["Submitted", "Verified", "Under review", "Approved", "Disbursed"].map((stage, i) => (
                <li
                  key={stage}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"
                >
                  <span className="num grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="min-w-0 truncate">{stage}</span>
                </li>
              ))}
            </ol>
          </HeroPanel>
        }
      />

      <StatementBand
        id="arc-title"
        label="The arc"
        title="Uncertainty, understanding, then confidence."
        body="Each stage exists to remove one unknown \u2014 what you qualify for, what it costs, and what happens next."
      >
        <div className="rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 md:p-7">
          <JourneyFigure />
        </div>
      </StatementBand>

      <Section labelledBy="direct-title">
        <SectionHeading
          id="direct-title"
          title="Applying directly"
          body="The standard path when you complete the application yourself."
        />
        <div className="mt-10">
          <ProcessTimeline steps={directPath} />
        </div>
      </Section>

      <MediaSplit
        eyebrow="Identity"
        title="KYC without paperwork queues"
        body="Identity is verified through a digital locker, a document upload or a guided capture, depending on what you have available."
        mediaSide="left"
        media={
          <FigureCard caption="Document, digital locker, capture and liveness feed one verified profile.">
            <SecureKycArt />
          </FigureCard>
        }
        points={[
          "You are told which document is needed and why before uploading.",
          "Poor-quality captures are flagged immediately so you can retry.",
          "If KYC cannot be completed now, your progress is saved.",
        ]}
      />

      <Section tone="surface" labelledBy="agent-title">
        <SectionHeading
          id="agent-title"
          title="Applying with a verified agent"
          body="An agent can assist you, but only inside the boundaries you approve."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <ProcessTimeline steps={agentPath} />
          <FigureCard tone="card" caption="Consent-gated assistance: OTP first, then access.">
            <AgentAssistArt />
          </FigureCard>
        </div>
      </Section>

      <MediaSplit
        eyebrow="Fund flow"
        title="ShriNeo never holds your money"
        body="Disbursal and repayment happen directly between you and the participating lender. ShriNeo helps route and track the application."
        media={
          <FigureCard caption="Participating lender → your verified bank account.">
            <DirectFundFlowArt />
          </FigureCard>
        }
        points={[
          "Disbursal is credited to the account you verify during the application.",
          "Repayment is collected by the lender under the mandate you approve.",
          "ShriNeo will never ask for your banking password or a payment OTP.",
        ]}
      />

      <Section labelledBy="track-title">
        <SectionHeading
          id="track-title"
          title="What tracking looks like"
          body="A single view of the current stage, the last update and what is expected next."
        />
        <div className="mt-8 max-w-2xl">
          <BorrowerDashboardPreview />
        </div>
      </Section>

      <RelatedGuides
        links={[
          {
            to: "/compare-offers",
            label: "Compare loan offers",
            body: "What appears in an offer and how ranking is decided.",
          },
          {
            to: "/key-fact-statement",
            label: "Key Fact Statement",
            body: "The document that states every cost before you sign.",
          },
          {
            to: "/account-aggregator",
            label: "Account Aggregator",
            body: "How bank data is shared with consent, and never with a password.",
          },
        ]}
      />

      <DarkCta
        title="Ready to see your options?"
        body="Applying and comparing offers is free. You only commit once the terms are clear."
        primary={{ to: "/auth/signup", label: "Start your application" }}
        secondary={{ to: "/loans", label: "Browse loan products" }}
        note="Final approval and loan terms are determined by the participating lender."
      />
    </PublicShell>
  );
}
