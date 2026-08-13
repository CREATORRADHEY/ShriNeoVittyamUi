import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { 
  Check, Save, ArrowRight, ShieldCheck, AlertCircle, 
  Search, FileText, CheckCircle2, Clock, Calculator, 
  HelpCircle, Eye, EyeOff, Upload, Camera, AlertTriangle, 
  ChevronRight, Lock, RotateCcw, ExternalLink
} from "lucide-react";

import { PortalShell } from "@/components/portal/portal-shell";
import { InlineState, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/format";
import { usePrototype } from "@/prototype/state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/borrower/application")({
  head: () => ({
    meta: [
      { title: "Loan Application — ShriNeo Capital" },
      {
        name: "description",
        content: "Complete your ShriNeo Capital loan application under one unified digital banking journey.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ApplicationFlow,
});

// The 10 Steps journey mapping
const STEPS = [
  { id: 1, label: "Select Loan Type" },
  { id: 2, label: "Loan Requirement" },
  { id: 3, label: "Personal Details" },
  { id: 4, label: "Employment & Income" },
  { id: 5, label: "Loan-specific Details" },
  { id: 6, label: "Obligations & Bank Data" },
  { id: 7, label: "Documents & Verification" },
  { id: 8, label: "Credit Profile & Matching" },
  { id: 9, label: "Review & Submit" },
  { id: 10, label: "Offers & Tracking" },
];

export function ApplicationFlow() {
  const navigate = useNavigate();
  const { device, data, application, set: setProto } = usePrototype();
  const isMobile = device === "mobile";

  // Check if we are resuming an active tracking application from the prototype toolbar
  const isApprovedOrTracking = 
    application !== "draft" && 
    application !== "closed";

  // Set default starting step depending on prototype application state
  const [step, setStep] = useState(isApprovedOrTracking ? 10 : 1);
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "error">("saved");

  // --- Core Application States ---
  const [loanType, setLoanType] = useState<"home" | "mortgage" | "personal" | "business" | "sachet">("personal");
  
  // Step 2 Requirement
  const [loanAmount, setLoanAmount] = useState("350000");
  const [loanTenure, setLoanTenure] = useState("36");
  const [loanPurpose, setLoanPurpose] = useState("Business expansion");
  const [productSubtype, setProductSubtype] = useState("Ready Property Purchase");
  const [fundsRequiredWhen, setFundsRequiredWhen] = useState("within_30_days");

  // Step 3 Personal
  const [fullName, setFullName] = useState("Rahul Kumar Sharma");
  const [dob, setDob] = useState("1992-08-15");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("rahul.sharma@gmail.com");
  const [maritalStatus, setMaritalStatus] = useState("Married");
  const [fatherOrSpouseName, setFatherOrSpouseName] = useState("Vijay Sharma");
  const [motherName, setMotherName] = useState("Sunita Sharma");
  const [dependentsCount, setDependentsCount] = useState("2");
  const [childrenCount, setChildrenCount] = useState("1");
  const [nationality, setNationality] = useState("Indian");
  
  // Current Address
  const [addressHouse, setAddressHouse] = useState("Flat 402, Block C");
  const [addressStreet, setAddressStreet] = useState("Green Glen Layout");
  const [addressLandmark, setAddressLandmark] = useState("Opposite HDFC Bank");
  const [addressPin, setAddressPin] = useState("560103");
  const [addressCity, setAddressCity] = useState("Bengaluru");
  const [addressState, setAddressState] = useState("Karnataka");
  
  const [residenceType, setResidenceType] = useState("Owned");
  const [timeAtAddress, setTimeAtAddress] = useState("4 years");
  const [isPermanentSame, setIsPermanentSame] = useState(true);
  
  // Permanent Address (Conditional)
  const [permHouse, setPermHouse] = useState("");
  const [permStreet, setPermStreet] = useState("");
  const [permPin, setPermPin] = useState("");
  
  // Identity Basic
  const [panAvailable, setPanAvailable] = useState(true);
  const [pan, setPan] = useState("BPKPS1234E");
  const [form60, setForm60] = useState("");
  const [ckycId, setCkycId] = useState("");
  const [preferredOvd, setPreferredOvd] = useState("DigiLocker Aadhaar");

  // Step 4 Employment & Income
  const [occupationType, setOccupationType] = useState<"salaried" | "self_employed_business" | "self_employed_professional" | "gig" | "other">("salaried");
  
  // Salaried Fields
  const [employerName, setEmployerName] = useState("Infosys Technologies Ltd");
  const [employmentType, setEmploymentType] = useState("Permanent");
  const [designation, setDesignation] = useState("Senior Software Engineer");
  const [joiningDate, setJoiningDate] = useState("2021-04-12");
  const [employerIndustry, setEmployerIndustry] = useState("Information Technology");
  const [totalExperience, setTotalExperience] = useState("6 years");
  const [grossSalary, setGrossSalary] = useState("85000");
  const [netSalary, setNetSalary] = useState("72000");
  const [salaryMode, setSalaryMode] = useState("Bank Transfer");
  const [salaryBank, setSalaryBank] = useState("HDFC Bank");
  const [officialEmail, setOfficialEmail] = useState("rahul.sharma@infosys.com");
  const [workAddress, setWorkAddress] = useState("Electronic City Phase 1, Bengaluru");
  const [otherMonthlyIncome, setOtherMonthlyIncome] = useState("0");

  // Self-Employed Fields
  const [bizName, setBizName] = useState("Sharma Enterprise");
  const [bizConstitution, setBizConstitution] = useState("Proprietorship");
  const [bizNature, setBizNature] = useState("Retail Store");
  const [bizRegDate, setBizRegDate] = useState("2019-11-20");
  const [bizVintage, setBizVintage] = useState("6 years");
  const [bizAddress, setBizAddress] = useState("Main Bazar Road, Bengaluru");
  const [bizGrossTurnover, setBizGrossTurnover] = useState("1800000");
  const [bizNetProfit, setBizNetProfit] = useState("320000");
  const [bizGstStatus, setBizGstStatus] = useState("registered");
  const [bizGstNumber, setBizGstNumber] = useState("29ABCDE1234F1Z5");
  const [bizUdyamStatus, setBizUdyamStatus] = useState("registered");
  const [bizUdyamNumber, setBizUdyamNumber] = useState("UDYAM-KR-03-0012845");
  const [bizItrStatus, setBizItrStatus] = useState("filed");
  const [bizBank, setBizBank] = useState("ICICI Bank");

  // Step 5 Product-specific
  // Home Loan
  const [homeSubtype, setHomeSubtype] = useState("Ready Property Purchase");
  const [propertyIdentified, setPropertyIdentified] = useState(true);
  const [propertyStatus, setPropertyStatus] = useState("Under Construction");
  const [propertyAddress, setPropertyAddress] = useState("Apt 12B, Sunrise Heights, Bengaluru");
  const [propertyCost, setPropertyCost] = useState("6500000");
  const [propertyDownPayment, setPropertyDownPayment] = useState("1500000");
  const [builderDetails, setBuilderDetails] = useState("Sobha Developers");
  const [newOrResale, setNewOrResale] = useState("New");
  const [bookingStatus, setBookingStatus] = useState("Booked");
  const [proposedOwnership, setProposedOwnership] = useState("Self (100%)");
  const [plotOwner, setPlotOwner] = useState("");
  const [plotArea, setPlotArea] = useState("");
  const [approvedPlanStatus, setApprovedPlanStatus] = useState("Approved");
  const [constructionEstimate, setConstructionEstimate] = useState("0");
  const [constructionStage, setConstructionStage] = useState("");
  const [coApplicantRole, setCoApplicantRole] = useState("None");
  const [coApplicantName, setCoApplicantName] = useState("");

  // Mortgage / LAP
  const [lapEndUse, setLapEndUse] = useState("Business Expansion");
  const [lapOwners, setLapOwners] = useState("Rahul Sharma");
  const [lapPropertyType, setLapPropertyType] = useState("Residential House");
  const [lapPropertyAddress, setLapPropertyAddress] = useState("Main Bazar Road, Bengaluru");
  const [lapMarketValue, setLapMarketValue] = useState("4500000");
  const [lapTitleStatus, setLapTitleStatus] = useState("Clear");
  const [lapExistingCharge, setLapExistingCharge] = useState(false);
  const [lapLenderDetails, setLapLenderDetails] = useState("");
  const [lapRentalIncome, setLapRentalIncome] = useState("0");

  // Business Loan
  const [bizLoanPurpose, setBizLoanPurpose] = useState("Working Capital");
  const [bizExistingLoans, setBizExistingLoans] = useState("0");
  const [bizStockValue, setBizStockValue] = useState("250000");
  const [bizReceivables, setBizReceivables] = useState("100000");
  const [bizCustomers, setBizCustomers] = useState("Multiple Local Retail Buyers");

  // Sachet Loan
  const [sachetUse, setSachetUse] = useState("Personal");
  const [sachetFrequency, setSachetFrequency] = useState("monthly");
  const [sachetPaymentMode, setSachetPaymentMode] = useState("UPI mandate");
  const [sachetOngoingEmi, setSachetOngoingEmi] = useState("2000");
  const [sachetOverdueDecl, setSachetOverdueDecl] = useState(false);

  // Step 6 Financial Obligations & Bank
  const [ongoingEmi, setOngoingEmi] = useState("15000");
  const [hasOverdue, setHasOverdue] = useState(false);
  const [overdueDetails, setOverdueDetails] = useState("");
  const [primaryBank, setPrimaryBank] = useState("HDFC Bank");
  const [primaryBankAccountType, setPrimaryBankAccountType] = useState("Savings");
  const [bankStatementMethod, setBankStatementMethod] = useState<"aa" | "pdf">("aa");
  const [aaStatus, setAaStatus] = useState<"idle" | "connecting" | "success" | "failed">("idle");

  // Step 7 Documents & KYC
  const [ovdMethod, setOvdMethod] = useState<"digilocker" | "camera" | "upload">("digilocker");
  const [selfieTriggered, setSelfieTriggered] = useState(false);
  const [selfieStatus, setSelfieStatus] = useState<"not_taken" | "taking" | "success">("not_taken");
  const [ocrConfirmationShown, setOcrConfirmationShown] = useState(false);
  
  // Document lists status state
  const [docList, setDocList] = useState<Record<string, "Required" | "Uploaded" | "Under review" | "Accepted" | "Rejected">>({
    "PAN / Form 60": "Required",
    "Aadhaar Card": "Required",
    "6 Months Bank Statements": "Required",
    "Latest 3 Salary Slips": "Required",
    "Latest ITR": "Required",
    "Property Title Deeds": "Required",
    "GST Registration": "Required"
  });

  // Step 8 Credit Profile
  const [cibilScore, setCibilScore] = useState<number | "NH" | "checking" | "failed">("checking");
  const [cibilConsent, setCibilConsent] = useState(false);
  const [snvScore, setSnvScore] = useState<number | "calculating">(78);
  const [lenderSharingConsent, setLenderSharingConsent] = useState(false);

  // Step 9 Review & Submission
  const [consentAccuracy, setConsentAccuracy] = useState(false);
  const [consentBureau, setConsentBureau] = useState(false);
  const [consentKyc, setConsentKyc] = useState(false);
  const [consentAA, setConsentAA] = useState(false);
  const [consentSharing, setConsentSharing] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);

  // Error validations state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simulation handlers
  useEffect(() => {
    // Autosave simulator
    if (step > 1 && step < 10) {
      setSaveStatus("saving");
      const id = setTimeout(() => {
        setSaveStatus(data === "failed" ? "error" : "saved");
      }, 600);
      return () => clearTimeout(id);
    }
  }, [step, loanType, loanAmount, grossSalary, fullName, data]);

  // CIBIL lookup simulator
  useEffect(() => {
    if (step === 8 && cibilConsent && cibilScore === "checking") {
      const id = setTimeout(() => {
        setCibilScore(data === "failed" ? "failed" : 745);
      }, 1500);
      return () => clearTimeout(id);
    }
  }, [step, cibilConsent, cibilScore, data]);

  // Validation engine for required fields
  const validateStep = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (step === 2) {
      if (!loanAmount || Number(loanAmount) <= 0) {
        nextErrors.loanAmount = "Loan amount is mandatory.";
      }
      if (!loanTenure) {
        nextErrors.loanTenure = "Tenure selection is mandatory.";
      }
    }

    if (step === 3) {
      if (!fullName.trim()) nextErrors.fullName = "Legal name is mandatory.";
      if (!dob) nextErrors.dob = "Date of birth is mandatory.";
      if (!addressHouse.trim()) nextErrors.addressHouse = "House/Flat number is mandatory.";
      if (!addressPin.trim() || addressPin.length !== 6) nextErrors.addressPin = "A valid 6-digit PIN is mandatory.";
      if (panAvailable && (!pan.trim() || pan.length !== 10)) {
        nextErrors.pan = "A valid 10-character PAN is mandatory.";
      }
      if (!panAvailable && !form60.trim()) {
        nextErrors.form60 = "Form 60 declaration detail is required when PAN is unavailable.";
      }
    }

    if (step === 4) {
      if (occupationType === "salaried") {
        if (!employerName.trim()) nextErrors.employerName = "Employer name is mandatory.";
        if (!grossSalary || Number(grossSalary) <= 0) nextErrors.grossSalary = "Salary input is mandatory.";
        if (!salaryBank.trim()) nextErrors.salaryBank = "Salary credit bank account details are mandatory.";
      } else if (occupationType === "self_employed_business" || occupationType === "self_employed_professional") {
        if (!bizName.trim()) nextErrors.bizName = "Business name is mandatory.";
        if (!bizGrossTurnover || Number(bizGrossTurnover) <= 0) nextErrors.bizGrossTurnover = "Annual turnover is mandatory.";
        if (bizGstStatus === "registered" && !bizGstNumber.trim()) {
          nextErrors.bizGstNumber = "GSTIN is mandatory since you declared GST registration.";
        }
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateStep()) return;
    
    if (step === 9) {
      // Form Submission
      setProto("application", "lender-review");
      setStep(10);
    } else {
      setStep((s) => Math.min(10, s + 1));
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSaveExit = () => {
    // Navigate back to dashboard preserving mock database state
    navigate({ to: "/app/borrower" });
  };

  const triggerNeoHelp = (message: string) => {
    window.dispatchEvent(
      new CustomEvent("shrineo:open-neo", {
        detail: { message }
      })
    );
  };

  // Stepper calculations
  const progressPercentage = Math.round((step / 10) * 100);

  // Filter dynamic document requirements according to current loan product selection & income branch
  const getRequiredDocuments = () => {
    const list = [];
    list.push({ name: "PAN / Form 60", status: docList["PAN / Form 60"]!, type: "M" });
    list.push({ name: "Aadhaar Card", status: docList["Aadhaar Card"]!, type: "M" });
    
    if (bankStatementMethod === "pdf") {
      list.push({ name: "6 Months Bank Statements", status: docList["6 Months Bank Statements"]!, type: "M" });
    }

    if (occupationType === "salaried") {
      list.push({ name: "Latest 3 Salary Slips", status: docList["Latest 3 Salary Slips"]!, type: "M" });
      list.push({ name: "Latest Form 16 / ITR", status: docList["Latest ITR"]!, type: "R" });
    } else {
      list.push({ name: "Latest 2 Years ITR filings", status: docList["Latest ITR"]!, type: "M" });
      if (bizGstStatus === "registered") {
        list.push({ name: "GST Registration & Returns", status: docList["GST Registration"]!, type: "CM", reason: "Required because you selected GST-registered business" });
      }
    }

    if (loanType === "home") {
      list.push({ name: "Property Booking Agreement / Builder Cost Sheet", status: docList["Property Title Deeds"]!, type: "M" });
    } else if (loanType === "mortgage") {
      list.push({ name: "Property Title Deeds & Tax Receipts", status: docList["Property Title Deeds"]!, type: "M" });
    }

    return list;
  };

  // Helper labels for CIBIL / SNV Trust
  const renderCibilScoreLabel = () => {
    if (!cibilConsent) return "Consent Required";
    if (cibilScore === "checking") return "Checking Bureau Report...";
    if (cibilScore === "failed") return "Failed — Try Again";
    return cibilScore.toString();
  };

  return (
    <PortalShell
      role="borrower"
      title={`${loanType ? loanType.toUpperCase() : "LOAN"} APPLICATION`}
      subtitle={!isMobile ? `Step ${step} of 10 — ${STEPS[step - 1]!.label}` : undefined}
    >
      {/* Dynamic Header / Stepper Container */}
      <div className="rounded-xl border border-[#DDE7F5] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F1FB] px-2.5 py-0.5 text-xs font-semibold text-[#0051AE]">
              Active Selection: {loanType ? loanType.charAt(0).toUpperCase() + loanType.slice(1) + " Loan" : "Not Chosen"}
            </span>
            <h2 className="editorial mt-1 text-xl font-bold text-foreground">
              {STEPS[step - 1]!.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Autosave badge indicator */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground" role="status" aria-live="polite">
              {saveStatus === "saving" && <span className="size-2 animate-ping rounded-full bg-amber-400" />}
              {saveStatus === "saved" && <Check className="size-3.5 text-emerald-500" />}
              {saveStatus === "error" && <AlertTriangle className="size-3.5 text-rose-500" />}
              <span className="font-mono uppercase tracking-wide">
                {saveStatus === "saving" && "Saving…"}
                {saveStatus === "saved" && "Saved"}
                {saveStatus === "error" && "Unable to save (Offline)"}
              </span>
            </div>

            <Button variant="outline" size="sm" onClick={handleSaveExit}>
              Save & Exit
            </Button>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>{isMobile ? `Step ${step} of 10` : `Progress`}</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-100">
            <div 
              className="h-full rounded-full bg-[#002B98] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Desktop Detailed Stepper Labels */}
        {!isMobile && (
          <ol className="mt-4 flex flex-wrap gap-2 text-[10.5px] font-semibold text-muted-foreground border-t pt-3" aria-label="Step Checklist">
            {STEPS.map((s) => {
              const isActive = s.id === step;
              const isPast = s.id < step;
              return (
                <li 
                  key={s.id}
                  className={cn(
                    "flex items-center gap-1 px-1 py-0.5 rounded",
                    isActive && "text-[#002B98] font-bold bg-[#E6F1FB]",
                    isPast && "text-emerald-600"
                  )}
                >
                  {isPast ? <Check className="size-3" /> : <span>{s.id}</span>}
                  <span>{s.label}</span>
                  {s.id < 10 && <ChevronRight className="size-3 text-muted-foreground/45" />}
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {/* Main Form Fields Viewport */}
      <div className="mt-6 min-h-[320px] rounded-xl border border-[#DDE7F5] bg-white p-5 shadow-sm sm:p-7">
        
        {/* STEP 1: Select Loan Type */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Select Loan Type</h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                { type: "personal", title: "Personal Loan", desc: "For medical, travel, wedding or emergency needs." },
                { type: "business", title: "Business Loan", desc: "For working capital, inventory, or business expansion." },
                { type: "home", title: "Home Loan", desc: "For purchasing property, self-construction or plots." },
                { type: "mortgage", title: "Mortgage / LAP", desc: "Loan Against Property for general long-term funding." },
                { type: "sachet", title: "Nano / Sachet Loan", desc: "Micro-credit up to ₹1 Lakh with rapid digital approval." }
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setLoanType(item.type as any)}
                  className={cn(
                    "flex flex-col p-4 rounded-lg border text-left transition-all",
                    loanType === item.type 
                      ? "border-[#002B98] bg-[#FAFBFF] shadow-sm ring-1 ring-[#002B98]"
                      : "border-[#DDE7F5] bg-white hover:bg-neutral-50"
                  )}
                >
                  <span className="font-semibold text-[#002B98]">{item.title}</span>
                  <span className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 p-3.5 bg-neutral-50 rounded-lg flex items-start gap-2.5">
              <HelpCircle className="size-4 shrink-0 text-muted-foreground mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Your loan choice determines the specific documentation and lender eligibility thresholds shown later.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Loan Requirement */}
        {step === 2 && (
          <div className="max-w-xl">
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Loan Requirements</h3>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="req-amount">Required loan amount (INR)</Label>
                <Input
                  id="req-amount"
                  inputMode="numeric"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value.replace(/\D/g, ""))}
                  className="num"
                  aria-invalid={Boolean(errors.loanAmount)}
                />
                <p className="text-xs text-muted-foreground">
                  Indian Currency Format Preview: <strong className="text-foreground">{formatINR(Number(loanAmount || 0))}</strong>
                </p>
                {errors.loanAmount && <p className="text-xs text-rose-600 font-semibold">{errors.loanAmount}</p>}
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="req-tenure">Preferred tenure (Months)</Label>
                <select
                  id="req-tenure"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                  <option value="60">60 Months</option>
                  <option value="120">120 Months (Home/Mortgage)</option>
                  <option value="240">240 Months (Home Loan only)</option>
                </select>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="req-purpose">Loan Purpose</Label>
                <Input
                  id="req-purpose"
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  placeholder="E.g. Medical bill payment, business stock purchase..."
                />
              </div>

              {/* Conditionally Mandatory: Subtype for Home Loans */}
              {(loanType === "home" || loanType === "mortgage") && (
                <div className="grid gap-1.5 p-3 rounded-lg border border-[#DDE7F5] bg-neutral-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                    Conditionally Mandatory alert
                  </span>
                  <Label htmlFor="product-subtype">Property/Home Loan Subtype</Label>
                  <select
                    id="product-subtype"
                    value={productSubtype}
                    onChange={(e) => setProductSubtype(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="Ready Property Purchase">Ready Property Purchase</option>
                    <option value="Self-construction">Self-construction</option>
                    <option value="Plot Purchase + Construction">Plot Purchase + Construction</option>
                  </select>
                  <p className="text-[11px] text-muted-foreground">
                    * Required because you selected Home or Mortgage loan type.
                  </p>
                </div>
              )}

              <div className="grid gap-1.5">
                <Label htmlFor="funds-when" className="flex items-center gap-1">
                  When are funds required? 
                  <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Recommended</span>
                </Label>
                <select
                  id="funds-when"
                  value={fundsRequiredWhen}
                  onChange={(e) => setFundsRequiredWhen(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="immediate">Immediate (within 7 days)</option>
                  <option value="within_30_days">Within 30 Days</option>
                  <option value="within_90_days">Within 90 Days</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Personal & Address Details */}
        {step === 3 && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-[#002B98] mb-4">Personal Details</h3>
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="full-name">Full legal name (as per KYC documents)</Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && <p className="text-xs text-rose-600 font-semibold">{errors.fullName}</p>}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="verified-mobile">Verified mobile number (Read-only)</Label>
                  <Input id="verified-mobile" value="+91 9876543210" disabled className="bg-neutral-50" />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="dob">Date of birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    aria-invalid={Boolean(errors.dob)}
                  />
                  {errors.dob && <p className="text-xs text-rose-600 font-semibold">{errors.dob}</p>}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Third Gender">Third Gender</option>
                  </select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="marital-status">Marital Status</Label>
                  <select
                    id="marital-status"
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                {/* Conditionally Mandatory spouse name */}
                {maritalStatus === "Married" && (
                  <div className="grid gap-1.5 p-3 rounded-lg border border-[#DDE7F5] bg-neutral-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                      Conditionally Mandatory alert
                    </span>
                    <Label htmlFor="spouse-name">Spouse's Name</Label>
                    <Input
                      id="spouse-name"
                      value={fatherOrSpouseName}
                      onChange={(e) => setFatherOrSpouseName(e.target.value)}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      * Required because your marital status is Married.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#002B98] mb-4">Address & Identity Details</h3>
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="addr-house">House / Flat number</Label>
                  <Input
                    id="addr-house"
                    value={addressHouse}
                    onChange={(e) => setAddressHouse(e.target.value)}
                    aria-invalid={Boolean(errors.addressHouse)}
                  />
                  {errors.addressHouse && <p className="text-xs text-rose-600 font-semibold">{errors.addressHouse}</p>}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="addr-street">Street / Area</Label>
                  <Input id="addr-street" value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="addr-pin">Postal PIN Code</Label>
                  <Input
                    id="addr-pin"
                    inputMode="numeric"
                    maxLength={6}
                    value={addressPin}
                    onChange={(e) => setAddressPin(e.target.value.replace(/\D/g, ""))}
                    aria-invalid={Boolean(errors.addressPin)}
                  />
                  {errors.addressPin && <p className="text-xs text-rose-600 font-semibold">{errors.addressPin}</p>}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="addr-res-type">Residence Type</Label>
                  <select
                    id="addr-res-type"
                    value={residenceType}
                    onChange={(e) => setResidenceType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="Owned">Owned</option>
                    <option value="Rented">Rented</option>
                    <option value="Family">Family owned</option>
                    <option value="Company">Company provided</option>
                  </select>
                </div>

                <div className="grid gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pan-available-toggle">Do you have a valid PAN card?</Label>
                    <input
                      type="checkbox"
                      id="pan-available-toggle"
                      checked={panAvailable}
                      onChange={(e) => setPanAvailable(e.target.checked)}
                      className="size-4 text-primary"
                    />
                  </div>
                </div>

                {/* Branch PAN vs Form 60 */}
                {panAvailable ? (
                  <div className="grid gap-1.5 p-3 rounded-lg border border-[#DDE7F5] bg-neutral-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                      Conditionally Mandatory alert
                    </span>
                    <Label htmlFor="pan-number">Permanent Account Number (PAN)</Label>
                    <Input
                      id="pan-number"
                      maxLength={10}
                      className="uppercase font-mono"
                      value={pan}
                      onChange={(e) => setPan(e.target.value)}
                      aria-invalid={Boolean(errors.pan)}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      * Required because PAN is available.
                    </p>
                    {errors.pan && <p className="text-xs text-rose-600 font-semibold">{errors.pan}</p>}
                  </div>
                ) : (
                  <div className="grid gap-1.5 p-3 rounded-lg border border-amber-200 bg-amber-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase">
                      Conditionally Mandatory alert
                    </span>
                    <Label htmlFor="form-60-declaration">Form 60 Details / Reasons</Label>
                    <Input
                      id="form-60-declaration"
                      placeholder="Why PAN is unavailable..."
                      value={form60}
                      onChange={(e) => setForm60(e.target.value)}
                      aria-invalid={Boolean(errors.form60)}
                    />
                    <p className="text-[11px] text-amber-800">
                      * Required because you do not have a PAN card. Form 60 will be submitted.
                    </p>
                    {errors.form60 && <p className="text-xs text-rose-700 font-semibold">{errors.form60}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Employment & Income */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Employment & Income</h3>
            
            <div className="max-w-xl grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="occ-type">Primary Occupation / Income Type</Label>
                <select
                  id="occ-type"
                  value={occupationType}
                  onChange={(e) => setOccupationType(e.target.value as any)}
                  className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-semibold text-[#002B98]"
                >
                  <option value="salaried">Salaried (Government / Private / Contract)</option>
                  <option value="self_employed_business">Self-Employed Business / Proprietor</option>
                  <option value="self_employed_professional">Self-Employed Professional (CA, Dr, Lawyer)</option>
                  <option value="gig">Gig / Informal (Delivery, Freelancer)</option>
                  <option value="other">Other Supported Income</option>
                </select>
              </div>

              {/* SALARIED BRANCH */}
              {occupationType === "salaried" && (
                <div className="grid gap-4 border border-[#DDE7F5] rounded-xl p-4 bg-[#FAFBFF] animate-in fade-in duration-200">
                  <h4 className="font-bold text-[#002B98] text-sm">Salaried Income details</h4>
                  
                  <div className="grid gap-1.5">
                    <Label htmlFor="emp-name">Employer Name</Label>
                    <Input id="emp-name" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
                    {errors.employerName && <p className="text-xs text-rose-600 font-semibold">{errors.employerName}</p>}
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="emp-type">Employment type</Label>
                    <select
                      id="emp-type"
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm"
                    >
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                      <option value="Government">Government</option>
                    </select>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="gross-salary">Gross Monthly Salary (INR)</Label>
                    <Input
                      id="gross-salary"
                      inputMode="numeric"
                      value={grossSalary}
                      onChange={(e) => setGrossSalary(e.target.value.replace(/\D/g, ""))}
                      className="num"
                    />
                    <p className="text-xs text-muted-foreground">
                      Formatted: <strong className="text-foreground">{formatINR(Number(grossSalary || 0))}</strong>
                    </p>
                    {errors.grossSalary && <p className="text-xs text-rose-600 font-semibold">{errors.grossSalary}</p>}
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="salary-bank">Salary Credit Bank</Label>
                    <Input id="salary-bank" value={salaryBank} onChange={(e) => setSalaryBank(e.target.value)} />
                    {errors.salaryBank && <p className="text-xs text-rose-600 font-semibold">{errors.salaryBank}</p>}
                  </div>
                </div>
              )}

              {/* SELF-EMPLOYED BRANCH */}
              {(occupationType === "self_employed_business" || occupationType === "self_employed_professional") && (
                <div className="grid gap-4 border border-[#DDE7F5] rounded-xl p-4 bg-[#FAFBFF] animate-in fade-in duration-200">
                  <h4 className="font-bold text-[#002B98] text-sm">Business Income details</h4>
                  
                  <div className="grid gap-1.5">
                    <Label htmlFor="biz-name">Business / Practice Legal Name</Label>
                    <Input id="biz-name" value={bizName} onChange={(e) => setBizName(e.target.value)} />
                    {errors.bizName && <p className="text-xs text-rose-600 font-semibold">{errors.bizName}</p>}
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="biz-constitution">Constitution</Label>
                    <select
                      id="biz-constitution"
                      value={bizConstitution}
                      onChange={(e) => setBizConstitution(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm"
                    >
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="LLP">LLP</option>
                      <option value="Company">Private Limited Company</option>
                    </select>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="biz-turnover">Gross Annual Turnover (INR)</Label>
                    <Input
                      id="biz-turnover"
                      inputMode="numeric"
                      value={bizGrossTurnover}
                      onChange={(e) => setBizGrossTurnover(e.target.value.replace(/\D/g, ""))}
                      className="num"
                    />
                    <p className="text-xs text-muted-foreground">
                      Formatted: <strong className="text-foreground">{formatINR(Number(bizGrossTurnover || 0))}</strong>
                    </p>
                    {errors.bizGrossTurnover && <p className="text-xs text-rose-600 font-semibold">{errors.bizGrossTurnover}</p>}
                  </div>

                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="gst-status-toggle">Is this business GST registered?</Label>
                      <input
                        type="checkbox"
                        id="gst-status-toggle"
                        checked={bizGstStatus === "registered"}
                        onChange={(e) => setBizGstStatus(e.target.checked ? "registered" : "unregistered")}
                        className="size-4"
                      />
                    </div>
                  </div>

                  {/* Conditionally Mandatory: GSTIN */}
                  {bizGstStatus === "registered" && (
                    <div className="grid gap-1.5 p-3 rounded-lg border border-[#DDE7F5] bg-white animate-in fade-in duration-200">
                      <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                        Conditionally Mandatory alert
                      </span>
                      <Label htmlFor="gstin-number">GSTIN number</Label>
                      <Input
                        id="gstin-number"
                        maxLength={15}
                        className="uppercase font-mono"
                        value={bizGstNumber}
                        onChange={(e) => setBizGstNumber(e.target.value)}
                      />
                      <p className="text-[11px] text-muted-foreground">
                        * Required because business is declared GST-registered.
                      </p>
                      {errors.bizGstNumber && <p className="text-xs text-rose-600 font-semibold">{errors.bizGstNumber}</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Loan-specific Details */}
        {step === 5 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Loan-specific Information</h3>

            {/* HOME LOAN DETAILS */}
            {loanType === "home" && (
              <div className="max-w-xl grid gap-4 animate-in fade-in duration-200">
                <div className="grid gap-1.5">
                  <Label htmlFor="prop-cost">Total property value / Construction cost (INR)</Label>
                  <Input
                    id="prop-cost"
                    inputMode="numeric"
                    value={propertyCost}
                    onChange={(e) => setPropertyCost(e.target.value.replace(/\D/g, ""))}
                    className="num"
                  />
                  <p className="text-xs text-muted-foreground">
                    Formatted: <strong className="text-foreground">{formatINR(Number(propertyCost || 0))}</strong>
                  </p>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="down-payment">Your down payment contribution (INR)</Label>
                  <Input
                    id="down-payment"
                    inputMode="numeric"
                    value={propertyDownPayment}
                    onChange={(e) => setPropertyDownPayment(e.target.value.replace(/\D/g, ""))}
                    className="num"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="builder-details">Builder / Seller Details</Label>
                  <Input id="builder-details" value={builderDetails} onChange={(e) => setBuilderDetails(e.target.value)} />
                </div>
              </div>
            )}

            {/* MORTGAGE / LAP DETAILS */}
            {loanType === "mortgage" && (
              <div className="max-w-xl grid gap-4 animate-in fade-in duration-200">
                <div className="grid gap-1.5">
                  <Label htmlFor="lap-market-value">Estimated Property Market Value (INR)</Label>
                  <Input
                    id="lap-market-value"
                    inputMode="numeric"
                    value={lapMarketValue}
                    onChange={(e) => setLapMarketValue(e.target.value.replace(/\D/g, ""))}
                    className="num"
                  />
                  <p className="text-xs text-muted-foreground">
                    Formatted: <strong className="text-foreground">{formatINR(Number(lapMarketValue || 0))}</strong>
                  </p>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="lap-owners">Registered Property Owner Name(s)</Label>
                  <Input id="lap-owners" value={lapOwners} onChange={(e) => setLapOwners(e.target.value)} />
                </div>
              </div>
            )}

            {/* BUSINESS LOAN DETAILS */}
            {loanType === "business" && (
              <div className="max-w-xl grid gap-4 animate-in fade-in duration-200">
                <div className="grid gap-1.5">
                  <Label htmlFor="biz-purpose">Specific business facility end-use</Label>
                  <select
                    id="biz-purpose"
                    value={bizLoanPurpose}
                    onChange={(e) => setBizLoanPurpose(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                  >
                    <option value="Working Capital">Working Capital</option>
                    <option value="Capex">Machinery Purchase (Capex)</option>
                    <option value="Inventory">Inventory Purchase</option>
                  </select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="biz-stock">Estimated Stock / Inventory Value (INR)</Label>
                  <Input
                    id="biz-stock"
                    inputMode="numeric"
                    value={bizStockValue}
                    onChange={(e) => setBizStockValue(e.target.value.replace(/\D/g, ""))}
                    className="num"
                  />
                </div>
              </div>
            )}

            {/* SACHET / NANO DETAILS */}
            {loanType === "sachet" && (
              <div className="max-w-xl grid gap-4 animate-in fade-in duration-200">
                <div className="grid gap-1.5">
                  <Label htmlFor="sachet-usage">Sachet loan purpose</Label>
                  <select
                    id="sachet-usage"
                    value={sachetUse}
                    onChange={(e) => setSachetUse(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                  >
                    <option value="Personal">Personal micro-expenses</option>
                    <option value="Business">Business micro-working capital</option>
                  </select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="sachet-freq">Income Frequency</Label>
                  <select
                    id="sachet-freq"
                    value={sachetFrequency}
                    onChange={(e) => setSachetFrequency(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily / Gig wages</option>
                  </select>
                </div>
              </div>
            )}

            {/* PERSONAL LOAN DETAILS */}
            {loanType === "personal" && (
              <div className="max-w-xl animate-in fade-in duration-200">
                <InlineState
                  tone="success"
                  title="No property property-specific modules needed"
                  explanation="Personal loans are unsecured. We skip the property/business collateral requirements."
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 6: Financial Obligations & Bank Data */}
        {step === 6 && (
          <div className="max-w-xl grid gap-6">
            <div>
              <h3 className="text-lg font-bold text-[#002B98] mb-4">Financial Obligations</h3>
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="monthly-emi">Total ongoing monthly loan repayments (EMIs) in INR</Label>
                  <Input
                    id="monthly-emi"
                    inputMode="numeric"
                    value={ongoingEmi}
                    onChange={(e) => setOngoingEmi(e.target.value.replace(/\D/g, ""))}
                    className="num"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter <strong className="text-foreground">0</strong> if you have no ongoing monthly obligations.
                  </p>
                </div>

                <div className="grid gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="overdue-toggle">Do you have any currently overdue credit balances?</Label>
                    <input
                      type="checkbox"
                      id="overdue-toggle"
                      checked={hasOverdue}
                      onChange={(e) => setHasOverdue(e.target.checked)}
                      className="size-4"
                    />
                  </div>
                </div>

                {hasOverdue && (
                  <div className="grid gap-1.5 p-3 rounded-lg border border-[#DDE7F5] bg-neutral-50 animate-in fade-in duration-200">
                    <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                      Conditionally Mandatory alert
                    </span>
                    <Label htmlFor="overdue-details">Provide details of overdue / defaulted accounts</Label>
                    <Input
                      id="overdue-details"
                      placeholder="Lender name, amount overdue..."
                      value={overdueDetails}
                      onChange={(e) => setOverdueDetails(e.target.value)}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      * Required since you declared active overdue accounts.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-5">
              <h3 className="text-lg font-bold text-[#002B98] mb-4">Select Statement Verification Method</h3>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setBankStatementMethod("aa")}
                  className={cn(
                    "flex flex-col p-4 rounded-lg border text-left transition-all",
                    bankStatementMethod === "aa"
                      ? "border-[#002B98] bg-[#FAFBFF] ring-1 ring-[#002B98]"
                      : "border-[#DDE7F5] bg-white hover:bg-neutral-50"
                  )}
                >
                  <span className="font-semibold text-[#002B98] flex items-center gap-1.5">
                    Account Aggregator (AA)
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold uppercase">
                      Recommended
                    </span>
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Consent-based direct fetch from your bank account. Safe, fast, and password-free.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setBankStatementMethod("pdf")}
                  className={cn(
                    "flex flex-col p-4 rounded-lg border text-left transition-all",
                    bankStatementMethod === "pdf"
                      ? "border-[#002B98] bg-[#FAFBFF] ring-1 ring-[#002B98]"
                      : "border-[#DDE7F5] bg-white hover:bg-neutral-50"
                  )}
                >
                  <span className="font-semibold text-foreground">Upload statement PDF</span>
                  <span className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Fallback mode. Manually select and upload password-protected or clear bank PDF statements.
                  </span>
                </button>
              </div>

              {bankStatementMethod === "aa" && (
                <div className="mt-4 p-4 border rounded-xl bg-[#E6F1FB]/60 border-[#DDE5F0] animate-in fade-in duration-200">
                  <h4 className="font-bold text-[#0A286F] text-sm flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-[#0051AE]" />
                    Secure Account Aggregator Flow
                  </h4>
                  <p className="mt-1.5 text-xs text-[#5B657D] leading-relaxed">
                    We will send a read-only fetch request to your linked bank account. **ShriNeo Capital will never ask for your internet banking password, PINs, or card credentials.**
                  </p>
                  
                  <div className="mt-4 flex items-center gap-3">
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setAaStatus("connecting");
                        setTimeout(() => setAaStatus("success"), 1500);
                      }}
                      disabled={aaStatus === "success"}
                    >
                      {aaStatus === "connecting" ? "Connecting Aggregator..." : aaStatus === "success" ? "Statements Connected" : "Fetch via Aggregator"}
                    </Button>
                    {aaStatus === "success" && (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <Check className="size-3.5" /> Statements retrieved successfully
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 7: Documents & Identity Verification */}
        {step === 7 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Verification & Document Uploads</h3>
            
            <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
              <div className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Upload files for verification. Document period: <strong className="text-foreground font-semibold">Upload Apr-Sep 2026 statements</strong> (based on standard 6 months bank configuration).
                </p>

                {/* Dynamic document card list */}
                <div className="grid gap-3">
                  {getRequiredDocuments().map((doc) => (
                    <div 
                      key={doc.name} 
                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#DDE7F5] bg-neutral-50 px-4 py-3"
                    >
                      <div>
                        <span className="text-sm font-semibold text-foreground">{doc.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold bg-neutral-200 text-muted-foreground px-1.5 py-0.5 rounded uppercase">
                            {doc.type === "M" ? "Mandatory" : doc.type === "CM" ? "Conditionally Mandatory" : "Recommended"}
                          </span>
                          {doc.reason && (
                            <span className="text-[10px] text-amber-700 italic">
                              {doc.reason}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <StatusBadge tone={doc.status === "Uploaded" ? "success" : "neutral"}>{doc.status}</StatusBadge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setDocList(prev => ({ ...prev, [doc.name]: "Uploaded" }));
                          }}
                        >
                          {doc.status === "Required" ? "Upload File" : "Replace"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selfie Liveness triggering check */}
                {selfieTriggered ? (
                  <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 animate-in fade-in duration-200">
                    <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase">
                      Liveness verification required
                    </span>
                    <h4 className="font-bold text-[#806126] text-sm mt-1">Regulated Lender Live Selfie Check</h4>
                    <p className="mt-1 text-xs text-[#806A42] leading-relaxed">
                      Lenders require a verified face selfie matching CKYC registry to complete loan review.
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelfieStatus("taking");
                          setTimeout(() => {
                            setSelfieStatus("success");
                          }, 1500);
                        }}
                      >
                        {selfieStatus === "taking" ? "Verifying Face..." : selfieStatus === "success" ? "Selfie Verified" : "Capture Selfie"}
                      </Button>
                      {selfieStatus === "success" && (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="size-3.5" /> Liveness matches PAN
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-fit"
                    onClick={() => setSelfieTriggered(true)}
                  >
                    Simulate regulated lender liveness check trigger
                  </Button>
                )}
              </div>

              {/* Sidebar with extracted OCR details */}
              <div className="border border-[#DDE7F5] rounded-xl p-4 bg-[#F8FAFD]">
                <h4 className="font-bold text-[#002B98] text-sm">Extracted Document Data Confirmation</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Values read from uploaded OVD and PAN. Mismatches will require manual confirmation.
                </p>

                <dl className="mt-4 space-y-3 divide-y divide-neutral-100">
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <dt className="text-muted-foreground">Extracted Name</dt>
                    <dd className="font-semibold text-foreground">RAHUL KUMAR SHARMA</dd>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <dt className="text-muted-foreground">Extracted DOB</dt>
                    <dd className="font-semibold text-foreground">15-08-1992</dd>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <dt className="text-muted-foreground">Extracted Address PIN</dt>
                    <dd className="font-semibold text-foreground">560103</dd>
                  </div>
                </dl>

                <div className="mt-4 p-3 bg-white rounded-lg border text-xs">
                  <p className="font-semibold text-[#002B98]">Verification status check</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Matches PAN database name: <strong className="text-emerald-600 font-bold">100% Match</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: Credit Profile & Matching */}
        {step === 8 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Credit Profile Matching</h3>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Bureau CIBIL Card */}
              <div className="rounded-xl border border-[#DDE7F5] bg-white p-5 shadow-sm">
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">CIBIL Credit Score</h4>
                
                <div className="my-5 flex flex-col justify-center min-h-[90px]">
                  {cibilScore === "checking" ? (
                    <div className="flex items-center gap-2">
                      <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      <span className="text-sm text-muted-foreground">Retrieving bureau records...</span>
                    </div>
                  ) : cibilScore === "failed" ? (
                    <div className="flex items-center gap-2 text-rose-600">
                      <AlertCircle className="size-5" />
                      <span className="text-sm font-semibold">Bureau connection timeout</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-extrabold text-[#002B98] tracking-tight">{cibilScore}</span>
                      <p className="text-xs text-muted-foreground mt-1">Status: Verified Available</p>
                    </div>
                  )}
                </div>

                {!cibilConsent ? (
                  <div className="grid gap-2 border-t pt-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We require your explicit consent before checking bureau records. This will not trigger a hard enquiry footprints.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCibilConsent(true);
                        setCibilScore("checking");
                      }}
                      className="w-full inline-flex h-9 items-center justify-center rounded-lg bg-[#002B98] text-xs font-semibold text-white hover:bg-[#001A5C]"
                    >
                      Provide Consent & Check Credit Profile
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 border-t pt-3 text-xs text-emerald-600 font-semibold">
                    <Check className="size-4" /> Consent Authorized
                  </div>
                )}
              </div>

              {/* SNV Trust Score Card */}
              <div className="rounded-xl border border-[#DDE7F5] bg-white p-5 shadow-sm">
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">SNV Trust Score</h4>

                <div className="my-5 flex flex-col justify-center min-h-[90px]">
                  <span className="text-4xl font-extrabold text-emerald-600 tracking-tight">{snvScore}</span>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Advisory score computed from transactional cash flows and bank statement verification.
                  </p>
                </div>

                <div className="border-t pt-3 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Source-data: Verified Bank Data</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSnvScore("calculating" as any);
                      setTimeout(() => setSnvScore(82), 1200);
                    }}
                  >
                    Recalculate Score
                  </Button>
                </div>
              </div>
            </div>

            {/* Lender Sharing Consent */}
            <div className="mt-6 border rounded-xl p-4 bg-[#F8FAFD]">
              <h4 className="font-bold text-[#002B98] text-sm">Lender Sharing Consent Summary</h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                By submitting this application, you authorize ShriNeo Capital to share your verified profile packet (Name, PAN, Bank Statements, CIBIL, and SNV Trust Score) with named regulated lending partners for loan underwriting checks.
              </p>
              
              <div className="mt-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="lender-sharing-consent-toggle"
                  checked={lenderSharingConsent}
                  onChange={(e) => setLenderSharingConsent(e.target.checked)}
                  className="size-4"
                />
                <label htmlFor="lender-sharing-consent-toggle" className="text-xs font-semibold text-foreground">
                  I agree to share my application details with participating lenders. **The regulated lender makes the final credit decision.**
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 9: Review, Consent & Submit */}
        {step === 9 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Review and Submit Application</h3>

            <div className="grid gap-6">
              {/* Summary table */}
              <div className="rounded-xl border border-[#DDE7F5] overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 text-muted-foreground font-semibold border-b">
                      <th className="p-3">Section</th>
                      <th className="p-3">Details</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {[
                      { section: "Loan Requirement", detail: `₹${formatINR(Number(loanAmount))} for ${loanTenure} Months`, stepNum: 2 },
                      { section: "Personal Details", detail: `${fullName} (${dob})`, stepNum: 3 },
                      { section: "Occupation & Income", detail: `${occupationType === "salaried" ? "Salaried at " + employerName : "Self-employed business owner"}`, stepNum: 4 },
                      { section: "Bank Statement credit", detail: `${primaryBank} (${primaryBankAccountType} account)`, stepNum: 6 }
                    ].map((row) => (
                      <tr key={row.section}>
                        <td className="p-3 font-semibold text-foreground">{row.section}</td>
                        <td className="p-3 text-muted-foreground">{row.detail}</td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => setStep(row.stepNum)}
                            className="text-[#002B98] font-bold hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Separate unchecked consent checkboxes */}
              <div className="grid gap-3 bg-[#FAF8F5] border border-[#E9E1D2] rounded-xl p-4">
                <h4 className="font-bold text-[#806126] text-sm">Regulatory Declarations & Consents</h4>
                
                <div className="grid gap-3">
                  {[
                    { id: "consent-acc", checked: consentAccuracy, set: setConsentAccuracy, label: "Application declaration: I declare all details entered are true and accurate." },
                    { id: "consent-bur", checked: consentBureau, set: setConsentBureau, label: "Credit bureau access: I authorize pulls from TransUnion CIBIL for matching check." },
                    { id: "consent-kyc", checked: consentKyc, set: setConsentKyc, label: "DigiLocker KYC: I consent to e-KYC document retrieval for identity validation." },
                    { id: "consent-share", checked: consentSharing, set: setConsentSharing, label: "Lender sharing: I consent to share my verified scores and details with named banks." },
                    { id: "consent-mkt", checked: consentMarketing, set: setConsentMarketing, label: "Optional Marketing consent: Send me update alerts about loan features. (Can remain unticked)", optional: true }
                  ].map((c) => (
                    <div key={c.id} className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id={c.id}
                        checked={c.checked}
                        onChange={(e) => c.set(e.target.checked)}
                        className="mt-0.5 size-4"
                      />
                      <label htmlFor={c.id} className="text-xs text-foreground leading-snug">
                        {c.label} {c.optional && <span className="text-muted-foreground font-normal">(Optional)</span>}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 10: Offers & Application Tracking */}
        {step === 10 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Lender Offers & Live Tracking</h3>

            <div className="grid gap-6">
              {/* Application Details Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-xl bg-neutral-50">
                <div>
                  <span className="text-xs text-muted-foreground font-mono">Master Application ID</span>
                  <p className="text-base font-bold text-foreground font-mono">APP-2026-001284</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Requested Loan</span>
                  <p className="text-sm font-semibold text-foreground">₹3.5 Lakhs (Personal Loan)</p>
                </div>
                <div>
                  <StatusBadge tone="success">Processing Matched Offers</StatusBadge>
                </div>
              </div>

              {/* Matched Offers Table List */}
              <div>
                <h4 className="font-bold text-foreground text-sm mb-3">Matching Lender Offers (Neutral comparison)</h4>
                
                <div className="rounded-xl border border-[#DDE7F5] overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 text-muted-foreground font-semibold border-b">
                        <th className="p-3">Lender Name</th>
                        <th className="p-3">Offered Amount</th>
                        <th className="p-3">Tenure</th>
                        <th className="p-3">APR (Interest)</th>
                        <th className="p-3">Monthly Repayment</th>
                        <th className="p-3 text-center">Key Fact Statement</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {[
                        { id: "off1", lender: "SBI Digital Finance", amount: 350000, tenure: 36, apr: 11.5, emi: 11540, fee: 3500 },
                        { id: "off2", lender: "HDFC Bank Spark", amount: 320000, tenure: 36, apr: 12.2, emi: 10650, fee: 3000 },
                        { id: "off3", lender: "ICICI Instant Credit", amount: 350000, tenure: 36, apr: 12.9, emi: 11780, fee: 4000 }
                      ].map((offer) => (
                        <tr key={offer.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-3 font-semibold text-foreground">{offer.lender}</td>
                          <td className="p-3 font-semibold text-[#002B98]">₹{formatINR(offer.amount)}</td>
                          <td className="p-3">{offer.tenure} Months</td>
                          <td className="p-3">{offer.apr}% APR</td>
                          <td className="p-3 font-semibold">₹{formatINR(offer.emi)}/mo</td>
                          <td className="p-3 text-center">
                            <Link 
                              to="/key-fact-statement" 
                              className="text-[#0051AE] inline-flex items-center gap-1 hover:underline"
                            >
                              View KFS
                              <ExternalLink className="size-3" />
                            </Link>
                          </td>
                          <td className="p-3 text-right">
                            <Button 
                              size="sm" 
                              onClick={() => {
                                alert(`Selected offer from ${offer.lender}. Starting disbursal setup.`);
                                setProto("application", "disbursed");
                              }}
                            >
                              Select Offer
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2.5 text-[11px] text-muted-foreground italic text-center">
                  * Offers ranked strictly by total cost (lowest APR first) to ensure neutral, transparent borrower options.
                </p>
              </div>

              {/* Lender-wise status tracking list */}
              <div className="border-t pt-5">
                <h4 className="font-bold text-foreground text-sm mb-3">Participating Lender Review Status</h4>
                
                <div className="grid gap-3">
                  {[
                    { lender: "SBI Digital Finance", status: "Offer received", tone: "success" as const, desc: "Offer generated and ready for your review." },
                    { lender: "HDFC Bank Spark", status: "Offer received", tone: "success" as const, desc: "Offer generated and ready for your review." },
                    { lender: "ICICI Instant Credit", status: "Offer received", tone: "success" as const, desc: "Offer generated and ready for your review." },
                    { lender: "Axis Bank Direct", status: "Declined", tone: "neutral" as const, desc: "Income limits fell outside standard credit guidelines." }
                  ].map((item) => (
                    <div 
                      key={item.lender}
                      className="flex flex-wrap items-center justify-between gap-3 p-3.5 border rounded-lg bg-neutral-50/50"
                    >
                      <div>
                        <span className="text-sm font-semibold text-foreground">{item.lender}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Navigation Action Panel */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-4">
        {step > 1 && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}

        <Button
          onClick={handleContinue}
          disabled={
            (step === 8 && !cibilConsent) ||
            (step === 9 && (!consentAccuracy || !consentBureau || !consentSharing))
          }
          className="cta-saffron bg-[#FF9800] text-white hover:bg-[#E68A00]"
        >
          {step === 9 ? "Agree & Submit Application" : step === 10 ? "Finish Journey" : "Save & Continue"}
        </Button>

        {/* Quick Contextual Assist Button for Neo */}
        <button
          type="button"
          onClick={() => {
            const stepQ: Record<number, string> = {
              1: "How do I choose the correct loan type?",
              2: "What is APR and loan tenure calculation?",
              3: "Why do you need my PAN card?",
              4: "What documents represent net monthly salary?",
              5: "What property details are required for ready purchase?",
              6: "How does Account Aggregator verify bank data?",
              7: "Why was my document upload rejected?",
              8: "What is the difference between CIBIL and SNV Trust Score?",
              9: "Can I review and edit sections before submission?"
            };
            triggerNeoHelp(stepQ[step] ?? "How do I apply for a loan on ShriNeo?");
          }}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#D6E5F7] bg-[#E6F1FB] px-3.5 py-1.5 text-xs font-semibold text-[#002B98] transition-colors hover:border-[#0051AE] hover:bg-[#D6E8F7]"
        >
          <HelpCircle className="size-3.5" />
          Ask Neo about Step {step}
        </button>
      </div>
    </PortalShell>
  );
}
