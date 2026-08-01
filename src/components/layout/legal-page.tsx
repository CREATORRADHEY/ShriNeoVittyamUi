import type { ReactNode } from "react";
import { PublicShell } from "./public-shell";

export function LegalPage({
  title,
  intro,
  updatedNote = "This document is maintained by SHRINEO VITTIYAM PRIVATE LIMITED and is reviewed as our services and obligations change.",
  children,
}: {
  title: string;
  intro: string;
  updatedNote?: string;
  children: ReactNode;
}) {
  return (
    <PublicShell>
      <div className="border-b border-border bg-surface">
        <div className="container-page py-14">
          <h1 className="editorial max-w-3xl text-[clamp(2rem,4.5vw,2.75rem)] tracking-tight text-balance">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        </div>
      </div>
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <div className="prose-legal max-w-3xl space-y-8">{children}</div>
        <aside className="h-fit rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
          <h2 className="text-sm font-semibold text-foreground">About this document</h2>
          <p className="mt-2">{updatedNote}</p>
        </aside>
      </div>
    </PublicShell>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{heading}</h2>
      <div className="mt-3 space-y-3 text-base text-muted-foreground">{children}</div>
    </section>
  );
}
