import type { ReactNode } from "react";
import { AlertTriangle, CircleCheck, Inbox, Info, Loader2, Lock, WifiOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type StateProps = {
  title: string;
  body?: string;
  action?: ReactNode;
};

function Shell({
  icon,
  title,
  body,
  action,
  role = "status",
}: StateProps & { icon: ReactNode; role?: "status" | "alert" }) {
  return (
    <div
      role={role}
      className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card px-6 py-10 text-center"
    >
      <span aria-hidden className="text-muted-foreground">
        {icon}
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      {body ? <p className="max-w-md text-sm text-muted-foreground">{body}</p> : null}
      {action}
    </div>
  );
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 aria-hidden className="size-4 animate-spin" />
        {label}
      </p>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export function EmptyState({ title, body, action }: StateProps) {
  return <Shell icon={<Inbox className="size-6" />} title={title} body={body} action={action} />;
}

/** Errors explain what happened, what it means, what to do, and how to get help. */
export function ErrorState({
  title = "We could not load this",
  body = "The information did not load. Nothing you entered has been lost. Try again in a moment.",
  onRetry,
  supportHref = "/contact",
}: {
  title?: string;
  body?: string;
  onRetry?: () => void;
  supportHref?: string;
}) {
  return (
    <Shell
      role="alert"
      icon={<AlertTriangle className="size-6 text-destructive" />}
      title={title}
      body={body}
      action={
        <div className="flex flex-wrap justify-center gap-2">
          {onRetry ? (
            <Button onClick={onRetry} size="sm">
              Try again
            </Button>
          ) : null}
          <Button asChild size="sm" variant="outline">
            <a href={supportHref}>Contact support</a>
          </Button>
        </div>
      }
    />
  );
}

export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <Shell
      role="alert"
      icon={<WifiOff className="size-6" />}
      title="You appear to be offline"
      body="Anything you have entered is kept on this device. Reconnect and continue where you left off."
      action={
        onRetry ? (
          <Button size="sm" onClick={onRetry}>
            Retry now
          </Button>
        ) : null
      }
    />
  );
}

export function PartialDataState({ body }: { body: string }) {
  return (
    <div
      role="status"
      className="flex items-start gap-2 rounded-md border border-warning/30 bg-warning-surface px-4 py-3 text-sm text-warning"
    >
      <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
      <p>{body}</p>
    </div>
  );
}

export function PermissionDeniedState() {
  return (
    <Shell
      role="alert"
      icon={<Lock className="size-6" />}
      title="You do not have access to this"
      body="Your account role does not include this area. If you believe this is incorrect, contact your administrator."
    />
  );
}

export function SuccessState({ title, body, action }: StateProps) {
  return (
    <Shell
      icon={<CircleCheck className="size-6 text-success" />}
      title={title}
      body={body}
      action={action}
    />
  );
}
