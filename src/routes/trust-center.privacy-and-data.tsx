import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, StatusPill } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { PageHero, DisclosureBlock, RelatedGuides } from "@/components/sections/blocks";
import { org, configured, PENDING_LABEL } from "@/config/org";

export const Route = createFileRoute("/trust-center/privacy-and-data")({
  head: () => ({
    meta: [
      { title: "Privacy and data, in plain language | ShriNeo Capital" },
      {
        name: "description",
        content:
          "What ShriNeo Capital collects, why each item is needed, who may receive it, when consent is requested, and the rights you can exercise over your data.",
      },
      { property: "og:title", content: "Privacy and data — ShriNeo Capital" },
      {
        property: "og:description",
        content: "A readable companion to the privacy policy, written for borrowers.",
      },
      { property: "og:url", content: "/trust-center/privacy-and-data" },
    ],
    links: [{ rel: "canonical", href: "/trust-center/privacy-and-data" }],
  }),
  component: PrivacyDataPage,
});

const collected = [
  {
    what: "Identity details",
    examples: "Name, date of birth, PAN, Aadhaar-based KYC result",
    why: "Lenders are required to identify a borrower before lending.",
  },
  {
    what: "Contact details",
    examples: "Mobile number, email, address",
    why: "To verify your account, send status updates and reach you about your application.",
  },
  {
    what: "Financial information",
    examples: "Income proof, bank statements or consented Account Aggregator data, existing EMIs",
    why: "To assess whether a loan is affordable and which lenders you match.",
  },
  {
    what: "Documents you upload",
    examples: "Income, address, business or property documents",
    why: "Shared with the specific lender you consent to apply with.",
  },
  {
    what: "Usage information",
    examples: "Device and log data, consent events, access history",
    why: "Security, fraud review and the audit trail you can inspect.",
  },
];

const consentMoments = [
  "Creating an account and verifying your mobile number.",
  "Allowing a credit bureau check.",
  "Sharing bank data through an Account Aggregator.",
  "Releasing your profile and documents to a specific participating lender.",
  "Allowing a verified agent to view or assist with your application.",
  "Signing the loan agreement electronically.",
];

function PrivacyDataPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Trust Center"
        title="Your data, described the way you would ask about it."
        body="This is the readable companion to our privacy policy: what we collect, why each item is needed, who may receive it, and what you can ask us to do about it."
        actions={
          <>
            <Button asChild size="lg" className="min-h-11">
              <Link to="/privacy-policy">Read the full privacy policy</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11">
              <Link to="/account-aggregator">How bank data sharing works</Link>
            </Button>
          </>
        }
      />

      <Section labelledBy="collect-title" tone="surface">
        <SectionHeading
          id="collect-title"
          title="What is collected, and why"
          body="Nothing on this list is collected speculatively. Each item supports a step you can see in your application."
        />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
            <caption className="sr-only">Categories of data collected and the reason for each</caption>
            <thead>
              <tr className="border-b border-border-strong">
                <th scope="col" className="py-3 pr-4 font-semibold">Category</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Examples</th>
                <th scope="col" className="py-3 font-semibold">Why it is needed</th>
              </tr>
            </thead>
            <tbody>
              {collected.map((row) => (
                <tr key={row.what} className="border-b border-border align-top">
                  <th scope="row" className="py-4 pr-4 font-medium">{row.what}</th>
                  <td className="py-4 pr-4 text-muted-foreground">{row.examples}</td>
                  <td className="py-4 text-muted-foreground">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section labelledBy="who-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="who-title" title="Who may receive your information" />
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "The participating lender you choose to apply with — only that lender, and only with your consent.",
                "KYC, credit bureau and Account Aggregator providers acting on your instruction.",
                "A verified agent you have approved, for the duration you approved.",
                "Service providers who host or secure the platform, bound by contract to our instructions.",
                "Authorities where the law requires disclosure.",
              ].map((item) => (
                <li key={item} className="flex gap-3 border-b border-border pb-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="min-w-0 text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              We do not sell your personal data, and we do not share it for third-party advertising.
            </p>
          </div>
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight">
              Consent moments
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Each of these is a separate, timestamped decision — never one blanket approval.
            </p>
            <ol className="mt-6 space-y-3">
              {consentMoments.map((item, i) => (
                <li key={item} className="flex gap-4 rounded-lg border border-border bg-surface p-4">
                  <span className="num text-sm font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 text-sm">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section labelledBy="rights-title" tone="surface">
        <SectionHeading
          id="rights-title"
          title="Retention, deletion and your rights"
          body="Where a period has not yet been finalised with our legal advisers, it is shown as pending rather than invented."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Access history",
              body: "You can see which lender, agent or system accessed your application and when.",
              status: null,
            },
            {
              title: "Retention period",
              body: "Records tied to a sanctioned loan are retained for the period the lender and applicable law require.",
              status: PENDING_LABEL,
            },
            {
              title: "Deletion",
              body: "You can request deletion of data not required for a live application or by law. We confirm what can and cannot be deleted, and why.",
              status: null,
            },
            {
              title: "Correction",
              body: "You can correct identity or contact details at any time before submission, and request correction afterwards.",
              status: null,
            },
            {
              title: "Withdrawing consent",
              body: "Consent can be withdrawn for future use. It does not undo a check a lender has already performed with your prior approval.",
              status: null,
            },
            {
              title: "Grievance contact",
              body: `Write to grievance@shrineocapital.com. ${org.grievanceOfficer.responseWindow}.`,
              status: null,
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold">{item.title}</h3>
                {item.status ? <StatusPill tone="warning">{item.status}</StatusPill> : null}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 max-w-3xl">
          <DisclosureBlock>
            This summary is written for clarity and does not replace the privacy policy. Values
            marked pending require legal validation before publication. Operated by{" "}
            {org.legalEntity} · Support: {configured(org.supportEmail)}
          </DisclosureBlock>
        </div>
      </Section>

      <RelatedGuides
        title="Related trust pages"
        links={[
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
            to: "/cookie-policy",
            label: "Cookie policy",
            body: "Cookies and similar technologies we use.",
          },
        ]}
      />
    </PublicShell>
  );
}
