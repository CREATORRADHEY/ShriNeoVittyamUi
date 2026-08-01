import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "default",
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "ink";
  id?: string;
  labelledBy?: string;
}) {
  const tones = {
    default: "bg-background",
    surface: "bg-surface",
    ink: "bg-ink text-ink-foreground",
  } as const;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("border-b border-border py-16 md:py-24", tones[tone], className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">{children}</p>
  );
}

export function SectionHeading({
  id,
  title,
  body,
  align = "start",
}: {
  id?: string;
  title: string;
  body?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <h2 id={id} className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight">
        {title}
      </h2>
      {body ? <p className="mt-3 text-base text-muted-foreground">{body}</p> : null}
    </div>
  );
}

/** Status is never communicated by colour alone: icon/label always included. */
export function StatusPill({
  tone,
  children,
}: {
  tone: "info" | "success" | "warning" | "error" | "neutral";
  children: ReactNode;
}) {
  const tones = {
    info: "bg-info-surface text-primary border-brand-200",
    success: "bg-success-surface text-success border-success/30",
    warning: "bg-warning-surface text-warning border-warning/30",
    error: "bg-error-surface text-destructive border-destructive/30",
    neutral: "bg-muted text-muted-foreground border-border",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Disclosure({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground">
      <span className="sr-only">Disclosure: </span>
      {children}
    </p>
  );
}
