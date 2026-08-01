import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { InlineState, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { products } from "@/config/products";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/borrower/apply")({
  head: () => ({
    meta: [
      { title: "Apply for a loan — ShriNeo Capital" },
      {
        name: "description",
        content: "Choose a loan product, resume a saved draft, and see exactly what is needed before you apply.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Apply for a loan — ShriNeo Capital" },
      { property: "og:description", content: "Product selection, KYC gate and saved drafts." },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const { account, application } = usePrototype();
  const kycBlocked = account === "new" || account === "partial";
  const hasActive = application !== "draft" && application !== "closed";

  return (
    <PortalShell role="borrower" title="Apply for a loan" subtitle="Step 0 of 5 — choose what you need">
      {kycBlocked ? (
        <InlineState
          tone="warning"
          title="Complete KYC before you submit"
          explanation="You can select a product and fill in your details now. Lenders can only review your application once your identity is verified."
          safety="Everything you enter is saved as a draft while KYC is pending."
          actions={[{ label: "Complete KYC", variant: "default" }]}
        />
      ) : null}

      {hasActive ? (
        <InlineState
          tone="info"
          title="You already have an application in progress"
          explanation="Starting a new application does not cancel the existing one, but participating lenders may see both."
          actions={[
            { label: "Resume saved draft", to: "/app/borrower/application", variant: "default" },
            { label: "View current application", to: "/app/borrower/applications" },
          ]}
        />
      ) : null}

      <SectionCard title="Choose a product" description="Rates and terms are set by participating lenders, not by ShriNeo Capital.">
        <div className="grid gap-3 sm:grid-cols-2">
          {products.map((p) => {
            const comingSoon = p.slug === "sachet";
            return (
              <div
                key={p.slug}
                className="flex flex-col justify-between rounded-lg border border-border bg-surface p-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    {comingSoon ? <StatusBadge tone="neutral">Coming soon</StatusBadge> : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
                </div>
                <div className="mt-4">
                  {comingSoon ? (
                    <>
                      <Button size="sm" disabled aria-describedby={`why-${p.slug}`}>
                        Not available yet
                      </Button>
                      <p id={`why-${p.slug}`} className="mt-2 text-xs text-muted-foreground">
                        Sachet loans open once a participating lender is live for small-ticket credit
                        in your district. We'll notify you.
                      </p>
                    </>
                  ) : (
                    <Button asChild size="sm" variant={kycBlocked ? "outline" : "default"}>
                      <Link to="/app/borrower/application">
                        {kycBlocked ? "Start draft" : "Start application"}
                        <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Unsupported product">
        <InlineState
          tone="neutral"
          title="Credit cards aren't offered on ShriNeo Capital"
          explanation="We only support the loan products listed above. If you were sent a link for another product, it may have been shared in error."
          actions={[{ label: "See supported products", to: "/loans", variant: "outline" }]}
        />
      </SectionCard>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Lock aria-hidden className="size-3.5" />
        Your details are shared with participating lenders only after you agree to the consent
        statement in step 1.
      </p>
    </PortalShell>
  );
}
