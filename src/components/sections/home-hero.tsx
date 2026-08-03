import { Link } from "@tanstack/react-router";
import { ArrowRight, Mic, ShieldCheck } from "lucide-react";
import heroDesktopAsset from "@/assets/hero-shop-desktop.jpg.asset.json";
import heroMobileAsset from "@/assets/hero-shop-mobile.jpg.asset.json";
import { products } from "@/config/products";
import { formatINR } from "@/lib/format";

const heroDesktop = heroDesktopAsset.url;
const heroMobile = heroMobileAsset.url;

const PHOTO_ALT = "Shop owner standing at his kirana store counter, smartphone in hand.";

/**
 * Homepage hero — one static story on a full-bleed navy field.
 * No carousel, no form, no floating cards.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-navy relative isolate w-full overflow-hidden"
    >
      {/* Layer 1 + 2 — navy field with a one-time settling drift */}
      <div aria-hidden className="hero-field pointer-events-none absolute inset-0 -z-20" />

      {/* Layer 3 — the photograph, edge to edge on the right */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={heroDesktop}
          alt=""
          width={1537}
          height={1023}
          fetchPriority="high"
          decoding="async"
          className="hero-photo hero-photo-in absolute inset-y-0 right-0 hidden h-full w-[54%] object-cover object-[68%_center] md:block"
        />
        {/* Layer 4 — left-weighted grade for text contrast */}
        <div className="hero-grade absolute inset-0 hidden md:block" />
      </div>

      <div className="relative">
        <div className="mx-auto w-full max-w-[1320px] px-5 md:px-10 lg:px-14 xl:px-16">
          <div className="grid items-center gap-0 md:min-h-[clamp(620px,74vh,760px)] md:grid-cols-[minmax(0,47%)_minmax(0,53%)]">
            <div className="hero-in max-w-[680px] py-12 md:py-16">
              <p className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-white">
                <ShieldCheck aria-hidden className="hero-icon size-3.5 stroke-[1.6]" />
                RBI-aligned Lending Service Provider
              </p>

              <h1
                id="hero-title"
                className="font-display mt-6 max-w-[660px] text-[clamp(2.375rem,3.7vw,3.625rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-white"
              >
                <span className="block md:whitespace-nowrap">Your Dreams,</span>
                <span className="block md:whitespace-nowrap">Our Responsibility.</span>
              </h1>

              <p className="hero-on-navy font-display mt-5 max-w-[550px] text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.55]">
                Built for customers. Designed for agents.
                <br className="hidden md:inline" /> Supported by banks. Powered by trust.
              </p>

              <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/auth/signup"
                  className="cta-saffron font-display inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[10px] px-7 text-base font-semibold transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#001a5c] focus-visible:outline-none"
                >
                  Apply for a loan
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
                <Link
                  to="/for-borrowers"
                  className="font-display inline-flex min-h-[44px] items-center justify-center gap-2 text-base font-medium text-white underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:justify-start"
                >
                  <Mic aria-hidden className="hero-icon size-4 stroke-[1.5]" />
                  Ask Neo
                  <ArrowRight aria-hidden className="size-3.5" />
                </Link>
              </div>

              <p className="hero-on-navy mt-7 flex max-w-[46ch] items-start gap-2 text-sm leading-relaxed">
                <ShieldCheck aria-hidden className="hero-icon mt-0.5 size-4 shrink-0 stroke-[1.4]" />
                Direct bank-to-borrower transfer — ShriNeo never holds your funds.
              </p>
            </div>

            {/* Mobile: the photograph continues the same navy field below the copy */}
            <div className="relative -mx-5 md:hidden">
              <img
                src={heroMobile}
                alt={PHOTO_ALT}
                width={818}
                height={1023}
                fetchPriority="high"
                className="hero-photo-mobile hero-photo-in aspect-[4/5] w-full object-cover object-top"
              />
              <div
                aria-hidden
                className="hero-grade-mobile pointer-events-none absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One-click access to the five loan products, directly under the hero.
 * A navigation layer — not a tab bar, not a tray.
 */
export function ProductStrip() {
  return (
    <nav aria-label="Loan products" className="border-b border-border bg-surface-warm">
      <ul className="mx-auto grid w-full max-w-[1320px] px-5 md:px-10 lg:px-14 xl:px-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-border">
        {products.map((product, index) => (
          <li
            key={product.slug}
            className={
              index === products.length - 1 && products.length % 2 === 1
                ? "col-span-2 md:col-span-1"
                : undefined
            }
          >
            <Link
              to={product.path}
              className="group font-display flex min-h-[84px] w-full items-center gap-3 border-b border-border px-3 py-4 transition-colors duration-150 hover:bg-brand-50 md:border-b-0 lg:min-h-[96px] lg:px-5"
            >
              <product.icon aria-hidden className="size-5 shrink-0 stroke-[1.3] text-primary" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {product.name}
                </span>
                <span className="num mt-0.5 block text-xs text-muted-foreground">
                  {formatINR(product.range.min, { compact: true })} –{" "}
                  {formatINR(product.range.max, { compact: true })}
                </span>
              </span>
              <ArrowRight
                aria-hidden
                className="size-4 shrink-0 text-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
