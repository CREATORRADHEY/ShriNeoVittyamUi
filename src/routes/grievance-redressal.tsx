import { createFileRoute, Link } from "@tanstack/react-router";
import { org, configured } from "@/config/org";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, Eyebrow } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/grievance-redressal")({
  head: () => ({
    meta: [
      { title: "Grievance Redressal — ShriNeo Capital" },
      {
        name: "description",
        content:
          "How to raise a complaint with ShriNeo Capital, the information to include, expected response timelines, and the escalation path if you remain dissatisfied.",
      },
      { property: "og:title", content: "Grievance Redressal — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Named Grievance Officer, defined timelines and a clear escalation path.",
      },
      { property: "og:url", content: "/grievance-redressal" },
    ],
    links: [{ rel: "canonical", href: "/grievance-redressal" }],
  }),
  component: GrievancePage,
});

const stages = [
  {
    title: "Level 1 — Customer support",
    body: "Raise your issue through the contact channels. You receive a reference number so the complaint can be tracked.",
  },
  {
    title: "Level 2 — Grievance Officer",
    body: "If unresolved or if you are dissatisfied with the response, escalate to our named Grievance Officer using the details below.",
  },
  {
    title: "Level 3 — The lender",
    body: "Complaints about a sanctioned loan, its terms, repayment or recovery are handled by the participating lender under its own grievance policy.",
  },
  {
    title: "Level 4 — Regulatory escalation",
    body: "If your complaint remains unresolved after the lender's process and the prescribed period, you may escalate through the applicable RBI grievance mechanism.",
  },
];

function GrievancePage() {
  return (
    <PublicShell>
      <Section labelledBy="grievance-title">
        <div className="max-w-3xl">
          <Eyebrow>Grievance Redressal</Eyebrow>
          <h1
            id="grievance-title"
            className="editorial text-[clamp(2rem,5vw,3rem)] tracking-tight text-balance"
          >
            Every complaint gets a name, a number and a timeline.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            {org.legalEntity} maintains a grievance process for the ShriNeo Capital platform. Use it
            for anything that has gone wrong — we would rather hear it than not.
          </p>
        </div>
      </Section>

      <Section tone="surface" labelledBy="officer-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading id="officer-title" title="Grievance Officer" />
            <dl className="mt-6 space-y-4 text-sm">
              <Row term="Name" detail={configured(org.grievanceOfficer.name)} />
              <Row term="Designation" detail={configured(org.grievanceOfficer.designation)} />
              <Row term="Email" detail={configured(org.grievanceOfficer.email)} />
              <Row term="Phone" detail={configured(org.grievanceOfficer.phone)} />
              <Row term="Address" detail={configured(org.grievanceOfficer.address)} />
              <Row term="Response commitment" detail={org.grievanceOfficer.responseWindow} />
            </dl>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">What to include</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Your registered mobile number and full name.</li>
              <li>The application or reference number, if you have one.</li>
              <li>What happened, with dates, in your own words.</li>
              <li>What outcome you are seeking.</li>
              <li>Any screenshots or documents that support your complaint.</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Never share passwords, OTPs or full card details with anyone, including our staff.
            </p>
            <Button asChild className="mt-6 min-h-11">
              <Link to="/contact">Go to contact channels</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section labelledBy="escalation-title">
        <SectionHeading
          id="escalation-title"
          title="Escalation path"
          body="Work through the levels in order. Each level has a defined owner."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <li key={stage.title} className="rounded-xl border border-border p-6">
              <span className="num inline-grid size-8 place-items-center rounded-full bg-accent text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold">{stage.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{stage.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
          {org.regulatoryNote}. Complaints relating to a loan's sanction, terms, servicing or
          recovery are the responsibility of the participating lender that issued it.
        </p>
      </Section>
    </PublicShell>
  );
}

function Row({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="mt-1 font-medium">{detail}</dd>
    </div>
  );
}
