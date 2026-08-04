import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Banknote,
  FileText,
  Fingerprint,
  Landmark,
  Lock,
  MessageSquareWarning,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { org, configured } from "@/config/org";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, StatusPill } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { EditorialHero, HeroPanel, StatementBand } from "@/components/sections/editorial";
import { ConsentFigure } from "@/components/illustrations/core";
import photoProfessional from "@/assets/photo-professional.jpg";
import { RelatedGuides } from "@/components/sections/blocks";


export const Route = createFileRoute("/trust-center/")({
  head: () => ({
    meta: [
      { title: "Trust Center — disclosures, data and consent | ShriNeo Capital" },
      {
        name: "description",
        content:
          "How ShriNeo Capital handles consent, data, disclosures, lender relationships and complaints. Maintained by SHRINEO VITTIYAM PRIVATE LIMITED.",
      },
      { property: "og:title", content: "Trust Center — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Our disclosures, data practices, and grievance process in one place.",
      },
      { property: "og:url", content: "/trust-center" },
    ],
    links: [{ rel: "canonical", href: "/trust-center" }],
  }),
  component: TrustCenterPage,
});

const controls = [
  {
    icon: UserCheck,
    title: "Access and authentication",
    body: "Accounts are secured with mobile OTP verification. Agent access to a borrower's application requires that borrower's OTP approval, is time-bound, and is logged.",
  },
  {
    icon: Fingerprint,
    title: "Purpose-specific consent",
    body: "Credit bureau checks, bank data access and e-sign are requested as separate consents, each recorded with a timestamp and reviewable by you later.",
  },
  {
    icon: FileText,
    title: "Disclosure before signing",
    body: "A Key Fact Statement showing APR, all fees and taxes, the EMI schedule, foreclosure terms and the cooling-off period is presented before any agreement is signed.",
  },
  {
    icon: Banknote,
    title: "No pooling of funds",
    body: "Disbursal and repayment flow directly between you and the participating lender. ShriNeo Capital does not hold, route or pool borrower funds.",
  },
  {
    icon: Landmark,
    title: "Lender relationships",
    body: "Offers are ranked by total cost of borrowing. No participating lender can pay for placement, and no matching offer is hidden from you.",
  },
  {
    icon: Lock,
    title: "Data handling",
    body: "We collect the minimum information lenders require to assess your application, and we tell you at the point of collection why each item is needed.",
  },
];

function TrustCenterPage() {
  return (
    <PublicShell>
      <EditorialHero
        titleId="trust-title"
        eyebrow="Trust Center"
        title="The commitments behind every offer we show you."
        body="This page is maintained by SHRINEO VITTIYAM PRIVATE LIMITED to answer common security, privacy and conduct questions about ShriNeo Capital. It describes our own practices and the controls visible in the product — not an independent certification or audit result."
        image={{
          src: photoProfessional,
          alt: "A professional reviewing loan disclosures on a laptop in natural light",
        }}
        note="We do not claim any certification, audit outcome or regulatory approval that has not been formally granted."
        actions={
          <>
            <Button asChild size="lg" className="min-h-12 rounded-lg px-6 text-base">
              <Link to="/grievance-redressal">Raise a grievance</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 rounded-lg border-border-strong px-6 text-base"
            >
              <Link to="/privacy-policy">Read the privacy policy</Link>
            </Button>
          </>
        }
        panels={
          <HeroPanel label="Our position" meta="Disclosed">
            <div className="flex flex-wrap gap-2">
              <StatusPill tone="info">
                <ShieldCheck aria-hidden className="size-3.5" />
                {org.role}
              </StatusPill>
              <StatusPill tone="neutral">App-owner maintained</StatusPill>
            </div>
            <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
              {org.roleStatement}
            </p>
          </HeroPanel>
        }
      />

      <StatementBand
        id="consent-band"
        label="The core commitment"
        title="Consent is requested per purpose, recorded, and reversible."
        body="Bureau checks, bank data access and e-sign are never bundled into a single tick-box. Each is asked for separately, timestamped, and reviewable by you later."
      >
        <div className="rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 md:p-7">
          <ConsentFigure />
        </div>
      </StatementBand>

      <Section labelledBy="controls-title">
        <SectionHeading
          id="controls-title"
          title="Controls currently in place"
          body="Each item below describes behaviour you can observe in the product."
        />
        <ul className="mt-10 grid gap-x-16 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-y-0">
          {controls.map((control) => (
            <li
              key={control.title}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-4 py-6 md:border-b md:border-border"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                <control.icon aria-hidden className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-semibold">{control.title}</span>
                <span className="mt-1.5 block text-sm text-muted-foreground">{control.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="responsibility-title">
        <SectionHeading
          id="responsibility-title"
          title="Who is responsible for what"
          body="Lending involves three parties. Being explicit about the split avoids unpleasant surprises."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Split title="ShriNeo Capital">
            Presents products, collects your information with consent, shows comparable offers,
            tracks your application and handles grievances about our platform and conduct.
          </Split>
          <Split title="The participating lender">
            Assesses your application, sets the rate, fees and limit, issues the sanction, disburses
            funds, collects repayments and owns recovery and lender-side complaints.
          </Split>
          <Split title="You, the borrower">
            Provides accurate information, reviews the Key Fact Statement before signing, and keeps
            repayments on schedule or speaks to the lender early if difficulty is expected.
          </Split>
        </div>
      </Section>

      <Section tone="surface" labelledBy="entity-title">
        <SectionHeading id="entity-title" title="Entity and regulatory position" />
        <dl className="mt-8 grid gap-5 md:grid-cols-2">
          <Row term="Customer-facing brand" detail={org.brandName} />
          <Row term="Registered legal entity" detail={org.legalEntity} />
          <Row term="Role" detail={org.roleStatement} />
          <Row term="CIN" detail={configured(org.cin)} />
          <Row term="Registered office" detail={configured(org.registeredAddress)} />
          <Row term="Regulatory posture" detail={org.regulatoryNote} />
        </dl>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          We do not claim any certification, audit outcome or regulatory approval that has not been
          formally granted. Where a field reads “{configured(null)}”, the verified value has not yet
          been supplied for publication.
        </p>
      </Section>

      <Section labelledBy="grievance-cta">
        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-xl">
            <MessageSquareWarning aria-hidden className="mb-3 size-5 text-primary" />
            <h2 id="grievance-cta" className="text-xl font-semibold">
              Something went wrong? Raise it formally
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Complaints receive a reference number, an acknowledgement within 3 working days, and a
              defined escalation path.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="min-h-11">
              <Link to="/grievance-redressal">Grievance Redressal</Link>
            </Button>
            <Button asChild variant="outline" className="min-h-11">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </Button>
          </div>
        </div>
      </Section>

      <RelatedGuides
        title="Go deeper"
        links={[
          {
            to: "/trust-center/snv-trust-score",
            label: "SNV Trust Score",
            body: "What the advisory indicator is, and what it is not.",
          },
          {
            to: "/trust-center/security",
            label: "Security",
            body: "Encryption, document handling and account protection.",
          },
          {
            to: "/trust-center/rbi-compliance",
            label: "RBI compliance",
            body: "Our LSP role and the lender's responsibilities.",
          },
          {
            to: "/trust-center/privacy-and-data",
            label: "Privacy and data",
            body: "Collection, consent moments, retention and your rights.",
          },
        ]}
      />
    </PublicShell>

  );
}

function Split({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border p-6">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function Row({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <dt className="text-sm text-muted-foreground">{term}</dt>
      <dd className="mt-1.5 text-base font-medium">{detail}</dd>
    </div>
  );
}
