import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, HelpCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/**
 * Overlay rules for ShriNeo Capital
 * --------------------------------------------------------------
 * Tooltip  — one-line definition of a term. Desktop hover/focus only.
 * Popover  — short structured detail anchored to its trigger (desktop).
 * Sheet    — the same detail on mobile, as a bottom sheet.
 * Drawer   — filters and record detail on desktop (right side).
 * Modal    — a decision that must be made now, with its consequence stated.
 * Page     — anything longer than one screen of reading.
 *
 * Every overlay: focus returns to its trigger on close (Radix default),
 * background scroll is locked while a blocking overlay is open, content
 * scrolls rather than clips at 200% zoom or with longer Hindi copy, and
 * motion collapses under prefers-reduced-motion via styles.css.
 */

/* Shared sizing so content never clips at 200% zoom or in Hindi. */
const FLOATING_WIDTH = "w-[min(20rem,calc(100vw-2rem))] max-h-[min(24rem,70dvh)] overflow-y-auto";

/**
 * Remembers the element that opened a controlled overlay and returns focus to
 * it on close, so keyboard and screen-reader users land back where they were.
 */
function useReturnFocus(open: boolean) {
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      trigger.current = document.activeElement as HTMLElement | null;
      return;
    }
    const element = trigger.current;
    if (!element || !document.contains(element)) return;
    const timer = window.setTimeout(() => element.focus({ preventScroll: true }), 260);
    return () => window.clearTimeout(timer);
  }, [open]);
}

/* ------------------------------------------------------------------ */
/* Tooltip — short definitions only. Never the sole home of a fact.    */
/* ------------------------------------------------------------------ */

export function InfoTip({
  term,
  children,
  label,
}: {
  /** Visible trigger text; omit to use the help icon. */
  term?: string;
  children: ReactNode;
  /** Accessible name when the trigger is icon-only. */
  label?: string;
}) {
  const isMobile = useIsMobile();
  const accessibleName = label ?? (term ? `What is ${term}?` : "More information");

  const trigger = term ? (
    <button
      type="button"
      className="inline-flex items-center gap-1 border-b border-dotted border-border-strong text-left font-medium text-foreground"
      aria-label={accessibleName}
    >
      {term}
      <HelpCircle aria-hidden className="size-3.5 text-muted-foreground" />
    </button>
  ) : (
    <button
      type="button"
      className="inline-flex min-h-6 min-w-6 items-center justify-center text-muted-foreground"
      aria-label={accessibleName}
    >
      <HelpCircle aria-hidden className="size-4" />
    </button>
  );

  // Mobile has no hover: the definition rises as a small bottom sheet,
  // which stays put while reading and closes predictably.
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[70dvh] overflow-y-auto rounded-t-2xl pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="text-base">{term ?? "What this means"}</SheetTitle>
            <SheetDescription className="text-sm leading-relaxed">{children}</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent
        side="top"
        collisionPadding={16}
        className="max-w-[min(18rem,calc(100vw-2rem))] whitespace-normal leading-relaxed"
      >
        {children}
      </TooltipContent>
    </Tooltip>
  );
}

/* ------------------------------------------------------------------ */
/* Compact contextual detail: popover on desktop, bottom sheet on mobile */
/* ------------------------------------------------------------------ */

export type BreakdownRow = { label: string; value: string; note?: string; strong?: boolean };

