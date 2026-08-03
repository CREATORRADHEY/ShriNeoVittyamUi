import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n";
import { homeContent } from "@/content/home-content";
import { cn } from "@/lib/utils";

/**
 * Homepage FAQ — categories and items imported verbatim from the approved
 * landing reference (faqEyebrow / faqTitle / faqCats / faq): three categories,
 * six questions each. One answer open at a time; first item of the selected
 * category opens by default.
 */
export function HomeFaq() {
  const { language } = useI18n();
  const content = homeContent(language);
  const [cat, setCat] = useState(0);
  const [open, setOpen] = useState<string | null>("0-0");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectCategory = (index: number) => {
    setCat(index);
    setOpen(`${index}-0`);
  };

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = content.faqCats.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    selectCategory(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={content.faqEyebrow}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {content.faqCats.map((label, index) => {
          const active = index === cat;
          return (
            <button
              key={label}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`faq-tab-${index}`}
              aria-selected={active}
              aria-controls={`faq-panel-${index}`}
              tabIndex={active ? 0 : -1}
              onClick={() => selectCategory(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center rounded-[8px] border px-4 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-primary hover:bg-brand-50",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`faq-panel-${cat}`}
        aria-labelledby={`faq-tab-${cat}`}
        className="mt-6 divide-y divide-border border-t border-b border-border"
      >
        {content.faq[cat]!.map((item, index) => {
          const key = `${cat}-${index}`;
          const isOpen = open === key;
          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${key}`}
                  id={`faq-question-${key}`}
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="flex w-full min-h-11 items-start justify-between gap-4 py-4 text-left text-base font-medium transition-colors duration-150 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span className="min-w-0">{item.q}</span>
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "mt-0.5 size-5 shrink-0 text-primary transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)]",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
              </h3>
              <div
                id={`faq-answer-${key}`}
                role="region"
                aria-labelledby={`faq-question-${key}`}
                hidden={!isOpen}
                className="faq-answer"
              >
                <p className="max-w-[68ch] pb-5 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
