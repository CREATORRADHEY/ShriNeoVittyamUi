import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CookiePreferenceModal,
  COOKIE_STORAGE_KEY,
  readCookiePreferences,
  type CookiePreferences,
} from "@/components/motion/dialogs";

/**
 * Cookie consent surface.
 *
 * Nothing optional is enabled until an explicit choice is saved, and the bar
 * only appears after hydration so the served HTML never shifts under the
 * visitor. Once decided, preferences stay reachable from the footer link.
 */
export function CookieConsent() {
  const [decided, setDecided] = useState(true);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const stored = readCookiePreferences();
    setCurrent(stored);
    setDecided(stored !== null);
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("shrineo:cookie-preferences", onOpen);
    return () => window.removeEventListener("shrineo:cookie-preferences", onOpen);
  }, []);

  const save = (preferences: CookiePreferences) => {
    try {
      window.localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      /* storage unavailable — the choice still applies for this session */
    }
    setCurrent(preferences);
    setDecided(true);
  };

  return (
    <>
      {decided ? null : (
        <div
          role="region"
          aria-label="Cookie preferences"
          className="route-enter fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-raised)]"
        >
          <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="flex items-start gap-3 text-sm text-muted-foreground">
              <Cookie aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="max-w-2xl">
                We use strictly necessary cookies to keep sign-in and security working. Analytics
                stays off unless you turn it on.
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="min-h-11"
                onClick={() => save({ essential: true, analytics: false })}
              >
                Reject optional
              </Button>
              <Button variant="outline" className="min-h-11" onClick={() => setOpen(true)}>
                Choose preferences
              </Button>
              <Button
                className="min-h-11"
                onClick={() => save({ essential: true, analytics: true })}
              >
                Accept analytics
              </Button>
            </div>
          </div>
        </div>
      )}

      <CookiePreferenceModal
        open={open}
        onOpenChange={setOpen}
        initialAnalytics={current?.analytics ?? false}
        onSave={save}
      />
    </>
  );
}

/** Reopens the preference modal from anywhere (footer link, cookie policy). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event("shrineo:cookie-preferences"));
}
