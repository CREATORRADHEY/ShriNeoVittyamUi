import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Building2, Clock3, Layers, UserCheck } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, StatusPill } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { PageHero, FigureCard, DisclosureBlock, RelatedGuides } from "@/components/sections/blocks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/trust-center/snv-trust-score")({
  head: () => ({
    meta: [
      { title: "SNV Trust Score — what it is and is not | ShriNeo Capital" },
      {
        name: "description",
        content:
          "A plain-language explanation of the SNV Trust Score: an advisory pre-screening indicator that supports, and never replaces, the participating lender's credit decision.",
      },
      { property: "og:title", content: "SNV Trust Score — ShriNeo Capital" },
      {
        property: "og:description",
        content: "How the advisory pre-screening indicator works, and where its limits are.",
      },
      { property: "og:url", content: "/trust-center/snv-trust-score" },
    ],
    links: [{ rel: "canonical", href: "/trust-center/snv-trust-score" }],
  }),
  component: TrustScorePage,
});

const categories = [
  {
    title: "Identity consistency",
    body: "Whether the details you provide agree with each other and with the documents you upload.",
  },
  {
    title: "Income and banking patterns",
    body: "Broad regularity of credits and existing obligations, where you consent to share bank data.",
  },
  {
    title: "Repayment history, where it exists",
    body: "Bureau information if you have a credit file. Absence of a file is not treated as a negative.",
  },
  {
    title: "Application completeness",
    body: "Whether enough verified information exists for a lender to assess you at all.",
  },
  {
    title: "Data recency",
    body: "How current the shared information is. Older data supports weaker conclusions.",
  },
];

function TrustScorePage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Trust Center"
        title="SNV Trust Score, explained without the mystique."
        body="It is an advisory pre-screening indicator operating on a 0–100 scale that helps route your application to lenders whose criteria you plausibly match. It is not a credit score, and it cannot approve or decline a loan."
        actions={
          <Button asChild size="lg" className="min-h-11">
            <Link to="/trust-center">Back to Trust Center</Link>
          </Button>
        }
        aside={
          <FigureCard tone="card" caption="Two different instruments, deliberately shown differently.">
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="label-micro text-muted-foreground">Credit bureau score (e.g. CIBIL)</p>
                <p className="num mt-2 text-sm">A regulated numeric score issued by a bureau</p>
                <div aria-hidden className="mt-3 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-3/4 rounded-full bg-primary" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Built from reported borrowing history across lenders.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="label-micro text-muted-foreground">SNV Trust Score</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {["Sufficient information", "Recent data shared", "Profile matched"].map((row) => (
                    <li key={row} className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">{row}</span>
                      <StatusPill tone="neutral">Indicative</StatusPill>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  A readiness view, shown as signals rather than a single gauge.
                </p>
              </div>
            </div>
          </FigureCard>
        }
      />

      <Section labelledBy="what-title">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="what-title"
              title="What it is, and who it may help"
              body="Operating on a 0–100 scale, the score summarises how ready and complete your application is for assessment — not how creditworthy you are."
            />
            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: UserCheck,
                  title: "People with no credit file",
                  body: "If you have never borrowed formally, a bureau has little to say about you. Verified income and identity signals can still help a lender decide to look at your file.",
                },
                {
                  icon: Layers,
                  title: "People with a thin file",
                  body: "One old card or a single closed loan rarely tells a full story. Additional consented data can add context.",
                },
                {
                  icon: Building2,
                  title: "Small business owners",
                  body: "Business banking patterns often describe repayment capacity better than salaried-income assumptions.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 border-b border-border pb-4">
                  <item.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-base font-semibold">Broad data categories that contribute</h3>
              <dl className="mt-4 space-y-4">
                {categories.map((item) => (
                  <div key={item.title}>
                    <dt className="text-sm font-semibold">{item.title}</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">{item.body}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs text-muted-foreground">
                Specific weights, thresholds and model rules are not published, because publishing
                them would make the indicator easy to game and would not help you.
              </p>
            </div>
            <DisclosureBlock>
              The final lending decision, the interest rate and every fee belong to the
              participating lender. A favourable Trust Score is not an approval, and no result on
              this platform guarantees a loan.
            </DisclosureBlock>
          </div>
        </div>
      </Section>

      <Section labelledBy="limits-title" tone="surface">
        <SectionHeading
          id="limits-title"
          title="Where the score stops"
          body="Being explicit about limits is part of the product."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Clock3,
              title: "Recency matters",
              body: "A profile built on six-month-old statements supports a weaker conclusion than one built on current data. You may be asked to refresh consent.",
            },
            {
              icon: AlertTriangle,
              title: "Insufficient data means human review",
              body: "When there is not enough verified information, the application is routed for manual review rather than scored confidently.",
            },
            {
              icon: Building2,
              title: "The lender decides",
              body: "Lenders apply their own underwriting policy. They may decline an application that pre-screens well, and that is their right.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <item.icon aria-hidden className="size-5 text-primary" />
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <SectionHeading id="faq-title" title="Common questions" />
        <Accordion type="single" collapsible className="mt-6 max-w-3xl">
          {[
            {
              q: "Does the SNV Trust Score affect my CIBIL score?",
              a: "No. It is calculated on our side from information you have consented to share. A bureau enquiry, if a lender makes one, is separate and is always requested with your explicit consent.",
            },
            {
              q: "Can I see my score?",
              a: "You see the readiness signals that make up your profile and what is missing, so that you can act on it. We do not present it as a competing numeric score.",
            },
            {
              q: "Can a low score block me from applying?",
              a: "No. You can apply to any product you are eligible for. The indicator affects routing and triage, not your right to apply.",
            },
          ].map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <RelatedGuides
        title="Related trust pages"
        links={[
          {
            to: "/trust-center/privacy-and-data",
            label: "Privacy and data",
            body: "What is collected, why, and who may receive it.",
          },
          {
            to: "/trust-center/security",
            label: "Security",
            body: "How your documents and account are protected.",
          },
          {
            to: "/trust-center/rbi-compliance",
            label: "RBI compliance",
            body: "Our LSP role and the lender's responsibilities.",
          },
        ]}
      />
    </PublicShell>
  );
}
