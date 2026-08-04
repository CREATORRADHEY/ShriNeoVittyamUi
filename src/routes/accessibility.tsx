import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { PageHero } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/design-system/section";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility statement | ShriNeo Capital" },
      {
        name: "description",
        content:
          "How ShriNeo Capital approaches accessibility: standards followed, features supported, known limitations, and how to report an accessibility barrier.",
      },
      { property: "og:title", content: "Accessibility statement — ShriNeo Capital" },
      { property: "og:description", content: "Standards, supported features and known limitations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/accessibility" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: AccessibilityPage,
});

const supported = [
  "Keyboard navigation across navigation, forms, menus and dialogs, with a visible focus ring",
  "A skip link to the main content on every page",
  "Text alternatives for meaningful images, and empty alternatives for decorative ones",
  "Minimum 44 by 44 pixel touch targets for interactive controls",
  "Reduced-motion support: animation is disabled when the operating system requests it",
  "Readable body text at a minimum of 16 pixels on the marketing site and borrower portal",
  "Layouts that reflow without horizontal scrolling at 200 percent zoom",
  "The page language attribute updates when the interface language changes",
];

const limitations = [
  "Some dense lender and admin tables use 14 pixel text and require horizontal scrolling on small screens",
  "Screen-reader announcements in Indian languages depend on the voices installed on the device",
  "Third-party embedded flows, such as identity verification, are governed by the provider's own accessibility support",
  "Demonstration and prototype screens are still being audited alongside production screens",
];

function AccessibilityPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility statement"
        body="Credit should be reachable by everyone, including people using assistive technology. This page describes what we support today and what we are still working on."
      />

      <Section labelledBy="standard-title">
        <SectionHeading
          id="standard-title"
          title="Standard we work to"
          body="We aim to meet WCAG 2.1 Level AA across the marketing website and all four portals. We test with keyboard-only navigation, screen readers, high zoom and reduced-motion settings."
        />
      </Section>

      <Section tone="surface" labelledBy="supported-title">
        <SectionHeading id="supported-title" title="What is supported today" />
        <ul className="mt-8 grid max-w-3xl gap-3">
          {supported.map((item) => (
            <li key={item} className="rounded-lg border border-border bg-card p-4 text-base leading-relaxed text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="limits-title">
        <SectionHeading
          id="limits-title"
          title="Known limitations"
          body="Published openly rather than hidden, so you know what to expect."
        />
        <ul className="mt-8 grid max-w-3xl gap-3">
          {limitations.map((item) => (
            <li key={item} className="rounded-lg border border-border p-4 text-base leading-relaxed text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="report-title">
        <SectionHeading
          id="report-title"
          title="Report an accessibility barrier"
          body="Tell us the page, what you were trying to do, and the assistive technology you were using. We acknowledge reports within 3 working days."
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="mailto:accessibility@shrineocapital.com"
            className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            accessibility@shrineocapital.com
          </a>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center rounded-lg border border-border-strong px-5 text-sm font-semibold"
          >
            Other contact routes
          </Link>
        </div>
        <p className="num mt-8 text-sm text-muted-foreground">Last updated: 2026-08</p>
      </Section>
    </PublicShell>
  );
}
