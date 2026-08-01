import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleHelp, FileText, ListChecks, MessagesSquare, ShieldCheck } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, Eyebrow } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/for-borrowers")({
  head: () => ({
    meta: [
      { title: "For borrowers — how applying with ShriNeo Capital works" },
      {
        name: "description",
        content:
          "What to prepare, what each consent means, how offers are compared, and what happens after you accept. Plain-language guidance for borrowers.",
      },
      { property: "og:title", content: "For borrowers — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Understand the process, the paperwork and your rights before you apply.",
      },
      { property: "og:url", content: "/for-borrowers" },
    ],
    links: [{ rel: "canonical", href: "/for-borrowers" }],
  }),
  component: ForBorrowersPage,
});

const journey = [
  {
    title: "Start your request",
    body: "Create an account with your mobile number and tell us the amount, purpose and tenure you have in mind. Nothing is shared with a lender at this stage.",
  },
  {
    title: "Complete KYC and income details",
    body: "Provide PAN and Aadhaar-based identity details, then income proof. Each field explains why it is required and who will see it.",
  },
  {
    title: "Give consent, item by item",
    body: "Credit bureau check, bank statement access and e-sign are separate consents. You can decline any of them and stop at any point.",
  },
  {
    title: "Compare offers",
    body: "Matching lenders return offers with rate, APR, EMI, processing fee and total repayment. Ranking is by total cost, never by commercials.",
  },
  {
    title: "Accept and sign",
    body: "You review the Key Fact Statement, then e-sign with the lender. Your cooling-off period and foreclosure terms are stated there.",
  },
  {
    title: "Disbursal and repayment",
    body: "The lender disburses to your bank account directly, and you repay the lender. ShriNeo never holds your loan funds.",
  },
];

const rights = [
  "A Key Fact Statement showing APR, all fees and taxes, and the full EMI schedule before you sign.",
  "A cooling-off period during which you may exit the loan by repaying principal and proportionate charges.",
  "Recovery conducted only by the lender or its authorised agent, within the applicable regulatory framework.",
  "A named Grievance Officer, an acknowledgement of your complaint, and an escalation path if unresolved.",
  "The right to withdraw a consent you previously gave, and to ask what data is held about you.",
];

export function ForBorrowersPage() {
  return (
    <PublicShell>
      <Section labelledBy="borrowers-title">
        <div className="max-w-3xl">
          <Eyebrow>For borrowers</Eyebrow>
          <h1
            id="borrowers-title"
            className="editorial text-[clamp(2rem,5vw,3rem)] tracking-tight text-balance"
          >
            Know what you are agreeing to, at every step.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Applying for credit should not require decoding jargon. Here is the whole journey, the
            documents to keep ready, and the rights you hold as a borrower.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="min-h-11">
              <Link to="/auth/signup">Apply for a loan</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11">
              <Link to="/loans">See loan products</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="journey-title">
        <SectionHeading
          id="journey-title"
          title="The full journey"
          body="Six stages. You can pause at any point, and nothing is submitted without your explicit action."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {journey.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border bg-card p-6">
              <span className="num inline-grid size-8 place-items-center rounded-full bg-accent text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="prepare-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="prepare-title"
              title="What to keep ready"
              body="Having these on hand makes the application faster and reduces back-and-forth with the lender."
            />
            <ul className="mt-6 space-y-3">
              {[
                "PAN card",
                "Aadhaar or another accepted address proof",
                "Bank statements for the last 6 to 12 months",
                "Income proof: salary slips, ITR or business filings",
                "A bank account in your own name for disbursal",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <ListChecks aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Your rights as a borrower" />
            <ul className="mt-6 space-y-3">
              {rights.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="neo-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <MessagesSquare aria-hidden className="size-6 text-primary" />
            <h2 id="neo-title" className="mt-4 text-[clamp(1.5rem,3vw,2rem)] font-semibold">
              Ask Neo, in English or Hindi
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Neo is our in-product assistant for questions about the process, the documents and the
              wording of an offer. Neo explains — it never approves a loan, sets a rate, or gives
              you a decision. Anything Neo says is guidance, not a commitment from a lender.
            </p>
          </div>
          <ul className="grid gap-3">
            {[
              "“What does APR include?”",
              "“Why do you need my bank statement?”",
              "“What happens if I miss an EMI?”",
              "“Can I close this loan early?”",
            ].map((q) => (
              <li
                key={q}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm"
              >
                <CircleHelp aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <SectionHeading id="faq-title" title="Common questions" />
        <Accordion type="single" collapsible className="mt-6 max-w-3xl">
          {[
            {
              q: "Does ShriNeo charge borrowers a fee?",
              a: "Any fee applicable to you is disclosed in the Key Fact Statement before you sign. Lender processing fees are shown on each offer during comparison.",
            },
            {
              q: "Will comparing offers hurt my credit score?",
              a: "A bureau check may be recorded as an enquiry. We request that consent separately and explain it before it happens.",
            },
            {
              q: "Can I stop after seeing the offers?",
              a: "Yes. Viewing offers creates no obligation. A loan exists only once you accept an offer and sign with the lender.",
            },
            {
              q: "Who do I contact if something goes wrong?",
              a: "Our Grievance Officer, listed on the Grievance Redressal page, with a reference number and defined response timelines.",
            },
          ].map((faq, index) => (
            <AccordionItem key={faq.q} value={`b-${index}`}>
              <AccordionTrigger className="text-left text-base">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-info-surface p-4 text-sm">
          <FileText aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
          Approval, the sanctioned amount and the interest rate are decided by the participating
          lender, not by ShriNeo Capital.
        </p>
      </Section>
    </PublicShell>
  );
}
