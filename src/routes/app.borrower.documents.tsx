import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FolderOpen, Upload, ShieldCheck, KeyRound, Camera, FileUp, AlertTriangle } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { EmptyState, InlineState, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/borrower/documents")({
  head: () => ({
    meta: [
      { title: "Your Documents — ShriNeo Capital" },
      {
        name: "description",
        content: "Upload, replace and download the documents supporting your loan application.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const { data, account, activeDocuments, activeApplication } = usePrototype();
  const [method, setMethod] = useState<"digilocker" | "selfie" | "pdf" | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "processing" | "success">("idle");
  const [selfieState, setSelfieState] = useState<"idle" | "streaming" | "captured">("idle");

  const triggerUploadAction = (docId: string, docName: string) => {
    setSelectedDocId(docId);
    if (docName === "Aadhaar Card" || docName === "PAN Card") {
      setMethod("digilocker");
    } else if (docName.includes("Selfie") || docName.includes("liveness")) {
      setMethod("selfie");
    } else {
      setMethod("pdf");
    }
  };

  const handleDigiLockerSim = () => {
    setUploadState("processing");
    setTimeout(() => {
      setUploadState("success");
      toast.success("Identity verified successfully via DigiLocker.");
      setMethod(null);
      setUploadState("idle");
    }, 2000);
  };

  const handleSelfieSim = () => {
    setSelfieState("streaming");
    setTimeout(() => {
      setSelfieState("captured");
      setUploadState("processing");
      setTimeout(() => {
        setUploadState("success");
        toast.success("Liveness selfie verified successfully.");
        setMethod(null);
        setSelfieState("idle");
        setUploadState("idle");
      }, 1500);
    }, 2000);
  };

  const handlePdfUpload = () => {
    setUploadState("processing");
    setTimeout(() => {
      setUploadState("success");
      toast.success("PDF uploaded successfully.");
      setMethod(null);
      setUploadState("idle");
    }, 2000);
  };

  const isNewOrEmpty = account === "new" || data === "empty" || activeDocuments.length === 0;

  return (
    <PortalShell
      role="borrower"
      title="Your Documents"
      subtitle="What we have, what we still need, and why each one is asked for"
    >
      {account === "suspended" && (
        <InlineState
          tone="warning"
          title="Uploads are paused during your account review"
          explanation="You can still view and download everything already submitted."
          safety="Nothing already uploaded has been deleted."
        />
      )}

      {isNewOrEmpty ? (
        <EmptyState
          icon={FolderOpen}
          title="No documents yet."
          explanation="Documents you upload during an application appear here, along with their verification status."
          actions={[{ label: "Start an application", to: "/app/borrower/apply" }]}
        />
      ) : (
        <div className="space-y-6">
          <SectionCard
            title={activeApplication ? `Application: ${activeApplication.id}` : "Historic Documentation Vault"}
            description="Documents are shared only with the lenders reviewing your request."
            actions={
              <Button size="sm" disabled={account === "suspended"} onClick={() => toast.info("Vault upload triggers.")}>
                <Upload aria-hidden className="size-4" /> Upload Document
              </Button>
            }
          >
            <ul className="grid gap-3">
              {activeDocuments.map((d) => (
                <li
                  key={d.id}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{d.name}</p>
                      <span className="text-[10px] text-muted-foreground font-mono bg-neutral-100 rounded px-1">{d.type}</span>
                    </div>
                    {d.reason && (
                      <p className="mt-1 text-red-700 bg-red-50 border border-red-200 rounded p-1.5 flex items-center gap-1">
                        <AlertTriangle className="size-3.5" /> Rejection: {d.reason}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge tone={d.status === "Accepted" ? "success" : d.status === "Rejected" ? "critical" : "warning"}>
                      {d.status}
                    </StatusBadge>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={account === "suspended"}
                      onClick={() => {
                        if (d.status === "Required" || d.status === "Rejected") {
                          triggerUploadAction(d.id, d.name);
                        } else {
                          toast.success(`Downloading ${d.name}...`);
                        }
                      }}
                    >
                      {d.status === "Required" || d.status === "Rejected" ? "Upload" : "Download"}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* SIMULATION DIALOGS */}
          {method === "digilocker" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <div className="w-full max-w-[400px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] text-center space-y-4">
                <KeyRound className="size-8 text-primary mx-auto" />
                <h3 className="font-bold text-base text-foreground">Verify via DigiLocker</h3>
                <p className="text-xs text-muted-foreground">
                  Connect to your DigiLocker vault to fetch Aadhaar/PAN record credentials safely.
                </p>
                {uploadState === "processing" ? (
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  <div className="flex justify-center gap-2 pt-2">
                    <Button size="sm" onClick={handleDigiLockerSim}>Authorize & Link</Button>
                    <Button size="sm" variant="ghost" onClick={() => setMethod(null)}>Cancel</Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {method === "selfie" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <div className="w-full max-w-[400px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] text-center space-y-4">
                <Camera className="size-8 text-primary mx-auto" />
                <h3 className="font-bold text-base text-foreground">Liveness Selfie Camera</h3>
                <div className="aspect-video w-full rounded-lg border border-border bg-neutral-900 flex items-center justify-center overflow-hidden relative">
                  {selfieState === "idle" && <p className="text-xs text-neutral-400">Click start to launch simulated camera stream</p>}
                  {selfieState === "streaming" && (
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-xs text-neutral-200">
                      <span className="animate-pulse">🔴 CAMERA IN USE — ALIGN YOUR FACE</span>
                    </div>
                  )}
                  {selfieState === "captured" && (
                    <div className="absolute inset-0 bg-emerald-950 flex items-center justify-center text-xs text-emerald-200">
                      <span>✓ SCREEN CAPTURED</span>
                    </div>
                  )}
                </div>
                {uploadState === "processing" ? (
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  <div className="flex justify-center gap-2 pt-2">
                    {selfieState === "idle" ? (
                      <Button size="sm" onClick={handleSelfieSim}>Start Stream</Button>
                    ) : (
                      <Button size="sm" disabled>Capturing...</Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => { setMethod(null); setSelfieState("idle"); }}>Cancel</Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {method === "pdf" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <div className="w-full max-w-[400px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] text-center space-y-4">
                <FileUp className="size-8 text-primary mx-auto" />
                <h3 className="font-bold text-base text-foreground">Upload Statements PDF</h3>
                <p className="text-xs text-muted-foreground">Select statements from your device. PDF up to 10MB.</p>
                {uploadState === "processing" ? (
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  <div className="flex justify-center gap-2 pt-2">
                    <Button size="sm" onClick={handlePdfUpload}>Select PDF File</Button>
                    <Button size="sm" variant="ghost" onClick={() => setMethod(null)}>Cancel</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {data === "failed" && (
        <InlineState
          tone="error"
          live
          title="That upload didn't complete"
          explanation="The connection dropped part-way through. The file was not stored, so nothing partial was shared with lenders."
          safety="Your other documents are unaffected."
          actions={[{ label: "Try the upload again", variant: "default" }]}
        />
      )}

      <p className="text-xs text-muted-foreground mt-4">
        Accepted formats: PDF, JPG, PNG up to 10 MB. Documents are retained for the period set out in
        our privacy notice and are never sold.
      </p>
    </PortalShell>
  );
}
