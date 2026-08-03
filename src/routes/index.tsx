import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  FileCheck2,
  Languages,
  ShieldCheck,
} from "lucide-react";
import { HomeHero, ProductStrip } from "@/components/sections/home-hero";
import { PublicShell } from "@/components/layout/public-shell";
import { Reveal } from "@/components/sections/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShriNeo Capital — Bharat Ka Digital Lending Partner" },
      {
        name: "description",
        content:
          "Compare eligible loan offers from participating banks and NBFCs in English or Hindi. Clear costs, purpose-specific consent and a Key Fact Statement before you sign.",
      },
      { property: "og:title", content: "ShriNeo Capital — Bharat Ka Digital Lending Partner" },
      {
        property: "og:description",
        content:
          "A vernacular-first digital lending platform for Bharat. Compare offers, understand the total cost and stay in control.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

/* ------------------------------------------------------------ trust row data */

const TRUST_POINTS = [
  { icon: Banknote, label: "Direct lender-to-borrower disbursal" },
  { icon: FileCheck2, label: "Complete costs shown before signing" },
  { icon: ShieldCheck, label: "Purpose-specific consent" },
  { icon: Languages, label: "English and Hindi support" },
];

const STEPS = [
  { title: "Tell us what you need", body: "Amount, purpose and tenure." },
  { title: "Complete your details", body: "Each field explains why it is asked." },
  { title: "Compare eligible offers", body: "Rate, APR, EMI and total cost." },
  { title: "Track the lender's response", body: "Every status update, dated." },
];

const TRUST_SIGNALS = ["Bank and UPI activity", "Regular payment behaviour", "Business cash flow"];

const FAQS = [
  {
    q: "Is ShriNeo Capital a bank or NBFC?",
    a: "No. ShriNeo Capital is a Lending Service Provider operated by SHRINEO VITTIYAM PRIVATE LIMITED. We help you compare and apply; we do not lend.",
  },
  {
    q: "Who provides and disburses the loan?",
    a: "A participating bank or NBFC. They assess your application, approve it and credit the amount directly to your verified bank account.",
  },
  {
    q: "Will I see the complete fees and APR before applying?",
    a: "Yes. Interest, processing fees, taxes, APR and total repayment appear in the Key Fact Statement before you sign anything.",
  },
  {
    q: "What happens if I do not have a CIBIL history?",
    a: "Where available and consented, cash-flow and repayment signals can support lender review. The lender still makes the final decision.",
  },
  {
    q: "How can I get support or raise a grievance?",
    a: "Support is available in English and Hindi from the help menu and footer. Grievances receive a reference number and a defined escalation path.",
  },
];

/* ------------------------------------------------------------ trust score ring */

function TrustScoreRing() {
  const value = 0.72;
  const r = 62;
  const c = 2 * Math.PI * r;

  return (
    <figure className="flex flex-col items-center">
      <svg viewBox="0 0 160 160" role="img" aria-label="Illustrative SNV Trust Score of 720" className="size-44">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--color-border-warm)" strokeWidth="10" />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${c * value} ${c}`}
          transform="rotate(-90 80 80)"
        />
        <text
          x="80"
          y="76"
          textAnchor="middle"
          className="num"
          fontSize="30"
          fontWeight="600"
          fill="var(--color-foreground)"
        >
          720
        </text>
        <text x="80" y="98" textAnchor="middle" fontSize="11" fill="var(--color-muted-foreground)">
          SNV Trust Score
        </text>
      </svg>
      <figcaption className="label-micro mt-3 text-muted-foreground">Illustrative example</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------ eligibility card */

function EligibilityCard() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("300000");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);

  const parsed = Number(amount.replace(/\D/g, ""));

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter the 10-digit mobile number linked to your bank account.");
      return;
    }
    setError(null);
    void navigate({ to: "/auth/signup" });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-raised)] md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="elig-amount" className="text-sm font-medium">
            Loan amount
          </Label>
          <Input
            id="elig-amount"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, "").slice(0, 8))}
            className="num mt-2 min-h-12"
          />
          <p className="num mt-2 text-xs text-muted-foreground">
            {parsed > 0 ? formatINR(parsed) : "Enter an amount"}
          </p>
        </div>
        <div>
          <Label htmlFor="elig-mobile" className="text-sm font-medium">
            Mobile number
          </Label>
          <Input
            id="elig-mobile"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="10-digit mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "elig-error" : undefined}
            className="num mt-2 min-h-12"
          />
          {error ? (
            <p id="elig-error" role="alert" className="mt-2 text-xs text-destructive">
              {error}
            </p>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">Used only to verify it is you.</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[46ch] text-sm text-muted-foreground">
          Your exact rate, fees and APR appear before you apply — no surprises.
        </p>
        <Button
          type="submit"
          className="cta-saffron font-display min-h-12 shrink-0 rounded-[10px] px-6 text-base font-semibold hover:opacity-100"
        >
          See my offers
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------- the page */

function HomePage() {
  return (
    <PublicShell>
      {/* 1 — HERO (approved, unchanged) */}
      <HomeHero />

      {/* 2 — FIVE-PRODUCT STRIP */}
      <ProductStrip />

      {/* 3 — COMPACT TRUST ROW */}
      <section aria-label="How ShriNeo protects you" className="border-y border-border-warm bg-surface-warm">
        <ul className="container-page grid grid-cols-2 gap-x-8 gap-y-4 py-6 lg:grid-cols-4 lg:py-7">
          {TRUST_POINTS.map((item) => (
            <li key={item.label} className="group flex items-start gap-3">
              <item.icon
                aria-hidden
                className="mt-0.5 size-5 shrink-0 stroke-[1.4] text-primary transition-transform duration-150 group-hover:scale-110"
              />
              <span className="font-display min-w-0 text-sm leading-snug font-medium">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 — ELIGIBILITY WIDGET */}
      <section aria-labelledby="elig-title" className="bg-surface-blue">
        <div className="container-page py-16 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2
              id="elig-title"
              className="font-display text-[clamp(1.75rem,3.2vw,2.375rem)] font-semibold tracking-[-0.02em]"
            >
              Check what you qualify for
            </h2>
          </Reveal>
          <Reveal delay={60} className="mx-auto mt-8 max-w-3xl">
            <EligibilityCard />
          </Reveal>
        </div>
      </section>

      {/* 5 — COMPACT HOW IT WORKS */}
      <section aria-labelledby="how-title" className="bg-surface-warm">
        <div className="container-page py-16 md:py-20">
          <Reveal className="max-w-2xl">
            <h2
              id="how-title"
              className="font-display text-[clamp(1.625rem,3vw,2.125rem)] font-semibold tracking-[-0.02em]"
            >
              Four clear steps from application to tracking.
            </h2>
            <p className="mt-3 max-w-[58ch] text-base text-muted-foreground">
              Complete your details, compare available offers and follow every lender update in one
              place.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="num text-xs font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="line-draw h-px flex-1 bg-border-warm"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                </div>
                <h3 className="font-display mt-3 text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>

          <Link
            to="/how-it-works"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4"
          >
            See how ShriNeo works
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>

      {/* 6 — COMPACT SNV TRUST SCORE */}
      <section aria-labelledby="score-title" className="bg-surface-blue">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] md:py-20">
          <Reveal>
            <p className="label-micro text-primary">Beyond bureau history</p>
            <h2
              id="score-title"
              className="font-display mt-3 max-w-[22ch] text-[clamp(1.625rem,3vw,2.125rem)] font-semibold tracking-[-0.02em]"
            >
              A financial profile that considers more than a traditional credit score.
            </h2>
            <p className="mt-4 max-w-[54ch] text-base text-muted-foreground">
              Where available and consented, ShriNeo can use cash-flow and repayment signals to
              support lender review.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {TRUST_SIGNALS.map((signal) => (
                <li
                  key={signal}
                  className="rounded-lg border border-border bg-card-warm px-3 py-1.5 text-sm text-foreground"
                >
                  {signal}
                </li>
              ))}
            </ul>
            <Link
              to="/trust-center"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4"
            >
              Learn about the SNV Trust Score
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={80} className="flex justify-center lg:justify-end">
            <TrustScoreRing />
          </Reveal>
        </div>
      </section>

      {/* 7 — SHORT FAQ */}
      <section aria-labelledby="faq-title" className="bg-surface-warm">
        <div className="container-page py-16 md:py-20">
          <Reveal className="mx-auto max-w-3xl">
            <h2
              id="faq-title"
              className="font-display text-[clamp(1.625rem,3vw,2.125rem)] font-semibold tracking-[-0.02em]"
            >
              Common questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="mt-6 overflow-hidden rounded-2xl border border-border-warm bg-card-warm"
            >
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  className="border-border-warm px-5 last:border-b-0"
                >
                  <AccordionTrigger className="min-h-14 text-left text-base font-medium hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[68ch] text-base text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-6 text-sm text-muted-foreground">
              Loan funds move directly from the participating lender to the borrower. ShriNeo does
              not hold or disburse the loan funds.{" "}
              <Link to="/trust-center" className="font-medium text-primary underline underline-offset-4">
                Trust Center
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </PublicShell>
  );
}
