import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  BadgeCheck,
  FileCheck2,
  Languages,
  MessagesSquare,
  ShieldCheck,
  Info,
} from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";
import { products } from "@/config/products";
import { org } from "@/config/org";
import { formatINR } from "@/lib/format";
import { useI18n } from "@/i18n";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, Eyebrow, StatusPill } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import {
  DarkCta,
  DisclosureBlock,
  FaqGroups,
  FigureCard,
  MediaSplit,
  ProcessTimeline,
  TrustStrip,
  UseCaseCards,
  type JourneyStep,
} from "@/components/sections/blocks";
import {
  AgentAssistArt,
  CompareOffersArt,
  DirectFundFlowArt,
  DualScoreArt,
  LoanCostArt,
  PrivacyControlArt,
} from "@/components/illustrations";
import {
  AgentDashboardPreview,
  BorrowerDashboardPreview,
  NeoChatPreview,
  OfferHighlightPreview,
} from "@/components/previews/previews";
import { OfferComparisonPreview } from "@/components/loans/offer-comparison-preview";
import { EmiCalculator } from "@/components/loans/emi-calculator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShriNeo Capital — Your Dreams, Our Responsibility" },
      {
        name: "description",
        content:
          "Compare eligible loan offers from participating banks and NBFCs in English or Hindi. Clear costs, purpose-specific consent and a Key Fact Statement before you sign.",
      },
      { property: "og:title", content: "ShriNeo Capital — Your Dreams, Our Responsibility" },
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

const journey: JourneyStep[] = [
  {
    title: "Tell us what you need",
    body: "Amount, purpose and the tenure you have in mind. No documents at this stage.",
    actor: "you",
  },
  {
    title: "Complete your profile",
    body: "Identity, income and bank information — each field explains why it is required.",
    actor: "you",
  },
  {
    title: "Compare eligible offers",
    body: "Matching lenders return rate, APR, EMI, fees and total repayment side by side.",
    actor: "shrineo",
  },
  {
    title: "Review complete loan terms",
    body: "The Key Fact Statement shows every charge, the schedule and the cooling-off window.",
    actor: "you",
  },
  {
    title: "Send your application",
    body: "You e-sign with an OTP. Your consent is recorded with a timestamp.",
    actor: "you",
  },
  {
    title: "Track the lender's response",
    body: "Each status change is visible with the date and the next expected action.",
    actor: "lender",
  },
];

const faqGroups = [
  {
    group: "Applying",
    items: [
      {
        q: "Does ShriNeo lend money?",
        a: "No. ShriNeo Capital is a Lending Service Provider. Participating banks and NBFCs assess, approve and disburse every loan.",
      },
      {
        q: "What does an application cost?",
        a: "Applying and comparing offers is free. Lender charges such as processing fees are disclosed in the Key Fact Statement before you sign.",
      },
    ],
  },
  {
    group: "Offers and charges",
    items: [
      {
        q: "How are offers ranked?",
        a: "By total cost of borrowing by default. The ranking method is disclosed, no lender pays for placement and no matching offer is hidden.",
      },
      {
        q: "Why is APR different from the interest rate?",
        a: "APR includes interest plus fees, so it reflects the yearly cost of the loan and allows a fair comparison between offers.",
      },
    ],
  },
  {
    group: "Security and consent",
    items: [
      {
        q: "Who can see my documents?",
        a: "Only you, the lenders you apply to, and a verified agent you have explicitly authorised by OTP. Every access is logged.",
      },
      {
        q: "Can I withdraw consent?",
        a: "Yes. Consents are purpose-specific and time-bound, and your consent history is visible in your account.",
      },
    ],
  },
  {
    group: "Agents and support",
    items: [
      {
        q: "Do I have to use an agent?",
        a: "No. You can complete everything yourself. An agent can only assist after you approve the request with an OTP.",
      },
      {
        q: "How do I raise a complaint?",
        a: "Through the Grievance Redressal page. Every complaint receives a reference number, an acknowledgement and an escalation path.",
      },
    ],
  },
];

