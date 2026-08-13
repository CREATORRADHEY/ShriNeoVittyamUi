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
  const {
    account,
    data,
    application,
    activeApplication,
    activeLoan,
    activeRequest,
    activeDocuments,
    activeOffers,
    activePayment,
    activeGrievance,
  } = usePrototype();
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
        title="Attention Needed: Action Required"
        explanation="You have pending item(s) in your Action Centre. Resolving them quickly helps speed up lender reviews."
        actions={[{ label: "Open Action Centre", to: "/app/borrower/action-centre", variant: "default" }]}
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
          reason="Your account is temporarily restricted under review. New applications and payment processing are paused. You can still view statements, previous documents, and contact support."
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
        <ActiveBorrower
          application={application}
          account={account}
          data={data}
          activeApplication={activeApplication}
          activeLoan={activeLoan}
          activeRequest={activeRequest}
          activeDocuments={activeDocuments}
          activeOffers={activeOffers}
          activePayment={activePayment}
          activeGrievance={activeGrievance}
        />
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
          title="No application started"
          explanation="Your progress is saved automatically once you begin, so you can pause and return"
          actions={[{ label: "Explore loan options", to: "/app/borrower/apply" }]}
        />
        <EmptyState
          title="No active loan"
          explanation="Active loans, EMI dates and statements will appear here once a lender disburses"
          actions={[{ label: "View loan products", to: "/loans", variant: "outline" }]}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <EmptyState
          title="CIBIL Score not checked"
          explanation="Retrieve your official TransUnion CIBIL score for free via soft inquiry without affecting your rating."
          actions={[{ label: "Retrieve CIBIL Score", to: "/app/borrower/cibil-score" }]}
        />
        <EmptyState
          title="SNV Trust Score not generated"
          explanation="Generate your advisory SNV Trust Score to help lenders understand thin-file creditworthiness."
          actions={[{ label: "Generate Trust Score", to: "/app/borrower/snv-trust-score" }]}
        />
      </div>

      <SectionCard title="Prefer help from a person?" description="Verified agents assist with documents and lender questions">
        <div className="flex flex-wrap items-center gap-3">
          <Users aria-hidden className="size-5 text-primary" />
          <p className="text-sm text-muted-foreground flex-1 min-w-[200px]">
            Agents can only act on your file after you approve a consent request on your own mobile.
          </p>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
              <Link to="/app/borrower/agents">Find a verified agent</Link>
            </Button>
            <Button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("shrineo:open-neo"))}
              size="sm"
              variant="ghost"
              className="text-primary hover:underline hover:bg-neutral-50"
            >
              Talk to Neo
            </Button>
          </div>
        </div>
      </SectionCard>
    </>
  );
}

interface ActiveBorrowerProps {
  application: string;
  account: string;
  data: string;
  activeApplication: any;
  activeLoan: any;
  activeRequest: any;
  activeDocuments: any[];
  activeOffers: any[];
  activePayment: any;
  activeGrievance: any;
}

