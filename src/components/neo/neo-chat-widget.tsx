import { ArrowUp, Camera, MoreVertical, Square, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useI18n } from "@/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ content
   Design-only assistant: replies are scripted, nothing is sent anywhere and
   nothing is stored. Copy is bilingual (English interface / Hindi fallback). */

type Msg = { id: string; from: "you" | "neo"; text: string };

type Copy = {
  title: string;
  role: string;
  open: string;
  close: string;
  placeholder: string;
  send: string;
  greeting: string;
  chips: string[];
  answers: { match: string[]; text: string }[];
  fallback: string;
  disclaimer: string;
  more: string;
  camera: string;
  cameraHint: string;
  mic: string;
  micHint: string;
  micStop: string;
  cameraNote: string;
  micNote: string;
};


const COPY: Record<"en" | "hi", Copy> = {
  en: {
    title: "Neo",
    role: "ShriNeo assistant",
    open: "Chat with Neo",
    close: "Close chat",
    placeholder: "Ask about loans, documents or EMI…",
    send: "Send message",
    greeting:
      "Namaste. I'm Neo. Ask me about loan amounts, documents, EMI or how comparison works — in English or Hindi.",
    chips: ["How much can I borrow?", "Which documents?", "How is EMI decided?"],
    answers: [
      {
        match: ["borrow", "amount", "loan", "eligib", "qualify"],
        text: "It depends on your income, existing obligations and repayment record. Enter an amount and your mobile number in the eligibility card and I'll show which options open up.",
      },
      {
        match: ["document", "paper", "kyc", "aadhaar", "pan"],
        text: "To start: Aadhaar, PAN and six months of bank statements. For a business loan, a GST or Udyam number helps too.",
      },
      {
        match: ["emi", "rate", "interest", "cost", "apr"],
        text: "EMI is set by amount, rate and tenure. Compare on APR rather than the headline rate — APR folds fees into one comparable number.",
      },
      {
        match: ["agent", "partner", "commission"],
        text: "Agents onboard borrowers, collect documents and track payouts from the agent portal. You can start from the 'For agents' section.",
      },
    ],
    fallback:
      "I can help with amounts, documents, EMI and comparison. This preview uses sample answers — the live assistant is being connected.",
    disclaimer: "Sample responses. Neo never asks for an OTP, PIN or payment.",
    more: "More options",
    camera: "Camera",
    cameraHint: "Photograph a document",
    mic: "Voice message",
    micHint: "Speak instead of typing",
    micStop: "Stop recording",
    cameraNote: "Document capture opens the camera in the live assistant. In this preview nothing is uploaded.",
    micNote: "Voice input is being connected. In this preview nothing is recorded or sent.",

  },
  hi: {
    title: "Neo",
    role: "श्रीनियो सहायक",
    open: "Neo से बात करें",
    close: "चैट बंद करें",
    placeholder: "लोन, कागज़ या EMI के बारे में पूछिए…",
    send: "संदेश भेजें",
    greeting:
      "नमस्ते, मैं Neo हूँ। लोन राशि, कागज़, EMI या तुलना के बारे में पूछिए — हिंदी या अंग्रेज़ी में।",
    chips: ["कितना लोन मिल सकता है?", "कौन से कागज़ लगेंगे?", "EMI कैसे तय होती है?"],
    answers: [
      {
        match: ["लोन", "राशि", "कितना", "पात्र"],
        text: "यह आपकी कमाई, ख़र्च और चुकौती के तरीक़े पर निर्भर करता है। राशि और मोबाइल नंबर डालिए, मैं देखकर बताता हूँ कि कौन-कौन से विकल्प खुलते हैं।",
      },
      {
        match: ["कागज", "कागज़", "दस्तावेज", "आधार", "पैन"],
        text: "शुरू करने के लिए आधार, PAN और छह महीने का बैंक स्टेटमेंट। दुकान का लोन है तो GST या उद्यम नंबर भी काम आता है।",
      },
      {
        match: ["emi", "ब्याज", "दर", "किस्त"],
        text: "EMI राशि, ब्याज दर और अवधि से तय होती है। तुलना APR पर कीजिए — उसमें फ़ीस भी जुड़ जाती है।",
      },
    ],
    fallback:
      "मैं राशि, कागज़, EMI और तुलना में मदद कर सकता हूँ। यह नमूना उत्तर है — असली सहायक जल्द जुड़ेगा।",
    disclaimer: "नमूना उत्तर। Neo कभी OTP, PIN या भुगतान नहीं माँगता।",
    more: "और विकल्प",
    camera: "कैमरा",
    cameraHint: "कागज़ की फ़ोटो लीजिए",
    mic: "आवाज़ से पूछें",
    micHint: "टाइप करने के बजाय बोलिए",
    micStop: "रिकॉर्डिंग बंद करें",
    cameraNote: "असली सहायक में कैमरा खुलेगा। इस नमूने में कुछ भी अपलोड नहीं होता।",
    micNote: "आवाज़ सुविधा जल्द जुड़ेगी। इस नमूने में कुछ भी रिकॉर्ड नहीं होता।",

  },
};

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

