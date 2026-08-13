import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Building, Settings, CheckCircle2, AlertTriangle, ToggleLeft, ToggleRight, Save } from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/lenders")({
  head: () => ({
    meta: [
      { title: "Lender Management — ShriNeo Capital" },
      { name: "description", content: "Onboard lenders, check integration API statuses, and manage credit routing parameters." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLendersPage,
});

interface LenderAccount {
  id: string;
  name: string;
  type: string;
  weight: number; // Credit routing percentage weight
  minCibil: number;
  apiStatus: "Healthy" | "Slow" | "Offline";
  status: "Active" | "Inactive";
}

function AdminLendersPage() {
  const [lenders, setLenders] = useState<LenderAccount[]>([
    { id: "L-904", name: "SBI Digital Finance", type: "Public RE", weight: 40, minCibil: 650, apiStatus: "Healthy", status: "Active" },
    { id: "L-908", name: "Kaveri Gramin Bank", type: "RRB", weight: 30, minCibil: 600, apiStatus: "Slow", status: "Active" },
    { id: "L-912", name: "Indus Credit Capital", type: "NBFC", weight: 20, minCibil: 680, apiStatus: "Healthy", status: "Active" },
    { id: "L-920", name: "Federal Micro Finance", type: "Private Bank", weight: 10, minCibil: 580, apiStatus: "Offline", status: "Inactive" }
  ]);

  const [selectedLenderId, setSelectedLenderId] = useState<string | null>(null);

  // Editing parameters states
  const [editWeight, setEditWeight] = useState(0);
  const [editMinCibil, setEditMinCibil] = useState(0);
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">("Active");

  const handleSelectLender = (l: LenderAccount) => {
    setSelectedLenderId(l.id);
    setEditWeight(l.weight);
    setEditMinCibil(l.minCibil);
    setEditStatus(l.status);
  };

  const handleSaveParameters = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLenderId) return;

    setLenders(prev =>
      prev.map(l => {
        if (l.id === selectedLenderId) {
          toast.success(`Updated routing parameters for ${l.name}.`);
          return { ...l, weight: editWeight, minCibil: editMinCibil, status: editStatus };
        }
        return l;
      })
    );
  };

  const handleToggleApiStatus = (id: string) => {
    setLenders(prev =>
      prev.map(l => {
        if (l.id === id) {
          const nextStatus = l.apiStatus === "Offline" ? "Healthy" as const : "Offline" as const;
          toast.info(`Simulated API connection toggle for ${l.name}: now ${nextStatus}`);
          return { ...l, apiStatus: nextStatus };
        }
        return l;
      })
    );
  };

  return (
    <PortalShell
      role="admin"
      title="Matched Lender Configurations"
      subtitle="Onboard partner REs, adjust routing weights, and set threshold risk criteria"
    >
      <div className="space-y-6 text-xs">
        {/* KPI Row */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Onboarded Lenders" value="4 Participating REs" hint="SBI, Kaveri, Indus, Federal" />
          <KpiCard label="Average API Latency" value="184ms" hint="Target <300ms" tone="success" />
          <KpiCard label="Routing Cap Allocated" value="100%" hint="Platform total weights" />
          <KpiCard label="API Degraded/Offline" value="1" hint="Federal Micro Finance" tone="warning" />
        </div>

        {/* Workspace */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <SectionCard title="Regulated Entities (RE) Status Registry">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground bg-surface">
                      <th scope="col" className="p-3">Lender ID</th>
                      <th scope="col" className="p-3">RE Name</th>
                      <th scope="col" className="p-3">Entity Type</th>
                      <th scope="col" className="p-3">Weight (%)</th>
                      <th scope="col" className="p-3">Min CIBIL</th>
                      <th scope="col" className="p-3">API Health</th>
                      <th scope="col" className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lenders.map((l) => (
                      <tr
                        key={l.id}
                        className={`border-b border-border hover:bg-neutral-50 cursor-pointer ${selectedLenderId === l.id ? "bg-primary/5" : ""}`}
                        onClick={() => handleSelectLender(l)}
                      >
                        <td className="p-3 font-semibold text-foreground">{l.id}</td>
                        <td className="p-3 font-semibold text-foreground">{l.name}</td>
                        <td className="p-3 text-muted-foreground">{l.type}</td>
                        <td className="num p-3 text-foreground font-semibold">{l.weight}%</td>
                        <td className="num p-3 text-foreground">{l.minCibil}</td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleToggleApiStatus(l.id); }}
                            className="hover:underline text-left cursor-pointer"
                          >
                            <StatusBadge tone={l.apiStatus === "Healthy" ? "success" : l.apiStatus === "Slow" ? "warning" : "error"}>
                              {l.apiStatus}
                            </StatusBadge>
                          </button>
                        </td>
                        <td className="p-3">
                          <StatusBadge tone={l.status === "Active" ? "success" : "neutral"}>
                            {l.status}
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
            <SectionCard title="Routing parameters editor">
              {selectedLenderId && lenders.find(l => l.id === selectedLenderId) ? (
                <form onSubmit={handleSaveParameters} className="space-y-4">
                  <div className="rounded-lg bg-surface border border-border p-3 space-y-1">
                    <p className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      <Building className="size-4 text-primary" />
                      {lenders.find(l => l.id === selectedLenderId)?.name}
                    </p>
                    <p className="text-muted-foreground">ID: {selectedLenderId}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Routing Weight Allocation (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={editWeight}
                        onChange={(e) => setEditWeight(Number(e.target.value))}
                        className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary num font-semibold"
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Determines the allocation percentage for multi-matched applications.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Minimum Bureau Threshold (CIBIL)
                      </label>
                      <input
                        type="number"
                        min={300}
                        max={900}
                        value={editMinCibil}
                        onChange={(e) => setEditMinCibil(Number(e.target.value))}
                        className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary num"
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Routing engine automatically filters out files below this score.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Routing Intake Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as any)}
                        className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="Active">Active (Accepting leads)</option>
                        <option value="Inactive">Paused (Limit cap / Maintenance)</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <Button type="submit" size="sm" className="w-full flex items-center gap-1.5 justify-center">
                      <Save className="size-4" /> Save Configuration
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  Select a Regulated Entity row to modify its routing weights and criteria.
                </div>
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
