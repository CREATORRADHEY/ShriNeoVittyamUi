import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FlaskConical, Monitor, Smartphone, Tablet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { org } from "@/config/org";
import { cn } from "@/lib/utils";
import {
  ACCOUNT_LABEL,
  ACCOUNT_SCENARIOS,
  APPLICATION_LABEL,
  APPLICATION_SCENARIOS,
  DATA_LABEL,
  DATA_SCENARIOS,
  ROLES,
  ROLE_HOME,
  ROLE_LABEL,
  usePrototype,
  type AccountScenario,
  type DataScenario,
  type Role,
} from "@/prototype/state";

export const Route = createFileRoute("/prototype/")({
  head: () => ({
    meta: [
      { title: "ShriNeo Prototype Navigator — internal design review" },
      {
        name: "description",
        content:
          "Development-only navigator for reviewing every ShriNeo Capital portal, scenario and negative state without authentication.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "ShriNeo Prototype Navigator" },
      {
        property: "og:description",
        content: "Internal design-review navigator for ShriNeo Capital portals and states.",
      },
    ],
  }),
  component: PrototypeNavigator,
});

type Preset = {
  label: string;
  account?: AccountScenario;
  data?: DataScenario;
  to?: string;
};

const ROLE_PRESETS: Record<Role, Preset[]> = {
  borrower: [
    { label: "Default dashboard", account: "active", data: "populated" },
    { label: "Onboarding (new user)", account: "new", data: "empty" },
    { label: "Populated account", account: "active", data: "populated" },
    { label: "Empty account", account: "partial", data: "empty" },
    { label: "Warning states", account: "action-required", data: "partial" },
    { label: "Error states", account: "active", data: "failed" },
    { label: "Restricted states", account: "restricted", data: "populated" },
  ],
  agent: [
    { label: "Default dashboard", account: "active", data: "populated" },
    { label: "Onboarding (verification pending)", account: "new", data: "empty" },
    { label: "Populated pipeline", account: "active", data: "populated" },
    { label: "Empty pipeline", account: "partial", data: "empty" },
    { label: "Warning states (clawback)", account: "action-required", data: "partial" },
    { label: "Error states", account: "active", data: "failed" },
    { label: "Restricted states", account: "suspended", data: "populated" },
  ],
  lender: [
    { label: "Default dashboard", account: "active", data: "populated" },
    { label: "Onboarding (integration pending)", account: "new", data: "empty" },
    { label: "Populated pipeline", account: "active", data: "populated" },
    { label: "Empty pipeline", account: "partial", data: "empty" },
    { label: "Warning states (limit, NPA)", account: "action-required", data: "stale" },
    { label: "Error states (API offline)", account: "active", data: "failed" },
    { label: "Restricted role", account: "restricted", data: "populated" },
  ],
  admin: [
    { label: "Default dashboard", account: "active", data: "populated" },
    { label: "Onboarding (fresh tenant)", account: "new", data: "empty" },
    { label: "Populated platform", account: "active", data: "populated" },
    { label: "No recent data", account: "partial", data: "empty" },
    { label: "Warning states (fraud spike)", account: "action-required", data: "partial" },
    { label: "Incident states", account: "active", data: "failed" },
    { label: "Restricted permissions", account: "restricted", data: "populated" },
  ],
};

const GLOBAL_PAGES = [
  { label: "404 — Page not found", to: "/404" },
  { label: "401 — Session ended", to: "/errors/401" },
  { label: "403 — Permission restricted", to: "/errors/403" },
  { label: "410 — Link expired", to: "/errors/410" },
  { label: "429 — Too many attempts", to: "/errors/429" },
  { label: "500 — Platform error", to: "/errors/500" },
  { label: "503 — Service unavailable", to: "/errors/503" },
  { label: "Scheduled maintenance", to: "/errors/maintenance" },
  { label: "Offline", to: "/errors/offline" },
  { label: "Unsupported browser", to: "/errors/unsupported-browser" },
  { label: "Script failure", to: "/errors/script-failure" },
  { label: "Security restriction", to: "/errors/security" },
  { label: "Account suspended", to: "/errors/suspended" },
  { label: "Account deactivated", to: "/errors/deactivated" },
  { label: "No matching results", to: "/errors/no-results" },
];

const BORROWER_FLOW = [
  { label: "Apply for a loan", to: "/app/borrower/apply" },
  { label: "Application — 5 steps", to: "/app/borrower/application" },
  { label: "Application tracking", to: "/app/borrower/applications" },
  { label: "Offer comparison states", to: "/app/borrower/offers" },
  { label: "Document upload states", to: "/app/borrower/documents" },
  { label: "Payment states", to: "/app/borrower/payments" },
];

function PrototypeNavigator() {
  const p = usePrototype();

  return (
    <main className="min-h-dvh bg-surface pb-28">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning-surface px-2.5 py-1 text-xs font-semibold text-warning">
          <FlaskConical aria-hidden className="size-3.5" />
          Development only — not part of the production product
        </span>
        <h1 className="editorial mt-4 text-3xl text-foreground sm:text-4xl">
          ShriNeo Prototype Navigator
        </h1>
        <p className="mt-3 max-w-[70ch] text-base text-muted-foreground">
          Enter any portal directly, switch account and data scenarios, and inspect every designed
          state without authentication. Nothing here connects to a live service — all figures are
          illustrative demonstration data.
        </p>

        <section aria-labelledby="roles-title" className="mt-10">
          <h2 id="roles-title" className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Role portals
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {ROLES.map((role) => (
              <article key={role} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="editorial text-xl text-foreground">{ROLE_LABEL[role]}</h3>
                  <Button asChild size="sm" onClick={() => p.set("role", role)}>
                    <Link to={ROLE_HOME[role]}>
                      Enter dashboard
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </Button>
                </div>
                <ul className="mt-4 grid gap-1.5">
                  {ROLE_PRESETS[role].map((preset) => (
                    <li key={preset.label}>
                      <Link
                        to={ROLE_HOME[role]}
                        onClick={() => {
                          p.set("role", role);
                          if (preset.account) p.set("account", preset.account);
                          if (preset.data) p.set("data", preset.data);
                        }}
                        className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:bg-accent"
                      >
                        <span>Preview {preset.label.toLowerCase()}</span>
                        <ArrowRight aria-hidden className="size-3.5 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(
                    [
                      { d: "desktop", icon: Monitor },
                      { d: "tablet", icon: Tablet },
                      { d: "mobile", icon: Smartphone },
                    ] as const
                  ).map(({ d, icon: Icon }) => (
                    <Button
                      key={d}
                      asChild
                      size="sm"
                      variant={p.device === d ? "secondary" : "outline"}
                      onClick={() => {
                        p.set("role", role);
                        p.set("device", d);
                      }}
                    >
                      <Link to={ROLE_HOME[role]}>
                        <Icon aria-hidden className="size-4" />
                        {d === "desktop" ? "Desktop layout" : d === "tablet" ? "Tablet" : "Mobile layout"}
                      </Link>
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="scenario-title" className="mt-12">
          <h2 id="scenario-title" className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Scenario switcher
          </h2>
          <div className="mt-4 grid gap-5 rounded-xl border border-border bg-card p-5 md:grid-cols-3">
            <ScenarioColumn
              legend="Account scenario"
              options={ACCOUNT_SCENARIOS}
              labels={ACCOUNT_LABEL}
              value={p.account}
              onChange={(v) => p.set("account", v)}
            />
            <ScenarioColumn
              legend="Data scenario"
              options={DATA_SCENARIOS}
              labels={DATA_LABEL}
              value={p.data}
              onChange={(v) => p.set("data", v)}
            />
            <ScenarioColumn
              legend="Application scenario"
              options={APPLICATION_SCENARIOS}
              labels={APPLICATION_LABEL}
              value={p.application}
              onChange={(v) => p.set("application", v)}
            />
          </div>
        </section>

        <section aria-labelledby="flow-title" className="mt-12 grid gap-6 md:grid-cols-2">
          <div>
            <h2 id="flow-title" className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Borrower journey
            </h2>
            <ul className="mt-4 grid gap-1.5">
              {BORROWER_FLOW.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => p.set("role", "borrower")}
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:border-primary"
                  >
                    {item.label}
                    <ArrowRight aria-hidden className="size-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Global negative pages
            </h2>
            <ul className="mt-4 grid gap-1.5">
              {GLOBAL_PAGES.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:border-primary"
                  >
                    {item.label}
                    <ArrowRight aria-hidden className="size-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="neo-qa-title" className="mt-12">
          <h2 id="neo-qa-title" className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Neo Assistant States (Design QA)
          </h2>
          <div className="mt-4 grid gap-5 rounded-xl border border-border bg-card p-5 md:grid-cols-3">
            <div>
              <p className="label-micro text-muted-foreground">Primary View States</p>
              <div className="mt-2 flex flex-col gap-1.5">
                {[
                  { label: "State 1: Compact Launcher", state: "minimized" },
                  { label: "State 2: Greeting Onboarding", state: "greeting" },
                  { label: "State 3: Full Welcoming Panel", state: "open" }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("shrineo:neo-override", {
                          detail: { state: item.state, voiceState: "idle", messages: null }
                        })
                      );
                    }}
                    className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:bg-accent"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label-micro text-muted-foreground">Voice Search / Microphone States</p>
              <div className="mt-2 flex flex-col gap-1.5">
                {[
                  { label: "Voice State: Listening…", voiceState: "listening" },
                  { label: "Voice State: Understanding…", voiceState: "understanding" },
                  { label: "Voice State: Permission Denied", voiceState: "permission_denied" },
                  { label: "Voice State: Device Error", voiceState: "error" },
                  { label: "Voice State: System Offline", voiceState: "offline" }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("shrineo:neo-override", {
                          detail: { state: "open", voiceState: item.voiceState }
                        })
                      );
                    }}
                    className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:bg-accent"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-3.5 text-[#E8A020]" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label-micro text-muted-foreground">Interactive Overrides</p>
              <div className="mt-2 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("shrineo:neo-override", {
                        detail: {
                          state: "open",
                          voiceState: "idle",
                          messages: [
                            { id: "qa1", from: "neo", text: "Welcome! Click any of the quick actions below to see how I help you." },
                            { id: "qa2", from: "you", text: "What is SNV Trust Score?" },
                            { id: "qa3", from: "neo", text: "SNV Trust Score is our proprietary indicator of creditworthiness based on transactional bank aggregator data rather than traditional bureau details alone." }
                          ]
                        }
                      })
                    );
                  }}
                  className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:bg-accent"
                >
                  <span>Active Conversation State</span>
                  <ArrowRight className="size-3.5 text-muted-foreground" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("shrineo:neo-override", {
                        detail: {
                          state: "open",
                          voiceState: "idle",
                          messages: [
                            { id: "m1", from: "neo", text: "How can I help you understand loans, documents, or rates today?" },
                            { id: "m2", from: "you", text: "Tell me about Sachet loans." },
                            { id: "m3", from: "neo", text: "Sachet loans are micro-credit options from ₹10,000 to ₹1 Lakh with flexible short-term repayment terms designed for small micro-enterprises." },
                            { id: "m4", from: "you", text: "What documents do I need to prepare?" },
                            { id: "m5", from: "neo", text: "Generally just identity eKYC (Aadhaar/PAN) and 6 months bank statement uploads. Some lenders request shop license proof." },
                            { id: "m6", from: "you", text: "How fast is disbursal?" },
                            { id: "m7", from: "neo", text: "Verified disbursal typically takes under 2 hours once matching offers are signed and e-mandate setup is complete." },
                            { id: "m8", from: "you", text: "What if I repay early?" },
                            { id: "m9", from: "neo", text: "Most participating lenders offer zero-fee prepayment on micro sachet loans, but confirm terms in the Key Fact Statement first." }
                          ]
                        }
                      })
                    );
                  }}
                  className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:bg-accent"
                >
                  <span>Long Conversation Scroll State</span>
                  <ArrowRight className="size-3.5 text-muted-foreground" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.localStorage.removeItem("shrineo.neoGreetingSeen");
                    window.dispatchEvent(
                      new CustomEvent("shrineo:neo-override", {
                        detail: { state: "greeting", voiceState: "idle" }
                      })
                    );
                  }}
                  className="flex items-center justify-between rounded-md border border-[#E9E1D2] bg-[#FAF8F5] px-3 py-2 text-sm font-semibold text-[#806126] transition-colors hover:border-[#C19842] hover:bg-[#FAF8F5]"
                >
                  <span>Reset & Show Onboarding Greeting</span>
                  <ArrowRight className="size-3.5 text-[#806126]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-12 border-t border-border pt-5 text-xs text-muted-foreground">
          {org.brandLine} · {org.roleStatement} · Prototype build: no authentication, no live lender
          data, no payment execution.
        </p>
      </div>
    </main>
  );
}

function ScenarioColumn<T extends string>({
  legend,
  options,
  labels,
  value,
  onChange,
}: {
  legend: string;
  options: readonly T[];
  labels: Record<T, string>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="label-micro text-muted-foreground">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-md border px-2.5 py-1.5 text-xs transition-colors",
              value === o
                ? "border-primary bg-accent font-semibold text-accent-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground",
            )}
          >
            {labels[o]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
