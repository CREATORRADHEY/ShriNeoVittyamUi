import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { PageHero } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/design-system/section";
import { org, configured } from "@/config/org";

export const Route = createFileRoute("/digital-lending-disclosures")({
  head: () => ({
    meta: [
      { title: "Digital Lending Disclosures | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Regulatory disclosures for ShriNeo Capital: legal entity, Lending Service Provider role, lender relationships, data categories, grievance contacts and RBI escalation routes.",
      },
      { property: "og:title", content: "Digital Lending Disclosures — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Entity, role, lender relationships, data handling, grievance and escalation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/digital-lending-disclosures" },
    ],
    links: [{ rel: "canonical", href: "/digital-lending-disclosures" }],
  }),
  component: DisclosuresPage,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-border py-4 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-6">
      <dt className="text-sm font-semibold tracking-tight">{label}</dt>
      <dd className="text-base leading-relaxed text-muted-foreground">{value}</dd>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
          <span aria-hidden className="mt-2.5 size-1.5 flex-none rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function DisclosuresPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Regulatory"
        title="Digital Lending Disclosures"
        body="Published so that borrowers, participating lenders, partners and regulators can verify who ShriNeo Capital is, what it does, and what it does not do."
      />

      <Section labelledBy="entity-title">
        <SectionHeading id="entity-title" title="Entity and role" />
        <dl className="mt-8 max-w-3xl">
          <Row label="Registered legal entity" value={org.legalEntity} />
          <Row label="Customer-facing product name" value={org.brandName} />
          <Row label="Role" value={org.role} />
          <Row
            label="ShriNeo is not the lender"
            value="ShriNeo Capital does not lend its own funds, does not take deposits, and is not a bank or an NBFC. Credit is provided by the participating regulated lender that approves your application."
          />
          <Row label="CIN" value={configured(org.cin)} />
          <Row label="Registered address" value={configured(org.registeredAddress)} />
        </dl>
        <p className="mt-6 max-w-3xl rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
          Values shown as “{configured(null)}” are prototype placeholders. They are tracked as
          launch blockers and will be replaced with verified registration records before public
          launch.
        </p>
      </Section>

      <Section tone="surface" labelledBy="lender-title">
        <SectionHeading
          id="lender-title"
          title="Lender relationships and product ownership"
          body="Each loan product is owned, priced and approved by the participating lender."
        />
        <List
          items={[
            "The lender sets eligibility criteria, interest rate, fees and final terms.",
            "The lender issues the Key Fact Statement and the loan agreement.",
            "ShriNeo Capital sources, assists and presents matching offers; it does not approve or reject credit.",
            "Loan funds move directly between the regulated lender and your bank account. ShriNeo does not hold or control loan funds.",
            "Collections and recovery are carried out by the lender or by an agency the lender appoints, under the lender's policy.",
            "A current list of participating lenders is published once each integration is contractually live. Lender names shown in demonstration screens are illustrative.",
          ]}
        />
      </Section>

      <Section labelledBy="data-title">
        <SectionHeading
          id="data-title"
          title="Data collected and third parties"
          body="Collected only with your consent, and only for the purposes listed."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-base font-semibold tracking-tight">Data categories</h3>
            <List
              items={[
                "Identity and KYC data — name, PAN, Aadhaar-based verification result, address proof",
                "Contact data — mobile number and email address",
                "Financial data — income evidence, bank statements, GST or business filings where applicable",
                "Credit bureau data — retrieved only with explicit consent",
                "Device and usage data required for security and fraud prevention",
              ]}
            />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight">Third-party categories used</h3>
            <List
              items={[
                "Participating banks and NBFCs that receive your application",
                "Credit information companies for bureau checks",
                "KYC and identity verification providers",
                "Account Aggregator framework for consented bank data sharing",
                "Cloud hosting and communication providers operating in the India region",
              ]}
            />
            <Link
              to="/privacy-policy"
              className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Read the Privacy Policy
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="contact-title">
        <SectionHeading
          id="contact-title"
          title="Customer care, grievance and escalation"
          body="Complaints are acknowledged and tracked, and can be escalated beyond ShriNeo."
        />
        <dl className="mt-8 max-w-3xl">
          <Row
            label="Customer care email"
            value={
              configured(org.supportEmail) === configured(null)
                ? "support@shrineocapital.com"
                : configured(org.supportEmail)
            }
          />
          <Row label="Customer care phone" value={configured(org.supportPhone)} />
          <Row label="Grievance Officer" value={configured(org.grievanceOfficer.name)} />
          <Row
            label="Grievance Officer designation"
            value={configured(org.grievanceOfficer.designation)}
          />
          <Row label="Grievance email" value="grievance@shrineocapital.com" />
          <Row label="Response window" value={org.grievanceOfficer.responseWindow} />
        </dl>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/grievance-redressal"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Grievance redressal process
          </Link>
          <a
            href="https://cms.rbi.org.in"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            RBI Complaint Management System
          </a>
          <a
            href="https://sachet.rbi.org.in"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            RBI Sachet portal
          </a>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {org.regulatoryNote}. If a complaint is not resolved within 30 days, it can be escalated
          to the RBI Ombudsman through the RBI Complaint Management System.
        </p>
      </Section>
    </PublicShell>
  );
}
