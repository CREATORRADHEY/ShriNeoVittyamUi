import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Search, RefreshCw, CheckCircle2, ShieldAlert, PhoneCall, MessageSquare, Send, X, FileUp } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { GEOGRAPHY, CANONICAL_AGENT } from "@/prototype/fixtures";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/borrower/agents")({
  head: () => ({
    meta: [
      { title: "Find a Loan Agent — ShriNeo Capital" },
      { name: "description", content: "Search and assign a verified loan agent near you." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FindAgentPage,
});

function FindAgentPage() {
  const { agent } = usePrototype();
  
  // Interactive flow states: 'search' | 'matching' | 'assigned'
  const [flowState, setFlowState] = useState<"search" | "matching" | "assigned">("search");
  
  // Search inputs
  const [selectedState, setSelectedState] = useState<keyof typeof GEOGRAPHY>("Rajasthan");
  const [selectedCity, setSelectedCity] = useState("Jaipur");
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
  const [productType, setProductType] = useState("personal");

  // Chat window state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "agent", text: "Namaste Rohit, I am assigned to your Personal Loan draft. How can I help you today?", time: "11:30" }
  ]);

  // Masked call simulation states: 'idle' | 'calling' | 'connected' | 'ended' | 'unavailable' | 'schedule-callback' | 'service-unavailable'
  const [callState, setCallState] = useState<"idle" | "calling" | "connected" | "ended" | "unavailable" | "schedule-callback" | "service-unavailable">("idle");

  const triggerSearch = () => {
    setFlowState("matching");
    setTimeout(() => {
      setFlowState("assigned");
      toast.success(`Agent ${CANONICAL_AGENT.name} matched to your file.`);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { sender: "you", text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");

    // Auto agent reply simulation
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "agent", text: "Sure, please upload the requested bank statements in our chat or directly in your Action Centre.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1500);
  };

  const simulateCall = () => {
    setCallState("calling");
    setTimeout(() => {
      setCallState("connected");
    }, 2000);
  };

  return (
    <PortalShell
      role="borrower"
      title="Find a Loan Agent"
      subtitle="Connect with verified agents in your area to complete applications"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-900 text-xs">
          <ShieldAlert className="size-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Official Agent Guidelines</p>
            <p className="mt-1">
              ShriNeo agents never charge fees. They are paid commissions by lenders. If any agent requests financial compensation, report them immediately.
            </p>
          </div>
        </div>

        {/* 1. SEARCH STATE */}
        {flowState === "search" && (
          <SectionCard title="Search Verified Agents" description="Select service area and product details">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <label htmlFor="state-select" className="block text-xs font-semibold text-muted-foreground mb-1">State</label>
                  <select
                    id="state-select"
                    value={selectedState}
                    onChange={(e) => {
                      const st = e.target.value as keyof typeof GEOGRAPHY;
                      setSelectedState(st);
                      setSelectedCity(GEOGRAPHY[st].cities[0] || "");
                    }}
                    className="w-full rounded border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {Object.keys(GEOGRAPHY).map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="city-select" className="block text-xs font-semibold text-muted-foreground mb-1">City</label>
                  <select
                    id="city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full rounded border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {GEOGRAPHY[selectedState].cities.map((ct) => (
                      <option key={ct} value={ct}>{ct}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="lang-select" className="block text-xs font-semibold text-muted-foreground mb-1">Preferred Communication Language</label>
                  <select
                    id="lang-select"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full rounded border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Gujarati">Gujarati</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="prod-select" className="block text-xs font-semibold text-muted-foreground mb-1">Product</label>
                  <select
                    id="prod-select"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full rounded border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="personal">Personal Loan</option>
                    <option value="business">Business Loan</option>
                    <option value="home">Home Loan</option>
                  </select>
                </div>
              </div>

              <Button size="sm" onClick={triggerSearch} className="flex items-center gap-1.5">
                <Search className="size-4" /> Match Me with an Agent
              </Button>
            </div>
          </SectionCard>
        )}

        {/* 2. MATCHING ANIMATION */}
        {flowState === "matching" && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
            <RefreshCw className="size-8 text-primary animate-spin" />
            <h2 className="mt-4 text-base font-semibold">Matching Verified Agent...</h2>
            <p className="mt-2 max-w-[42ch] text-xs text-muted-foreground">
              Scanning agent availability records for {selectedCity} in the {selectedState} region.
            </p>
          </div>
        )}

        {/* 3. ASSIGNED STATE */}
        {flowState === "assigned" && (
          <div className="space-y-6">
            <SectionCard title="Your Assigned Agent" actions={
              <Button size="xs" variant="outline" onClick={() => setFlowState("search")}>
                Re-assign Agent
              </Button>
            }>
              <div className="flex flex-col sm:flex-row gap-5 items-center p-2">
                <span className="text-5xl">{CANONICAL_AGENT.photo}</span>
                <div className="text-center sm:text-left flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-bold text-base text-foreground">{CANONICAL_AGENT.name}</h3>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 font-semibold px-2 py-0.5 rounded flex items-center gap-0.5">
                      <CheckCircle2 className="size-3" /> VERIFIED AGENT
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Agent ID: {CANONICAL_AGENT.id} · Rating: ⭐ {CANONICAL_AGENT.rating}</p>
                  <p className="text-xs text-foreground">Service Area: {selectedCity} ({selectedState}) · Speaks: {CANONICAL_AGENT.languages.join(", ")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => setChatOpen(true)} className="flex items-center gap-1">
                    <MessageSquare className="size-4" /> Secure Chat
                  </Button>
                  <Button size="sm" variant="outline" onClick={simulateCall} className="flex items-center gap-1">
                    <PhoneCall className="size-4" /> Masked Call
                  </Button>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Agent File Scope & Access Permissions">
              <div className="space-y-4 text-xs">
                <p className="text-muted-foreground">
                  Under RBI fair practice codes, this agent is assigned to your draft personal loan application with restricted access permissions.
                </p>
                <div className="grid gap-3 sm:grid-cols-2 rounded-lg bg-surface border border-border p-4">
                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-bold">Access Scope</span>
                    <span className="font-semibold text-foreground mt-0.5 inline-flex items-center gap-1">
                      <span className="size-2 rounded-full bg-emerald-500" /> Limited File View (Read-Only)
                    </span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-bold">Assigned File ID</span>
                    <span className="font-mono text-foreground font-semibold mt-0.5">APP-2026-001284</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-bold">Active Permissions</span>
                    <span className="text-foreground mt-0.5 block">View checklist, upload requested clarifications, track status</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-bold">Access Expiry</span>
                    <span className="text-foreground mt-0.5 block">19 Mar 2026 (7 days from assignment)</span>
                  </div>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 text-red-950 flex items-start gap-2">
                  <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Consent Revocation</p>
                    <p className="text-[10px] text-red-900 mt-0.5">
                      You can revoke this agent's access at any time from your Consent Manager dashboard. Revoking access will immediately disconnect them from your active file.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* 4. SECURE CHAT INTERFACE OVERLAY */}
        {chatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-[500px] rounded-xl border border-border bg-card shadow-[var(--shadow-overlay)] flex flex-col h-[550px]">
              <div className="p-4 border-b border-border flex items-center justify-between bg-surface rounded-t-xl">
                <div>
                  <h3 className="font-bold text-sm text-foreground">{CANONICAL_AGENT.name}</h3>
                  <p className="text-[10px] text-emerald-600 font-semibold">Secure Agent Session Active</p>
                </div>
                <button type="button" onClick={() => setChatOpen(false)} aria-label="Close Chat" className="rounded-full p-1 text-muted-foreground hover:bg-neutral-100">
                  <X className="size-5" />
                </button>
              </div>

              <div className="p-3 bg-red-50 text-red-900 border-b border-red-200 text-[10px] flex items-start gap-1">
                <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                <p>
                  <strong>Safety Warning</strong>: Never share passwords, bank PINs, credit card numbers, CVVs, or OTP codes with anyone, including verified agents.
                </p>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex flex-col ${msg.sender === "you" ? "items-end" : msg.sender === "system" ? "items-center" : "items-start"}`}>
                    {msg.sender === "system" ? (
                      <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] text-blue-700 font-medium">
                        🛡️ {msg.text} ({msg.time})
                      </div>
                    ) : (
                      <div className={`rounded-xl px-3.5 py-2 text-xs max-w-[80%] ${msg.sender === "you" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-neutral-100 text-foreground rounded-tl-none"}`}>
                        {msg.text}
                      </div>
                    )}
                    {msg.sender !== "system" && (
                      <span className="text-[9px] text-muted-foreground mt-1 px-1">{msg.time} · Delivered</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input Footer */}
              <div className="p-3 border-t border-border bg-surface rounded-b-xl flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="shrink-0"
                  onClick={() => {
                    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    setChatMessages((prev) => [
                      ...prev,
                      { sender: "system", text: "Shared Aadhaar Card from Document Vault. Status: Synced securely.", time }
                    ]);
                    toast.success("Aadhaar Card shared from Document Vault.");
                  }}
                >
                  <FileUp className="size-5 text-muted-foreground" />
                </Button>
                <input
                  type="text"
                  placeholder="Type secure message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 rounded border border-border bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button size="icon" onClick={handleSendMessage} className="shrink-0">
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 5. MASKED CALL SIMULATOR OVERLAY */}
        {callState !== "idle" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-[380px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] text-center space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto animate-pulse">
                <PhoneCall className="size-8" />
              </div>
              
              <div>
                <h3 className="font-bold text-base text-foreground">{CANONICAL_AGENT.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">Calling via ShriNeo Bridge</p>
                <p className="text-[10px] text-emerald-600 font-mono mt-1">Telephony: SYSTEM DEPENDENCY (Bridged number)</p>
              </div>

              {/* Call Status Description */}
              <div className="rounded-lg bg-surface border border-border p-4 text-xs">
                {callState === "calling" && <p className="font-semibold text-primary animate-pulse">Connecting call safely...</p>}
                {callState === "connected" && <p className="font-semibold text-emerald-600">Connected · Call active</p>}
                {callState === "ended" && <p className="font-semibold text-muted-foreground">Call Ended</p>}
                {callState === "unavailable" && <p className="font-semibold text-red-600">Agent Busy / Unavailable</p>}
                {callState === "schedule-callback" && <p className="font-semibold text-primary">Callback request scheduled successfully</p>}
                {callState === "service-unavailable" && <p className="font-semibold text-red-700">ShriNeo Telecom Bridge Down (Service Unavailable)</p>}
              </div>

              {/* Interactive Simulator State Options */}
              <details className="text-left">
                <summary className="text-[10px] text-muted-foreground cursor-pointer hover:underline select-none">
                  Simulation Controls (Debug)
                </summary>
                <div className="grid grid-cols-2 gap-1.5 pt-2">
                  <Button size="xs" variant="outline" onClick={() => setCallState("connected")}>Sim Connect</Button>
                  <Button size="xs" variant="outline" onClick={() => setCallState("unavailable")}>Sim Unavailable</Button>
                  <Button size="xs" variant="outline" onClick={() => setCallState("schedule-callback")}>Sim Callback Request</Button>
                  <Button size="xs" variant="outline" onClick={() => setCallState("service-unavailable")}>Sim Telemetry Error</Button>
                </div>
              </details>

              <div className="pt-2 border-t border-border flex justify-center">
                <Button variant="destructive" size="sm" onClick={() => setCallState("idle")} className="rounded-full px-6">
                  End / Close Call
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
