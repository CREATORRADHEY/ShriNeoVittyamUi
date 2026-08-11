import { useEffect, useState } from "react";
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

export function NeoGreetingCard({ onAccept, onDismiss, visible, dockOffset }: NeoGreetingCardProps) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      const id = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(id);
    } else {
      setMounted(false);
    }
  }, [visible]);

  if (!visible) return null;

  const cardBottom = 72 + dockOffset;

  return (
    <div
      style={{ bottom: `${cardBottom}px` }}
      className={cn(
        "fixed right-4 z-40 w-[calc(100vw-32px)] max-w-[390px] rounded-[18px] border border-[#DDE7F5] bg-white p-5 pr-6 shadow-[0_20px_55px_-24px_rgba(0,43,152,0.32)] sm:right-6 sm:w-[420px] sm:max-w-none sm:p-6",
        "origin-bottom-right transition-all duration-[300ms] ease-[cubic-bezier(0.2,0,0,1)]",
        mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.985] opacity-0"
      )}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss Neo greeting"
        className="absolute top-3.5 right-3.5 flex size-8 items-center justify-center rounded-full text-[#5B657D] transition-colors hover:bg-neutral-100 hover:text-neutral-900"
      >
        <X aria-hidden className="size-4 shrink-0" />
      </button>

      {/* Main layout: left avatar (escapes top), right copy */}
      <div className="flex gap-4 sm:gap-5">
        {/* Waving Neo character (escapes top boundary) */}
        <div className="relative w-[110px] shrink-0 sm:w-[130px]">
          <img
            src={neoGreetingSrc}
            alt=""
            className={cn(
              "absolute left-0 bottom-[-20px] h-[210px] w-auto max-w-none object-contain",
              "transition-transform duration-[350ms] ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transformOrigin: "bottom center" }}
          />
        </div>

        {/* Copy & CTA */}
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col justify-center pt-2",
            "transition-all duration-[300ms] delay-[60ms] ease-out",
            mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          <h3 className="editorial text-lg font-bold text-[#002B98] leading-tight sm:text-xl">
            {t("neo.greeting.title", "Hi! I’m Neo 👋")}
          </h3>
          <p className="mt-2 text-xs leading-[1.5] text-[#5B657D] sm:text-sm">
            {t(
              "neo.greeting.body",
              "I can help you understand loans, documents, costs and the application process"
            )}
          </p>

          <button
            type="button"
            onClick={onAccept}
            aria-label="Talk to Neo"
            className="group mt-4 inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-[#002B98] px-4 py-2.5 text-center text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#001A5C] hover:shadow-md active:translate-y-px"
          >
            {t("neo.greeting.cta", "Talk to Neo")}
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
