import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Building2, ShieldCheck, Users } from "lucide-react";
import { org, configured } from "@/config/org";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, Eyebrow } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ShriNeo Capital — mission, model and legal entity" },
      {
        name: "description",
        content:
          "ShriNeo Capital is the customer-facing brand of SHRINEO VITTIYAM PRIVATE LIMITED, operating as a Lending Service Provider connecting borrowers with participating banks and NBFCs.",
      },
      { property: "og:title", content: "About ShriNeo Capital" },
      {
        property: "og:description",
        content: "Who we are, what we do, and — just as importantly — what we do not do.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicShell>
      <Section labelledBy="about-title">
        <div className="max-w-3xl">
          <Eyebrow>About us</Eyebrow>
          <h1
            id="about-title"
            className="editorial text-[clamp(2rem,5vw,3rem)] tracking-tight text-balance"
          >
            Credit should be understandable before it is signed
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            ShriNeo Capital exists to make borrowing legible for people who have been served badly
            by fine print. We present every offer in plain language and in your language, so the
            decision is genuinely yours.
          </p>
        </div>
      </Section>

      <Section tone="surface" labelledBy="model-title">
        <SectionHeading
          id="model-title"
          title="What we do, and what we do not do"
          body="Being precise about our role is the foundation of trust in lending."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <ShieldCheck aria-hidden className="size-5 text-success" />
            <h3 className="mt-3 text-base font-semibold">What we do</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Collect your requirement, identity and income details with your consent.</li>
              <li>Match you with participating banks and NBFCs and present their offers.</li>
              <li>Explain rate, APR, fees, EMI and total repayment before you commit.</li>
              <li>Track your application status and handle grievances with a reference number.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <Banknote aria-hidden className="size-5 text-warning" />
            <h3 className="mt-3 text-base font-semibold">What we do not do</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>We are not a bank or an NBFC and we do not lend our own funds.</li>
              <li>We never hold your loan funds; disbursal is lender to borrower.</li>
              <li>We do not decide approvals, limits or interest rates.</li>
              <li>We do not sell placement — no lender can pay to rank higher.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="entity-title">
        <SectionHeading
          id="entity-title"
          title="Brand and legal entity"
          body="ShriNeo Capital is the customer-facing product name. The regulated, contracting entity is the private limited company below."
        />
        <dl className="mt-8 grid gap-5 md:grid-cols-2">
          <Fact icon={Users} term="Customer-facing brand" detail={org.brandName} />
          <Fact icon={Building2} term="Registered legal entity" detail={org.legalEntity} />
          <Fact icon={ShieldCheck} term="Operating role" detail={org.role} />
          <Fact icon={Building2} term="CIN" detail={configured(org.cin)} />
          <Fact
            icon={Building2}
            term="Registered office"
            detail={configured(org.registeredAddress)}
          />
          <Fact icon={ShieldCheck} term="Regulatory posture" detail={org.regulatoryNote} />
        </dl>
      </Section>

      <Section tone="ink" labelledBy="values-title">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 id="values-title" className="editorial text-[clamp(1.5rem,3vw,2.25rem)]">
              Read exactly how we handle consent, data and complaints
            </h2>
            <p className="mt-3 text-base text-ink-foreground/80">
              Our Trust Center sets out our disclosures, data practices and grievance process in one
              place.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="min-h-11">
            <Link to="/trust-center">Visit the Trust Center</Link>
          </Button>
        </div>
      </Section>
    </PublicShell>
  );
}

function Fact({ icon: Icon, term, detail }: { icon: typeof Users; term: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border p-5">
      <dt className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon aria-hidden className="size-4" />
        {term}
      </dt>
      <dd className="mt-1.5 text-base font-medium">{detail}</dd>
    </div>
  );
}
