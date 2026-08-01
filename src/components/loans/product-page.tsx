import { Link } from "@tanstack/react-router";
import { Check, CircleAlert, FileText, Lock, ShieldCheck } from "lucide-react";
import type { LoanProduct } from "@/config/products";
import { formatINR } from "@/lib/format";
import { useI18n } from "@/i18n";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, Eyebrow, StatusPill } from "@/components/design-system/section";
import { EmiCalculator } from "./emi-calculator";
import { OfferComparisonPreview } from "./offer-comparison-preview";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductPage({ product }: { product: LoanProduct }) {
  const { t } = useI18n();
  const Icon = product.icon;
  const tenureMonths = {
    min: product.tenure.model === "years" ? product.tenure.min * 12 : product.tenure.min,
    max: product.tenure.model === "years" ? product.tenure.max * 12 : product.tenure.max,
    default:
      product.tenure.model === "years" ? product.tenure.default * 12 : product.tenure.default,
  };

  return (
    <PublicShell>
      {/* Product hero */}
      <Section labelledBy="product-title">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-lg bg-accent text-primary">
                <Icon aria-hidden className="size-5" />
              </span>
              {product.phase2 ? (
                <StatusPill tone="warning">
                  <CircleAlert aria-hidden className="size-3.5" />
                  {t("common.comingSoon")}
                </StatusPill>
              ) : (
                <StatusPill tone="info">
                  <ShieldCheck aria-hidden className="size-3.5" />
                  Lending Service Provider
                </StatusPill>
              )}
            </div>
            <h1
              id="product-title"
              className="editorial text-[clamp(2rem,5vw,3rem)] tracking-tight text-balance"
            >
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{product.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {product.phase2 ? (
                <Button size="lg" disabled className="min-h-11">
                  Applications open in Phase 2
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="min-h-11">
                    <Link to="/auth/signup">{t("common.applyNow")}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="min-h-11">
                    <Link to="/auth/signup">{t("common.checkEligibility")}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <dl className="rounded-xl border border-border bg-surface p-6">
            <dt className="text-sm font-medium text-muted-foreground">{t("common.indicative")}</dt>
            <dd className="num mt-2 text-2xl font-semibold">
              {formatINR(product.range.min)} – {formatINR(product.range.max)}
            </dd>
            <dt className="mt-6 text-sm font-medium text-muted-foreground">Tenure</dt>
            <dd className="num mt-2 text-lg">
              {product.tenure.min}–{product.tenure.max}{" "}
              {product.tenure.model === "years" ? "years" : "months"}
            </dd>
            {product.indicativeRate.max > 0 ? (
              <>
                <dt className="mt-6 text-sm font-medium text-muted-foreground">
                  Indicative interest rate
                </dt>
                <dd className="num mt-2 text-lg">
                  {product.indicativeRate.min}% – {product.indicativeRate.max}% p.a.
                </dd>
              </>
            ) : null}
            <dd className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
              Amounts, tenures and rates shown are indicative and configurable. Actual terms are set
              by each participating lender.
            </dd>
          </dl>
        </div>
      </Section>

      {/* Why choose ShriNeo */}
      <Section tone="surface" labelledBy="why-title">
        <SectionHeading id="why-title" title={`Why choose ShriNeo for a ${product.name}`} />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {product.whyShriNeo.map((item) => (
            <li key={item} className="rounded-lg border border-border bg-card p-5">
              <Check aria-hidden className="mb-3 size-5 text-success" />
              <p className="text-sm">{item}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Eligibility + documents */}
      <Section labelledBy="eligibility-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="eligibility-title"
              title="Eligibility"
              body="Participating lenders apply their own criteria. These are the checks most commonly requested."
            />
            <ul className="mt-6 space-y-3">
              {product.eligibility.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              title="Required documents"
              body="We explain why each document is needed. You choose what to share, and when."
            />
            <ul className="mt-6 space-y-4">
              {product.documents.map((doc) => (
                <li key={doc.label} className="rounded-lg border border-border p-4">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <FileText aria-hidden className="size-4 text-muted-foreground" />
                    {doc.label}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{doc.why}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Offer comparison preview */}
      <Section tone="surface" labelledBy="offers-title">
        <SectionHeading
          id="offers-title"
          title="Compare eligible offers side by side"
          body="Inside your application you see every matching lender with rate, APR, EMI, fees and total repayment."
        />
        <div className="mt-8">
          <OfferComparisonPreview />
        </div>
      </Section>

      {/* EMI calculator */}
      <Section labelledBy="emi-title">
        <SectionHeading
          id="emi-title"
          title="Estimate your monthly repayment"
          body="Adjust the amount, rate and tenure to see how the instalment and total cost change."
        />
        <div className="mt-8">
          <EmiCalculator
            minAmount={product.range.min}
            maxAmount={product.range.max}
            defaultAmount={Math.min(product.range.max, Math.max(product.range.min, 300000))}
            defaultRate={product.indicativeRate.max > 0 ? product.indicativeRate.min : 12}
            minTenureMonths={tenureMonths.min}
            maxTenureMonths={tenureMonths.max}
            defaultTenureMonths={tenureMonths.default}
          />
        </div>
      </Section>

      {/* FAQs */}
      <Section tone="surface" labelledBy="faq-title">
        <SectionHeading id="faq-title" title="Questions people ask" />
        <Accordion type="single" collapsible className="mt-6 max-w-3xl">
          {product.faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Security and compliance strip */}
      <Section labelledBy="security-title">
        <div className="grid gap-6 rounded-xl border border-border bg-card p-6 md:grid-cols-3 md:p-8">
          <div>
            <Lock aria-hidden className="mb-3 size-5 text-primary" />
            <h2 id="security-title" className="text-base font-semibold">
              Purpose-specific consent
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Each consent — bureau check, bank data, e-sign — is requested separately, recorded
              with a timestamp, and can be reviewed later.
            </p>
          </div>
          <div>
            <ShieldCheck aria-hidden className="mb-3 size-5 text-primary" />
            <h2 className="text-base font-semibold">Funds move lender to borrower</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your loan is disbursed directly by the participating lender. ShriNeo never holds your
              loan funds.
            </p>
          </div>
          <div>
            <FileText aria-hidden className="mb-3 size-5 text-primary" />
            <h2 className="text-base font-semibold">Key Fact Statement before signing</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              APR, fees, taxes, EMI schedule, foreclosure and cooling-off terms are shown before any
              agreement is signed.
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="ink" labelledBy="cta-title">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>{product.name}</Eyebrow>
            <h2 id="cta-title" className="editorial text-[clamp(1.5rem,3vw,2.25rem)]">
              {product.phase2
                ? "This product is launching soon"
                : "See what participating lenders can offer you"}
            </h2>
            <p className="mt-3 text-base text-ink-foreground/80">
              {product.phase2
                ? "No application, decision or disbursal workflow is live for this product yet."
                : "Checking available options takes a few minutes. You decide whether to proceed after seeing the terms."}
            </p>
          </div>
          {product.phase2 ? (
            <Button asChild size="lg" variant="secondary" className="min-h-11">
              <Link to="/loans">See available products</Link>
            </Button>
          ) : (
            <Button asChild size="lg" variant="secondary" className="min-h-11">
              <Link to="/auth/signup">{t("common.applyNow")}</Link>
            </Button>
          )}
        </div>
      </Section>
    </PublicShell>
  );
}
