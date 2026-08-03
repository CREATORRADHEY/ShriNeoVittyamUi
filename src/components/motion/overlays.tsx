import { useEffect, useState, type ReactNode } from "react";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = useState(false);

  const trigger = term ? (
    <button
      type="button"
      className="inline-flex items-center gap-1 border-b border-dotted border-border-strong text-left font-medium text-foreground"
      aria-label={label ?? `What is ${term}?`}
    >
      {term}
      <HelpCircle aria-hidden className="size-3.5 text-muted-foreground" />
    </button>
  ) : (
    <button
      type="button"
      className="inline-flex min-h-6 min-w-6 items-center justify-center text-muted-foreground"
      aria-label={label ?? "More information"}
    >
      <HelpCircle aria-hidden className="size-4" />
    </button>
  );

  // Mobile has no hover: tap opens an anchored popover with a close control.
  if (isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-64 text-sm" side="top">
          <p className="text-muted-foreground">{children}</p>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 h-8 px-2"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent side="top" className="max-w-[18rem] leading-relaxed">
        {children}
      </TooltipContent>
    </Tooltip>
  );
}

/* ------------------------------------------------------------------ */
/* Popover — compact contextual detail anchored to its trigger.        */
/* ------------------------------------------------------------------ */

export type BreakdownRow = { label: string; value: string; note?: string; strong?: boolean };

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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          {triggerLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[320px]" collisionPadding={16}>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {rows ? (
          <dl className="mt-3 divide-y divide-border text-sm">
            {rows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-3 py-2">
                <dt className={cn("text-muted-foreground", row.strong && "font-medium text-foreground")}>
                  {row.label}
                  {row.note ? (
                    <span className="block text-xs text-muted-foreground">{row.note}</span>
                  ) : null}
                </dt>
                <dd className={cn("num text-foreground", row.strong && "font-semibold")}>{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {children}
        {footnote ? <p className="mt-3 text-xs text-muted-foreground">{footnote}</p> : null}
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
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  children?: ReactNode;
}) {
  // Sensitive and security dialogs require an explicit decision.
  const locked = kind === "sensitive" || kind === "security";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg rounded-xl"
        onInteractOutside={(event) => {
          if (locked) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (kind === "security") event.preventDefault();
        }}
      >
        <DialogHeader>
          <p className="label-micro text-muted-foreground">{KIND_LABEL[kind]}</p>
          <DialogTitle className="editorial text-xl">{title}</DialogTitle>
          <DialogDescription>{context}</DialogDescription>
        </DialogHeader>

        <dl className="space-y-2 rounded-lg border border-border bg-surface p-4 text-sm">
          {affected ? (
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 text-muted-foreground">Applies to</dt>
              <dd className="text-foreground">{affected}</dd>
            </div>
          ) : null}
          {consequence ? (
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 text-muted-foreground">What happens</dt>
              <dd className="text-foreground">{consequence}</dd>
            </div>
          ) : null}
          {reversibility ? (
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 text-muted-foreground">Reversible</dt>
              <dd className="text-foreground">{reversibility}</dd>
            </div>
          ) : null}
          {auditNote ? (
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 text-muted-foreground">Recorded</dt>
              <dd className="text-foreground">{auditNote}</dd>
            </div>
          ) : null}
          {nextStep ? (
            <div className="flex gap-2">
              <dt className="w-28 shrink-0 text-muted-foreground">Next step</dt>
              <dd className="text-foreground">{nextStep}</dd>
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
  /** Critical panels cannot be dismissed by backdrop or swipe. */
  critical?: boolean;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const isMobile = useIsMobile();

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
      >
        {isMobile ? (
          <div aria-hidden className="mx-auto mt-3 h-1 w-10 rounded-full bg-border-strong" />
        ) : null}
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="text-base font-semibold">{title}</SheetTitle>
          {description ? (
            <SheetDescription className="text-sm">{description}</SheetDescription>
          ) : null}
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
/* Status + value change: crossfade, never a counting animation.       */
/* ------------------------------------------------------------------ */

export function LiveValue({
  value,
  label,
  asOf,
}: {
  value: string;
  label: string;
  asOf?: string;
}) {
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
        selected
          ? "border-primary bg-accent"
          : "border-border bg-card hover:border-border-strong",
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

export function DismissibleNote({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3 text-sm">
      <p className="flex-1 text-muted-foreground">{children}</p>
      <button type="button" onClick={onClose} aria-label="Dismiss note" className="text-muted-foreground">
        <X aria-hidden className="size-4" />
      </button>
    </div>
  );
}
