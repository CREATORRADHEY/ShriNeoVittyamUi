import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Banknote,
  Cable,
  ClipboardCheck,
  Filter,
  Gauge,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, StatusPill } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, FigureCard, DisclosureBlock, DarkCta } from "@/components/sections/blocks";
import { org, configured } from "@/config/org";

export const Route = createFileRoute("/for-lenders")({
  head: () => ({
    meta: [
      { title: "For lenders — partner with ShriNeo Capital (LSP)" },
      {
        name: "description",
        content:
          "Consent-controlled borrower profiles, profile-match routing, advisory pre-screening and direct lender-to-borrower disbursal. Partnership information for bank and NBFC teams.",
      },
      { property: "og:title", content: "For lenders — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "How participating banks and NBFCs receive consent-controlled, structured applications from ShriNeo Capital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/for-lenders" },
    ],
    links: [{ rel: "canonical", href: "/for-lenders" }],
  }),
  component: ForLendersPage,
});

const capabilities = [
  {
    icon: Users,
    title: "Structured, consent-controlled profiles",
    body: "Each application arrives with explicit, purpose-specific borrower consent for bureau access, bank data and document sharing. Consent is timestamped and revocable.",
  },
  {
    icon: Filter,
    title: "Profile-match routing",
    body: "Applications are routed only to lenders whose configured product criteria the borrower profile actually matches, reducing volume that would be declined at first pass.",
  },
  {
    icon: Gauge,
    title: "SNV Trust Score (advisory)",
    body: "An advisory pre-screening indicator supplied alongside — never in place of — your own underwriting. It carries no approval authority.",
  },
  {
    icon: ClipboardCheck,
    title: "Manual review pathway",
    body: "Thin-file or insufficient-data applications are flagged for human review rather than being silently dropped.",
  },
  {
    icon: Cable,
    title: "Integration models",
    body: "Partner console for manual review, structured file exchange, or API integration for lenders with an existing origination stack.",
  },
  {
    icon: Banknote,
    title: "Direct fund flow",
    body: "Disbursal and repayment move directly between the lender and the borrower's own bank account. ShriNeo does not hold, pool or route funds.",
  },
];

const responsibilities = [
  {
    party: "ShriNeo Capital (LSP)",
    items: [
      "Sourcing, borrower identity and document collection",
      "Consent capture, storage and audit trail",
      "Presenting your terms to the borrower without alteration",
      "First-line support and grievance intake",
    ],
  },
  {
    party: "Participating lender",
    items: [
      "Credit assessment and the final lending decision",
      "Pricing, fees and the Key Fact Statement contents",
      "Loan agreement, disbursal and collections",
      "Regulatory obligations as the lender of record",
    ],
  },
];

function ForLendersPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Partnerships"
        title="An origination layer built around consent and matched intent."
        body="ShriNeo Capital operates as a Lending Service Provider for participating banks and NBFCs. We source, verify and structure borrower applications; you decide who to lend to, on what terms."
        actions={
          <>
            <Button asChild size="lg" className="min-h-11">
              <a href="#enquiry">Start a partnership enquiry</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11">
              <Link to="/trust-center/rbi-compliance">Read our compliance posture</Link>
            </Button>
          </>
        }
        aside={
          <FigureCard tone="card" caption="Roles are separated by design, not by convention.">
            <dl className="grid gap-4 sm:grid-cols-2">
              {responsibilities.map((column) => (
                <div key={column.party} className="min-w-0">
                  <dt className="text-sm font-semibold">{column.party}</dt>
                  <dd>
                    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                      {column.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </FigureCard>
        }
      />

      <Section labelledBy="cap-title" tone="surface">
        <SectionHeading
          id="cap-title"
          title="What a participating lender receives"
          body="Dense by intent: every item below describes an operational capability, not a marketing claim."
        />
        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((item) => (
            <li key={item.title} className="border-t border-border pt-5">
              <item.icon aria-hidden className="size-5 text-primary" />
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="quality-title">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="quality-title"
              title="Lead quality is a process, not a promise"
              body="We do not publish conversion or approval statistics. What we can describe is the process each application passes through before it reaches your queue."
            />
            <ol className="mt-8 space-y-5">
              {[
                "Identity and mobile verification at account creation.",
                "Document collection with format and legibility checks.",
                "Bank data via Account Aggregator where the borrower consents, instead of unverified PDFs.",
                "Profile matched against your configured product criteria.",
                "Advisory pre-screening indicator attached for triage only.",
                "Application released to you only after explicit borrower consent for that lender.",
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
            <FigureCard tone="surface" caption="Fund flow never passes through ShriNeo Capital.">
              <div className="space-y-3 text-sm">
                {[
                  { label: "Borrower account", meta: "Own bank account, verified" },
                  { label: "Participating lender", meta: "Disburses and collects directly" },
                  { label: "ShriNeo Capital", meta: "Sourcing, consent and servicing support only" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <span className="font-medium">{row.label}</span>
                    <span className="text-right text-xs text-muted-foreground">{row.meta}</span>
                  </div>
                ))}
              </div>
            </FigureCard>
            <DisclosureBlock>
              ShriNeo Capital is not a bank or an NBFC and does not lend its own funds. Nothing on
              this page constitutes an offer, and no active commercial relationship is implied by
              the material shown here.
            </DisclosureBlock>
          </div>
        </div>
      </Section>

      <Section labelledBy="compliance-title" tone="surface">
        <SectionHeading
          id="compliance-title"
          title="Compliance and operational tracking"
          body="Operated in alignment with applicable RBI Digital Lending Directions. Regulatory identifiers are completed from verified records, not asserted in code."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            {
              icon: ScrollText,
              title: "Key Fact Statement discipline",
              body: "Your KFS is presented to the borrower unchanged, before signature, with APR, fees, taxes and the cooling-off period visible.",
            },
            {
              icon: ShieldCheck,
              title: "Audit trail",
              body: "Consent events, document access, agent involvement and status transitions are logged and retrievable per application.",
            },
            {
              icon: ClipboardCheck,
              title: "Grievance interface",
              body: "First-line intake sits with us; lender-owned matters are escalated with the full application record attached.",
            },
            {
              icon: Cable,
              title: "Onboarding sequence",
              body: "Commercial discussion, compliance review, criteria configuration, sandbox validation, then controlled live volume.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <item.icon aria-hidden className="size-5 text-primary" />
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Entity: {org.legalEntity} · CIN: <span className="num">{configured(org.cin)}</span>
        </p>
      </Section>

      <Section labelledBy="enquiry-title" id="enquiry">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="enquiry-title"
              title="Partnership enquiry"
              body="For bank and NBFC business-development, digital-lending and compliance teams. We respond from a monitored institutional mailbox."
            />
            <p className="mt-6 text-sm text-muted-foreground">
              Prefer email? Write to{" "}
              <a className="font-medium text-primary underline" href="mailto:partnerships@shrineocapital.com">
                partnerships@shrineocapital.com
              </a>
              .
            </p>
          </div>
          <LenderEnquiryForm />
        </div>
      </Section>

      <DarkCta
        title="Review how we present your terms to a borrower."
        body="Every offer is shown with rate, APR, fees, EMI and total repayment, in the borrower's own language, before any agreement is signed."
        primary={{ to: "/compare-offers", label: "See the offer comparison" }}
        secondary={{ to: "/key-fact-statement", label: "Key Fact Statement" }}
        note="Illustrative structure only. Commercial terms shown to borrowers come from the lender."
      />
    </PublicShell>
  );
}

type FormState = "idle" | "submitting" | "error" | "recorded";

function LenderEnquiryForm() {
  const [state, setState] = useState<FormState>("idle");
  type Errors = { institution?: string; name?: string; email?: string; message?: string };
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!String(data.get("institution") ?? "").trim()) next.institution = "Enter your institution name.";
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter a contact name.";
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid work email address.";
    if (String(data.get("message") ?? "").trim().length < 20)
      next.message = "Add at least a sentence about what you are exploring.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setState("error");
      return;
    }
    setState("submitting");
    window.setTimeout(() => setState("recorded"), 700);
  }

  if (state === "recorded") {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <StatusPill tone="info">Prototype — not submitted</StatusPill>
        <h3 className="mt-4 text-lg font-semibold">Your details were captured locally only</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This environment has no connected backend, so nothing was sent and no one has received
          this enquiry. To reach the partnerships team now, email{" "}
          <a className="font-medium text-primary underline" href="mailto:partnerships@shrineocapital.com">
            partnerships@shrineocapital.com
          </a>
          .
        </p>
        <Button variant="outline" className="mt-5 min-h-11" onClick={() => setState("idle")}>
          Edit and try again
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="institution" label="Institution" error={errors.institution} />
        <Field id="name" label="Contact name" error={errors.name} />
        <Field id="email" label="Work email" type="email" error={errors.email} />
        <Field id="role" label="Role (optional)" />
      </div>
      <div className="mt-5">
        <Label htmlFor="message">What are you exploring?</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2"
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" size="lg" className="mt-6 min-h-11" disabled={state === "submitting"}>
        {state === "submitting" ? "Recording…" : "Send enquiry"}
      </Button>
      <p className="mt-4 text-xs text-muted-foreground">
        Prototype form. No production API is connected in this environment.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string | undefined;
}) {
  return (
    <div className="min-w-0">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 min-h-11"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
