import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  FileWarning,
  LifeBuoy,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
} from "lucide-react";
import { products } from "@/config/products";
import { formatINR } from "@/lib/format";
import { useI18n } from "@/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useDisclosureBehaviour, useHeaderMenu, usePresence } from "./header-menu";

const productKeys: Record<string, string> = {
  personal: "nav.personal",
  business: "nav.business",
  home: "nav.home",
  mortgage: "nav.mortgage",
  sachet: "nav.sachet",
};

const productBlurbs: Record<string, string> = {
  personal: "menu.loans.personal",
  business: "menu.loans.business",
  home: "menu.loans.home",
  mortgage: "menu.loans.mortgage",
  sachet: "menu.loans.sachet",
};

export const triggerClass =
  "nav-underline relative inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium text-white/90 transition-colors duration-150 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none";

/* ------------------------------------------------------------------ loans */

export function LoansMenu() {
  const { t } = useI18n();
  const { open, openNow, openSoon, closeSoon, closeNow, cancelClose, toggle } = useHeaderMenu();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = open === "loans";
  const present = usePresence(isOpen);
  const [box, setBox] = useState<{ left: number; top: number; width: number } | null>(null);

  // The panel is portalled to <body> so an animated ancestor (the route
  // transition wrapper) can never become its containing block — that is what
  // detached it from the trigger after scrolling. It is measured from the live
  // trigger rect, re-measured on resize / header height change, and closed
  // deliberately once meaningful scrolling begins.
  useEffect(() => {
    if (!isOpen) return;
    const measure = () => {
      const rect = rootRef.current?.getBoundingClientRect();
      const header = rootRef.current?.closest("header")?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(900, window.innerWidth - 48);
      const left = Math.min(
        Math.max(24, rect.left + rect.width / 2 - width / 2),
        window.innerWidth - 24 - width,
      );
      setBox({ left, top: header ? header.bottom : rect.bottom, width });
    };
    measure();

    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 24) {
        closeNow();
        return;
      }
      measure();
    };

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });

    let observer: ResizeObserver | undefined;
    const header = rootRef.current?.closest("header");
    if (header && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(header);
    }

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [isOpen, closeNow]);


  useDisclosureBehaviour({ isOpen, close: closeNow, rootRef, triggerRef, panelRef });

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") openSoon("loans");
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") closeSoon();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="loans-panel"
        data-open={isOpen}
        onClick={() => toggle("loans")}
        onFocus={() => {
          if (isOpen) cancelClose();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openNow("loans");
            requestAnimationFrame(() => {
              rootRef.current?.querySelector<HTMLAnchorElement>("a[data-menu-item]")?.focus();
            });
          }
        }}
        className={cn(triggerClass, "data-[open=true]:text-white")}
      >
        {t("nav.loans")}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {present && typeof document !== "undefined"
        ? createPortal(
        <div
          ref={panelRef}
          id="loans-panel"
          data-state={isOpen ? "open" : "closed"}
          className="hdr-panel fixed z-[1100] pt-2"
          style={{ left: box?.left ?? 0, top: box?.top ?? 0, width: box?.width ?? 0 }}
          onPointerEnter={cancelClose}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") closeSoon();
          }}
        >
          <div className="w-full overflow-hidden rounded-[14px] border border-border bg-surface-warm text-foreground shadow-[var(--shadow-panel)]">
            <div className="grid gap-0 md:grid-cols-[1.55fr_1fr]">
              <div className="grid gap-1 p-4 sm:grid-cols-2 md:p-5">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    to={product.path}
                    data-menu-item
                    onClick={closeNow}
                    className="group flex min-h-11 items-start gap-3 rounded-[10px] border border-transparent p-3 transition-[background-color,border-color] duration-150 hover:border-brand-200 hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <product.icon
                      aria-hidden
                      className="mt-0.5 size-5 shrink-0 stroke-[1.4] text-primary transition-transform duration-150 group-hover:translate-x-[1px]"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">
                          {t(productKeys[product.slug]!, product.name)}
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="size-4 shrink-0 text-primary opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                        />
                      </span>
                      <span className="num mt-1 block text-xs text-muted-foreground">
                        {formatINR(product.range.min, { compact: true })} –{" "}
                        {formatINR(product.range.max, { compact: true })}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                        {product.phase2
                          ? t("common.comingSoon")
                          : t(productBlurbs[product.slug]!, product.summary)}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-border bg-card p-5 md:border-t-0 md:border-l">
                <p className="text-sm font-semibold">{t("elig.title")}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {t("menu.loans.actionBody")}
                </p>
                <a
                  href="#check-eligibility"
                  onClick={closeNow}
                  className="cta-saffron font-display mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-semibold transition-colors duration-150"
                >
                  {t("menu.loans.action")}
                  <ArrowRight aria-hidden className="size-4" />
                </a>
                <Link
                  to="/for-borrowers"
                  onClick={closeNow}
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-border text-sm font-medium text-primary transition-colors duration-150 hover:bg-brand-50"
                >
                  {t("menu.help.neo")}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>,
            document.body,
          )
        : null}

    </div>
  );
}

