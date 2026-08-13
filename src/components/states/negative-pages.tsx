import { Link } from "@tanstack/react-router";

import { FullPageState, referenceStamp, useRoleHomeAction } from "@/components/states/full-page";
import { InlineState, StatusBadge } from "@/components/states";
import { ROLE_LABEL, usePrototype } from "@/prototype/state";

export function NotFoundPage() {
  const home = useRoleHomeAction("Go to dashboard");
  return (
    <FullPageState
      code="404"
      title="We couldn't find that page."
      explanation="The link may be incorrect, expired, or the page may have moved."
      safety="Nothing in your account has changed. Your applications and documents are exactly where you left them."
      actions={[
        home,
        { label: "Return to homepage", to: "/", variant: "outline" },
        { label: "Contact support", to: "/contact", variant: "ghost" },
      ]}
      figure="diverge"
    />
  );
}

export function SessionEndedPage() {
  return (
    <FullPageState
      code="401"
      title="Your session has ended."
      explanation="For your security, you need to sign in again. Your saved progress has not been removed."
      safety="Any application step you completed is stored. You'll return to the same place after signing in."
      actions={[
        { label: "Return to prototype login", to: "/prototype" },
        { label: "Go to homepage", to: "/", variant: "outline" },
      ]}
      figure="signal"
    />
  );
}

export function PermissionRestrictedPage() {
  const { role } = usePrototype();
  const home = useRoleHomeAction("Return to dashboard");
  const borrower = role === "borrower";
  return (
    <FullPageState
      code="403"
      title={
        borrower
          ? "This page isn't available for your account."
          : "You don't have access to this page."
      }
      explanation={
        borrower
          ? "This area is used by our lending partners and internal teams. Everything relating to your loan is available from your dashboard."
          : `Your current role (${ROLE_LABEL[role]}) does not include permission to view or change this information.`
      }
      safety="No data was exposed and this attempt was recorded in the access log."
      actions={[
        home,
        borrower
          ? { label: "Contact support", to: "/contact", variant: "outline" }
          : { label: "Request access", to: "/contact", variant: "outline" },
      ]}
      tone="warning"
      figure="system"
    />
  );
}

export function LinkExpiredPage() {
  const home = useRoleHomeAction("Go to dashboard");
  return (
    <FullPageState
      code="410"
      title="This link has expired."
      explanation="Links to invitations, offers, verification codes and downloads are time-limited so they can't be reused by anyone else."
      safety="Your application details remain saved. Nothing was cancelled because the link lapsed."
      actions={[
        { label: "View current offers", to: "/app/borrower/offers" },
        { label: "Send a new code", variant: "outline" },
        home,
      ]}
      tone="warning"
      detail={
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {[
            "Invitation expired — request a new invitation",
            "Offer expired — view current offers",
            "Verification link expired — send a new code",
            "Download link expired — generate a new link",
          ].map((t) => (
            <li key={t} className="rounded-md border border-border bg-surface px-3 py-2">
              {t}
            </li>
          ))}
        </ul>
      }
      figure="diverge"
    />
  );
}

export function TooManyAttemptsPage() {
  return (
    <FullPageState
      code="429"
      title="Please wait before trying again."
      explanation="Too many verification codes were requested from this device in a short period, so code requests are paused for a few minutes."
      safety="Your application progress is saved and your account is not locked."
      actions={[
        { label: "Return to application", to: "/app/borrower/application" },
        { label: "Contact support", to: "/contact", variant: "outline" },
      ]}
      tone="warning"
      detail={
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-sm font-medium text-foreground">Temporarily limited</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Sending new verification codes. Everything else — viewing your application, documents
            and offers — remains available.
          </p>
          <p className="num mt-3 text-sm text-foreground" role="status" aria-live="polite">
            You can request a new code in 4 minutes 30 seconds.
          </p>
        </div>
      }
      figure="signal"
    />
  );
}

export function PlatformErrorPage() {
  const home = useRoleHomeAction("Go to dashboard");
  return (
    <FullPageState
      code="500"
      title="We couldn't complete that request."
      explanation="Something failed on our side while processing this page. It isn't caused by anything you did."
      safety="Your information is safe. No application was submitted, changed or withdrawn."
      actions={[{ label: "Try again", onClick: () => window.location.reload() }, home]}
      tone="error"
      reference={referenceStamp("SNV-ERR")}
      support="If this keeps happening, quote the reference below when you contact support."
      showSupportPanel
      figure="system"
    />
  );
}

