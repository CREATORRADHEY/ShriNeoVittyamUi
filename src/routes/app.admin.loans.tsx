import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, IndianRupee, FileText, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Send } from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/loans")({
  head: () => ({
    meta: [
      { title: "Loan oversight — ShriNeo Capital" },
      { name: "description", content: "Review total disbursements, active portfolio status and investigate stuck loan files." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoansPage,
});

interface LoanCase {
  id: string;
  borrowerName: string;
  lender: string;
  amount: number;
  stage: string;
  age: string;
  status: "disbursed" | "stuck" | "submitted" | "approved";
  timeline: { title: string; date: string; desc: string }[];
}

function AdminLoansPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [loanCases, setLoanCases] = useState<LoanCase[]>([
    {
      id: "SNV-24-118204",
      borrowerName: "Sunita Rao",
      lender: "SBI Digital Finance",
      amount: 350000,
      stage: "Mandate Registered",
      age: "24h",
      status: "disbursed",
      timeline: [
        { title: "Disbursal Initiated", date: "12 Mar 11:30", desc: "Regulated lender SBI approved funds transmission" },
        { title: "e-Mandate Approved", date: "12 Mar 10:45", desc: "NACH mandate registered with SBI bank" },
        { title: "e-Sign Complete", date: "12 Mar 10:15", desc: "Borrower signed KFS and sanction letter" }
      ]
    },
    {
      id: "SNV-24-118198",
      borrowerName: "Imran Qureshi",
      lender: "SBI Digital Finance",
      amount: 800000,
      stage: "Lender review (Awaiting Document)",
      age: "52h",
      status: "stuck",
      timeline: [
        { title: "KYC Mismatch Flagged", date: "11 Mar 14:30", desc: "Manual review underwriter requestedForm 16" },
        { title: "Bank statements verified", date: "11 Mar 11:00", desc: "Account aggregator data parsed successfully" }
      ]
    },
    {
      id: "SNV-24-118165",
      borrowerName: "Sunita Rao",
      lender: "Kaveri Gramin Bank",
      amount: 180000,
      stage: "Manual review (Clarification Pending)",
      age: "48h",
      status: "stuck",
      timeline: [
        { title: "Query raised to borrower", date: "11 Mar 15:30", desc: "Lender raised clarification request REQ-884021" },
        { title: "Aadhaar e-KYC passed", date: "11 Mar 10:00", desc: "OTP verification matched Aadhaar records" }
      ]
    }
  ]);

  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const handlePushStuckFile = (id: string) => {
    toast.success(`Dispatched automated ping reminder to lender API for file ${id}.`);
  };

  const handleQueryGrievanceOfficer = (id: string) => {
    toast.info(`Case ${id} escalated to Grievance Redressal Officer committee review.`);
  };

  const filteredCases = loanCases.filter(c => {
    const matchesSearch = c.borrowerName.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase()) || c.lender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const selectedCase = loanCases.find(c => c.id === selectedCaseId);

  return (
    <PortalShell
      role="admin"
      title="Loan Portfolio Control"
      subtitle="Audit disbursements, review timelines, and resolve stuck applications"
    >
      <div className="space-y-6 text-xs">
        {/* KPI Row */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Disbursed Value (MTD)" value={formatINR(18400000)} hint="Total platform disbursements" />
          <KpiCard label="Active Portfolio Cases" value="2,184 Files" hint="Currently servicing" />
          <KpiCard label="Stuck Applications (>48h)" value="2 Files" tone="warning" hint="Awaiting underwriter actions" />
          <KpiCard label="Average Disbursal Cycle" value="4.2 hours" tone="success" hint="From signoff to mandate" />
        </div>

        {/* Workspace */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <SectionCard title="Active Credit Case Pipeline">
              {/* Search & Filter */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-surface p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted-foreground">Oversight Filters:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded border border-border bg-card px-2.5 py-1 text-xs focus:outline-none"
                  >
                    <option value="All">All Applications</option>
                    <option value="disbursed">Disbursed Ledger</option>
                    <option value="stuck">Stuck / Delayed Files</option>
                  </select>
                </div>

                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by ID, name or bank..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded border border-border bg-background pl-8 pr-3 py-1 text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground bg-surface">
                      <th scope="col" className="p-3">Application ID</th>
                      <th scope="col" className="p-3">Borrower</th>
                      <th scope="col" className="p-3">Lender RE</th>
                      <th scope="col" className="p-3">Loan Amount</th>
                      <th scope="col" className="p-3">Stage Status</th>
                      <th scope="col" className="p-3">Pipeline Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCases.map((c) => (
                      <tr
                        key={c.id}
                        className={`border-b border-border hover:bg-neutral-50 cursor-pointer ${selectedCaseId === c.id ? "bg-primary/5" : ""}`}
                        onClick={() => setSelectedCaseId(c.id)}
                      >
                        <td className="p-3 font-semibold text-foreground">{c.id}</td>
                        <td className="p-3 font-semibold text-foreground">{c.borrowerName}</td>
                        <td className="p-3 text-muted-foreground">{c.lender}</td>
                        <td className="num p-3 text-foreground font-semibold">{formatINR(c.amount)}</td>
                        <td className="p-3">
                          <StatusBadge tone={c.status === "disbursed" ? "success" : c.status === "stuck" ? "error" : "warning"}>
                            {c.stage}
                          </StatusBadge>
                        </td>
                        <td className="num p-3 text-muted-foreground">{c.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            <SectionCard title="Case File Timeline Detail">
              {selectedCase ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-surface border border-border p-3 space-y-2">
                    <p className="font-bold text-foreground text-sm">{selectedCase.id}</p>
                    <p className="text-muted-foreground">Borrower: {selectedCase.borrowerName}</p>
                    <p className="text-muted-foreground">Lender: {selectedCase.lender}</p>
                    <p className="num font-bold text-primary">{formatINR(selectedCase.amount)}</p>
                  </div>

                  {/* Timeline Logs */}
                  <div className="space-y-3">
                    <span className="font-bold text-foreground block">System Events Audit</span>
                    <div className="space-y-3 border-l border-border pl-4 ml-2">
                      {selectedCase.timeline.map((t, idx) => (
                        <div key={idx} className="relative space-y-1">
                          <span className="absolute -left-[21px] top-1 size-2 rounded-full bg-primary" />
                          <p className="font-semibold text-foreground text-[10px]">{t.title} <span className="text-muted-foreground font-mono font-normal">({t.date})</span></p>
                          <p className="text-[10px] text-muted-foreground leading-snug">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-border pt-4 space-y-2 flex flex-col">
                    {selectedCase.status === "stuck" && (
                      <Button size="sm" className="flex items-center gap-1.5 justify-center" onClick={() => handlePushStuckFile(selectedCase.id)}>
                        <RefreshCw className="size-4" /> Push Stuck File (Ping API)
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex items-center gap-1.5 justify-center" onClick={() => handleQueryGrievanceOfficer(selectedCase.id)}>
                      <Send className="size-4" /> Escalate to GRO Committee
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  Select a loan file row to view the full event timeline audit log.
                </div>
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
