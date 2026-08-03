import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/shrineo-logo.png.asset.json";
import { products } from "@/config/products";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { HeaderMenuProvider, useHeaderMenu } from "./header-menu";
import { LoansMenu, NeedHelpPill, supportOptions, triggerClass } from "./header-panels";

const productKeys: Record<string, string> = {
  personal: "nav.personal",
  business: "nav.business",
  home: "nav.home",
  mortgage: "nav.mortgage",
  sachet: "nav.sachet",
};

export function SiteHeader() {
  return (
    <HeaderMenuProvider>
      <HeaderInner />
    </HeaderMenuProvider>
  );
}

function HeaderInner() {
  const { t } = useI18n();
  const { closeNow } = useHeaderMenu();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const mainLinks = [
    { to: "/for-agents", label: t("nav.forAgents") },
    { to: "/about", label: t("nav.about") },
    { to: "/trust-center", label: t("nav.trust") },
  ] as const;

  return (
    <header
      data-condensed={condensed}
      className="font-display sticky top-0 z-[1000] bg-transparent transition-[background-color,box-shadow,backdrop-filter] duration-200 data-[condensed=true]:border-b data-[condensed=true]:border-white/12 data-[condensed=true]:bg-[#00134a]/80 data-[condensed=true]:shadow-[0_1px_12px_rgba(0,8,60,0.35)] data-[condensed=true]:backdrop-blur-md"
    >

      <nav aria-label="Primary" className="container-page">
        <div
          className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 transition-[padding] duration-200 lg:grid-cols-[auto_1fr_auto] ${
            condensed ? "py-2" : "py-3.5"
          }`}
        >
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <img
              src={logo.url}
              alt=""
              width={36}
              height={36}
              className={`shrink-0 object-contain transition-[width,height] duration-200 ${
                condensed ? "size-7" : "size-9"
              }`}
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-base font-semibold tracking-tight text-white">
                ShriNeo Capital
              </span>
              {condensed ? null : (
                <span className="hidden truncate text-[11px] text-[#b9c6e8] sm:block">
                  Financial Services
                </span>
              )}
            </span>
            <span className="sr-only">— home</span>
          </Link>

          <ul className="hidden items-center justify-center gap-1 lg:flex">
            <li>
              <LoansMenu />
            </li>
            {mainLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={triggerClass} onPointerEnter={closeNow}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-2">
            <NeedHelpPill />
            <div
              onPointerDownCapture={closeNow}
              className="hidden md:block [&>div]:border-white/20 [&>div]:bg-transparent [&_svg]:text-[#c8d5f0] [&_button]:text-white/80 [&_button[aria-pressed=true]]:bg-white [&_button[aria-pressed=true]]:text-[#001a5c]"
            >
              <LanguageSwitcher />
            </div>
            <Link
              to="/auth/signin"
              className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-3 text-sm font-medium text-white/90 transition-[background-color,border-color,color] duration-150 hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none max-md:hidden"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/auth/signup"
              className="cta-saffron group inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[10px] px-4 text-sm font-semibold transition-[background-color,transform] duration-150 hover:-translate-y-px active:translate-y-px focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              {t("nav.apply")}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              onClick={() => {
                closeNow();
                setOpen((v) => !v);
              }}
              className="inline-grid size-11 place-items-center rounded-md border border-white/25 text-white lg:hidden"
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
          <div
            id="mobile-menu"
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/15 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <button
              type="button"
              aria-expanded={loansOpen}
              aria-controls="mobile-loans"
              onClick={() => setLoansOpen((v) => !v)}
              className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-base font-medium text-white hover:bg-white/10"
            >
              {t("nav.loans")}
              <ChevronDown
                aria-hidden
                className={`size-5 transition-transform duration-200 ${loansOpen ? "rotate-180" : ""}`}
              />
            </button>
            <ul id="mobile-loans" hidden={!loansOpen} className="mb-3 grid gap-1">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    to={product.path}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center justify-between rounded-md px-3 text-base text-white hover:bg-white/10"
                  >
                    {t(productKeys[product.slug]!, product.name)}
                    {product.phase2 ? (
                      <span className="text-xs text-[#b9c6e8]">{t("common.comingSoon")}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="grid gap-1 border-t border-white/15 pt-3">
              {mainLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-md px-3 text-base text-white hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 px-1 pb-2 text-xs font-semibold tracking-wide text-[#b9c6e8] uppercase">
              {t("menu.services")}
            </p>
            <ul className="grid gap-1 border-t border-white/15 pt-3">
              {supportOptions.map((option) => (
                <li key={option.key}>
                  <Link
                    to={option.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center justify-between gap-3 rounded-md px-3 text-base text-white hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <option.icon aria-hidden className="size-4 stroke-[1.5] text-[#c8d5f0]" />
                      {t(`menu.help.${option.key}`)}
                    </span>
                    <span className="num text-xs text-[#b9c6e8]">{t(option.meta)}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-2">
              <div className="[&>div]:w-full [&>div]:justify-center [&>div]:border-white/20 [&>div]:bg-transparent [&_svg]:text-[#c8d5f0] [&_button]:text-white/80 [&_button[aria-pressed=true]]:bg-white [&_button[aria-pressed=true]]:text-[#001a5c]">
                <LanguageSwitcher />
              </div>
              <Link
                to="/auth/signin"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-center rounded-[10px] border border-white/25 text-base font-medium text-white"
              >
                {t("nav.login")}
              </Link>
              <Link
                to="/auth/signup"
                onClick={() => setOpen(false)}
                className="cta-saffron flex min-h-11 items-center justify-center rounded-[10px] text-base font-semibold"
              >
                {t("nav.apply")}
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