export function ServiceUnavailablePage() {
  const home = useRoleHomeAction("Go to dashboard");
  return (
    <FullPageState
      code="503"
      title="A connected service is temporarily unavailable."
      explanation="Our Account Aggregator partner isn't responding. This affects fetching new bank statements only."
      safety="Your saved application, uploaded documents and repayment records are unaffected."
      actions={[
        { label: "Try again", onClick: () => window.location.reload() },
        { label: "Save and exit", to: "/app/borrower/application", variant: "outline" },
        home,
      ]}
      tone="warning"
      detail={
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-warning/30 bg-warning-surface p-4">
            <p className="text-sm font-semibold text-foreground">Affected right now</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Fetching bank statements via Account Aggregator</li>
              <li>Automatic income verification</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-foreground">Still available</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Uploading statements manually</li>
              <li>Viewing offers, documents and EMI schedules</li>
              <li>Making a payment to your lender</li>
            </ul>
          </div>
        </div>
      }
      support="Institutional users can follow recovery progress on the partner status page."
      reference={referenceStamp("SNV-SVC")}
      figure="system"
    />
  );
}

export function MaintenancePage() {
  return (
    <FullPageState
      title="We're carrying out scheduled maintenance."
      explanation="Planned platform work is under way. This was notified in advance and is not an outage."
      safety="Applications, documents, offers and repayment records are unaffected and remain saved."
      actions={[
        { label: "Refresh status", onClick: () => window.location.reload() },
        { label: "Contact support", to: "/contact", variant: "outline" },
      ]}
      tone="neutral"
      detail={
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-foreground">Expected return to service</p>
            <p className="num mt-1 text-sm text-foreground">Today, 02:30 IST</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Affected: new applications, document upload.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-foreground">Unaffected</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Viewing existing loans and statements, EMI calculator, support requests.
            </p>
          </div>
        </div>
      }
      figure="system"
    />
  );
}

export function OfflinePage() {
  return (
    <FullPageState
      title="You're offline."
      explanation="Reconnect to continue. Any information already saved on this device will remain available."
      safety="Nothing you entered was lost. Your last saved draft is intact and will sync when you reconnect."
      actions={[
        { label: "Retry connection", onClick: () => window.location.reload() },
        { label: "Return to saved draft", to: "/app/borrower/application", variant: "outline" },
      ]}
      tone="offline"
      detail={
        <InlineState
          tone="neutral"
          title="Offline-safe content"
          explanation="Your saved draft, the list of uploaded documents and the EMI calculator work without a connection."
        />
      }
      figure="signal"
    />
  );
}

export function UnsupportedBrowserPage() {
  return (
    <FullPageState
      title="This browser isn't fully supported."
      explanation="Some parts of the application may not display or work correctly in this browser version."
      safety="You can continue safely — viewing and reading is unaffected. Only document capture and e-Sign may fail."
      actions={[
        { label: "Continue with limited access", to: "/prototype" },
        { label: "Read browser guidance", to: "/contact", variant: "outline" },
      ]}
      tone="warning"
      detail={
        <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Supported browsers</p>
          <p className="mt-1">
            Chrome 110+, Edge 110+, Safari 16+, Firefox 110+. On Android, the latest Chrome or the
            built-in browser updated through Play Store.
          </p>
        </div>
      }
      figure="system"
    />
  );
}

export function ScriptFailurePage() {
  const home = useRoleHomeAction("Return to dashboard");
  return (
    <FullPageState
      title="This page could not load correctly."
      explanation="A part of the page failed to load, so some controls may be missing or unresponsive."
      safety="No action was submitted. Your application and repayment records are unchanged."
      actions={[
        { label: "Reload page", onClick: () => window.location.reload() },
        home,
        { label: "Contact support", to: "/contact", variant: "ghost" },
      ]}
      tone="error"
      reference={referenceStamp("SNV-SCR")}
      figure="system"
    />
  );
}

