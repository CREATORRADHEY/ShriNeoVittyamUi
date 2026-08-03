import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  ConsequenceModal,
  DetailPopover,
  DismissibleNote,
  InfoTip,
  LiveValue,
  OutcomeRecord,
  ResponsivePanel,
  SelectableOffer,
} from "@/components/motion/overlays";
import { Reveal } from "@/components/sections/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/motion")({
  component: MotionSystemRoute,
  head: () => ({
    meta: [
      { title: "Motion System — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Internal reference for ShriNeo Capital's motion language: durations, easing, reveals, overlays, and status-change behaviour.",
      },
      { property: "og:title", content: "Motion System — ShriNeo Capital" },
      {
        property: "og:description",
        content:
          "Durations, easing curves, overlays and status animations used across the ShriNeo Capital prototype.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const DURATIONS = [
  ["--motion-instant", "80ms", "Press feedback, checkbox marks"],
  ["--motion-fast", "140ms", "Hover, tooltips, small toggles"],
  ["--motion-standard", "220ms", "Cards, popovers, dialogs"],
  ["--motion-moderate", "320ms", "Drawers, sheets, step changes"],
  ["--motion-slow", "450ms", "Section reveals, value highlights"],
];

const EASINGS = [
  ["--ease-standard", "cubic-bezier(0.2, 0, 0, 1)", "Most transitions"],
  ["--ease-enter", "cubic-bezier(0.05, 0.7, 0.1, 1)", "Entering surfaces"],
  ["--ease-exit", "cubic-bezier(0.3, 0, 0.8, 0.15)", "Leaving surfaces"],
];

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="border-t border-border py-10">
        <h2 className="editorial text-2xl text-foreground">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{note}</p>
        <div className="mt-6">{children}</div>
      </section>
    </Reveal>
  );
}

function MotionSystemRoute() {
  const [modal, setModal] = useState<null | "confirm" | "sensitive" | "security">(null);
  const [drawer, setDrawer] = useState(false);
  const [selected, setSelected] = useState("axis");
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [step, setStep] = useState(1);
  const [upload, setUpload] = useState<"idle" | "uploading" | "verifying" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [note, setNote] = useState(true);
  const [balance, setBalance] = useState("₹4,82,150");

  function startUpload() {
    setUpload("uploading");
    setProgress(0);
    let value = 0;
    const timer = setInterval(() => {
      value += 12;
      setProgress(Math.min(value, 100));
      if (value >= 100) {
        clearInterval(timer);
        setUpload("verifying");
        setTimeout(() => {
          setUpload("done");
          toast.success("Bank statement verified", {
            description: "Three months of statements were read successfully.",
          });
        }, 1400);
      }
    }, 220);
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-12 sm:px-8">
      <header className="hero-enter">
        <p className="label-micro text-muted-foreground">Internal reference</p>
        <h1 className="editorial mt-2 text-4xl text-foreground sm:text-5xl">Motion system</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Motion at ShriNeo Capital confirms actions, explains change and preserves orientation.
          Every behaviour on this page collapses to an instant state change under{" "}
          <span className="num">prefers-reduced-motion</span>.
        </p>
      </header>

      <Section title="Tokens" note="Durations and easing curves are the only permitted values.">
        <div className="grid gap-6 md:grid-cols-2">
          <dl className="rounded-xl border border-border bg-card p-5 text-sm">
            {DURATIONS.map(([token, value, use]) => (
              <div key={token} className="flex items-baseline justify-between gap-3 border-b border-border py-2 last:border-0">
                <dt className="num text-foreground">{token}</dt>
                <dd className="text-right text-muted-foreground">
                  <span className="num text-foreground">{value}</span>
                  <span className="block text-xs">{use}</span>
                </dd>
              </div>
            ))}
          </dl>
          <dl className="rounded-xl border border-border bg-card p-5 text-sm">
            {EASINGS.map(([token, value, use]) => (
              <div key={token} className="border-b border-border py-2 last:border-0">
                <dt className="num text-foreground">{token}</dt>
                <dd className="num text-xs text-muted-foreground">{value}</dd>
                <dd className="text-xs text-muted-foreground">{use}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section
        title="Cards and selection"
        note="Marketing cards lift by 2px; financial cards change border and background only. Selection is a state, not a celebration."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <article className="card-interactive rounded-xl border border-border bg-card p-5">
            <h3 className="font-medium text-foreground">Marketing card</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Hover lifts the surface slightly and deepens the shadow. No scaling, no rotation.
            </p>
          </article>
          <div className="space-y-3">
            <SelectableOffer
              lender="Axis Bank"
              apr="13.4%"
              emi="₹18,240"
              total="₹8,75,520"
              selected={selected === "axis"}
              onSelect={() => setSelected("axis")}
            />
            <SelectableOffer
              lender="IDFC First"
              apr="12.9%"
              emi="₹18,010"
              total="₹8,64,480"
              selected={selected === "idfc"}
              onSelect={() => setSelected("idfc")}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Tooltips and popovers"
        note="Tooltips define a term in one line. Popovers carry short structured detail; anything longer belongs on the page."
      >
        <div className="flex flex-wrap items-center gap-6">
          <p className="text-sm text-muted-foreground">
            Your offer shows an{" "}
            <InfoTip term="APR">
              The yearly cost of the loan including interest and fees, expressed as a percentage.
            </InfoTip>{" "}
            alongside the monthly instalment.
          </p>
          <DetailPopover
            triggerLabel="View cost breakdown"
            title="Total cost of this loan"
            rows={[
              { label: "Principal", value: "₹6,00,000" },
              { label: "Interest over 48 months", value: "₹2,52,480" },
              { label: "Processing fee", value: "₹12,000", note: "2% of principal" },
              { label: "Total repayment", value: "₹8,64,480", strong: true },
            ]}
            footnote="Indicative figures. Final terms are confirmed in the Key Fact Statement."
          />
        </div>
      </Section>

      <Section
        title="Buttons and inputs"
        note="Press gives a 1px settle. Validation reveals the message with a 4px rise; only OTP failure uses a single corrective nudge."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast("Draft saved", { description: "Resume any time in the next 30 days." })}>
              Save draft
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.error("We could not reach the bank", {
                  description: "Nothing was submitted. Try again in a few minutes.",
                  action: { label: "Retry", onClick: () => toast.success("Connection restored") },
                })
              }
            >
              Trigger failure toast
            </Button>
            <Button variant="ghost" onClick={() => setBalance(balance === "₹4,82,150" ? "₹4,63,910" : "₹4,82,150")}>
              Update balance
            </Button>
          </div>
          <div className="space-y-4">
            <div className={cn(invalid && "nudge-once")}>
              <Label htmlFor="motion-email">Work email</Label>
              <Input
                id="motion-email"
                value={email}
                aria-invalid={invalid}
                aria-describedby={invalid ? "motion-email-error" : undefined}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setInvalid(false);
                }}
                onBlur={() => setInvalid(email.length > 0 && !email.includes("@"))}
                className={cn(invalid && "border-destructive")}
              />
              {invalid ? (
                <p id="motion-email-error" className="route-enter mt-1.5 text-sm text-destructive">
                  Enter an email address that includes an @ symbol.
                </p>
              ) : null}
            </div>
            <LiveValue label="Outstanding principal" value={balance} asOf="today, 09:40" />
          </div>
        </div>
      </Section>

      <Section
        title="Step transitions"
        note="Application steps move horizontally by 12px and crossfade. Progress never rewinds visually."
      >
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((index) => (
              <span
                key={index}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  index <= step ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </div>
          <div key={step} className="route-enter mt-5">
            <p className="label-micro text-muted-foreground">Step {step} of 3</p>
            <h3 className="mt-1 text-lg font-medium text-foreground">
              {step === 1 ? "What you need" : step === 2 ? "Confirm your identity" : "Review and consent"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Content enters from the direction of travel so the sequence stays legible.
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            <Button variant="outline" disabled={step === 1} onClick={() => setStep((value) => value - 1)}>
              Back
            </Button>
            <Button disabled={step === 3} onClick={() => setStep((value) => value + 1)}>
              Continue
            </Button>
          </div>
        </div>
      </Section>

      <Section
        title="Overlays"
        note="Drawers slide from the right on desktop and rise as a bottom sheet on mobile. Sensitive and security dialogs cannot be dismissed by clicking away."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setDrawer(true)}>
            Open detail panel
          </Button>
          <Button variant="outline" onClick={() => setModal("confirm")}>
            Confirmation modal
          </Button>
          <Button variant="outline" onClick={() => setModal("sensitive")}>
            Sensitive financial modal
          </Button>
          <Button variant="outline" onClick={() => setModal("security")}>
            Security modal
          </Button>
        </div>
      </Section>

      <Section
        title="Upload and verification"
        note="Progress is linear and honest. Verification is a distinct state, and the result persists on the page."
      >
        <div className="max-w-md rounded-xl border border-border bg-card p-5">
          <p className="font-medium text-foreground">Bank statement — last 3 months</p>
          {upload === "idle" ? (
            <Button className="mt-4" onClick={startUpload}>
              Upload statement
            </Button>
          ) : null}
          {upload === "uploading" ? (
            <div className="mt-4">
              <Progress value={progress} />
              <p aria-live="polite" className="mt-2 text-sm text-muted-foreground">
                Uploading — <span className="num">{progress}%</span>
              </p>
            </div>
          ) : null}
          {upload === "verifying" ? (
            <p aria-live="polite" className="route-enter mt-4 text-sm text-muted-foreground">
              Checking the document. This usually takes a few seconds.
            </p>
          ) : null}
          {upload === "done" ? (
            <div className="route-enter mt-4 rounded-lg border border-success/40 bg-success-surface p-3 text-sm">
              <p className="font-medium text-foreground">Verified</p>
              <p className="text-muted-foreground">Statements for Apr–Jun 2026 were read successfully.</p>
              <Button variant="ghost" className="mt-2 h-8 px-2" onClick={() => setUpload("idle")}>
                Reset demo
              </Button>
            </div>
          ) : null}
        </div>
      </Section>

      <Section
        title="Accordion and dismissible notes"
        note="Panels expand at 220ms with the standard curve; height and opacity move together."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-4">
            <AccordionItem value="one">
              <AccordionTrigger>When is my EMI debited?</AccordionTrigger>
              <AccordionContent>
                On the date you selected at disbursal, or the next working day if it falls on a holiday.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="two" className="border-0">
              <AccordionTrigger>Can I prepay without a penalty?</AccordionTrigger>
              <AccordionContent>
                Prepayment terms are stated in your Key Fact Statement and vary by lender.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {note ? (
            <DismissibleNote onClose={() => setNote(false)}>
              Dismissible guidance fades out over 140ms and the layout closes the gap smoothly.
            </DismissibleNote>
          ) : (
            <Button variant="outline" onClick={() => setNote(true)}>
              Restore note
            </Button>
          )}
        </div>
      </Section>

      <ResponsivePanel
        open={drawer}
        onOpenChange={setDrawer}
        title="Application ABC-2291"
        description="Personal loan · submitted 12 June 2026"
        wide
        footer={
          <Button className="w-full" onClick={() => setDrawer(false)}>
            Close
          </Button>
        }
      >
        <p className="text-sm text-muted-foreground">
          On desktop this panel slides in from the right over 320ms. On smaller screens the same
          content rises as a bottom sheet with a grab handle and safe-area padding.
        </p>
      </ResponsivePanel>

      <ConsequenceModal
        open={modal === "confirm"}
        onOpenChange={(open) => setModal(open ? "confirm" : null)}
        kind="confirmation"
        title="Withdraw this application?"
        context="Your application has not yet been sent to lenders."
        consequence="The draft is kept for 30 days so you can resume it."
        reversibility="Yes — you can restart from where you left off."
        confirmLabel="Withdraw application"
        cancelLabel="Keep it active"
        onConfirm={() => toast("Application withdrawn", { description: "Your draft is saved for 30 days." })}
      />

      <ConsequenceModal
        open={modal === "sensitive"}
        onOpenChange={(open) => setModal(open ? "sensitive" : null)}
        kind="sensitive"
        title="Accept the IDFC First offer at 12.9% APR?"
        context="Accepting sends your signed consent to the lender."
        affected="Personal loan of ₹6,00,000 over 48 months"
        consequence="A hard credit enquiry is recorded and the offer is locked in."
        reversibility="No — the offer cannot be changed after acceptance."
        auditNote="Your consent, timestamp and IP address are stored."
        nextStep="Disbursal usually completes within two working days."
        confirmLabel="Accept offer"
        cancelLabel="Review offers again"
        onConfirm={() => toast.success("Offer accepted", { description: "IDFC First has been notified." })}
      />

      <ConsequenceModal
        open={modal === "security"}
        onOpenChange={(open) => setModal(open ? "security" : null)}
        kind="security"
        title="Confirm it is you before changing your bank account"
        context="We sent a six-digit code to the mobile number ending 4417."
        consequence="The new account will receive all future disbursals."
        reversibility="Yes — you can change it again after verification."
        confirmLabel="Verify and continue"
        cancelLabel="Cancel change"
        destructive={false}
      >
        <div>
          <Label htmlFor="motion-otp">Verification code</Label>
          <Input id="motion-otp" inputMode="numeric" autoComplete="one-time-code" className="num mt-1" />
        </div>
      </ConsequenceModal>
    </main>
  );
}
