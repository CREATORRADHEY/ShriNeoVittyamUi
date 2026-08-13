import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow } from "@/components/design-system/section";

/* ---------------------------------------------------------------- page hero */

export function PageHero({
  eyebrow,
  title,
  body,
  actions,
  aside,
  tone = "surface",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "surface" | "default";
}) {
  return (
    <section
      aria-labelledby="page-hero-title"
      className={cn("border-b border-border", tone === "surface" ? "bg-surface" : "bg-background")}
    >
      <div
        className={cn(
          "container-page grid gap-10 py-12 md:py-16",
          aside && "lg:grid-cols-[1.05fr_1fr] lg:items-center",
        )}
      >
        <div className={cn(!aside && "max-w-3xl")}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1
            id="page-hero-title"
            className="editorial text-[clamp(2rem,5vw,3.25rem)] tracking-tight text-balance"
          >
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{body}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {aside ? <div className="min-w-0">{aside}</div> : null}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- media split */

export function MediaSplit({
  eyebrow,
  title,
  body,
  points,
  media,
  mediaSide = "right",
  footnote,
  action,
  id,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  points?: ReactNode[];
  media: ReactNode;
  mediaSide?: "left" | "right";
  footnote?: string;
  action?: ReactNode;
  id?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-b border-border bg-background py-14 md:py-20"
    >
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn("min-w-0", mediaSide === "left" && "lg:order-2")}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2
            id={headingId}
            className="text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-tight text-balance"
          >
            {title}
          </h2>
          {body ? <p className="mt-4 text-base text-muted-foreground">{body}</p> : null}
          {points?.length ? (
            <ul className="mt-6 space-y-3">
              {points.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="min-w-0">{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {action ? <div className="mt-7 flex flex-wrap gap-3">{action}</div> : null}
          {footnote ? <p className="mt-6 text-xs text-muted-foreground">{footnote}</p> : null}
        </div>
        <div className={cn("min-w-0", mediaSide === "left" && "lg:order-1")}>{media}</div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- figure card */

export function FigureCard({
  children,
  caption,
  tone = "surface",
  className,
}: {
  children: ReactNode;
  caption?: string;
  tone?: "surface" | "card" | "plain";
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "rounded-xl border border-border p-5 md:p-7",
        tone === "surface" && "bg-surface",
        tone === "card" && "bg-card shadow-[var(--shadow-raised)]",
        tone === "plain" && "border-transparent p-0",
        className,
      )}
    >
      {children}
      {caption ? (
        <figcaption className="mt-4 text-sm text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/* ---------------------------------------------------------------- trust strip */

export function TrustStrip({
  items,
  tone = "default",
}: {
  items: { icon: React.ComponentType<{ className?: string }>; label: string; body?: string }[];
  tone?: "default" | "surface";
}) {
  return (
    <section
      aria-label="What ShriNeo guarantees in every application"
      className={cn("border-b border-border", tone === "surface" ? "bg-surface" : "bg-background")}
    >
      <ul className="container-page grid gap-x-8 gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="flex gap-3">
            <item.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">{item.label}</p>
              {item.body ? <p className="mt-1 text-sm text-muted-foreground">{item.body}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------ process timeline */

export type JourneyStep = {
  title: string;
  body: string;
  actor: "you" | "lender" | "shrineo";
};

const actorLabel = {
  you: "You complete this",
  lender: "Participating lender acts",
  shrineo: "ShriNeo processes",
} as const;

const actorTone = {
  you: "border-primary/35 bg-accent",
  lender: "border-success/35 bg-success-surface",
  shrineo: "border-border bg-surface",
} as const;

export function ProcessTimeline({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={cn(
            "relative rounded-xl border p-5 transition-colors duration-150",
            actorTone[step.actor],
          )}
        >
          <div className="flex items-center gap-3">
            <span className="num grid size-8 shrink-0 place-items-center rounded-full border border-border bg-card text-sm font-semibold text-primary">
              {i + 1}
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              {actorLabel[step.actor]}
            </span>
          </div>
          <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ UI preview */

export function UiPreview({
  label = "Product preview — demonstration data",
  title,
  children,
  className,
}: {
  label?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-raised)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
          </span>
          {title ? <p className="truncate text-xs font-medium">{title}</p> : null}
        </div>
        <p className="shrink-0 text-[11px] text-muted-foreground">{label}</p>
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------- use cases */

export function UseCaseCards({
  cases,
}: {
  cases: { persona: string; need: string; steps: string[] }[];
}) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {cases.map((item) => (
        <li
          key={item.persona}
          className="flex flex-col rounded-xl border border-border bg-card p-6"
        >
          <span className="w-fit rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            Example journey
          </span>
          <h3 className="mt-4 text-base font-semibold">{item.persona}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.need}</p>
          <ol className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            {item.steps.map((step, i) => (
              <li key={step} className="flex gap-2.5">
                <span className="num text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------------- FAQ group */

export type FaqGroupData = { group: string; items: { q: string; a: string }[] };

export function FaqGroups({ groups }: { groups: FaqGroupData[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.group}>
          <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">
            {group.group}
          </h3>
          <Accordion type="single" collapsible className="mt-2">
            {group.items.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------- dark CTA */

export function DarkCta({
  title,
  body,
  primary,
  secondary,
  note,
}: {
  title: string;
  body?: string;
  primary: { to: LinkProps["to"]; label: string };
  secondary?: { to: LinkProps["to"]; label: string };
  note?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-ink text-ink-foreground">
      <div className="container-page py-16 md:py-20">
        <div className="max-w-3xl">
          <h2
            id="cta-title"
            className="editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight text-balance"
          >
            {title}
          </h2>
          {body ? <p className="mt-4 text-base text-ink-foreground/80">{body}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="min-h-11">
              <Link to={primary.to as any}>
                {primary.label}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
            {secondary ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-11 border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
              >
                <Link to={secondary.to as any}>{secondary.label}</Link>
              </Button>
            ) : null}
          </div>
          {note ? <p className="mt-6 text-sm text-ink-foreground/70">{note}</p> : null}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- related guides */

export function RelatedGuides({
  links,
  title = "Related guides",
}: {
  links: { to: LinkProps["to"]; label: string; body: string }[];
  title?: string;
}) {
  return (
    <section aria-labelledby="guides-title" className="border-b border-border bg-surface py-14">
      <div className="container-page">
        <h2 id="guides-title" className="text-lg font-semibold">
          {title}
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <li key={String(link.to)}>
              <Link
                to={link.to as any}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-150 hover:border-primary"
              >
                <span className="text-sm font-semibold">{link.label}</span>
                <span className="mt-2 text-sm text-muted-foreground">{link.body}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read guide
                  <ArrowRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- regulatory disclosure */

export function DisclosureBlock({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-border bg-info-surface p-4 text-sm">
      <p className="font-semibold">Important</p>
      <p className="mt-1 text-muted-foreground">{children}</p>
    </aside>
  );
}
