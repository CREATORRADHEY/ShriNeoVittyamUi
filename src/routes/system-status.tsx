import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleCheck, CircleAlert, Wrench } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { PageHero } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/design-system/section";

export const Route = createFileRoute("/system-status")({
  head: () => ({
    meta: [
      { title: "System status | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Current service state for the ShriNeo Capital website, borrower portal, agent portal, lender portal and document services, with incident and maintenance history.",
      },
      { property: "og:title", content: "System status — ShriNeo Capital" },
      { property: "og:description", content: "Service state, incidents and planned maintenance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/system-status" },
    ],
    links: [{ rel: "canonical", href: "/system-status" }],
  }),
  component: SystemStatusPage,
});

type State = "operational" | "maintenance" | "degraded";

const services: { name: string; detail: string; state: State }[] = [
  { name: "Marketing website", detail: "Public pages and content", state: "operational" },
  { name: "Borrower portal", detail: "Applications, offers and documents", state: "operational" },
  { name: "Agent portal", detail: "Cases, commissions and ledger", state: "operational" },
  { name: "Lender portal", detail: "Application queue and decisions", state: "operational" },
  { name: "Document services", detail: "Upload, storage and secure access", state: "operational" },
  { name: "Notifications", detail: "One-time passwords and status alerts", state: "maintenance" },
];

const stateMeta: Record<State, { label: string; className: string; Icon: typeof CircleCheck }> = {
  operational: {
    label: "Operational",
    className: "bg-[#E7F3EA] text-[#1E6B3A] border-[#C9E4D2]",
    Icon: CircleCheck,
  },
  maintenance: {
    label: "Planned maintenance",
    className: "bg-[#FBEEDA] text-[#C9761A] border-[#F0DDBE]",
    Icon: Wrench,
  },
  degraded: {
    label: "Degraded",
    className: "bg-[#FBE7E7] text-[#A02121] border-[#F0C9C9]",
    Icon: CircleAlert,
  },
};

function SystemStatusPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Status"
        title="System status"
        body="Service state for every part of the platform. When an incident affects applications, offers or documents, it is published here with plain-language updates."
      />

      <Section labelledBy="current-title">
        <div className="mb-6 w-full rounded-t-xl border border-[#F0DDBE] bg-[#FBEEDA] px-4 py-2.5 text-center font-mono text-[11px] font-semibold tracking-[0.12em] text-[#C9761A] uppercase">
          Demonstration data — automated monitoring is not connected yet
        </div>
        <SectionHeading
          id="current-title"
          title="Current service state"
          body="States shown are illustrative of the categories that will be reported once monitoring is live."
        />
        <ul className="mt-8 grid gap-3">
          {services.map((service) => {
            const meta = stateMeta[service.state];
            return (
              <li
                key={service.name}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div>
                  <p className="text-base font-semibold tracking-tight">{service.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{service.detail}</p>
                </div>
                <span
                  className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-xs font-semibold ${meta.className}`}
                >
                  <meta.Icon aria-hidden className="size-3.5" />
                  {meta.label}
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="history-title">
        <SectionHeading
          id="history-title"
          title="Incident history"
          body="Each incident is recorded with a start time, affected services, impact, updates and a resolution note."
        />
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <p className="text-base text-muted-foreground">
            No incidents have been recorded. Once monitoring is connected, resolved incidents remain
            listed here for 12 months.
          </p>
        </div>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { term: "Investigating", desc: "The issue is confirmed and being diagnosed" },
            { term: "Identified", desc: "The cause is known and a fix is being applied" },
            { term: "Resolved", desc: "Service is restored and being monitored" },
          ].map((item) => (
            <div key={item.term} className="rounded-lg border border-border p-4">
              <dt className="text-sm font-semibold tracking-tight">{item.term}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section labelledBy="report-title">
        <SectionHeading
          id="report-title"
          title="Something not working"
          body="If a service looks healthy here but is failing for you, tell us so we can check."
        />
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/help-center"
            className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Help Center
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center rounded-lg border border-border-strong px-5 text-sm font-semibold"
          >
            Contact support
          </Link>
        </div>
      </Section>
    </PublicShell>
  );
}
