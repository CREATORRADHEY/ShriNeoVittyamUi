import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, AlertTriangle, FileUp, ShieldCheck, KeyRound } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/borrower/action-centre")({
  head: () => ({
    meta: [
      { title: "Action Centre — ShriNeo Capital" },
      { name: "description", content: "Resolve pending lender tasks, upload documents and sign agreements." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ActionCentrePage,
});

function ActionCentrePage() {
  const { activeRequest, requests, auditLogs: prototypeAuditLogs, set } = usePrototype();
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success">("idle");
  const [method, setMethod] = useState<"aa" | "upload" | null>(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [receiptRef] = useState(() => `RCP-${Math.floor(100000 + Math.random() * 900000)}`);
  const [submitTime] = useState(() => new Date().toLocaleString("en-IN"));

  const handleUploadSim = () => {
    if (!activeRequest) return;
    setUploadState("uploading");
    setTimeout(() => {
      setUploadState("success");
      const updated = requests.map(r => r.id === activeRequest.id ? { ...r, status: "Submitted" as const } : r);
      set("requests", updated);
      set("application", "submitted"); // Auto advance borrower application status to submitted

      // Log in audit ledger
      const newAuditLog = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString("en-IN", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actor: "Rohit Sharma (Borrower)",
        action: "Doc Submitted",
        details: `Uploaded statements for ${activeRequest.id} (${activeRequest.requiredItem})`
      };
      set("auditLogs", [newAuditLog, ...prototypeAuditLogs]);

      toast.success("Statements uploaded and sent for OCR validation.");
    }, 2000);
  };

  const handleOtpVerify = () => {
    if (otp.length < 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }
    if (!activeRequest) return;
    setUploadState("uploading");
    setTimeout(() => {
      setUploadState("success");
      const updated = requests.map(r => r.id === activeRequest.id ? { ...r, status: "Submitted" as const } : r);
      set("requests", updated);
      set("application", "submitted"); // Auto advance borrower application status to submitted

      // Log in audit ledger
      const newAuditLog = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString("en-IN", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actor: "Rohit Sharma (Borrower)",
        action: "Doc Submitted",
        details: `Submitted statements via AA for ${activeRequest.id} (${activeRequest.requiredItem})`
      };
      set("auditLogs", [newAuditLog, ...prototypeAuditLogs]);

      toast.success("Bank statements successfully retrieved via Account Aggregator.");
    }, 2000);
  };

  return (
    <PortalShell
      role="borrower"
      title="Action Centre"
      subtitle="Complete outstanding items to advance your application"
    >
      {uploadState === "success" ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="size-8" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Clarification Submitted Successfully!</h2>
          <div className="mt-4 w-full max-w-sm rounded-lg bg-surface border border-border p-4 text-left text-xs mx-auto space-y-2">
            <p className="font-semibold text-foreground border-b border-border pb-1">Receipt Summary</p>
            <p><span className="text-muted-foreground">Receipt Ref:</span> <span className="font-mono text-foreground font-semibold">{receiptRef}</span></p>
            <p><span className="text-muted-foreground">Timestamp:</span> <span className="text-foreground">{submitTime}</span></p>
            <p><span className="text-muted-foreground">Current Status:</span> <span className="inline-flex rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-semibold text-blue-700">SUBMITTED</span></p>
            <p><span className="text-muted-foreground">Audit Code:</span> <span className="text-foreground">Auditable record updated in platform timeline</span></p>
          </div>
          <p className="mt-4 max-w-[45ch] text-xs text-muted-foreground">
            Your document has been sent to the lender underwriting team. We will notify you when they complete the review.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/app/borrower">Back to Dashboard</Link>
          </Button>
        </div>
      ) : !activeRequest ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="size-8" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">You're all caught up!</h2>
          <p className="mt-2 max-w-[45ch] text-sm text-muted-foreground">
            No outstanding document requests or actions need your attention. We will notify you if a lender raises queries.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/app/borrower">Back to Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <AlertTriangle className="size-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Action Required on Your Application</p>
              <p className="mt-1 text-xs">
                A participating lender has requested clarification. Submit the required file to resume underwriting review.
              </p>
            </div>
          </div>

          <SectionCard
            title={`Document Request: ${activeRequest.requiredItem}`}
            description={`Request ID: ${activeRequest.id} · Due by ${activeRequest.dueDate}`}
            actions={<span className="text-xs text-red-600 font-semibold bg-red-50 border border-red-200 rounded px-2.5 py-0.5">PENDING</span>}
          >
            <div className="space-y-4">
              <div className="rounded-lg bg-surface border border-border p-4 text-sm">
                <dl className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-muted-foreground text-xs">Requesting Party</dt>
                    <dd className="font-semibold text-foreground mt-0.5">SBI Digital Finance (Underwriting)</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Reason for Request</dt>
                    <dd className="text-foreground mt-0.5">{activeRequest.reason}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Accepted Formats</dt>
                    <dd className="text-foreground mt-0.5">{activeRequest.acceptedFormat}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Visibility</dt>
                    <dd className="text-xs text-emerald-700 font-mono mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="size-3.5" /> {activeRequest.recipientVisibility}
                    </dd>
                  </div>
                </dl>
              </div>

              {uploadState === "idle" && !method && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setMethod("aa")}
                    className="flex flex-col items-center justify-center border border-border bg-card hover:border-primary rounded-xl p-5 text-center transition-colors"
                  >
                    <KeyRound className="size-6 text-primary" />
                    <p className="mt-3 font-semibold text-foreground text-sm">Verify via Account Aggregator</p>
                    <p className="mt-1 text-xs text-muted-foreground">Automated, secure, and password-free</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("upload")}
                    className="flex flex-col items-center justify-center border border-border bg-card hover:border-primary rounded-xl p-5 text-center transition-colors"
                  >
                    <FileUp className="size-6 text-primary" />
                    <p className="mt-3 font-semibold text-foreground text-sm">Upload PDF Statements</p>
                    <p className="mt-1 text-xs text-muted-foreground">Select statements file from your device</p>
                  </button>
                </div>
              )}

              {method === "aa" && uploadState === "idle" && (
                <div className="rounded-lg border border-border p-4 space-y-4">
                  <h3 className="font-semibold text-sm text-foreground">Account Aggregator (Consent Manager)</h3>
                  <p className="text-xs text-muted-foreground">
                    We will fetch digital bank data via Finvu. Enter the OTP sent to your linked mobile number (+91 ******3210).
                  </p>
                  {!otpSent ? (
                    <Button size="sm" onClick={() => { setOtpSent(true); toast.info("OTP sent to your linked mobile."); }}>
                      Request Verification OTP
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="otp-input" className="block text-xs font-semibold text-muted-foreground mb-1">
                          Enter 4-Digit OTP
                        </label>
                        <input
                          id="otp-input"
                          type="text"
                          maxLength={4}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                          placeholder="XXXX"
                          className="w-32 rounded border border-input bg-background px-3 py-1.5 text-center font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleOtpVerify}>
                          Submit & Verify
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { setMethod(null); setOtpSent(false); setOtp(""); }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {method === "upload" && uploadState === "idle" && (
                <div className="rounded-lg border border-border p-5 text-center space-y-3">
                  <FileUp className="size-8 text-muted-foreground mx-auto" />
                  <p className="text-sm font-semibold">Select bank statement file</p>
                  <p className="text-xs text-muted-foreground">PDF size limit 10MB. Must cover recent 6 months.</p>
                  <div className="flex justify-center gap-2">
                    <Button size="sm" onClick={handleUploadSim}>
                      Choose PDF File
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setMethod(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {uploadState === "uploading" && (
                <div className="rounded-lg border border-border p-8 text-center space-y-3">
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-semibold">Retrieving bank statements securely...</p>
                  <p className="text-xs text-muted-foreground">Establishing secure API channel to verification partner.</p>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      )}
    </PortalShell>
  );
}
