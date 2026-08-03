import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/sections/home-hero";
import { UspStrip } from "@/components/sections/usp-strip";
import { EligibilityWidget } from "@/components/sections/eligibility-widget";
import { NeoConversationSection } from "@/components/sections/neo-conversation";
import { SnvTrustScoreSection } from "@/components/sections/snv-trust-score";
import { AgentCtaSection } from "@/components/sections/agent-cta";
import { products } from "@/config/products";
import { formatINR } from "@/lib/format";
import { PublicShell } from "@/components/layout/public-shell";
import { StatusPill } from "@/components/design-system/section";
import { Reveal } from "@/components/sections/reveal";
import { FaqGroups } from "@/components/sections/blocks";
import {
  ApplicationTrackingPanel,
  OfferComparisonPanel,
} from "@/components/previews/product-previews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShriNeo Capital — Bharat Ka Digital Lending Partner" },
      {
        name: "description",
        content:
          "Compare eligible loan offers from participating banks and NBFCs in English or Hindi. Clear costs, purpose-specific consent and a Key Fact Statement before you sign.",
      },
      { property: "og:title", content: "ShriNeo Capital — Bharat Ka Digital Lending Partner" },
      {
        property: "og:description",
        content:
          "A vernacular-first digital lending platform for Bharat. Compare offers, understand the total cost and stay in control.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});


/* --------------------------------------------------------------- section shell */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="label-micro text-primary">{children}</p>;
}

/* ------------------------------------------------------------------- the page */

