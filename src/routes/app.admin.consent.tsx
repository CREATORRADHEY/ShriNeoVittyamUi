import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Eye,
  Trash2,
  Calendar,
  FileText,
} from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/consent")({
  head: () => ({
    meta: [
      { title: "Consent Ledger — ShriNeo Capital" },
      {
        name: "description",
        content:
          "An auditable record of every borrower consent, its purpose, expiry and withdrawal status.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminConsentPage,
});

interface ConsentRecord {
  id: string;
  borrowerName: string;
  purpose: string;
  source: string;
  recipient: string;
  expiryDate: string;
  status: "Granted" | "Expired" | "Withdrawn";
}
function AdminConsentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedConsentId, setSelectedConsentId] = useState<string>("CNS-88401");

  const [consents, setConsents] = useState<ConsentRecord[]>([
    {
      id: "CNS-88401",
      borrowerName: "Sunita Rao",
      purpose: "TransUnion CIBIL soft pull",
      source: "Aadhaar Match API",
      recipient: "SBI Digital Finance",
      expiryDate: "12 Sep 2026",
      status: "Granted",
    },
    {
      id: "CNS-88392",
      borrowerName: "Imran Qureshi",
      purpose: "Bank account aggregations",
      source: "HDFC Aggregator portal",
      recipient: "SBI Digital Finance",
      expiryDate: "11 Mar 2026",
      status: "Expired",
    },
    {
      id: "CNS-88344",
      borrowerName: "Divyansh Dusad",
      purpose: "PAN card identity soft checks",
      source: "PAN Database API",
      recipient: "Kaveri Gramin Bank",
      expiryDate: "04 Mar 2026",
      status: "Withdrawn",
    },
  ]);

  const handleWithdrawConsent = (id: string) => {
    setConsents((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          toast.success(`Consent record ${c.id} revoked.`);
          return { ...c, status: "Withdrawn" as const };
        }
        return c;
      }),
    );
  };

  const filteredConsents = consents.filter((c) => {
    const matchesSearch =
      c.borrowerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const selectedConsent = consents.find((c) => c.id === selectedConsentId);

  return (
    <PortalShell
      role="admin"
      title="Consent & Data Governance"
      subtitle="RBI-compliant auditable records of user consent, data recipients, and retention periods"
    >
      <div className="space-y-6 text-xs">
        {/* KPI Row */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Consents Granted"
            value="1,84,204 Records"
            hint="Active approvals"
            tone="success"
          />
          <KpiCard label="Consents Revoked/Withdrawn" value="824 Records" hint="Month to Date" />
          <KpiCard label="Data Retention Compliance" value="99.9%" hint="No orphaned files" />
          <KpiCard label="Average Consent Expiry" value="180 days" hint="Platform standard limit" />
        </div>

        {/* Workspace */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <SectionCard title="Consent Audit Ledger">
              {/* Search & Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-surface p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted-foreground">Consent Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded border border-border bg-card px-2.5 py-1 text-xs focus:outline-none"
                  >
                    <option value="All">All Records</option>
                    <option value="Granted">Granted / Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                </div>

                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by purpose, recipient or client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded border border-border bg-background pl-8 pr-3 py-1 text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground bg-surface">
                      <th scope="col" className="p-3">
                        Consent ID
                      </th>
                      <th scope="col" className="p-3">
                        Borrower
                      </th>
                      <th scope="col" className="p-3">
                        Purpose
                      </th>
                      <th scope="col" className="p-3">
                        Recipient
                      </th>
                      <th scope="col" className="p-3">
                        Expiry
                      </th>
                      <th scope="col" className="p-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConsents.map((c) => (
                      <tr
                        key={c.id}
                        className={`border-b border-border hover:bg-neutral-50 cursor-pointer ${selectedConsentId === c.id ? "bg-primary/5 font-semibold" : ""}`}
                        onClick={() => setSelectedConsentId(c.id)}
                      >
                        <td className="p-3 font-semibold text-foreground">{c.id}</td>
                        <td className="p-3 font-semibold text-foreground">{c.borrowerName}</td>
                        <td className="p-3 text-muted-foreground">{c.purpose}</td>
                        <td className="p-3 text-muted-foreground">{c.recipient}</td>
                        <td className="num p-3 text-muted-foreground">{c.expiryDate}</td>
                        <td className="p-3">
                          <StatusBadge
                            tone={
                              c.status === "Granted"
                                ? "success"
                                : c.status === "Withdrawn"
                                  ? "error"
                                  : "neutral"
                            }
                          >
                            {c.status}
                          </StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            {selectedConsent && (
              <SectionCard title="Consent Record Detail">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-foreground">
                      {selectedConsent.id}
                    </span>
                    <StatusBadge
                      tone={
                        selectedConsent.status === "Granted"
                          ? "success"
                          : selectedConsent.status === "Withdrawn"
                            ? "error"
                            : "neutral"
                      }
                    >
                      {selectedConsent.status}
                    </StatusBadge>
                  </div>

                  <dl className="grid gap-2 border-t border-b border-[#DDE7F5] py-3">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Borrower</dt>
                      <dd className="font-semibold text-foreground">
                        {selectedConsent.borrowerName}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-0.5 pt-1">
                      <dt className="text-muted-foreground">Purpose</dt>
                      <dd className="font-semibold text-foreground">{selectedConsent.purpose}</dd>
                    </div>
                    <div className="flex justify-between pt-1">
                      <dt className="text-muted-foreground">Recipient</dt>
                      <dd className="font-semibold text-[#002B98]">{selectedConsent.recipient}</dd>
                    </div>
                    <div className="flex justify-between pt-1">
                      <dt className="text-muted-foreground">Source Channel</dt>
                      <dd className="font-semibold text-foreground">{selectedConsent.source}</dd>
                    </div>
                    <div className="flex justify-between pt-1">
                      <dt className="text-muted-foreground">Expires On</dt>
                      <dd className="font-mono text-foreground font-semibold">
                        {selectedConsent.expiryDate}
                      </dd>
                    </div>
                  </dl>

                  {selectedConsent.status === "Granted" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full flex items-center justify-center gap-1.5"
                      onClick={() => handleWithdrawConsent(selectedConsent.id)}
                    >
                      <Trash2 className="size-4" /> Revoke Consent (Immediate Purge)
                    </Button>
                  )}
                </div>
              </SectionCard>
            )}

            <SectionCard title="Data Retention Policies">
              <div className="space-y-3">
                <div className="rounded-lg bg-surface border border-border p-3 space-y-2">
                  <p className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <Calendar className="size-4 text-primary" /> Retention Rules
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    Under RBI Digital Lending Directions, borrower records must be purged within one
                    working day of a consent withdrawal, except for active loan accounts.
                  </p>
                </div>

                <div className="rounded-lg border p-3 bg-card space-y-3">
                  <span className="font-bold text-foreground block">Active Purge Actions</span>
                  <p className="text-[10px] text-muted-foreground">
                    Manually withdraw consent for selected items if requested via Grievance Officer.
                  </p>
                  <div className="space-y-2 flex flex-col">
                    {filteredConsents.map((c) => (
                      <div
                        key={c.id}
                        className="flex justify-between items-center bg-background border p-2 rounded"
                      >
                        <div>
                          <p className="font-semibold text-foreground">{c.id}</p>
                          <p className="text-[9px] text-muted-foreground truncate max-w-[20ch]">
                            {c.borrowerName}
                          </p>
                        </div>
                        {c.status === "Granted" && (
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => handleWithdrawConsent(c.id)}
                          >
                            <Trash2 className="size-3 text-red-600" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
