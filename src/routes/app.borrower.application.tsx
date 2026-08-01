import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Save } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { InlineState, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/app/borrower/application")({
  head: () => ({
    meta: [
      { title: "Your application — ShriNeo Capital" },
      {
        name: "description",
        content: "A five-step loan application with saved drafts, consent, document upload and review.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Your application — ShriNeo Capital" },
      { property: "og:description", content: "Five-step application flow with clear consent and saved progress." },
    ],
  }),
  component: ApplicationFlow,
});

const STEPS = [
  { id: 1, label: "Your requirement" },
  { id: 2, label: "About you" },
  { id: 3, label: "Income" },
  { id: 4, label: "Documents" },
  { id: 5, label: "Review and consent" },
];

function ApplicationFlow() {
  const { device, data } = usePrototype();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("450000");
  const [errors, setErrors] = useState<{ amount?: string }>({});
  const compact = device === "mobile";

  const amountValue = Number(amount || 0);
  const validate = () => {
    const next: { amount?: string } = {};
    if (!amountValue) next.amount = "Enter the amount you need.";
    else if (amountValue < 10000) next.amount = "The minimum for this product is ₹10,000.";
    else if (amountValue > 500000) next.amount = "The maximum for this product is ₹5,00,000.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return (
    <PortalShell
      role="borrower"
      title="Personal loan application"
      subtitle={`Step ${step} of 5 — ${STEPS[step - 1]!.label}`}
    >
      <div className="flex items-center justify-between gap-3">
        <ol className={`flex flex-1 gap-2 ${compact ? "overflow-x-auto" : ""}`} aria-label="Application progress">
          {STEPS.map((s) => {
            const state = s.id < step ? "done" : s.id === step ? "current" : "todo";
            return (
              <li key={s.id} className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => s.id <= step && setStep(s.id)}
                  disabled={s.id > step}
                  aria-current={state === "current" ? "step" : undefined}
                  className={`flex w-full min-h-11 items-center gap-2 rounded-md border px-3 text-left text-xs transition-colors ${
                    state === "current"
                      ? "border-primary bg-primary/5 text-foreground"
                      : state === "done"
                        ? "border-success/30 bg-success-surface text-foreground"
                        : "border-border bg-surface text-muted-foreground"
                  }`}
                >
                  {state === "done" ? <Check aria-hidden className="size-3.5 shrink-0" /> : <span className="num shrink-0">{s.id}</span>}
                  <span className="truncate">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground" role="status" aria-live="polite">
        <Save aria-hidden className="size-3.5" /> Draft saved automatically. You can leave and return
        without losing anything.
      </p>

      {data === "failed" ? (
        <InlineState
          tone="error"
          title="We couldn't save your last change"
          explanation="Your connection dropped while saving step 3. Nothing earlier was lost."
          safety="Steps 1 and 2 are saved. No application has been submitted."
          actions={[{ label: "Retry saving", variant: "default" }, { label: "Save and exit" }]}
        />
      ) : null}

      <SectionCard title={STEPS[step - 1]!.label}>
        {step === 1 ? (
          <div className="grid max-w-md gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="amount">Amount you need</Label>
              <Input
                id="amount"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? "amount-error" : "amount-hint"}
                className="num"
              />
              <p id="amount-hint" className="text-xs text-muted-foreground">
                Between ₹10,000 and ₹5,00,000. You entered {formatINR(amountValue)}.
              </p>
              {errors.amount ? (
                <p id="amount-error" className="text-xs font-medium text-destructive">
                  {errors.amount}
                </p>
              ) : null}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="purpose">What is it for?</Label>
              <Input id="purpose" placeholder="Medical, education, wedding…" />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid max-w-md gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="pan">PAN</Label>
              <Input id="pan" className="num uppercase" defaultValue="ABCDE1234F" aria-describedby="pan-hint" />
              <p id="pan-hint" className="text-xs text-muted-foreground">
                Used to verify your identity and fetch your credit record with your consent.
              </p>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="pin">PIN code</Label>
              <Input id="pin" className="num" inputMode="numeric" defaultValue="422001" />
            </div>
            <InlineState
              tone="success"
              title="Identity verified"
              explanation="Your PAN matched the name on your KYC record."
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <InlineState
              tone="info"
              title="Share bank statements securely"
              explanation="With Account Aggregator, your bank shares read-only statements directly. ShriNeo Capital never sees your banking password and cannot move money."
              actions={[{ label: "Connect via Account Aggregator", variant: "default" }, { label: "Upload PDF instead" }]}
            />
            {data === "partial" ? (
              <InlineState
                tone="warning"
                title="Only 4 of 6 months received"
                explanation="Your bank returned a shorter period than lenders usually need. You can continue, but fewer lenders may respond."
                actions={[{ label: "Try fetching again" }, { label: "Upload the missing months" }]}
              />
            ) : null}
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-3">
            {[
              { name: "PAN card", status: "Verified", tone: "success" as const },
              { name: "Aadhaar (masked)", status: "Verified", tone: "success" as const },
              { name: "Bank statement — 6 months", status: "Processing", tone: "info" as const },
              { name: "Salary slips — 3 months", status: "Not uploaded", tone: "neutral" as const },
            ].map((d) => (
              <div key={d.name} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3">
                <span className="text-sm text-foreground">{d.name}</span>
                <div className="flex items-center gap-3">
                  <StatusBadge tone={d.tone}>{d.status}</StatusBadge>
                  <Button variant="outline" size="sm">
                    {d.status === "Not uploaded" ? "Upload" : "Replace"}
                  </Button>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              PDF or JPG, up to 10 MB each. Blurred or password-protected files are rejected with an
              explanation so you can re-upload.
            </p>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="grid gap-4">
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                ["Product", "Personal loan"],
                ["Amount requested", formatINR(amountValue)],
                ["Preferred tenure", "24 months"],
                ["Lenders matched", "6 participating lenders"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-surface p-3">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="num mt-1 text-sm text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">What you are agreeing to</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Sharing the details above with matched participating lenders.</li>
                <li>Lenders checking your credit record, which may leave a footprint.</li>
                <li>Receiving offers from lenders — you are never obliged to accept one.</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">
                ShriNeo Capital is a technology platform. Credit decisions, pricing and disbursal are
                made by the lender you choose.
              </p>
            </div>
          </div>
        ) : null}
      </SectionCard>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
          Back
        </Button>
        <Button
          onClick={() => {
            if (step === 1 && !validate()) return;
            setStep((s) => Math.min(5, s + 1));
          }}
        >
          {step === 5 ? "Agree and submit" : "Save and continue"}
        </Button>
        <Button variant="ghost">Save and exit</Button>
      </div>
    </PortalShell>
  );
}