function HomePage() {
  const { t } = useI18n();

  return (
    <PublicShell>
      {/* 1 + 2 — trust eyebrow and hero */}
      <section aria-labelledby="hero-title" className="border-b border-border bg-surface">
        <div className="container-page grid gap-12 py-12 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:py-20">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Eyebrow>{t("home.eyebrow")}</Eyebrow>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    aria-label="What Lending Service Provider means"
                    className="inline-grid size-6 place-items-center rounded-full text-muted-foreground hover:text-primary"
                  >
                    <Info aria-hidden className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    ShriNeo Capital connects borrowers with participating lenders. The final lending
                    decision is made by the lender.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </div>

            <h1
              id="hero-title"
              className="editorial text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05] tracking-tight text-balance"
            >
              Your Dreams, Our Responsibility.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Compare eligible loan options, understand every cost, and complete your application
              with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-11">
                <Link to="/auth/signup">
                  Apply for a loan
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-11">
                <Link to="/for-borrowers">
                  <MessagesSquare aria-hidden className="size-4" />
                  Ask Neo
                </Link>
              </Button>
            </div>

            <p className="mt-6">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4"
              >
                See how ShriNeo works
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </p>

            <p className="mt-6 max-w-xl text-sm text-muted-foreground">{org.roleStatement}</p>
          </div>

          {/* Editorial hero composition: photography + a calm product panel */}
          <div className="relative min-w-0">
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={heroImage}
                alt={t("home.hero.imageAlt")}
                width={1200}
                height={900}
                fetchPriority="high"
                className="aspect-4/3 size-full object-cover"
              />
            </div>
            <div className="mt-[-3.5rem] ml-auto w-[min(100%,22rem)] px-3 sm:mt-[-4.5rem] sm:px-0">
              <OfferHighlightPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — trust proof bar */}
      <TrustStrip
        items={[
          {
            icon: Banknote,
            label: "Direct lender disbursal",
            body: "Funds move from the lender straight to your bank account.",
          },
          {
            icon: FileCheck2,
            label: "Costs shown before signing",
            body: "Rate, APR, fees and total repayment in the Key Fact Statement.",
          },
          {
            icon: ShieldCheck,
            label: "Purpose-specific consent",
            body: "Each data use is consented to separately and logged.",
          },
          {
            icon: Languages,
            label: "English and Hindi",
            body: "Switch language at any point without losing progress.",
          },
        ]}
      />

      {/* 4 — choose your language */}
      <section aria-labelledby="lang-title" className="border-b border-border bg-background py-10">
        <div className="container-page grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 id="lang-title" className="text-lg font-semibold">
              {t("lang.choose")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Switch language at any time. Your progress stays saved.
            </p>
          </div>
          <LanguageSwitcher />
        </div>
      </section>

      {/* 5 — loans for every need */}
      <Section tone="surface" labelledBy="products-title">
        <SectionHeading
          id="products-title"
          title="Loans for every need"
          body="Five products, one consistent process. All amounts are indicative ranges configured with participating lenders."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {products.map((product, index) => (
            <li
              key={product.slug}
              className={
                index === 0
                  ? "lg:col-span-3"
                  : index === 1
                    ? "lg:col-span-3"
                    : "lg:col-span-2"
              }
            >
              <Link
                to={product.path}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-150 hover:border-primary focus-visible:border-primary"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-accent text-primary">
                  <product.icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-4 flex flex-wrap items-center gap-2 text-lg font-semibold">
                  {product.name}
                  {product.phase2 ? (
                    <StatusPill tone="warning">{t("common.comingSoon")}</StatusPill>
                  ) : null}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{product.summary}</p>
                <p className="num mt-4 text-sm font-medium">
                  {formatINR(product.range.min, { compact: true })} –{" "}
                  {formatINR(product.range.max, { compact: true })}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Explore {product.name}
                  <ArrowRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6 — how ShriNeo works */}
      <Section labelledBy="how-title">
        <SectionHeading
          id="how-title"
          title="How ShriNeo works"
          body="Six stages. Steps you complete are marked separately from steps the lender controls."
        />
        <div className="mt-10">
          <ProcessTimeline steps={journey} />
        </div>
        <div className="mt-8">
          <Button asChild variant="outline" className="min-h-11">
            <Link to="/how-it-works">See the full journey</Link>
          </Button>
        </div>
      </Section>

      {/* 7 — compare before you choose */}
      <Section tone="surface" labelledBy="compare-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              id="compare-title"
              title="Compare before you choose"
              body="Every matching lender is shown on the same rows, so the cheapest headline rate is never mistaken for the cheapest loan."
            />
            <div className="mt-6">
              <FigureCard tone="card">
                <CompareOffersArt />
              </FigureCard>
            </div>
          </div>
          <div className="min-w-0">
            <OfferComparisonPreview />
          </div>
        </div>
      </Section>

      {/* 8 — understand every rupee */}
      <MediaSplit
        id="cost"
        eyebrow="Total cost"
        title="Understand every rupee"
        body="Principal, interest, processing fee and taxes together decide your monthly EMI and total repayment. See the monthly payment and total repayment before you choose."
        points={[
          <>
            <strong>Principal</strong> — the amount you borrow.
          </>,
          <>
            <strong>Interest</strong> — the lender's charge on the outstanding balance.
          </>,
          <>
            <strong>Processing fee and taxes</strong> — one-time charges, disclosed upfront.
          </>,
          <>
            <strong>APR</strong> — interest and fees expressed as one yearly figure.
          </>,
        ]}
        media={
          <FigureCard caption="Illustrative split of a loan's total repayment.">
            <LoanCostArt />
          </FigureCard>
        }
        footnote="Estimated values. Final terms are determined by the participating lender."
      />

      <Section labelledBy="emi-title">
        <SectionHeading
          id="emi-title"
          title="Try an estimate"
          body="Adjust the amount, rate and tenure to see how the monthly instalment and total repayment change."
        />
        <div className="mt-8">
          <EmiCalculator minAmount={50_000} maxAmount={20_00_000} defaultAmount={3_00_000} />
        </div>
      </Section>

      {/* 9 — direct fund flow */}
      <MediaSplit
        eyebrow="Fund flow"
        title="Money moves directly between you and the lender"
        body="ShriNeo helps route and track your application. ShriNeo does not hold or disburse your loan funds."
        mediaSide="left"
        media={
          <FigureCard caption="Participating lender → your bank account. ShriNeo sits alongside as a routing and tracking layer.">
            <DirectFundFlowArt />
          </FigureCard>
        }
        points={[
          "Disbursal is credited by the lender to the bank account you verify.",
          "Repayments are collected by the lender under the mandate you approve.",
          "ShriNeo never asks for your banking password or OTP for a payment.",
        ]}
      />

      {/* 10 — built for Bharat */}
      <section aria-labelledby="bharat-title" className="border-b border-border bg-ink text-ink-foreground">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:items-center md:py-20">
          <div>
            <h2
              id="bharat-title"
              className="editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight text-balance"
            >
              Built for Bharat
            </h2>
            <p className="mt-4 max-w-xl text-ink-foreground/80">
              A shop owner in a district town, a salaried professional in a metro and a family
              planning their first home need the same thing: the full picture, in their language.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Talk to Neo in your preferred language",
                "Complete applications with guided support",
                "Connect with a verified local agent",
                "Review offers without hidden ranking",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-ink-foreground/15 bg-ink-foreground/5 p-4 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl border border-ink-foreground/15">
            <img
              src={heroImage}
              alt="A small business owner and a salaried professional reviewing loan information on a phone in a naturally lit Indian workplace"
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-4/3 size-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 11 — meet Neo */}
      <MediaSplit
        eyebrow="Guided support"
        title="Meet Neo"
        body="Neo explains products, documents and charges in plain English or Hindi, at any stage of your application."
        points={[
          "“Which loan may fit my needs?”",
          "“What does APR mean?”",
          "“Why is this document required?”",
          "“What happens after I submit?”",
        ]}
        media={<NeoChatPreview />}
        footnote="Neo provides guidance. Final loan decisions are made by participating lenders."
      />

      {/* 12 — borrower and agent collaboration */}
      <MediaSplit
        eyebrow="Assisted applications"
        title="Get help without giving up control"
        mediaSide="left"
        body="A verified agent can prepare and submit your file, but only after you approve the request."
        points={[
          "You give consent through an OTP before any agent can act.",
          "Documents stay inside ShriNeo's secure system — never on a personal device.",
          "Phone numbers remain masked where applicable.",
          "You can withdraw agent access at any time from your account.",
        ]}
        media={
          <FigureCard caption="Consent-gated assistance between a borrower and a verified agent.">
            <AgentAssistArt />
          </FigureCard>
        }
      />

      {/* 13 — trust score explanation */}
      <Section tone="surface" labelledBy="score-title">
        <SectionHeading
          id="score-title"
          title="Two different views of your creditworthiness"
          body="A bureau score and a cash-flow indicator answer different questions. They are not interchangeable."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <FigureCard tone="card">
            <DualScoreArt />
          </FigureCard>
          <div className="grid gap-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold">CIBIL Score</h3>
              <p className="num mt-1 text-sm text-muted-foreground">Range 300–900</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>Traditional credit bureau score based on borrowing history.</li>
                <li>Available for users who already have a bureau record.</li>
                <li>Fetched only after your explicit consent.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="flex flex-wrap items-center gap-2 text-base font-semibold">
                SNV Trust Score
                <StatusPill tone="neutral">Not a bureau score</StatusPill>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A cash-flow and financial-behaviour indicator used to support lender underwriting,
                with the contributing factors explained to you.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>Built from consented banking and repayment behaviour.</li>
                <li>Shown with the reasons behind it, never as a single opaque number.</li>
                <li>The final decision always remains with the participating lender.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 14 — trust center preview */}
      <MediaSplit
        eyebrow="Trust Center"
        title="Who does what, and what happens to your data"
        body="Every responsibility in a ShriNeo application is written down: ours, the lender's and yours."
        points={[
          <Link className="text-primary underline underline-offset-4" to="/how-it-works">
            How ShriNeo works
          </Link>,
          <Link className="text-primary underline underline-offset-4" to="/key-fact-statement">
            What the Key Fact Statement must contain
          </Link>,
          <Link className="text-primary underline underline-offset-4" to="/account-aggregator">
            How bank data is shared through Account Aggregator
          </Link>,
          <Link className="text-primary underline underline-offset-4" to="/grievance-redressal">
            Grievance support and escalation
          </Link>,
        ]}
        media={
          <FigureCard caption="Your data-access history shows what was accessed, by whom, when and why.">
            <PrivacyControlArt />
          </FigureCard>
        }
        action={
          <Button asChild variant="outline" className="min-h-11">
            <Link to="/trust-center">Visit the Trust Center</Link>
          </Button>
        }
      />

      {/* 15 — agent recruitment */}
      <Section labelledBy="agent-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>For agents</Eyebrow>
            <h2
              id="agent-title"
              className="text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-tight text-balance"
            >
              Help customers apply through a trusted digital process.
            </h2>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                "Verified identity",
                "Official agent profile",
                "Multi-lender access",
                "Training and certification",
                "Transparent commission ledger",
                "Secure borrower consent",
                "File tracking end to end",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm">
                  <BadgeCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 min-h-11">
              <Link to="/for-agents">Join as an agent</Link>
            </Button>
          </div>
          <AgentDashboardPreview />
        </div>
      </Section>

      {/* 16 — example journeys */}
      <Section tone="surface" labelledBy="stories-title">
        <SectionHeading
          id="stories-title"
          title="What a ShriNeo application looks like"
          body="Illustrative journeys, not customer testimonials. No approval outcome is implied."
        />
        <div className="mt-10">
          <UseCaseCards
            cases={[
              {
                persona: "A shop owner comparing business loans",
                need: "Needs working capital before the festive season and wants to know the true cost of each option.",
                steps: [
                  "Shares turnover through Account Aggregator instead of PDF statements",
                  "Compares APR and processing fee across matching lenders",
                  "Reviews the Key Fact Statement before signing",
                ],
              },
              {
                persona: "A salaried borrower checking affordability",
                need: "Wants to consolidate existing EMIs without stretching the monthly budget.",
                steps: [
                  "Uses the EMI estimate to test amount and tenure combinations",
                  "Consents to a bureau check only when ready to apply",
                  "Tracks the lender's response with timestamps",
                ],
              },
              {
                persona: "A family preparing for a home loan",
                need: "Plans a long-tenure loan and wants to understand total repayment, not only the headline rate.",
                steps: [
                  "Collects property and income documents using the document guide",
                  "Compares long-tenure offers on total cost",
                  "Reviews foreclosure and prepayment terms before selecting",
                ],
              },
            ]}
          />
        </div>
      </Section>

      {/* Borrower dashboard preview + disclosure */}
      <MediaSplit
        eyebrow="After you apply"
        title="Follow every stage, with dates"
        mediaSide="left"
        body="Your dashboard shows exactly where the application is, who is acting next and what is expected from you."
        media={<BorrowerDashboardPreview />}
        points={[
          "Status changes are timestamped and never silently reversed.",
          "Requests for more information appear with a clear deadline.",
          "Approved offers show the cooling-off window and how to use it.",
        ]}
      />

      {/* 17 — FAQ */}
      <Section labelledBy="faq-title">
        <SectionHeading id="faq-title" title="Questions people ask before applying" />
        <div className="mt-8">
          <FaqGroups groups={faqGroups} />
        </div>
        <div className="mt-8 max-w-2xl">
          <DisclosureBlock>
            {org.brandName} operates as a Lending Service Provider. It is not a bank or an NBFC and
            does not lend its own funds. {org.regulatoryNote}.
          </DisclosureBlock>
        </div>
      </Section>

      {/* 18 — final CTA */}
      <DarkCta
        title="Understand your options before you decide."
        body="Compare eligible offers, read the full cost, and apply only when the terms make sense to you."
        primary={{ to: "/auth/signup", label: "Start your application" }}
        secondary={{ to: "/for-borrowers", label: "Talk to Neo" }}
        note="Final approval and loan terms are determined by the participating lender."
      />
    </PublicShell>
  );
}