let seq = 0;
const nextId = () => `m${++seq}`;

export function NeoChatWidget() {
  const { language } = useI18n();
  const reduced = usePrefersReducedMotion();
  const copy = COPY[language === "hi" ? "hi" : "en"];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [recording, setRecording] = useState(false);


  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    },
    [],
  );

  // Seed the greeting on first open; nothing persists between visits.
  useEffect(() => {
    if (!open) return;
    setMessages((prev) => (prev.length ? prev : [{ id: nextId(), from: "neo", text: copy.greeting }]));
    const id = window.setTimeout(() => inputRef.current?.focus(), 120);
    timers.current.push(id);
  }, [open, copy.greeting]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const reply = useCallback(
    (question: string) => {
      const lower = question.toLowerCase();
      const hit = copy.answers.find((a) => a.match.some((m) => lower.includes(m)));
      setTyping(true);
      const id = window.setTimeout(
        () => {
          setTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: nextId(), from: "neo", text: hit?.text ?? copy.fallback },
          ]);
        },
        reduced ? 220 : 760,
      );
      timers.current.push(id);
    },
    [copy, reduced],
  );

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || typing) return;
      setMessages((prev) => [...prev, { id: nextId(), from: "you", text }]);
      setDraft("");
      reply(text);
      inputRef.current?.focus();
    },
    [reply, typing],
  );

  const note = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), from: "neo", text }]);
  }, []);

  const onCamera = useCallback(() => {
    setMenuOpen(false);
    note(copy.cameraNote);
    inputRef.current?.focus();
  }, [copy.cameraNote, note]);

  const onMic = useCallback(() => {
    setMenuOpen(false);
    setRecording((was) => {
      if (was) return false;
      note(copy.micNote);
      const id = window.setTimeout(() => setRecording(false), 2400);
      timers.current.push(id);
      return true;
    });
  }, [copy.micNote, note]);

  // Dismiss the composer menu on outside press or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (menuRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [menuOpen]);



  // Keep clear of the development-only prototype toolbar docked at the bottom.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [dockOffset, setDockOffset] = useState(0);
  useEffect(() => {
    const measure = () => {
      const dock = document.querySelector<HTMLElement>("[data-prototype-toolbar]");
      setDockOffset(dock ? dock.getBoundingClientRect().height + 8 : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    const id = window.setTimeout(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(id);
    };
  }, []);


  const base = `calc(1rem + env(safe-area-inset-bottom) + ${dockOffset}px)`;
  const panelBottom = `calc(4.75rem + env(safe-area-inset-bottom) + ${dockOffset}px)`;

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ------------------------------------------------------------ panel */}
      <div
        style={{ bottom: panelBottom }}
        className={cn(
          "fixed right-4 z-90 w-[min(23.5rem,calc(100vw-2rem))]",
          "origin-bottom-right transition-[opacity,transform] duration-[var(--motion-standard,240ms)] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-[0.97] opacity-0",
        )}
      >
        <div
          role="dialog"
          aria-modal="false"
          aria-label={`${copy.title} — ${copy.role}`}
          aria-hidden={!open}
          className="flex max-h-[min(32rem,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border border-[#E7DFCE] bg-white shadow-[0_28px_60px_-28px_rgba(0,26,92,0.55)]"
        >
          {/* header */}
          <div className="flex items-center gap-[11px] border-b border-[#ECE7DD] bg-[#FBF9F4] px-4 py-3.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#E6F1FB] text-[#0051AE]">
              <MicIcon className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold tracking-[-0.01em] text-[#002B98]">
                {copy.title}
              </span>
              <span className="block text-[11.5px] font-medium text-[#5B657D]">{copy.role}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label={copy.close}
              className="-mr-1 flex size-9 items-center justify-center rounded-lg text-[#5B657D] transition-colors hover:bg-[#EFEADF] hover:text-[#002B98]"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>

          {/* transcript */}
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto bg-[#F7F3EA] px-4 py-4">
            <ol className="space-y-3.5" aria-live="polite">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={cn(
                    "flex flex-col",
                    msg.from === "you" ? "items-end text-right" : "items-start text-left",
                    "animate-in fade-in slide-in-from-bottom-1 duration-[300ms] motion-reduce:animate-none",
                  )}
                >
                  <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase text-[#5B657D]">
                    {msg.from === "neo" ? "Neo" : language === "hi" ? "आप" : "You"}
                  </span>
                  <p
                    className={cn(
                      "mt-1 max-w-[88%] rounded-xl border px-[14px] py-[11px] text-[14px] leading-[1.6]",
                      msg.from === "you"
                        ? "border-[#D6E5F7] bg-[#E6F1FB] text-[#002B98]"
                        : "border-[#ECE7DD] bg-white text-[#5B657D]",
                    )}
                  >
                    {msg.text}
                  </p>
                </li>
              ))}
              {typing ? (
                <li className="flex items-start">
                  <span className="inline-flex items-center gap-1 rounded-xl border border-[#ECE7DD] bg-white px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-[#B4BDCC] motion-reduce:animate-none"
                        style={{ animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </span>
                </li>
              ) : null}
            </ol>

            {messages.length <= 1 && !typing ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {copy.chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => send(chip)}
                    className="rounded-full border border-[#D6E5F7] bg-white px-3 py-1.5 text-left text-[12.5px] font-medium text-[#002B98] transition-colors hover:bg-[#E6F1FB]"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* composer */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(draft);
            }}
            className="border-t border-[#ECE7DD] bg-white px-3 pt-3 pb-2.5"
          >
            <div className="flex items-end gap-2 rounded-xl border border-[#E2E7F0] bg-[#FBFCFE] px-3 py-2 transition-colors focus-within:border-[#0051AE]">
              <textarea
                ref={inputRef}
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send(draft);
                  }
                }}
                placeholder={copy.placeholder}
                aria-label={copy.placeholder}
                className="max-h-24 min-h-[24px] flex-1 resize-none bg-transparent text-[14px] leading-[1.5] text-foreground placeholder:text-[#8B94A6] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                aria-label={copy.send}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#002B98] text-white transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-95 disabled:opacity-35 motion-reduce:transition-none"
              >
                <ArrowUp aria-hidden className="size-4" />
              </button>
            </div>
            <p className="mt-2 px-1 text-center font-mono text-[10px] font-medium tracking-[0.08em] uppercase text-[#8B94A6]">
              {copy.disclaimer}
            </p>
          </form>
        </div>
      </div>

      {/* --------------------------------------------------------- launcher */}
      <button
        ref={launcherRef}
        type="button"
        style={{ bottom: base }}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? copy.close : copy.open}
        className={cn(
          "fixed right-4 z-90 flex items-center gap-2.5 rounded-full border border-white/15 bg-[#002B98] py-3 pr-4 pl-3 text-white shadow-[0_18px_36px_-16px_rgba(0,26,92,0.7)]",
          "transition-[transform,box-shadow,background-color] duration-[var(--motion-fast,160ms)] ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:bg-[#001A5C] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        )}
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-white/12">
          {open ? <X aria-hidden className="size-4" /> : <MicIcon className="size-4" />}
        </span>
        <span className="text-[13.5px] font-semibold tracking-[-0.01em]">{copy.title}</span>
      </button>
    </>,
    document.body,
  );
}
