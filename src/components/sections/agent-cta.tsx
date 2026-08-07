import { Link } from "@tanstack/react-router";
import agentPhotoSrc from "@/assets/photo-agent-suit.jpg";
import { Reveal } from "@/components/sections/reveal";

const BENEFITS = [
  "Official ID",
  "Access to multiple banks & NBFCs",
  "Guaranteed commissions",
  "Training & certificate",
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden className="flex-none">
      <circle cx="10" cy="10" r="8.4" stroke="#B9C6E8" strokeWidth="1.3" />
      <path
        d="M6.4 10.2 8.9 12.6l4.7-5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * "For Agents" recruitment band — photograph dissolved into the navy field on
 * the left, copy right-aligned. Layout, colour and copy follow the approved
 * landing reference exactly.
 */
export function AgentCtaSection() {
  return (
    <section
      id="agents"
      aria-labelledby="agent-cta-title"
      className="navy-band-reverse relative w-full overflow-hidden text-white"
    >
      {/* Desktop: photo occupies the left 52%, masked into the navy field. */}
      <div
        aria-hidden
        className="agent-photo-field absolute inset-y-0 left-0 hidden w-[52%] min-w-[320px] isolate overflow-hidden lg:block"
      >
        <img
          src={agentPhotoSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-[26%_42%] [filter:saturate(0.92)_contrast(1.03)_brightness(0.97)]"
        />
        <div className="absolute inset-0 bg-[#0A2A7A] opacity-[0.42] mix-blend-soft-light" />
        <div className="absolute inset-0 mix-blend-multiply [background:linear-gradient(270deg,#001A5C_0%,#002472_20%,rgba(0,40,130,0.62)_38%,rgba(0,43,152,0.18)_56%,rgba(0,43,152,0)_74%)]" />
        <div className="absolute inset-0 mix-blend-color [background:linear-gradient(270deg,rgba(10,42,122,0.9)_0%,rgba(10,42,122,0.62)_28%,rgba(10,42,122,0.18)_48%,rgba(10,42,122,0)_68%)]" />
        <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(0,26,92,0.62)_0%,rgba(0,26,92,0.12)_22%,rgba(0,26,92,0)_52%,rgba(0,26,92,0.34)_82%,rgba(0,26,92,0.72)_100%)]" />
      </div>

      {/* Mobile / tablet: a photographic band above the copy. */}
      <div className="relative z-[1] h-[240px] w-full overflow-hidden leading-[0] sm:h-[300px] lg:hidden">
        <img
          src={agentPhotoSrc}
          alt="A ShriNeo agent outside a small business, holding a smartphone."
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-[32%_36%]"
        />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1320px] px-5 py-14 sm:px-8 lg:px-12 lg:py-[76px]">
        <Reveal className="ml-auto max-w-[620px]">
          <p className="font-mono text-[11px] font-semibold tracking-[0.13em] uppercase text-[#B9C6E8]">
            For Agents
          </p>
          <h2
            id="agent-cta-title"
            className="font-display mt-[18px] text-[clamp(28px,2.75vw,38px)] leading-[1.18] font-semibold tracking-[-0.028em] text-white"
          >
            <span className="block">Are you a loan broker, or</span>
            <span className="block">helping people apply for loans offline?</span>
          </h2>
          <p className="mt-5 text-[18px] leading-[1.6] text-[#B9C6E8]">
            Become a registered agent on ShriNeo and get:
          </p>

          <ul className="mt-6 grid gap-px overflow-hidden rounded-[14px] border border-white/15 bg-white/15 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-[11px] bg-[rgba(0,26,92,0.42)] px-[18px] py-[15px]"
              >
                <CheckIcon />
                <span className="text-[15px] font-medium tracking-[-0.01em] text-white">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to="/for-agents"
            className="font-display mt-[26px] inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-[11px] bg-[#E0912F] px-[30px] text-[16.5px] font-semibold tracking-[-0.01em] whitespace-nowrap text-white shadow-[0_2px_4px_rgba(0,10,40,0.28),0_16px_34px_-18px_rgba(224,145,47,0.9)] transition-colors duration-150 hover:bg-[#C9761A] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#001a5c] focus-visible:outline-none sm:w-auto"
          >
            Join now as agent
            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" aria-hidden>
              <path
                d="M1 7h14M10 2l5 5-5 5"
                stroke="#FFFFFF"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
