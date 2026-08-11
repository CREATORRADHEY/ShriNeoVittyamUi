import { useState, useRef, useEffect, FormEvent, ReactNode } from "react";
import { 
  X, ArrowUp, Mic, ArrowRight, ShieldAlert, Sparkles, 
  HelpCircle, MessageSquare, Search, FileText, CheckCircle2, 
  Clock, Calculator, ShieldCheck, Play, Square, AlertCircle, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import { Msg } from "./neo-types";
import neoAvatarSrc from "@/assets/neo-avatar.png";
import neoAssistantSrc from "@/assets/neo-assistant.png";

interface NeoPanelProps {
  onClose: () => void;
  messages: Msg[];
  onSendMessage: (text: string) => void;
  typing: boolean;
  recording: boolean;
  voiceState: "idle" | "listening" | "understanding" | "permission_denied" | "error" | "offline";
  setVoiceState: (s: any) => void;
  setRecording: (r: boolean) => void;
  onLanguageToggle: () => void;
  currentLang: "en" | "hi";
  dockOffset: number;
  initialScenario?: string;
}

export function NeoPanel({
  onClose,
  messages,
  onSendMessage,
  typing,
  recording,
  voiceState,
  setVoiceState,
  setRecording,
  onLanguageToggle,
  currentLang,
  dockOffset,
  initialScenario,
}: NeoPanelProps) {
  const { t } = useI18n();
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || typing) return;
    onSendMessage(draft.trim());
    setDraft("");
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const handleQuickAction = (text: string) => {
    onSendMessage(text);
  };

  const panelBottom = 24 + dockOffset;

  const quickActions = [
    {
      title: t("neo.actions.loan.title", "Find the right loan"),
      desc: t("neo.actions.loan.desc", "Compare loan options"),
      icon: Search,
      query: "Find the right loan",
    },
    {
      title: t("neo.actions.docs.title", "Documents guide"),
      desc: t("neo.actions.docs.desc", "Know what you need"),
      icon: FileText,
      query: "Which documents do I need?",
    },
    {
      title: t("neo.actions.eligibility.title", "Check eligibility"),
      desc: t("neo.actions.eligibility.desc", "See what you qualify for"),
      icon: CheckCircle2,
      query: "Am I eligible for a loan?",
    },
    {
      title: t("neo.actions.status.title", "Application status"),
      desc: t("neo.actions.status.desc", "Track your application"),
      icon: Clock,
      query: "Track my application status",
    },
    {
      title: t("neo.actions.calculator.title", "EMI & APR calculator"),
      desc: t("neo.actions.calculator.desc", "Plan your repayments"),
      icon: Calculator,
      query: "How is EMI decided?",
    },
    {
      title: t("neo.actions.trust.title", "About SNV Trust Score"),
      desc: t("neo.actions.trust.desc", "Understand your score"),
      icon: ShieldCheck,
      query: "What is SNV Trust Score?",
    },
  ];

  return (
    <div
      style={{ bottom: `${panelBottom}px` }}
      className={cn(
        /* Responsive sizing: full bottom sheet on mobile, fixed panel on desktop */
        "fixed right-0 z-50 w-full bg-white border border-[#DDE7F5] shadow-[0_20px_55px_-24px_rgba(0,43,152,0.32)]",
        "flex flex-col overflow-hidden transition-all duration-[240ms] ease-out",
        "bottom-0 h-[88dvh] rounded-t-[20px] sm:right-6 sm:bottom-6 sm:h-[min(720px,calc(100dvh-100px))] sm:w-[430px] sm:rounded-[20px]"
      )}
    >
      {/* 1. Header (Premium Navy Theme) */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#002B98] px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          {/* Avatar with availability status indicator dot */}
          <div className="relative size-9">
            <img
              src={neoAvatarSrc}
              alt=""
              className="size-full rounded-full border border-white/20 object-cover"
            />
            <span
              className="absolute bottom-0 right-0 size-2.5 rounded-full border border-[#002B98] bg-[#22C55E]"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-display text-[15px] font-semibold tracking-[-0.01em] text-white leading-tight">
              {t("neo.name", "Neo")}
            </h4>
            <p className="text-[11px] text-white/70 leading-none">
              {t("neo.role", "ShriNeo assistant")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language selection pill */}
          <button
            type="button"
            onClick={onLanguageToggle}
            aria-label="Switch language"
            className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white transition-colors hover:bg-white/20"
          >
            <Globe className="size-3" />
            {currentLang === "hi" ? "EN" : "हिन्दी"}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Neo assistant"
            className="flex size-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-[18px]" />
          </button>
        </div>
      </div>

      {/* Main content viewport */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto bg-[#F7F9FC]">
        {/* Welcome Section & Quick Actions appear ONLY when there are no user messages */}
        {messages.filter(m => m.from === "you").length === 0 ? (
          <div className="px-4 py-5">
            {/* 2. Welcome Panel Card */}
            <div className="relative overflow-hidden rounded-[12px] border border-[#DDE7F5] bg-[#E6F1FB]/60 p-4">
              <div className="grid grid-cols-[1fr_95px] gap-2">
                <div className="flex flex-col justify-center">
                  <span className="text-[18px] font-semibold text-[#002B98] flex items-center gap-1">
                    {t("neo.welcome.title", "Namaste! 🙏")}
                  </span>
                  <p className="mt-1 text-[13px] font-medium text-[#0A286F]">
                    {t("neo.welcome.body1", "I’m Neo, your ShriNeo assistant")}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#5B657D]">
                    {t("neo.welcome.body2", "I can help you understand loans, documents, costs and the application process")}
                  </p>
                </div>
                {/* Visual Character Illustration */}
                <div className="relative flex items-end justify-center">
                  <div className="absolute -bottom-4 size-24 rounded-full bg-gradient-to-t from-[#B9D8FC] to-transparent blur-md opacity-50" />
                  <img
                    src={neoAssistantSrc}
                    alt=""
                    className="relative z-10 max-h-[105px] object-contain"
                  />
                </div>
              </div>
            </div>

            {/* 3. Quick Actions */}
            <div className="mt-5">
              <h5 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#7A92B4]">
                {t("neo.actions.heading", "How can I help you today?")}
              </h5>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {quickActions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.title}
                      type="button"
                      onClick={() => handleQuickAction(act.query)}
                      className={cn(
                        "group flex flex-col justify-between rounded-[10px] border border-[#DDE7F5] bg-white p-3 text-left shadow-sm",
                        "transition-all duration-150 hover:-translate-y-px hover:border-[#AFC6E8] hover:bg-[#F5F8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE]"
                      )}
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#E6F1FB] text-[#0051AE] transition-colors group-hover:bg-[#D6E8F7]">
                          <Icon className="size-[15px]" />
                        </span>
                        <ArrowRight className="size-3 text-[#A8BAD0] transition-transform group-hover:translate-x-0.5" />
                      </div>
                      <div className="mt-2.5">
                        <p className="text-[12.5px] font-semibold text-[#002B98] leading-tight">
                          {act.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#5B657D] leading-none">
                          {act.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Safety Notice Card */}
            <div className="mt-5 flex items-start gap-2.5 rounded-[8px] border border-[#E9E1D2] bg-[#FAF8F5] p-3">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-[#C19842]" />
              <div className="min-w-0">
                <p className="text-[11.5px] font-bold text-[#806126] leading-tight">
                  {t("neo.safety.alert", "Neo never asks for passwords, PINs or OTPs")}
                </p>
                <p className="mt-0.5 text-[11px] text-[#806A42]">
                  {t("neo.safety.subtext", "Do not share sensitive credentials in chat")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Active Transcript Conversation Area */
          <div className="px-4 py-4">
            <ol className="space-y-4" aria-live="polite">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={cn(
                    "flex flex-col",
                    msg.from === "you" ? "items-end text-right" : "items-start text-left"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-[12px] border px-4 py-3 text-[13.5px] leading-relaxed shadow-sm",
                      msg.from === "you"
                        ? "border-[#D6E5F7] bg-[#E6F1FB] text-[#002B98]"
                        : "border-[#DDE7F5] bg-white text-[#2C3A5A]"
                    )}
                  >
                    {msg.text}
                  </div>
                </li>
              ))}

              {/* Typing indicator bubble */}
              {typing && (
                <li className="flex items-start">
                  <div className="flex items-center gap-1 rounded-[12px] border border-[#DDE7F5] bg-white px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-[#B4BDCC]"
                        style={{ animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                </li>
              )}
            </ol>
          </div>
        )}
      </div>

      {/* Voice Status Indicator Banner (Listening, Understanding, etc.) */}
      {voiceState !== "idle" && (
        <div
          className={cn(
            "flex items-center gap-2 border-t px-4 py-2 text-xs font-semibold transition-colors",
            voiceState === "listening" ? "bg-[#EBF7F2] border-[#C2EAD9] text-[#107C41]" :
            voiceState === "understanding" ? "bg-[#FFF9EB] border-[#FFE9B3] text-[#A8720A]" :
            "bg-[#FEEBEB] border-[#F8C2C2] text-[#A30000]"
          )}
        >
          {voiceState === "listening" && (
            <>
              {/* Waveform indicator */}
              <div className="flex items-end gap-[2px] h-3.5 w-6 shrink-0 py-[2px]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full bg-[#107C41] animate-[shrineo-rise_300ms_infinite_alternate]"
                    style={{
                      height: `${[40, 90, 60, 100, 50][i]}%`,
                      animationDelay: `${i * 90}ms`,
                    }}
                  />
                ))}
              </div>
              <span>{t("neo.voice.listening", "Listening…")}</span>
            </>
          )}

          {voiceState === "understanding" && (
            <>
              <Clock className="size-3.5 animate-spin" />
              <span>{t("neo.voice.understanding", "Understanding…")}</span>
            </>
          )}

          {voiceState === "permission_denied" && (
            <>
              <AlertCircle className="size-3.5" />
              <span>{t("neo.voice.denied", "Microphone permission denied")}</span>
            </>
          )}

          {voiceState === "error" && (
            <>
              <AlertCircle className="size-3.5" />
              <span>{t("neo.voice.error", "Voice recognition error. Please type.")}</span>
            </>
          )}

          {voiceState === "offline" && (
            <>
              <AlertCircle className="size-3.5" />
              <span>{t("neo.voice.offline", "Voice search unavailable offline")}</span>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              setVoiceState("idle");
              setRecording(false);
            }}
            className="ml-auto flex size-5 items-center justify-center rounded-full hover:bg-black/5"
            aria-label="Dismiss status"
          >
            <X className="size-3" />
          </button>
        </div>
      )}

      {/* 5. Input Composer */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-[#D8E3F3] bg-white p-3"
      >
        <div className="flex items-end gap-2 rounded-[12px] border border-[#D8E3F3] bg-white px-3 py-2 transition-colors focus-within:border-[#0051AE]">
          <textarea
            ref={inputRef}
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={t("neo.composer.placeholder", "Ask Neo about loans, documents or your application…")}
            aria-label="Message draft"
            className="max-h-24 min-h-[24px] flex-1 resize-none bg-transparent text-[13.5px] leading-relaxed text-[#2C3A5A] placeholder:text-[#8B94A6] focus:outline-none"
          />

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Voice microphone button */}
            <button
              type="button"
              onClick={() => {
                if (recording) {
                  setRecording(false);
                  setVoiceState("idle");
                } else {
                  setRecording(true);
                  setVoiceState("listening");
                  // Simulate listening finishing and auto understanding
                  setTimeout(() => {
                    setVoiceState("understanding");
                    setTimeout(() => {
                      setVoiceState("idle");
                      setRecording(false);
                      onSendMessage("How much can I borrow?");
                    }, 1200);
                  }, 2400);
                }
              }}
              aria-label={recording ? "Stop listening" : "Record voice input"}
              className={cn(
                "flex size-8 items-center justify-center rounded-lg border transition-colors",
                recording
                  ? "border-[#FFE5D9] bg-[#FFF2EB] text-[#E8A020]"
                  : "border-transparent text-[#5B657D] hover:bg-neutral-100 hover:text-neutral-900"
              )}
            >
              <Mic className="size-[17px]" />
            </button>

            {/* Send button */}
            <button
              type="submit"
              disabled={!draft.trim() || typing}
              aria-label="Send message"
              className="flex size-8 items-center justify-center rounded-lg bg-[#002B98] text-white transition-opacity disabled:opacity-35 hover:bg-[#001A5C]"
            >
              <ArrowUp className="size-[17px]" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
