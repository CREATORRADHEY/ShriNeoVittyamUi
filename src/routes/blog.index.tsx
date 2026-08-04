import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { PageHero } from "@/components/sections/blocks";
import { Section } from "@/components/design-system/section";
import { blogArticles } from "@/content/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — borrowing, credit and agent guidance | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Plain-language articles on reading a loan offer, building a credit story without a bureau file, and how agent commissions work on ShriNeo Capital.",
      },
      { property: "og:title", content: "ShriNeo Capital Blog" },
      {
        property: "og:description",
        content: "Understand borrowing before you borrow — written in-house, no sponsored content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="From the blog"
        title="Understand borrowing before you borrow"
        body="Written in-house by the ShriNeo Capital team. No sponsored placements, no lender-paid articles, and no advice that assumes an approval you have not received."
      />

      <Section labelledBy="articles-title">
        <h2 id="articles-title" className="sr-only">
          All articles
        </h2>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogArticles.map((article) => (
            <li key={article.slug} className="min-w-0">
              <Link
                to="/blog/$slug"
                params={{ slug: article.slug }}
                className="group flex h-full flex-col rounded-[14px] border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_10px_28px_rgba(0,20,80,0.10)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none md:p-7"
              >
                <span className="inline-flex self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-primary">
                  {article.category}
                </span>
                <h3 className="mt-4 text-lg leading-snug font-semibold tracking-[-0.018em] group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-muted-foreground md:text-sm">
                  {article.excerpt}
                </p>
                <span className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="num text-xs font-medium text-muted-foreground">
                    {article.read}
                  </span>
                  <ArrowRight aria-hidden className="size-4 text-primary" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </PublicShell>
  );
}
