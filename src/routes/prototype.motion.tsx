import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ConfirmationModal,
  CookiePreferenceModal,
  ExternalLinkModal,
  InDevelopmentModal,
  InformationModal,
  InlineNotice,
  PendingButton,
} from "@/components/motion/dialogs";
import { DetailPopover, LiveValue, ResponsivePanel } from "@/components/motion/overlays";
import { Term, TermHint } from "@/components/motion/glossary";
import { Reveal } from "@/components/sections/reveal";
import { calculateEmi } from "@/lib/emi";
import { formatINR } from "@/lib/format";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/prototype/motion")({
  head: () => ({
    meta: [
      { title: "Motion and overlay preview — ShriNeo prototype" },
      {
        name: "description",
        content:
          "Development-only preview of every ShriNeo Capital motion token, overlay family and state transition.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Motion and overlay preview" },
      {
        property: "og:description",
        content: "Internal preview of ShriNeo motion tokens, overlays and state transitions.",
      },
    ],
  }),
  component: MotionPreviewRoute,
});

const TOKENS = [
  ["--motion-instant", "80ms", "Press acknowledgement, checkbox response"],
  ["--motion-fast", "140ms", "Hover, tooltip, link underline"],
  ["--motion-standard", "220ms", "Card selection, accordion, popover"],
  ["--motion-moderate", "300ms", "Modal, drawer, bottom sheet, page content"],
  ["--motion-slow", "450ms", "Large editorial reveal, trust diagram"],
  ["--ease-standard", "cubic-bezier(0.2, 0, 0, 1)", "Most transitions"],
  ["--ease-enter", "cubic-bezier(0, 0, 0.2, 1)", "Entering surfaces"],
  ["--ease-exit", "cubic-bezier(0.4, 0, 1, 1)", "Leaving surfaces"],
];