function BreakdownBody({
  rows,
  footnote,
  children,
}: {
  rows?: BreakdownRow[] | undefined;
  footnote?: string | undefined;
  children?: ReactNode | undefined;
}) {
  return (
    <>
      {rows ? (
        <dl className="mt-3 divide-y divide-border text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3 py-2">
              <dt
                className={cn(
                  "min-w-0 text-muted-foreground",
                  row.strong && "font-medium text-foreground",
                )}
              >
                {row.label}
                {row.note ? (
                  <span className="block text-xs text-muted-foreground">{row.note}</span>
                ) : null}
              </dt>
              <dd
                className={cn(
                  "num shrink-0 text-right text-foreground",
                  row.strong && "font-semibold",
                )}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {children}
      {footnote ? <p className="mt-3 text-xs text-muted-foreground">{footnote}</p> : null}
    </>
  );
}

export function DetailPopover({
  triggerLabel,
  title,
  rows,
  footnote,
  children,
}: {
  triggerLabel: string;
  title: string;
  rows?: BreakdownRow[];
  footnote?: string;
  children?: ReactNode;
}) {
  const isMobile = useIsMobile();

  const trigger = (
    <Button variant="outline" size="sm">
      {triggerLabel}
    </Button>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[80dvh] overflow-y-auto rounded-t-2xl pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="text-base">{title}</SheetTitle>
            <SheetDescription className="sr-only">
              Breakdown of the figures shown on this screen.
            </SheetDescription>
          </SheetHeader>
          <BreakdownBody rows={rows} footnote={footnote}>
            {children}
          </BreakdownBody>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="start" className={FLOATING_WIDTH} collisionPadding={16}>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <BreakdownBody rows={rows} footnote={footnote}>
          {children}
        </BreakdownBody>
      </PopoverContent>
    </Popover>
  );
}

/* ------------------------------------------------------------------ */
/* Modal families                                                      */
/* ------------------------------------------------------------------ */

export type ModalKind = "informational" | "confirmation" | "sensitive" | "security";

const KIND_LABEL: Record<ModalKind, string> = {
  informational: "For your information",
  confirmation: "Confirm this change",
  sensitive: "This affects your loan record",
  security: "Security check",
};

export function ConsequenceModal({
  open,
  onOpenChange,
  kind = "confirmation",
  title,
  context,
  consequence,
  reversibility,
  affected,
  auditNote,
  nextStep,
  confirmLabel,
  cancelLabel = "Keep as it is",
  destructive,
  onConfirm,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kind?: ModalKind;
  /** Specific question or statement — never "Are you sure?". */
  title: string;
  context: string;
  consequence?: string;
  reversibility?: string;
  affected?: string;
  auditNote?: string;
  nextStep?: string;
  /** Name the action: "Accept offer", not "Confirm". */
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  children?: ReactNode;
}) {
  // Sensitive and security dialogs require an explicit decision: no backdrop
  // dismissal and no Escape. Both always expose a labelled cancel path.
  const locked = kind === "sensitive" || kind === "security";
  useReturnFocus(open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[85dvh] max-w-lg overflow-y-auto rounded-xl"
        onInteractOutside={(event) => {
          if (locked) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (locked) event.preventDefault();
        }}
      >
        <DialogHeader>
          <p className="label-micro text-muted-foreground">{KIND_LABEL[kind]}</p>
          <DialogTitle className="editorial text-xl">{title}</DialogTitle>
          <DialogDescription>{context}</DialogDescription>
        </DialogHeader>

        {/* No illustrations here: a decision with financial consequence shows
            facts only. */}
        <dl className="space-y-3 rounded-lg border border-border bg-surface p-4 text-sm">
          {affected ? (
            <div className="grid gap-0.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-2">
              <dt className="text-muted-foreground">Applies to</dt>
              <dd className="min-w-0 text-foreground">{affected}</dd>
            </div>
          ) : null}
          {consequence ? (
            <div className="grid gap-0.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-2">
              <dt className="text-muted-foreground">What happens</dt>
              <dd className="min-w-0 text-foreground">{consequence}</dd>
            </div>
          ) : null}
          {reversibility ? (
            <div className="grid gap-0.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-2">
              <dt className="text-muted-foreground">Reversible</dt>
              <dd className="min-w-0 text-foreground">{reversibility}</dd>
            </div>
          ) : null}
          {auditNote ? (
            <div className="grid gap-0.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-2">
              <dt className="text-muted-foreground">Recorded</dt>
              <dd className="min-w-0 text-foreground">{auditNote}</dd>
            </div>
          ) : null}
          {nextStep ? (
            <div className="grid gap-0.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-2">
              <dt className="text-muted-foreground">Next step</dt>
              <dd className="min-w-0 text-foreground">{nextStep}</dd>
            </div>
          ) : null}
        </dl>

        {children}

        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? "destructive" : "default"}
            onClick={() => {
              onConfirm?.();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Responsive panel: side drawer on desktop, bottom sheet on mobile.   */
/* ------------------------------------------------------------------ */

export function ResponsivePanel({
  open,
  onOpenChange,
  title,
  description,
  wide,
  critical,
  footer,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** 480–640px instead of 360–420px for detailed content. */
  wide?: boolean;
  /** Critical panels cannot be dismissed by backdrop, Escape or swipe. */
  critical?: boolean;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const isMobile = useIsMobile();
  useReturnFocus(open);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "flex flex-col gap-0 overflow-y-auto p-0",
          isMobile
            ? "h-auto max-h-[85dvh] w-full rounded-t-2xl pb-[env(safe-area-inset-bottom)]"
            : wide
              ? "w-full sm:max-w-[560px]"
              : "w-full sm:max-w-[400px]",
        )}
        onInteractOutside={(event) => {
          if (critical) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (critical) event.preventDefault();
        }}
      >
        {isMobile ? (
          <div aria-hidden className="mx-auto mt-3 h-1 w-10 rounded-full bg-border-strong" />
        ) : null}
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="text-base font-semibold">{title}</SheetTitle>
          <SheetDescription className={cn("text-sm", !description && "sr-only")}>
            {description ?? `Details for ${title}.`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-5 py-4">{children}</div>
        {footer ? (
          <div className="sticky bottom-0 border-t border-border bg-card px-5 py-3">{footer}</div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

/* ------------------------------------------------------------------ */
/* Outcome record: financial results persist on the page, never in a   */
/* toast that disappears before it can be read or screenshotted.       */
/* ------------------------------------------------------------------ */

export function OutcomeRecord({
  tone = "success",
  title,
  body,
  reference,
  recordedAt,
  action,
}: {
  tone?: "success" | "neutral";
  title: string;
  body: string;
  reference?: string;
  recordedAt?: string;
  action?: ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "route-enter rounded-xl border p-4 text-sm",
        tone === "success" ? "border-success/40 bg-success-surface" : "border-border bg-surface",
      )}
    >
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-1 text-muted-foreground">{body}</p>
      {reference || recordedAt ? (
        <p className="num mt-2 text-xs text-muted-foreground">
          {[reference, recordedAt].filter(Boolean).join(" · ")}
        </p>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Status + value change: crossfade, never a counting animation.       */
/* ------------------------------------------------------------------ */

export function LiveValue({ value, label, asOf }: { value: string; label: string; asOf?: string }) {
  const [changed, setChanged] = useState(false);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (value === shown) return;
    setShown(value);
    setChanged(true);
    const timer = setTimeout(() => setChanged(false), 500);
    return () => clearTimeout(timer);
  }, [value, shown]);

  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        aria-live="polite"
        className={cn("num text-xl font-semibold text-foreground", changed && "value-changed")}
      >
        {shown}
      </p>
      {asOf ? <p className="text-xs text-muted-foreground">Updated {asOf}</p> : null}
    </div>
  );
}

export function SelectableOffer({
  lender,
  apr,
  emi,
  total,
  selected,
  onSelect,
}: {
  lender: string;
  apr: string;
  emi: string;
  total: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition-[background-color,border-color,box-shadow] duration-200",
        selected ? "border-primary bg-accent" : "border-border bg-card hover:border-border-strong",
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-foreground">{lender}</p>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-semibold transition-opacity duration-200",
            selected ? "text-primary opacity-100" : "opacity-0",
          )}
        >
          <Check aria-hidden className="size-4" /> Selected
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">APR</dt>
          <dd className="num text-foreground">{apr}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Monthly EMI</dt>
          <dd className="num text-foreground">{emi}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Total repayment</dt>
          <dd className="num text-foreground">{total}</dd>
        </div>
      </dl>
    </button>
  );
}

export function DismissibleNote({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3 text-sm">
      <p className="flex-1 text-muted-foreground">{children}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss note"
        className="inline-flex min-h-6 min-w-6 items-center justify-center text-muted-foreground"
      >
        <X aria-hidden className="size-4" />
      </button>
    </div>
  );
}
