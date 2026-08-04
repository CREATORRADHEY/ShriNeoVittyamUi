import { useRouter, useRouterState } from "@tanstack/react-router";

/** Turns "/app/borrower/apply" into "Apply for a loan"-style readable titles. */
function titleFromPath(pathname: string) {
  const last = pathname.split("/").filter(Boolean).pop();
  if (!last) return "This page";
  const words = decodeURIComponent(last)
    .replace(/[-_]+/g, " ")
    .replace(/\.[a-z]+$/i, "")
    .trim();
  if (!words) return "This page";
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * The single message shown for any destination that does not exist yet.
 * Rendered as the router's not-found component, so every uncreated page
 * gets the same card instead of a generic 404.
 */
export function DevNoticePage() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = titleFromPath(pathname);

  const close = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/" });
    }
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#001a5c] px-4 py-16">
      <section
        role="dialog"
        aria-labelledby="dev-notice-title"
        className="w-full max-w-[560px] rounded-[18px] bg-[#FDFAF3] p-7 shadow-[0_28px_70px_-24px_rgba(0,10,50,.7)] sm:p-9"
      >
        <div className="flex items-start justify-between gap-6">
          <p className="font-num text-[12px] font-medium tracking-[0.18em] text-[#5A6580] uppercase">
            In development
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mt-1 rounded-md p-1 text-[#28324a] transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#0051AE] focus-visible:outline-none"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <h1
          id="dev-notice-title"
          className="font-display mt-3 text-[clamp(1.6rem,3.2vw,2rem)] leading-tight font-semibold tracking-[-0.02em] text-[#002B98]"
        >
          {title}
        </h1>

        <p className="mt-5 text-[1.05rem] leading-relaxed text-[#35415c]">
          This part of the platform is currently in development
        </p>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-[#35415c]">
          To get in touch, write to{" "}
          <a
            href="mailto:support@shrineocapital.com"
            className="font-num underline underline-offset-4 decoration-[#0051AE]/50 text-[#0051AE] hover:decoration-[#0051AE]"
          >
            support@shrineocapital.com
          </a>
        </p>

        <button
          type="button"
          onClick={close}
          className="cta-saffron font-display mt-8 inline-flex min-h-[56px] w-full items-center justify-center rounded-[10px] text-[1.05rem] font-semibold focus-visible:ring-2 focus-visible:ring-[#0051AE] focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Close
        </button>
      </section>
    </main>
  );
}
