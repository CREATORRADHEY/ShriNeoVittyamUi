import { Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheck } from "lucide-react";
import photoAgent from "@/assets/photo-agent.jpg";
import { Reveal } from "@/components/sections/reveal";

const BENEFITS = [
  "Official ID",
  "Access to multiple banks & NBFCs",
  "Guaranteed commissions",
  "Training & certificate",
];

/**
 * "For Agents" recruitment band — photograph on the left, navy field on the right.
 * Content mirrors the approved landing reference.
 */
export function AgentCtaSection() {
  return (
    <section
      aria-labelledby="agent-cta-title"
      className="relative isolate overflow-hidden bg-[#00227d] text-white"
    >
      <div className="grid lg:grid-cols-[minmax(0,42%)_minmax(0,58%)]">
        <div className="relative min-h-[280px] lg:min-h-[520px]">
          <img
            src={photoAgent}
            alt="A ShriNeo agent standing outside his shop with a smartphone and a folder."
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-[40%_center]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#00227d]/25 via-[#00227d]/35 to-[#00227d]"
          />
        </div>

        <div className="px-5 py-14 md:px-10 md:py-20 lg:px-16">
          <Reveal className="max-w-[640px]">
            <p className="label-micro text-white/70">For agents</p>
            <h2
              id="agent-cta-title"
              className="font-display mt-4 text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.15] font-semibold tracking-[-0.02em]"
            >
              Are you a loan broker, or helping people apply for loans offline?
            </h2>
            <p className="mt-5 text-base text-white/80">
              Become a registered agent on ShriNeo and get:
            </p>

            <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:grid-cols-2">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 bg-[#032a86] px-5 py-5 text-sm font-semibold"
                >
                  <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 stroke-[1.5]" />
                  <span className="min-w-0">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/for-agents"
              className="cta-saffron font-display mt-9 inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[10px] px-7 text-base font-semibold transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00227d] focus-visible:outline-none"
            >
              Join now as agent
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
