import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldAlert, Lock, Unlock, RefreshCw, Trash2, UserX } from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/borrowers")({
  head: () => ({
    meta: [
      { title: "Borrower Oversight — ShriNeo Capital" },
      { name: "description", content: "Search borrower accounts, inspect application history and act on support escalations." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminBorrowersPage,
});

interface BorrowerAccount {
  id: string;
  name: string;
  mobile: string;
  state: string;
  applications: number;
  activeLoans: number;
  status: "Active" | "Locked" | "In application" | "Deactivation Pending";
  deactivationRequestDate?: string;
}

function AdminBorrowersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState("All");
  
  const [borrowers, setBorrowers] = useState<BorrowerAccount[]>([
    { id: "BR-482011", name: "Divyansh Dusad", mobile: "+91 98765 43210", state: "Rajasthan", applications: 2, activeLoans: 1, status: "Deactivation Pending", deactivationRequestDate: "Today (30d cool-off)" },
    { id: "BR-481990", name: "Rohit Sharma", mobile: "+91 99999 88888", state: "Maharashtra", applications: 1, activeLoans: 0, status: "In application" },
    { id: "BR-481944", name: "Sunita Rao", mobile: "+91 77777 66666", state: "Uttar Pradesh", applications: 3, activeLoans: 0, status: "Active" },
    { id: "BR-481812", name: "Imran Qureshi", mobile: "+91 88888 77777", state: "Delhi/NCR", applications: 1, activeLoans: 0, status: "Locked" }
  ]);

  const [selectedBorrowerId, setSelectedBorrowerId] = useState<string | null>(null);

  const handleToggleLock = (id: string) => {
    setBorrowers(prev =>
      prev.map(b => {
        if (b.id === id) {
          const nextStatus = b.status === "Locked" ? "Active" : "Locked";
          toast.success(`Account ${b.id} status updated to ${nextStatus}.`);
          return { ...b, status: nextStatus };
        }
        return b;
      })
    );
  };

  const handleTriggerKycReupload = (id: string) => {
    toast.info(`KYC re-upload notification dispatched to borrower ${id}.`);
  };

  const handleCancelDeactivation = (id: string) => {
    setBorrowers(prev =>
      prev.map(b => {
        if (b.id === id) {
          toast.success(`Deactivation cool-off cancelled for ${b.name}.`);
          return { ...b, status: "Active" };
        }
        return b;
      })
    );
  };

  const filteredBorrowers = borrowers.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.toLowerCase().includes(searchQuery.toLowerCase()) || b.mobile.includes(searchQuery);
    const matchesState = filterState === "All" || b.state === filterState;
    return matchesSearch && matchesState;
  });

  const selectedBorrower = borrowers.find(b => b.id === selectedBorrowerId);

  return (
    <PortalShell
      role="admin"
      title="Borrower Operational Control"
      subtitle="Verify profiles, handle deactivations, and audit credit checks"
    >
      <div className="space-y-6 text-xs">
        {/* KPI Row */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Registered Borrowers" value="1,84,210" hint="Total" />
          <KpiCard label="Active Applications" value="3,918" hint="Month to Date" />
          <KpiCard label="Deactivation Cool-offs" value="1" tone="warning" hint="Pending 30-day review" />
          <KpiCard label="Support Escalations" value="14" tone="success" hint="SLA active" />
        </div>

        {/* Main Work Area */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <SectionCard title="Borrowers Directory">
              {/* Search & Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-surface p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted-foreground">State:</span>
                  <select
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    className="rounded border border-border bg-card px-2.5 py-1 text-xs focus:outline-none"
                  >
                    <option value="All">All States</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Delhi/NCR">Delhi/NCR</option>
                  </select>
                </div>

                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by ID, name or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded border border-border bg-background pl-8 pr-3 py-1 text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="border-b border-border text-left uppercase tracking-wide text-muted-foreground bg-surface">
                      <th scope="col" className="p-3">Borrower ID</th>
                      <th scope="col" className="p-3">Name</th>
                      <th scope="col" className="p-3">Mobile</th>
                      <th scope="col" className="p-3">State</th>
                      <th scope="col" className="p-3">Status</th>
                      <th scope="col" className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBorrowers.map((b) => (
                      <tr
                        key={b.id}
                        className={`border-b border-border hover:bg-neutral-50 cursor-pointer ${selectedBorrowerId === b.id ? "bg-primary/5" : ""}`}
                        onClick={() => setSelectedBorrowerId(b.id)}
                      >
                        <td className="p-3 font-semibold text-foreground">{b.id}</td>
                        <td className="p-3 font-semibold text-foreground">{b.name}</td>
                        <td className="num p-3 text-muted-foreground">{b.mobile}</td>
                        <td className="p-3 text-muted-foreground">{b.state}</td>
                        <td className="p-3">
                          <StatusBadge tone={b.status === "Active" || b.status === "In application" ? "success" : b.status === "Locked" ? "error" : "warning"}>
                            {b.status}
                          </StatusBadge>
                        </td>
                        <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <Button size="xs" variant="outline" onClick={() => setSelectedBorrowerId(b.id)}>
                            View File
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filteredBorrowers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                          No registered borrowers match your query parameters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            <SectionCard title="Borrower Operational Detail">
              {selectedBorrower ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-surface border border-border p-3 space-y-2">
                    <p className="font-bold text-foreground text-sm">{selectedBorrower.name}</p>
                    <p className="text-muted-foreground">{selectedBorrower.id}</p>
                    <p className="num text-muted-foreground">{selectedBorrower.mobile}</p>
                    <p className="text-muted-foreground">Region: {selectedBorrower.state}</p>
                  </div>

                  <div className="space-y-2.5">
                    <span className="font-bold text-foreground block">Active Milestones</span>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 border border-border rounded bg-card">
                        <span className="block text-[10px] text-muted-foreground">Applications</span>
                        <span className="font-bold text-foreground text-sm">{selectedBorrower.applications}</span>
                      </div>
                      <div className="p-2 border border-border rounded bg-card">
                        <span className="block text-[10px] text-muted-foreground">Active Loans</span>
                        <span className="font-bold text-foreground text-sm">{selectedBorrower.activeLoans}</span>
                      </div>
                    </div>
                  </div>

                  {selectedBorrower.status === "Deactivation Pending" && (
                    <div className="p-3 border border-amber-200 bg-amber-50 rounded text-amber-950 space-y-2">
                      <p className="font-semibold flex items-center gap-1.5">
                        <UserX className="size-4 shrink-0 text-amber-600" /> Account Deactivation Request
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Borrower requested account deletion. A mandatory 30-day cool-off window is active before data purging.
                      </p>
                      <Button size="xs" className="w-full mt-1" variant="outline" onClick={() => handleCancelDeactivation(selectedBorrower.id)}>
                        Cancel Deactivation
                      </Button>
                    </div>
                  )}

                  <div className="border-t border-border pt-4 space-y-2 flex flex-col">
                    <Button size="sm" variant="outline" className="flex items-center gap-1 justify-center" onClick={() => handleToggleLock(selectedBorrower.id)}>
                      {selectedBorrower.status === "Locked" ? <Unlock className="size-4" /> : <Lock className="size-4" />}
                      {selectedBorrower.status === "Locked" ? "Unlock Account" : "Lock Account"}
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 justify-center" onClick={() => handleTriggerKycReupload(selectedBorrower.id)}>
                      <RefreshCw className="size-4" /> Request KYC Re-upload
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  Select a borrower row to display detailed operational profile logs.
                </div>
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
