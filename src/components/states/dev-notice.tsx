import { useRouter, useRouterState } from "@tanstack/react-router";
import logo from "@/assets/shrineo-logo.png";
import { org } from "@/config/org";
import { usePrototype, ROLE_HOME, ROLE_LABEL } from "@/prototype/state";

function titleFromPath(pathname: string) {
  const last = pathname.split("/").filter(Boolean).pop();
  if (!last) return "Service";
  const words = decodeURIComponent(last)
    .replace(/[-_]+/g, " ")
    .replace(/\.[a-z]+$/i, "")
    .trim();
  if (!words) return "Service";
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function DevNoticePage() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = titleFromPath(pathname);
  const { role } = usePrototype();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: ROLE_HOME[role] });
    }
  };

  const goToDashboard = () => {
    router.navigate({ to: ROLE_HOME[role] });
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#F7F9FC] px-4 py-16">
      <section
        role="dialog"
        aria-labelledby="dev-notice-title"
        className="w-full max-w-[480px] rounded-[18px] border border-[#DDE7F5] bg-white p-7 shadow-[0_20px_55px_-24px_rgba(0,43,152,0.18)] sm:p-9 space-y-6"
      >
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#DDE7F5]">
          <img src={logo} alt="ShriNeo Capital logo" className="h-8 w-auto object-contain" />
          <span className="text-base font-semibold text-[#0A286F] tracking-tight">{org.brandName}</span>
        </div>

        <div className="space-y-2">
          <p className="font-num text-[11px] font-semibold tracking-[0.15em] text-red-600 uppercase">
            Service Offline
          </p>
          <h1
            id="dev-notice-title"
            className="font-display text-xl font-bold leading-tight text-[#002B98]"
          >
            {title} Access Restrained
          </h1>
        </div>

        <p className="text-sm leading-relaxed text-[#5B657D]">
          This section of the portal is temporarily offline for security verification and system updates. No changes have been made to your active profile or applications.
        </p>

        <div className="rounded-lg bg-neutral-50 border border-neutral-100 p-3 text-xs text-muted-foreground">
          If you need immediate assistance or would like to report an access issue, please contact our support team at <a href="mailto:support@shrineocapital.com" className="font-mono text-primary hover:underline">support@shrineocapital.com</a>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={goBack}
            className="flex h-11 items-center justify-center rounded-[10px] bg-[#002B98] text-sm font-semibold text-white transition-colors hover:bg-[#001A5C]"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={goToDashboard}
            className="flex h-11 items-center justify-center rounded-[10px] border border-[#DDE7F5] bg-white text-sm font-semibold text-[#002B98] transition-colors hover:bg-neutral-50"
          >
            Return to {ROLE_LABEL[role]} Dashboard
          </button>
        </div>
      </section>
    </main>
  );
}
