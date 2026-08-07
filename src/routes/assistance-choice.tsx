import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading } from "@/components/design-system/section";
import { PageHero, MediaSplit, FigureCard } from "@/components/sections/blocks";
import { ShieldCheck, EyeOff, Coins, ArrowRight, UserCheck } from "lucide-react";
import { AgentAssistArt } from "@/components/illustrations";

export const Route = createFileRoute("/assistance-choice")({
  head: () => ({
    meta: [
      { title: "Borrower Assistance & Choice | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Choose how you apply: self-service or assisted by a verified agent. Learn about our strict data masking, fee-free service, and borrower-control safeguards.",
      },
      { property: "og:title", content: "Borrower Assistance & Choice — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Self-service or agent assisted: strict privacy masking, zero agent fees, and borrower control safeguards.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/assistance-choice" },
    ],
    links: [{ rel: "canonical", href: "/assistance-choice" }],
  }),
  component: AssistanceChoicePage,
});

function AssistanceChoicePage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Safeguards"
        title="Choose how you apply — you stay in control"
        body="Whether you choose self-service or get help from a verified local agent, our system enforces strict safety boundaries so you are always in charge."
      />

      <Section labelledBy="options-heading">
        <SectionHeading
          id="options-heading"
          title="Two paths, the same standards"
          body="You decide how you want to complete your application. Agents are here to help, not to take over."
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
              <UserCheck className="size-6" />
            </span>
            <h3 className="editorial mt-6 text-xl font-semibold">Self-service application</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Complete the digital application form on your own device. The process takes a few minutes, uses Account Aggregator bank verification, and displays loan offers from all matching lenders side-by-side.
            </p>
            <Button asChild className="mt-6 w-full sm:w-auto">
              <Link to="/auth/signup">Apply on your own</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
              <ShieldCheck className="size-6" />
            </span>
            <h3 className="editorial mt-6 text-xl font-semibold">Agent-assisted application</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If you prefer personal guidance, request assistance from a verified ShriNeo agent in your locality. They help translate, collect physical documents, and prepare your application within our secure app.
            </p>
            <Button asChild variant="outline" className="mt-6 w-full sm:w-auto">
              <Link to="/auth/signup">Find an agent near you</Link>
            </Button>
          </div>
        </div>
      </Section>

      <MediaSplit
        eyebrow="Privacy"
        title="Masked contact details"
        body="Communication between you and the agent is fully secure. Agents only view what is necessary to assist with your specific file."
        mediaSide="left"
        media={
          <FigureCard caption="Your personal phone number is never shared directly with agents.">
            <AgentAssistArt />
          </FigureCard>
        }
        points={[
          "All voice calls and message alerts are routed through our secure masked system.",
          "Agents never see your raw personal mobile number, Aadhaar number, or detailed PAN records.",
          "Access to your uploaded files is revoked automatically once the application is submitted or when you choose to cancel.",
        ]}
      />

      <Section tone="surface" labelledBy="control-heading">
        <SectionHeading
          id="control-heading"
          title="Borrower control safeguards"
          body="Verified agents assist with document preparation, but our digital safeguards ensure they cannot act on your behalf."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
              <EyeOff className="size-5" />
            </span>
            <h4 className="mt-4 font-semibold text-foreground">No access delegation</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Agents cannot select a lender offer, accept interest rates, or sign any loan agreement. Every authorization requires a secure OTP sent directly to your mobile phone.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
              <Coins className="size-5" />
            </span>
            <h4 className="mt-4 font-semibold text-foreground">Zero agent fees</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              ShriNeo Capital is free for borrowers. Agents are paid directly by the platform based on lender disbursals. You never pay any cash, fees, or commissions to an agent.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
              <ShieldCheck className="size-5" />
            </span>
            <h4 className="mt-4 font-semibold text-foreground">Revoke access anytime</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You can instantly revoke an agent's access to your application at any stage. Once revoked, the agent can no longer see your file status or upload documents for you.
            </p>
          </div>
        </div>
      </Section>
    </PublicShell>
  );
}
