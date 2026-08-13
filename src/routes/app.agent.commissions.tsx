import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeIndianRupee,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  RefreshCw,
  X,
} from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard } from "@/components/states";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/app/agent/commissions")({
  head: () => ({
    meta: [
      { title: "Commissions Ledger — ShriNeo Capital" },
      {
        name: "description",
        content: "Track earned, pending, paid and reversed commissions with statutory audits.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AgentCommissionsPage,
});

interface CommissionRow {
  id: string;
  fileId: string;
  lenderRef: string;
  disbursalDate: string;
  loanAmount: number;
  grossCommission: number;
  tds: number;
  netPayout: number;
  status: "earned" | "pending" | "paid" | "held" | "reversed";
  payoutDate: string;
  bankStatus: string;
  reversalReason?: string;
}

function AgentCommissionsPage() {
  const { data } = usePrototype();

  const [commissions, setCommissions] = useState<CommissionRow[]>([
    {
      id: "COM-101",
      fileId: "APP-2026-001284",
      lenderRef: "SBI-DISB-992014",
      disbursalDate: "09 Mar 2026",
      loanAmount: 350000,
      grossCommission: 10500,
      tds: 1050,
      netPayout: 9450,
      status: "paid",
      payoutDate: "12 Mar 2026",
      bankStatus: "Transferred successfully to HDFC *9911",
    },
    {
      id: "COM-102",
      fileId: "APP-2026-009912",
      lenderRef: "HDFC-DISB-883012",
      disbursalDate: "05 Mar 2026",
      loanAmount: 500000,
      grossCommission: 15000,
      tds: 1500,
      netPayout: 13500,
      status: "pending",
      payoutDate: "18 Mar 2026",
      bankStatus: "Approved, awaiting settlement run",
    },
    {
      id: "COM-103",
      fileId: "APP-2026-008241",
      lenderRef: "KAV-DISB-772901",
      disbursalDate: "18 Feb 2026",
      loanAmount: 200000,
      grossCommission: 6000,
      tds: 600,
      netPayout: 5400,
      status: "reversed",
      payoutDate: "—",
      bankStatus: "Ledger clawback adjusted",
      reversalReason: "Early foreclosure within 30 days of disbursal",
    },
    {
      id: "COM-104",
      fileId: "APP-2026-006612",
      lenderRef: "ICI-DISB-551022",
      disbursalDate: "10 Feb 2026",
      loanAmount: 450000,
      grossCommission: 13500,
      tds: 1350,
      netPayout: 12150,
      status: "held",
      payoutDate: "—",
      bankStatus: "Verification hold (Awaiting penny-drop fix)",
    },
  ]);

  const [disputeOpen, setDisputeOpen] = useState(false);
  const [selectedCommId, setSelectedCommId] = useState<string | null>(null);
  const [disputeText, setDisputeText] = useState("");

  const handleOpenDispute = (id: string) => {
    setSelectedCommId(id);
    setDisputeOpen(true);
  };

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeText.trim()) {
      toast.error("Please enter details regarding your dispute appeal.");
      return;
    }
    toast.success("Dispute appeal logged with GRO support desk. Review scheduled in 3 days.");
    setDisputeOpen(false);
    setDisputeText("");
  };

  const isNewOrEmpty = data === "empty";

  return (
    <PortalShell
      role="agent"
      title="Commissions Ledger"
      subtitle="Detailed statutory breakdown of sourced commissions, TDS, and clawback audits"
    >
      {isNewOrEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <BadgeIndianRupee className="size-6" />
          </div>
          <h2 className="mt-4 text-base font-semibold">No commission entries yet</h2>
          <p className="mt-2 max-w-[45ch] text-xs text-muted-foreground">
            Commission entries populate automatically the moment a borrower file you sourced is
            disbursed by a lender.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <KpiCard label="Earned this Month" value={formatINR(25500)} tone="success" />
            <KpiCard label="Pending Settlement" value={formatINR(13500)} />
            <KpiCard label="Held on Audit hold" value={formatINR(12150)} tone="warning" />
            <KpiCard label="Reversed Clawbacks" value={formatINR(5400)} tone="neutral" />
          </div>

          {/* COMMISSIONS TABLE */}
          <SectionCard
            title="Commission Ledger Records"
            actions={
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success("Ledger Excel sheet downloaded.")}
              >
                Download Ledger
              </Button>
            }
          >
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-surface text-muted-foreground font-semibold">
                    <th scope="col" className="p-3">
                      Reference ID
                    </th>
                    <th scope="col" className="p-3">
                      File ID
                    </th>
                    <th scope="col" className="p-3">
                      Lender Disbursal ID
                    </th>
                    <th scope="col" className="p-3">
                      Date
                    </th>
                    <th scope="col" className="p-3">
                      Sanction Amount
                    </th>
                    <th scope="col" className="p-3">
                      Gross
                    </th>
                    <th scope="col" className="p-3">
                      TDS (10%)
                    </th>
                    <th scope="col" className="p-3">
                      Net Payout
                    </th>
                    <th scope="col" className="p-3">
                      Status
                    </th>
                    <th scope="col" className="p-3 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commissions.map((c) => (
                    <tr key={c.id} className="border-b border-border text-xs">
                      <td className="p-3 font-semibold text-foreground">{c.id}</td>
                      <td className="p-3 text-muted-foreground">{c.fileId}</td>
                      <td className="p-3 font-mono text-muted-foreground">{c.lenderRef}</td>
                      <td className="p-3 text-muted-foreground">{c.disbursalDate}</td>
                      <td className="num p-3 text-foreground">{formatINR(c.loanAmount)}</td>
                      <td className="num p-3 text-foreground">{formatINR(c.grossCommission)}</td>
                      <td className="num p-3 text-red-700">-{formatINR(c.tds)}</td>
                      <td className="num p-3 text-foreground font-semibold">
                        {formatINR(c.netPayout)}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-semibold uppercase ${c.status === "paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : c.status === "pending" ? "bg-blue-50 text-blue-700 border border-blue-200" : c.status === "held" ? "bg-amber-50 text-amber-700 border border-amber-200" : c.status === "reversed" ? "bg-red-50 text-red-700 border border-red-200" : "bg-neutral-100 text-muted-foreground"}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {c.status === "reversed" ? (
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => handleOpenDispute(c.id)}
                          >
                            Dispute Clawback
                          </Button>
                        ) : c.status === "held" ? (
                          <span className="text-[10px] text-amber-700 italic">
                            Check bank details
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* DISPUTE APPEAL FORM DIALOG */}
          {disputeOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <form
                onSubmit={handleSubmitDispute}
                className="w-full max-w-[420px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] space-y-4"
              >
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                    <AlertTriangle className="size-5 text-red-600" /> Dispute Commission Reversal
                  </h3>
                  <button
                    type="button"
                    onClick={() => setDisputeOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <p className="text-muted-foreground">
                    Appealing clawback adjustment for <strong>{selectedCommId}</strong>. Under
                    statutory guidelines, early prepayment disputes are reviewed by ShriNeo GRO
                    committee.
                  </p>
                  <div>
                    <label
                      htmlFor="disp-details"
                      className="block text-xs font-semibold text-muted-foreground mb-1"
                    >
                      Appeal Reason & Details
                    </label>
                    <textarea
                      id="disp-details"
                      required
                      rows={4}
                      value={disputeText}
                      onChange={(e) => setDisputeText(e.target.value)}
                      placeholder="Explain why the foreclosure should not reverse the sourced commission (e.g. prior consent exception)."
                      className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setDisputeOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Submit Dispute
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </PortalShell>
  );
}
