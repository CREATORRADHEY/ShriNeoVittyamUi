import { useEffect, useState, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import neoGreetingSrc from "@/assets/neo-greeting.png";

interface NeoGreetingCardProps {
  onAccept: () => void;
  onDismiss: () => void;
  visible: boolean;
  dockOffset: number;
}

export function NeoGreetingCard({
  onAccept,
  onDismiss,
  visible,
  dockOffset,
}: NeoGreetingCardProps) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [showText, setShowText] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id: any;
    if (visible) {
      setMounted(true);
      // Stagger text entry by 60ms to let the character appear first
      id = setTimeout(() => {
        setShowText(true);
        cardRef.current?.focus();
      }, 60);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onDismiss();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        if (id) clearTimeout(id);
      };
    } else {
      setMounted(false);
      setShowText(false);
      return () => {};
    }
  }, [visible, onDismiss]);

  if (!visible) return null;

  const cardBottom = 16 + dockOffset;

  return (
    <div
      ref={cardRef}
      tabIndex={-1}
      role="dialog"
      aria-label="Neo greeting card"
      style={{ bottom: `${cardBottom}px` }}
      className={cn(
        /* Greeting card: fixed on bottom right (moved closer to edge: right-2/sm:right-3) */
        "fixed right-2 z-40 w-[calc(100vw-24px)] max-w-[390px] rounded-[18px] border border-[#DDE7F5] bg-white p-5 shadow-[0_20px_55px_-24px_rgba(0,43,152,0.32)] sm:right-3 sm:w-[430px] sm:max-w-none sm:p-6",
        "origin-bottom-right transition-all duration-[280ms] ease-[cubic-bezier(0.2,0,0,1)]",
        mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-3.5 scale-[0.985] opacity-0",
      )}
    >
      {/* Close button (Dismiss control with 44px touch target) */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss Neo greeting"
        className="absolute right-1 top-1 z-10 flex h-11 w-11 items-center justify-center rounded-full text-[#5B657D] transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]"
      >
        <X aria-hidden className="size-4 shrink-0" />
      </button>

      {/* Main card grid: 2-column layout */}
      <div className="flex gap-4 sm:gap-6">
        {/* Left Side: Waving Neo character (escapes/overflows card top) */}
        <div className="relative w-[110px] shrink-0 sm:w-[130px]">
          {/* Restrained blue atmospheric treatment behind Neo */}
          <div
            aria-hidden="true"
            className="absolute bottom-[-20px] left-1/2 h-[160px] w-[140px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#E6F1FB]/80 to-transparent blur-[20px]"
          />

          <img
            src={neoGreetingSrc}
            alt=""
            className={cn(
              /* Neo is approximately 180-205px tall, extends past top of card */
              "absolute bottom-[-20px] left-[-10px] h-[195px] w-[150px] max-w-none object-contain",
              "transition-transform duration-[350ms] ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transformOrigin: "bottom center" }}
          />
        </div>

        {/* Right Side: Greeting Copy & CTA (staggered entrance) */}
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col justify-center pt-2",
            "transition-all duration-[240ms] ease-out",
            showText ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          <h3 className="font-display text-lg font-bold leading-tight text-[#002B98] sm:text-xl">
            {t("neo.greeting.title", "Hi! I’m Neo 👋")}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[#5B657D] sm:text-[14px]">
            {t(
              "neo.greeting.body",
              "I can help you understand loans, documents, costs and the application process",
            )}
          </p>

          <button
            type="button"
            onClick={onAccept}
            aria-label="Talk to Neo"
            className="group mt-4 inline-flex h-10 items-center justify-center gap-1.5 rounded-[10px] bg-[#002B98] px-4 text-center text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#001A5C] hover:shadow-md active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]"
          >
            {t("neo.greeting.cta", "Talk to Neo")}
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