export function SecurityRestrictionPage() {
  return (
    <FullPageState
      title="We paused this action to protect your account."
      explanation="A change to your registered bank account was requested from a device we haven't seen before, so we stopped it before it completed."
      safety="No money moved and no application data was changed."
      actions={[
        { label: "Verify it was you", to: "/prototype" },
        { label: "Contact support", to: "/contact", variant: "outline" },
      ]}
      tone="warning"
      reference={referenceStamp("SNV-SEC")}
      detail={
        <div className="rounded-lg border border-border bg-surface p-4 text-sm">
          <p className="font-medium text-foreground">Blocked action</p>
          <p className="mt-1 text-muted-foreground">
            Update disbursal bank account · requested 12 Mar 2026, 14:31 IST
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge tone="success">Funds unaffected</StatusBadge>
            <StatusBadge tone="success">Application data unchanged</StatusBadge>
          </div>
        </div>
      }
      figure="signal"
    />
  );
}

export function AccountSuspendedPage() {
  return (
    <FullPageState
      title="Your account is temporarily restricted."
      explanation="A review is under way on your account. During the review you can still see your information, but new applications and payments are paused."
      safety="Your existing loan, repayment history and documents are safe and unchanged."
      actions={[
        { label: "View read-only summary", to: "/app/borrower" },
        { label: "Contact support", to: "/contact", variant: "outline" },
      ]}
      tone="warning"
      detail={
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-foreground">Still available</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Loan summary, EMI schedule, statements, documents, support requests.
            </p>
          </div>
          <div className="rounded-lg border border-warning/30 bg-warning-surface p-4">
            <p className="text-sm font-semibold text-foreground">Paused during review</p>
            <p className="mt-1 text-sm text-muted-foreground">
              New applications, offer selection, e-Sign, changes to bank details.
            </p>
          </div>
        </div>
      }
      support="Reviews are usually completed within 3 working days. We'll message you when it closes."
      figure="system"
    />
  );
}

export function AccountDeactivatedPage() {
  return (
    <FullPageState
      title="This account is no longer active."
      explanation="The account was closed, either at your request or after a completed review. It can't be used to apply for new credit."
      safety="Historical records — statements, closure letters and consent records — remain accessible for the statutory retention period."
      actions={[
        { label: "Download historical records", variant: "default" },
        { label: "Start reactivation request", to: "/contact", variant: "outline" },
        { label: "Return to homepage", to: "/", variant: "ghost" },
      ]}
      tone="neutral"
      figure="system"
    />
  );
}

export function NoResultsPage() {
  return (
    <FullPageState
      title="No matching results."
      explanation="No records match the search and filters currently applied. This is a genuine zero-result search, not a failed request."
      actions={[
        { label: "Clear filters", variant: "default" },
        { label: "Modify search", variant: "outline" },
        { label: "Return to full list", to: "/app/lender/workbench", variant: "ghost" },
      ]}
      tone="neutral"
      detail={
        <div className="flex flex-wrap gap-2">
          {["Product: Mortgage", "Stage: Manual review", "Age: < 2h", "Branch: Nashik"].map((f) => (
            <span
              key={f}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
            >
              {f}
            </span>
          ))}
        </div>
      }
      figure="diverge"
    />
  );
}

export function NegativePageIndex() {
  const pages: [string, string][] = [
    ["/404", "404 — Page not found"],
    ["/errors/401", "401 — Session ended"],
    ["/errors/403", "403 — Permission restricted"],
    ["/errors/410", "410 — Link expired"],
    ["/errors/429", "429 — Too many attempts"],
    ["/errors/500", "500 — Platform error"],
    ["/errors/503", "503 — Service unavailable"],
    ["/errors/maintenance", "Scheduled maintenance"],
    ["/errors/offline", "Offline"],
    ["/errors/unsupported-browser", "Unsupported browser"],
    ["/errors/script-failure", "Script failure"],
    ["/errors/security", "Security restriction"],
    ["/errors/suspended", "Account suspended"],
    ["/errors/deactivated", "Account deactivated"],
    ["/errors/no-results", "No matching results"],
  ];
  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-5 py-12">
      <h1 className="editorial text-3xl text-foreground">Global negative pages</h1>
      <p className="mt-2 text-muted-foreground">
        Every page below is branded, explains what happened, states whether money and data are safe,
        and offers a recovery path.
      </p>
      <ul className="mt-6 grid gap-1.5">
        {pages.map(([to, label]) => (
          <li key={to}>
            <Link
              to={to}
              className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:border-primary"
            >
              {label}
              <span className="num text-xs text-muted-foreground">{to}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
