/**
 * Development-only prototype toolbar. Never rendered in a production build.
 */
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, FlaskConical, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ACCOUNT_LABEL,
  ACCOUNT_SCENARIOS,
  APPLICATION_LABEL,
  APPLICATION_SCENARIOS,
  DATA_LABEL,
  DATA_SCENARIOS,
  DEVICES,
  DEVICE_LABEL,
  ROLES,
  ROLE_HOME,
  ROLE_LABEL,
  isPrototypeMode,
  usePrototype,
} from "@/prototype/state";

function Group<T extends string>({
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
    <fieldset className="min-w-0">
      <legend className="mb-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-md border px-2 py-1 text-[11px] transition-colors",
              value === o
                ? "border-primary bg-accent font-semibold text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {labels[o]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function PrototypeToolbar() {
  const p = usePrototype();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!isPrototypeMode) return null;
  if (pathname === "/prototype") return null;

  return (
    <div
      data-prototype-toolbar
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-strong bg-card/98 shadow-[var(--shadow-overlay)] backdrop-blur print:hidden"
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-3 py-2">
        <span className="flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning-surface px-2 py-1 text-[11px] font-semibold text-warning">
          <FlaskConical aria-hidden className="size-3.5" />
          Prototype
        </span>
        <span className="hidden truncate text-xs text-muted-foreground sm:block">
          {ROLE_LABEL[p.role]} · {ACCOUNT_LABEL[p.account]} · {DATA_LABEL[p.data]} ·{" "}
          {APPLICATION_LABEL[p.application]} · {DEVICE_LABEL[p.device]}
        </span>
        <div className="ml-auto flex items-center gap-1">
          <Button asChild variant="ghost" size="sm">
            <Link to="/prototype">Navigator</Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={p.reset} aria-label="Reset prototype scenario">
            <RotateCcw aria-hidden className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => p.set("toolbarOpen", !p.toolbarOpen)}
            aria-expanded={p.toolbarOpen}
          >
            {p.toolbarOpen ? (
              <ChevronDown aria-hidden className="size-4" />
            ) : (
              <ChevronUp aria-hidden className="size-4" />
            )}
            <span className="hidden sm:inline">{p.toolbarOpen ? "Hide" : "Show"} controls</span>
          </Button>
        </div>
      </div>

      {p.toolbarOpen ? (
        <div className="mx-auto grid max-w-[1600px] gap-3 border-t border-border px-3 py-3 md:grid-cols-2 xl:grid-cols-5">
          <Group
            legend="Role"
            options={ROLES}
            labels={ROLE_LABEL}
            value={p.role}
            onChange={(v) => p.set("role", v)}
          />
          <Group
            legend="Account scenario"
            options={ACCOUNT_SCENARIOS}
            labels={ACCOUNT_LABEL}
            value={p.account}
            onChange={(v) => p.set("account", v)}
          />
          <Group
            legend="Data scenario"
            options={DATA_SCENARIOS}
            labels={DATA_LABEL}
            value={p.data}
            onChange={(v) => p.set("data", v)}
          />
          <Group
            legend="Application scenario"
            options={APPLICATION_SCENARIOS}
            labels={APPLICATION_LABEL}
            value={p.application}
            onChange={(v) => p.set("application", v)}
          />
          <div className="space-y-2">
            <Group
              legend="Device"
              options={DEVICES}
              labels={DEVICE_LABEL}
              value={p.device}
              onChange={(v) => p.set("device", v)}
            />
            <Button asChild size="sm" variant="secondary" className="w-full">
              <Link to={ROLE_HOME[p.role]}>Open {ROLE_LABEL[p.role]} dashboard</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
