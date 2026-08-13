import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { PageHero } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/design-system/section";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Work on digital lending infrastructure for Bharat. Current hiring status, how we hire, and how to reach the ShriNeo Capital team.",
      },
      { property: "og:title", content: "Careers — ShriNeo Capital" },
      { property: "og:description", content: "How we hire, and how to reach us." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

const disciplines = [
  {
    title: "Engineering",
    body: "Product engineering, platform reliability and secure integrations with lender systems.",
  },
  {
    title: "Risk and credit",
    body: "Credit policy, alternative data analysis and lender-facing decision support.",
  },
  {
    title: "Compliance",
    body: "RBI digital lending alignment, disclosure quality and grievance handling.",
  },
  {
    title: "Field and agent operations",
    body: "Agent verification, training and regional support across languages.",
  },
];

function CareersPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Careers"
        title="Build lending infrastructure for Bharat"
        body="ShriNeo Capital is an early-stage team building a vernacular-first lending platform. We hire slowly and deliberately, and we publish a role only when it is genuinely open."
      />

      <Section labelledBy="open-title">
        <SectionHeading
          id="open-title"
          title="Current openings"
          body="There are no published openings at this time."
        />
        <div className="mt-8 max-w-2xl rounded-xl border border-border bg-surface p-6">
          <p className="text-base leading-relaxed text-muted-foreground">
            We keep this page honest: no placeholder listings and no roles we are not actively
            hiring for. If your work fits one of the areas below, write to us and we will keep your
            details on file.
          </p>
          <a
            href="mailto:careers@shrineocapital.com"
            className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            careers@shrineocapital.com
          </a>
        </div>
      </Section>

      <Section tone="surface" labelledBy="areas-title">
        <SectionHeading id="areas-title" title="Areas we hire into" />
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {disciplines.map((item) => (
            <li key={item.title} className="rounded-[14px] border border-border bg-card p-6">
              <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="how-title">
        <SectionHeading id="how-title" title="How we hire" />
        <ol className="mt-8 grid max-w-2xl gap-4">
          {[
            "A short written exchange about the work you have done",
            "A practical conversation grounded in a real problem from the platform",
            "A conversation with the team you would work with",
            "A written offer with clear scope and expectations",
          ].map((step, index) => (
            <li key={step} className="flex gap-4 rounded-xl border border-border p-4">
              <span className="num text-sm font-semibold text-primary">0{index + 1}</span>
              <span className="text-base leading-relaxed text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-base text-muted-foreground">
          Questions that are not about a role belong on the{" "}
          <Link
            to="/contact"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            contact page
          </Link>
          .
        </p>
      </Section>
    </PublicShell>
  );
}
