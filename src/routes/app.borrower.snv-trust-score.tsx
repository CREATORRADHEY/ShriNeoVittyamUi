import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Activity, ShieldAlert, RefreshCw, Eye, EyeOff, CheckCircle2 } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/borrower/snv-trust-score")({
  head: () => ({
    meta: [
      { title: "SNV Trust Score — ShriNeo Capital" },
      { name: "description", content: "View your advisory SNV Trust Score for digital lending." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SnvTrustScorePage,
});

function SnvTrustScorePage() {
  const { application, account } = usePrototype();
  const [scoreState, setScoreState] = useState<
    | "not-generated"
    | "processing"
    | "available"
    | "insufficient-data"
    | "recalculation-required"
    | "consent-withdrawn"
  >("available");
  const [sharingConsent, setSharingConsent] = useState(true);

  useEffect(() => {
    if (application === "draft" || account === "new") {
      setScoreState("not-generated");
    } else {
      setScoreState("available");
    }
  }, [application, account]);

  const handleGenerateScore = (targetState: "available" | "insufficient-data") => {
    setScoreState("processing");
    setTimeout(() => {
      setScoreState(targetState);
      if (targetState === "available") {
        toast.success("Advisory SNV Trust Score successfully computed: 68/100");
      } else {
        toast.error("Insufficient data found to compute SNV Trust Score.");
      }
    }, 2500);
  };

  const handleWithdrawConsent = () => {
    setSharingConsent(false);
    toast.success("Sharing permissions restricted. Lenders cannot access your SNV score.");
  };

  const handleGrantConsent = () => {
    setSharingConsent(true);
    toast.success("Sharing permissions enabled for participating lenders.");
  };

  return (
    <PortalShell
      role="borrower"
      title="SNV Trust Score"
      subtitle="Advisory score based on consent-led financial indicators"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-900 text-xs">
          <ShieldAlert className="size-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Advisory Notification Only</p>
            <p className="mt-1">
              The SNV Trust Score is advisory.{" "}
              <strong>The regulated underwriting lender makes the final credit decision.</strong> No
              proprietary scoring weights or internals are exposed.
            </p>
          </div>
        </div>

        {/* State 1: Processing Loader */}
        {scoreState === "processing" && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
            <RefreshCw className="size-8 text-primary animate-spin" />
            <h2 className="mt-4 text-base font-semibold">Calculating SNV Trust Score...</h2>
            <p className="mt-2 max-w-[40ch] text-xs text-muted-foreground">
              Analyzing average bank balances, monthly cashflow ratios, and utility payment signals.
            </p>
          </div>
        )}

        {/* State 2: Not Generated */}
        {scoreState === "not-generated" && (
          <SectionCard
            title="Compute Advisory Trust Score"
            description="Consent to calculate scoring parameters"
          >
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To build your score, we check cashflow data, transaction summaries, and utility
                dates. This helps thinner bureau profiles qualify for lower credit limits.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" onClick={() => handleGenerateScore("available")}>
                  Generate SNV Trust Score
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleGenerateScore("insufficient-data")}
                >
                  Simulate Insufficient Data
                </Button>
              </div>
            </div>
          </SectionCard>
        )}

        {/* State 3: Available */}
        {scoreState === "available" && (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                SNV Trust Score
              </span>
              <span className="text-5xl font-mono font-bold text-foreground mt-3">
                68<span className="text-lg text-muted-foreground">/100</span>
              </span>
              <span className="mt-2 text-xs font-semibold text-primary bg-primary-surface rounded px-2.5 py-0.5 border border-primary/20">
                MODERATE
              </span>
              <p className="mt-4 text-[10px] text-muted-foreground">Generated 10 Mar 2026</p>
              <Button
                size="xs"
                variant="outline"
                className="mt-5 w-full"
                onClick={() => setScoreState("not-generated")}
              >
                <RefreshCw className="size-3 mr-1.5" /> Recalculate Score
              </Button>
            </div>

            <div className="md:col-span-2 space-y-6">
              <SectionCard title="Advisory Scoring Indicators">
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-xs">Positive Balance Trends (AQB)</p>
                      <p className="text-xs text-muted-foreground">
                        Average Quarterly Balances are steady and show positive growth margins.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-xs">Regular Deposit Ratios</p>
                      <p className="text-xs text-muted-foreground">
                        Monthly credit deposits match average salary/business disclosures.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-xs">Steady Residence Tenure</p>
                      <p className="text-xs text-muted-foreground">
                        Time spent at current location matches credit address queries.
                      </p>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                title="Consent & Sharing Ledger"
                actions={
                  sharingConsent ? (
                    <Button
                      size="xs"
                      variant="destructive"
                      onClick={handleWithdrawConsent}
                      className="flex items-center gap-1"
                    >
                      <EyeOff className="size-3" /> Block Sharing
                    </Button>
                  ) : (
                    <Button
                      size="xs"
                      variant="default"
                      onClick={handleGrantConsent}
                      className="flex items-center gap-1"
                    >
                      <Eye className="size-3" /> Enable Sharing
                    </Button>
                  )
                }
              >
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Only lenders listed below can view your advisory SNV score. Withdrawal instantly
                    hides details.
                  </p>
                  <table className="w-full text-xs text-left border-collapse border border-border mt-2">
                    <thead>
                      <tr className="bg-surface border-b border-border">
                        <th className="p-2">Lender</th>
                        <th className="p-2">Date Shared</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-2 font-semibold">SBI Digital Finance</td>
                        <td className="p-2">08 Mar 2026</td>
                        <td className="p-2 text-emerald-700">
                          {sharingConsent ? "Consented (Shared)" : "Blocked"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SectionCard>
            </div>
          </div>
        )}

        {/* State 4: Insufficient Data */}
        {scoreState === "insufficient-data" && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
            <ShieldAlert className="size-8 text-amber-600" />
            <h2 className="mt-4 text-base font-semibold">Calculation Suspended</h2>
            <p className="mt-2 max-w-[40ch] text-xs text-muted-foreground">
              We could not find sufficient digital banking or cashflow data to calculate an advisory
              score. Verify your linked accounts under profile options.
            </p>
            <div className="mt-6 flex gap-2">
              <Button size="sm" onClick={() => setScoreState("not-generated")}>
                Link Bank Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
