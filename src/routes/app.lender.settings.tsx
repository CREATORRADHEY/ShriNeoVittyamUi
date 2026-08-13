import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/states";
import { toast } from "sonner";

export const Route = createFileRoute("/app/lender/settings")({
  head: () => ({
    meta: [
      { title: "Lender settings — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Configure credit policy, sanction caps, routing rules and notification preferences.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LenderSettingsPage,
});

function LenderSettingsPage() {
  const [minCibil, setMinCibil] = useState("650");
  const [maxTenure, setMaxTenure] = useState("60");
  const [sanctionCap, setSanctionCap] = useState("250000000");
  const [slaAlerts, setSlaAlerts] = useState(true);
  const [apiIncidents, setApiIncidents] = useState(true);

  const [geographies, setGeographies] = useState({
    Rajasthan: true,
    UttarPradesh: true,
    Gujarat: true,
    DelhiNCR: true,
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Lender credit policy & routing configurations saved successfully.");
  };

  return (
    <PortalShell
      role="lender"
      title="Settings"
      subtitle="Configure credit policy parameters, monthly sanction caps and routing rules"
    >
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <SectionCard
          title="Credit Policy Parameters"
          description="Minimum bureau thresholds, income multiples and permitted loan tenures."
          actions={<StatusBadge tone="success">Two-Person Rule Enforced</StatusBadge>}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="min-cibil">Minimum Bureau CIBIL Score Gate</Label>
              <Input
                id="min-cibil"
                type="number"
                value={minCibil}
                onChange={(e) => setMinCibil(e.target.value)}
                className="h-10"
              />
              <p className="text-[11px] text-muted-foreground">
                Files below this score are automatically routed for secondary review or declined.
              </p>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="max-tenure">Maximum Permitted Loan Tenure</Label>
              <select
                id="max-tenure"
                value={maxTenure}
                onChange={(e) => setMaxTenure(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="36">36 Months</option>
                <option value="60">60 Months (5 Years)</option>
                <option value="84">84 Months (7 Years)</option>
                <option value="120">120 Months (10 Years)</option>
              </select>
              <p className="text-[11px] text-muted-foreground">
                Maximum tenure offered across personal and business loan categories.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Monthly Sanction Cap & Allocation"
          description="Configure disburser monthly funding limits."
          actions={<StatusBadge tone="info">61% Monthly Cap Used</StatusBadge>}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="sanction-cap">Monthly Sanction Funding Cap (INR)</Label>
              <Input
                id="sanction-cap"
                type="number"
                value={sanctionCap}
                onChange={(e) => setSanctionCap(e.target.value)}
                className="h-10"
              />
              <p className="text-[11px] text-muted-foreground">
                Routing pauses automatically at ₹25 Cr rather than declining active files.
              </p>
            </div>

            <div className="grid gap-1.5">
              <Label>Active Launch Geography Allocations</Label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {Object.entries(geographies).map(([geo, enabled]) => (
                  <label
                    key={geo}
                    className="flex items-center gap-2 text-xs text-foreground cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) =>
                        setGeographies((prev) => ({ ...prev, [geo]: e.target.checked }))
                      }
                      className="size-4 rounded border-border text-primary"
                    />
                    {geo === "UttarPradesh"
                      ? "Uttar Pradesh"
                      : geo === "DelhiNCR"
                        ? "Delhi/NCR"
                        : geo}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Notification & Incident Preferences">
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface">
              <div>
                <span className="font-semibold text-foreground block">SLA Warning Alerts</span>
                <span className="text-muted-foreground text-[11px]">
                  Receive notifications when underwriting review time exceeds 2 hours
                </span>
              </div>
              <input
                type="checkbox"
                checked={slaAlerts}
                onChange={(e) => setSlaAlerts(e.target.checked)}
                className="size-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface">
              <div>
                <span className="font-semibold text-foreground block">
                  API & Telemetry Incident Notifications
                </span>
                <span className="text-muted-foreground text-[11px]">
                  Alert engineering on-call on Account Aggregator or bureau lookup delays
                </span>
              </div>
              <input
                type="checkbox"
                checked={apiIncidents}
                onChange={(e) => setApiIncidents(e.target.checked)}
                className="size-4"
              />
            </label>
          </div>
        </SectionCard>

        <div className="flex justify-end">
          <Button type="submit" size="default">
            Save Policy Configurations
          </Button>
        </div>
      </form>
    </PortalShell>
  );
}
