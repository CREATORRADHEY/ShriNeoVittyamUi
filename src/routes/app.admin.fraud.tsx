import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldAlert, CheckCircle2, UserCheck, AlertTriangle, Eye, Send, Lock } from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/fraud")({
  head: () => ({
    meta: [
      { title: "Fraud oversight — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Platform fraud watchlists, linked device checks, and underwriting security alerts.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminFraudPage,
});

interface FraudAlert {
  id: string;
  borrowerName: string;
  type: string;
  riskScore: number;
  signalsCount: number;
  devices: string[];
  status: "Open Alert" | "False Positive" | "Confirmed Fraud";
}

function AdminFraudPage() {
  const [alerts, setAlerts] = useState<FraudAlert[]>([
    {
      id: "FRD-99812",
      borrowerName: "Rohit Sharma",
      type: "Mismatched Selfie Liveness Check",
      riskScore: 84,
      signalsCount: 3,
      devices: ["iPhone 14 (Jaipur)", "Windows Desktop (Jaipur)"],
      status: "Open Alert",
    },
    {
      id: "FRD-99804",
      borrowerName: "Divyansh Dusad",
      type: "Multiple PAN Sourcing (Same Device ID)",
      riskScore: 92,
      signalsCount: 5,
      devices: ["OnePlus 11 ( Lucknow)", "OnePlus 11 (Noida)"],
      status: "Open Alert",
    },
    {
      id: "FRD-99750",
      borrowerName: "Sunita Rao",
      type: "Face Match Similarity Mismatch",
      riskScore: 68,
      signalsCount: 2,
      devices: ["Samsung S23 (Ahmedabad)"],
      status: "False Positive",
    },
  ]);

  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const handleResolveAlert = (id: string, type: "False Positive" | "Confirmed Fraud") => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          toast.success(`Fraud alert ${a.id} resolved as ${type}.`);
          return { ...a, status: type };
        }
        return a;
      }),
    );
  };

  const handleNotifyLenders = (id: string) => {
    toast.info(`Fraud warning notification broadcasted to all matched lenders for case ${id}.`);
  };

  const selectedAlert = alerts.find((a) => a.id === selectedAlertId);

  return (
    <PortalShell
      role="admin"
      title="Security & Fraud Watchlist"
      subtitle="Inspect machine-learning fraud signals, linked device footprints, and face match alerts"
    >
      <div className="space-y-6 text-xs">
        {/* KPI Row */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Fraud Alerts Triggered"
            value="3 Active Alerts"
            hint="Awaiting review"
            tone="warning"
          />
          <KpiCard
            label="Identity Verification Matches"
            value="98.4%"
            hint="Liveness pass rate"
            tone="success"
          />
          <KpiCard
            label="Flagged Devices"
            value="2 Registered"
            hint="Watchlist active"
            tone="error"
          />
          <KpiCard label="False Positives Closed" value="18 Cases" hint="Month to Date" />
        </div>

        {/* Workspace */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <SectionCard title="Active Fraud Watchlist Alerts">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground bg-surface">
                      <th scope="col" className="p-3">
                        Alert ID
                      </th>
                      <th scope="col" className="p-3">
                        Borrower Name
                      </th>
                      <th scope="col" className="p-3">
                        Anomaly Type
                      </th>
                      <th scope="col" className="p-3">
                        Risk Score
                      </th>
                      <th scope="col" className="p-3">
                        Matched Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map((a) => (
                      <tr
                        key={a.id}
                        className={`border-b border-border hover:bg-neutral-50 cursor-pointer ${selectedAlertId === a.id ? "bg-primary/5" : ""}`}
                        onClick={() => setSelectedAlertId(a.id)}
                      >
                        <td className="p-3 font-semibold text-foreground">{a.id}</td>
                        <td className="p-3 font-semibold text-foreground">{a.borrowerName}</td>
                        <td className="p-3 text-muted-foreground">{a.type}</td>
                        <td className="num p-3 text-foreground font-semibold">
                          <span
                            className={`${a.riskScore > 80 ? "text-red-600 font-bold" : "text-amber-600 font-semibold"}`}
                          >
                            {a.riskScore}/100
                          </span>
                        </td>
                        <td className="p-3">
                          <StatusBadge
                            tone={
                              a.status === "Open Alert"
                                ? "error"
                                : a.status === "False Positive"
                                  ? "success"
                                  : "neutral"
                            }
                          >
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
            <SectionCard title="Fraud Signal Investigation">
              {selectedAlert ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-surface border border-border p-3 space-y-2">
                    <p className="font-bold text-foreground text-sm flex items-center gap-1.5 text-red-600">
                      <ShieldAlert className="size-4 shrink-0" /> {selectedAlert.type}
                    </p>
                    <p className="text-muted-foreground">Alert: {selectedAlert.id}</p>
                    <p className="text-muted-foreground">
                      Borrower Name: {selectedAlert.borrowerName}
                    </p>
                  </div>

                  {/* Linked devices checklist */}
                  <div className="space-y-2.5">
                    <span className="font-bold text-foreground block">
                      Linked Devices Checklist
                    </span>
                    <ul className="space-y-1.5 rounded border p-3 bg-card font-mono text-[10px] text-muted-foreground">
                      {selectedAlert.devices.map((d, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-1.5 border-b pb-1 last:border-0"
                        >
                          <span className="size-1.5 rounded-full bg-primary" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedAlert.status === "Open Alert" && (
                    <div className="border-t border-border pt-4 space-y-2 flex flex-col">
                      <Button
                        size="sm"
                        className="flex items-center gap-1.5 justify-center"
                        onClick={() => handleResolveAlert(selectedAlert.id, "False Positive")}
                      >
                        <UserCheck className="size-4" /> Clear (Mark False Positive)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1.5 justify-center text-red-700 border-red-200 hover:bg-red-50"
                        onClick={() => handleResolveAlert(selectedAlert.id, "Confirmed Fraud")}
                      >
                        <Lock className="size-4" /> Confirm Fraud Block
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1.5 justify-center"
                        onClick={() => handleNotifyLenders(selectedAlert.id)}
                      >
                        <Send className="size-4" /> Notify Participating Lenders
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  Select a fraud alert row to display device matches and liveness checks.
                </div>
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
