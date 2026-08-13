import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, UserCheck, ShieldAlert, Award, AlertTriangle, Play, CheckCircle2, UserX, RefreshCw } from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/agents")({
  head: () => ({
    meta: [
      { title: "Agent Operations — ShriNeo Capital" },
      { name: "description", content: "Verify agent onboarding, training compliance, and commission disputes." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminAgentsPage,
});

interface AgentAccount {
  id: string;
  name: string;
  serviceArea: string;
  kycStatus: "Completed" | "Pending" | "Manual Review";
  trainingStatus: "Passed" | "Pending Assessment" | "Not Started";
  status: "Active" | "Gated" | "Suspended";
}

function AdminAgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [agents, setAgents] = useState<AgentAccount[]>([
    { id: "AG-4471", name: "Rahul Kumar", serviceArea: "Jaipur (RJ)", kycStatus: "Completed", trainingStatus: "Passed", status: "Active" },
    { id: "AG-4482", name: "Vikram Singh", serviceArea: "Lucknow (UP)", kycStatus: "Manual Review", trainingStatus: "Pending Assessment", status: "Gated" },
    { id: "AG-4450", name: "Priya Sharma", serviceArea: "Ahmedabad (GJ)", kycStatus: "Pending", trainingStatus: "Not Started", status: "Gated" },
    { id: "AG-4310", name: "Suresh Gupta", serviceArea: "Delhi/NCR", kycStatus: "Completed", trainingStatus: "Passed", status: "Suspended" }
  ]);

  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const handleApproveAgent = (id: string) => {
    setAgents(prev =>
      prev.map(a => {
        if (a.id === id) {
          toast.success(`Agent ${a.name} approved. Verified badge and certificate issued.`);
          return { ...a, kycStatus: "Completed" as const, status: "Active" as const };
        }
        return a;
      })
    );
  };

  const handleSuspendAgent = (id: string) => {
    setAgents(prev =>
      prev.map(a => {
        if (a.id === id) {
          const nextStatus = a.status === "Suspended" ? "Active" : "Suspended";
          toast.warning(`Agent status changed to ${nextStatus}.`);
          return { ...a, status: nextStatus as any };
        }
        return a;
      })
    );
  };

  const handleReRequestDocs = (id: string) => {
    toast.info(`KYC document re-request notification pushed to agent ${id}.`);
  };

  const filteredAgents = agents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase()) || a.serviceArea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <PortalShell
      role="admin"
      title="Agent Operational Control"
      subtitle="Verify credentials, signoff training certifications, and monitor code of conduct"
    >
      <div className="space-y-6 text-xs">
        {/* KPI Row */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Onboarded Agents" value="4,821" hint="Active in service area" />
          <KpiCard label="Pending KYC Review" value="82" hint="Awaiting admin approval" tone="warning" />
          <KpiCard label="Training Certifications" value="4,739" hint="Issued MTD" tone="success" />
          <KpiCard label="Conduct Investigations" value="2" hint="Suspended for review" tone="error" />
        </div>

        {/* Main Workspace */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <SectionCard title="Sourcing Partners Roster">
              {/* Filter & Search */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-surface p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted-foreground">Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded border border-border bg-card px-2.5 py-1 text-xs focus:outline-none"
                  >
                    <option value="All">All Partners</option>
                    <option value="Active">Active Badge</option>
                    <option value="Gated">Gated Onboarding</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, ID or area..."
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
                      <th scope="col" className="p-3">Agent ID</th>
                      <th scope="col" className="p-3">Name</th>
                      <th scope="col" className="p-3">Service Area</th>
                      <th scope="col" className="p-3">KYC Checklist</th>
                      <th scope="col" className="p-3">Training Progress</th>
                      <th scope="col" className="p-3">Dashboard Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents.map((a) => (
                      <tr
                        key={a.id}
                        className={`border-b border-border hover:bg-neutral-50 cursor-pointer ${selectedAgentId === a.id ? "bg-primary/5" : ""}`}
                        onClick={() => setSelectedAgentId(a.id)}
                      >
                        <td className="p-3 font-semibold text-foreground">{a.id}</td>
                        <td className="p-3 font-semibold text-foreground">{a.name}</td>
                        <td className="p-3 text-muted-foreground">{a.serviceArea}</td>
                        <td className="p-3">
                          <StatusBadge tone={a.kycStatus === "Completed" ? "success" : a.kycStatus === "Manual Review" ? "warning" : "error"}>
                            {a.kycStatus}
                          </StatusBadge>
                        </td>
                        <td className="p-3">
                          <StatusBadge tone={a.trainingStatus === "Passed" ? "success" : a.trainingStatus === "Pending Assessment" ? "warning" : "neutral"}>
                            {a.trainingStatus}
                          </StatusBadge>
                        </td>
                        <td className="p-3">
                          <StatusBadge tone={a.status === "Active" ? "success" : a.status === "Suspended" ? "error" : "warning"}>
                            {a.status}
                          </StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            <SectionCard title="Agent Profile & Actions">
              {selectedAgent ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-surface border border-border p-3 space-y-2">
                    <p className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      {selectedAgent.name}
                      {selectedAgent.status === "Active" && <CheckCircle2 className="size-4 text-emerald-600" />}
                    </p>
                    <p className="text-muted-foreground">ID: {selectedAgent.id}</p>
                    <p className="text-muted-foreground">Coverage Area: {selectedAgent.serviceArea}</p>
                  </div>

                  <div className="space-y-2.5">
                    <span className="font-bold text-foreground block">Onboarding Compliance Check</span>
                    <div className="space-y-1.5 rounded border p-3 bg-card">
                      <div className="flex justify-between">
                        <span>Aadhaar/PAN KYC</span>
                        <span className="font-semibold">{selectedAgent.kycStatus}</span>
                      </div>
                      <div className="flex justify-between border-t pt-1.5">
                        <span>Module Quiz Score</span>
                        <span className="font-semibold">{selectedAgent.trainingStatus === "Passed" ? "100%" : "Pending"}</span>
                      </div>
                      <div className="flex justify-between border-t pt-1.5">
                        <span>Code of Conduct Signoff</span>
                        <span className="font-semibold text-emerald-700">Signed 08 Mar</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-2 flex flex-col">
                    {selectedAgent.kycStatus !== "Completed" && (
                      <Button size="sm" className="flex items-center gap-1 justify-center" onClick={() => handleApproveAgent(selectedAgent.id)}>
                        <UserCheck className="size-4" /> Approve Agent credentials
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex items-center gap-1 justify-center text-red-700 border-red-200 hover:bg-red-50" onClick={() => handleSuspendAgent(selectedAgent.id)}>
                      <ShieldAlert className="size-4" />
                      {selectedAgent.status === "Suspended" ? "Reinstate Agent" : "Suspend Agent (Investigate)"}
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 justify-center" onClick={() => handleReRequestDocs(selectedAgent.id)}>
                      <RefreshCw className="size-4" /> Re-request Sourcing Docs
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  Select a sourcing partner from the list to manage verification status and credentials.
                </div>
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
