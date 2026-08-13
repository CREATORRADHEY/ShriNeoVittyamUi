import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LifeBuoy, AlertTriangle, Phone, Mail, HelpCircle, ShieldAlert, Send, CheckCircle2 } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/borrower/support")({
  head: () => ({
    meta: [
      { title: "Support — ShriNeo Capital" },
      { name: "description", content: "Raise a support ticket, report fraud, and track grievance redressal." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: BorrowerSupportPage,
});

interface TicketItem {
  id: string;
  subject: string;
  category: string;
  raisedDate: string;
  status: "Open" | "Escalated" | "Resolved";
  slaDays: number;
}

function BorrowerSupportPage() {
  const { activeGrievance, data } = usePrototype();

  const [tickets, setTickets] = useState<TicketItem[]>([
    { id: "TKT-1082", subject: "KYC Mismatch Error", category: "Grievance", raisedDate: "12 Mar 2026", status: "Open", slaDays: 3 },
    { id: "TKT-9912", subject: "Statement not received for Feb", category: "Repayment", raisedDate: "28 Feb 2026", status: "Resolved", slaDays: 5 }
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("general");
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
      const newTkt: TicketItem = {
        id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: subject,
        category: category === "grievance" ? "Grievance" : category === "fraud" ? "Fraud" : "General",
        raisedDate: "Today",
        status: "Open",
        slaDays: category === "grievance" ? 3 : 5
      };
      setTickets((prev) => [newTkt, ...prev]);
      setFormOpen(false);
      setSubject("");
      setDescription("");
      setSubmitting(false);
      toast.success(`Ticket ${newTkt.id} raised successfully.`);
    }, 1500);
  };

  const handleReportFraud = () => {
    toast.error("Emergency Fraud Report submitted to Risk team. Audit logs locked.");
  };

  return (
    <PortalShell
      role="borrower"
      title="Help & Support"
      subtitle="Resolve application issues, track complaints and access RBI grievance officers"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <SectionCard title="Call Customer Support">
            <div className="space-y-2 text-xs">
              <p className="text-muted-foreground">Mon-Sat, 9AM-7PM IST. Calls recorded.</p>
              <Button asChild size="sm" variant="outline" className="w-full flex gap-1.5 items-center justify-center">
                <a href="tel:1800000000"><Phone className="size-3.5" /> 1800-000-000</a>
              </Button>
            </div>
          </SectionCard>

          <SectionCard title="Email Support desk">
            <div className="space-y-2 text-xs">
              <p className="text-muted-foreground">Acknowledge within 24 business hours.</p>
              <Button asChild size="sm" variant="outline" className="w-full flex gap-1.5 items-center justify-center">
                <a href="mailto:support@shrineocapital.com"><Mail className="size-3.5" /> Email support</a>
              </Button>
            </div>
          </SectionCard>

          <SectionCard title="Raise Grievance Escalation">
            <div className="space-y-2 text-xs">
              <p className="text-muted-foreground">Direct path to Grievance Redressal Officer.</p>
              <Button size="sm" variant="outline" className="w-full" onClick={() => { setFormOpen(true); setCategory("grievance"); }}>
                Escalate Complaint
              </Button>
            </div>
          </SectionCard>

          <SectionCard title="Report Security / Fraud">
            <div className="space-y-2 text-xs">
              <p className="text-muted-foreground">Stop third-party commission requests.</p>
              <Button size="sm" variant="destructive" className="w-full flex gap-1 items-center justify-center" onClick={() => { setFormOpen(true); setCategory("fraud"); }}>
                <ShieldAlert className="size-3.5" /> Report Fraud
              </Button>
            </div>
          </SectionCard>
        </div>

        {/* RBI ESCALATION ADVICE CARD */}
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-900 text-xs">
          <HelpCircle className="size-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">RBI Ombudsman Redressal</p>
            <p className="mt-1 leading-relaxed">
              If your complaint remains unresolved for 30 days or is rejected by our Grievance Redressal Officer, you are entitled to escalate directly to the <strong>RBI Integrated Ombudsman</strong> under the Integrated Ombudsman Scheme.
            </p>
            <Button size="xs" variant="outline" className="mt-2 text-blue-900 border-blue-300 hover:bg-blue-100" onClick={() => window.open("https://cms.rbi.org.in", "_blank")}>
              Go to RBI CMS Portal
            </Button>
          </div>
        </div>

        {/* ACTIVE TICKETS LOG */}
        <SectionCard
          title="Active Support Cases"
          actions={
            <Button size="sm" onClick={() => setFormOpen(true)}>
              Raise Ticket
            </Button>
          }
        >
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface text-muted-foreground font-semibold">
                  <th scope="col" className="p-3">Ticket ID</th>
                  <th scope="col" className="p-3">Category</th>
                  <th scope="col" className="p-3">Subject</th>
                  <th scope="col" className="p-3">Raised Date</th>
                  <th scope="col" className="p-3">SLA Timer</th>
                  <th scope="col" className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((tkt) => (
                  <tr key={tkt.id} className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">{tkt.id}</td>
                    <td className="p-3 font-mono">{tkt.category}</td>
                    <td className="p-3 text-foreground">{tkt.subject}</td>
                    <td className="p-3 text-muted-foreground">{tkt.raisedDate}</td>
                    <td className="p-3 text-muted-foreground">{tkt.status === "Resolved" ? "Closed" : `${tkt.slaDays} Days remaining`}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${tkt.status === "Open" ? "bg-amber-50 text-amber-700 border border-amber-200" : tkt.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {tkt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* GRIEVANCE CHAT LOG CORNER */}
        {activeGrievance && (
          <SectionCard title="Active Grievance Dialogue (TKT-1082)" description="Direct messaging to Grievance Redressal desk">
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-surface p-4 space-y-3 h-48 overflow-y-auto">
                {activeGrievance.conversation.map((c, i) => (
                  <div key={i} className={`flex flex-col ${c.sender === "you" ? "items-end" : "items-start"}`}>
                    <div className={`rounded-lg px-3 py-1.5 text-xs max-w-[80%] ${c.sender === "you" ? "bg-primary text-primary-foreground" : "bg-neutral-100 text-foreground"}`}>
                      {c.text}
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-0.5 px-1">{c.time}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type grievance update message..."
                  className="flex-1 rounded border border-border bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  onClick={() => toast.info("Simulated message input.")}
                />
                <Button size="sm" className="flex items-center gap-1">
                  <Send className="size-3.5" /> Send
                </Button>
              </div>
            </div>
          </SectionCard>
        )}

        {/* RAISE TICKET FORM DIALOG */}
        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <form onSubmit={handleRaiseTicket} className="w-full max-w-[450px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                  <LifeBuoy className="size-5 text-primary" />
                  {category === "fraud" ? "Report Fraud Incident" : category === "grievance" ? "Raise Grievance Escalation" : "Raise Support Ticket"}
                </h3>
                <button type="button" onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="size-5" />
                </button>
              </div>

              {category === "fraud" && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-900 text-xs flex gap-1.5 items-start">
                  <ShieldAlert className="size-5 shrink-0 mt-0.5 text-red-600" />
                  <p>
                    <strong>EMERGENCY REPORT</strong>: Stop and submit this form immediately if an agent, clerk, or third-party has requested payments, fees, or OTP codes.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label htmlFor="tkt-subject" className="block text-xs font-semibold text-muted-foreground mb-1">Subject</label>
                  <input
                    id="tkt-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={category === "fraud" ? "Describe fraud attempt (e.g. Agent fee request)" : "Brief subject line"}
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="tkt-desc" className="block text-xs font-semibold text-muted-foreground mb-1">Details & Description</label>
                  <textarea
                    id="tkt-desc"
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide relevant account IDs, timestamps, or Agent names."
                    className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setFormOpen(false)}>Cancel</Button>
                {category === "fraud" ? (
                  <Button type="button" variant="destructive" size="sm" onClick={handleReportFraud}>
                    File Fraud Incident
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

// X Close Icon Helper
function X(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
