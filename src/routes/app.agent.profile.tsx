import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  User,
  ShieldCheck,
  ShieldAlert,
  Landmark,
  MapPin,
  Eye,
  ToggleLeft,
  ToggleRight,
  Trash2,
  KeyRound,
  RefreshCw,
} from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { GEOGRAPHY, CANONICAL_AGENT } from "@/prototype/fixtures";
import { toast } from "sonner";

export const Route = createFileRoute("/app/agent/profile")({
  head: () => ({
    meta: [
      { title: "Agent Profile & Consents — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Manage agent contact details, service area, bank payout setup and security settings.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AgentProfilePage,
});

function AgentProfilePage() {
  const { data, account } = usePrototype();

  // Service Area
  const [selectedState, setSelectedState] = useState<keyof typeof GEOGRAPHY>("Rajasthan");
  const [coverageCities, setCoverageCities] = useState<string[]>(["Jaipur", "Kota"]);

  // Bank details
  const [bankAccount, setBankAccount] = useState("State Bank of India (*4412)");
  const [ifsc, setIfsc] = useState("SBIN000108");
  const [payoutStatus, setPayoutStatus] = useState<"Verified" | "Mismatch" | "Pending">("Mismatch");
  const [editingBank, setEditingBank] = useState(false);

  // Security session logs
  const [sessions, setSessions] = useState([
    { id: "ses-1", device: "Chrome (Windows 11)", location: "Jaipur, India", status: "Active Now" },
    { id: "ses-2", device: "OnePlus 11 (Android)", location: "Jaipur, India", status: "1 day ago" },
  ]);

  const handleToggleCity = (city: string) => {
    setCoverageCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city],
    );
    toast.success(`Service area updated.`);
  };

  const handleVerifyBank = () => {
    setEditingBank(false);
    setPayoutStatus("Pending");
    toast.info("Penny-drop verification initiated. Awaiting bank response...");

    setTimeout(() => {
      setPayoutStatus("Verified");
      toast.success("Bank account successfully verified. Active status enabled.");
    }, 2500);
  };

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Session revoked successfully.");
  };

  const isNewOrEmpty = data === "empty";

  return (
    <PortalShell
      role="agent"
      title="Agent Profile Settings"
      subtitle="Manage your service districts, payout bank accounts, and security access logs"
    >
      {isNewOrEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <User className="size-6" />
          </div>
          <h2 className="mt-4 text-base font-semibold">Profile not setup</h2>
          <p className="mt-2 max-w-[45ch] text-xs text-muted-foreground">
            Complete your onboarding curriculum to activate your verified agent profile.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* GEOGRAPHIC COVERAGE AREA */}
            <SectionCard
              title="Service Area Configuration"
              description="Configure the states and districts you source applications for"
            >
              <div className="space-y-4 text-xs">
                <div>
                  <label
                    htmlFor="agent-state"
                    className="block text-xs font-semibold text-muted-foreground mb-1"
                  >
                    State Region
                  </label>
                  <select
                    id="agent-state"
                    value={selectedState}
                    onChange={(e) => {
                      const st = e.target.value as keyof typeof GEOGRAPHY;
                      setSelectedState(st);
                      setCoverageCities(GEOGRAPHY[st].cities.slice(0, 1));
                    }}
                    className="w-48 rounded border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {Object.keys(GEOGRAPHY).map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <span className="text-muted-foreground font-semibold block mb-1">
                    Select Districts Covered
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {GEOGRAPHY[selectedState].cities.map((city) => {
                      const active = coverageCities.includes(city);
                      return (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleToggleCity(city)}
                          className={`rounded px-3 py-1.5 text-xs font-semibold border transition-all ${active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground"}`}
                        >
                          {city}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* BANK PAYOUT SETUP */}
            <SectionCard
              title="Bank Payout Account"
              actions={
                editingBank ? (
                  <Button size="xs" onClick={handleVerifyBank}>
                    Verify Payout
                  </Button>
                ) : (
                  <Button size="xs" variant="outline" onClick={() => setEditingBank(true)}>
                    Change Account
                  </Button>
                )
              }
            >
              <div className="space-y-4 text-xs">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bank-acc-input" className="text-muted-foreground block mb-1">
                      Account Number & Bank
                    </label>
                    <input
                      id="bank-acc-input"
                      type="text"
                      disabled={!editingBank}
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-75"
                    />
                  </div>
                  <div>
                    <label htmlFor="bank-ifsc-input" className="text-muted-foreground block mb-1">
                      IFSC Code
                    </label>
                    <input
                      id="bank-ifsc-input"
                      type="text"
                      disabled={!editingBank}
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-75"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-start gap-2.5">
                  {payoutStatus === "Mismatch" ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-950 flex gap-2 items-start w-full">
                      <ShieldAlert className="size-5 shrink-0 mt-0.5 text-red-600" />
                      <div>
                        <p className="font-semibold text-sm">Penny-Drop Mismatch Detected</p>
                        <p className="mt-1 leading-relaxed text-xs">
                          The name returned by your bank did not match your registered PAN name
                          exactly. Payouts are on hold. Update the bank details or contact support.
                        </p>
                      </div>
                    </div>
                  ) : payoutStatus === "Pending" ? (
                    <div className="text-amber-700 font-semibold flex items-center gap-1">
                      <RefreshCw className="size-4 animate-spin" /> Verifying penny-drop...
                    </div>
                  ) : (
                    <div className="text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="size-4" /> Account Verified & Active for payouts
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>

            {/* VERIFICATION & AGREEMENT HISTORY */}
            <SectionCard title="Verification & Audit History">
              <div className="divide-y divide-border text-xs">
                {[
                  { item: "Identity KYC (PAN & Aadhaar)", date: "14 Aug 2024", status: "Verified" },
                  {
                    item: "Onboarding Legal Agreement",
                    date: "08 Mar 2026",
                    status: "Signed & Locked",
                  },
                  {
                    item: "Fair Practice training module",
                    date: "05 Mar 2026",
                    status: "Complete",
                  },
                ].map((row, i) => (
                  <div key={i} className="py-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground">{row.item}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Date: {row.date}</p>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">{row.status}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* SIDEBAR SECURITY */}
          <div className="space-y-6">
            <SectionCard title="Security & Device Logs">
              <div className="space-y-3 text-xs">
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    className="p-2.5 rounded border border-border bg-surface flex justify-between items-start"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{s.device}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {s.location} · {s.status}
                      </p>
                    </div>
                    {s.status !== "Active Now" && (
                      <button
                        type="button"
                        onClick={() => handleRevokeSession(s.id)}
                        className="text-red-600 hover:underline font-semibold"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
