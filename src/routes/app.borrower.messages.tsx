import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessagesSquare,
  ShieldAlert,
  CheckCircle2,
  FileUp,
  Send,
  RefreshCw,
  X,
} from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/borrower/messages")({
  head: () => ({
    meta: [
      { title: "Messages — ShriNeo Capital" },
      {
        name: "description",
        content: "Read and reply to messages from your lender, agent and support.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: BorrowerMessagesPage,
});

interface ChatSession {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  status: "Read" | "Action needed" | "Resolved";
  history: {
    sender: "you" | "them";
    text: string;
    time: string;
    status: "read" | "delivered" | "failed";
  }[];
}

function BorrowerMessagesPage() {
  const { data, account } = usePrototype();

  const [activeSessionId, setActiveSessionId] = useState<string>("sbi");
  const [chatInput, setChatInput] = useState("");
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "sbi",
      name: "SBI Digital Finance",
      avatar: "🏦",
      lastMessage: "Address proof mismatch details needed",
      time: "12 Mar",
      unread: true,
      status: "Action needed",
      history: [
        {
          sender: "them",
          text: "We noticed your Aadhaar address doesn't match the current electricity bill. Please upload a mismatch advice letter.",
          time: "12 Mar, 10:00",
          status: "read",
        },
      ],
    },
    {
      id: "agent",
      name: "Agent Rahul Kumar (AG-4471)",
      avatar: "👨‍💼",
      lastMessage: "Documents received, thank you",
      time: "10 Mar",
      unread: false,
      status: "Read",
      history: [
        {
          sender: "you",
          text: "I have uploaded the PAN card. Can you check?",
          time: "10 Mar, 11:00",
          status: "read",
        },
        {
          sender: "them",
          text: "Yes, PAN is verified. Excellent. I have advanced your file.",
          time: "10 Mar, 11:30",
          status: "read",
        },
      ],
    },
    {
      id: "support",
      name: "ShriNeo Support Desk",
      avatar: "🤝",
      lastMessage: "Your grievance ticket TKT-1082 is resolved",
      time: "04 Mar",
      unread: false,
      status: "Resolved",
      history: [
        {
          sender: "them",
          text: "We have updated your phone registry records. The dispute is settled.",
          time: "04 Mar, 15:40",
          status: "read",
        },
      ],
    },
  ]);

  const activeSession = (sessions.find((s) => s.id === activeSessionId) ||
    sessions[0]) as ChatSession;

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const isOffline = data === "offline";
    const statusVal = isOffline ? ("failed" as const) : ("delivered" as const);

    const newMsg = {
      sender: "you" as const,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: statusVal,
    };

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSession.id) {
          return {
            ...s,
            lastMessage: chatInput,
            history: [...s.history, newMsg],
          };
        }
        return s;
      }),
    );
    setChatInput("");

    if (isOffline) {
      toast.error("Message delivery failed. Telecom/internet connection offline.");
      return;
    }

    toast.success("Message sent securely.");

    // Simulate automatic read update after 2 seconds
    setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSession.id) {
            return {
              ...s,
              history: s.history.map((h) =>
                h.text === chatInput ? { ...h, status: "read" as const } : h,
              ),
            };
          }
          return s;
        }),
      );
    }, 2000);

    // Simulate Agent reply
    setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSession.id) {
            return {
              ...s,
              lastMessage: "Underwriter is currently analyzing the file.",
              history: [
                ...s.history,
                {
                  sender: "them" as const,
                  text: "Received your notes. The underwriting team is analyzing the details.",
                  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  status: "read" as const,
                },
              ],
            };
          }
          return s;
        }),
      );
    }, 3500);
  };

  const handleRetryMessage = (msgIndex: number) => {
    if (data === "offline") {
      toast.error("Retry failed. You are still offline.");
      return;
    }
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSession.id) {
          const nextHistory = [...s.history];
          const currentMsg = nextHistory[msgIndex];
          if (currentMsg) {
            nextHistory[msgIndex] = { ...currentMsg, status: "delivered" as const };
          }
          return {
            ...s,
            history: nextHistory,
          };
        }
        return s;
      }),
    );
    toast.success("Message resent successfully.");
  };

  const isNewOrEmpty = data === "empty";

  return (
    <PortalShell
      role="borrower"
      title="Secure Inbox"
      subtitle="Encrypted channels to participating lenders, matched agents and grievance desks"
    >
      {isNewOrEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <MessagesSquare className="size-6" />
          </div>
          <h2 className="mt-4 text-base font-semibold">No messages yet</h2>
          <p className="mt-2 max-w-[45ch] text-xs text-muted-foreground">
            When a lender, agent or our support team needs something from you, the conversation
            threads will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* SESSIONS DIRECTORY LIST */}
          <div className="md:col-span-1 rounded-xl border border-border bg-card overflow-hidden flex flex-col h-[550px]">
            <div className="p-3 border-b border-border bg-surface font-semibold text-xs text-muted-foreground uppercase tracking-wider">
              Conversations
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {sessions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSessionId(s.id)}
                  className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors ${activeSession.id === s.id ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-neutral-50"}`}
                >
                  <span className="text-2xl mt-0.5">{s.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xs text-foreground truncate">{s.name}</p>
                      <span className="text-[9px] text-muted-foreground font-mono">{s.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{s.lastMessage}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded ${s.status === "Action needed" ? "bg-amber-50 text-amber-700 border border-amber-200" : s.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-neutral-100 text-neutral-600 border border-neutral-200"}`}
                      >
                        {s.status}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE CHAT WINDOW */}
          <div className="md:col-span-2 rounded-xl border border-border bg-card overflow-hidden flex flex-col h-[550px]">
            <div className="p-4 border-b border-border bg-surface flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground">{activeSession.name}</h3>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 className="size-3" /> Secure Encrypted Thread
                </p>
              </div>
            </div>

            <div className="p-3 bg-red-50 text-red-900 border-b border-red-200 text-[10px] flex items-start gap-1">
              <ShieldAlert className="size-4 shrink-0 mt-0.5" />
              <p>
                <strong>Safety Warning</strong>: Never share one-time passwords (OTP), bank account
                PINs, credit card numbers, CVVs, or payment links over chat.
              </p>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeSession.history.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === "you" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`rounded-xl px-4 py-2.5 text-xs max-w-[85%] ${msg.sender === "you" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-neutral-100 text-foreground rounded-tl-none"}`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 px-1 text-[9px] text-muted-foreground">
                    <span>{msg.time}</span>
                    {msg.sender === "you" && (
                      <>
                        <span>·</span>
                        {msg.status === "read" && (
                          <span className="text-emerald-700 font-semibold">Read</span>
                        )}
                        {msg.status === "delivered" && <span>Delivered</span>}
                        {msg.status === "failed" && (
                          <div className="flex items-center gap-1 text-red-600 font-semibold">
                            <span>Failed</span>
                            <button
                              type="button"
                              onClick={() => handleRetryMessage(index)}
                              className="underline hover:text-red-700 flex items-center gap-0.5"
                            >
                              <RefreshCw className="size-2.5" /> Retry resending
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form Box */}
            <div className="p-3 border-t border-border bg-surface flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="shrink-0"
                disabled={account === "suspended"}
                onClick={() => toast.info("Document Share vault triggered.")}
              >
                <FileUp className="size-5 text-muted-foreground" />
              </Button>
              <input
                type="text"
                disabled={account === "suspended"}
                placeholder={
                  account === "suspended" ? "Messaging suspended" : "Type secure reply..."
                }
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 rounded border border-border bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
              <Button
                size="icon"
                disabled={account === "suspended"}
                onClick={handleSendMessage}
                className="shrink-0"
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