function Demo({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-border py-8">
      <h2 id={id} className="text-base font-semibold">
        {title}
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{note}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function MotionPreviewRoute() {
  const reduced = usePrefersReducedMotion();

  const [info, setInfo] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [external, setExternal] = useState(false);
  const [cookie, setCookie] = useState(false);
  const [dev, setDev] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [sheetDetail, setSheetDetail] = useState(false);
  const [sending, setSending] = useState(false);

  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(14);
  const [months, setMonths] = useState(36);
  const { monthlyEmi: emi, totalRepayment: total } = calculateEmi({
    principal: amount,
    annualRatePercent: rate,
    tenureMonths: months,
  });

  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const emailError = touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-dvh bg-background">
      <div className="border-b border-border bg-surface">
        <div className="container-page py-10">
          <p className="label-micro inline-flex items-center gap-2 text-muted-foreground">
            <FlaskConical aria-hidden className="size-4" /> Development only
          </p>
          <h1 className="editorial mt-3 text-[clamp(1.75rem,4vw,2.5rem)] tracking-tight">
            Motion and overlay preview
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Every motion token, overlay family and state transition used on the public site, in one
            place. This route is excluded from navigation, the sitemap and search indexing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="min-h-11">
              <Link to="/prototype">Prototype navigator</Link>
            </Button>
            <Button asChild variant="outline" className="min-h-11">
              <Link to="/">Open the public site</Link>
            </Button>
          </div>
          <p
            className="mt-5 inline-flex rounded-lg border border-border bg-card px-3 py-2 text-sm"
            aria-live="polite"
          >
            Reduced motion is currently{" "}
            <strong className="ml-1 font-semibold">{reduced ? "on" : "off"}</strong>
            {reduced ? " — translation and stagger are suppressed." : "."}
          </p>
        </div>
      </div>

      <div className="container-page pb-20">
        <Demo
          id="tokens"
          title="1. Motion tokens"
          note="Defined once in styles.css and mirrored in src/lib/motion.ts. Components never hard-code a duration."
        >
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TOKENS.map(([name, value, use]) => (
              <div key={name} className="rounded-lg border border-border bg-surface p-4">
                <dt className="num text-xs text-muted-foreground">{name}</dt>
                <dd className="num mt-1 text-sm font-semibold break-all">{value}</dd>
                <p className="mt-1 text-xs text-muted-foreground">{use}</p>
              </div>
            ))}
          </dl>
        </Demo>

        <Demo
          id="transition"
          title="2. Page transition"
          note="Content fades in and rises 8px over 300ms. Header and footer stay put, scroll resets, and focus moves to the new H1."
        >
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="min-h-11">
              <Link to="/loans">Navigate to /loans</Link>
            </Button>
            <Button asChild variant="outline" className="min-h-11">
              <Link to="/trust-center">Navigate to /trust-center</Link>
            </Button>
          </div>
        </Demo>

        <Demo
          id="reveal"
          title="3. Section reveal"
          note="Opacity and a 12px rise, once per element, capped at four staggered items 50ms apart."
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Heading", "Supporting visual", "Group item", "Group item"].map((item, index) => (
              <Reveal as="li" key={item + index} delay={index * 50}>
                <div className="rounded-lg border border-border bg-surface p-4 text-sm">{item}</div>
              </Reveal>
            ))}
          </ul>
        </Demo>

        <Demo
          id="cards"
          title="4. Card interaction"
          note="Border and surface change, arrow moves 2px, at most 1px of lift. No scaling, no glow, no continuous movement."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {["Marketing card", "Trust card", "Article card"].map((label, index) => (
              <div
                key={label}
                className={cn(
                  "group rounded-xl border border-border bg-card p-5",
                  index === 1 ? "card-static" : "card-interactive",
                )}
              >
                <p className="text-sm font-semibold">{label}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {index === 1
                    ? "Trust cards change border and background only — they never lift."
                    : "Hover: stronger border, subtle surface shift, arrow nudge."}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read more
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            ))}
          </div>
        </Demo>

        <Demo
          id="buttons"
          title="5. Button states"
          note="Hover darkens and nudges the arrow; press moves 1px down; pending keeps the button width and names the work."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button className="min-h-11">
              Apply for a loan
              <ArrowRight aria-hidden className="size-4" />
            </Button>
            <Button variant="outline" className="min-h-11">
              Secondary action
            </Button>
            <PendingButton
              className="min-h-11"
              pending={sending}
              pendingLabel="Sending message…"
              onClick={() => {
                setSending(true);
                window.setTimeout(() => setSending(false), 1600);
              }}
            >
              Send message
            </PendingButton>
            <Link to="/help-center" className="story-link text-sm font-medium text-primary">
              Text link with underline reveal
            </Link>
          </div>
        </Demo>

        <Demo
          id="tooltip"
          title="6. Tooltips"
          note="Two sentences at most, hover and focus on desktop, tap-to-open bottom sheet on mobile. Never the only home of a fact."
        >
          <p className="max-w-2xl text-sm text-muted-foreground">
            Compare offers on <Term id="apr" /> rather than the headline rate, check the{" "}
            <Term id="processingFee" /> and the <Term id="totalRepayment" />, and read the{" "}
            <Term id="kfs" /> before you sign. Your <Term id="coolingOff" /> is stated there too.
            <TermHint id="accountAggregator" />
          </p>
        </Demo>

        <Demo
          id="popover"
          title="7. Popovers"
          note="Anchored, viewport-clamped, dismissed on Escape or outside interaction, and converted to a bottom sheet on narrow screens."
        >
          <div className="flex flex-wrap gap-3">
            <DetailPopover
              triggerLabel="Loan cost breakdown"
              title="Estimated cost of this loan"
              rows={[
                { label: "Principal", value: formatINR(amount) },
                { label: "Estimated interest", value: formatINR(Math.max(total - amount, 0)) },
                { label: "Processing fee", value: "As disclosed by the lender" },
                { label: "Applicable taxes", value: "As applicable" },
                { label: "Total estimated repayment", value: formatINR(total), strong: true },
              ]}
              footnote="Illustrative structure only. Final figures come from the participating lender's Key Fact Statement."
            />
            <DetailPopover
              triggerLabel="What APR includes"
              title="APR explained"
              footnote="Stated in full on the Compare offers page."
            >
              <p className="mt-2 text-sm text-muted-foreground">
                APR combines interest with mandatory fees, so two loans at the same headline rate
                can still cost different amounts.
              </p>
            </DetailPopover>
            <DetailPopover
              triggerLabel="SNV Trust Score summary"
              title="What this indicator is"
              footnote="Full explanation on the SNV Trust Score page."
            >
              <p className="mt-2 text-sm text-muted-foreground">
                An advisory pre-screening signal shared with lenders. It is not a credit score and
                does not approve or decline a loan.
              </p>
            </DetailPopover>
          </div>
        </Demo>

        <Demo
          id="modals"
          title="8. Modal families"
          note="Backdrop fades 220ms; the dialog rises 10px over 300ms and exits faster. Focus is trapped and returned to the trigger."
        >
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="min-h-11" onClick={() => setInfo(true)}>
              Information modal
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => setConfirm(true)}>
              Confirmation modal
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => setExternal(true)}>
              External-link modal
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => setCookie(true)}>
              Cookie preferences
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => setDev(true)}>
              In-development modal
            </Button>
          </div>
        </Demo>

        <Demo
          id="panels"
          title="9. Drawer and bottom sheet"
          note="The same component: a right-side drawer from 400px upward, a bottom sheet below it, with safe-area padding and an explicit close."
        >
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="min-h-11" onClick={() => setDrawer(true)}>
              Open document checklist drawer
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => setSheetDetail(true)}>
              Open cost breakdown panel
            </Button>
          </div>
        </Demo>

        <Demo
          id="toast"
          title="10. Toasts"
          note="Temporary, non-critical feedback only. Financial outcomes use a persistent record on the page instead."
        >
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="min-h-11" onClick={() => toast("Calculator reset")}>
              Calculator reset
            </Button>
            <Button
              variant="outline"
              className="min-h-11"
              onClick={() => toast.success("Preferences saved")}
            >
              Preferences saved
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => toast("Link copied")}>
              Link copied
            </Button>
          </div>
          <div className="mt-4 max-w-2xl">
            <InlineNotice tone="warning">
              Never a toast: submission failures, consent, payments, approvals, rejections or any
              compliance statement. Those stay on the page.
            </InlineNotice>
          </div>
        </Demo>

        <Demo
          id="accordion"
          title="11. Accordion"
          note="Height and opacity over 220ms with a rotating chevron. aria-expanded is handled by the primitive."
        >
          <Accordion type="single" collapsible className="max-w-2xl">
            {[
              ["Which documents will I need?", "Identity, address and income proof, plus product-specific documents."],
              ["Does checking eligibility affect my score?", "An indicative check does not. A lender's bureau check may be recorded, and we ask first."],
            ].map(([q, a]) => (
              <AccordionItem key={q} value={q as string}>
                <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>

        <Demo
          id="calculator"
          title="12. Calculator update"
          note="Values crossfade with a short surface highlight. Numbers never count upward and bars never redraw from zero."
        >
          <div className="grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="space-y-5">
              <div>
                <Label htmlFor="demo-amount">Amount: {formatINR(amount)}</Label>
                <Slider
                  id="demo-amount"
                  className="mt-3"
                  min={50000}
                  max={2000000}
                  step={10000}
                  value={[amount]}
                  onValueChange={([value]) => setAmount(value ?? amount)}
                />
              </div>
              <div>
                <Label htmlFor="demo-rate">Rate: {rate}%</Label>
                <Slider
                  id="demo-rate"
                  className="mt-3"
                  min={9}
                  max={26}
                  step={0.5}
                  value={[rate]}
                  onValueChange={([value]) => setRate(value ?? rate)}
                />
              </div>
              <div>
                <Label htmlFor="demo-months">Tenure: {months} months</Label>
                <Slider
                  id="demo-months"
                  className="mt-3"
                  min={6}
                  max={84}
                  step={6}
                  value={[months]}
                  onValueChange={([value]) => setMonths(value ?? months)}
                />
              </div>
            </div>
            <div className="grid gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2">
              <LiveValue label="Monthly EMI" value={formatINR(emi)} />
              <LiveValue label="Total repayment" value={formatINR(total)} />
            </div>
          </div>
        </Demo>

        <Demo
          id="form"
          title="13. Form states"
          note="Focus ring in 140ms, error message expands below the field in 220ms, and nothing shakes."
        >
          <div className="max-w-md">
            <Label htmlFor="demo-email">Email address</Label>
            <Input
              id="demo-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={emailError}
              aria-describedby={emailError ? "demo-email-error" : undefined}
              className="mt-2 min-h-11"
              placeholder="you@example.com"
            />
            {emailError ? (
              <p id="demo-email-error" role="alert" className="route-enter mt-2 text-sm text-destructive">
                Enter an email address in the format name@example.com so we can reply.
              </p>
            ) : null}
          </div>
        </Demo>

        <Demo
          id="loading"
          title="14. Loading states"
          note="Skeletons that match the real layout, or named progress copy. Never an endless generic spinner or a fake percentage."
        >
          <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              {loading ? (
                <div className="space-y-3" aria-hidden>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <>
                  <p className="label-micro text-muted-foreground">Loaded</p>
                  <p className="mt-2 text-sm font-semibold">Document guidance</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The skeleton matched this block's shape, so nothing jumped when it resolved.
                  </p>
                </>
              )}
              <p aria-live="polite" className="sr-only">
                {loading ? "Loading document guidance" : "Document guidance loaded"}
              </p>
            </div>
            <div className="flex items-center rounded-xl border border-border bg-surface p-5 text-sm text-muted-foreground">
              Named progress copy: “Preparing the calculator…”, “Loading document guidance…”,
              “Opening support options…”.
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-4 min-h-11"
            onClick={() => {
              setLoading(true);
              window.setTimeout(() => setLoading(false), 1200);
            }}
          >
            Replay loading state
          </Button>
        </Demo>

        <Demo
          id="reduced"
          title="15. Reduced motion"
          note="With prefers-reduced-motion: reduce, translation and stagger are removed, rotating labels stop, and every overlay stays fully usable."
        >
          <ul className="grid max-w-3xl gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {[
              "Section reveals become an immediate opacity change with no rise.",
              "Route transitions change content without translation.",
              "The header's rotating help label holds a single value.",
              "Modals, drawers, sheets and dropdowns keep focus handling and Escape.",
            ].map((item) => (
              <li key={item} className="rounded-lg border border-border bg-surface p-4">
                {item}
              </li>
            ))}
          </ul>
        </Demo>
      </div>

      <InformationModal
        open={info}
        onOpenChange={setInfo}
        title="How offers are ordered"
        body="Offers are listed by total cost of borrowing, not by any commercial arrangement. Nothing is promoted."
      />

      <ConfirmationModal
        open={confirm}
        onOpenChange={setConfirm}
        title="Reset the calculator inputs?"
        context="Amount, rate and tenure return to their default values."
        consequence="Nothing is submitted or stored, so you can set them again immediately."
        confirmLabel="Reset inputs"
        cancelLabel="Keep my inputs"
        onConfirm={() => {
          setAmount(500000);
          setRate(14);
          setMonths(36);
          toast("Calculator reset");
        }}
      />

      <ExternalLinkModal
        open={external}
        onOpenChange={setExternal}
        destinationName="the RBI website"
        destinationUrl="https://www.rbi.org.in/"
        reason="You are being taken to the regulator's own website to read the source material we refer to."
      />

      <CookiePreferenceModal open={cookie} onOpenChange={setCookie} onSave={() => toast("Preferences saved")} />

      <InDevelopmentModal open={dev} onOpenChange={setDev} destination="Sign in" />

      <ResponsivePanel
        open={drawer}
        onOpenChange={setDrawer}
        title="Documents you will be asked for"
        description="Checklist for a business loan application."
      >
        <ul className="space-y-3 text-sm">
          {[
            "PAN and Aadhaar for identity and address",
            "GST returns or Udyam registration",
            "Six months of business bank statements",
            "Latest income tax return, where available",
          ].map((item) => (
            <li key={item} className="rounded-lg border border-border bg-surface p-3">
              {item}
            </li>
          ))}
        </ul>
      </ResponsivePanel>

      <ResponsivePanel
        open={sheetDetail}
        onOpenChange={setSheetDetail}
        wide
        title="Estimated cost breakdown"
        description="Illustrative structure — final figures come from the lender's Key Fact Statement."
        footer={
          <Button className="min-h-11 w-full" onClick={() => setSheetDetail(false)}>
            Close breakdown
          </Button>
        }
      >
        <dl className="divide-y divide-border text-sm">
          {[
            ["Principal", formatINR(amount)],
            ["Estimated interest", formatINR(Math.max(total - amount, 0))],
            ["Processing fee", "As disclosed by the lender"],
            ["Applicable taxes", "As applicable"],
            ["Total estimated repayment", formatINR(total)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-3 py-2.5">
              <dt className="min-w-0 text-muted-foreground">{label}</dt>
              <dd className="num shrink-0 text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </ResponsivePanel>
    </div>
  );
}
