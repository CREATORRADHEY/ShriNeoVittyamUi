import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Headphones,
  User,
  ShieldCheck,
  PlusCircle,
  FileText,
  Globe2,
  Zap,
  Lock,
} from "lucide-react";
import { useI18n } from "@/i18n";
import { homeContent } from "@/content/home-content";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import agentPhotoSrc from "@/assets/photo-agent-suit.png";

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/** Line icons transcribed verbatim from the approved landing reference. */
const STEP_ICONS: ReactNode[] = [
  <svg key="form" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="3.4" y="2.6" width="13.2" height="14.8" rx="2" {...strokeProps} />
    <path d="M6.8 7h6.4M6.8 10.4h6.4M6.8 13.8h3.4" {...strokeProps} />
  </svg>,
  <svg key="match" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="8.8" cy="8.8" r="5.4" {...strokeProps} />
    <path d="M12.8 12.8 17 17" {...strokeProps} />
  </svg>,
  <svg key="doc" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M4.6 2.6h6.6l4.4 4.4v10.4H4.6z" {...strokeProps} />
    <path d="M11.2 2.6V7h4.4M7.4 11h5.2M7.4 14h3.6" {...strokeProps} />
  </svg>,
  <svg key="bank" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M2.6 8.2 10 3.4l7.4 4.8" {...strokeProps} />
    <path d="M4.8 8.6v6.6M8 8.6v6.6M12 8.6v6.6M15.2 8.6v6.6M2.6 17.4h14.8" {...strokeProps} />
  </svg>,
];

/** Need options shown in step 1 of the guided flow */
const GUIDED_NEEDS = [
  {
    id: "first-loan",
    label: "First loan",
    sub: "Understand every step before you apply",
    icon: PlusCircle,
  },
  {
    id: "loan-options",
    label: "Loan options",
    sub: "Compare suitable options with clear explanations",
    icon: Zap,
  },
  { id: "documents", label: "Documents", sub: "Know what may be needed and why", icon: FileText },
  {
    id: "my-language",
    label: "My language",
    sub: "Get guidance in the language you prefer",
    icon: Globe2,
  },
];

/** Steps shown in the progress bar */
const STEPS = ["Your need", "Language", "Connect"];

/**
 * How it works — four rule-topped steps under a single progress line,
 * matching the approved landing reference (background #EEF3FB, hairline
 * rules #ECE7DD, progress #0051AE) in the site's own navy grading.
 */
