import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, ExternalLink, Info, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * Modal families for the public site.
 *
 * A. InformationModal   — short explanation, non-critical, freely dismissible.
 * B. ConfirmationModal  — a reversible decision stated in its own words.
 * C. ExternalLinkModal  — leaving ShriNeo for a regulatory / third-party site.
 * D. CookiePreferenceModal — consent, never pre-selected, explicit save only.
 *
 * Everything longer than one screen of reading belongs on a route, not here.
 * Motion, focus trap and focus return come from the Radix Dialog primitive and
 * the token-based timing in styles.css; nothing is re-implemented by hand.
 */

const DIALOG_CLASS = "max-h-[85dvh] max-w-lg overflow-y-auto rounded-xl";

/* ------------------------------------------------------------ A. information */

export function InformationModal({
  open,
  onOpenChange,
  title,
  body,
  primary,
  closeLabel = "Close",
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  body: string;
  primary?: ReactNode;
  closeLabel?: string;
  children?: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={DIALOG_CLASS}>
        <DialogHeader>
          <p className="label-micro text-muted-foreground">For your information</p>
          <DialogTitle className="editorial text-xl">{title}</DialogTitle>
          <DialogDescription>{body}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {closeLabel}
          </Button>
          {primary}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** The single reusable modal for destinations that are not built yet. */
export function InDevelopmentModal({
  open,
  onOpenChange,
  destination,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Named destination, e.g. "Sign in". Used verbatim in the title. */
  destination: string;
}) {
  return (
    <InformationModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${destination} is in development`}
      body="This area is not available in the current prototype. You can contact our team for assistance."
      primary={
        <Button asChild onClick={() => onOpenChange(false)}>
          <Link to="/contact">Contact support</Link>
        </Button>
      }
    />
  );
}

/** Convenience state holder for a page with several in-development triggers. */
export function useInDevelopment() {
  const [destination, setDestination] = useState<string | null>(null);
  return {
    /** Spread onto the trigger's onClick: open("Sign in") */
    open: (value: string) => setDestination(value),
    modal: (
      <InDevelopmentModal
        open={destination !== null}
        onOpenChange={(next) => {
          if (!next) setDestination(null);
        }}
        destination={destination ?? ""}
      />
    ),
  };
}

/* ----------------------------------------------------------- B. confirmation */

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  context,
  consequence,
  confirmLabel,
  cancelLabel = "Keep editing",
  destructive,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** State the specific decision — never "Are you sure?". */
  title: string;
  context: string;
  consequence?: string;
  /** Name the action: "Discard this message", not "Confirm". */
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={DIALOG_CLASS}>
        <DialogHeader>
          <p className="label-micro text-muted-foreground">Confirm this change</p>
          <DialogTitle className="editorial text-xl">{title}</DialogTitle>
          <DialogDescription>{context}</DialogDescription>
        </DialogHeader>
        {consequence ? (
          <p className="rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
            {consequence}
          </p>
        ) : null}
        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
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

/* --------------------------------------------------------- C. external link */

export function ExternalLinkModal({
  open,
  onOpenChange,
  destinationName,
  destinationUrl,
  reason,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destinationName: string;
  destinationUrl: string;
  /** Why we are sending the visitor there. */
  reason: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={DIALOG_CLASS}>
        <DialogHeader>
          <p className="label-micro text-muted-foreground">Leaving ShriNeo Capital</p>
          <DialogTitle className="editorial text-xl">
            You are being taken to {destinationName}
          </DialogTitle>
          <DialogDescription>{reason}</DialogDescription>
        </DialogHeader>
        <dl className="space-y-3 rounded-lg border border-border bg-surface p-4 text-sm">
          <div className="grid gap-0.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-2">
            <dt className="text-muted-foreground">Destination</dt>
            <dd className="num min-w-0 break-all text-foreground">{destinationUrl}</dd>
          </div>
          <div className="grid gap-0.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-2">
            <dt className="text-muted-foreground">Please note</dt>
            <dd className="min-w-0 text-foreground">
              The external website has its own privacy, security and accessibility practices. Ours
              do not apply once you leave.
            </dd>
          </div>
        </dl>
        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Stay on ShriNeo
          </Button>
          <Button asChild>
            <a
              href={destinationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenChange(false)}
            >
              Continue to {destinationName}
              <ExternalLink aria-hidden className="size-4" />
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------- D. cookie consent */

export type CookiePreferences = { essential: true; analytics: boolean };

export const COOKIE_STORAGE_KEY = "shrineo.cookie-preferences";

/** Reads stored consent. Absence means "not decided", never "accepted". */
export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { analytics?: unknown };
    return { essential: true, analytics: parsed.analytics === true };
  } catch {
    return null;
  }
}

export function CookiePreferenceModal({
  open,
  onOpenChange,
  initialAnalytics = false,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialAnalytics?: boolean;
  onSave: (preferences: CookiePreferences) => void;
}) {
  // Optional consent is never pre-selected on a first visit.
  const [analytics, setAnalytics] = useState(initialAnalytics);

  useEffect(() => {
    if (open) setAnalytics(initialAnalytics);
  }, [open, initialAnalytics]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={DIALOG_CLASS} onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <p className="label-micro text-muted-foreground">Cookie preferences</p>
          <DialogTitle className="editorial text-xl">Choose what we may store</DialogTitle>
          <DialogDescription>
            Strictly necessary cookies keep sign-in and security working and cannot be switched off.
            Everything else is your choice, and you can change it later.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-3">
          <li className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="cookie-essential"
                checked
                disabled
                aria-describedby="cookie-essential-note"
              />
              <div className="min-w-0">
                <label htmlFor="cookie-essential" className="text-sm font-medium">
                  Strictly necessary
                </label>
                <p id="cookie-essential-note" className="mt-1 text-sm text-muted-foreground">
                  Sign-in, session security and fraud prevention. Always on.
                </p>
              </div>
            </div>
          </li>
          <li className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="cookie-analytics"
                checked={analytics}
                onCheckedChange={(value) => setAnalytics(value === true)}
                aria-describedby="cookie-analytics-note"
              />
              <div className="min-w-0">
                <label htmlFor="cookie-analytics" className="text-sm font-medium">
                  Analytics
                </label>
                <p id="cookie-analytics-note" className="mt-1 text-sm text-muted-foreground">
                  Which pages are used, so we can fix what is unclear. Off unless you turn it on.
                </p>
              </div>
            </div>
          </li>
        </ul>

        <p className="text-xs text-muted-foreground">
          We do not use cookies for advertising profiles, and we do not sell your data.{" "}
          <Link to="/cookie-policy" className="underline underline-offset-2">
            Read the cookie policy
          </Link>
          .
        </p>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => {
              onSave({ essential: true, analytics: false });
              onOpenChange(false);
            }}
          >
            Reject optional
          </Button>
          <Button
            onClick={() => {
              onSave({ essential: true, analytics });
              onOpenChange(false);
            }}
          >
            Save preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------- pending action button */

/**
 * Keeps its width while working and names the work being done, so the layout
 * never shifts and the copy never implies a completed action.
 */
export function PendingButton({
  pending,
  pendingLabel,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { pending: boolean; pendingLabel: string }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (pending || !ref.current) return;
    setWidth(ref.current.getBoundingClientRect().width);
  }, [pending, children]);

  return (
    <Button
      ref={ref}
      {...props}
      disabled={pending || props.disabled}
      aria-busy={pending}
      className={cn("justify-center", className)}
      style={pending && width ? { minWidth: width } : undefined}
    >
      {pending ? (
        <>
          <Loader2 aria-hidden className="size-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

/* ------------------------------------------------------------ shared notices */

export function InlineNotice({
  tone = "info",
  children,
}: {
  tone?: "info" | "warning";
  children: ReactNode;
}) {
  const Icon = tone === "warning" ? AlertTriangle : Info;
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border p-3 text-sm",
        tone === "warning"
          ? "border-warning/40 bg-warning-surface text-foreground"
          : "border-border bg-surface text-muted-foreground",
      )}
    >
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span className="min-w-0">{children}</span>
    </p>
  );
}
