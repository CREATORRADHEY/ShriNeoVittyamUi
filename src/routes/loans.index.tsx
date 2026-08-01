import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products } from "@/config/products";
import { formatINR } from "@/lib/format";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, StatusPill } from "@/components/design-system/section";
import { EmiCalculator } from "@/components/loans/emi-calculator";

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
      { property: "og:url", content: "/loans" },
    ],
    links: [{ rel: "canonical", href: "/loans" }],
  }),
  component: LoansIndex,
});

function LoansIndex() {
  return (
    <PublicShell>
      <Section labelledBy="loans-title">
        <SectionHeading
          id="loans-title"
          title="Loan products"
          body="Every amount, tenure and rate shown is indicative and configured with participating lenders. Final terms are set by the lender that approves your application."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                to={product.path}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-accent text-primary">
                  <product.icon aria-hidden className="size-5" />
                </span>
                <h2 className="mt-4 flex flex-wrap items-center gap-2 text-lg font-semibold">
                  {product.name}
                  {product.phase2 ? <StatusPill tone="warning">Coming in Phase 2</StatusPill> : null}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{product.summary}</p>
                <dl className="num mt-4 space-y-1 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Amount</dt>
                    <dd>
                      {formatINR(product.range.min, { compact: true })} –{" "}
                      {formatINR(product.range.max, { compact: true })}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Tenure</dt>
                    <dd>
                      {product.tenure.min}–{product.tenure.max}{" "}
                      {product.tenure.model === "years" ? "years" : "months"}
                    </dd>
                  </div>
                </dl>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  View details
                  <ArrowRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="calc-title">
        <SectionHeading
          id="calc-title"
          title="Estimate an EMI"
          body="Change the amount, rate and tenure to understand how your monthly instalment and total cost move."
        />
        <div className="mt-8">
          <EmiCalculator minAmount={10000} maxAmount={5000000} defaultAmount={500000} />
        </div>
      </Section>
    </PublicShell>
  );
}
