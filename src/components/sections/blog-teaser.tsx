import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

type Teaser = {
  category: string;
  title: string;
  excerpt: string;
  read: string;
};

const ARTICLES: Teaser[] = [
  {
    category: "Borrowing basics",
    title: "APR, interest and fees: what you actually pay",
    excerpt:
      "The lowest headline rate is rarely the cheapest loan. Here is how to read an offer end to end before you sign.",
    read: "6 min read",
  },
  {
    category: "Credit",
    title: "No CIBIL history? You still have a credit story",
    excerpt:
      "UPI activity, utility bills and business cash flow describe financial discipline that a bureau file misses.",
    read: "5 min read",
  },
  {
    category: "For agents",
    title: "How commissions and payouts work on ShriNeo",
    excerpt:
      "Per-product commission, disclosed before you submit a case and paid against a visible schedule after disbursal.",
    read: "4 min read",
  },
];

/**
 * Blog teaser band, directly above the footer.
 * Content and composition follow the approved landing reference.
 */
export function BlogTeaserSection() {
  return (
    <section aria-labelledby="blog-title" className="bg-surface-strong">
      <div className="container-page py-16 md:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <p className="label-micro text-primary">From the blog</p>
            <h2
              id="blog-title"
              className="editorial mt-4 text-[clamp(1.75rem,3.2vw,2.4rem)] tracking-tight"
            >
              Understand borrowing before you borrow.
            </h2>
          </div>
          <Link
            to="/help-center"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View all articles
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Reveal>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:mt-12 md:grid-cols-3">
          {ARTICLES.map((article, i) => (
            <Reveal as="li" key={article.title} delay={60 + i * 40} className="min-w-0">
              <Link
                to="/help-center"
                className="group flex h-full flex-col bg-card p-6 transition-colors duration-200 hover:bg-brand-50 md:p-7"
              >
                <span className="inline-flex self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-primary">
                  {article.category}
                </span>
                <h3 className="mt-4 text-lg leading-snug font-semibold tracking-[-0.018em]">
                  {article.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
                <span className="num mt-auto pt-5 text-xs font-medium text-muted-foreground">
                  {article.read}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
