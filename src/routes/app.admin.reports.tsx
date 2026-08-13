import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Calendar, Plus, RefreshCw, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Schedules — ShriNeo Capital" },
      { name: "description", content: "Generate regulatory disclosures and manage automated reporting schedules." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminReportsPage,
});

interface ReportSchedule {
  id: string;
  name: string;
  frequency: "Daily" | "Weekly" | "Monthly" | "Quarterly";
  lastRun: string;
  recipient: string;
  status: string;
  tone: "success" | "warning" | "info" | "neutral" | "error";
}

function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [runningReportId, setRunningReportId] = useState<string | null>(null);

  // New report schedule inputs
  const [newReportName, setNewReportName] = useState("");
  const [newFrequency, setNewFrequency] = useState<"Daily" | "Weekly" | "Monthly" | "Quarterly">("Monthly");
  const [newRecipient, setNewRecipient] = useState("Compliance");

  const [schedules, setSchedules] = useState<ReportSchedule[]>([
    { id: "REP-01", name: "Digital lending disclosures", frequency: "Monthly", lastRun: "01 Mar 2026", recipient: "Compliance", status: "Filed", tone: "success" },
    { id: "REP-02", name: "Grievance summary", frequency: "Monthly", lastRun: "01 Mar 2026", recipient: "Board", status: "Filed", tone: "success" },
    { id: "REP-03", name: "Portfolio performance", frequency: "Weekly", lastRun: "10 Mar 2026", recipient: "Management", status: "Filed", tone: "success" },
    { id: "REP-04", name: "Fair practice audit", frequency: "Quarterly", lastRun: "01 Jan 2026", recipient: "Compliance", status: "Due 01 Apr", tone: "warning" },
  ]);

  const handleRunReport = (id: string, name: string) => {
    setRunningReportId(id);
    toast.info(`Generating disclosure file for "${name}"...`);
    setTimeout(() => {
      setRunningReportId(null);
      setSchedules(prev => prev.map(s => s.id === id ? { ...s, lastRun: "Today", status: "Filed", tone: "success" } : s));
      toast.success(`Report "${name}" generated and submitted successfully.`);
    }, 1500);
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportName.trim()) {
      toast.error("Please enter a report description/name.");
      return;
    }

    const newSched: ReportSchedule = {
      id: `REP-0${schedules.length + 1}`,
      name: newReportName,
      frequency: newFrequency,
      lastRun: "Never run",
      recipient: newRecipient,
      status: `Due Next Cycle`,
      tone: "info"
    };

    setSchedules(prev => [...prev, newSched]);
    setNewReportName("");
    toast.success(`Automated schedule for "${newReportName}" configured successfully.`);
  };

  const filteredSchedules = schedules.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.recipient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalShell
      role="admin"
      title="Regulatory & Management Reports"
      subtitle="Schedule automated disclosures and compile management oversight dashboards"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <KpiCard label="Scheduled reports" value={String(schedules.length)} hint="Active automated jobs" />
        <KpiCard label="Pending disclosures" value={String(schedules.filter(s => s.status.startsWith("Due")).length)} hint="Action required soon" tone="warning" />
        <KpiCard label="Total submissions YTD" value="184" hint="Filed with RBI/Lenders" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-6 text-xs">
        {/* Scheduled reports roster */}
        <SectionCard title="Active Reporting Schedules" description="Configure automated submission targets and manual override runs">
          <div className="space-y-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reports or recipients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border border-border bg-background pl-8 pr-3 py-1.5 focus:outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border text-left uppercase tracking-wider text-muted-foreground bg-surface">
                    <th scope="col" className="p-3">Report Name</th>
                    <th scope="col" className="p-3">Frequency</th>
                    <th scope="col" className="p-3">Last Run</th>
                    <th scope="col" className="p-3">Recipient</th>
                    <th scope="col" className="p-3">Status</th>
                    <th scope="col" className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedules.map(s => (
                    <tr key={s.id} className="border-b border-border hover:bg-neutral-50 last:border-0">
                      <td className="p-3 font-semibold text-foreground">{s.name}</td>
                      <td className="p-3 text-muted-foreground">{s.frequency}</td>
                      <td className="p-3 font-mono text-muted-foreground">{s.lastRun}</td>
                      <td className="p-3 text-foreground">{s.recipient}</td>
                      <td className="p-3">
                        <StatusBadge tone={s.tone}>{s.status}</StatusBadge>
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => handleRunReport(s.id, s.name)}
                          disabled={runningReportId === s.id}
                          className="bg-white"
                        >
                          {runningReportId === s.id ? (
                            <RefreshCw className="size-3.5 animate-spin mr-1" />
                          ) : (
                            <Calendar className="size-3.5 mr-1" />
                          )}
                          Run Now
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        {/* Schedule Builder Form */}
        <SectionCard title="Configure New Report" description="Set up custom query schedules for regulatory reporting">
          <form onSubmit={handleCreateSchedule} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="report-name" className="font-semibold text-muted-foreground">Report Description</label>
              <input
                id="report-name"
                type="text"
                placeholder="E.g. Fair practice compliance audit"
                value={newReportName}
                onChange={(e) => setNewReportName(e.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="frequency" className="font-semibold text-muted-foreground">Generation Frequency</label>
              <select
                id="frequency"
                value={newFrequency}
                onChange={(e) => setNewFrequency(e.target.value as any)}
                className="w-full rounded border border-border bg-background px-3 py-2"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="recipient" className="font-semibold text-muted-foreground">Target Recipient Group</label>
              <select
                id="recipient"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-2"
              >
                <option value="Compliance">Compliance Team</option>
                <option value="Management">Management Board</option>
                <option value="Board">Board Directors</option>
                <option value="RBI Portal">RBI Regulatory Portal</option>
              </select>
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-1.5 mt-2">
              <Plus className="size-4" /> Schedule Report
            </Button>
          </form>
        </SectionCard>
      </div>
    </PortalShell>
  );
}
