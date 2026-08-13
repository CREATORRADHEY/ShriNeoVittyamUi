import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Award, Play, AlertCircle, RefreshCw, FileText, CheckCircle2, Lock } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard } from "@/components/states";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/agent/training")({
  head: () => ({
    meta: [
      { title: "Agent Training & Certification — ShriNeo Capital" },
      { name: "description", content: "Complete mandatory compliance training and download certifications." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AgentTrainingPage,
});

interface TrainingModule {
  id: string;
  name: string;
  duration: string;
  requiredBy: string;
  status: "Complete" | "Due" | "Not started" | "Locked";
  description: string;
}

function AgentTrainingPage() {
  const { account, data } = usePrototype();

  const [modules, setModules] = useState<TrainingModule[]>([
    { id: "mod-1", name: "RBI Fair Practice Code", duration: "18 min", requiredBy: "Completed", status: "Complete", description: "Mandatory codes governing transparency, rate disclosures, and grievance redressal channels." },
    { id: "mod-2", name: "Data Consent and Privacy Gates", duration: "22 min", requiredBy: "Completed", status: "Complete", description: "Rules for collecting client OTPs. Covers mask-management protocols and data retention limits." },
    { id: "mod-3", name: "Recognising Fraud and Impersonation", duration: "15 min", requiredBy: "31 Mar 2026", status: "Due", description: "Identify linked-device indicators, proxy attempts, and KYC document mismatches." },
    { id: "mod-4", name: "Explaining APR and KFS to Borrowers", duration: "12 min", requiredBy: "30 Jun 2026", status: "Not started", description: "Guide to presenting Key Fact Statements without making non-compliant claims." }
  ]);

  // Simulated player and quiz states
  const [activeVideo, setActiveVideo] = useState<TrainingModule | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const quizQuestions = [
    {
      q: "Can an agent collect a cash fee directly from the borrower to expedite a loan?",
      options: [
        "Yes, up to 1% of the loan amount",
        "Yes, but only if approved by the partner bank",
        "No, agents never charge fees directly to the borrower under any circumstance"
      ],
      correct: 2
    },
    {
      q: "When must an OTP code be entered during the application consent step?",
      options: [
        "The agent can request the OTP and enter it on their own terminal",
        "The borrower must read and enter the OTP on their own mobile device",
        "OTPs are not required if the client signed a physical paper proxy"
      ],
      correct: 1
    }
  ];

  const handleModuleClick = (m: TrainingModule) => {
    if (m.status === "Locked") {
      toast.error("Complete previous modules first to unlock.");
      return;
    }
    setActiveVideo(m);
  };

  const handleVideoComplete = () => {
    if (!activeVideo) return;
    toast.success(`Completed Module: ${activeVideo.name}`);
    setModules(prev =>
      prev.map(m => m.id === activeVideo.id ? { ...m, status: "Complete" as const } : m)
    );
    setActiveVideo(null);
  };

  const handleStartQuiz = () => {
    setActiveQuiz(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    const currentQ = quizQuestions[currentQuestion];
    if (!currentQ) return;
    if (selectedAnswer !== currentQ.correct) {
      toast.error("Incorrect answer. Please review compliance guidelines.");
      setActiveQuiz(false);
      return;
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setActiveQuiz(false);
      toast.success("Congratulations! You passed the assessment exam with 100%.");
    }
  };

  return (
    <PortalShell
      role="agent"
      title="Compliance & Training"
      subtitle="Complete regulatory courses to keep your active verification status current"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <KpiCard label="Training Modules Complete" value="2 of 4" hint="Next due by 31 Mar" />
          <KpiCard
            label="Certification Status"
            value={account === "new" ? "Awaiting training" : "Verified & Valid"}
            tone={account === "new" ? "warning" : "success"}
            hint={account === "new" ? "Requires Module 3 completion" : "Expires 12 Sep 2026"}
          />
          <KpiCard label="Mandatory Quizzes Due" value={account === "new" ? "1" : "0"} tone={account === "new" ? "warning" : "neutral"} />
          <KpiCard label="Average Assessment Score" value="88%" />
        </div>

        {/* COMPLIANCE ALERT CARD */}
        {account === "new" && (
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 text-xs">
            <AlertCircle className="size-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Mandatory Training Incomplete</p>
              <p className="mt-1">
                Your agent profile cannot be activated until Module 3 is completed and the assessment quiz is passed.
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {/* TRAINING PLAN LIST */}
          <div className="md:col-span-2 space-y-6">
            <SectionCard title="Your Training Curriculum">
              <div className="space-y-3 text-xs">
                {modules.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded border border-border bg-surface flex justify-between items-start cursor-pointer hover:bg-neutral-50 transition-colors ${m.status === "Due" ? "border-amber-200 bg-amber-50/20" : ""}`}
                    onClick={() => handleModuleClick(m)}
                  >
                    <div className="flex-1 pr-4 space-y-1">
                      <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                        {m.name}
                        {m.status === "Locked" && <Lock className="size-3 text-muted-foreground" />}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">{m.description}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">Duration: {m.duration} · Due: {m.requiredBy}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${m.status === "Complete" ? "bg-emerald-50 text-emerald-700" : m.status === "Due" ? "bg-amber-50 text-amber-700" : "bg-neutral-100 text-muted-foreground"}`}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* WATCH AGAIN - PREVIOUS VIDEOS */}
            <SectionCard title="Watch Again Library" description="Quick review links for completed courses">
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <button type="button" onClick={() => toast.success("FPC video loaded.")} className="p-3 border border-border rounded-lg bg-card hover:border-primary text-left transition-colors">
                  <Play className="size-4 text-primary mb-2" />
                  <p className="font-semibold">RBI Fair Practice Code summary</p>
                  <p className="text-[10px] text-muted-foreground">Completed 05 Mar 2026</p>
                </button>
                <button type="button" onClick={() => toast.success("Consent video loaded.")} className="p-3 border border-border rounded-lg bg-card hover:border-primary text-left transition-colors">
                  <Play className="size-4 text-primary mb-2" />
                  <p className="font-semibold">OTP Consent Verification guidelines</p>
                  <p className="text-[10px] text-muted-foreground">Completed 08 Mar 2026</p>
                </button>
              </div>
            </SectionCard>
          </div>

          {/* CERTIFICATE & QUIZ PANEL */}
          <div className="space-y-6">
            <SectionCard title="Certificates & Badging">
              <div className="space-y-4 text-xs text-center p-2">
                <Award className="size-12 text-primary mx-auto" />
                <div>
                  <h4 className="font-semibold text-foreground">Verified Agent Badge</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Valid badge is required to act on client applications.
                  </p>
                </div>
                {account !== "new" ? (
                  <div className="space-y-2">
                    <Button size="sm" className="w-full flex items-center gap-1 justify-center" onClick={() => toast.success("Certificate PDF downloaded.")}>
                      <FileText className="size-4" /> Download Certificate
                    </Button>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => toast.info("Triggered renewal course plan.")}>
                      Initiate Early Renewal
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" className="w-full" onClick={handleStartQuiz}>
                    Start Assessment Exam
                  </Button>
                )}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* VIDEO MODULE PLAYER OVERLAY */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-[500px] rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-overlay)] text-center space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-2 text-xs">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <GraduationCap className="size-5 text-primary" /> Playing Module: {activeVideo.name}
                </h3>
              </div>
              
              <div className="aspect-video w-full rounded-lg bg-neutral-900 border border-border flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-neutral-800 flex flex-col items-center justify-center text-xs text-neutral-200 p-4">
                  <span className="animate-pulse font-semibold">🔴 VIDEO TUTORIAL ACTIVE</span>
                  <p className="mt-4 max-w-[40ch] text-[10px] text-muted-foreground text-center">
                    {activeVideo.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end">
                <Button size="sm" onClick={handleVideoComplete}>
                  Mark Module Completed
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE ASSESSMENT QUIZ */}
        {activeQuiz && (() => {
          const currentQ = quizQuestions[currentQuestion];
          if (!currentQ) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <div className="w-full max-w-[460px] rounded-xl border border-border bg-card p-6 shadow-xl space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <Award className="size-5 text-primary" /> Compliance Quiz Assessment
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <p className="font-semibold text-foreground">
                    Question {currentQuestion + 1} of {quizQuestions.length}: {currentQ.q}
                  </p>
                  <div className="space-y-2">
                    {currentQ.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-3 rounded border text-xs transition-colors ${selectedAnswer === idx ? "border-primary bg-primary/5 font-semibold text-foreground" : "border-border hover:bg-neutral-50"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setActiveQuiz(false)}>Cancel</Button>
                  <Button size="sm" disabled={selectedAnswer === null} onClick={handleNextQuestion}>
                    {currentQuestion + 1 === quizQuestions.length ? "Submit Assessment" : "Next Question"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </PortalShell>
  );
}