function HomePage() {
  const featured = products[0]!;
  const supporting = products.slice(1);

  return (
    <PublicShell>
      {/* ─────────────────────── 1. HERO — full-bleed navy, one static story */}
      <HomeHero />




      {/* ─────────────────────────────────── 2. USP STRIP — platform promise */}
      <UspStrip />

      {/* ───────────────────────── 2b. ELIGIBILITY — prototype entry point */}
      <EligibilityWidget />

      {/* ─────────────────────────────── 3. PRODUCTS — directed composition */}
      <section aria-labelledby="products-title" className="border-b border-border bg-surface">
        <div className="container-page py-16 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionLabel>Loan products</SectionLabel>
            <h2
              id="products-title"
              className="editorial mt-4 text-[clamp(1.9rem,3.6vw,2.75rem)] tracking-tight"
            >
              One process. Five ways forward.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Amounts are indicative ranges configured with participating lenders and confirmed at
              offer stage.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
            {/* featured */}
            <Reveal className="min-w-0">
              <Link
                to={featured.path}
                className="group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-7 transition-colors duration-200 hover:border-primary md:p-9"
              >
                <div>
                  <p className="label-micro text-muted-foreground">Most applied for</p>
                  <h3 className="editorial mt-4 text-2xl tracking-tight md:text-3xl">
                    {featured.name}
                  </h3>
                  <p className="mt-3 max-w-md text-base text-muted-foreground">
                    {featured.summary}
                  </p>
                </div>
                <div className="mt-10">
                  <div aria-hidden className="flex items-end gap-1.5">
                    {[18, 26, 34, 46, 58, 72, 88].map((h, i) => (
                      <span
                        key={h}
                        className="w-6 rounded-t-[3px] border border-b-0 border-brand-200 bg-brand-50 transition-colors duration-200 group-hover:bg-brand-100"
                        style={{ height: `${h}px`, opacity: 0.5 + i * 0.07 }}
                      />
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-t border-border pt-5">
                    <p className="num text-sm font-medium">
                      {formatINR(featured.range.min, { compact: true })} –{" "}
                      {formatINR(featured.range.max, { compact: true })}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Explore {featured.name}
                      <ArrowRight aria-hidden className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* supporting */}
            <ul className="grid gap-4 sm:grid-cols-2">
              {supporting.map((product, i) => (
                <Reveal as="li" key={product.slug} delay={60 + i * 40} className="min-w-0">
                  <Link
                    to={product.path}
                    className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-200 hover:border-primary"
                  >
                    <product.icon
                      aria-hidden
                      className="size-5 shrink-0 stroke-[1.3] text-primary"
                    />
                    <h3 className="mt-4 flex flex-wrap items-center gap-2 text-base font-semibold">
                      {product.name}
                      {product.phase2 ? (
                        <StatusPill tone="warning">Coming in Phase 2</StatusPill>
                      ) : null}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{product.summary}</p>
                    <p className="num mt-auto pt-4 text-xs font-medium text-foreground">
                      {formatINR(product.range.min, { compact: true })} –{" "}
                      {formatINR(product.range.max, { compact: true })}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── 4. NEO — assistant */}
      <NeoConversationSection />

      {/* ──────────────────────────────────── 5. OFFER COMPARISON — editorial */}
      <section aria-labelledby="compare-title" className="border-b border-border bg-surface">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 md:py-24">
          <Reveal>
            <SectionLabel>Comparison</SectionLabel>
            <h2
              id="compare-title"
              className="editorial mt-4 text-[clamp(1.9rem,3.6vw,2.75rem)] tracking-tight"
            >
              Compare before you choose.
            </h2>
            <p className="mt-5 max-w-[42ch] text-base text-muted-foreground">
              Review rates, fees, EMI, tenure, and total repayment side by side before sending your
              application.
            </p>
            <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
              {[
                "The lowest headline rate is not always the lowest total cost.",
                "APR combines interest and fees into one comparable figure.",
                "No lender pays for placement, and no matching offer is hidden.",
              ].map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-primary" />
                  <span className="min-w-0 text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/compare-offers"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4"
            >
              How comparison works
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={80} className="min-w-0">
            <OfferComparisonPanel />
          </Reveal>
        </div>
      </section>
      {/* ────────────────────── 6. SNV TRUST SCORE — beyond-bureau signals */}
      <SnvTrustScoreSection />

      {/* ─────────────────────────────────────── 7. FOR AGENTS — recruitment */}
      <AgentCtaSection />



      {/* ─────────────────────────────────── 11b. TRACKING + FAQ (white calm) */}
      <section aria-labelledby="faq-title" className="border-b border-border bg-background">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] md:py-24">
          <Reveal>
            <SectionLabel>Common questions</SectionLabel>
            <h2
              id="faq-title"
              className="editorial mt-4 text-[clamp(1.75rem,3.2vw,2.4rem)] tracking-tight"
            >
              Answers before you apply.
            </h2>
            <div className="mt-8">
              <ApplicationTrackingPanel />
            </div>
          </Reveal>
          <Reveal delay={80} className="min-w-0">
            <FaqGroups
              groups={[
                {
                  group: "Applying",
                  items: [
                    {
                      q: "Does ShriNeo lend money?",
                      a: "No. ShriNeo Capital is a Lending Service Provider. Participating banks and NBFCs assess, approve and disburse every loan.",
                    },
                    {
                      q: "What does an application cost?",
                      a: "Applying and comparing offers is free. Lender charges such as processing fees are disclosed in the Key Fact Statement before you sign.",
                    },
                  ],
                },
                {
                  group: "Offers and charges",
                  items: [
                    {
                      q: "How are offers ranked?",
                      a: "By total cost of borrowing by default. The ranking method is disclosed, no lender pays for placement and no matching offer is hidden.",
                    },
                    {
                      q: "Why is APR different from the interest rate?",
                      a: "APR includes interest plus fees, so it reflects the yearly cost of the loan and allows a fair comparison between offers.",
                    },
                  ],
                },
                {
                  group: "Security and consent",
                  items: [
                    {
                      q: "Who can see my documents?",
                      a: "Only you, the lenders you apply to, and a verified agent you have explicitly authorised by OTP. Every access is logged.",
                    },
                    {
                      q: "Can I withdraw consent?",
                      a: "Yes. Consents are purpose-specific and time-bound, and your consent history is visible in your account.",
                    },
                  ],
                },
                {
                  group: "Agents and support",
                  items: [
                    {
                      q: "Do I have to use an agent?",
                      a: "No. You can complete everything yourself. An agent can only assist after you approve the request with an OTP.",
                    },
                    {
                      q: "How do I raise a complaint?",
                      a: "Through the Grievance Redressal page. Every complaint receives a reference number, an acknowledgement and an escalation path.",
                    },
                  ],
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

    </PublicShell>
  );
}
