import { createFileRoute } from "@tanstack/react-router";

import { PortalPage, type PortalPageSpec } from "@/components/portal/portal-page";

const spec: PortalPageSpec = {
  role: "agent",
  title: "My files",
  subtitle: "Applications you started, with what each one is waiting on.",
  kpis: [
    {
      label: "Active files",
      value: "14",
    },
    {
      label: "Awaiting documents",
      value: "5",
      tone: "warning",
    },
    {
      label: "With lender",
      value: "6",
    },
    {
      label: "Disbursed this month",
      value: "3",
      tone: "success",
    },
  ],
  table: {
    caption: "Your files",
    entity: "files",
    columns: ["Application", "Borrower", "Product", "Amount", "Waiting on", "Status"],
    rows: [
      [
        "SNV-24-118204",
        "R. Verma",
        "Personal",
        "₹3,00,000",
        "Lender decision",
        {
          text: "With lender",
          tone: "info",
        },
      ],
      [
        "SNV-24-118198",
        "S. Khan",
        "Business",
        "₹9,50,000",
        "Bank statement",
        {
          text: "Action needed",
          tone: "warning",
        },
      ],
      [
        "SNV-24-118147",
        "M. Patel",
        "Home",
        "₹41,00,000",
        "Nothing",
        {
          text: "Sanctioned",
          tone: "success",
        },
      ],
    ],
  },
  emptyTitle: "You have not started a file yet",
  emptyExplanation:
    "Start an application for a borrower and it will appear here with its live status.",
  metaTitle: "My files",
  metaDescription:
    "Every application you started, its current stage and the exact item it is waiting on.",
};

export const Route = createFileRoute("/app/agent/files")({
  head: () => ({
    meta: [
      { title: "My files — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Every application you started, its current stage and the exact item it is waiting on.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "My files — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "Every application you started, its current stage and the exact item it is waiting on.",
      },
    ],
  }),
  component: AgentFilesPage,
});

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { StatusBadge, KpiCard, TableState } from "@/components/states";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";

const FILES_DATA = [
  {
    id: "APP-2026-001284",
    borrower: "Rohit Sharma",
    product: "Personal loan",
    amount: 350000,
    waitingOn: "Bank Statement Verification",
    lender: "SBI Digital Finance",
    status: "Under review",
    tone: "warning" as const,
  },
  {
    id: "APP-2026-001198",
    borrower: "Imran Qureshi",
    product: "Business loan",
    amount: 800000,
    waitingOn: "GST Return Upload",
    lender: "Kaveri Bank",
    status: "Action needed",
    tone: "warning" as const,
  },
  {
    id: "APP-2026-001147",
    borrower: "Deepa Nair",
    product: "Home loan",
    amount: 3200000,
    waitingOn: "Property Valuation",
    lender: "SBI Digital Finance",
    status: "Sanctioned",
    tone: "success" as const,
  },
];

export const Route = createFileRoute("/app/agent/files")({
  head: () => ({
    meta: [
      { title: "My files — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Every application you started, its current stage and the exact item it is waiting on.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AgentFilesPage,
});

function AgentFilesPage() {
  const { data } = usePrototype();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = FILES_DATA.filter(
    (f) =>
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.borrower.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.product.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <PortalShell
      role="agent"
      title="My files"
      subtitle="Applications you started, with what each file is currently waiting on"
    >
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Active files" value="14" hint="Assigned in active portal" />
          <KpiCard label="Awaiting documents" value="5" hint="Action required" tone="warning" />
          <KpiCard label="With lender" value="6" hint="Underwriting review" />
          <KpiCard label="Disbursed this month" value="3" hint="Eligible payout" tone="success" />
        </div>

        <SectionCard
          title="Assigned File Workspaces"
          description="Click Open Workspace on any row to open the complete borrower workspace and file controls."
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
            <input
              type="text"
              placeholder="Search file ID, borrower name or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="text-xs text-muted-foreground">
              Showing {filtered.length} of {FILES_DATA.length} active files
            </span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-border text-left uppercase tracking-wider text-muted-foreground bg-surface">
                  <th scope="col" className="p-3 font-semibold">
                    Application ID
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    Borrower
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    Product
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    Amount
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    Lender
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    Waiting On
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="p-3 text-right font-semibold">
                    Workspace Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-0 hover:bg-neutral-50"
                  >
                    <td className="p-3 font-mono font-semibold text-foreground">{row.id}</td>
                    <td className="p-3 font-semibold text-foreground">{row.borrower}</td>
                    <td className="p-3 text-muted-foreground">{row.product}</td>
                    <td className="num p-3 text-foreground font-semibold">
                      {formatINR(row.amount)}
                    </td>
                    <td className="p-3 text-muted-foreground">{row.lender}</td>
                    <td className="p-3 text-muted-foreground">{row.waitingOn}</td>
                    <td className="p-3">
                      <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
                    </td>
                    <td className="p-3 text-right">
                      <Button asChild size="xs" variant="default">
                        <Link to="/app/agent/leads" search={{ fileId: row.id }}>
                          <Eye className="size-3 mr-1" /> Open Workspace
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </PortalShell>
  );
}
