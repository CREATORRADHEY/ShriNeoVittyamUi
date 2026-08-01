import { useEffect, useState } from "react";
import { Button } from "./primitives";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#platform" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-colors " +
        (scrolled ? "border-border" : "border-transparent")
      }
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 md:grid-cols-[auto_1fr_auto]"
      >
        <a href="#top" className="text-xl font-semibold tracking-tight">
          STRATOS
        </a>

        <ul className="hidden items-center justify-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button variant="ink" className="hidden rounded-full sm:inline-flex">
            Launch Console
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-border md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-11 rounded-xl px-3 py-3 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button variant="ink" className="mt-3 w-full rounded-full">
            Launch Console
          </Button>
        </div>
      )}
    </header>
  );
}
