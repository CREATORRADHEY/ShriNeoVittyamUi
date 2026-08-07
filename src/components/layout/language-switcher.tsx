import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { LANGUAGES, useI18n, type Language } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Website Change Requirements v1.0 §6 — one dropdown button replaces the
 * English / हिन्दी segmented control. Language switching preserves the current
 * route and any in-page progress.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const current = LANGUAGES.find((item) => item.value === language) ?? LANGUAGES[0];

  // When English is active the switch label appears in an alternate script, so
  // a user who cannot read English can still find the control.
  const switchLabel = language === "en" ? "भाषा बदलें" : "Choose language";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(value: Language) {
    setLanguage(value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={switchLabel}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-[#ECE7DD] bg-white px-[13px] text-sm font-medium text-[#002B98] transition-colors duration-150 hover:border-[#C9D9EE] focus-visible:ring-2 focus-visible:ring-[#0051AE] focus-visible:outline-none"
      >
        <Globe aria-hidden className="size-[15px] shrink-0 stroke-[1.5] text-[#0051AE]" />
        <span className="hidden lg:inline">{switchLabel}</span>
        <span className="num text-[11px] text-[#5B657D]">{current.code}</span>
        <ChevronDown
          aria-hidden
          className={cn("size-[10px] transition-transform duration-150", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={switchLabel}
          className="hdr-panel absolute top-[calc(100%+8px)] right-0 z-[1200] w-[176px] rounded-[10px] border border-[#ECE7DD] bg-white p-[6px] shadow-[0_18px_40px_-20px_rgba(0,43,152,.28)]"
          data-state="open"
        >
          {LANGUAGES.map((item) => (
            <button
              key={item.value}
              type="button"
              role="option"
              lang={item.locale}
              aria-selected={item.value === language}
              onClick={() => choose(item.value)}
              className={cn(
                "flex min-h-11 w-full items-center justify-between gap-3 rounded-[7px] px-3 text-left text-sm font-medium text-[#002B98] transition-colors duration-150 hover:bg-[#E6F1FB] focus-visible:bg-[#E6F1FB] focus-visible:outline-none",
                item.value === language && "bg-[#E6F1FB]",
              )}
            >
              <span>{item.label}</span>
              <span className="num text-[11px] text-[#5B657D]">{item.code}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
