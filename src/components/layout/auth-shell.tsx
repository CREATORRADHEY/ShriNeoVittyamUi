import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import logo from "@/assets/shrineo-logo.png";
import { org } from "@/config/org";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <header className="border-b border-border bg-background">
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <img src={logo} alt="ShriNeo Capital logo" width={36} height={36} className="size-9 object-contain" />
            <span className="truncate text-base font-semibold">ShriNeo Capital</span>
            <span className="sr-only">— home</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main id="main" className="flex flex-1 items-start justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">{footer}</div>
          <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0" />
            {org.roleStatement}
          </p>
        </div>
      </main>
    </div>
  );
}
