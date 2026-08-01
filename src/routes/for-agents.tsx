import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BadgeCheck, GraduationCap, IndianRupee, ShieldCheck, Users } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, Eyebrow } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";

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
  "Register with your mobile number and complete agent KYC.",
  "Finish the training modules and pass the conduct assessment.",
  "Get verified and receive your official agent ID and code.",
  "Assist a borrower only after they approve your access with an OTP.",
];

export function ForAgentsPage() {
  return (
    <PublicShell>
      <Section labelledBy="agents-title">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>For agents</Eyebrow>
            <h1
              id="agents-title"
              className="editorial text-[clamp(2rem,5vw,3rem)] tracking-tight text-balance"
            >
              Help people borrow well — with a verified identity behind you.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              If you already help people apply for loans offline, ShriNeo gives you formal
              recognition, a wider set of lenders, and rules that protect both you and your
              customer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-11">
                <Link to="/auth/signup">Join as an agent</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-11">
                <Link to="/contact">Talk to our team</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <ShieldCheck aria-hidden className="size-5 text-primary" />
            <h2 className="mt-3 text-base font-semibold">Consent is non-negotiable</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              An agent can view or act on a borrower's application only after that borrower approves
              access with an OTP. Access is time-bound, logged, and can be revoked by the borrower
              at any time.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Agents never see data for customers who have not granted access.</li>
              <li>Agents cannot accept an offer or sign documents on a borrower's behalf.</li>
              <li>Misconduct leads to suspension of the agent ID.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="benefits-title">
        <SectionHeading id="benefits-title" title="What you get" />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="rounded-xl border border-border bg-card p-6">
              <benefit.icon aria-hidden className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="steps-title">
        <SectionHeading
          id="steps-title"
          title="How onboarding works"
          body="Verification and training come before you can assist a single customer."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step} className="rounded-xl border border-border p-6">
              <span className="num inline-grid size-8 place-items-center rounded-full bg-accent text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <p className="mt-4 text-sm">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink" labelledBy="agent-cta-title">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Award aria-hidden className="mb-4 size-6" />
            <h2 id="agent-cta-title" className="editorial text-[clamp(1.5rem,3vw,2.25rem)]">
              Build a practice on transparency, not on commission chasing
            </h2>
            <p className="mt-3 text-base text-ink-foreground/80">
              Commission structures are published, and offers are always ranked by what is best for
              the borrower.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="min-h-11">
            <Link to="/auth/signup">Start agent registration</Link>
          </Button>
        </div>
      </Section>
    </PublicShell>
  );
}
