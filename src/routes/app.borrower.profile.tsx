import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, ShieldCheck, ShieldAlert, Monitor, FileText, ToggleLeft, ToggleRight, Trash2, KeyRound } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/borrower/profile")({
  head: () => ({
    meta: [
      { title: "Profile and Consents — ShriNeo Capital" },
      { name: "description", content: "Manage contact details, language preferences, active consents and sessions." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: BorrowerProfilePage,
});

function BorrowerProfilePage() {
  const { borrower, data } = usePrototype();

  // Contact details states
  const [phone, setPhone] = useState(borrower.phone);
  const [email, setEmail] = useState(borrower.email);
  const [isEditing, setIsEditing] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Consent states
  const [consents, setConsents] = useState([
    { id: "cns-1", title: "CIBIL soft pull query consent", active: true, desc: "Used to retrieve bureau reports for loan comparison." },
    { id: "cns-2", title: "Account Aggregator banking retrieval", active: true, desc: "Allows retrieval of transaction logs for underwriting review." },
    { id: "cns-3", title: "Advisory SNV Trust Score sharing", active: true, desc: "Exposes SNV score to matched lenders during review." }
  ]);

  // Session devices state
  const [sessions, setSessions] = useState([
    { id: "ses-1", device: "Google Chrome (macOS)", location: "Mumbai, India", status: "Active Now" },
    { id: "ses-2", device: "Safari (iPhone 15)", location: "Jaipur, India", status: "2 hours ago" }
  ]);

  const handleSaveContact = () => {
    if (otpSent) {
      if (otp.length < 4) {
        toast.error("Please enter a valid 4-digit OTP.");
        return;
      }
      setIsEditing(false);
      setOtpSent(false);
      setOtp("");
      toast.success("Contact details updated successfully.");
    } else {
      setOtpSent(true);
      toast.info("Verification OTP sent to +91 ******3210.");
    }
  };

  const handleToggleConsent = (id: string, currentVal: boolean) => {
    if (currentVal) {
      toast.warning("Withdrawing consent stops future data retrievals. Active sanctions are unaffected.");
    } else {
      toast.success("Consent successfully granted.");
    }
    setConsents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Session revoked successfully.");
  };

  const handleDownloadData = () => {
    toast.info("Preparing data package. Link will be sent to email within 24 hours.");
  };

  const handleDeleteRequest = () => {
    toast.warning("Account deletion request logged. 30-day cool-off period initiated under data laws.");
  };

  const isNewOrEmpty = data === "empty";

  return (
    <PortalShell
      role="borrower"
      title="Profile & Consents"
      subtitle="Manage your contact details, active consents, security logs and data downloads"
    >
      {isNewOrEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <User className="size-6" />
          </div>
          <h2 className="mt-4 text-base font-semibold">Profile not setup</h2>
          <p className="mt-2 max-w-[45ch] text-xs text-muted-foreground">
            Complete your first application step to initialize your profile and verify your identities.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* PERSONAL DETAILS (LOCKED) */}
            <SectionCard title="Personal Details" description="Verified PAN/Aadhaar information is locked under RBI rules">
              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-muted-foreground block">Full Name</span>
                  <span className="font-semibold text-foreground text-sm mt-0.5 block">{borrower.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Permanent Account Number (PAN)</span>
                  <span className="font-mono font-semibold text-foreground text-sm mt-0.5 block">{borrower.pan}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Aadhaar (Masked)</span>
                  <span className="font-mono text-foreground text-sm mt-0.5 block">{borrower.aadhaar}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Date of Birth</span>
                  <span className="font-mono text-foreground text-sm mt-0.5 block">{borrower.dob}</span>
                </div>
              </div>
              <p className="mt-4 text-[10px] text-muted-foreground">
                To correct spelling or identity errors, raise a support ticket with official gazette proof.
              </p>
            </SectionCard>

            {/* CONTACT DETAILS (EDITABLE) */}
            <SectionCard title="Contact Verification Settings" actions={
              isEditing ? (
                <Button size="xs" onClick={handleSaveContact}>
                  {otpSent ? "Confirm OTP" : "Send OTP"}
                </Button>
              ) : (
                <Button size="xs" variant="outline" onClick={() => setIsEditing(true)}>Edit Contacts</Button>
              )
            }>
              <div className="space-y-4 text-xs">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone-input" className="text-muted-foreground block mb-1">Mobile Number</label>
                    <input
                      id="phone-input"
                      type="text"
                      disabled={!isEditing}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-75"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-input" className="text-muted-foreground block mb-1">Email Address</label>
                    <input
                      id="email-input"
                      type="email"
                      disabled={!isEditing}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-75"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="rounded border border-amber-200 bg-amber-50 p-3 space-y-2">
                    <label htmlFor="phone-otp" className="font-semibold text-amber-950 block">Enter 4-Digit OTP</label>
                    <input
                      id="phone-otp"
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="XXXX"
                      className="w-32 rounded border border-input bg-background px-3 py-1 text-center font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}
              </div>
            </SectionCard>

            {/* CONSENT MANAGER */}
            <SectionCard title="Active Consent Ledger" description="Individual revocations of digital inquiry pipelines">
              <div className="divide-y divide-border text-xs">
                {consents.map((c) => (
                  <div key={c.id} className="py-3 flex justify-between gap-4 items-center">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                        {c.title}
                        {c.active ? (
                          <span className="text-[9px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.2">ACTIVE</span>
                        ) : (
                          <span className="text-[9px] text-red-800 bg-red-50 border border-red-200 rounded px-1.5 py-0.2">REVOKED</span>
                        )}
                      </h4>
                      <p className="text-muted-foreground text-xs mt-0.5">{c.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleConsent(c.id, c.active)}
                      aria-label={`Toggle consent for ${c.title}`}
                      className="text-primary hover:text-primary-strong shrink-0"
                    >
                      {c.active ? <ToggleRight className="size-8" /> : <ToggleLeft className="size-8 text-muted-foreground" />}
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* SIDEBAR SECURITY & PRIVACY */}
          <div className="space-y-6">
            <SectionCard title="Security & Device Logs">
              <div className="space-y-3 text-xs">
                {sessions.map((s) => (
                  <div key={s.id} className="p-2.5 rounded border border-border bg-surface flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <Monitor className="size-3.5 text-muted-foreground" /> {s.device}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.location} · {s.status}</p>
                    </div>
                    {s.status !== "Active Now" && (
                      <button
                        type="button"
                        onClick={() => handleRevokeSession(s.id)}
                        className="text-red-600 hover:underline text-[10px] font-semibold"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Data Privacy Actions">
              <div className="space-y-3 flex flex-col">
                <Button size="sm" variant="outline" className="justify-between text-xs" onClick={handleDownloadData}>
                  <span>Download My Data (PDF)</span>
                  <FileDown className="size-4" />
                </Button>
                <Button size="sm" variant="outline" className="justify-between text-xs border-red-200 text-red-700 hover:bg-red-50" onClick={handleDeleteRequest}>
                  <span>Request Account Deletion</span>
                  <Trash2 className="size-4 text-red-600" />
                </Button>
              </div>
            </SectionCard>
          </div>
        </div>
      )}
    </PortalShell>
  );
}

// File Down helper
function FileDown(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
