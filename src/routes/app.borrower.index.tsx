import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarClock,
  FileText,
  Landmark,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  DataStaleBanner,
  EmptyState,
  InlineState,
  KpiCard,
  LongWaitPanel,
  NamedLoading,
  OfflineBanner,
  PartialDataNotice,
  RestrictedState,
  RetryPanel,
  SkeletonBlock,
  StatusBadge,
  StatusTimeline,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatINR } from "@/lib/format";
import { APPLICATION_LABEL, usePrototype } from "@/prototype/state";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/app/borrower/")({
  head: () => ({
    meta: [
      { title: "Borrower dashboard — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Track your loan application, next EMI, documents and offers in the ShriNeo Capital borrower portal.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Borrower dashboard — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Applications, EMIs, documents and offers in one calm view.",
      },
    ],
  }),
  component: BorrowerDashboard,
});

function BorrowerDashboard() {
  const { account, data, application } = usePrototype();
  const { t } = useI18n();

  const banner =
    account === "partial" ? (
      <InlineState
        tone="info"
        title="Your KYC is not complete yet"
        explanation="You can compare products and calculate EMIs now. Submitting an application and receiving lender offers stay unavailable until KYC is verified"
        actions={[{ label: "Complete KYC", variant: "default" }]}
      />
    ) : account === "action-required" ? (
      <InlineState
        tone="warning"
        title="Four items need your attention"
        explanation="A document request, an offer expiring in 2 days, a pending e-Sign and a failed mandate are waiting on you"
        actions={[{ label: "Review what's needed", to: "/app/borrower/applications" }]}
      />
    ) : data === "offline" ? (
      <OfflineBanner />
    ) : data === "stale" ? (
      <DataStaleBanner asOf="today at 09:12 IST" />
    ) : data === "partial" ? (
      <PartialDataNotice missing="Your credit bureau summary" />
    ) : null;

  return (
    <PortalShell
      role="borrower"
      title={t("portal.borrower.greeting", "Namaste, Rohit")}
      subtitle={t("portal.subtitle.demo", "Demonstration data — no live lender information is shown")}
      banner={banner}
      actions={
        <Button asChild size="sm">
          <Link to="/app/borrower/apply">
            <Sparkles aria-hidden className="size-4" />
            {t("portal.nav.apply", "Apply")}
          </Link>
        </Button>
      }
    >
      {account === "restricted" || account === "suspended" ? (
        <RestrictedState
          borrowerVoice
          reason="Your account is temporarily in review, so new applications and payments are paused. You can still view your loan summary, statements and documents"
          reviewWindow="within 3 working days"
        />
      ) : data === "failed" ? (
        <RetryPanel
          title="We couldn't load your dashboard"
          explanation="Your account details did not load on this attempt. This is a problem on our side, not with your loan or your repayments"
        />
      ) : data === "loading" ? (
        <div className="space-y-5">
          <NamedLoading label="Checking your saved application" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <KpiCard key={i} label="Loading" state="loading" />
            ))}
          </div>
          <SectionCard title="Your activity">
            <SkeletonBlock rows={4} />
          </SectionCard>
        </div>
      ) : account === "new" || data === "empty" ? (
        <NewBorrower />
      ) : (
        <ActiveBorrower application={application} account={account} data={data} />
      )}
    </PortalShell>
  );
}

