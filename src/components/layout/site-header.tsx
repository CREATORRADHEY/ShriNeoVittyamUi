import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/shrineo-logo.png.asset.json";
import { products } from "@/config/products";
import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const productKeys: Record<string, string> = {
  personal: "nav.personal",
  business: "nav.business",
  home: "nav.home",
  mortgage: "nav.mortgage",
  sachet: "nav.sachet",
};

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const mainLinks = [
    { to: "/how-it-works", label: "How it works" },
    { to: "/compare-offers", label: "Compare offers" },
    { to: "/for-agents", label: t("nav.forAgents") },
    { to: "/trust-center", label: t("nav.trust") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;


  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav aria-label="Primary" className="container-page">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:grid-cols-[auto_1fr_auto]">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <img
              src={logo.url}
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 object-contain"
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-base font-semibold tracking-tight">
                ShriNeo Capital
              </span>
              <span className="truncate text-[11px] text-muted-foreground">Financial Services</span>
            </span>
            <span className="sr-only">— home</span>
          </Link>

          <ul className="hidden items-center justify-center gap-1 lg:flex">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium text-foreground hover:bg-muted">
                  {t("nav.loans")}
                  <ChevronDown aria-hidden className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {products.map((product) => (
                    <DropdownMenuItem key={product.slug} asChild>
                      <Link to={product.path} className="flex items-center justify-between gap-3">
                        <span>{t(productKeys[product.slug]!, product.name)}</span>
                        {product.phase2 ? (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                            {t("common.comingSoon")}
                          </span>
                        ) : null}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem asChild>
                    <Link to="/loans" className="font-medium text-primary">
                      All loan products
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {mainLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeProps={{ className: "bg-muted text-foreground" }}
                  className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-2">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link to="/auth/signin">{t("nav.login")}</Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/auth/signup">{t("nav.apply")}</Link>
            </Button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              onClick={() => setOpen((v) => !v)}
              className="inline-grid size-11 place-items-center rounded-md border border-border lg:hidden"
            >
              {open ? (
                <X aria-hidden className="size-5" />
              ) : (
                <Menu aria-hidden className="size-5" />
              )}
            </button>
          </div>
        </div>

        {open ? (
          <div id="mobile-menu" className="border-t border-border py-4 lg:hidden">
            <p className="px-1 pb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {t("nav.loans")}
            </p>
            <ul className="mb-3 grid gap-1">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    to={product.path}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center justify-between rounded-md px-3 text-base hover:bg-muted"
                  >
                    {t(productKeys[product.slug]!, product.name)}
                    {product.phase2 ? (
                      <span className="text-xs text-muted-foreground">
                        {t("common.comingSoon")}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="grid gap-1 border-t border-border pt-3">
              {mainLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-md px-3 text-base hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <LanguageSwitcher />
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" className="min-h-11">
                  <Link to="/auth/signin" onClick={() => setOpen(false)}>
                    {t("nav.login")}
                  </Link>
                </Button>
                <Button asChild className="min-h-11">
                  <Link to="/auth/signup" onClick={() => setOpen(false)}>
                    {t("nav.apply")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
