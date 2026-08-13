import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MessageSquareWarning, Mail, Phone } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/sections/blocks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { org, configured } from "@/config/org";

export const Route = createFileRoute("/help-center")({
  head: () => ({
    meta: [
      { title: "Help Center — answers about applying, documents and offers | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Search or browse answers on applying for a loan, eligibility, documents, offers and charges, tracking, payments, agents, account security and complaints.",
      },
      { property: "og:title", content: "Help Center — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Browse or search approved help content, then reach a human if you need one.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/help-center" },
    ],
    links: [{ rel: "canonical", href: "/help-center" }],
  }),
  component: HelpCenterPage,
});

type HelpItem = { q: string; a: string };
type HelpCategory = { id: string; title: string; blurb: string; items: HelpItem[] };

const categories: HelpCategory[] = [
  {
    id: "applying",
    title: "Applying for a loan",
    blurb: "Starting an application and what happens after you submit.",
    items: [
      {
        q: "How do I start an application?",
        a: "Choose a loan product, check indicative eligibility, then create an account with your mobile number. You can save an incomplete application and return to it later.",
      },
      {
        q: "Can I apply for more than one product?",
        a: "Yes, but apply for what you actually need. Multiple simultaneous applications can lead to several bureau enquiries, which lenders can see.",
      },
      {
        q: "How long does a decision take?",
        a: "The participating lender decides, and timelines differ by lender and product. We show your current stage at every point, and we do not promise a fixed decision time.",
      },
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    blurb: "Who can apply, and what affects matching.",
    items: [
      {
        q: "Do I need a CIBIL score to apply?",
        a: "Not always. Some lenders assess applicants with no credit file using income and banking evidence. Having no score is not the same as having a poor one.",
      },
      {
        q: "Does checking eligibility affect my score?",
        a: "An indicative eligibility check on our site does not. A bureau check by a lender may be recorded as an enquiry, and we ask for that consent explicitly.",
      },
      {
        q: "Why was I matched with fewer lenders than expected?",
        a: "Lenders configure their own criteria — location, income, business vintage, product limits. A smaller match list usually means fewer criteria fit, not that you were rejected.",
      },
    ],
  },
  {
    id: "documents",
    title: "Documents",
    blurb: "What to upload and how it is handled.",
    items: [
      {
        q: "Which documents will I need?",
        a: "Identity and address proof, income evidence, and product-specific documents such as GST or Udyam for business loans and property papers for a mortgage. Each product page lists them.",
      },
      {
        q: "My upload keeps failing. What should I check?",
        a: "Use a clear, complete image or PDF under the size limit, with all four corners visible. If it still fails, try a different file format and then contact support.",
      },
      {
        q: "Can I share bank statements without uploading PDFs?",
        a: "Yes, through an Account Aggregator, with your consent. The data is read-only and time-limited.",
      },
    ],
  },
  {
    id: "offers",
    title: "Offers and charges",
    blurb: "Reading an offer and understanding total cost.",
    items: [
      {
        q: "Why is APR higher than the interest rate?",
        a: "APR includes processing fees and other mandatory charges alongside interest, so it reflects the real cost of borrowing better than the headline rate.",
      },
      {
        q: "When do I see all the charges?",
        a: "In the Key Fact Statement, before you sign. It lists APR, fees, taxes, the EMI schedule, foreclosure terms and the cooling-off period.",
      },
      {
        q: "Does ShriNeo charge me a fee?",
        a: "Any charge that applies to you appears in the lender's Key Fact Statement. Never pay a fee to an individual to release or guarantee a loan.",
      },
    ],
  },
  {
    id: "tracking",
    title: "Application tracking",
    blurb: "Knowing where your application stands.",
    items: [
      {
        q: "Where do I see my application status?",
        a: "In your account, with the current stage, what is pending and who needs to act next.",
      },
      {
        q: "My application says pending documents. What now?",
        a: "Open the application, review the flagged item and re-upload. The stage updates once the document passes checks.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    blurb: "Repayment, which is between you and the lender.",
    items: [
      {
        q: "Who collects my EMI?",
        a: "The participating lender, directly from your bank account. ShriNeo Capital does not collect or hold repayments.",
      },
      {
        q: "I may miss an instalment. What should I do?",
        a: "Contact the lender before the due date. Missed payments are reported to credit bureaus and attract charges set by the lender.",
      },
    ],
  },
  {
    id: "agents",
    title: "Agents",
    blurb: "Assisted applications and verification.",
    items: [
      {
        q: "How do I confirm an agent is genuine?",
        a: "Every registered agent has an agent code and profile visible in your application. Assistance only begins after you approve an OTP request naming that agent.",
      },
      {
        q: "Should an agent ever ask for my OTP?",
        a: "No. You enter your own OTP. Anyone asking you to share it is misusing the platform — report it through grievance redressal.",
      },
    ],
  },
  {
    id: "account",
    title: "Account and security",
    blurb: "Access, sessions and protecting your data.",
    items: [
      {
        q: "I changed my mobile number. What do I do?",
        a: "Update it from your profile with verification on both numbers, so status updates keep reaching you.",
      },
      {
        q: "What data can ShriNeo see on my phone?",
        a: "Only files you deliberately choose to upload. We do not access contacts, SMS or your general photo gallery.",
      },
    ],
  },
  {
    id: "complaints",
    title: "Complaints and grievances",
    blurb: "When support is not enough.",
    items: [
      {
        q: "What is the difference between support and a grievance?",
        a: "Support handles questions and routine issues. A grievance is a formal complaint that is logged with a reference and tracked to a documented resolution.",
      },
      {
        q: "How do I escalate?",
        a: "Raise a grievance with your application reference. If the matter belongs to the lender, we escalate with your record attached and tell you where it sits.",
      },
    ],
  },
];

function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (term.length < 2) return categories;
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.q.toLowerCase().includes(term) ||
            item.a.toLowerCase().includes(term) ||
            category.title.toLowerCase().includes(term),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [term]);

  const matchCount = results.reduce((total, category) => total + category.items.length, 0);

  return (
    <PublicShell>
      <PageHero
        eyebrow="Support"
        title="Find the answer, then reach a person if you still need one."
        body="Search across our approved help content or browse by category. Nothing here requires you to sign in."
        aside={
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-raised)]">
            <Label htmlFor="help-search">Search help articles</Label>
            <div className="relative mt-2">
              <Search
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="help-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. documents, APR, agent"
                className="min-h-11 pl-9"
              />
            </div>
            <p aria-live="polite" className="mt-3 text-sm text-muted-foreground">
              {term.length < 2
                ? `${categories.length} categories available`
                : `${matchCount} ${matchCount === 1 ? "answer" : "answers"} matching “${query.trim()}”`}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Search runs over the help content on this page only. It does not query a live support
              system.
            </p>
          </div>
        }
      />

      <Section labelledBy="browse-title">
        <SectionHeading id="browse-title" title="Browse by category" />
        <nav aria-label="Help categories" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-12">
          {results.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-8 text-center">
              <h3 className="text-lg font-semibold">No answer matches “{query.trim()}”</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Try a shorter word such as “documents” or “APR”, or contact support and a person
                will pick it up.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button variant="outline" className="min-h-11" onClick={() => setQuery("")}>
                  Clear search
                </Button>
                <Button asChild className="min-h-11">
                  <Link to="/contact">Contact support</Link>
                </Button>
              </div>
            </div>
          ) : (
            results.map((category) => (
              <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`}>
                <h3 id={`${category.id}-title`} className="text-xl font-semibold tracking-tight">
                  {category.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{category.blurb}</p>
                <Accordion type="single" collapsible className="mt-4 max-w-3xl">
                  {category.items.map((item) => (
                    <AccordionItem key={item.q} value={item.q}>
                      <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))
          )}
        </div>
      </Section>

      <Section labelledBy="reach-title" tone="surface">
        <SectionHeading
          id="reach-title"
          title="Still need help?"
          body="Choose the route that matches how serious the issue is."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Mail,
              title: "Contact support",
              body: "Questions about a product, an application or a document.",
              to: "/contact" as const,
              cta: "Open the contact form",
            },
            {
              icon: MessageSquareWarning,
              title: "Raise a grievance",
              body: "A formal complaint, logged with a reference and tracked to resolution.",
              to: "/grievance-redressal" as const,
              cta: "Grievance redressal",
            },
            {
              icon: Phone,
              title: "Call us",
              body: `Support line: ${configured(org.supportPhone)}. Email: ${configured(org.supportEmail)}.`,
              to: "/contact" as const,
              cta: "See contact details",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <item.icon aria-hidden className="size-5 text-primary" />
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.body}</p>
              <Button asChild variant="outline" className="mt-5 min-h-11">
                <Link to={item.to}>{item.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </PublicShell>
  );
}
