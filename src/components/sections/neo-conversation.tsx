import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ content
   The conversation is an intentional vernacular demonstration: the Hindi
   turns stay in Hindi regardless of interface language. Surrounding labels
   are the only translatable strings. */

type Turn = {
  id: string;
  from: "you" | "neo";
  text: string;
};

const TURNS: Turn[] = [
  {
    id: "t1",
    from: "you",
    text: "मुझे दुकान के लिए लोन चाहिए। कितना मिल सकता है?",
  },
  {
    id: "t2",
    from: "neo",
    text: "यह आपकी कमाई, ख़र्च और चुकौती के तरीक़े पर निर्भर करता है। आप राशि और मोबाइल नंबर डालिए, मैं देखकर बताता हूँ कि कौन-कौन से विकल्प खुलते हैं।",
  },
  { id: "t3", from: "you", text: "कौन से कागज़ लगेंगे?" },
  {
    id: "t4",
    from: "neo",
    text: "शुरू करने के लिए आधार, PAN और छह महीने का बैंक स्टेटमेंट। दुकान का लोन है तो GST या उद्यम नंबर भी काम आता है।",
  },
];

const STEP = 520; // delay between turns
const RESET = 120; // pause before a replay begins

/** Small microphone line icon — no avatar, no status dot. */
function MicIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={props.className}
    >
      <rect x="9.25" y="3" width="5.5" height="10.5" rx="2.75" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" />
    </svg>
  );
}

export function NeoConversationSection() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // Completed transcript is the safe default: if JS or the observer never
  // runs, every turn stays visible.
  const [shown, setShown] = useState(TURNS.length);
  const [armed, setArmed] = useState(false); // JS ready → motion allowed
  const played = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const play = useCallback(
    (fromDelay = 0) => {
      clearTimers();
      setShown(0);
      TURNS.forEach((_, index) => {
        timers.current.push(window.setTimeout(() => setShown(index + 1), fromDelay + index * STEP));
      });
    },
    [clearTimers],
  );

  useEffect(() => {
    if (reduced) return;
    setArmed(true);
    setShown(0);
  }, [reduced]);

  // One observer for the whole section; the introduction runs exactly once.
  useEffect(() => {
    if (reduced || !armed) return;
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(TURNS.length);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played.current) return;
        played.current = true;
        observer.disconnect();
        play();
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [armed, reduced, play]);

  useEffect(() => clearTimers, [clearTimers]);

  const replay = () => {
    if (reduced) return; // all turns already visible
    played.current = true;
    clearTimers();
    setShown(0);
    timers.current.push(window.setTimeout(() => play(), RESET));
  };

  const visible = (index: number) => reduced || !armed || index < shown;

  return (
    <section
      aria-labelledby="neo-conversation-title"
      className="w-full border-t border-[#E7DFCE] bg-[#F7F3EA]"
    >
      <div ref={sectionRef} className="container-page py-16 md:py-24">
        <h2 id="neo-conversation-title" className="sr-only">
          {t("neo.heading")}
        </h2>

        <div className="mx-auto w-full max-w-[720px]">
          <div className="overflow-hidden rounded-2xl border border-[#E7DFCE] bg-white">
            {/* header */}
            <div className="flex items-center gap-[11px] border-b border-[#ECE7DD] bg-[#FBF9F4] px-4 py-4 sm:px-[22px]">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#E6F1FB] text-[#0051AE]">
                <MicIcon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold tracking-[-0.01em] text-[#002B98]">
                  Neo
                </span>
                <span className="block text-[11.5px] font-medium text-[#5B657D]">
                  {t("neo.role")}
                </span>
              </span>
            </div>

            {/* transcript — always in the DOM, only opacity/transform animate */}
            <ol className="space-y-5 px-[22px] py-[26px] pb-7">
              {TURNS.map((turn, index) => (
                <li
                  key={turn.id}
                  className={cn(
                    "flex flex-col",
                    turn.from === "you" ? "items-end text-right" : "items-start text-left",
                    "transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none",
                    visible(index) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  <span className="font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-[#5B657D]">
                    {turn.from === "neo" ? "Neo" : t("neo.you")}
                  </span>
                  <p
                    lang="hi"
                    className={cn(
                      "mt-1.5 rounded-xl border px-[17px] py-[13px] text-[15px] leading-[1.6]",
                      turn.from === "you"
                        ? "max-w-[85%] border-[#D6E5F7] bg-[#E6F1FB] text-[#002B98]"
                        : "max-w-[85%] border-[#ECE7DD] bg-white text-[#5B657D]",
                    )}
                  >
                    {turn.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* replay control */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-[11.5px] font-medium tracking-[0.1em] uppercase text-[#5B657D]">
              {t("neo.caption")}
            </span>
            <span aria-hidden className="size-[3px] rounded-full bg-[#B4BDCC]" />
            <button
              type="button"
              onClick={replay}
              aria-label={t("neo.replay.aria")}
              className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-transparent px-2 text-sm font-medium text-primary transition-colors duration-[var(--motion-fast)] hover:text-primary-hover active:opacity-70"
            >
              <RotateCcw
                aria-hidden
                className="size-4 transition-transform duration-[var(--motion-standard)] ease-[cubic-bezier(0.2,0,0,1)] group-hover:-rotate-45 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
              />
              {t("neo.replay")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
