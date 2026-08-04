import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { PageHero } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/design-system/section";
import { org } from "@/config/org";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press and media | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Media contact, company boilerplate and brand asset usage rules for ShriNeo Capital, a Lending Service Provider operated by SHRINEO VITTIYAM PRIVATE LIMITED.",
      },
      { property: "og:title", content: "Press — ShriNeo Capital" },
      { property: "og:description", content: "Media contact, boilerplate and brand assets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/press" },
    ],
    links: [{ rel: "canonical", href: "/press" }],
  }),
  component: PressPage,
});

function PressPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Press"
        title="Press and media"
        body="For interviews, factual verification or brand assets, contact the team directly. We do not republish coverage we cannot verify."
      />

      <Section labelledBy="contact-title">
        <SectionHeading id="contact-title" title="Media contact" />
        <div className="mt-8 max-w-2xl rounded-xl border border-border bg-surface p-6">
          <p className="text-base leading-relaxed text-muted-foreground">
            Please include your publication, deadline and the specific questions you need answered.
            We respond to factual accuracy requests first.
          </p>
          <a
            href="mailto:press@shrineocapital.com"
            className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            press@shrineocapital.com
          </a>
        </div>
      </Section>

      <Section tone="surface" labelledBy="boilerplate-title">
        <SectionHeading id="boilerplate-title" title="Company boilerplate" />
        <div className="mt-8 max-w-3xl rounded-xl border border-border bg-card p-6">
          <p className="text-base leading-relaxed">
            {org.brandName} is a vernacular-first digital lending platform operated by{" "}
            {org.legalEntity}. ShriNeo Capital acts as a {org.role}: it helps borrowers compare loan
            offers from participating banks and NBFCs, supports verified agents who assist borrowers
            in person, and gives lenders a structured application pipeline. ShriNeo Capital is not a
            bank or an NBFC, does not lend its own funds, and does not hold or control loan funds —
            money moves directly between the regulated lender and the borrower's bank account.
          </p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Please use this wording verbatim when describing the company.
        </p>
      </Section>

      <Section labelledBy="assets-title">
        <SectionHeading
          id="assets-title"
          title="Brand assets"
          body="Approved assets are supplied on request so that the current lockup is always used."
        />
        <ul className="mt-8 grid max-w-3xl gap-3">
          {[
            "Use the full ShriNeo Capital lockup. Do not use the symbol alone in editorial contexts.",
            "Do not recolour, stretch, rotate or add effects to the logo.",
            "Do not place the logo on a background that reduces legibility.",
            "Do not imply a partnership, endorsement or lending licence that does not exist.",
          ].map((rule) => (
            <li key={rule} className="rounded-lg border border-border p-4 text-base text-muted-foreground">
              {rule}
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Request brand assets
        </Link>
      </Section>
    </PublicShell>
  );
}
