import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { PageHero } from "@/components/sections/blocks";
import { Section } from "@/components/design-system/section";
import { blogArticles, getArticle, type BlogArticle } from "@/content/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable — ShriNeo Capital" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} | ShriNeo Capital` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
        { property: "og:url", content: `/blog/${article.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${article.slug}` }],
    };
  },
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const { article } = Route.useLoaderData() as { article: BlogArticle };
  const others = blogArticles.filter((item) => item.slug !== article.slug);

  return (
    <PublicShell>
      <PageHero eyebrow={article.category} title={article.title} body={article.intro} />

      <Section labelledBy="article-body">
        <h2 id="article-body" className="sr-only">
          Article
        </h2>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="max-w-2xl">
            <p className="num text-xs font-medium text-muted-foreground">{article.read}</p>
            {article.sections.map((section) => (
              <section key={section.heading} className="mt-9 first:mt-7">
                <h3 className="text-xl font-semibold tracking-tight">{section.heading}</h3>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
            <p className="mt-10 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted-foreground">
              This article is general information, not financial advice. ShriNeo Capital is a
              Lending Service Provider and is not the lender. Final terms are set by the
              participating lender.
            </p>
          </article>

          <aside aria-labelledby="more-articles">
            <h3 id="more-articles" className="text-sm font-semibold tracking-tight">
              More articles
            </h3>
            <ul className="mt-4 grid gap-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: item.slug }}
                    className="flex min-h-11 flex-col justify-center rounded-lg border border-border p-4 text-sm font-medium transition-colors hover:border-brand-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  View all articles
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </Section>
    </PublicShell>
  );
}
