import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LifeBuoy,
  AlertTriangle,
  Phone,
  Mail,
  FileUp,
  Send,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/agent/support")({
  head: () => ({
    meta: [
      { title: "Agent Support — ShriNeo Capital" },
      {
        name: "description",
        content: "Contact the agent desk, escalate files, and raise support tickets.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AgentSupportPage,
});

interface AgentTicket {
  id: string;
  subject: string;
  category: string;
  raisedDate: string;
  status: "Open" | "Escalated" | "Resolved";
  slaHours: number;
}

function AgentSupportPage() {
  const { data } = usePrototype();

  const [tickets, setTickets] = useState<AgentTicket[]>([
    {
      id: "SNV-AS-3312",
      subject: "Lender not responding on file SNV-24-118198",
      category: "Stuck File",
      raisedDate: "11 Mar 2026",
      status: "Escalated",
      slaHours: 24,
    },
    {
      id: "SNV-AS-3290",
      subject: "Commission entry missing for Rohit Sharma case",
      category: "Commission",
      raisedDate: "06 Mar 2026",
      status: "Open",
      slaHours: 48,
    },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("file");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill in all details.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const newTkt: AgentTicket = {
        id: `SNV-AS-${Math.floor(3000 + Math.random() * 6999)}`,
        subject: subject,
        category:
          category === "file" ? "Stuck File" : category === "commission" ? "Commission" : "General",
        raisedDate: "Today",
        status: "Open",
        slaHours: category === "file" ? 24 : 48,
      };
      setTickets((prev) => [newTkt, ...prev]);
      setFormOpen(false);
      setSubject("");
      setDescription("");
      setSubmitting(false);
      toast.success(`Support Ticket ${newTkt.id} logged successfully.`);
    }, 1500);
  };

  const handleEscalateStuckFile = (fileId: string) => {
    toast.success(`Escalated File ${fileId} to Senior Underwriting Supervisor.`);
  };

  const isNewOrEmpty = data === "empty";

  return (
    <PortalShell
      role="agent"
      title="Agent Desk Support"
      subtitle="Resolve stuck client files, reconcile commissions, or raise system tickets"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-xs">
          <SectionCard title="Agent Call Helpdesk">
            <p className="text-muted-foreground">Mon-Sat, 9AM-7PM IST. Hotline for active cases.</p>
            <Button asChild size="sm" variant="outline" className="w-full mt-3">
              <a href="tel:1800000111">
                <Phone className="size-3.5 mr-1" /> 1800-000-111
              </a>
            </Button>
          </SectionCard>

          <SectionCard title="Email Agent Desk">
            <p className="text-muted-foreground">
              Submit files or logs directly. 24h SLA response.
            </p>
            <Button asChild size="sm" variant="outline" className="w-full mt-3">
              <a href="mailto:agentdesk@shrineocapital.com">
                <Mail className="size-3.5 mr-1" /> email desk
              </a>
            </Button>
          </SectionCard>

          <SectionCard title="Escalate Stuck File">
            <p className="text-muted-foreground">Force lender status refresh after 48h delay.</p>
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-3"
              onClick={() => {
                setFormOpen(true);
                setCategory("file");
              }}
            >
              Escalate File
            </Button>
          </SectionCard>

          <SectionCard title="Commission appeal">
            <p className="text-muted-foreground">
              Dispute clawbacks, payouts, or ledger adjustments.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-3"
              onClick={() => {
                setFormOpen(true);
                setCategory("commission");
              }}
            >
              Appeal Ledger
            </Button>
          </SectionCard>
        </div>

        {/* STUCK FILE RULES ALERT */}
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-900 text-xs">
          <LifeBuoy className="size-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Escalation SLA Timers</p>
            <p className="mt-1 leading-relaxed">
              Lenders matched on ShriNeo are bound to a <strong>48-hour SLA</strong> for first-time
              credit checks. If a file is stuck beyond this window, use the "Escalate Stuck File"
              action. This sends a priority notification to the bank's operational supervisor.
            </p>
          </div>
        </div>

        {/* ACTIVE SUPPORT TICKETS */}
        <SectionCard
          title="My Open Desk Tickets"
          actions={
            <Button size="sm" onClick={() => setFormOpen(true)}>
              New Ticket
            </Button>
          }
        >
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface text-muted-foreground font-semibold">
                  <th scope="col" className="p-3">
                    Ticket ID
                  </th>
                  <th scope="col" className="p-3">
                    Category
                  </th>
                  <th scope="col" className="p-3">
                    Subject
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
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">{t.id}</td>
                    <td className="p-3 font-mono">{t.category}</td>
                    <td className="p-3 text-foreground">{t.subject}</td>
                    <td className="p-3 text-muted-foreground">{t.raisedDate}</td>
                    <td className="p-3 text-muted-foreground">
                      {t.status === "Resolved" ? "Closed" : `${t.slaHours} Hours`}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${t.status === "Escalated" ? "bg-amber-50 text-amber-700 border border-amber-200" : t.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-neutral-100 text-muted-foreground border border-border"}`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* RAISE TICKET FORM OVERLAY */}
        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <form
              onSubmit={handleRaiseTicket}
              className="w-full max-w-[450px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border pb-2 text-xs">
                <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                  <LifeBuoy className="size-5 text-primary" />
                  {category === "file"
                    ? "Escalate Stuck File"
                    : category === "commission"
                      ? "File Commission Dispute"
                      : "Raise Desk Ticket"}
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label
                    htmlFor="tkt-cat"
                    className="block text-xs font-semibold text-muted-foreground mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="tkt-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="file">Stuck File Escalation</option>
                    <option value="commission">Commission Ledger Dispute</option>
                    <option value="general">General Support Enquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tkt-subject"
                    className="block text-xs font-semibold text-muted-foreground mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="tkt-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={
                      category === "file"
                        ? "Sourced Application ID (e.g. SNV-24-118198)"
                        : "Brief subject"
                    }
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tkt-desc"
                    className="block text-xs font-semibold text-muted-foreground mb-1"
                  >
                    Description & Details
                  </label>
                  <textarea
                    id="tkt-desc"
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about dates, borrower details, or bank partner name."
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </Button>
                {category === "file" && subject.startsWith("SNV") ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      handleEscalateStuckFile(subject);
                      setFormOpen(false);
                    }}
                  >
                    Escalate Now
                  </Button>
                ) : (
                  <Button type="submit" size="sm" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Ticket"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
