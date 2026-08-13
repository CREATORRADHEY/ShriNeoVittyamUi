import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { usePrototype } from "@/prototype/state";
import { Msg } from "./neo-types";
import { NeoLauncher } from "./neo-launcher";
import { NeoGreetingCard } from "./neo-greeting-card";
import { NeoPanel } from "./neo-panel";

let seq = 0;
const nextId = () => `m${++seq}`;

const STORAGE_KEY = "shrineo.neoGreetingSeen";

export function NeoChatWidget() {
  const { language, setLanguage, t } = useI18n();
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const prototypeState = usePrototype();

  // Initialize state based on localStorage to avoid artificial delays
  const [view, setView] = useState<"minimized" | "greeting" | "open">("minimized");
  const [hasDismissedGreeting, setHasDismissedGreeting] = useState(true);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false);
  const [voiceState, setVoiceState] = useState<
    "idle" | "listening" | "understanding" | "permission_denied" | "error" | "offline"
  >("idle");

  const [mounted, setMounted] = useState(false);
  const [dockOffset, setDockOffset] = useState(0);

  const timers = useRef<number[]>([]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Exclude rendering automatically in Lender or Admin portals
  const isLenderOrAdmin =
    location.pathname.startsWith("/app/admin") ||
    location.pathname.startsWith("/app/lender") ||
    location.pathname.includes("/admin") ||
    location.pathname.includes("/lender");

  // Read greeting seen status synchronously on mount without delay
  useEffect(() => {
    setMounted(true);
    if (isLenderOrAdmin) return;
    try {
      const greetingSeen = window.localStorage.getItem(STORAGE_KEY) === "true";
      setHasDismissedGreeting(greetingSeen);
      setView(greetingSeen ? "minimized" : "greeting");
    } catch {
      setHasDismissedGreeting(true);
      setView("minimized");
    }
  }, [isLenderOrAdmin]);

  // Set up prototype navigator dock offset to avoid overlapping toolbar
  useEffect(() => {
    const measure = () => {
      const dock = document.querySelector<HTMLElement>("[data-prototype-toolbar]");
      setDockOffset(dock ? dock.getBoundingClientRect().height + 8 : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    const id = window.setTimeout(measure, 500);
    timers.current.push(id);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(id);
    };
  }, []);

  // Handle message sending and responses
  const getContextualAnswer = (lowerText: string): string => {
    const appState = prototypeState.application;
    const accountState = prototypeState.account;
    const dataState = prototypeState.data;

    if (lowerText.includes("loan") || lowerText.includes("borrow") || lowerText.includes("option")) {
      return "We offer several structured loan options matched directly from participating banks and NBFCs:\n\n• Personal Loan: ₹50,000 – ₹15 Lakhs\n• Business Loan: ₹1 Lakh – ₹50 Lakhs\n• Home Loan: ₹10 Lakhs – ₹5 Crores\n• Sachet Loan: ₹10,000 – ₹1 Lakh\n\nWould you like to check what you qualify for?";
    }

    if (lowerText.includes("document") || lowerText.includes("paper") || lowerText.includes("gst") || lowerText.includes("udyam")) {
      return "To start your application, you generally need the following documents:\n\n• Identity & Address: PAN card and Aadhaar eKYC.\n• Income verification: Latest 6 months of bank statements via secure Account Aggregator.\n• Business proof (for Business loans): GST details or Udyam Registration certificate.\n\nAll records are processed inside a secure locker.";
    }

    if (lowerText.includes("eligib") || lowerText.includes("qualify") || lowerText.includes("lakh") || lowerText.includes("thousand")) {
      return "Loan eligibility depends on several verified factors: income, existing obligations, available bank transactions, and individual lender criteria.\n\nI recommend using the 'Check eligibility' tool on the homepage or matching offers in the borrower portal to see what options open up for your profile.";
    }

    if (lowerText.includes("status") || lowerText.includes("track") || lowerText.includes("progress")) {
      if (accountState === "new" || dataState === "empty") {
        return "I don't see any active loan application for your profile yet. You can choose a loan product and submit your application from the dashboard.";
      }
      
      const statusLabels: Record<string, string> = {
        draft: "Draft application",
        submitted: "Submitted to platform",
        "documents-required": "Documents required",
        "lender-review": "Lender review",
        "manual-review": "Manual review",
        approved: "Offer approved",
        rejected: "Offer rejected",
        "disbursal-initiated": "Disbursal initiated",
        disbursed: "Disbursed",
        closed: "Closed",
      };

      const statusDesc: Record<string, string> = {
        draft: "Your application is saved as a draft. Please upload missing files to proceed.",
        submitted: "Your profile has been shared with participating lenders.",
        "documents-required": "The lender requires additional bank statement verification.",
        "lender-review": "The participating lender is reviewing your application file.",
        "manual-review": "A credit analyst is reviewing your cash flow statements.",
        approved: "Congratulations! An offer has been generated. Please review the KFS and e-sign.",
        rejected: "Lenders were unable to offer terms at this stage.",
        "disbursal-initiated": "Loan signing is complete. Funds are being transferred.",
        disbursed: "Funds have been credited to your bank account.",
        closed: "The loan agreement has been successfully closed.",
      };

      return `Current status:\n**${statusLabels[appState] ?? "Under Review"}**\n\nNext steps:\n${statusDesc[appState] ?? " Lenders are reviewing your file."}`;
    }

    if (lowerText.includes("emi") || lowerText.includes("apr") || lowerText.includes("calculator") || lowerText.includes("repay")) {
      return "EMI is determined by your principal amount, the interest rate, and the repayment tenure. We calculate APR (Annual Percentage Rate) to fold all fees and interest into one clear comparable figure.\n\nAlways review the Key Fact Statement (KFS) before e-signing to understand exact repayment schedules.";
    }

    if (lowerText.includes("trust") || lowerText.includes("score") || lowerText.includes("snv")) {
      if (accountState === "active" && dataState === "populated") {
        return "Your SNV Trust Score is verified at **78/100** (Excellent). This is based on Aadhaar eKYC validity, account aggregator transactions, and prompt repayment history.";
      }
      return "SNV Trust Score is our proprietary indicator of creditworthiness based on transactional bank data rather than CIBIL score alone. I don't have a verified score for your active profile in this demonstration environment.";
    }

    return "I can help explain loan products, documents, APR, EMI, or application status. Please select one of the quick actions or ask about these topics.";
  };

  const onSendMessage = useCallback(
    (text: string) => {
      const textTrimmed = text.trim();
      if (!textTrimmed) return;

      const userMsg: Msg = { id: nextId(), from: "you", text: textTrimmed };
      setMessages((prev) => [...prev, userMsg]);
      setTyping(true);

      const delay = prefersReducedMotion ? 200 : 800;
      const id = window.setTimeout(() => {
        setTyping(false);
        const replyText = getContextualAnswer(textTrimmed.toLowerCase());
        const neoMsg: Msg = { id: nextId(), from: "neo", text: replyText };
        setMessages((prev) => [...prev, neoMsg]);
      }, delay);

      timers.current.push(id);
    },
    [prefersReducedMotion, prototypeState]
  );

  // Subscribe to external trigger clicks (e.g. buttons with data-trigger-neo or talk to neo links)
  useEffect(() => {
    const handleOpenNeo = (e: Event) => {
      const customEvent = e as CustomEvent;
      setView("open");
      setHasDismissedGreeting(true);

      if (customEvent.detail?.message) {
        onSendMessage(customEvent.detail.message);
      }
    };

    window.addEventListener("shrineo:open-neo", handleOpenNeo);
    return () => window.removeEventListener("shrineo:open-neo", handleOpenNeo);
  }, [onSendMessage]);

  // Subscribe to Design QA overrides (prototype state controls)
  useEffect(() => {
    const handleOverride = (e: Event) => {
      const customEvent = e as CustomEvent;
      const data = customEvent.detail;
      if (data.state) {
        setView(data.state);
        if (data.state === "greeting") {
          setHasDismissedGreeting(false);
        } else if (data.state === "open" || data.state === "minimized") {
          setHasDismissedGreeting(true);
        }
      }
      if (data.voiceState) setVoiceState(data.voiceState);
      if (data.language) setLanguage(data.language);
      if (data.messages) {
        setMessages(data.messages);
      } else if (data.state === "open" && messages.length === 0) {
        // Default panel open greeting
        setMessages([{ id: nextId(), from: "neo", text: t("neo.greeting", "Namaste. I'm Neo. How can I help you today?") }]);
      }
    };

    window.addEventListener("shrineo:neo-override", handleOverride);
    return () => window.removeEventListener("shrineo:neo-override", handleOverride);
  }, [t, setLanguage, messages.length]);

  const handleLanguageToggle = () => {
    const nextLang = language === "hi" ? "en" : "hi";
    setLanguage(nextLang);
  };

  // Lifecycle state transition handlers
  const handleOpenPanel = () => {
    setView("open");
    setHasDismissedGreeting(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    // Seed initial welcome message if empty
    if (messages.length === 0) {
      setMessages([
        {
          id: nextId(),
          from: "neo",
          text: t("neo.greeting", "Namaste. I'm Neo. How can I help you today?"),
        },
      ]);
    }
  };

  const handleGreetingAccept = () => {
    setHasDismissedGreeting(true);
    setView("open");
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    if (messages.length === 0) {
      setMessages([
        {
          id: nextId(),
          from: "neo",
          text: t("neo.greeting", "Namaste. I'm Neo. How can I help you today?"),
        },
      ]);
    }
  };

  const handleGreetingDismiss = () => {
    setHasDismissedGreeting(true);
    setView("minimized");
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
  };

  if (!mounted || isLenderOrAdmin) return null;

  return createPortal(
    <>
      {/* State 1: Compact Avatar Launcher.
          Rendered ONLY after greeting card is closed/dismissed and the panel is not currently open. */}
      {hasDismissedGreeting && (
        <NeoLauncher
          open={view === "open"}
          onClick={handleOpenPanel}
          dockOffset={dockOffset}
        />
      )}

      {/* State 2: Floating Greeting Onboarding Card */}
      <NeoGreetingCard
        visible={view === "greeting"}
        onAccept={handleGreetingAccept}
        onDismiss={handleGreetingDismiss}
        dockOffset={dockOffset}
      />

      {/* State 3: Full Banking Concierge Assistant Panel */}
      {view === "open" && (
        <NeoPanel
          onClose={() => {
            setView("minimized");
            try {
              window.localStorage.setItem(STORAGE_KEY, "true");
            } catch {
              /* ignore */
            }
          }}
          messages={messages}
          onSendMessage={onSendMessage}
          typing={typing}
          recording={recording}
          voiceState={voiceState}
          setVoiceState={setVoiceState}
          setRecording={setRecording}
          onLanguageToggle={handleLanguageToggle}
          currentLang={language === "hi" ? "hi" : "en"}
          dockOffset={dockOffset}
        />
      )}
    </>,
    document.body
  );
}
