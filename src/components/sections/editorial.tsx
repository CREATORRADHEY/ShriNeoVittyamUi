import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/sections/reveal";

/* Shared editorial language, matching the homepage direction.
   Same typography, spacing rhythm, palette and motion primitive. */

export function SectionLabel({
  children,
  tone = "primary",
}: {
  children: ReactNode;
  tone?: "primary" | "inverse";
}) {
  return (
    <p
      className={cn("label-micro", tone === "primary" ? "text-primary" : "text-ink-foreground/70")}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------- editorial page hero */

export function EditorialHero({
  eyebrow,
  title,
  body,
  actions,
  note,
  image,
  panels,
  figure,
  titleId = "page-hero-title",
}: {
  eyebrow: string;
  title: string;
  body: string;
  actions?: ReactNode;
  note?: string;
  image?: { src: string; alt: string };
  /** Small interface layers that overlap the photograph, as on the homepage. */
  panels?: ReactNode;
  /** Used instead of a photograph when a diagram tells the story better. */
  figure?: ReactNode;
  titleId?: string;
}) {
  return (
    <section aria-labelledby={titleId} className="relative overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-full w-[52%] bg-surface" />
        <div className="absolute top-[-6rem] right-[6%] size-[26rem] rounded-full border border-brand-100" />
        <div className="absolute top-[8rem] right-[28%] size-[34rem] rounded-full border border-brand-100/70" />
        <div className="absolute inset-y-0 left-[48%] hidden w-px bg-border lg:block" />
      </div>

      <div className="container-page relative grid gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-20">
        <Reveal>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1
            id={titleId}
            className="editorial mt-5 max-w-[18ch] text-[clamp(2.25rem,5.2vw,3.75rem)] leading-[1.04] tracking-tight text-balance"
          >
            {title}
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg text-muted-foreground">{body}</p>
          {actions ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
          ) : null}
          {note ? <p className="mt-6 max-w-[46ch] text-sm text-muted-foreground">{note}</p> : null}
        </Reveal>

        <Reveal delay={90} className="relative min-w-0">
          <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
            {image ? (
              <div className="overflow-hidden rounded-[22px] border border-border bg-surface">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="eager"
                  className="aspect-[4/5] size-full object-cover object-top"
                />
              </div>
            ) : null}
            {figure ? (
              <div className="rounded-[22px] border border-border bg-card p-5 shadow-[var(--shadow-panel)] md:p-7">
                {figure}
              </div>
            ) : null}
            {panels}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------- floating interface panel */

export function HeroPanel({
  label,
  meta,
  children,
  align = "right",
  overlap = true,
  tone = "card",
}: {
  label: string;
  meta?: string;
  children: ReactNode;
  align?: "left" | "right";
  overlap?: boolean;
  tone?: "card" | "surface";
}) {
  return (
    <div
      className={cn(
        "relative z-10 w-[min(100%,20rem)] rounded-xl border border-border p-4",
        tone === "card" ? "bg-card shadow-[var(--shadow-panel)]" : "bg-surface",
        align === "right" ? "ml-auto sm:-mr-6" : "sm:-ml-6",
        overlap ? "-mt-24" : "mt-3",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="label-micro text-muted-foreground">{label}</p>
        {meta ? <p className="label-micro text-muted-foreground">{meta}</p> : null}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------ statement band */

export function StatementBand({
  label,
  title,
  body,
  children,
  id = "statement-title",
}: {
  label: string;
  title: string;
  body?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Reveal>
          <SectionLabel tone="inverse">{label}</SectionLabel>
          <h2
            id={id}
            className="editorial mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.08] tracking-tight text-balance"
          >
            {title}
          </h2>
          {body ? (
            <p className="mt-5 max-w-[46ch] text-base text-ink-foreground/80">{body}</p>
          ) : null}
        </Reveal>
        {children ? (
          <Reveal delay={80} className="min-w-0">
            {children}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ numbered ledger */

export function NumberedLedger({
  items,
  columns = 1,
}: {
  items: { title: string; body: string; meta?: string }[];
  columns?: 1 | 2;
}) {
  return (
    <ol
      className={cn(
        "divide-y divide-border border-y border-border",
        columns === 2 && "md:columns-2 md:gap-12 md:divide-y-0 md:border-y-0",
      )}
    >
      {items.map((item, i) => (
        <li
          key={item.title}
          className={cn(
            "grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-6 md:grid-cols-[3.5rem_minmax(0,1fr)]",
            columns === 2 && "md:break-inside-avoid md:border-t md:border-border",
          )}
        >
          <span className="num pt-0.5 text-sm font-semibold text-primary">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-base font-semibold">{item.title}</h3>
              {item.meta ? (
                <span className="label-micro text-muted-foreground">{item.meta}</span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- photo band */

export function PhotoNarrative({
  label,
  title,
  body,
  image,
  side = "left",
  points,
  tone = "warm",
}: {
  label: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
  side?: "left" | "right";
  points?: string[];
  tone?: "warm" | "surface" | "default";
}) {
  return (
    <section
      className={cn(
        "border-y border-border py-14 md:py-20",
        tone === "warm" && "bg-surface-warm",
        tone === "surface" && "bg-surface",
        tone === "default" && "bg-background",
      )}
    >
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal className={cn("min-w-0", side === "right" && "lg:order-2")}>
          <div className="overflow-hidden rounded-[22px] border border-border bg-card">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="aspect-[5/4] size-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={80} className={cn("min-w-0", side === "right" && "lg:order-1")}>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="editorial mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] tracking-tight text-balance">
            {title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">{body}</p>
          {points?.length ? (
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-sm">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="min-w-0 text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
