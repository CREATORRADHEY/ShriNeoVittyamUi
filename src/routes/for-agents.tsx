import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, GraduationCap, IndianRupee, ShieldCheck, Users } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import {
  EditorialHero,
  HeroPanel,
  NumberedLedger,
  PhotoNarrative,
  StatementBand,
} from "@/components/sections/editorial";
import { DarkCta, FigureCard } from "@/components/sections/blocks";
import { AgentAssistFigure, ConsentFigure } from "@/components/illustrations/core";
import photoAgent from "@/assets/photo-agent.jpg";

export const Route = createFileRoute("/for-agents")({
  head: () => ({
    meta: [
      { title: "For agents — become a registered ShriNeo Capital agent" },
      {
        name: "description",
        content:
          "Registered agents get an official ID, access to participating banks and NBFCs, transparent commissions, and training with certification. Assistance always requires borrower OTP consent.",
      },
      { property: "og:title", content: "For agents — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Work with multiple lenders under one accountable, consent-first platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/for-agents" },
    ],
    links: [{ rel: "canonical", href: "/for-agents" }],
  }),
  component: ForAgentsPage,
});

const benefits = [
  {
    icon: BadgeCheck,
    title: "Official agent ID",
    body: "A verified profile and agent code that borrowers can check before accepting help.",
  },
  {
    icon: Users,
    title: "Multiple lenders, one workflow",
    body: "Submit once and reach every participating bank and NBFC matching your customer.",
  },
  {
    icon: IndianRupee,
    title: "Transparent commissions",
    body: "Payout rules are published in your dashboard. No informal side arrangements.",
  },
  {
    icon: GraduationCap,
    title: "Training and certificate",
    body: "Structured modules on products, fair practice and conduct, with a certificate on completion.",
  },
];

const steps = [
  {
    title: "Register and complete agent KYC",
    body: "Start with your mobile number, then verify your identity like any borrower would.",
  },
  {
    title: "Finish training and the conduct assessment",
    body: "Products, fair practice and the rules of assisted applications, with a certificate on completion.",
  },
  {
    title: "Receive your official agent ID",
    body: "Once verified you get an agent code that any borrower can check before accepting help.",
  },
  {
    title: "Assist only after OTP approval",
    body: "A borrower grants you time-bound, logged access. They can revoke it whenever they choose.",
  },
];

export function ForAgentsPage() {
  return (
    <PublicShell>
      <EditorialHero
        titleId="agents-title"
        eyebrow="For agents"
        title="Help people borrow well — with a verified identity behind you."
        body="If you already help people apply for loans offline, ShriNeo gives you formal recognition, a wider set of lenders, and rules that protect both you and your customer."
        image={{
          src: photoAgent,
          alt: "A verified ShriNeo field agent assisting a customer in natural daylight",
        }}
        note="Agents never see data for customers who have not granted access."
        actions={
          <>
            <Button asChild size="lg" className="min-h-12 rounded-lg px-6 text-base">
              <Link to="/auth/signup">Join as an agent</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 rounded-lg border-border-strong px-6 text-base"
            >
              <Link to="/contact">Talk to our team</Link>
            </Button>
          </>
        }
        panels={
          <HeroPanel label="What you get" meta="On verification">
            <ul className="space-y-2 text-sm">
              {benefits.map((benefit) => (
                <li
                  key={benefit.title}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
                >
                  <benefit.icon aria-hidden className="size-4 shrink-0 text-primary" />
                  <span className="min-w-0 truncate font-medium">{benefit.title}</span>
                </li>
              ))}
            </ul>
          </HeroPanel>
        }
      />

      {/* Dominant story: assistance is consent-gated */}
      <StatementBand
        id="consent-title"
        label="The rule that never bends"
        title="An agent works inside the borrower's permission, never around it."
        body="An agent can view or act on an application only after that borrower approves access with an OTP. Access is time-bound, logged, and can be revoked at any moment."
      >
        <div className="rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 md:p-7">
          <ConsentFigure />
        </div>
      </StatementBand>

      <Section labelledBy="assist-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="assist-title"
              title="What assisted application actually means"
              body="You prepare the file with the customer. The customer keeps every decision."
            />
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Documents stay inside ShriNeo's system, never on your device.",
                "Offers and the Key Fact Statement are shown to the borrower, not to you alone.",
                "Agents cannot accept an offer or sign documents on a borrower's behalf.",
                "Misconduct leads to suspension of the agent ID.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="min-w-0 text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <FigureCard
            tone="card"
            caption="Consent-gated assistance: OTP first, then time-bound access."
          >
            <AgentAssistFigure />
          </FigureCard>
        </div>
      </Section>

      <Section tone="surface" labelledBy="steps-title">
        <SectionHeading
          id="steps-title"
          title="How onboarding works"
          body="Verification and training come before you can assist a single customer."
        />
        <div className="mt-10 max-w-3xl">
          <NumberedLedger items={steps} />
        </div>
      </Section>

      <PhotoNarrative
        label="Why agents stay"
        title="Build a practice on transparency, not on commission chasing"
        body="Commission structures are published in your dashboard, and offers shown to your customer are always ranked by what is best for them. Your reputation compounds because the customer can see exactly what you did."
        image={{
          src: photoAgent,
          alt: "A ShriNeo agent explaining a loan offer to a customer",
        }}
        side="right"
        points={[
          "Published payout rules — no informal side arrangements.",
          "A dashboard of your assisted applications and their live status.",
          "Training and certification you can show to customers.",
        ]}
      />

      <DarkCta
        title="Get your verified agent ID"
        body="Register, complete training, and start assisting customers under rules that protect you both."
        primary={{ to: "/auth/signup", label: "Start agent registration" }}
        secondary={{ to: "/how-it-works", label: "See the full journey" }}
        note="Final approval and loan terms are determined by the participating lender."
      />
    </PublicShell>
  );
}