function ActiveBorrower({
  application,
  account,
  data,
  activeApplication,
  activeLoan,
  activeRequest,
  activeDocuments,
  activeOffers,
  activePayment,
  activeGrievance,
}: ActiveBorrowerProps) {
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
      meaning: "Participating lenders are reviewing your file. This is normal and does not indicate a decision.",
      timestamp: "10 Mar 2026, 09:45",
      source: "Participating lender",
      nextAction: "No action needed from you right now",
      expected: "Most responses arrive within 2 working days",
      state: "current" as const,
      tone: "info" as const,
    },
    {
      label: "Offer ready",
      meaning: "Compare offers side by side, with the full cost shown before you sign",
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
          value={activePayment ? formatINR(activePayment.amount) : "—"}
          hint={activePayment ? `Due ${activePayment.dueDate} · ${activePayment.mandateBank}` : "No payment scheduled"}
          state={data === "stale" ? "stale" : "ready"}
        />
        <KpiCard
          label="Outstanding Principal"
          value={activeLoan ? formatINR(activeLoan.amount) : "—"}
          hint={activeLoan ? `Across 1 active loan · SBI` : "No active loan balances"}
          state={data === "partial" ? "failed" : "ready"}
        />
        <KpiCard
          label="Applications in Progress"
          value={activeApplication ? "1" : "0"}
          hint={activeApplication ? APPLICATION_LABEL[application as keyof typeof APPLICATION_LABEL] : "All files resolved"}
        />
      </div>

      {/* STATE 1: DRAFT STATE */}
      {application === "draft" && activeApplication && (
        <SectionCard title="Resume Saved Draft" description="Personal loan · ₹3,50,000 · 36 months">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You have a draft application saved on 08 Mar 2026. You can complete the remaining steps to request lender quotes.
            </p>
            <div className="flex gap-2">
              <Button asChild size="sm">
                <Link to="/app/borrower/application">Resume Application</Link>
              </Button>
              <Button size="sm" variant="outline">
                Delete Draft
              </Button>
            </div>
          </div>
        </SectionCard>
      )}

      {/* STATE 2: ACTION REQUIRED / DOCUMENTS REQUIRED */}
      {activeRequest && (
        <InlineState
          tone="warning"
          title="Document Re-upload Requested"
          explanation={`Request ${activeRequest.id}: Lender ${activeRequest.requiredItem} request is outstanding. Reason: ${activeRequest.reason}.`}
          safety="Your application is on hold until the requested documents are uploaded."
          actions={[{ label: "Upload Statements in Action Centre", to: "/app/borrower/action-centre", variant: "default" }]}
        />
      )}

      {/* STATE 3: SUBMITTED / LENDER REVIEW TIMELINE */}
      {application !== "draft" && application !== "disbursed" && application !== "closed" && (
        <SectionCard
          title="Current Application Status"
          description="Personal loan · ₹3,50,000 · 36 months"
          actions={<StatusBadge tone="info">{APPLICATION_LABEL[application as keyof typeof APPLICATION_LABEL]}</StatusBadge>}
        >
          <div className="space-y-5">
            <StatusTimeline items={timeline} />
          </div>
        </SectionCard>
      )}

      {/* STATE 4: REJECTED */}
      {application === "rejected" && (
        <SectionCard title="Rejection Advice" description="Personal loan · ₹3,50,000">
          <div className="space-y-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
              <p className="font-semibold">Application Declined</p>
              <p className="mt-1 text-xs">
                Participating lenders, including SBI Digital Finance, have declined this file. This decision is final. You may review the credit factors or contact our grievance support desk for redressal options.
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/app/borrower/support">Contact Support Desk</Link>
              </Button>
            </div>
          </div>
        </SectionCard>
      )}

      {/* STATE 5: OFFERS READY */}
      {(application === "approved" || application === "lender-review" || application === "manual-review") && activeOffers.length > 0 && (
        <SectionCard title="Quotes Received (Lenders Compared)" description="Lowest APR listed first">
          <div className="space-y-4">
            <div className="grid gap-3">
              {activeOffers.map((off, index) => (
                <div key={off.id} className="flex items-center justify-between rounded-lg border border-border bg-surface p-4">
                  <div>
                    <p className="font-semibold text-foreground">{off.lenderName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatINR(off.amount)} · {off.tenure} months · APR {off.apr}% · Fee {formatINR(off.fee)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-semibold text-foreground">{formatINR(off.emi)}/mo</p>
                    <Button asChild size="xs" variant={index === 0 ? "default" : "outline"} className="mt-1">
                      <Link to="/app/borrower/application">
                        {index === 0 ? "Accept Offer" : "Select Quote"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      )}

      {/* STATE 6: ACTIVE LOAN DETAILS */}
      {activeLoan && activePayment && (
        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard title="Active Loan Servicing" description="SBI Digital Finance · Personal loan">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Next EMI</dt>
                <dd className="num mt-1 text-lg font-semibold text-foreground">{formatINR(activePayment.amount)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Due Date</dt>
                <dd className="num mt-1 text-lg font-semibold text-foreground">{activePayment.dueDate}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Lender Partner</dt>
                <dd className="mt-1 text-foreground">SBI Digital Finance</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Mandate Bank</dt>
                <dd className="mt-1 text-xs text-foreground truncate">{activePayment.mandateBank}</dd>
              </div>
            </dl>
            <div className="mt-5 flex gap-2">
              <Button asChild size="sm">
                <Link to="/app/borrower/payments">
                  <CalendarClock aria-hidden className="size-4" />
                  Repay EMI
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/app/borrower/loans">View Statements</Link>
              </Button>
            </div>
          </SectionCard>

          <SectionCard title="Direct Lender Servicing" description="SBI Digital Finance Portals">
            <p className="text-sm text-muted-foreground">
              For loan closures, restructuring requests, or interest certificates, you can log directly into SBI portal with your registered loan ID.
            </p>
            <Button size="sm" variant="outline" className="mt-4" onClick={() => window.open("https://sbi.co.in", "_blank")}>
              Go to SBI Portal
            </Button>
          </SectionCard>
        </div>
      )}

      {/* STATE 7: CLOSED LOAN */}
      {activeLoan && application === "closed" && (
        <SectionCard title="Previous Loan File (Closed)" description="SBI Digital Finance · Account ID: LN-2026-092">
          <div className="space-y-4">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <p className="font-semibold">Loan Settled & Closed</p>
              <p className="mt-1 text-xs">
                Your loan of ₹3,50,000 was fully settled on 10 Mar 2026. The No Objection Certificate (NOC) is ready for download.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">
                Download NOC Closure Certificate
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/app/borrower/loans">View Historic Statements</Link>
              </Button>
            </div>
          </div>
        </SectionCard>
      )}

      {/* DOCUMENTS CHECKLIST OVERVIEW */}
      <SectionCard title="Documents Summary" description="Verified documentation checklist for current status">
        <div className="grid gap-3 sm:grid-cols-3">
          {activeDocuments.map((doc) => (
            <StatusBadge key={doc.id} tone={doc.status === "Accepted" ? "success" : doc.status === "Rejected" ? "error" : "warning"}>
              {doc.name}: {doc.status}
            </StatusBadge>
          ))}
          {activeDocuments.length === 0 && (
            <p className="text-sm text-muted-foreground col-span-3">No documents submitted yet.</p>
          )}
        </div>
        <Button asChild size="sm" variant="outline" className="mt-4">
          <Link to="/app/borrower/documents">
            <FileText aria-hidden className="size-4" />
            Manage Document Center
          </Link>
        </Button>
      </SectionCard>
    </>
  );
}
