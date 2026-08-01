import { createFileRoute } from "@tanstack/react-router";
import { FolderOpen, Upload } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { EmptyState, InlineState, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/borrower/documents")({
  head: () => ({
    meta: [
      { title: "Your documents — ShriNeo Capital" },
      {
        name: "description",
        content: "Upload, replace and download the documents supporting your loan application.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Your documents — ShriNeo Capital" },
      { property: "og:description", content: "Clear upload status, rejection reasons and safe re-upload." },
    ],
  }),
  component: DocumentsPage,
});

const DOCS = [
  { name: "PAN card", status: "Verified", tone: "success" as const, note: "Matched your KYC record on 12 Mar." },
  { name: "Aadhaar (masked)", status: "Verified", tone: "success" as const, note: "Only the last four digits are stored." },
  {
    name: "Bank statement — 6 months",
    status: "Processing",
    tone: "info" as const,
    note: "Being read now. This usually takes under two minutes.",
  },
  {
    name: "Salary slip — February",
    status: "Needs re-upload",
    tone: "warning" as const,
    note: "The file was password protected, so it couldn't be opened. Upload an unlocked PDF or a clear photo.",
  },
  {
    name: "Address proof",
    status: "Not uploaded",
    tone: "neutral" as const,
    note: "Required by two of the lenders reviewing your application.",
  },
];

function DocumentsPage() {
  const { data, account } = usePrototype();

  return (
    <PortalShell
      role="borrower"
      title="Your documents"
      subtitle="What we have, what we still need, and why each one is asked for"
    >
      {account === "suspended" ? (
        <InlineState
          tone="warning"
          title="Uploads are paused during your account review"
          explanation="You can still view and download everything already submitted."
          safety="Nothing already uploaded has been deleted."
        />
      ) : null}

      {data === "empty" ? (
        <EmptyState
          icon={FolderOpen}
          title="No documents yet."
          explanation="Documents you upload during an application appear here, along with their verification status."
          actions={[{ label: "Start an application", to: "/app/borrower/apply" }]}
        />
      ) : (
        <SectionCard
          title="Application SNV-APP-48213"
          description="Documents are shared only with the lenders reviewing your request."
          actions={
            <Button size="sm" disabled={account === "suspended"}>
              <Upload aria-hidden className="size-4" /> Upload document
            </Button>
          }
        >
          <ul className="grid gap-3">
            {DOCS.map((d) => (
              <li
                key={d.name}
                className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{d.name}</p>
                  <p className="mt-1 max-w-[60ch] text-sm text-muted-foreground">{d.note}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge tone={d.tone}>{d.status}</StatusBadge>
                  <Button size="sm" variant="outline" disabled={account === "suspended"}>
                    {d.status === "Not uploaded" || d.status === "Needs re-upload" ? "Upload" : "Download"}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {data === "failed" ? (
        <InlineState
          tone="error"
          live
          title="That upload didn't complete"
          explanation="The connection dropped part-way through. The file was not stored, so nothing partial was shared with lenders."
          safety="Your other documents are unaffected."
          actions={[{ label: "Try the upload again", variant: "default" }]}
        />
      ) : null}

      <p className="text-xs text-muted-foreground">
        Accepted formats: PDF, JPG, PNG up to 10 MB. Documents are retained for the period set out in
        our privacy notice and are never sold.
      </p>
    </PortalShell>
  );
}
