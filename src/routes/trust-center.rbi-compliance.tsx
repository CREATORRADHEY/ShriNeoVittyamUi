import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, FileText, Gavel, Landmark, ShieldQuestion, Timer } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, StatusPill } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { PageHero, FigureCard, DisclosureBlock, RelatedGuides } from "@/components/sections/blocks";
import { org, configured, PENDING_LABEL } from "@/config/org";

export const Route = createFileRoute("/trust-center/rbi-compliance")({
  head: () => ({
    meta: [
      { title: "RBI compliance and our LSP role | ShriNeo Capital" },
      {
        name: "description",
        content:
          "ShriNeo Capital is a Lending Service Provider, not a lender. How that shapes disbursal, the Key Fact Statement, consent, cooling-off and grievance redressal.",
      },
      { property: "og:title", content: "RBI compliance — ShriNeo Capital" },
      {
        property: "og:description",
        content: "The difference between an LSP and a lender, stated plainly.",
      },
      { property: "og:url", content: "/trust-center/rbi-compliance" },
    ],
    links: [{ rel: "canonical", href: "/trust-center/rbi-compliance" }],
  }),
  component: RbiCompliancePage,
});

const obligations = [
  {
    icon: FileText,
    title: "Key Fact Statement before signature",
    body: "The lender's KFS — APR, every fee, taxes, EMI schedule, foreclosure terms and the cooling-off period — is shown to you before you sign, in a language you can read.",
  },
  {
    icon: Banknote,
    title: "Direct disbursal and repayment",
    body: "Money moves between the lender and your own bank account. ShriNeo Capital never becomes a pass-through for borrower funds.",
  },
  {
    icon: ShieldQuestion,
    title: "Purpose-specific consent",
    body: "Each data use is consented separately and recorded. Consent for one lender is not consent for all lenders.",
  },
  {
    icon: Timer,
    title: "Cooling-off period",
    body: "Where the lender's terms provide a cooling-off window, you can exit within it by repaying principal and proportionate interest, without a prepayment penalty.",
  },
  {
    icon: Gavel,
    title: "Grievance redressal",
    body: "A named route with acknowledgement and resolution windows, and escalation to the lender and then to the regulator's ombudsman scheme where applicable.",
  },
];

function RbiCompliancePage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Trust Center"
        title="We are a Lending Service Provider. The lender is the lender."
        body="That distinction decides who assesses you, who prices your loan, whose money reaches your account and who is accountable for what. This page sets it out without regulatory theatre."
        actions={
          <>
            <Button asChild size="lg" className="min-h-11">
              <Link to="/key-fact-statement">What a KFS must contain</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11">
              <Link to="/grievance-redressal">Grievance route</Link>
            </Button>
          </>
        }
        aside={
          <FigureCard tone="card" caption="Two roles, kept separate at every stage.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-surface p-4">
                <Landmark aria-hidden className="size-5 text-primary" />
                <p className="mt-2 text-sm font-semibold">Participating lender</p>
                <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                  <li>Approves or declines</li>
                  <li>Sets rate and fees</li>
                  <li>Issues the KFS and agreement</li>
                  <li>Disburses and collects</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-surface p-4">
                <FileText aria-hidden className="size-5 text-primary" />
                <p className="mt-2 text-sm font-semibold">ShriNeo Capital (LSP)</p>
                <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                  <li>Sourcing and verification</li>
                  <li>Consent capture and records</li>
                  <li>Presents lender terms unchanged</li>
                  <li>Support and grievance intake</li>
                </ul>
              </div>
            </div>
          </FigureCard>
        }
      />

      <Section labelledBy="oblig-title" tone="surface">
        <SectionHeading
          id="oblig-title"
          title="What this means in your application"
          body="Operated in alignment with applicable RBI Digital Lending Directions."
        />
        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {obligations.map((item) => (
            <li key={item.title} className="border-t border-border pt-5">
              <item.icon aria-hidden className="size-5 text-primary" />
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="claims-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="claims-title"
              title="Claims we do not make"
              body="Language matters in regulated lending, so we avoid terms that would misstate our position."
            />
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "We do not describe ourselves as RBI approved or RBI registered.",
                "We are not an NBFC and hold no lending licence.",
                "We do not guarantee approval, a rate, or a disbursal timeline.",
                "We do not name a participating lender before one is confirmed and legally cleared.",
              ].map((item) => (
                <li key={item} className="flex gap-3 border-b border-border pb-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="min-w-0 text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-base font-semibold">Entity and registration details</h3>
                <StatusPill tone="warning">Pending internal completion</StatusPill>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Legal entity", org.legalEntity],
                  ["Role", org.role],
                  ["CIN", configured(org.cin)],
                  ["Registered office", configured(org.registeredAddress)],
                  ["Participating lender list", PENDING_LABEL],
                  ["Grievance Officer", configured(org.grievanceOfficer.name)],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-wrap justify-between gap-3 border-b border-border pb-2">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="num text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                Fields marked “{PENDING_LABEL}” are completed by the business from verified
                records. They are shown as pending rather than filled with placeholder values.
              </p>
            </div>
            <DisclosureBlock>
              This page explains our operating model. It is not legal advice and does not replace
              the loan agreement or the Key Fact Statement issued by the participating lender.
            </DisclosureBlock>
          </div>
        </div>
      </Section>

      <RelatedGuides
        title="Related trust pages"
        links={[
          {
            to: "/trust-center/privacy-and-data",
            label: "Privacy and data",
            body: "Consent moments, retention and your rights.",
          },
          {
            to: "/trust-center/security",
            label: "Security",
            body: "Encryption, document handling and account protection.",
          },
          {
            to: "/trust-center/snv-trust-score",
            label: "SNV Trust Score",
            body: "An advisory indicator, not a lending decision.",
          },
        ]}
      />
    </PublicShell>
  );
}
