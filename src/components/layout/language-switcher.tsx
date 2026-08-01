import { useI18n, type Language } from "@/i18n";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const options: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
];

/** Language switching preserves the current route and any in-page progress. */
export function LanguageSwitcher({ size = "sm" }: { size?: "sm" | "lg" }) {
  const { language, setLanguage, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border bg-background p-1",
        size === "lg" && "gap-2 p-1.5",
      )}
    >
      <Globe aria-hidden className="ml-1 size-4 text-muted-foreground" />
      {options.map((option) => {
        const active = language === option.value;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={active}
            onClick={() => setLanguage(option.value)}
            className={cn(
              "min-h-9 rounded-sm px-3 text-sm font-medium transition-colors",
              size === "lg" && "min-h-11 px-5 text-base",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {option.label}
            {active ? <span className="sr-only"> (selected)</span> : null}
          </button>
        );
      })}
    </div>
  );
}
