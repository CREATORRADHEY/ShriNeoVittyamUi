import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/shrineo-logo.png";
import { products } from "@/config/products";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { HeaderMenuProvider, useHeaderMenu } from "./header-menu";
import { HeaderThemeProvider, HeaderThemeSwitch, useHeaderTheme } from "./header-theme";
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
    <HeaderThemeProvider>
      <HeaderMenuProvider>
        <HeaderInner />
      </HeaderMenuProvider>
    </HeaderThemeProvider>
  );
}

function HeaderInner() {
  const { t } = useI18n();
  const { closeNow } = useHeaderMenu();
  const { theme } = useHeaderTheme();
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

  // Primary navigation order — Website Change Requirements v1.0 §5 override.
  // For Borrowers / For Agents / For Lenders are in the footer SOLUTIONS column only.
  const mainLinks = [
    { to: "/trust-center", label: t("nav.trust") },
    { to: "/about", label: t("nav.about") },
  ] as const;

  const logoHeight = condensed ? "44px" : "clamp(54px, 4.4vw, 68px)";

  return (
    <header
      data-hdr-theme={theme}
      data-condensed={condensed}
      data-menu-open={open}
      className="font-display sticky top-0 z-[1000]"
    >
      <nav aria-label="Primary" className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
        <div
          className="flex items-center justify-between gap-3 transition-[min-height] duration-[250ms] ease-out"
          style={{ minHeight: condensed ? 60 : 76 }}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src={logo}
              alt="ShriNeo Capital"
              style={{ height: logoHeight, transition: "height .25s ease-out" }}
              className="w-auto shrink-0 object-contain"
            />


            <span className="flex flex-col leading-tight">
              <span className="whitespace-nowrap text-[18px] md:text-[20px] font-semibold tracking-tight text-[color:var(--hdr-fg)]">
                ShriNeo Capital
              </span>
              {condensed ? null : (
                <span className="hidden whitespace-nowrap text-[10.5px] md:text-[11.5px] text-[color:var(--hdr-fg-soft)] sm:block">
                  Bharat Ka Digital Lending Partner
                </span>
              )}
            </span>
            <span className="sr-only">— home</span>
          </Link>

          <ul className="hidden flex-1 items-center justify-center gap-0 xl:flex">
            <li>
              <LoansMenu />
            </li>
            {mainLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`${triggerClass} whitespace-nowrap`}
                  onPointerEnter={closeNow}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <HeaderThemeSwitch />
            <NeedHelpPill />
            <div onPointerDownCapture={closeNow} className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Link
              to="/auth/signin"
              className="inline-flex min-h-11 items-center rounded-md border border-[color:var(--hdr-hairline)] px-3 text-sm font-medium text-[color:var(--hdr-fg)] transition-[background-color,border-color] duration-150 hover:bg-[color:var(--hdr-fg)]/10 focus-visible:ring-2 focus-visible:ring-[color:var(--hdr-fg)] focus-visible:outline-none hidden sm:inline-flex"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/auth/signup"
              className="cta-saffron group inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[10px] px-4 text-sm font-semibold transition-[background-color,transform] duration-150 hover:-translate-y-px active:translate-y-px focus-visible:ring-2 focus-visible:ring-[#0051AE] focus-visible:outline-none"
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
              className="inline-grid size-11 place-items-center rounded-md border border-[color:var(--hdr-hairline)] text-[color:var(--hdr-fg)] xl:hidden"
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
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-[color:var(--hdr-hairline)] py-4 pb-[max(1rem,env(safe-area-inset-bottom))] xl:hidden"
          >
            <button
              type="button"
              aria-expanded={loansOpen}
              aria-controls="mobile-loans"
              onClick={() => setLoansOpen((v) => !v)}
              className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-base font-medium text-[color:var(--hdr-fg)] hover:bg-[color:var(--hdr-fg)]/10"
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
                    className="flex min-h-11 items-center justify-between rounded-md px-3 text-base text-[color:var(--hdr-fg)] hover:bg-[color:var(--hdr-fg)]/10"
                  >
                    {t(productKeys[product.slug]!, product.name)}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="grid gap-1 border-t border-[color:var(--hdr-hairline)] pt-3">
              {mainLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-md px-3 text-base text-[color:var(--hdr-fg)] hover:bg-[color:var(--hdr-fg)]/10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 px-1 pb-2 text-xs font-semibold tracking-wide text-[color:var(--hdr-fg-soft)] uppercase">
              {t("menu.services")}
            </p>
            <ul className="grid gap-1 border-t border-[color:var(--hdr-hairline)] pt-3">
              {supportOptions.map((option) => (
                <li key={option.key}>
                  <Link
                    to={option.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center justify-between gap-3 rounded-md px-3 text-base text-[color:var(--hdr-fg)] hover:bg-[color:var(--hdr-fg)]/10"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <option.icon aria-hidden className="size-4 stroke-[1.5]" />
                      {t(`menu.help.${option.key}`)}
                    </span>
                    <span className="num text-xs text-[color:var(--hdr-fg-soft)]">
                      {t(option.meta)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-2">
              <LanguageSwitcher className="[&>button]:w-full [&>button]:justify-center" />
              <Link
                to="/auth/signin"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-center rounded-[10px] border border-[color:var(--hdr-hairline)] text-base font-medium text-[color:var(--hdr-fg)]"
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