/* -------------------------------------------------------------- need help */

export const supportOptions = [
  { key: "neo", icon: MessageCircle, to: "/for-borrowers", meta: "menu.help.neoHours" },
  { key: "whatsapp", icon: MessageSquare, to: "/contact", meta: "menu.help.hours" },
  { key: "call", icon: Phone, to: "/contact", meta: "menu.help.hours" },
  { key: "helpCenter", icon: BookOpen, to: "/how-it-works", meta: "menu.help.helpCenterMeta" },
  {
    key: "grievance",
    icon: FileWarning,
    to: "/grievance-redressal",
    meta: "menu.help.grievanceMeta",
  },
  { key: "contact", icon: Mail, to: "/contact", meta: "menu.help.contactMeta" },
] as const;

const ROTATING = ["menu.help.label", "menu.help.rotate1", "menu.help.rotate2"];

export function NeedHelpPill() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const { open, openSoon, closeSoon, closeNow, cancelClose, toggle } = useHeaderMenu();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isOpen = open === "help";
  const present = usePresence(isOpen);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useDisclosureBehaviour({ isOpen, close: closeNow, rootRef, triggerRef });

  useEffect(() => {
    if (reduced || paused || isOpen) {
      setIndex(0);
      return;
    }
    const timer = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 5000);
    return () => clearInterval(timer);
  }, [reduced, paused, isOpen]);

  const labelKey = reduced ? ROTATING[0]! : ROTATING[index]!;

  return (
    <div
      ref={rootRef}
      className="relative hidden lg:block"
      onPointerEnter={(e) => {
        setPaused(true);
        if (e.pointerType === "mouse") openSoon("help");
      }}
      onPointerLeave={(e) => {
        setPaused(false);
        if (e.pointerType === "mouse") closeSoon();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="help-panel"
        data-open={isOpen}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onClick={() => toggle("help")}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-[#cfe0ff] transition-[background-color,border-color,color] duration-150 hover:border-white/35 hover:bg-white/12 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        <LifeBuoy aria-hidden className="size-4 stroke-[1.5]" />
        <span className="relative block h-5 min-w-[86px] overflow-hidden text-left">
          <span key={labelKey} className={reduced ? "block leading-5" : "hdr-rotate block leading-5"}>
            {t(labelKey)}
          </span>
        </span>
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform duration-150", isOpen && "rotate-180")}
        />
      </button>

      {present ? (
        <div
          id="help-panel"
          data-state={isOpen ? "open" : "closed"}
          className="hdr-panel absolute top-full right-0 z-50 pt-2"
          onPointerEnter={cancelClose}
        >
          <div className="w-[min(420px,calc(100vw-2rem))] rounded-[14px] border border-border bg-surface-warm p-3 text-foreground shadow-[var(--shadow-panel)]">
            <p className="px-2 pt-1 pb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {t("menu.help.title")}
            </p>
            <ul className="grid gap-1 sm:grid-cols-2">
              {supportOptions.map((option) => (
                <li key={option.key}>
                  <Link
                    to={option.to}
                    onClick={closeNow}
                    className="group flex min-h-11 items-start gap-2.5 rounded-[10px] border border-transparent p-2.5 transition-[background-color,border-color] duration-150 hover:border-brand-200 hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <option.icon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 stroke-[1.5] text-primary"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-1.5">
                        <span className="text-sm font-medium">{t(`menu.help.${option.key}`)}</span>
                        <ArrowRight
                          aria-hidden
                          className="size-3.5 shrink-0 text-primary opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                        />
                      </span>
                      <span className="num mt-0.5 block text-[11px] text-muted-foreground">
                        {t(option.meta)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
