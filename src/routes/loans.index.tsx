import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products } from "@/config/products";
import { formatINR } from "@/lib/format";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, StatusPill } from "@/components/design-system/section";
import { EmiCalculator } from "@/components/loans/emi-calculator";
import {
  EditorialHero,
  HeroPanel,
  SectionLabel,
  StatementBand,
} from "@/components/sections/editorial";
import { Reveal } from "@/components/sections/reveal";
import { RelatedGuides } from "@/components/sections/blocks";
import { CostBreakdownFigure } from "@/components/illustrations/core";
import photoBusiness from "@/assets/photo-business-owner.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/loans/")({
  head: () => ({
    meta: [
      { title: "Loan products — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Personal, business, home and mortgage loans through participating banks and NBFCs. Indicative ranges, eligibility and required documents explained in plain language.",
      },
      { property: "og:title", content: "Loan products — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Compare loan products and estimate your EMI before you apply.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/loans" },
    ],
    links: [{ rel: "canonical", href: "/loans" }],
  }),
  component: LoansIndex,
});

function LoansIndex() {
  const featured = products[0]!;
  const rest = products.slice(1);

  return (
    <PublicShell>
      <EditorialHero
        eyebrow="All loan products"
        title="One application. Every product we support."
        body="Personal, business, home and mortgage credit from participating banks and NBFCs — each with indicative ranges, plain-language eligibility and the documents you will be asked for."
        image={{
          src: photoBusiness,
          alt: "A small business owner reviewing funding options at her counter",
        }}
        note="Indicative figures are configured with participating lenders. Final terms are set by the lender that approves your application."
        actions={
          <>
            <Button asChild size="lg" className="min-h-12 rounded-lg px-6 text-base">
              <Link to="/auth/signup">
                Apply for a loan
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 rounded-lg border-border-strong px-6 text-base"
            >
              <Link to="/compare-offers">See how offers compare</Link>
            </Button>
          </>
        }
        panels={
          <HeroPanel label="Products live today" meta="Phase 1">
            <ul className="space-y-2">
              {products
                .filter((p) => !p.phase2)
                .map((p) => (
                  <li
                    key={p.slug}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
                  >
                    <p.icon aria-hidden className="size-4 shrink-0 text-primary" />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{p.name}</span>
                    <span className="num shrink-0 text-xs text-muted-foreground">
                      {formatINR(p.range.max, { compact: true })}
                    </span>
                  </li>
                ))}
            </ul>
          </HeroPanel>
        }
      />

      {/* Directed composition: one lead product, the rest as an editorial ledger */}
      <section
        aria-labelledby="lead-title"
        className="border-b border-border bg-surface py-14 md:py-20"
      >
        <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel>Most requested</SectionLabel>
            <h2
              id="lead-title"
              className="editorial mt-4 text-[clamp(1.75rem,3.4vw,2.5rem)] tracking-tight"
            >
              {featured.name}
            </h2>
            <p className="mt-4 max-w-[46ch] text-base text-muted-foreground">{featured.summary}</p>
            <dl className="num mt-7 grid max-w-md grid-cols-2 gap-x-8 gap-y-4 border-t border-border pt-6 text-sm">
              <div>
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="mt-1 text-base font-semibold">
                  {formatINR(featured.range.min, { compact: true })} –{" "}
                  {formatINR(featured.range.max, { compact: true })}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Tenure</dt>
                <dd className="mt-1 text-base font-semibold">
                  {featured.tenure.min}–{featured.tenure.max}{" "}
                  {featured.tenure.model === "years" ? "years" : "months"}
                </dd>
              </div>
            </dl>
            <Button asChild size="lg" className="mt-8 min-h-12 rounded-lg px-6 text-base">
              <Link to={featured.path}>
                View {featured.name}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={80} className="min-w-0">
            <ul className="divide-y divide-border border-y border-border">
              {rest.map((product) => (
                <li key={product.slug}>
                  <Link
                    to={product.path}
                    className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-4 py-6 transition-colors duration-150 hover:bg-card"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                      <product.icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold">{product.name}</span>
                        {product.phase2 ? (
                          <StatusPill tone="warning">Coming in Phase 2</StatusPill>
                        ) : null}
                      </span>
                      <span className="mt-1.5 block text-sm text-muted-foreground">
                        {product.summary}
                      </span>
                      <span className="num mt-2 block text-xs text-muted-foreground">
                        {formatINR(product.range.min, { compact: true })} –{" "}
                        {formatINR(product.range.max, { compact: true })} · {product.tenure.min}–
                        {product.tenure.max} {product.tenure.model === "years" ? "years" : "months"}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="mt-3 size-4 shrink-0 text-primary transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <StatementBand
        id="cost-title"
        label="Understand every rupee"
        title="Compare products on total cost, never on the headline rate."
        body="Whichever product you pick, the same four parts make up what you repay: principal, interest, one-time fees and applicable taxes. All of it is disclosed before you sign."
      >
        <div className="rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 md:p-7">
          <CostBreakdownFigure />
        </div>
      </StatementBand>

      <Section labelledBy="calc-title">
        <SectionHeading
          id="calc-title"
          title="Estimate an EMI"
          body="Change the amount, rate and tenure to understand how your monthly instalment and total cost move."
        />
        <div className="mt-8">
          <EmiCalculator minAmount={10000} maxAmount={5000000} defaultAmount={500000} />
        </div>
      </Section>

      <RelatedGuides
        links={[
          {
            to: "/how-it-works",
            label: "How ShriNeo works",
            body: "Every stage from application to disbursal.",
          },
          {
            to: "/compare-offers",
            label: "Compare loan offers",
            body: "Rate, APR, EMI and total repayment.",
          },
          {
            to: "/key-fact-statement",
            label: "Key Fact Statement",
            body: "The costs disclosed before you sign.",
          },
        ]}
      />
    </PublicShell>
  );
}
