import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, ShieldAlert, KeyRound, AlertTriangle, Send, FileText, CheckCircle2, Lock, Eye, AlertCircle, ArrowLeft } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

type WorkbenchSearch = {
  id?: string | undefined;
};

export const Route = createFileRoute("/app/lender/workbench")({
  validateSearch: (search: Record<string, unknown>): WorkbenchSearch => {
    return {
      id: search.id ? String(search.id) : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Underwriter Workbench — ShriNeo Capital" },
      { name: "description", content: "Dense credit analysis interface for matched loans under RBI compliance." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LenderWorkbenchPage,
});

function LenderWorkbenchPage() {
  const { data, requests, auditLogs: prototypeAuditLogs, set } = usePrototype();
  const search = Route.useSearch();

  // Search parameters or active file selection
  const [activeFileId, setActiveFileId] = useState(search.id || "SNV-24-118198");
  
  // PII masking state
  const [piiMasked, setPiiMasked] = useState(true);
  const [unmaskOpen, setUnmaskOpen] = useState(false);
  const [unmaskReason, setUnmaskReason] = useState("");
  const [auditLogs, setAuditLogs] = useState<string[]>([
    "Initial file automated integrity validation passed 12 Mar 09:00"
  ]);

  // Offered loan parameters for KFS customization
  const [customAmount, setCustomAmount] = useState(350000);
  const [customRate, setCustomRate] = useState(14.2);
  const [customTenure, setCustomTenure] = useState(36);
  const [customFee, setCustomFee] = useState(3500);

  // Info Request states
  const [infoRequestOpen, setInfoRequestOpen] = useState(false);
  const [infoReqField, setInfoReqField] = useState("Bank Statement");
  const [infoReqText, setInfoReqText] = useState("");
  const [infoReqDueDate, setInfoReqDueDate] = useState("2026-03-20");
  const [infoReqInternalNotes, setInfoReqInternalNotes] = useState("");

  // Decision state
  const [decisionMode, setDecisionMode] = useState<"none" | "approve" | "reject" | "fraud">("none");
  const [declineReason, setDeclineReason] = useState("");
  const [decisionDone, setDecisionDone] = useState<string | null>(null);

  const handleUnmaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unmaskReason.trim()) {
      toast.error("Please enter a valid unmask reason for audit compliance.");
      return;
    }
    setPiiMasked(false);
    setUnmaskOpen(false);
    const newLog = `PII Unmasked at ${new Date().toLocaleTimeString()} by UW-994. Reason: "${unmaskReason}"`;
    setAuditLogs(prev => [newLog, ...prev]);
    setUnmaskReason("");
    toast.success("PII successfully unmasked. Action logged in global audit logs.");
  };

  const handleSendInfoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!infoReqText.trim()) return;
    const newReqId = `REQ-${Math.floor(800000 + Math.random() * 199999)}`;
    
    // Also log this query in audit ledger
    const auditMsg = `Clarification raised (${newReqId}) for item "${infoReqField}". Reason: "${infoReqText}". Internal notes: "${infoReqInternalNotes || 'None'}"`;
    setAuditLogs(prev => [auditMsg, ...prev]);

    // Push canonical request to shared state
    const canonicalReq = {
      id: newReqId,
      appId: "APP-2026-001284",
      lenderId: "L-904",
      requiredItem: infoReqField,
      reason: infoReqText,
      requestDate: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }),
      dueDate: infoReqDueDate,
      acceptedFormat: "Clear decrypted PDF / Account Aggregator consent",
      status: "New" as const,
      recipientVisibility: "SBI Underwriting Team only"
    };
    set("requests", [canonicalReq, ...requests]);
    set("application", "documents-required"); // Switch application stage to documents-required so it updates borrower view

    // Push audit event to shared audit logs
    const canonicalAudit = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString("en-IN", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      actor: "L-904 (SBI)",
      action: "Info Requested",
      details: `Requested re-upload of ${infoReqField} (${newReqId})`
    };
    set("auditLogs", [canonicalAudit, ...prototypeAuditLogs]);

    setInfoRequestOpen(false);
    setInfoReqText("");
    setInfoReqInternalNotes("");
    toast.success(`Info request ${newReqId} pushed to borrower Action Centre.`);
  };

  const handleDecisionSubmit = (type: "Approved" | "Rejected" | "Fraud Review") => {
    if (type === "Rejected" && !declineReason) {
      toast.error("Please select a decline reason code.");
      return;
    }
    setDecisionDone(type);

    // Push decision audit logs and update shared application status
    if (type === "Approved") {
      set("application", "approved");
      const canonicalAudit = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString("en-IN", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actor: "L-904 (SBI Underwriter)",
        action: "Sanction Approved",
        details: `Application approved for disbursement. Offered Loan: ₹${formatINR(customAmount)} at ${customRate}% APR for ${customTenure}M.`
      };
      set("auditLogs", [canonicalAudit, ...prototypeAuditLogs]);
    } else if (type === "Rejected") {
      set("application", "rejected");
      const canonicalAudit = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString("en-IN", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actor: "L-904 (SBI Underwriter)",
        action: "Decline Confirmed",
        details: `Application declined. Declination Reason Code: ${declineReason}.`
      };
      set("auditLogs", [canonicalAudit, ...prototypeAuditLogs]);
    } else if (type === "Fraud Review") {
      set("application", "manual-review");
      const canonicalAudit = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString("en-IN", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actor: "L-904 (SBI Underwriter)",
        action: "Risk Escalate",
        details: `Application escalated to specialized Fraud & Anti-Money Laundering review team.`
      };
      set("auditLogs", [canonicalAudit, ...prototypeAuditLogs]);
    }

    toast.success(`Application credit status updated: ${type}`);
    setDecisionMode("none");
  };

  return (
    <PortalShell
      role="lender"
      title="Underwriting Workbench"
      subtitle="Analyze credit proposals, request clarifications, and make credit decisions"
    >
      <div className="space-y-6 text-xs">
        {/* TOP META ROW */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 bg-surface p-3 rounded-lg">
          <div>
            <span className="text-muted-foreground">Active Case File</span>
            <h3 className="text-sm font-bold text-foreground mt-0.5">{activeFileId} (Business Loan)</h3>
          </div>
          <div className="flex gap-2">
            {piiMasked ? (
              <Button size="xs" onClick={() => setUnmaskOpen(true)} className="flex items-center gap-1">
                <Eye className="size-3" /> Unmask PII Details
              </Button>
            ) : (
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2.5 py-1 font-semibold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" /> PII Unmasked (Logged)
              </span>
            )}
            <Button size="xs" variant="outline" onClick={() => setInfoRequestOpen(true)}>
              Raise Info Query
            </Button>
          </div>
        </div>

        {/* WORKBENCH DETAILS GRID */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* LENDER-SPECIFIC KEY FACT STATEMENT (KFS) PREVIEW COMPONENT */}
            <SectionCard title="Key Fact Statement (KFS) Preview" description="Statutory loan terms computed dynamically for borrower disclosure">
              <div className="rounded-lg border border-border bg-surface p-4 space-y-4">
                {/* Underwriter KFS input controls */}
                <div className="grid gap-3 sm:grid-cols-4 bg-card p-3 rounded border border-border mb-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground mb-1">Offer Amount (₹)</label>
                    <input
                      type="number"
                      step={10000}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(Number(e.target.value))}
                      className="w-full rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary num"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground mb-1">Interest Rate (% APR)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={customRate}
                      onChange={(e) => setCustomRate(Number(e.target.value))}
                      className="w-full rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary num"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground mb-1">Tenure (Months)</label>
                    <input
                      type="number"
                      value={customTenure}
                      onChange={(e) => setCustomTenure(Number(e.target.value))}
                      className="w-full rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary num"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground mb-1">Upfront Fee (₹)</label>
                    <input
                      type="number"
                      step={500}
                      value={customFee}
                      onChange={(e) => setCustomFee(Number(e.target.value))}
                      className="w-full rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary num"
                    />
                  </div>
                </div>

                {/* Computed Preview Results */}
                {(() => {
                  const r = customRate / 1200;
                  const dynamicEmi = r > 0 ? Math.round((customAmount * r * Math.pow(1 + r, customTenure)) / (Math.pow(1 + r, customTenure) - 1)) : Math.round(customAmount / customTenure);
                  const dynamicTotalCost = (dynamicEmi * customTenure) + customFee;
                  return (
                    <>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Loan Amount Sanction</span>
                          <span className="font-bold text-foreground block text-sm mt-0.5">{formatINR(customAmount)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Interest Rate (APR)</span>
                          <span className="font-bold text-foreground block text-sm mt-0.5">{customRate.toFixed(1)}% p.a.</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Tenure (Months)</span>
                          <span className="font-bold text-foreground block text-sm mt-0.5">{customTenure} Months</span>
                        </div>
                      </div>

                      <div className="border-t border-border pt-3 grid gap-4 sm:grid-cols-3">
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Processing upfront fees</span>
                          <span className="font-semibold text-foreground block mt-0.5">{formatINR(customFee)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Monthly EMI Repayment</span>
                          <span className="font-semibold text-primary block mt-0.5">{formatINR(dynamicEmi)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Total Cost of Credit</span>
                          <span className="font-semibold text-foreground block mt-0.5">{formatINR(dynamicTotalCost)}</span>
                        </div>
                      </div>
                    </>
                  );
                })()}

                <p className="text-[10px] text-muted-foreground">
                  *Disclaimer: KFS preview represents indicative quote values based on current bureau soft pulls. Regulated lender makes final credit verification.
                </p>
              </div>
            </SectionCard>

            {/* CREDITS & BANK SIGNALS */}
            <SectionCard title="Underwriting Financial Signals" description="Bureau results and bank-led cash flow analytics">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-3 border border-border rounded bg-card">
                  <span className="font-bold text-foreground block mb-2">Bureau Soft Pull Checks</span>
                  <dl className="space-y-1.5">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">CIBIL Score</dt>
                      <dd className="font-semibold text-foreground">688 / 900</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Active Trade Lines</dt>
                      <dd className="text-foreground">4 accounts</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Enquiries (Last 30d)</dt>
                      <dd className="text-foreground">1</dd>
                    </div>
                  </dl>
                </div>

                <div className="p-3 border border-border rounded bg-card">
                  <span className="font-bold text-foreground block mb-2">SNV Trust Score Analytics</span>
                  <dl className="space-y-1.5">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Trust Category</dt>
                      <dd className="font-semibold text-foreground">B (Advisory)</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Average Quarterly Balance</dt>
                      <dd className="text-foreground">{formatINR(48200)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Cheque Bounces (6m)</dt>
                      <dd className="text-foreground">0</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </SectionCard>

            {/* AUDIT COMPLIANCE LOG */}
            <SectionCard title="PII Unmasking Access Audits">
              <div className="space-y-2 max-h-36 overflow-y-auto rounded border border-border bg-surface p-3 font-mono text-[10px]">
                {auditLogs.map((log, i) => (
                  <p key={i} className="text-muted-foreground border-b border-border/50 pb-1.5 last:border-0">{log}</p>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* SIDEBAR DECISION & QUERY CHANNELS */}
          <div className="space-y-6">
            {/* UNDERWRITING DECISION PANEL */}
            <SectionCard title="Underwriting Credit Decision">
              {decisionDone ? (
                <div className={`p-4 rounded border text-center font-semibold uppercase ${decisionDone === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : decisionDone === "Rejected" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                  {decisionDone}
                </div>
              ) : (
                <div className="space-y-3 flex flex-col">
                  {decisionMode === "none" ? (
                    <>
                      <Button size="sm" onClick={() => setDecisionMode("approve")}>
                        Sanction Approve File
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-700 border-red-200 hover:bg-red-50" onClick={() => setDecisionMode("reject")}>
                        Reject Application
                      </Button>
                      <Button size="sm" variant="secondary" className="text-amber-800 border-amber-200" onClick={() => setDecisionMode("fraud")}>
                        Escalate to Risk Review
                      </Button>
                    </>
                  ) : decisionMode === "approve" ? (
                    <div className="space-y-3 p-3 border border-border rounded bg-surface">
                      <p className="font-semibold text-foreground">Confirm final approval for loan disbursal?</p>
                      <div className="flex gap-2">
                        <Button size="xs" onClick={() => handleDecisionSubmit("Approved")}>Confirm Approval</Button>
                        <Button size="xs" variant="ghost" onClick={() => setDecisionMode("none")}>Cancel</Button>
                      </div>
                    </div>
                  ) : decisionMode === "reject" ? (
                    <div className="space-y-3 p-3 border border-border rounded bg-surface">
                      <p className="font-semibold text-foreground">Select Decline Reason Code</p>
                      <select
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                        className="w-full rounded border border-border bg-card p-1.5 focus:outline-none"
                      >
                        <option value="">-- Select code --</option>
                        <option value="CIBIL_LOW">CIBIL Score below threshold</option>
                        <option value="INC_LOW">Insufficient cash flow ratio</option>
                        <option value="DOC_MIS">Verification mismatch discrepancy</option>
                      </select>
                      <div className="flex gap-2 pt-2">
                        <Button size="xs" variant="destructive" onClick={() => handleDecisionSubmit("Rejected")}>Confirm Decline</Button>
                        <Button size="xs" variant="ghost" onClick={() => setDecisionMode("none")}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 p-3 border border-border rounded bg-surface">
                      <p className="font-semibold text-foreground">Send to Fraud & Anti-Money Laundering review team?</p>
                      <div className="flex gap-2">
                        <Button size="xs" variant="destructive" onClick={() => handleDecisionSubmit("Fraud Review")}>Yes, Flag File</Button>
                        <Button size="xs" variant="ghost" onClick={() => setDecisionMode("none")}>Cancel</Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </SectionCard>

            {/* OUTWARD INFO QUERIES */}
            <SectionCard title="Action Centre Queries">
              <div className="space-y-3">
                {requests.map((req) => (
                  <div key={req.id} className="p-2.5 rounded border border-border bg-surface flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground">{req.id}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {req.requiredItem} request: "{req.reason}" (Due: {req.dueDate})
                      </p>
                    </div>
                    <span className="text-[10px] text-blue-700 font-semibold uppercase">{req.status}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* UNMASK REASON POPUP */}
        {unmaskOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <form onSubmit={handleUnmaskSubmit} className="w-full max-w-[420px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                  <KeyRound className="size-5 text-primary" /> Log Unmask Reason
                </h3>
              </div>

              <div className="space-y-3">
                <p className="text-muted-foreground text-xs leading-relaxed">
                  RBI guidelines require stating a clear credit-operation justification before unmasking borrower initials or PAN records.
                </p>
                <div>
                  <label htmlFor="unmask-reason" className="block text-xs font-semibold text-muted-foreground mb-1">Unmasking Justification</label>
                  <textarea
                    id="unmask-reason"
                    required
                    rows={3}
                    value={unmaskReason}
                    onChange={(e) => setUnmaskReason(e.target.value)}
                    placeholder="Enter audit explanation (e.g. Verify address discrepancies against electricity bill)"
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setUnmaskOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm">Authorize & Unmask</Button>
              </div>
            </form>
          </div>
        )}

        {/* INFO QUERY FORM POPUP */}
        {infoRequestOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <form onSubmit={handleSendInfoRequest} className="w-full max-w-[420px] rounded-xl border border-border bg-card p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                  <Send className="size-5 text-primary" /> Request Client Clarification
                </h3>
              </div>

              <div className="space-y-3">
                <p className="text-muted-foreground text-[10px] leading-relaxed">
                  This request will populate instantly in the borrower's <strong>Action Centre</strong> checklist. SMS notifications will be dispatched automatically.
                </p>
                
                <div>
                  <label htmlFor="info-req-field" className="block text-xs font-semibold text-muted-foreground mb-1">Required Item / Field</label>
                  <select
                    id="info-req-field"
                    value={infoReqField}
                    onChange={(e) => setInfoReqField(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Bank Statement">Bank Statement (6 Months)</option>
                    <option value="PAN Card">PAN Card (Blurred Check)</option>
                    <option value="ITR Verification">Form 16 / ITR</option>
                    <option value="Utility Bill">Address Proof / Electricity Bill</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="info-req-desc" className="block text-xs font-semibold text-muted-foreground mb-1">Borrower-facing Reason</label>
                  <textarea
                    id="info-req-desc"
                    required
                    rows={2}
                    value={infoReqText}
                    onChange={(e) => setInfoReqText(e.target.value)}
                    placeholder="Describe what the borrower needs to do (e.g. Please upload a clear digital copy of your PAN card)"
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="info-req-date" className="block text-xs font-semibold text-muted-foreground mb-1">Request Due Date</label>
                    <input
                      id="info-req-date"
                      type="date"
                      required
                      value={infoReqDueDate}
                      onChange={(e) => setInfoReqDueDate(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Recipient Visibility</label>
                    <span className="inline-block rounded border border-[#DDE7F5] bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-800">
                      SBI Finance Only
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="info-req-notes" className="block text-xs font-semibold text-muted-foreground mb-1">Internal Underwriter Notes (Confidential)</label>
                  <textarea
                    id="info-req-notes"
                    rows={2}
                    value={infoReqInternalNotes}
                    onChange={(e) => setInfoReqInternalNotes(e.target.value)}
                    placeholder="Private underwriter audit remarks (not shared with borrower or agent)"
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setInfoRequestOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm">Send Query</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
