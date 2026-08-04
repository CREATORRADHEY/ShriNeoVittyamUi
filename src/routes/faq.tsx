import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { PageHero } from "@/components/sections/blocks";
import { Section } from "@/components/design-system/section";
import { HomeFaq } from "@/components/sections/home-faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently asked questions | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Answers for borrowers, agents and general questions about ShriNeo Capital: applying, offers, data consent, agent commissions and who lends the money.",
      },
      { property: "og:title", content: "FAQ — ShriNeo Capital" },
      { property: "og:description", content: "Borrower, agent and general questions answered." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Questions"
        title="Answers before you apply"
        body="The same approved answers shown on the homepage, grouped for borrowers, agents and general enquiries."
      />

      <HomeFaq />

      <Section labelledBy="more-help">
        <h2 id="more-help" className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight">
          Still need help
        </h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/help-center"
            className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Visit the Help Center
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center rounded-lg border border-border-strong px-5 text-sm font-semibold"
          >
            Contact us
          </Link>
          <Link
            to="/grievance-redressal"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Raise a complaint
          </Link>
        </div>
      </Section>
    </PublicShell>
  );
}
