import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BarChart3, AlertCircle, RefreshCw, CheckCircle2, HelpCircle } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/borrower/cibil-score")({
  head: () => ({
    meta: [
      { title: "CIBIL Score — ShriNeo Capital" },
      { name: "description", content: "Check your TransUnion CIBIL bureau score for free." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CibilScorePage,
});

function CibilScorePage() {
  const { application, account } = usePrototype();
  const [bureauState, setBureauState] = useState<"not-checked" | "checking" | "available" | "NH" | "failed">("available");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (application === "draft" || account === "new") {
      setBureauState("not-checked");
    } else {
      setBureauState("available");
    }
  }, [application, account]);

  const handleCheckScore = (targetState: "available" | "NH" | "failed") => {
    if (!consent) {
      toast.error("Please accept the bureau retrieval terms and conditions first.");
      return;
    }
    setBureauState("checking");
    setTimeout(() => {
      setBureauState(targetState);
      if (targetState === "available") {
        toast.success("CIBIL score retrieved successfully: 742");
      } else if (targetState === "NH") {
        toast.info("Score retrieval returned No History (NH) thin-file status.");
      } else {
        toast.error("Failed to authenticate PAN identity with TransUnion database.");
      }
    }, 2000);
  };

  return (
    <PortalShell
      role="borrower"
      title="CIBIL Score"
      subtitle="Free TransUnion Bureau retrieval via soft query (does not affect your score)"
    >
      <div className="space-y-6">
        {/* State 1: Checking Loader */}
        {bureauState === "checking" && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
            <RefreshCw className="size-8 text-primary animate-spin" />
            <h2 className="mt-4 text-base font-semibold">Retrieving Bureau Score...</h2>
            <p className="mt-2 max-w-[40ch] text-xs text-muted-foreground">
              Establishing secure encrypted API hookup to TransUnion database. This check is a soft inquiry.
            </p>
          </div>
        )}

        {/* State 2: Not Checked / Consent Screen */}
        {bureauState === "not-checked" && (
          <SectionCard title="Bureau Inquiry Authorization" description="Soft pull query terms">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                In compliance with CICRA and RBI lending parameters, we require your explicit authorization to check your credit history with TransUnion CIBIL.
              </p>
              <div className="rounded-lg bg-surface border border-border p-4 text-xs text-muted-foreground space-y-2">
                <p>1. This check is registered as a "Soft Inquiry" and does not impact your credit score.</p>
                <p>2. ShriNeo Capital does not share this report with third parties without your active consent.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <input
                  id="consent-check"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 size-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="consent-check" className="text-xs text-foreground font-medium select-none cursor-pointer">
                  I authorize ShriNeo Capital to retrieve my credit score on my behalf from TransUnion CIBIL.
                </label>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" onClick={() => handleCheckScore("available")}>
                  Retrieve CIBIL Score
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleCheckScore("NH")}>
                  Simulate NH (No History)
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleCheckScore("failed")}>
                  Simulate Failure
                </Button>
              </div>
            </div>
          </SectionCard>
        )}

        {/* State 3: Available */}
        {bureauState === "available" && (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">CIBIL Score</span>
              <span className="text-5xl font-mono font-bold text-foreground mt-3">742</span>
              <span className="mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded px-2.5 py-0.5 border border-emerald-200">GOOD</span>
              <p className="mt-4 text-[10px] text-muted-foreground">Checked 01 Mar 2026</p>
              <Button size="xs" variant="outline" className="mt-5 w-full" onClick={() => setBureauState("not-checked")}>
                <RefreshCw className="size-3 mr-1.5" /> Refresh Score
              </Button>
            </div>

            <div className="md:col-span-2 space-y-6">
              <SectionCard title="Bureau Analysis & Factors">
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">On-time payments (98%)</p>
                      <p className="text-xs text-muted-foreground">Excellent history of credit card and active loan service payments.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Low Credit Utilization (18%)</p>
                      <p className="text-xs text-muted-foreground">Card outstanding amounts are well below the combined credit limit.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Short Account Age (1.4 years)</p>
                      <p className="text-xs text-muted-foreground">Having accounts open longer helps lenders confirm repayment stability.</p>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Dispute & Reporting Guidance">
                <div className="space-y-3 text-sm">
                  <p className="text-xs text-muted-foreground">
                    Notice a mistake in your report? Lenders must resolve CIBIL disputes under RBI guidelines.
                  </p>
                  <Button size="sm" variant="outline" className="flex items-center gap-1.5" onClick={() => toast.info("Dispute checklist downloaded.")}>
                    <HelpCircle className="size-4" /> Download Dispute Checklist
                  </Button>
                </div>
              </SectionCard>

              <SectionCard title="Inquiry Ledger">
                <div className="rounded border border-border bg-surface p-3 text-xs flex justify-between items-center text-muted-foreground">
                  <span>Inquiry ID: <span className="font-mono text-foreground font-semibold">TU-2026-993821</span></span>
                  <span className="font-semibold text-foreground">Soft Query</span>
                </div>
                <p className="mt-2.5 text-[11px] text-muted-foreground italic">
                  “Information query footprint logged as required by credit guidelines.”
                </p>
              </SectionCard>
            </div>
          </div>
        )}

        {/* State 4: NH (No History / Thin File) */}
        {bureauState === "NH" && (
          <SectionCard title="Thin File Status: No History (NH)" description="What this means for your application">
            <div className="space-y-4">
              <div className="rounded-lg bg-surface border border-border p-4 text-sm space-y-2">
                <p className="font-semibold text-foreground">Score Result: NH / No bureau matches found.</p>
                <p className="text-xs text-muted-foreground">
                  This happens if you have never taken a loan, credit card, or post-paid utility mandate in your name. Lenders cannot assess credit history.
                </p>
              </div>
              <div className="rounded-lg border border-[#DDE7F5] bg-white p-5 space-y-3">
                <h4 className="font-semibold text-sm text-foreground">How ShriNeo resolves thin files:</h4>
                <p className="text-xs text-muted-foreground">
                  Our <strong>advisory SNV Trust Score</strong> reads bank account deposits, cashflow stability, and utility mandates, allowing you to qualify even with no bureau records.
                </p>
                <Button size="sm" asChild>
                  <Link to="/app/borrower/snv-trust-score">Go to SNV Trust Score</Link>
                </Button>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setBureauState("not-checked")}>
                Authorize Re-check
              </Button>
            </div>
          </SectionCard>
        )}

        {/* State 5: Failed */}
        {bureauState === "failed" && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-12 text-center">
            <AlertCircle className="size-8 text-red-600" />
            <h2 className="mt-4 text-base font-semibold text-red-950">Identity Verification Failed</h2>
            <p className="mt-2 max-w-[42ch] text-xs text-red-900/80">
              The TransUnion server could not find record matches for your name and PAN number. Ensure your PAN details are identical to your income proof documentation.
            </p>
            <div className="mt-6 flex gap-2">
              <Button size="sm" onClick={() => { setConsent(false); setBureauState("not-checked"); }}>
                Retry Retrieval
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link to="/app/borrower/support">Report Identity Bug</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
