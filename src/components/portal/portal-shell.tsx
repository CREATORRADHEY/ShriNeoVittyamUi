import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BadgeIndianRupee,
  BarChart3,
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  ClipboardList,
  CreditCard,
  Database,
  FileSearch,
  FileText,
  Gauge,
  GraduationCap,
  Layers,
  LifeBuoy,
  ListChecks,
  MessagesSquare,
  Menu,
  PieChart,
  Plug,
  Scale,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Table2,
  User,
  Users,
  Wallet,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { org } from "@/config/org";
import { cn } from "@/lib/utils";
import { DEVICE_WIDTH, ROLE_LABEL, usePrototype, type Role } from "@/prototype/state";

export type NavItem = { label: string; to: string; icon: ComponentType<{ className?: string }>; primary?: boolean };

export const PORTAL_NAV: Record<Role, NavItem[]> = {
  borrower: [
    { label: "Dashboard", to: "/app/borrower", icon: Gauge, primary: true },
    { label: "Apply for a loan", to: "/app/borrower/apply", icon: Sparkles, primary: true },
    { label: "My applications", to: "/app/borrower/applications", icon: ClipboardList, primary: true },
    { label: "My loans", to: "/app/borrower/loans", icon: Wallet, primary: true },
    { label: "Payments", to: "/app/borrower/payments", icon: CreditCard },
    { label: "Documents", to: "/app/borrower/documents", icon: FileText },
    { label: "Scores", to: "/app/borrower/scores", icon: BarChart3 },
    { label: "Find an agent", to: "/app/borrower/agents", icon: Users },
    { label: "Messages", to: "/app/borrower/messages", icon: MessagesSquare },
    { label: "Notifications", to: "/app/borrower/notifications", icon: Bell },
    { label: "Support", to: "/app/borrower/support", icon: LifeBuoy },
    { label: "Profile", to: "/app/borrower/profile", icon: User },
  ],
  agent: [
    { label: "Dashboard", to: "/app/agent", icon: Gauge, primary: true },
    { label: "Leads", to: "/app/agent/leads", icon: ListChecks, primary: true },
    { label: "My files", to: "/app/agent/files", icon: Briefcase, primary: true },
    { label: "Start application", to: "/app/agent/start", icon: Sparkles, primary: true },
    { label: "Commissions", to: "/app/agent/commissions", icon: BadgeIndianRupee },
    { label: "Analytics", to: "/app/agent/analytics", icon: PieChart },
    { label: "Training", to: "/app/agent/training", icon: GraduationCap },
    { label: "Resources", to: "/app/agent/resources", icon: Bookmark },
    { label: "Notifications", to: "/app/agent/notifications", icon: Bell },
    { label: "Support", to: "/app/agent/support", icon: LifeBuoy },
    { label: "Profile", to: "/app/agent/profile", icon: User },
  ],
  lender: [
    { label: "Dashboard", to: "/app/lender", icon: Gauge, primary: true },
    { label: "Credit Workbench", to: "/app/lender/workbench", icon: Table2, primary: true },
    { label: "Manual Reviews", to: "/app/lender/reviews", icon: FileSearch, primary: true },
    { label: "Portfolio", to: "/app/lender/portfolio", icon: Layers },
    { label: "Billing & Ledgers", to: "/app/lender/billing", icon: BadgeIndianRupee },
    { label: "Risk", to: "/app/lender/risk", icon: Activity },
    { label: "API Status", to: "/app/lender/api-status", icon: Plug },
    { label: "Team", to: "/app/lender/team", icon: Users },
    { label: "Audit", to: "/app/lender/audit", icon: Scale },
    { label: "Settings", to: "/app/lender/settings", icon: Settings },
  ],
  admin: [
    { label: "Executive Dashboard", to: "/app/admin", icon: Gauge, primary: true },
    { label: "Borrowers", to: "/app/admin/borrowers", icon: Users, primary: true },
    { label: "Agents", to: "/app/admin/agents", icon: Briefcase, primary: true },
    { label: "Lenders", to: "/app/admin/lenders", icon: Building2 },
    { label: "Loan Oversight", to: "/app/admin/loans", icon: ClipboardList },
    { label: "Fraud", to: "/app/admin/fraud", icon: ShieldAlert, primary: true },
    { label: "SNV Trust Score", to: "/app/admin/trust-score", icon: BarChart3 },
    { label: "Reports", to: "/app/admin/reports", icon: PieChart },
    { label: "Consent Records", to: "/app/admin/consent", icon: FileText },
    { label: "Audit", to: "/app/admin/audit", icon: Scale },
    { label: "CMS", to: "/app/admin/cms", icon: Database },
    { label: "System Status", to: "/app/admin/system", icon: Activity },
    { label: "Settings", to: "/app/admin/settings", icon: Settings },
  ],
};

