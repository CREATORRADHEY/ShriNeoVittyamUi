import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Headphones, User, ShieldCheck, PlusCircle, FileText, Globe2, Zap, Lock } from "lucide-react";
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
  { id: "first-loan", label: "First loan", sub: "Understand every step before you apply", icon: PlusCircle },
  { id: "loan-options", label: "Loan options", sub: "Compare suitable options with clear explanations", icon: Zap },
  { id: "documents", label: "Documents", sub: "Know what may be needed and why", icon: FileText },
  { id: "my-language", label: "My language", sub: "Get guidance in the language you prefer", icon: Globe2 },
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

/* ─────────────────────────────────────────────────────────────
   HOW WOULD YOU LIKE TO APPLY — Interactive multi-step widget
   ───────────────────────────────────────────────────────────── */

function HowApplyBlock({ shown }: { shown: boolean }) {
  const [route, setRoute] = useState<"guided" | "self">("guided");
  const [step, setStep] = useState(0); // 0=need, 1=language, 2=connect
  const [selectedNeed, setSelectedNeed] = useState<string | null>("first-loan");
  const [selectedLang, setSelectedLang] = useState<"en" | "hi">("en");

  // Reset wizard when switching route
  const handleRouteChange = (r: "guided" | "self") => {
    setRoute(r);
    setStep(0);
    setSelectedNeed("first-loan");
    setSelectedLang("en");
  };

  const canContinue = step === 0 ? !!selectedNeed : step === 1 ? true : false;

  return (
    <div
      className={cn(
        "mt-14 rounded-2xl border border-[#DDE7F5] bg-white shadow-[0_8px_40px_-16px_rgba(0,43,152,0.12)] overflow-hidden",
        "transition-[opacity,transform] duration-[500ms] ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
    >
      {/* ── Header ── */}
      <div className="border-b border-[#EEF3FB] bg-[#FAFBFF] px-6 py-8 text-center sm:px-10">
        <h3 className="font-display text-[clamp(22px,2.4vw,30px)] font-bold tracking-[-0.025em] text-[#002B98]">
          How would you like to apply?
        </h3>
        <p className="mt-2 text-[15px] text-[#5B657D]">
          Choose a self-service journey or get step-by-step help from a verified local agent.
        </p>

        {/* Route Toggle */}
        <div className="mt-6 inline-grid grid-cols-2 gap-3 sm:flex sm:gap-4">
          <RouteToggle
            id="route-guided"
            active={route === "guided"}
            icon={<Headphones className="size-4 shrink-0" />}
            label="Apply with guidance"
            sub="A verified agent helps you"
            onClick={() => handleRouteChange("guided")}
          />
          <RouteToggle
            id="route-self"
            active={route === "self"}
            icon={<User className="size-4 shrink-0" />}
            label="Apply on my own"
            sub="Complete the digital journey yourself"
            onClick={() => handleRouteChange("self")}
          />
        </div>
      </div>

      {/* ── Body ── */}
      {route === "guided" ? (
        <GuidedFlow
          step={step}
          setStep={setStep}
          selectedNeed={selectedNeed}
          setSelectedNeed={setSelectedNeed}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          canContinue={canContinue}
        />
      ) : (
        <SelfServiceFlow />
      )}
    </div>
  );
}

/* ─── Route toggle button ─── */
function RouteToggle({
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
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE] sm:min-w-[200px]",
        active
          ? "border-[#002B98] bg-white shadow-[0_2px_12px_rgba(0,43,152,0.12)]"
          : "border-[#DDE7F5] bg-[#F7F9FF] hover:border-[#B8CBEE] hover:bg-white"
      )}
    >
      <span className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg",
        active ? "bg-[#002B98] text-white" : "bg-[#E6F1FB] text-[#0051AE]"
      )}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={cn("text-[13px] font-semibold", active ? "text-[#002B98]" : "text-[#2C3A5A]")}>
            {label}
          </span>
          {active && (
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#002B98]">
              <Check className="size-2.5 text-white" strokeWidth={3} />
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[11px] leading-tight text-[#5B657D]">{sub}</p>
      </div>
    </button>
  );
}

/* ─── Progress bar ─── */
function StepProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0" aria-label="Application steps">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2">
              <span className={cn(
                "flex size-[26px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-200",
                done ? "bg-[#002B98] text-white" : active ? "bg-[#002B98] text-white" : "bg-[#E6F1FB] text-[#8898B0]"
              )}>
                {done ? <Check className="size-3" strokeWidth={3} /> : String(i + 1).padStart(2, "0")}
              </span>
              <span className={cn(
                "text-[12px] font-medium transition-colors duration-200",
                active ? "text-[#002B98]" : done ? "text-[#002B98]" : "text-[#8898B0]"
              )}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className={cn(
                "mx-3 h-px w-12 sm:w-20 transition-colors duration-500",
                i < current ? "bg-[#002B98]" : "bg-[#DDE7F5]"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Guided application flow ─── */
function GuidedFlow({
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
    <div className="grid lg:grid-cols-[1fr_360px]">
      {/* Left: wizard */}
      <div className="border-b border-[#EEF3FB] px-6 py-7 sm:px-10 lg:border-b-0 lg:border-r">
        {/* Progress */}
        <div className="mb-7 overflow-x-auto">
          <StepProgress current={step} />
        </div>

        {/* Step content */}
        <div className="transition-all duration-200">
          {step === 0 && (
            <Step0NeedSelector selectedNeed={selectedNeed} setSelectedNeed={setSelectedNeed} />
          )}
          {step === 1 && (
            <Step1Language selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
          )}
          {step === 2 && (
            <Step2Connect selectedNeed={selectedNeed} selectedLang={selectedLang} />
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="rounded-lg border border-[#DDE7F5] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#002B98] transition-colors hover:bg-[#EEF3FB]"
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
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-all",
                canContinue
                  ? "bg-[#E8A020] hover:bg-[#D08818] shadow-sm"
                  : "bg-[#E8A020]/50 cursor-not-allowed"
              )}
            >
              Continue
              <ArrowRight className="size-4" />
            </button>
          ) : (
            <Link
              to="/auth/signup"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#002B98] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#001A5C]"
            >
              Connect with an agent
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Right: agent trust card */}
      <AgentTrustCard />
    </div>
  );
}

/* ─── Step 0: What makes applying easier? ─── */
function Step0NeedSelector({
  selectedNeed,
  setSelectedNeed,
}: {
  selectedNeed: string | null;
  setSelectedNeed: (n: string) => void;
}) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-[#0051AE]">
        Verified agent assistance
      </p>
      <h4 className="mb-5 text-[18px] font-bold tracking-[-0.015em] text-[#002B98]">
        What would make applying easier?
      </h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {GUIDED_NEEDS.map((need) => {
          const Icon = need.icon;
          const active = selectedNeed === need.id;
          return (
            <button
              key={need.id}
              type="button"
              onClick={() => setSelectedNeed(need.id)}
              className={cn(
                "group flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]",
                active
                  ? "border-[#002B98] bg-[#EEF3FB] shadow-sm"
                  : "border-[#DDE7F5] bg-white hover:border-[#B8CBEE] hover:bg-[#F7F9FF]"
              )}
            >
              <span className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                active ? "bg-[#002B98] text-white" : "bg-[#E6F1FB] text-[#0051AE] group-hover:bg-[#D6E8F7]"
              )}>
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("text-[13px] font-semibold", active ? "text-[#002B98]" : "text-[#1A2B4A]")}>
                    {need.label}
                  </span>
                  {active ? (
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#002B98]">
                      <Check className="size-2.5 text-white" strokeWidth={3} />
                    </span>
                  ) : (
                    <ChevronRight className="size-3.5 shrink-0 text-[#8898B0] transition-transform group-hover:translate-x-0.5" />
                  )}
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-[#5B657D]">{need.sub}</p>
              </div>
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
      <p className="mb-1 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-[#0051AE]">
        Language preference
      </p>
      <h4 className="mb-5 text-[18px] font-bold tracking-[-0.015em] text-[#002B98]">
        Which language do you prefer?
      </h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {langs.map((lang) => {
          const active = selectedLang === lang.id;
          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => setSelectedLang(lang.id)}
              className={cn(
                "flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]",
                active
                  ? "border-[#002B98] bg-[#EEF3FB] shadow-sm"
                  : "border-[#DDE7F5] bg-white hover:border-[#B8CBEE]"
              )}
            >
              <div>
                <p className={cn("text-[15px] font-bold", active ? "text-[#002B98]" : "text-[#1A2B4A]")}>
                  {lang.native}
                </p>
                <p className="text-[11px] text-[#5B657D]">{lang.label}</p>
              </div>
              {active && (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#002B98]">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[12px] text-[#5B657D]">
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
      <p className="mb-1 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-[#0051AE]">
        Ready to connect
      </p>
      <h4 className="mb-5 text-[18px] font-bold tracking-[-0.015em] text-[#002B98]">
        Your preferences are set
      </h4>
      <div className="space-y-3">
        {[
          { label: "Help with", value: needLabel },
          { label: "Language", value: langLabel },
          { label: "Agent type", value: "ShriNeo verified agent" },
          { label: "Your details", value: "Kept masked until you consent" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-lg border border-[#DDE7F5] bg-[#F7F9FF] px-4 py-3">
            <span className="text-[12px] text-[#5B657D]">{row.label}</span>
            <span className="text-[13px] font-semibold text-[#002B98]">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#DDE7F5] bg-[#F7F9FF] px-4 py-3">
        <Lock className="size-3.5 shrink-0 text-[#5B657D]" />
        <p className="text-[11px] text-[#5B657D]">
          Your contact details stay masked and are shared only with your consent.
        </p>
      </div>
    </div>
  );
}

/* ─── Right panel: Agent trust card ─── */
function AgentTrustCard() {
  return (
    <div className="relative flex flex-col overflow-hidden bg-[#002272] p-6 sm:p-8">
      {/* Agent photo */}
      <div className="relative mb-5 h-[180px] w-full overflow-hidden rounded-xl sm:h-[200px]">
        <img
          src={agentPhotoSrc}
          alt="A verified ShriNeo agent"
          className="h-full w-full object-cover object-[center_20%]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002272]/60 to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#22C55E]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-white" />
          Verified agent
        </span>
      </div>

      {/* Trust bullets */}
      <h4 className="text-[17px] font-bold leading-snug text-white">
        Guidance, while you stay in control.
      </h4>
      <ul className="mt-4 space-y-2.5">
        {[
          "Explains options and documents",
          "Cannot accept an offer for you",
          "Application stays tracked on ShriNeo",
        ].map((point) => (
          <li key={point} className="flex items-start gap-2.5">
            <Check className="mt-0.5 size-3.5 shrink-0 text-[#22C55E]" strokeWidth={2.5} />
            <span className="text-[13px] leading-snug text-white/80">{point}</span>
          </li>
        ))}
      </ul>

      {/* Privacy note */}
      <div className="mt-5 flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-3">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-white/50" />
        <p className="text-[11px] leading-snug text-white/50">
          Your contact details stay masked and are shared only with your consent.
        </p>
      </div>

      {/* Decorative background dots */}
      <div aria-hidden className="pointer-events-none absolute top-4 right-4 grid grid-cols-4 gap-1.5 opacity-10">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="size-1 rounded-full bg-white" />
        ))}
      </div>
    </div>
  );
}

/* ─── Self-service flow ─── */
function SelfServiceFlow() {
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
      body: "Select your preferred offer, review the Key Fact Statement, and sign digitally. No physical branch visit needed.",
    },
  ];

  return (
    <div className="grid lg:grid-cols-[1fr_360px]">
      <div className="border-b border-[#EEF3FB] px-6 py-7 sm:px-10 lg:border-b-0 lg:border-r">
        <p className="mb-1 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-[#0051AE]">
          Digital journey
        </p>
        <h4 className="mb-6 text-[18px] font-bold tracking-[-0.015em] text-[#002B98]">
          Three steps, entirely online
        </h4>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={s.num} className="flex gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#E6F1FB] text-[11px] font-bold text-[#0051AE]">
                {s.num}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[14px] font-semibold text-[#002B98]">{s.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5B657D]">{s.body}</p>
                {i < steps.length - 1 && (
                  <div className="ml-[-24px] mt-4 h-px w-[calc(100%+24px)] bg-[#EEF3FB]" />
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link
            to="/auth/signup"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#002B98] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#001A5C]"
          >
            Start my application
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Right panel: key self-service facts */}
      <div className="bg-[#FAFBFF] px-6 py-7 sm:px-8">
        <p className="mb-4 text-[13px] font-semibold text-[#002B98]">Why self-service?</p>
        <ul className="space-y-4">
          {[
            { icon: Zap, title: "~6 minutes", sub: "Average time to complete the application" },
            { icon: ShieldCheck, title: "Fully secure", sub: "Aadhaar eKYC + DigiLocker verification" },
            { icon: Lock, title: "OTP-only signing", sub: "Only you can accept an offer or sign" },
            { icon: Globe2, title: "English & Hindi", sub: "Full UI available in both languages" },
          ].map(({ icon: Icon, title, sub }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#E6F1FB] text-[#0051AE]">
                <Icon className="size-4" />
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
