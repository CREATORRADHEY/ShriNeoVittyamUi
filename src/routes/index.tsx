import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  FileText,
  Languages,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";
import { products } from "@/config/products";
import { org } from "@/config/org";
import { formatINR } from "@/lib/format";
import { useI18n } from "@/i18n";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, Eyebrow, StatusPill } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShriNeo Capital — Your Dreams, Our Responsibility" },
      {
        name: "description",
        content:
          "Compare loan offers from participating banks and NBFCs in English or Hindi. Clear fees, purpose-specific consent, and a Key Fact Statement before you sign.",
      },
      { property: "og:title", content: "ShriNeo Capital — Your Dreams, Our Responsibility" },
      {
        property: "og:description",
        content:
          "A vernacular-first digital lending platform for Bharat. Compare offers, understand the cost, and stay in control.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();

  const steps = [
    { title: t("home.how.s1"), body: t("home.how.s1b") },
    { title: t("home.how.s2"), body: t("home.how.s2b") },
    { title: t("home.how.s3"), body: t("home.how.s3b") },
    { title: t("home.how.s4"), body: t("home.how.s4b") },
  ];

  const bharat = [
    { icon: Languages, title: t("home.bharat.f1"), body: t("home.bharat.f1b") },
    { icon: FileText, title: t("home.bharat.f2"), body: t("home.bharat.f2b") },
    { icon: BadgeCheck, title: t("home.bharat.f3"), body: t("home.bharat.f3b") },
  ];

  return (
    <PublicShell>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="border-b border-border bg-surface">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-20">
          <div>
            <Eyebrow>{t("home.eyebrow")}</Eyebrow>
            <h1
              id="hero-title"
              className="editorial text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05] tracking-tight text-balance"
            >
              {t("home.hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{t("home.hero.body")}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-11">
                <Link to="/auth/signup">
                  {t("home.hero.primary")}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-11">
                <Link to="/for-borrowers">
                  <MessagesSquare aria-hidden className="size-4" />
                  {t("home.hero.secondary")}
                </Link>
              </Button>
            </div>

            <p className="mt-6 max-w-xl text-sm text-muted-foreground">{org.roleStatement}</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={heroImage}
              alt={t("home.hero.imageAlt")}
              width={1200}
              height={900}
              className="aspect-4/3 size-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section labelledBy="how-title">
        <SectionHeading id="how-title" title={t("home.how.title")} body={t("home.how.body")} />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border bg-card p-6">
              <span className="num inline-grid size-8 place-items-center rounded-full bg-accent text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-info-surface p-4 text-sm">
          <Banknote aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
          {t("home.transfer")}
        </p>
      </Section>

      {/* Products */}
      <Section tone="surface" labelledBy="products-title">
        <SectionHeading
          id="products-title"
          title={t("home.products.title")}
          body={t("home.products.body")}
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                to={product.path}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:border-primary"
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
                  {t("home.products.explore")}
                  <ArrowRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Built for Bharat */}
      <Section labelledBy="bharat-title">
        <SectionHeading id="bharat-title" title={t("home.bharat.title")} />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {bharat.map((item) => (
            <li key={item.title} className="rounded-xl border border-border p-6">
              <item.icon aria-hidden className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Agent recruitment */}
      <Section tone="ink" labelledBy="agent-title">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 id="agent-title" className="editorial text-[clamp(1.5rem,3vw,2.25rem)] text-balance">
              {t("home.agent.title")}
            </h2>
            <p className="mt-4 text-base text-ink-foreground/80">{t("home.agent.body")}</p>
            <Button asChild size="lg" variant="secondary" className="mt-6 min-h-11">
              <Link to="/for-agents">{t("home.agent.cta")}</Link>
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              t("home.agent.b1"),
              t("home.agent.b2"),
              t("home.agent.b3"),
              t("home.agent.b4"),
            ].map((benefit) => (
              <li
                key={benefit}
                className="rounded-lg border border-ink-foreground/15 bg-ink-foreground/5 p-4 text-sm"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Trust */}
      <Section labelledBy="trust-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionHeading id="trust-title" title={t("home.trust.title")} />
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              <TrustItem icon={ShieldCheck} title="Purpose-specific consent">
                Bureau checks, bank data access and e-sign are each consented to separately and
                logged with a timestamp.
              </TrustItem>
              <TrustItem icon={FileText} title="Key Fact Statement">
                APR, all fees, the EMI schedule, foreclosure terms and the cooling-off period are
                disclosed before signing.
              </TrustItem>
              <TrustItem icon={Banknote} title="No fund holding">
                Disbursal and repayment flow directly between you and the participating lender.
              </TrustItem>
              <TrustItem icon={BadgeCheck} title="Named Grievance Officer">
                Every complaint receives a reference number, an acknowledgement and an escalation
                path.
              </TrustItem>
            </ul>
          </div>
          <Button asChild size="lg" variant="outline" className="min-h-11">
            <Link to="/trust-center">{t("home.trust.cta")}</Link>
          </Button>
        </div>
      </Section>
    </PublicShell>
  );
}

function TrustItem({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof ShieldCheck;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-lg border border-border bg-card p-5">
      <Icon aria-hidden className="size-5 text-primary" />
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{children}</p>
    </li>
  );
}