const DENSITY: Record<Role, { pad: string; gap: string; maxW: string; label: string }> = {
  borrower: { pad: "px-5 py-8 sm:px-8 sm:py-10", gap: "space-y-8", maxW: "max-w-5xl", label: "Low–medium density" },
  agent: { pad: "px-5 py-6 sm:px-7 sm:py-8", gap: "space-y-6", maxW: "max-w-6xl", label: "Medium density" },
  lender: { pad: "px-4 py-5 sm:px-6 sm:py-6", gap: "space-y-5", maxW: "max-w-none", label: "High density" },
  admin: { pad: "px-4 py-4 sm:px-5 sm:py-5", gap: "space-y-4", maxW: "max-w-none", label: "Very high density" },
};

function NavList({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const compact = role === "lender" || role === "admin";
  return (
    <nav aria-label={`${ROLE_LABEL[role]} portal`} className="flex flex-col gap-0.5">
      {PORTAL_NAV[role].map((item) => {
        const active = pathname === item.to;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-md text-sm transition-colors",
              compact ? "px-2.5 py-1.5" : "px-3 py-2",
              active
                ? "bg-accent font-semibold text-accent-foreground"
                : "text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <Icon aria-hidden className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function PortalShell({
  role,
  title,
  subtitle,
  actions,
  banner,
  children,
}: {
  role: Role;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  banner?: ReactNode;
  children: ReactNode;
}) {
  const { device } = usePrototype();
  const d = DENSITY[role];
  const framed = device !== "desktop";
  const primary = PORTAL_NAV[role].filter((i) => i.primary).slice(0, 4);

  const shell = (
    <div className={cn("flex min-h-dvh bg-background", framed && "min-h-[840px]")}>
      {/* desktop navigation */}
      <aside
        className={cn(
          "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-border bg-card lg:flex",
          role === "borrower" ? "w-64 p-4" : "w-60 p-3",
          framed && "lg:hidden",
        )}
      >
        <Link to="/" className="flex items-center gap-2 px-2 py-2">
          <span className="editorial text-base text-foreground">{org.brandName}</span>
        </Link>
        <p className="px-2 pb-3 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          {ROLE_LABEL[role]} portal
        </p>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavList role={role} />
        </div>
        <div className="mt-3 rounded-lg border border-border bg-surface p-3 text-xs text-muted-foreground">
          {d.label} · prototype data
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
          <div className={cn("flex items-center gap-3", role === "borrower" ? "px-5 py-4" : "px-4 py-3")}>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("min-h-11 min-w-11 lg:hidden", framed && "lg:inline-flex")} aria-label="Open navigation">
                  <Menu aria-hidden className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(18rem,calc(100vw-3rem))] overflow-y-auto p-4">
                <SheetTitle className="editorial text-base">{ROLE_LABEL[role]} portal</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate between sections of the {ROLE_LABEL[role].toLowerCase()} portal.
                </SheetDescription>
                <div className="mt-4">
                  <NavList role={role} />
                </div>
              </SheetContent>

            </Sheet>
            <div className="min-w-0 flex-1">
              <h1 className={cn("truncate font-semibold text-foreground", role === "borrower" ? "text-lg" : "text-base")}>
                {title}
              </h1>
              {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
            </div>
            {role === "lender" || role === "admin" ? (
              <div className="hidden items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-muted-foreground md:flex">
                <Search aria-hidden className="size-3.5" />
                Search files, IDs, partners
              </div>
            ) : null}
            {actions}
          </div>
          {banner ? <div className={cn("border-t border-border", role === "borrower" ? "px-5 py-3" : "px-4 py-2.5")}>{banner}</div> : null}
        </header>

        <main className={cn("flex-1", d.pad, "pb-24 lg:pb-10")}>
          <div className={cn("mx-auto w-full", d.maxW, d.gap)}>{children}</div>
        </main>

        {/* mobile primary navigation */}
        <nav
          aria-label="Primary"
          className={cn(
            "sticky bottom-0 z-20 grid grid-cols-4 border-t border-border bg-card lg:hidden",
            framed && "lg:grid",
          )}
        >
          {primary.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] text-muted-foreground [&.active]:text-primary"
                activeProps={{ className: "text-primary font-semibold" }}
                activeOptions={{ exact: true }}
              >
                <Icon aria-hidden className="size-5" />
                <span className="truncate">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );

  if (!framed) return shell;

  return (
    <div className="min-h-dvh bg-surface-strong p-4 sm:p-8">
      <p className="mx-auto mb-3 max-w-fit rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
        Prototype device preview · {device} ({DEVICE_WIDTH[device]})
      </p>
      <div
        className="mx-auto overflow-hidden rounded-2xl border border-border-strong bg-background shadow-[var(--shadow-panel)]"
        style={{ width: "100%", maxWidth: DEVICE_WIDTH[device] }}
      >
        {shell}
      </div>
    </div>
  );
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-border bg-card", className)}>
      {title ? (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
          </div>
          {actions}
        </header>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  );
}
