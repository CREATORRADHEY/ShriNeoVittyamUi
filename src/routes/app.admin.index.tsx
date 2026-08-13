import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  UserCheck,
  Eye,
  Trash2,
  Send,
} from "lucide-react";
import { useState } from "react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import {
  ChartState,
  DataStaleBanner,
  EmptyState,
  InlineState,
  KpiCard,
  NamedLoading,
  OfflineBanner,
  PartialDataNotice,
  PermissionNotice,
  RestrictedState,
  SkeletonBlock,
  StatusBadge,
} from "@/components/states";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/")({
  head: () => ({
    meta: [
      { title: "Executive Operations Control — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Platform oversight, RBI compliance logs, fraud watchlists, and grievance SLA audits.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

interface GrievanceCase {
  id: string;
  borrowerName: string;
  issue: string;
  raisedDate: string;
  slaRemaining: string;
  status: "Open" | "Resolved" | "Escalated";
  messages: { sender: "borrower" | "gro"; text: string; time: string }[];
}

function AdminDashboard() {
  const { account, data } = usePrototype();

  const [grievances, setGrievances] = useState<GrievanceCase[]>([
    {
      id: "TKT-1082",
      borrowerName: "Divyansh Dusad",
      issue: "KYC Name mismatch on PAN profile",
      raisedDate: "12 Mar 2026",
      slaRemaining: "3 working days",
      status: "Open",
      messages: [
        {
          sender: "borrower",
          text: "My middle name is omitted on the matched PAN record. Please correct this mismatch.",
          time: "12 Mar, 10:00",
        },
      ],
    },
    {
      id: "SNV-GR-2211",
      borrowerName: "Rohit Sharma",
      issue: "Phone registry modification request",
      raisedDate: "04 Mar 2026",
      slaRemaining: "Resolved",
      status: "Resolved",
      messages: [
        {
          sender: "borrower",
          text: "Please update my mobile number to link to primary HDFC registry.",
          time: "04 Mar, 09:00",
        },
        {
          sender: "gro",
          text: "We have updated your registered mobile logs. Dispute is closed.",
          time: "04 Mar, 15:40",
        },
      ],
    },
  ]);

  const [activeGrievanceId, setActiveGrievanceId] = useState<string | null>(null);
  const [groText, setGroText] = useState("");

  // System status checklist
  const [services] = useState([
    { name: "Aadhaar e-KYC provider", status: "Operational" },
    { name: "CIBIL Bureau Pull API", status: "Operational" },
    { name: "SBI Digital Finance integration", status: "Operational" },
    { name: "Account Aggregator banking hub", status: "Degraded — Slow" },
  ]);

  // Operations alerts
  const [stuckFiles] = useState([
    { id: "SNV-24-118198", borrower: "Imran Qureshi", age: "52h", lender: "SBI Digital Finance" },
    { id: "SNV-24-118165", borrower: "Sunita Rao", age: "48h", lender: "SBI Digital Finance" },
  ]);

  const activeGrievance = grievances.find((g) => g.id === activeGrievanceId);

  const handleResolveGrievance = () => {
    if (!activeGrievanceId) return;
    setGrievances((prev) =>
      prev.map((g) => (g.id === activeGrievanceId ? { ...g, status: "Resolved" as const } : g)),
    );
    toast.success(`Grievance ${activeGrievanceId} marked as Resolved successfully.`);
    setActiveGrievanceId(null);
  };

  const handleSendGroReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groText.trim() || !activeGrievanceId) return;
    const newMsg = { sender: "gro" as const, text: groText, time: "Just now" };
    setGrievances((prev) =>
      prev.map((g) => {
        if (g.id === activeGrievanceId) {
          return {
            ...g,
            messages: [...g.messages, newMsg],
          };
        }
        return g;
      }),
    );
    setGroText("");
    toast.success("Reply dispatched to borrower inbox.");
  };

  const isNewOrEmpty = data === "empty";

  return (
    <PortalShell
      role="admin"
      title="Platform Operations Control"
      subtitle="ShriNeo Capital executive management centre"
      actions={
        <div className="flex items-center gap-2">
          <StatusBadge tone="success">Operational health active</StatusBadge>
        </div>
      }
    >
      <div className="space-y-6 text-xs">
        {/* KPI OVERVIEWS */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <KpiCard label="Total Applications Today" value="1,284" />
          <KpiCard label="Disbursed Sanctions (MTD)" value={formatINR(94200000)} />
          <KpiCard label="Active Sourced Agents" value="612" hint="15 pending approval" />
          <KpiCard
            label="Grievance SLA Compliance"
            value="98.2%"
            tone="success"
            hint="Target 98%"
          />
          <KpiCard label="Stuck Files Alert (>48h)" value="2" tone="warning" />
          <KpiCard label="Active Fraud watch alerts" value="0" tone="success" />
        </div>

        {/* OPERATIONS GRID */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* COMPLAINTS & GRIEVANCES QUEUE */}
            <SectionCard
              title="RBI CMS-Aligned Grievance Registry"
              description="Log of registered complaints and GRO responses under Ombudsman schemas"
            >
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-surface text-muted-foreground font-semibold">
                      <th scope="col" className="p-3">
                        Grievance ID
                      </th>
                      <th scope="col" className="p-3">
                        Borrower Name
                      </th>
                      <th scope="col" className="p-3">
                        Issue summary
                      </th>
                      <th scope="col" className="p-3">
                        Raised Date
                      </th>
                      <th scope="col" className="p-3">
                        SLA Timer
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
                    {grievances.map((g) => (
                      <tr key={g.id} className="border-b border-border">
                        <td className="p-3 font-semibold text-foreground">{g.id}</td>
                        <td className="p-3 text-foreground">{g.borrowerName}</td>
                        <td className="p-3 text-muted-foreground truncate max-w-[20ch]">
                          {g.issue}
                        </td>
                        <td className="p-3 text-muted-foreground">{g.raisedDate}</td>
                        <td className="p-3 text-muted-foreground font-mono">{g.slaRemaining}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-semibold uppercase ${g.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : g.status === "Escalated" ? "bg-red-50 text-red-700 border border-red-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}
                          >
                            {g.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => setActiveGrievanceId(g.id)}
                          >
                            Review Case
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* STUCK FILES ALERT PANEL */}
            <SectionCard title="Stuck Files Oversight (>48h Lender SLA Breaches)">
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-surface text-muted-foreground font-semibold">
                      <th scope="col" className="p-3">
                        Application ID
                      </th>
                      <th scope="col" className="p-3">
                        Borrower Name
                      </th>
                      <th scope="col" className="p-3">
                        Lender Partner
                      </th>
                      <th scope="col" className="p-3">
                        Current Delay
                      </th>
                      <th scope="col" className="p-3 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stuckFiles.map((f) => (
                      <tr key={f.id} className="border-b border-border">
                        <td className="p-3 font-semibold text-foreground">{f.id}</td>
                        <td className="p-3 text-foreground">{f.borrower}</td>
                        <td className="p-3 text-muted-foreground">{f.lender}</td>
                        <td className="p-3 text-red-700 font-semibold">{f.age}</td>
                        <td className="p-3 text-right">
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() =>
                              toast.success(
                                `Pushed automated trigger request to ${f.lender} integrations.`,
                              )
                            }
                          >
                            Refresh Status
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-6">
            {/* DEPENDENCY SERVICES HEALTH */}
            <SectionCard title="Third-Party Integrations status">
              <div className="space-y-2.5">
                {services.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded border border-border bg-surface flex justify-between items-center"
                  >
                    <span className="font-semibold text-foreground">{s.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${s.status === "Operational" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* CONSENT DELETIONS AUDIT LOG */}
            <SectionCard title="Data Privacy & GDPR Audit log">
              <div className="space-y-3">
                {[
                  {
                    event: "Account deletion request logged",
                    details: "Divyansh Dusad (30d cool-off)",
                    date: "Today",
                  },
                  {
                    event: "Consent record withdrawn",
                    details: "Aadhaar data link for LN-9012",
                    date: "11 Mar",
                  },
                  {
                    event: "Data pack download zipped",
                    details: "Delivered to Rohit Sharma email",
                    date: "09 Mar",
                  },
                ].map((row, idx) => (
                  <div key={idx} className="p-2.5 rounded border border-border bg-card">
                    <p className="font-semibold text-foreground">{row.event}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {row.details} · {row.date}
                    </p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* GRIEVANCE RESOLUTION POPUP DIALOG */}
        {activeGrievance && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-[460px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                  <AlertTriangle className="size-5 text-primary" /> Grievance Case:{" "}
                  {activeGrievance.id}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="bg-surface border border-border rounded-lg p-3 max-h-48 overflow-y-auto space-y-2.5">
                  {activeGrievance.messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${m.sender === "gro" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`rounded-lg px-2.5 py-1.5 max-w-[85%] ${m.sender === "gro" ? "bg-primary text-primary-foreground" : "bg-neutral-100 text-foreground"}`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[9px] text-muted-foreground mt-0.5 px-0.5">
                        {m.time}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendGroReply} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={groText}
                    onChange={(e) => setGroText(e.target.value)}
                    placeholder="Type legal redressal reply..."
                    className="flex-1 rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button type="submit" size="sm">
                    Reply
                  </Button>
                </form>
              </div>

              <div className="pt-2 border-t border-border flex justify-between items-center">
                <Button size="sm" variant="ghost" onClick={() => setActiveGrievanceId(null)}>
                  Close View
                </Button>
                {activeGrievance.status !== "Resolved" && (
                  <Button size="sm" onClick={handleResolveGrievance}>
                    Resolve Complaint
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
