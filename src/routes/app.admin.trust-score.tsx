import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Settings,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Save,
  Play,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/trust-score")({
  head: () => ({
    meta: [
      { title: "SNV Model Governance — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Monitor model version, score distribution, drift and fairness checks for the SNV Trust Score.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminTrustScorePage,
});

interface OverrideLog {
  timestamp: string;
  underwriter: string;
  applicationId: string;
  originalScore: string;
  newScore: string;
  reason: string;
}

function AdminTrustScorePage() {
  const [modelName, setModelName] = useState("SNV-Trust-v2.4");
  const [populationDrift, setPopulationDrift] = useState("0.02 (Low)");
  const [fairnessMetrics, setFairnessMetrics] = useState("Passed (Disparate Impact: 0.94)");

  const [overrideLogs, setOverrideLogs] = useState<OverrideLog[]>([
    {
      timestamp: "12 Mar, 14:30",
      underwriter: "UW-994",
      applicationId: "SNV-24-118198",
      originalScore: "B",
      newScore: "A",
      reason: "Verified stable cash flows and validated utility deposit receipts manually",
    },
    {
      timestamp: "11 Mar, 10:15",
      underwriter: "UW-104",
      applicationId: "SNV-24-118165",
      originalScore: "C",
      newScore: "B",
      reason: "Co-applicant matched high-credit profile verification",
    },
  ]);

  const [newOverrideAppId, setNewOverrideAppId] = useState("");
  const [newOverrideFrom, setNewOverrideFrom] = useState("C");
  const [newOverrideTo, setNewOverrideTo] = useState("B");
  const [newOverrideReason, setNewOverrideReason] = useState("");

  const handleAddOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOverrideAppId || !newOverrideReason) {
      toast.error("Please enter a valid application ID and override justification reason.");
      return;
    }
    const newLog = {
      timestamp: "Just Now",
      underwriter: "Admin-Control",
      applicationId: newOverrideAppId,
      originalScore: newOverrideFrom,
      newScore: newOverrideTo,
      reason: newOverrideReason,
    };
    setOverrideLogs((prev) => [newLog, ...prev]);
    setNewOverrideAppId("");
    setNewOverrideReason("");
    toast.success(`SNV Trust Score override logged for ${newOverrideAppId}.`);
  };

  return (
    <PortalShell
      role="admin"
      title="SNV Trust Score Model Governance"
      subtitle="Monitor credit model drift, fairness indicators, and underwriter override audits"
    >
      <div className="space-y-6 text-xs">
        {/* KPI Row */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Active Model" value={modelName} hint="Deployed 10 Jan 2026" />
          <KpiCard
            label="Population Drift (PSI)"
            value={populationDrift}
            hint="Threshold: 0.10"
            tone="success"
          />
          <KpiCard
            label="Bias/Fairness check"
            value={fairnessMetrics}
            hint="Disparate Impact: >0.80"
            tone="success"
          />
          <KpiCard
            label="Manual Score Overrides"
            value={`${overrideLogs.length} Registered`}
            hint="Last 30 days"
            tone="warning"
          />
        </div>

        {/* Workspace */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <SectionCard
              title="Underwriter Override Audits"
              description="Every manual scoring override requires a documented business reason"
            >
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground bg-surface">
                        <th scope="col" className="p-3">
                          Time
                        </th>
                        <th scope="col" className="p-3">
                          Underwriter
                        </th>
                        <th scope="col" className="p-3">
                          Application ID
                        </th>
                        <th scope="col" className="p-3">
                          Original
                        </th>
                        <th scope="col" className="p-3">
                          Override
                        </th>
                        <th scope="col" className="p-3">
                          Justification Reason
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {overrideLogs.map((log, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-neutral-50">
                          <td className="p-3 text-muted-foreground font-mono">{log.timestamp}</td>
                          <td className="p-3 font-semibold text-foreground">{log.underwriter}</td>
                          <td className="p-3 font-semibold text-foreground">{log.applicationId}</td>
                          <td className="p-3">
                            <StatusBadge tone="neutral">{log.originalScore}</StatusBadge>
                          </td>
                          <td className="p-3">
                            <StatusBadge tone="success">{log.newScore}</StatusBadge>
                          </td>
                          <td
                            className="p-3 text-muted-foreground max-w-[250px] truncate"
                            title={log.reason}
                          >
                            {log.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </SectionCard>

            {/* Model Explainability card */}
            <SectionCard
              title="Credit Scoring Explainability weights"
              description="Top variables contributing to the advisory SNV Trust Score calculation"
            >
              <div className="space-y-3 p-3 rounded border border-border bg-surface">
                {[
                  { name: "Average Quarterly Balance (AQB) cashflows", weight: "40%" },
                  { name: "Rent & utility payment consistency", weight: "30%" },
                  { name: "Bureau loan repayment history", weight: "20%" },
                  { name: "Stability of current address", weight: "10%" },
                ].map((varItem, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-card border p-2 rounded"
                  >
                    <span className="font-semibold text-foreground">{varItem.name}</span>
                    <span className="font-mono text-primary font-bold">{varItem.weight}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            <SectionCard title="Log manual override">
              <form onSubmit={handleAddOverride} className="space-y-4">
                <div className="rounded-lg bg-surface border border-border p-3 space-y-1">
                  <p className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <Activity className="size-4 text-primary animate-pulse" /> Override scoring
                    engine
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-[10px]">
                    Authorized underwriter overrides bypass default score allocations. Logged for
                    regulatory audit.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Application ID
                    </label>
                    <input
                      type="text"
                      required
                      value={newOverrideAppId}
                      onChange={(e) => setNewOverrideAppId(e.target.value)}
                      placeholder="e.g. SNV-24-118198"
                      className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        From Score
                      </label>
                      <select
                        value={newOverrideFrom}
                        onChange={(e) => setNewOverrideFrom(e.target.value)}
                        className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        To Score
                      </label>
                      <select
                        value={newOverrideTo}
                        onChange={(e) => setNewOverrideTo(e.target.value)}
                        className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Override Justification Reason
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newOverrideReason}
                      onChange={(e) => setNewOverrideReason(e.target.value)}
                      placeholder="E.g. Verified manual bank statements show consistent salary deposits not captured by aggregator API"
                      className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Button
                    type="submit"
                    size="sm"
                    className="w-full flex items-center gap-1.5 justify-center"
                  >
                    <Save className="size-4" /> Save Score Override
                  </Button>
                </div>
              </form>
            </SectionCard>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
