import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, IndianRupee, ShieldCheck, UserCheck, Play, Award, HelpCircle, Lock, BookOpen, CheckCircle2, MessageSquare, Check, X, Building, AlertTriangle, RefreshCw } from "lucide-react";
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
  TableState,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  const { account, data } = usePrototype();
  const [payoutSkipped, setPayoutSkipped] = useState(false);
  const [claimedLeads, setClaimedLeads] = useState<string[]>([]);

  // Persistent payout alert banner if skipped
  const banner =
    payoutSkipped ? (
      <InlineState
        tone="warning"
        title="Complete payout setup to release commission payouts"
        explanation="You skipped bank account registration. Commission payouts will be held until details are confirmed."
        safety="Earned commission is locked. It will release to your ledger automatically once verification succeeds."
        actions={[{ label: "Complete Bank Details", variant: "default", onClick: () => { setPayoutSkipped(false); toast.info("Launch bank settings."); } }]}
      />
    ) : account === "action-required" ? (
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
        <AgentOnboardingDashboard payoutSkipped={payoutSkipped} setPayoutSkipped={setPayoutSkipped} />
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
                    <th scope="col" className="p-3 font-semibold">Action / Lock Status</th>
                  </tr>
                </thead>
                {data === "empty" ? (
                  <TableState kind="empty" columns={6} entity="leads" />
                ) : (
                  <tbody>
                    {LEADS.map((l) => (
                      <tr key={l.name} className="border-b border-border last:border-0 hover:bg-neutral-50">
                        <td className="p-3 font-semibold text-foreground">
                          {l.consent === "Approved" || claimedLeads.includes(l.name)
                            ? l.name 
                            : `REQ-2026-${1000 + l.name.charCodeAt(0) + l.name.charCodeAt(1)} (Pre-acceptance Lock)`}
                        </td>
                        <td className="p-3 text-muted-foreground">{l.product}</td>
                        <td className="num p-3 text-foreground font-semibold">{formatINR(l.amount)}</td>
                        <td className="p-3">
                          <StatusBadge
                            tone={claimedLeads.includes(l.name) || l.consent === "Approved" ? "success" : l.consent === "Pending" ? "warning" : "error"}
                          >
                            {claimedLeads.includes(l.name) ? "Approved & Active" : l.consent}
                          </StatusBadge>
                        </td>
                        <td className="num p-3 text-muted-foreground">{l.age}</td>
                        <td className="p-3">
                          {l.consent === "Pending" && !claimedLeads.includes(l.name) ? (
                            <Button
                              size="xs"
                              onClick={() => {
                                setClaimedLeads(prev => [...prev, l.name]);
                                toast.success(`Lead successfully claimed and locked under First-Valid-Accept protocol.`);
                              }}
                            >
                              Claim & Lock Lead
                            </Button>
                          ) : l.consent === "Expired" ? (
                            <span className="text-[10px] text-rose-600 font-semibold">Consent Expired</span>
                          ) : (
                            <span className="text-[10px] text-emerald-600 font-semibold">✓ Claimed & Locked</span>
                          )}
                        </td>
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
                  <Button
                    type="button"
                    size="sm"
                    variant={payoutSkipped ? "secondary" : "default"}
                    onClick={() => {
                      if (payoutSkipped) {
                        toast.error("Payout blocked: bank credentials setup was skipped during onboarding.");
                      } else {
                        toast.success("Payout withdrawal request of ₹43,425 queued successfully.");
                      }
                    }}
                  >
                    Request Payout Withdrawal
                  </Button>
                  {payoutSkipped && (
                    <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1">
                      ⚠️ Payouts blocked (Bank setup skipped)
                    </span>
                  )}
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

interface OnboardingProps {
  payoutSkipped: boolean;
  setPayoutSkipped: (val: boolean) => void;
}

function AgentOnboardingDashboard({ payoutSkipped, setPayoutSkipped }: OnboardingProps) {
  const [step, setStep] = useState<"otp" | "agreement" | "bank" | "training" | "review">("otp");
  
  // Simulated verification states
  const [selectedLang, setSelectedLang] = useState("en");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Agreement Checklist
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  // Bank Info
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  // Training & Quiz simulation
  const [playingVideo, setPlayingVideo] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [trainingCertificate, setTrainingCertificate] = useState(false);

  const quizQuestions = [
    {
      q: "Can you charge the borrower any processing fee or consultation charges directly?",
      options: ["Yes, up to 1%", "No, ShriNeo Capital is a zero-fee platform for borrowers", "Only if the file is rejected"],
      correct: 1
    },
    {
      q: "Is it permissible to view or request the borrower's one-time password (OTP)?",
      options: ["Yes, to help speed up submission", "Only with written permission", "No, the borrower must authorize OTP checks on their own device"],
      correct: 2
    }
  ];

  const handleVerifyOtp = () => {
    if (phoneOtp !== "123456" || emailOtp !== "123456") {
      setOtpError("Invalid verification code. Enter simulated OTP '123456' for both fields.");
      return;
    }
    setOtpError("");
    toast.success("OTP verification successful.");
    setStep("agreement");
  };

  const handleAcceptAgreement = () => {
    if (!agree1 || !agree2 || !agree3) {
      toast.error("Please accept all partner agreements and code of conduct checks.");
      return;
    }
    toast.success("Sourcing agreement signed successfully.");
    setStep("bank");
  };

  const handleSaveBankDetails = () => {
    if (!bankName || !accountNo || !ifscCode) {
      toast.error("Please fill in all bank details or skip the setup.");
      return;
    }
    toast.success("Payout bank account set up successfully.");
    setPayoutSkipped(false);
    setStep("training");
  };

  const handleSkipBankDetails = () => {
    setPayoutSkipped(true);
    toast.warning("Bank details skipped. Persistent alert banner active on dashboard.");
    setStep("training");
  };

  const handleQuizAnswer = (selectedIdx: number) => {
    if (selectedIdx === quizQuestions[currentQuizIndex]?.correct) {
      setQuizScore(prev => prev + 1);
    }
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      // Completed quiz
      setShowQuiz(false);
      setTrainingCertificate(true);
      toast.success("Congratulations! You passed the mandatory policy assessment.");
    }
  };

  const handleCompleteOnboarding = () => {
    if (!trainingCertificate) {
      toast.error("Complete the policy assessment quiz to unlock agent activation.");
      return;
    }
    setStep("review");
    toast.info("Onboarding credentials submitted. KYC enters manual verification queue.");
  };

  return (
    <div className="space-y-6">
      {/* Onboarding restricted notice banner */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 text-xs">
        <ShieldCheck className="size-5 shrink-0 mt-0.5 text-amber-600" />
        <div>
          <p className="font-semibold text-sm">Gated Agent Onboarding</p>
          <p className="mt-1">
            KYC review is pending admin activation. Complete the step-by-step checklist to finalize registration.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* STEP 1: OTP VERIFICATION */}
          {step === "otp" && (
            <SectionCard title="Step 1 · Mobile and Email Verification" description="RBI-mandated security check">
              <div className="space-y-4 text-xs">
                <div>
                  <Label htmlFor="lang" className="mb-1 block font-medium">Preferred Communication Language</Label>
                  <select
                    id="lang"
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="w-full rounded border border-input bg-card px-3 py-1.5 focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phoneOtp" className="mb-1 block font-medium">Mobile OTP (Simulated "123456")</Label>
                    <Input
                      id="phoneOtp"
                      maxLength={6}
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="num"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailOtp" className="mb-1 block font-medium">Email OTP (Simulated "123456")</Label>
                    <Input
                      id="emailOtp"
                      maxLength={6}
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="num"
                    />
                  </div>
                </div>
                {otpError && <p className="text-red-600 font-semibold">{otpError}</p>}
                <Button size="sm" onClick={handleVerifyOtp} className="mt-2">Verify Contact Channels</Button>
              </div>
            </SectionCard>
          )}

          {/* STEP 2: AGREEMENT CHECKLIST */}
          {step === "agreement" && (
            <SectionCard title="Step 2 · Partner Code of Conduct Agreements" description="Statutory compliance statements">
              <div className="space-y-4 text-xs">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <input
                      id="agree1"
                      type="checkbox"
                      checked={agree1}
                      onChange={(e) => setAgree1(e.target.checked)}
                      className="mt-0.5 size-4 rounded border-gray-300"
                    />
                    <Label htmlFor="agree1" className="leading-relaxed font-normal">
                      I acknowledge that ShriNeo Capital is a <strong>zero-fee platform</strong> for borrowers. I will never collect processing fees or commissions directly from any applicant.
                    </Label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      id="agree2"
                      type="checkbox"
                      checked={agree2}
                      onChange={(e) => setAgree2(e.target.checked)}
                      className="mt-0.5 size-4 rounded border-gray-300"
                    />
                    <Label htmlFor="agree2" className="leading-relaxed font-normal">
                      I will respect client data privacy. I will never look up or ask for OTPs or sensitive digital signatures belonging to borrowers.
                    </Label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      id="agree3"
                      type="checkbox"
                      checked={agree3}
                      onChange={(e) => setAgree3(e.target.checked)}
                      className="mt-0.5 size-4 rounded border-gray-300"
                    />
                    <Label htmlFor="agree3" className="leading-relaxed font-normal">
                      I agree to the sourcing-partner code of conduct terms and verify that all documents submitted are true scans.
                    </Label>
                  </div>
                </div>
                <Button size="sm" onClick={handleAcceptAgreement}>Sign Agreement</Button>
              </div>
            </SectionCard>
          )}

          {/* STEP 3: BANK DETAILS */}
          {step === "bank" && (
            <SectionCard title="Step 3 · Payout Bank Account Setup" description="Details for receiving commissions">
              <div className="space-y-4 text-xs">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="bankName" className="mb-1 block font-medium">Bank Name</Label>
                    <Input id="bankName" placeholder="e.g. State Bank of India" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="accountNo" className="mb-1 block font-medium">Account Number</Label>
                    <Input id="accountNo" placeholder="Account Number" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="ifscCode" className="mb-1 block font-medium">IFSC Code</Label>
                    <Input id="ifscCode" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" onClick={handleSaveBankDetails}>Save Bank Account</Button>
                  <Button size="sm" variant="outline" onClick={handleSkipBankDetails}>Skip for now</Button>
                </div>
              </div>
            </SectionCard>
          )}

          {/* STEP 4: TRAINING & CERTIFICATION */}
          {step === "training" && (
            <SectionCard title="Step 4 · Mandatory Compliance Training" description="Complete training to activate dashboard">
              <div className="space-y-4 text-xs">
                <div className="p-3 border border-border rounded bg-surface flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-foreground">Module 3: Document Standards & OCR Auditing</h4>
                    <p className="text-[10px] text-muted-foreground">Status: {videoCompleted ? "Completed" : "Awaiting review"}</p>
                  </div>
                  <Button size="xs" onClick={() => setPlayingVideo(true)} className="flex items-center gap-1">
                    <Play className="size-3" /> {videoCompleted ? "Watch Again" : "Play Video"}
                  </Button>
                </div>

                {videoCompleted && !trainingCertificate && (
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg text-center space-y-3">
                    <HelpCircle className="size-8 mx-auto text-blue-600" />
                    <p className="font-semibold">Mandatory Assessment Quiz Locked</p>
                    <p className="text-muted-foreground text-[10px]">
                      Complete the short policy assessment to verify your training status.
                    </p>
                    <Button size="sm" onClick={() => setShowQuiz(true)}>Start Assessment Quiz</Button>
                  </div>
                )}

                {trainingCertificate && (
                  <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg text-center space-y-3">
                    <Award className="size-10 mx-auto text-emerald-600 animate-bounce" />
                    <h4 className="font-semibold text-emerald-950">Assessment Passed (100%)</h4>
                    <p className="text-[10px] text-emerald-900/80">Your agent training certificate is now ready.</p>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" onClick={() => toast.success("ShriNeo Agent Training Certificate downloaded successfully.")}>
                        Download Certificate
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCompleteOnboarding}>Submit Onboarding File</Button>
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          {/* STEP 5: MANUAL REVIEW WAITING STATE */}
          {step === "review" && (
            <SectionCard title="KYC & Credential Review In Progress" description="Manual activation pending">
              <div className="space-y-4 text-xs text-center p-6">
                <RefreshCw className="size-8 animate-spin mx-auto text-primary" />
                <h4 className="font-semibold mt-2">Awaiting Verification Officer Signoff</h4>
                <p className="text-muted-foreground max-w-[45ch] mx-auto">
                  Your onboarding credentials and signed agreement have been submitted. If you skipped payout bank details, you may add them in your profile settings while you wait.
                </p>
                <div className="pt-4 border-t border-border flex justify-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.success("Review timeline refreshed: Expected within 24 hours.")}>
                    Refresh Review Status
                  </Button>
                </div>
              </div>
            </SectionCard>
          )}
        </div>

        {/* ONBOARDING CHECKLIST SIDEBAR */}
        <div className="space-y-6">
          <SectionCard title="Activation Checklist">
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>Identity verification completed</span>
              </div>
              <div className={`flex items-center gap-2 ${step !== "otp" ? "text-emerald-700" : "text-muted-foreground"}`}>
                {step !== "otp" ? <CheckCircle2 className="size-4 shrink-0" /> : <Lock className="size-4 shrink-0" />}
                <span>Contacts verified (OTP matched)</span>
              </div>
              <div className={`flex items-center gap-2 ${agree1 && agree2 && agree3 ? "text-emerald-700" : "text-muted-foreground"}`}>
                {agree1 && agree2 && agree3 ? <CheckCircle2 className="size-4 shrink-0" /> : <Lock className="size-4 shrink-0" />}
                <span>Sourcing partner agreement signed</span>
              </div>
              <div className={`flex items-center gap-2 ${!payoutSkipped && bankName ? "text-emerald-700" : payoutSkipped ? "text-amber-700" : "text-muted-foreground"}`}>
                {!payoutSkipped && bankName ? <CheckCircle2 className="size-4 shrink-0" /> : payoutSkipped ? <AlertTriangle className="size-4 shrink-0 text-amber-600" /> : <Lock className="size-4 shrink-0" />}
                <span>Payout bank credentials check {payoutSkipped && "(Skipped)"}</span>
              </div>
              <div className={`flex items-center gap-2 ${trainingCertificate ? "text-emerald-700" : "text-muted-foreground"}`}>
                {trainingCertificate ? <CheckCircle2 className="size-4 shrink-0" /> : <Lock className="size-4 shrink-0" />}
                <span>Mandatory policy test passed</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* QUIZ DIALOG SIMULATOR */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-[500px] rounded-xl border border-border bg-card p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 border-b pb-2">
              <Award className="size-5 text-primary" /> Regulatory Assessment Quiz
            </h3>
            <div>
              <p className="text-xs font-semibold mb-3">
                Question {currentQuizIndex + 1} of {quizQuestions.length}:
              </p>
              <p className="text-xs text-foreground mb-4">
                {quizQuestions[currentQuizIndex]?.q}
              </p>
              <div className="space-y-2">
                {quizQuestions[currentQuizIndex]?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuizAnswer(idx)}
                    className="w-full text-left rounded border border-border p-2.5 text-xs hover:bg-accent transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER DIALOG SIMULATOR */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-[500px] rounded-xl border border-border bg-card p-6 shadow-xl text-center space-y-4">
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

            <div className="pt-2 border-t border-border flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground">Captions: EN/HI matched</span>
              <Button size="sm" onClick={() => { setPlayingVideo(false); setVideoCompleted(true); toast.success("Module 3 video completed."); }}>
                Mark Completed
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
