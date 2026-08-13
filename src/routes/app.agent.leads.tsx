import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, ShieldAlert, CheckCircle2, User, PhoneCall, MessageSquare, PlusCircle, ArrowRight, Eye, Play } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/app/agent/leads")({
  head: () => ({
    meta: [
      { title: "Leads Workbench — ShriNeo Capital" },
      { name: "description", content: "Review nearby lead requests, accept files, and manage client communications." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AgentLeadsPage,
});

interface LeadItem {
  id: string;
  maskedName: string;
  name: string;
  product: string;
  amount: number;
  location: string;
  age: string;
  status: "Available" | "Assigned" | "Consent Pending";
}

function AgentLeadsPage() {
  const { account, data } = usePrototype();

  const [leads, setLeads] = useState<LeadItem[]>([
    { id: "LD-92014", maskedName: "R*** S***", name: "Rohit Sharma", product: "Personal loan", amount: 350000, location: "Jaipur (RJ)", age: "2h", status: "Available" },
    { id: "LD-91988", maskedName: "I*** Q***", name: "Imran Qureshi", product: "Business loan", amount: 800000, location: "Kota (RJ)", age: "1d", status: "Consent Pending" },
    { id: "LD-91940", maskedName: "D*** N***", name: "Deepa Nair", product: "Home loan", amount: 3200000, location: "Jodhpur (RJ)", age: "4d", status: "Available" }
  ]);

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Simulated messaging chat panel
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "agent", text: "Hello, I am reviewing your document checklist. Please prepare your unlocked bank statements.", time: "10:30" }
  ]);

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  const handleAcceptLead = (id: string) => {
    if (account === "new") {
      toast.error("restricted onboarding state: unapproved agents cannot accept leads.");
      return;
    }
    setLeads(prev =>
      prev.map(l => l.id === id ? { ...l, status: "Assigned" as const } : l)
    );
    toast.success("Lead accepted and locked to your workspace successfully.");
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { sender: "agent" as const, text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory(prev => [...prev, newMsg]);
    setChatInput("");
    toast.success("Message sent securely.");
  };

  const isNewOrEmpty = data === "empty";

  return (
    <PortalShell
      role="agent"
      title="Leads Workbench"
      subtitle="Accept nearby client files and manage secure communication links"
    >
      {isNewOrEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <ListChecks className="size-6" />
          </div>
          <h2 className="mt-4 text-base font-semibold">No leads available</h2>
          <p className="mt-2 max-w-[45ch] text-xs text-muted-foreground">
            There are no nearby client assistance requests in your service areas right now. We will alert you when a lead arrives.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {account === "new" && (
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 text-xs">
              <ShieldAlert className="size-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Leads Acceptance Locked</p>
                <p className="mt-1">
                  Your profile verification is pending. You can review available requests, but locking leads or opening client chats requires active certification.
                </p>
              </div>
            </div>
          )}

          {/* NEARBY REQUESTS TABLE */}
          <SectionCard title="Nearby Requests (Service area: Rajasthan)">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-surface text-muted-foreground font-semibold">
                    <th scope="col" className="p-3">Lead ID</th>
                    <th scope="col" className="p-3">Borrower Name</th>
                    <th scope="col" className="p-3">Product Need</th>
                    <th scope="col" className="p-3">Sanction Requested</th>
                    <th scope="col" className="p-3">Location</th>
                    <th scope="col" className="p-3">Age</th>
                    <th scope="col" className="p-3">Status</th>
                    <th scope="col" className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr
                      key={l.id}
                      className={`border-b border-border transition-colors hover:bg-neutral-50 cursor-pointer ${selectedLeadId === l.id ? "bg-primary/5" : ""}`}
                      onClick={() => setSelectedLeadId(l.id)}
                    >
                      <td className="p-3 font-semibold text-foreground">{l.id}</td>
                      <td className="p-3 font-semibold text-foreground">
                        {l.status === "Assigned" ? l.name : l.maskedName}
                      </td>
                      <td className="p-3 text-muted-foreground">{l.product}</td>
                      <td className="num p-3 text-foreground font-semibold">{formatINR(l.amount)}</td>
                      <td className="p-3 text-muted-foreground">{l.location}</td>
                      <td className="num p-3 text-muted-foreground">{l.age}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${l.status === "Assigned" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : l.status === "Consent Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-primary/10 text-primary border border-primary/20"}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                        {l.status === "Available" ? (
                          <Button size="xs" onClick={() => handleAcceptLead(l.id)}>
                            Accept Request
                          </Button>
                        ) : l.status === "Assigned" ? (
                          <Button size="xs" variant="outline" onClick={() => toast.info("Opening chat...")}>
                            Open File
                          </Button>
                        ) : (
                          <Button size="xs" variant="ghost" disabled>Awaiting OTP</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* LEAD DETAILS & WORKSPACE */}
          {selectedLead && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <SectionCard
                  title={`File Details: ${selectedLead.id}`}
                  description="Detailed checklist audit for matched profile"
                  actions={
                    selectedLead.status === "Assigned" && (
                      <div className="flex gap-2">
                        <Button size="xs" className="flex items-center gap-1" onClick={() => setChatOpen(true)}>
                          <MessageSquare className="size-3" /> Secure Chat
                        </Button>
                        <Button size="xs" variant="outline" className="flex items-center gap-1" onClick={() => toast.success("Connecting masked telephony call via ShriNeo bridge...")}>
                          <PhoneCall className="size-3" /> Call Borrower
                        </Button>
                      </div>
                    )
                  }
                >
                  <div className="space-y-4 text-xs">
                    <div className="rounded-lg bg-surface border border-border p-4">
                      <h4 className="font-semibold text-foreground mb-2">Borrower Profile Data</h4>
                      <dl className="grid gap-2 sm:grid-cols-2">
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Full Name</span>
                          <span className="font-semibold text-foreground mt-0.5 block">
                            {selectedLead.status === "Assigned" ? selectedLead.name : selectedLead.maskedName}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">District Area</span>
                          <span className="font-semibold text-foreground mt-0.5 block">{selectedLead.location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">PAN / Identity Details</span>
                          <span className="font-mono text-foreground mt-0.5 block">
                            {selectedLead.status === "Assigned" ? "ABCDE1234F" : "LOCKED (PII MASKED)"}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px]">Requested Credit Limit</span>
                          <span className="font-semibold text-primary mt-0.5 block">{formatINR(selectedLead.amount)}</span>
                        </div>
                      </dl>
                    </div>

                    {selectedLead.status === "Assigned" && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground uppercase tracking-wider text-[10px]">Document Checklists</h4>
                        <div className="space-y-2">
                          <div className="p-3 border border-border bg-card rounded flex justify-between items-center">
                            <div>
                              <p className="font-semibold">PAN Card Upload</p>
                              <p className="text-[10px] text-muted-foreground">Linked via DigiLocker on 08 Mar 2026</p>
                            </div>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">VERIFIED</span>
                          </div>
                          <div className="p-3 border border-border bg-card rounded flex justify-between items-center">
                            <div>
                              <p className="font-semibold">6 Months Bank Statements</p>
                              <p className="text-[10px] text-red-700 font-semibold bg-red-50 border border-red-200 rounded px-1.5 py-0.5 inline-block mt-1">RE-UPLOAD REQUEST OUTSTANDING</p>
                              <p className="text-[10px] text-muted-foreground mt-1">Reason: PDF file was password locked.</p>
                            </div>
                            <Button size="xs" variant="outline" onClick={() => toast.success("Sent SMS reminder to client.")}>Remind client</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </SectionCard>
              </div>

              {/* SECURE CHAT OVERLAY SIMULATOR */}
              {chatOpen && selectedLead.status === "Assigned" && (
                <div className="md:col-span-1 rounded-xl border border-border bg-card overflow-hidden flex flex-col h-[350px]">
                  <div className="p-3 border-b border-border bg-surface flex justify-between items-center">
                    <span className="font-bold text-xs">Chat with {selectedLead.name}</span>
                    <button type="button" onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="p-2.5 bg-red-50 text-red-900 border-b border-red-200 text-[9px]">
                    **Warning**: Never ask the client for password, PIN, CVV or OTP codes.
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
                    {chatHistory.map((c, i) => (
                      <div key={i} className={`flex flex-col ${c.sender === "agent" ? "items-end" : "items-start"}`}>
                        <div className={`rounded px-2.5 py-1.5 max-w-[80%] ${c.sender === "agent" ? "bg-primary text-primary-foreground" : "bg-neutral-100 text-foreground"}`}>
                          {c.text}
                        </div>
                        <span className="text-[8px] text-muted-foreground mt-0.5 px-0.5">{c.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-border bg-surface flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Type secure reply..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 rounded border border-border bg-background px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button size="icon" className="shrink-0 size-8" onClick={handleSendMessage}>
                      <Send className="size-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
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

// Send Icon Helper
function Send(props: any) {
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
      <line x1="22" x2="11" y1="2" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
