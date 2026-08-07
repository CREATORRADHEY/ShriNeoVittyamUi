import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { UserCheck, EyeOff, Coins, ArrowRight, CircleAlert, Lock, ShieldCheck } from "lucide-react";
import { useI18n } from "@/i18n";
import { homeContent } from "@/content/home-content";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

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

  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      num: "01",
      title: "Self-service or assisted",
      summary: "Apply directly online on your own, or request assistance from a verified local agent who will guide you",
      icon: UserCheck,
      detailsTitle: "Choose your own speed",
      detailsText: "Completing the application on your own takes about 6 minutes, using secure digital locker verification. If you'd rather have personal guidance, a local agent can assist you with compiling documents, translating terms, and answering product questions.",
      cta: "Apply directly online",
      ctaTo: "/auth/signup"
    },
    {
      num: "02",
      title: "Masked contact details",
      summary: "Communication between you and the agent is fully masked. The agent never sees your raw personal phone number",
      icon: EyeOff,
      detailsTitle: "Strict identity boundaries",
      detailsText: "To protect you from unwanted solicitation, all call routing and document uploads are securely containerized. The agent never sees your raw 10-digit mobile number, Aadhaar number, or other sensitive personal records.",
      cta: "Review privacy policies",
      ctaTo: "/trust-center/privacy-and-data"
    },
    {
      num: "03",
      title: "Zero fees, zero delegation",
      summary: "The agent cannot select an offer, accept terms, or sign on your behalf. There are no fees to pay to any agent",
      icon: Coins,
      detailsTitle: "You stay in complete control",
      detailsText: "Under our strict guidelines, agents only assist with compiling the file. Every critical action—selecting a lender, accepting rates, and e-signing agreements—requires a secure OTP that goes only to your phone. Plus, agents are paid by the platform; you never pay them any fees.",
      cta: "Read agent code of conduct",
      ctaTo: "/assistance-choice"
    }
  ];

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

        {/* Interactive Assistance Choice Block per Section 17 */}
        <div className="mt-12 rounded-xl border border-[#ECE7DD] bg-white p-6 shadow-[var(--shadow-raised)] md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#ECE7DD] pb-4">
            <h3 className="font-display text-[18px] font-semibold text-[#002B98]">
              Choose how you apply — you stay in control
            </h3>
            <Link
              to="/assistance-choice"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-[#0051AE] hover:underline"
            >
              Borrower assistance policy
              <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Tabs List */}
            <div className="flex flex-col gap-3">
              {tabs.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.num}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={cn(
                      "flex text-left gap-4 rounded-xl border p-4 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]",
                      isActive
                        ? "border-[#D6E5F7] bg-[#E6F1FB] shadow-sm"
                        : "border-transparent bg-transparent hover:bg-[#F4F6FB] hover:border-[#ECE7DD]"
                    )}
                  >
                    <span className={cn(
                      "num font-display text-sm font-semibold mt-0.5",
                      isActive ? "text-[#0051AE]" : "text-[#B4BDCC]"
                    )}>
                      {tab.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#002B98]">
                        {tab.title}
                      </h4>
                      <p className="mt-1 text-[13px] leading-relaxed text-[#5B657D]">
                        {tab.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Details Panel */}
            <div className="flex flex-col justify-between rounded-xl border border-[#D6E5F7] bg-[#FBFBFB] p-6 shadow-[0_4px_20px_rgba(0,43,152,0.03)]">
              {(() => {
                const tab = tabs[activeTab]!;
                const Icon = tab.icon;
                return (
                  <>
                    <div className="flex flex-col h-full">
                      {/* Visual Graphic at the top of the details panel */}
                      <div className="mb-6">
                        {activeTab === 0 && <SelfServiceVsAssistedVisual />}
                        {activeTab === 1 && <MaskedContactVisual />}
                        {activeTab === 2 && <ZeroFeesVisual />}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-[#E6F1FB] text-[#0051AE]">
                          <Icon className="size-5" />
                        </span>
                        <h4 className="font-display text-[15px] font-semibold text-[#002B98]">
                          {tab.detailsTitle}
                        </h4>
                      </div>
                      <p className="mt-4 text-[13.5px] leading-relaxed text-[#5B657D]">
                        {tab.detailsText}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-[#ECE7DD] pt-4">
                      <Link
                        to={tab.ctaTo}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#002B98] px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]"
                      >
                        {tab.cta}
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- premium visuals
   Interactive illustrations demonstrating the core benefits of choice, masking
   and control inside the active choice panel. */

function SelfServiceVsAssistedVisual() {
  return (
    <div className="relative w-full h-[150px] rounded-xl border border-dashed border-[#ECE7DD] bg-white flex items-center justify-center p-3 gap-3 overflow-hidden select-none animate-[shrineo-rise_400ms_cubic-bezier(0.16,1,0.3,1)]">
      {/* Self-service card */}
      <div className="flex-1 flex flex-col items-center justify-center rounded-lg border border-[#D6E5F7] bg-[#E6F1FB]/40 p-2.5 text-center shadow-sm">
        <span className="flex size-7 items-center justify-center rounded-full bg-[#0051AE] text-white text-[10px] font-semibold mb-1">
          Direct
        </span>
        <span className="text-[11.5px] font-semibold text-[#002B98]">Self-Service</span>
        <span className="text-[9.5px] text-[#5B657D] mt-0.5 font-medium">Apply in 6 mins</span>
      </div>
      
      {/* OR divider */}
      <span className="num text-[11px] font-bold text-[#5B657D] bg-[#F4F6FB] px-2.5 py-1 border border-[#ECE7DD] rounded-full z-10 shadow-sm">
        OR
      </span>

      {/* Assisted card */}
      <div className="flex-1 flex flex-col items-center justify-center rounded-lg border border-[#D1EBE2] bg-[#E1F7F0]/40 p-2.5 text-center shadow-sm">
        <span className="flex size-7 items-center justify-center rounded-full bg-[#107C62] text-white text-[10px] font-semibold mb-1">
          Agent
        </span>
        <span className="text-[11.5px] font-semibold text-[#107C62]">Local Assistant</span>
        <span className="text-[9.5px] text-[#5B657D] mt-0.5 font-medium">Verified Guidance</span>
      </div>
    </div>
  );
}

function MaskedContactVisual() {
  return (
    <div className="relative w-full h-[150px] rounded-xl border border-dashed border-[#ECE7DD] bg-white flex flex-col items-center justify-center p-4 overflow-hidden select-none animate-[shrineo-rise_400ms_cubic-bezier(0.16,1,0.3,1)]">
      <div className="w-full max-w-[240px] rounded-lg border border-[#D6E5F7] bg-white p-3 shadow-md">
        <div className="flex items-center justify-between border-b border-[#F0F4FC] pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 font-mono">Masking Active</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">Secured Route</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-[#5B657D]">Borrower Phone:</span>
          <span className="num font-mono text-[12px] font-semibold text-[#002B98] tracking-wider">
            +91 ••••• ••482
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-1">
          <span className="text-[11px] text-[#5B657D]">Agent Console:</span>
          <span className="num font-mono text-[10.5px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
            [HIDDEN]
          </span>
        </div>
      </div>
    </div>
  );
}

function ZeroFeesVisual() {
  return (
    <div className="relative w-full h-[150px] rounded-xl border border-dashed border-[#ECE7DD] bg-white flex flex-col items-center justify-center p-4 overflow-hidden select-none animate-[shrineo-rise_400ms_cubic-bezier(0.16,1,0.3,1)]">
      <div className="w-full max-w-[260px] rounded-lg border border-[#D6E5F7] bg-white p-3 shadow-md">
        <div className="flex items-center justify-between border-b border-[#F0F4FC] pb-2 mb-2">
          <span className="text-[11px] font-bold text-[#002B98]">E-Sign Authorization</span>
          <span className="text-[10px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">₹0 Agent Fee</span>
        </div>
        
        {/* OTP Input display */}
        <div className="flex flex-col items-center justify-center py-1">
          <span className="text-[10px] text-[#5B657D] mb-2 text-center leading-normal">
            Verify by OTP sent <strong className="text-[#002B98]">only to Borrower's phone</strong>:
          </span>
          <div className="flex gap-2">
            {[7, 3, 9, "•", "•", "•"].map((char, i) => (
              <span key={i} className="num size-7 border border-[#D6E5F7] rounded-md flex items-center justify-center text-xs font-semibold text-[#002B98] bg-[#FBFBFB] shadow-inner">
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
