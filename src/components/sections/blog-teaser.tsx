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
 * Three independent cards — own border, own surface, own radius.
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

        <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {ARTICLES.map((article, i) => (
            <Reveal as="li" key={article.title} delay={70 + i * 80} className="min-w-0">
              <Link
                to="/help-center"
                className="blog-card group flex h-full flex-col rounded-[14px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(0,20,80,0.05)] transition-[transform,border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_10px_28px_rgba(0,20,80,0.10)] focus-visible:-translate-y-1 focus-visible:border-brand-200 focus-visible:shadow-[0_10px_28px_rgba(0,20,80,0.10)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:translate-y-0 active:duration-[80ms] md:p-7"
              >
                <span className="inline-flex self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-primary">
                  {article.category}
                </span>
                <h3 className="mt-4 text-lg leading-snug font-semibold tracking-[-0.018em] transition-colors duration-200 group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-muted-foreground md:text-sm">
                  {article.excerpt}
                </p>
                <span className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="num text-xs font-medium text-muted-foreground">
                    {article.read}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read article
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px]"
                    />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
