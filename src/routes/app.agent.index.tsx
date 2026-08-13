import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, IndianRupee, ShieldCheck, UserCheck, Play, Award, HelpCircle, Lock, BookOpen } from "lucide-react";
import { useState } from "react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  DataStaleBanner,
  EmptyState,
  InlineState,
  KpiCard,
  NamedLoading,
  OfflineBanner,
  PartialDataNotice,
  RestrictedState,
  RetryPanel,
  SkeletonBlock,
  StatusBadge,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/agent/")({
  head: () => ({
    meta: [
      { title: "Agent Workspace — ShriNeo Capital" },
      {
        name: "description",
        content: "Work queues, lead statuses, training compliance, and payout audits.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AgentDashboard,
});

const LEADS = [
  { name: "Sunita Rao", product: "Personal loan", amount: 350000, consent: "Approved", age: "2h" },
  { name: "Imran Qureshi", product: "Business loan", amount: 800000, consent: "Pending", age: "5h" },
  { name: "Deepa Nair", product: "Home loan", amount: 3200000, consent: "Approved", age: "1d" },
  { name: "Mahesh Patil", product: "Mortgage loan", amount: 1500000, consent: "Expired", age: "2d" },
];

function AgentDashboard() {
  const { account, data, activeLoan } = usePrototype();

  const banner =
    account === "action-required" ? (
      <InlineState
        tone="warning"
        title="Payout on Hold — Bank Verification Mismatch"
        explanation="A penny-drop verification on your registered account did not match the name on your PAN details."
        safety="Earned commission is locked. It will release to your ledger automatically once verification succeeds."
        actions={[{ label: "Update Bank Details", variant: "default", onClick: () => toast.info("Launch bank settings.") }]}
      />
    ) : data === "offline" ? (
      <OfflineBanner />
    ) : data === "stale" ? (
      <DataStaleBanner asOf="today at 08:40 IST" />
    ) : data === "partial" ? (
      <PartialDataNotice missing="Commission reconciliation for March" />
    ) : null;

  return (
    <PortalShell
      role="agent"
      title="Agent Workspace"
      subtitle="Verified agent · Jaipur · Rajasthan"
      banner={banner}
      actions={
        account === "active" && (
          <Button asChild size="sm">
            <Link to="/app/agent/start">Start application</Link>
          </Button>
        )
      }
    >
      {account === "suspended" || account === "restricted" ? (
        <RestrictedState
          reason="Your agent workspace is temporarily restricted while commission patterns are reviewed."
          reviewWindow="within 5 working days"
        />
      ) : data === "failed" ? (
        <RetryPanel
          title="We couldn't load your workspace."
          explanation="Leads and file status didn't load on this attempt. No lead was reassigned and no file was changed."
        />
      ) : data === "loading" ? (
        <div className="space-y-5">
          <NamedLoading label="Loading your work queue" />
          <SkeletonBlock rows={6} />
        </div>
      ) : account === "new" ? (
        /* PHASE 3 TASK 1: RESTRICTED ONBOARDING DASHBOARD */
        <AgentOnboardingDashboard />
      ) : (
        /* OPERATIONAL DASHBOARD */
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="New leads" value={data === "empty" ? "0" : "4"} hint="Assigned in last 48h" state={data === "empty" ? "empty" : "ready"} />
            <KpiCard label="Files in progress" value={data === "empty" ? "0" : "11"} hint="3 awaiting borrower" state={data === "empty" ? "empty" : "ready"} />
            <KpiCard
              label="Commission earned"
              value={formatINR(48250)}
              hint="Eligible after lender disbursal"
              state={data === "stale" ? "stale" : data === "empty" ? "empty" : "ready"}
            />
            <KpiCard
              label="Recovery adjustment"
              value={formatINR(0)}
              hint="Case-linked only · appealable"
              tone="neutral"
              title="Any recovery is linked to a specific loan case. Your wallet balance is never reduced below zero. Adjustments can be reviewed within 30 days by contacting support."
            />
          </div>

          <SectionCard
            title="Work Queue"
            description="Consent status is shown on every row — no file can progress without borrower approval"
            actions={<StatusBadge tone="info">Filtered: active</StatusBadge>}
          >
            <div className="overflow-x-auto text-xs">
              <table className="w-full min-w-[640px] border-collapse">
                <caption className="sr-only">Assigned leads with consent status</caption>
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground bg-surface">
                    <th scope="col" className="p-3 font-semibold">Borrower</th>
                    <th scope="col" className="p-3 font-semibold">Product</th>
                    <th scope="col" className="p-3 font-semibold">Requested</th>
                    <th scope="col" className="p-3 font-semibold">Consent Status</th>
                    <th scope="col" className="p-3 font-semibold">Assigned Time</th>
                  </tr>
                </thead>
                {data === "empty" ? (
                  <TableState kind="empty" columns={5} entity="leads" />
                ) : (
                  <tbody>
                    {LEADS.map((l) => (
                      <tr key={l.name} className="border-b border-border last:border-0">
                        <td className="p-3 font-semibold text-foreground">
                          {l.name}
                        </td>
                        <td className="p-3 text-muted-foreground">{l.product}</td>
                        <td className="num p-3 text-foreground">{formatINR(l.amount)}</td>
                        <td className="p-3">
                          <StatusBadge
                            tone={l.consent === "Approved" ? "success" : l.consent === "Pending" ? "warning" : "error"}
                          >
                            {l.consent}
                          </StatusBadge>
                        </td>
                        <td className="num p-3 text-muted-foreground">{l.age}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </SectionCard>

          {data === "empty" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <EmptyState
                compact
                title="No new leads are assigned right now"
                explanation="Leads are distributed as borrowers request assistance in your service area"
                actions={[{ label: "Start an application with borrower consent", to: "/app/agent/start" }]}
              />
              <EmptyState
                compact
                title="No commission has been earned yet"
                explanation="Commission becomes eligible after a participating lender confirms disbursal"
                actions={[{ label: "How commission works", to: "/for-agents", variant: "outline" }]}
              />
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              <SectionCard title="Consent Gate Guard" className="lg:col-span-1">
                <div className="flex items-start gap-3">
                  <UserCheck aria-hidden className="mt-0.5 size-5 text-primary" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every file requires an OTP approved by the borrower on their own mobile. There is no agent bypass.
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="mt-4">
                  <Link to="/app/agent/leads">Open consent requests</Link>
                </Button>
              </SectionCard>

              <SectionCard title="Earnings and payouts" className="lg:col-span-2">
                <ul className="divide-y divide-border text-sm">
                  {[
                    { label: "Estimated (files in review)", value: formatINR(21400), note: "Not payable until disbursal is confirmed" },
                    { label: "Earned and verified", value: formatINR(48250), note: "Included in next payout run" },
                    { label: "TDS deducted", value: `− ${formatINR(4825)}`, note: "Statutory 10% deduction at source" },
                    { label: "Payout scheduled", value: "18 Mar 2026", note: "To your verified bank account" },
                  ].map((row) => (
                    <li key={row.label} className="flex flex-wrap items-center justify-between gap-2 py-3 text-xs">
                      <div>
                        <p className="font-semibold text-foreground">{row.label}</p>
                        <p className="text-[10px] text-muted-foreground">{row.note}</p>
                      </div>
                      <span className="num font-semibold text-foreground">{row.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <IndianRupee aria-hidden className="size-4 text-muted-foreground" />
                  <Button asChild size="sm" variant="outline">
                    <Link to="/app/agent/commissions">Open commission ledger</Link>
                  </Button>
                </div>
              </SectionCard>
            </div>
          )}

          <SectionCard title="Compliance" description="Renewals keep your verified status active">
            <div className="flex flex-wrap items-center gap-3">
              <ShieldCheck aria-hidden className="size-5 text-primary" />
              <StatusBadge tone="success">
                Training current until 12 Sep 2026
              </StatusBadge>
              <Button asChild size="sm" variant="ghost">
                <Link to="/app/agent/training">
                  Open training
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
            </div>
          </SectionCard>
        </>
      )}
    </PortalShell>
  );
}

function AgentOnboardingDashboard() {
  const [playingVideo, setPlayingVideo] = useState(false);

  const handleStartQuiz = () => {
    toast.error("Complete all 4 training modules before starting the assessment.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 text-xs">
        <ShieldCheck className="size-5 shrink-0 mt-0.5 text-amber-600" />
        <div>
          <p className="font-semibold text-sm">Onboarding Gated Workspace</p>
          <p className="mt-1">
            Your identity documents have passed KYC checks. You are currently in a restricted onboarding state. Complete the mandatory training modules and bank account verification to activate your leads pipeline.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <SectionCard title="Mandatory Training Modules" description="Learn security, consent rules, and document standards">
            <div className="space-y-3 text-xs">
              {[
                { id: "mod-1", name: "Module 1: RBI Fair Practices Code", status: "Completed", dur: "15 min" },
                { id: "mod-2", name: "Module 2: Client Consent & OTP Guards", status: "Completed", dur: "20 min" },
                { id: "mod-3", name: "Module 3: Document Standards & OCR Auditing", status: "Awaiting review", dur: "25 min" },
                { id: "mod-4", name: "Module 4: Zero-Fee Fraud Prevention Policy", status: "Locked", dur: "15 min" }
              ].map((m) => (
                <div key={m.id} className="p-3 rounded border border-border bg-surface flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-foreground">{m.name}</h4>
                    <p className="text-[10px] text-muted-foreground">Duration: {m.dur}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${m.status === "Completed" ? "bg-emerald-50 text-emerald-700" : m.status === "Locked" ? "bg-neutral-100 text-muted-foreground flex items-center gap-0.5" : "bg-primary/10 text-primary"}`}>
                      {m.status === "Locked" && <Lock className="size-3" />} {m.status}
                    </span>
                    {m.status === "Awaiting review" && (
                      <Button size="xs" onClick={() => setPlayingVideo(true)} className="flex items-center gap-1">
                        <Play className="size-3" /> Play Video
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Activation checklist">
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>Identity verification completed (Aadhaar & PAN matched)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>Onboarding agreement accepted (Signed 08 Mar)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-700">
                <HelpCircle className="size-4 shrink-0" />
                <span>Bank account details: Penny-drop mismatch resolved pending (Awaiting GRO review)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-500">
                <Lock className="size-4 shrink-0" />
                <span>Knowledge assessment: Locked (Complete modules first)</span>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Assessment & Quizzes">
            <div className="space-y-3 text-xs text-center p-4">
              <Award className="size-10 text-muted-foreground mx-auto" />
              <h4 className="font-semibold text-foreground mt-2">Assigned Agent Examination</h4>
              <p className="text-[10px] text-muted-foreground">
                Requires score of 80% or above on regulatory parameters to unlock your active badge.
              </p>
              <Button size="sm" className="w-full" variant="outline" onClick={handleStartQuiz}>
                Start Quiz
              </Button>
            </div>
          </SectionCard>

          <SectionCard title="Support Desk">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Stuck in onboarding verification? Direct escalation link is active.
            </p>
            <Button asChild size="sm" variant="outline" className="w-full mt-4">
              <Link to="/app/agent/support">Open Support Ticket</Link>
            </Button>
          </SectionCard>
        </div>
      </div>

      {/* VIDEO PLAYER DIALOG SIMULATOR */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-[500px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] text-center space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-2">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <BookOpen className="size-5 text-primary" /> Module 3: Document Standards & OCR Auditing
              </h3>
              <button type="button" onClick={() => setPlayingVideo(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>
            
            <div className="aspect-video w-full rounded-lg bg-neutral-900 border border-border flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-neutral-800 flex flex-col items-center justify-center text-xs text-neutral-200 p-4">
                <span className="animate-pulse font-semibold">🔴 VIDEO PLAYBACK — MODULE 3 TUTORIAL</span>
                <p className="mt-4 max-w-[40ch] text-[10px] text-muted-foreground text-center">
                  "Ensure Bank Statements PDFs uploaded are clean, unlocked, and cover the requested six-month range. Avoid partial scanner captures."
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex justify-end">
              <Button size="sm" onClick={() => { setPlayingVideo(false); toast.success("Module 3 video completed."); }}>
                Mark Completed
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// X Close Icon Helper
function X(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
