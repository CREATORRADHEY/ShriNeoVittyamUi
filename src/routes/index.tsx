import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/sections/home-hero";
import { UspStrip } from "@/components/sections/usp-strip";
import { EligibilityWidget } from "@/components/sections/eligibility-widget";
import { NeoConversationSection } from "@/components/sections/neo-conversation";
import { SnvTrustScoreSection } from "@/components/sections/snv-trust-score";
import { AgentCtaSection } from "@/components/sections/agent-cta";
import { BlogTeaserSection } from "@/components/sections/blog-teaser";

import { products } from "@/config/products";
import { formatINR } from "@/lib/format";
import { PublicShell } from "@/components/layout/public-shell";

import { Reveal } from "@/components/sections/reveal";
import { HomeFaq } from "@/components/sections/home-faq";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { homeContent } from "@/content/home-content";
import { useI18n } from "@/i18n";
import { OfferComparisonPanel } from "@/components/previews/product-previews";


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
  const { language } = useI18n();
  const faqCopy = homeContent(language);
  const featured = products[0]!;
  const supporting = products.slice(1);

  return (
    <PublicShell>
      {/* ─────────────────────── 1. HERO — full-bleed navy, one static story */}
      <HomeHero />

      {/* ─────────────────────────────── 1b. USP STRIP — platform promise */}
      <UspStrip />

      {/* ──────────────────── 2. CHECK WHAT YOU QUALIFY FOR — eligibility */}
      <EligibilityWidget />

      {/* ─────────────────────────────── 3. PRODUCTS — directed composition */}
      <section
        aria-labelledby="products-title"
        className="bg-gradient-to-b from-brand-50 to-background"
      >
        <div className="container-page py-16 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionLabel>Loan products</SectionLabel>
            <h2
              id="products-title"
              className="editorial mt-4 text-[clamp(1.9rem,3.6vw,2.75rem)] tracking-tight"
            >
              One process, five ways forward
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Amounts are indicative ranges configured with participating lenders and confirmed at
              offer stage.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px rounded-xl border border-border bg-border lg:grid-cols-[1.15fr_1fr]">
            {/* featured */}
            <Reveal className="min-w-0">
              <Link
                to={featured.path}
                className="group relative z-0 flex h-full flex-col justify-between bg-card p-7 transition-[transform,box-shadow,background-color] duration-[260ms] ease-[cubic-bezier(0.2,0,0,1)] will-change-transform hover:z-10 hover:-translate-y-1.5 hover:bg-brand-50 hover:shadow-[0_22px_44px_-26px_rgba(0,43,152,0.45)] focus-visible:z-10 focus-visible:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-9"
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
            <ul className="grid gap-px bg-border sm:grid-cols-2">
              {supporting.map((product, i) => (
                <Reveal as="li" key={product.slug} delay={60 + i * 40} className="min-w-0">
                  <Link
                    to={product.path}
                    className="group relative z-0 flex h-full flex-col bg-card p-5 transition-[transform,box-shadow,background-color] duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)] will-change-transform hover:z-10 hover:-translate-y-1 hover:bg-brand-50 hover:shadow-[0_18px_36px_-24px_rgba(0,43,152,0.45)] focus-visible:z-10 focus-visible:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <product.icon
                      aria-hidden
                      className="size-5 shrink-0 stroke-[1.3] text-primary transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-110 motion-reduce:transition-none"
                    />

                    <h3 className="mt-4 text-base font-semibold">{product.name}</h3>

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

      {/* ───────────────────── 4. BEYOND CIBIL — SNV Trust Score, dark band */}
      <HowItWorksSection />

      <SnvTrustScoreSection />

      {/* ─────────────────────────────────────── 5. COMPARISON — editorial */}
      <section aria-labelledby="compare-title" className="bg-background">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 md:py-24">
          <Reveal>
            <SectionLabel>Comparison</SectionLabel>
            <h2
              id="compare-title"
              className="editorial mt-4 text-[clamp(1.9rem,3.6vw,2.75rem)] tracking-tight"
            >
              Compare before you choose
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
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Lender names shown are illustrative of the institutions ShriNeo is built to integrate with. All trademarks are the property of their respective owners. No partnership, endorsement or affiliation is implied.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── 6. NEO — assistant */}
      <NeoConversationSection />

      {/* ─────────────────────────────────────── 7. FOR AGENTS — recruitment */}
      <AgentCtaSection />

      {/* ────────────────────── 8. COMMON QUESTIONS — FAQ + tracking (calm) */}
      <section aria-labelledby="faq-title" className="bg-background">
        <div className="container-page py-16 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionLabel>{faqCopy.faqEyebrow}</SectionLabel>
            <h2
              id="faq-title"
              className="editorial mt-4 mb-8 text-[clamp(1.75rem,3.2vw,2.4rem)] tracking-tight"
            >
              {faqCopy.faqTitle}
            </h2>
          </Reveal>
          <Reveal delay={80} className="min-w-0">
            <HomeFaq />
          </Reveal>
        </div>
      </section>


      {/* ───────────────────────────── 9. BLOG — teasers, directly above footer */}
      <BlogTeaserSection />



    </PublicShell>
  );
}