export function HowItWorksSection() {
  const { language } = useI18n();
  const content = homeContent(language);
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShown(true);
      setSettled(true);
      return;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true);
      setSettled(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  // Once the sequence has played, drop the entrance animation so hover
  // transforms are never overridden by a lingering fill state.
  useEffect(() => {
    if (!shown || settled) return;
    const timer = setTimeout(() => setSettled(true), 900);
    return () => clearTimeout(timer);
  }, [shown, settled]);

  return (
    <section aria-labelledby="hiw-title" className="w-full bg-[#EEF3FB]">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1320px] px-5 py-[clamp(76px,7vw,100px)] sm:px-8 lg:px-12"
      >
        <div
          className={cn(
            "transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)]",
            shown ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0",
          )}
        >
          <p className="font-mono text-[11px] font-semibold tracking-[0.13em] uppercase text-[#0051AE]">
            {content.hiwEyebrow}
          </p>
          <h2
            id="hiw-title"
            className="font-display mt-4 text-[clamp(30px,3.1vw,42px)] leading-[1.14] font-semibold tracking-[-0.028em] text-[#002B98]"
          >
            {content.hiwTitle}
          </h2>
          <p className="mt-4 max-w-[560px] text-[17.5px] leading-[1.6] text-[#5B657D]">
            {content.hiwLead}
          </p>
        </div>

        <div className="relative mt-[clamp(50px,4.5vw,64px)]">
          {/* single hairline across the four steps, filling once on entrance */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 left-0 hidden h-px overflow-hidden bg-[#ECE7DD] lg:block"
          >
            <span
              className="block h-px origin-left bg-[#0051AE] transition-transform duration-[1100ms] ease-out motion-reduce:transition-none"
              style={{ transform: `scaleX(${shown ? 1 : 0})` }}
            />
          </span>

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.steps.map((step, i) => (
              <li
                key={step.title}
                className={cn(
                  "min-w-0 border-t border-[#ECE7DD] pt-[22px]",
                  !shown && "opacity-0",
                  shown && !settled && "animate-[shrineo-rise_330ms_cubic-bezier(0.2,0,0,1)_both]",
                )}
                style={shown && !settled ? { animationDelay: `${120 + i * 95}ms` } : undefined}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E6F1FB] text-[#0051AE]">
                    {STEP_ICONS[i]}
                  </span>
                  <span className="font-mono text-[12.5px] font-semibold tracking-[0.06em] text-[#B4BDCC]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-[18px] text-[18px] font-semibold tracking-[-0.015em] text-[#002B98]">
                  {step.title}
                </h3>
                <p className="mt-[9px] text-[14.5px] leading-[1.65] text-pretty text-[#5B657D]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ─── Interactive "How would you like to apply?" block ─── */}
        <HowApplyBlock shown={shown} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOW WOULD YOU LIKE TO APPLY — Bank-grade structured widget
   ═══════════════════════════════════════════════════════════ */

function HowApplyBlock({ shown }: { shown: boolean }) {
  const [route, setRoute] = useState<"guided" | "self">("guided");
  const [step, setStep] = useState(0);
  const [selectedNeed, setSelectedNeed] = useState<string | null>("first-loan");
  const [selectedLang, setSelectedLang] = useState<"en" | "hi">("en");

  const handleRouteChange = (r: "guided" | "self") => {
    setRoute(r);
    setStep(0);
    setSelectedNeed("first-loan");
    setSelectedLang("en");
  };

  const canContinue = step === 0 ? !!selectedNeed : true;

  return (
    <div
      className={cn(
        /* Outer shell: 10–12px radius, single border, white bg — financial workspace */
        "mt-14 overflow-hidden rounded-[10px] border border-[#DDE5F0] bg-white shadow-[0_4px_24px_-8px_rgba(0,43,152,0.08)]",
        "transition-[opacity,transform] duration-500 ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      {/* ── INTRO AREA: Clean light-themed header matching bank-grade style ── */}
      <div className="relative overflow-hidden border-b border-[#E6ECF4] bg-gradient-to-b from-[#FAFBFF] to-white px-6 pb-8 pt-8 text-center sm:px-10">
        {/* Subtle grid accent background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#002B98 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Centered heading group */}
        <div className="relative z-10 mx-auto max-w-[640px]">
          <h3 className="font-display text-[clamp(22px,2vw,30px)] font-semibold tracking-[-0.022em] text-[#002B98]">
            How would you like to apply?
          </h3>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#5B657D]">
            Choose a self-service journey or get step-by-step help from a verified local agent.
          </p>

          {/* Route cards */}
          <div
            className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            role="radiogroup"
            aria-label="Application route"
          >
            <RouteCard
              id="route-guided"
              active={route === "guided"}
              icon={<Headphones aria-hidden className="size-[18px] shrink-0" />}
              label="Apply with guidance"
              sub="A verified agent helps you"
              onClick={() => handleRouteChange("guided")}
            />
            <RouteCard
              id="route-self"
              active={route === "self"}
              icon={<User aria-hidden className="size-[18px] shrink-0" />}
              label="Apply on my own"
              sub="Complete the digital journey yourself"
              onClick={() => handleRouteChange("self")}
            />
          </div>
        </div>
      </div>

      {/* ── APPLICATION WORKSPACE: left wizard + right panel ── */}
      {route === "guided" ? (
        <GuidedWorkspace
          step={step}
          setStep={setStep}
          selectedNeed={selectedNeed}
          setSelectedNeed={setSelectedNeed}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          canContinue={canContinue}
        />
      ) : (
        <SelfWorkspace />
      )}
    </div>
  );
}

/* ─── Route selection card ─── */
function RouteCard({
  id,
  active,
  icon,
  label,
  sub,
  onClick,
}: {
  id: string;
  active: boolean;
  icon: ReactNode;
  label: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      id={id}
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        /* 8px radius, structured card, no pill */
        "flex w-full items-center gap-3 rounded-[8px] border px-4 py-3 text-left",
        "transition-[border-color,background-color,box-shadow] duration-[160ms]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE] focus-visible:ring-offset-1",
        active
          ? "border-[1.5px] border-[#0051AE] bg-[#F5F8FF] shadow-[0_2px_8px_rgba(0,81,174,0.08)]"
          : "border-[#D8E3F2] bg-white hover:border-[#AFC6E8] hover:bg-[#F8FAFD]",
      )}
    >
      {/* Icon tile */}
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-[6px] transition-colors duration-[160ms]",
          active ? "bg-[#002B98] text-white" : "bg-[#EAF3FC] text-[#0051AE]",
        )}
      >
        {icon}
      </span>

      {/* Text */}
      <div className="min-w-0 flex-1 text-left">
        <p
          className={cn(
            "text-[13.5px] font-semibold leading-tight",
            active ? "text-[#002B98]" : "text-[#0A286F]",
          )}
        >
          {label}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-tight text-[#5B657D]">{sub}</p>
      </div>

      {/* Selection indicator */}
      {active ? (
        <span
          aria-hidden
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#002B98]"
        >
          <Check className="size-3 text-white" strokeWidth={2.5} />
        </span>
      ) : (
        <span aria-hidden className="size-5 shrink-0 rounded-full border-2 border-[#C8D6E8]" />
      )}
    </button>
  );
}

/* ─── Stepper ─── */
function StepProgress({ current }: { current: number }) {
  return (
    <div
      className="grid grid-cols-3 items-center gap-1.5 sm:gap-3 w-full"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={STEPS.length - 1}
      aria-valuenow={current}
      aria-label={`Step ${current + 1} of ${STEPS.length}: ${STEPS[current]}`}
    >
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center gap-1 sm:gap-2 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className={cn(
                  "flex size-6 sm:size-[26px] shrink-0 items-center justify-center rounded-full text-[10px] sm:text-[11px] font-bold transition-colors duration-200",
                  done || active ? "bg-[#002B98] text-white" : "bg-[#E6EFF9] text-[#7A92B4]",
                )}
              >
                {done ? (
                  <Check className="size-3" strokeWidth={2.5} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              <span
                className={cn(
                  "truncate text-[11px] sm:text-[12px] font-medium transition-colors duration-200",
                  active ? "text-[#002B98]" : done ? "text-[#5175A8]" : "text-[#7A92B4]",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1 min-w-[8px] transition-colors duration-500",
                  i < current ? "bg-[#002B98]" : "bg-[#D8E3F2]",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Guided Application Workspace ─── */
function GuidedWorkspace({
  step,
  setStep,
  selectedNeed,
  setSelectedNeed,
  selectedLang,
  setSelectedLang,
  canContinue,
}: {
  step: number;
  setStep: (s: number) => void;
  selectedNeed: string | null;
  setSelectedNeed: (n: string) => void;
  selectedLang: "en" | "hi";
  setSelectedLang: (l: "en" | "hi") => void;
  canContinue: boolean;
}) {
  return (
    /* 70/30 grid — left: work area, right: agent panel.
       On mobile they stack. On lg they sit side by side with no gap
       (the panel feels attached to the shell). */
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]">
      {/* ── LEFT: Wizard ── */}
      <div className="border-b border-[#E6ECF4] px-4 py-6 sm:px-10 lg:border-b-0 lg:border-r lg:py-8">
        {/* Stepper */}
        <div className="w-full">
          <StepProgress current={step} />
        </div>

        {/* Step content */}
        <div className="mt-8">
          {step === 0 && (
            <Step0NeedSelector selectedNeed={selectedNeed} setSelectedNeed={setSelectedNeed} />
          )}
          {step === 1 && (
            <Step1Language selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
          )}
          {step === 2 && <Step2Connect selectedNeed={selectedNeed} selectedLang={selectedLang} />}
        </div>

        {/* Navigation row */}
        <div className="mt-6 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="h-12 min-w-[80px] rounded-[8px] border border-[#D8E3F2] bg-white px-5 text-[13px] font-semibold text-[#002B98] transition-colors hover:border-[#AFC6E8] hover:bg-[#F5F8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]"
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={() => canContinue && setStep(step + 1)}
              disabled={!canContinue}
              className={cn(
                "flex h-12 flex-1 items-center justify-center gap-2 rounded-[8px] text-[13.5px] font-semibold text-white transition-colors duration-150",
                canContinue
                  ? "bg-[#E8A020] hover:bg-[#CC8C18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A020]"
                  : "cursor-not-allowed bg-[#E8A020]/40",
              )}
            >
              Continue
              <ArrowRight aria-hidden className="size-4" />
            </button>
          ) : (
            <Link
              to="/auth/signup"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#002B98] text-[13.5px] font-semibold text-white transition-colors hover:bg-[#001A5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]"
            >
              Connect with an agent
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
        </div>
      </div>

      {/* ── RIGHT: Agent trust panel ── */}
      <AgentTrustPanel />
    </div>
  );
}

/* ─── Step 0: Need selector ─── */
function Step0NeedSelector({
  selectedNeed,
  setSelectedNeed,
}: {
  selectedNeed: string | null;
  setSelectedNeed: (n: string) => void;
}) {
  return (
    <div>
      <p className="font-mono text-[10.5px] font-semibold tracking-[0.13em] uppercase text-[#0051AE]">
        Verified agent assistance
      </p>
      <h4 className="mt-1.5 text-[20px] font-semibold tracking-[-0.018em] text-[#002B98]">
        What would make applying easier?
      </h4>

      {/* 2×2 structured option grid — uniform 8px radius cards */}
      <div
        className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
        role="radiogroup"
        aria-label="What you need help with"
      >
        {GUIDED_NEEDS.map((need) => {
          const Icon = need.icon;
          const active = selectedNeed === need.id;
          return (
            <button
              key={need.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelectedNeed(need.id)}
              className={cn(
                /* Structured 8px card — no large radius */
                "grid grid-cols-[36px_1fr_20px] items-center gap-3 rounded-[8px] border px-4 py-[14px] text-left",
                "transition-[border-color,background-color,transform] duration-[160ms]",
                "hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE] focus-visible:ring-offset-1",
                active
                  ? "border-[1.5px] border-[#0051AE] bg-[#F4F8FF]"
                  : "border-[#D8E3F2] bg-white hover:border-[#AFC6E8] hover:bg-[#F8FAFD]",
              )}
            >
              {/* Icon */}
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-[6px] transition-colors duration-[160ms]",
                  active ? "bg-[#002B98] text-white" : "bg-[#EAF3FC] text-[#0051AE]",
                )}
              >
                <Icon aria-hidden className="size-[17px]" />
              </span>

              {/* Text */}
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-[13.5px] font-semibold leading-tight",
                    active ? "text-[#002B98]" : "text-[#0A286F]",
                  )}
                >
                  {need.label}
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-[#5B657D]">{need.sub}</p>
              </div>

              {/* Action indicator */}
              {active ? (
                <span
                  aria-hidden
                  className="flex size-5 items-center justify-center rounded-full bg-[#002B98]"
                >
                  <Check className="size-[11px] text-white" strokeWidth={2.5} />
                </span>
              ) : (
                <ChevronRight aria-hidden className="size-4 text-[#A8BAD0]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 1: Language preference ─── */
function Step1Language({
  selectedLang,
  setSelectedLang,
}: {
  selectedLang: "en" | "hi";
  setSelectedLang: (l: "en" | "hi") => void;
}) {
  const langs = [
    { id: "en" as const, label: "English", native: "English" },
    { id: "hi" as const, label: "Hindi", native: "हिन्दी" },
  ];
  return (
    <div>
      <p className="font-mono text-[10.5px] font-semibold tracking-[0.13em] uppercase text-[#0051AE]">
        Preferred Communication Language
      </p>
      <h4 className="mt-1.5 text-[20px] font-semibold tracking-[-0.018em] text-[#002B98]">
        Which language do you prefer?
      </h4>
      <div
        className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Preferred Communication Language"
      >
        {langs.map((lang) => {
          const active = selectedLang === lang.id;
          return (
            <button
              key={lang.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelectedLang(lang.id)}
              className={cn(
                "flex items-center justify-between rounded-[8px] border px-4 py-[14px] text-left",
                "transition-[border-color,background-color] duration-[160ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]",
                active
                  ? "border-[1.5px] border-[#0051AE] bg-[#F4F8FF]"
                  : "border-[#D8E3F2] bg-white hover:border-[#AFC6E8] hover:bg-[#F8FAFD]",
              )}
            >
              <div>
                <p
                  className={cn(
                    "text-[15px] font-bold",
                    active ? "text-[#002B98]" : "text-[#0A286F]",
                  )}
                >
                  {lang.native}
                </p>
                <p className="text-[11.5px] text-[#5B657D]">{lang.label}</p>
              </div>
              {active ? (
                <span
                  aria-hidden
                  className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#002B98]"
                >
                  <Check className="size-[11px] text-white" strokeWidth={2.5} />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="size-5 shrink-0 rounded-full border-2 border-[#C8D6E8]"
                />
              )}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-[#5B657D]">
        A verified agent who speaks your preferred language will be matched with you.
      </p>
    </div>
  );
}

/* ─── Step 2: Confirmation summary ─── */
function Step2Connect({
  selectedNeed,
  selectedLang,
}: {
  selectedNeed: string | null;
  selectedLang: "en" | "hi";
}) {
  const needLabel = GUIDED_NEEDS.find((n) => n.id === selectedNeed)?.label ?? "Loan guidance";
  const langLabel = selectedLang === "hi" ? "Hindi (हिन्दी)" : "English";
  return (
    <div>
      <p className="font-mono text-[10.5px] font-semibold tracking-[0.13em] uppercase text-[#0051AE]">
        Ready to connect
      </p>
      <h4 className="mt-1.5 text-[20px] font-semibold tracking-[-0.018em] text-[#002B98]">
        Your preferences are set
      </h4>
      <div className="mt-5 divide-y divide-[#E6ECF4] rounded-[8px] border border-[#D8E3F2] bg-[#F8FAFD]">
        {[
          { label: "Help with", value: needLabel },
          { label: "Language", value: langLabel },
          { label: "Agent type", value: "ShriNeo verified agent" },
          { label: "Contact details", value: "Masked until you consent" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between px-4 py-3">
            <span className="text-[12.5px] text-[#5B657D]">{row.label}</span>
            <span className="text-[13px] font-semibold text-[#002B98]">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-[6px] border border-[#D8E3F2] bg-[#F8FAFD] px-3.5 py-3">
        <Lock aria-hidden className="mt-0.5 size-3.5 shrink-0 text-[#7A92B4]" />
        <p className="text-[11.5px] leading-snug text-[#5B657D]">
          Your contact details stay masked and are shared only with your consent.
        </p>
      </div>
    </div>
  );
}

/* ─── Right: Agent trust panel (Vector Badge Visual System) ─── */
function AgentTrustPanel() {
  return (
    <div className="flex flex-col justify-between bg-[#002272] px-7 py-8 lg:px-8">
      <div>
        {/* Premium Digital Security / Verification Console Card */}
        <div className="relative overflow-hidden rounded-[8px] border border-white/[0.12] bg-[#001A5C] p-5 shadow-inner">
          {/* Subtle glowing orb indicator */}
          <div className="absolute -right-8 -top-8 size-24 rounded-full bg-emerald-500/10 blur-xl" />

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#22C55E]">
              <span className="size-[5px] rounded-full bg-[#22C55E] animate-pulse" />
              Secure Matcher
            </span>
            <span className="text-[10px] font-mono text-white/40">ID: SNV-VERIFIED</span>
          </div>

          {/* Connection Vector Diagram */}
          <div className="my-5 flex items-center justify-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/90">
              <User className="size-5" />
            </div>

            {/* Animated/pulse matching connection lines */}
            <div className="flex flex-1 items-center justify-between px-1">
              <span className="size-1 rounded-full bg-[#22C55E]" />
              <span className="h-[2px] flex-1 bg-gradient-to-r from-[#22C55E] via-[#22C55E]/40 to-white/15" />
              <span className="size-1 rounded-full bg-white/30" />
            </div>

            <div className="flex size-10 items-center justify-center rounded-lg border border-[#22C55E]/30 bg-[#22C55E]/5 text-[#22C55E]">
              <ShieldCheck className="size-5" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-[12.5px] font-semibold text-white">Direct secure link setup</p>
            <p className="mt-0.5 text-[11px] text-white/60">Masking call routes and documents</p>
          </div>
        </div>

        {/* Trust heading */}
        <h4 className="mt-6 text-[18px] font-bold leading-[1.35] text-white">
          Guidance, while you stay in control.
        </h4>

        {/* Bullets */}
        <ul aria-label="Agent assistance guarantees" className="mt-4 space-y-3">
          {[
            "Explains options and documents",
            "Cannot accept an offer for you",
            "Application stays tracked on ShriNeo",
          ].map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <Check
                aria-hidden
                className="mt-0.5 size-3.5 shrink-0 text-[#22C55E]"
                strokeWidth={2.5}
              />
              <span className="text-[13px] leading-snug text-white/80">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Privacy notice */}
      <div className="mt-6 flex items-start gap-2.5 rounded-[7px] border border-white/[0.18] bg-white/[0.06] px-3.5 py-3">
        <ShieldCheck aria-hidden className="mt-0.5 size-3.5 shrink-0 text-white/50" />
        <p className="text-[11.5px] leading-snug text-white/55">
          Your contact details stay masked and are shared only with your consent.
        </p>
      </div>
    </div>
  );
}

/* ─── Self-service workspace ─── */
function SelfWorkspace() {
  const steps = [
    {
      num: "01",
      title: "Complete your profile",
      body: "Enter your details and verify identity using your Aadhaar-linked DigiLocker — takes about 2 minutes.",
    },
    {
      num: "02",
      title: "Compare matched offers",
      body: "See eligible loan options from participating lenders with full APR, EMI and total cost breakdowns.",
    },
    {
      num: "03",
      title: "Choose and e-sign",
      body: "Select your preferred offer, review the Key Fact Statement, and sign digitally. No branch visit needed.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]">
      {/* Left: steps */}
      <div className="border-b border-[#E6ECF4] px-6 py-7 sm:px-10 lg:border-b-0 lg:border-r lg:py-8">
        <p className="font-mono text-[10.5px] font-semibold tracking-[0.13em] uppercase text-[#0051AE]">
          Digital journey
        </p>
        <h4 className="mt-1.5 text-[20px] font-semibold tracking-[-0.018em] text-[#002B98]">
          Three steps, entirely online
        </h4>

        <ol className="mt-6 space-y-1">
          {steps.map((s, i) => (
            <li key={s.num}>
              <div className="flex gap-4 py-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#E6EFF9] text-[11px] font-bold text-[#0051AE]">
                  {s.num}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[14px] font-semibold text-[#002B98]">{s.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#5B657D]">{s.body}</p>
                </div>
              </div>
              {i < steps.length - 1 && <div className="h-px bg-[#E6ECF4]" />}
            </li>
          ))}
        </ol>

        <div className="mt-6">
          <Link
            to="/auth/signup"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#002B98] text-[13.5px] font-semibold text-white transition-colors hover:bg-[#001A5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]"
          >
            Start my application
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>

      {/* Right: key facts panel */}
      <div className="bg-[#FAFBFF] px-6 py-7 sm:px-8 lg:py-8">
        <p className="text-[13px] font-semibold text-[#002B98]">Why self-service?</p>
        <ul aria-label="Self-service advantages" className="mt-4 space-y-4">
          {[
            { icon: Zap, title: "~6 minutes", sub: "Average time to complete the application" },
            {
              icon: ShieldCheck,
              title: "Fully secure",
              sub: "Aadhaar eKYC + DigiLocker verification",
            },
            { icon: Lock, title: "OTP-only signing", sub: "Only you can accept an offer or sign" },
            { icon: Globe2, title: "English & Hindi", sub: "Full UI available in both languages" },
          ].map(({ icon: Icon, title, sub }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-[#E6EFF9] text-[#0051AE]">
                <Icon aria-hidden className="size-[17px]" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-[#002B98]">{title}</p>
                <p className="text-[12px] text-[#5B657D]">{sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
