import { createFileRoute, Link } from "@tanstack/react-router";
import { FileLock2, KeyRound, Lock, MonitorSmartphone, ScanEye, ServerCog } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { PageHero, FigureCard, DisclosureBlock, RelatedGuides } from "@/components/sections/blocks";
import { org, configured } from "@/config/org";

export const Route = createFileRoute("/trust-center/security")({
  head: () => ({
    meta: [
      { title: "Security — how your data and documents are protected | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Encryption in transit and at rest, consent-based data access, secure document handling, account protection and the fraud review route at ShriNeo Capital.",
      },
      { property: "og:title", content: "Security — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Practical, verifiable security practices — not badges.",
      },
      { property: "og:url", content: "/trust-center/security" },
    ],
    links: [{ rel: "canonical", href: "/trust-center/security" }],
  }),
  component: SecurityPage,
});

const controls = [
  {
    icon: Lock,
    title: "Encryption in transit and at rest",
    body: "Traffic between your device and our services is encrypted with TLS. Stored documents and personal data are encrypted at rest.",
  },
  {
    icon: FileLock2,
    title: "Document handling",
    body: "Uploads are stored in access-controlled storage, not in email or shared drives. Access by a person is limited to those handling your application and is logged.",
  },
  {
    icon: ServerCog,
    title: "India-region data architecture",
    body: "The platform is designed to keep borrower personal data within India-region infrastructure. Hosting details are confirmed by the business before publication.",
  },
  {
    icon: ScanEye,
    title: "Consent-based access",
    body: "Bureau checks, Account Aggregator bank data and document sharing with a lender each require a separate, timestamped consent that you can withdraw for future use.",
  },
  {
    icon: KeyRound,
    title: "Account protection",
    body: "Sign-in uses mobile OTP verification. An agent can never open your application without your OTP approval for that specific request.",
  },
  {
    icon: MonitorSmartphone,
    title: "Session safety",
    body: "Sessions expire after inactivity, you can sign out of the current device, and sensitive actions re-verify before they complete.",
  },
];

function SecurityPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Trust Center"
        title="Security you can check, not badges you have to believe."
        body="This page describes controls that are actually implemented in the product, and states plainly what we do not do with your device or your data."
        actions={
          <>
            <Button asChild size="lg" className="min-h-11">
              <Link to="/trust-center/privacy-and-data">See how data is used</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11">
              <Link to="/grievance-redressal">Report a security concern</Link>
            </Button>
          </>
        }
        aside={
          <FigureCard tone="card" caption="Permissions we never request from your device.">
            <ul className="space-y-3 text-sm">
              {["Contacts", "SMS messages", "Call logs", "General photo gallery access"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-3"
                  >
                    <span className="font-medium">{item}</span>
                    <span className="text-xs text-muted-foreground">Not accessed</span>
                  </li>
                ),
              )}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Documents reach us only when you deliberately choose a specific file, or capture one,
              for a specific upload.
            </p>
          </FigureCard>
        }
      />

      <Section labelledBy="controls-title" tone="surface">
        <SectionHeading
          id="controls-title"
          title="Controls currently in place"
          body="Each item below maps to behaviour you can observe while using the platform."
        />
        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {controls.map((item) => (
            <li key={item.title} className="border-t border-border pt-5">
              <item.icon aria-hidden className="size-5 text-primary" />
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="fraud-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="fraud-title"
              title="If something looks wrong"
              body="Suspicious activity is reviewed by a person, not closed automatically."
            />
            <ol className="mt-8 space-y-5">
              {[
                "Tell us what you saw — an unexpected OTP, an unfamiliar agent, a message asking for a fee.",
                "We freeze sensitive actions on the affected application while the review runs.",
                "A reviewer checks the access log, consent record and agent involvement.",
                "You receive the outcome in writing, with the record attached to your application.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4 border-b border-border pb-5 last:border-0">
                  <span className="num text-sm font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="min-w-0 text-sm text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-base font-semibold">Things ShriNeo Capital will never do</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {[
                  "Ask for an advance fee to release or guarantee a loan.",
                  "Ask you to share an OTP with an agent or with our support team.",
                  "Ask for your net-banking password or UPI PIN.",
                  "Collect your funds — disbursal and repayment are directly with the lender.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <DisclosureBlock>
              No platform can claim to be completely secure, and we do not make that claim. We
              publish the controls we operate and the route to reach a human when something looks
              wrong. Security contact: {configured(org.supportEmail)} · Grievance:{" "}
              grievance@shrineocapital.com
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
            body: "Collection, consent moments, retention and your rights.",
          },
          {
            to: "/account-aggregator",
            label: "Account Aggregator",
            body: "How consented bank data sharing works.",
          },
          {
            to: "/grievance-redressal",
            label: "Grievance redressal",
            body: "Escalate a complaint formally.",
          },
        ]}
      />
    </PublicShell>
  );
}