function NewBorrower() {
  return (
    <>
      <section className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <h2 className="editorial text-2xl text-foreground">Welcome to ShriNeo Capital</h2>
        <p className="mt-2 max-w-[60ch] text-muted-foreground">
          You haven't started an application yet. Compare what participating lenders can offer,
          understand the full cost, and apply when you're ready
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link to="/app/borrower/apply">
              Explore loan options
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/emi-calculator">Open EMI calculator</Link>
          </Button>
        </div>
      </section>

      <InlineState
        tone="info"
        title="Verify your identity to receive offers"
        explanation="KYC is required before participating lenders can review your application. It usually takes about four minutes"
        actions={[{ label: "Complete KYC", variant: "default" }]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "Personal loan", body: "Unsecured, from ₹50,000", to: "/loans/personal", icon: Sparkles },
          { title: "Business loan", body: "For MSMEs and traders", to: "/loans/business", icon: Landmark },
          { title: "Home loan", body: "Long-tenure, secured", to: "/loans/home", icon: ShieldCheck },
        ].map((p) => (
          <Link
            key={p.title}
            to={p.to}
            className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary"
          >
            <p.icon aria-hidden className="size-5 text-primary" />
            <p className="mt-3 font-semibold text-foreground">{p.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <EmptyState
          title="You haven't started an application yet"
          explanation="Your progress is saved automatically once you begin, so you can pause and return"
          actions={[{ label: "Explore loan options", to: "/app/borrower/apply" }]}
        />
        <EmptyState
          title="You don't have an active loan"
          explanation="Active loans, EMI dates and statements will appear here once a lender disburses"
          actions={[{ label: "View loan products", to: "/loans", variant: "outline" }]}
        />
      </div>

      <SectionCard title="Prefer help from a person?" description="Verified agents assist with documents and lender questions">
        <div className="flex flex-wrap items-center gap-3">
          <Users aria-hidden className="size-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            Agents can only act on your file after you approve a consent request on your own mobile
          </p>
          <Button asChild size="sm" variant="outline">
            <Link to="/app/borrower/agents">Find a verified agent</Link>
          </Button>
        </div>
      </SectionCard>
    </>
  );
}

function ActiveBorrower({
  application,
  account,
  data,
}: {
  application: string;
  account: string;
  data: string;
}) {
  const timeline = [
    {
      label: "Application submitted",
      meaning: "Your details were sent to participating lenders for review",
      timestamp: "08 Mar 2026, 11:04",
      source: "ShriNeo Capital",
      state: "done" as const,
    },
    {
      label: "Documents verified",
      meaning: "Identity, address and income documents passed verification checks",
      timestamp: "09 Mar 2026, 16:20",
      source: "Verification partner",
      state: "done" as const,
    },
    {
      label: APPLICATION_LABEL[application as keyof typeof APPLICATION_LABEL] ?? "Lender review",
      meaning:
        "Participating lenders are still reviewing your application. This is normal and does not indicate a decision",
      timestamp: "10 Mar 2026, 09:45",
      source: "Participating lender",
      nextAction: "No action needed from you right now",
      expected: "Most responses arrive within 2 working days",
      state: "current" as const,
      tone: "info" as const,
    },
    {
      label: "Offer ready",
      meaning: "You'll compare offers side by side, with the full cost shown before you sign",
      timestamp: "Pending",
      source: "ShriNeo Capital",
      state: "upcoming" as const,
    },
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Next EMI"
          value={formatINR(9885)}
          hint="Due 05 Apr 2026 · IDFC First Bank"
          state={data === "stale" ? "stale" : "ready"}
        />
        <KpiCard
          label="Outstanding principal"
          value={formatINR(284350)}
          hint="Across 1 active loan"
          state={data === "partial" ? "failed" : "ready"}
        />
        <KpiCard label="Applications in progress" value="1" hint="Lender review" />
      </div>

      <SectionCard
        title="Current application"
        description="Personal loan · ₹3,00,000 · 36 months"
        actions={<StatusBadge tone="info">{APPLICATION_LABEL[application as keyof typeof APPLICATION_LABEL]}</StatusBadge>}
      >
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="num text-foreground">Step 4 of 5</span>
            </div>
            <Progress value={78} className="mt-2" />
          </div>
          {account === "action-required" ? (
            <InlineState
              tone="warning"
              title="One document is still needed"
              explanation="A clearer photo of your address proof was requested by the participating lender on 11 Mar"
              safety="Your application stays saved while this is outstanding"
              actions={[
                { label: "Upload document", to: "/app/borrower/documents", variant: "default" },
                { label: "See what changed", to: "/app/borrower/applications" },
              ]}
            />
          ) : null}
          <StatusTimeline items={timeline} />
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Lender review in progress">
          <LongWaitPanel
            stage={1}
            stages={[
              "Application checks completed",
              "Participating lenders reviewing",
              "Offers prepared for comparison",
              "Key Fact Statement issued",
            ]}
            expected="within 2 working days"
          />
        </SectionCard>

        <SectionCard title="Active loan" description="IDFC First Bank · Personal loan">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Next EMI</dt>
              <dd className="num mt-1 text-lg font-semibold text-foreground">{formatINR(9885)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Due date</dt>
              <dd className="num mt-1 text-lg font-semibold text-foreground">05 Apr 2026</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Lender</dt>
              <dd className="mt-1 text-foreground">IDFC First Bank</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Outstanding</dt>
              <dd className="num mt-1 text-foreground">{formatINR(284350)}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link to="/app/borrower/payments">
                <CalendarClock aria-hidden className="size-4" />
                Pay EMI
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/app/borrower/loans">View loan details</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Repayments are collected by the participating lender. ShriNeo Capital does not hold your
            funds
          </p>
        </SectionCard>
      </div>

      <SectionCard title="Documents" description="Everything you've shared, and what's still open">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatusBadge tone="success">PAN verified</StatusBadge>
          <StatusBadge tone="success">Aadhaar (masked) verified</StatusBadge>
          <StatusBadge tone="warning">Address proof needs a clearer photo</StatusBadge>
        </div>
        <Button asChild size="sm" variant="outline" className="mt-4">
          <Link to="/app/borrower/documents">
            <FileText aria-hidden className="size-4" />
            Manage documents
          </Link>
        </Button>
      </SectionCard>
    </>
  );
}
