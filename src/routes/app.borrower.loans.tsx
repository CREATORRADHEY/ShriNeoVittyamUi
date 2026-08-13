import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wallet,
  ShieldAlert,
  CheckCircle2,
  FileDown,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/app/borrower/loans")({
  head: () => ({
    meta: [
      { title: "My Loans — ShriNeo Capital" },
      {
        name: "description",
        content: "Track active and closed loans, outstanding balances and statements.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: BorrowerLoansPage,
});

function BorrowerLoansPage() {
  const { application, account, data, activeLoan, activePayment } = usePrototype();
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (certType: string) => {
    setDownloading(certType);
    setTimeout(() => {
      setDownloading(null);
      toast.success(`${certType} downloaded successfully.`);
    }, 1500);
  };

  const isNewOrEmpty =
    account === "new" || data === "empty" || (!activeLoan && application !== "closed");

  return (
    <PortalShell
      role="borrower"
      title="My Loans"
      subtitle="Track active loan balances, repayment timelines, and closed certificates"
    >
      {isNewOrEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <Wallet className="size-6" />
          </div>
          <h2 className="mt-4 text-base font-semibold">You do not have a loan yet</h2>
          <p className="mt-2 max-w-[45ch] text-xs text-muted-foreground">
            Once a lender disburses an approved application, the loan details, interest statement,
            and outstanding balance will appear here.
          </p>
          <Button asChild className="mt-6">
            <Link to="/app/borrower/apply">Explore Loan Products</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {account === "restricted" && (
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 text-xs">
              <ShieldAlert className="size-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Loan Servicing Under Restriction</p>
                <p className="mt-1">
                  Your borrower profile is in review. Repayment collection continues automatically
                  via NACH, but modifying bank details or requesting new closures is disabled.
                </p>
              </div>
            </div>
          )}

          {/* ACTIVE LOAN VIEW */}
          {activeLoan && application !== "closed" && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <SectionCard
                  title={`Personal Loan: ${activeLoan.id}`}
                  description="SBI Digital Finance · Sanctioned on 08 Mar 2026"
                  actions={
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 font-semibold px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  }
                >
                  <dl className="grid gap-4 sm:grid-cols-3 text-sm border-b border-border pb-4">
                    <div>
                      <dt className="text-muted-foreground text-xs">Sanctioned Amount</dt>
                      <dd className="font-semibold text-foreground text-lg mt-0.5">
                        {formatINR(activeLoan.amount)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-xs">Tenure & Rate</dt>
                      <dd className="font-semibold text-foreground text-lg mt-0.5">
                        {activeLoan.tenure} Months @ 11.5%
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-xs">Outstanding Balance</dt>
                      <dd className="font-semibold text-foreground text-lg mt-0.5">
                        {formatINR(284350)}
                      </dd>
                    </div>
                  </dl>

                  <div className="pt-4 space-y-3">
                    <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                      Historical Repayments Ledger
                    </h4>
                    <div className="divide-y divide-border text-xs">
                      {[
                        { num: "EMI #1", date: "05 Oct 2025", amt: 11540, status: "Paid via NACH" },
                        { num: "EMI #2", date: "05 Nov 2025", amt: 11540, status: "Paid via NACH" },
                        { num: "EMI #3", date: "05 Dec 2025", amt: 11540, status: "Paid via NACH" },
                        { num: "EMI #4", date: "05 Jan 2026", amt: 11540, status: "Paid via NACH" },
                        { num: "EMI #5", date: "05 Feb 2026", amt: 11540, status: "Paid via NACH" },
                        { num: "EMI #6", date: "05 Mar 2026", amt: 11540, status: "Paid via NACH" },
                      ].map((item) => (
                        <div key={item.num} className="flex justify-between py-2 items-center">
                          <div>
                            <span className="font-semibold text-foreground">{item.num}</span> ·{" "}
                            <span className="text-muted-foreground">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-700 font-medium">{item.status}</span>
                            <button
                              type="button"
                              onClick={() => handleDownload(`Receipt-${item.num}`)}
                              className="text-primary hover:underline"
                            >
                              Receipt
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              </div>

              {/* SERVICING ACTIONS PANEL */}
              <div className="space-y-6">
                <SectionCard
                  title="Servicing Panel"
                  description="Download logs and legal disclosures"
                >
                  <div className="space-y-3 flex flex-col">
                    <Button
                      size="sm"
                      variant="outline"
                      className="justify-between"
                      disabled={downloading !== null}
                      onClick={() => handleDownload("Interest Certificate")}
                    >
                      <span>Interest Certificate (FY26)</span>
                      <FileDown className="size-4 text-muted-foreground" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="justify-between"
                      disabled={downloading !== null}
                      onClick={() => handleDownload("Amortization Schedule")}
                    >
                      <span>Amortization Schedule</span>
                      <FileDown className="size-4 text-muted-foreground" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="justify-between"
                      disabled={downloading !== null || account === "restricted"}
                      onClick={() => handleDownload("Foreclosure Letter")}
                    >
                      <span>Request Foreclosure statement</span>
                      <FileDown className="size-4 text-muted-foreground" />
                    </Button>
                  </div>
                </SectionCard>

                <SectionCard title="Lender Support Bridge">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This account is managed directly by <strong>SBI Digital Finance</strong>. For
                    credit queries or restructuring options, visit their portal.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full flex items-center gap-1.5 justify-center"
                    onClick={() => window.open("https://sbi.co.in", "_blank")}
                  >
                    Go to SBI Support <ExternalLink className="size-3.5" />
                  </Button>
                </SectionCard>
              </div>
            </div>
          )}

          {/* CLOSED LOAN VIEW */}
          {application === "closed" && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <SectionCard
                  title="Closed Loan Account"
                  description="SBI Digital Finance · Account ID: LN-2026-092"
                  actions={
                    <span className="text-[10px] text-neutral-800 bg-neutral-100 border border-neutral-300 font-semibold px-2 py-0.5 rounded">
                      CLOSED
                    </span>
                  }
                >
                  <dl className="grid gap-4 sm:grid-cols-3 text-sm border-b border-border pb-4">
                    <div>
                      <dt className="text-muted-foreground text-xs">Sanctioned Amount</dt>
                      <dd className="font-semibold text-foreground text-lg mt-0.5">
                        {formatINR(350000)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-xs">Tenure & Close Date</dt>
                      <dd className="font-semibold text-foreground text-lg mt-0.5">
                        36 Months · 10 Mar 2026
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-xs">Outstanding Balance</dt>
                      <dd className="font-semibold text-foreground text-lg mt-0.5">
                        {formatINR(0)}
                      </dd>
                    </div>
                  </dl>

                  <div className="pt-4 flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded p-4">
                    <CheckCircle2 className="size-5 shrink-0 mt-0.5 text-emerald-600" />
                    <div>
                      <p className="font-semibold">No Objection Certificate Issued</p>
                      <p className="mt-1">
                        All EMIs were paid on time. No dues remain. Download your official NOC from
                        SBI below.
                      </p>
                    </div>
                  </div>
                </SectionCard>
              </div>

              <div className="space-y-6">
                <SectionCard title="Certificates & Forms">
                  <div className="space-y-3 flex flex-col">
                    <Button
                      size="sm"
                      variant="default"
                      className="justify-between"
                      disabled={downloading !== null}
                      onClick={() => handleDownload("NOC Closure Certificate")}
                    >
                      <span>Download NOC Certificate</span>
                      <FileDown className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="justify-between"
                      disabled={downloading !== null}
                      onClick={() => handleDownload("Final Statement of Account")}
                    >
                      <span>Final Statement of Account</span>
                      <FileDown className="size-4 text-muted-foreground" />
                    </Button>
                  </div>
                </SectionCard>
              </div>
            </div>
          )}
        </div>
      )}
    </PortalShell>
  );
}
