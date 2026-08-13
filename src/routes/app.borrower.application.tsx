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
import { toast } from "sonner";

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
  const [coApplicantDob, setCoApplicantDob] = useState("");
  const [coApplicantPan, setCoApplicantPan] = useState("");
  const [coApplicantAadhaar, setCoApplicantAadhaar] = useState("");
  const [coApplicantIncome, setCoApplicantIncome] = useState("");
  const [coApplicantOccupation, setCoApplicantOccupation] = useState("Salaried");
  const [coApplicantConsent, setCoApplicantConsent] = useState(false);
  const [coApplicantAadhaarFile, setCoApplicantAadhaarFile] = useState<string | null>(null);
  const [coApplicantPanFile, setCoApplicantPanFile] = useState<string | null>(null);
  const [coApplicantIncomeFile, setCoApplicantIncomeFile] = useState<string | null>(null);

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
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  // Step 7 Documents & KYC
  const [ovdMethod, setOvdMethod] = useState<"digilocker" | "camera" | "upload">("digilocker");
  const [selfieTriggered, setSelfieTriggered] = useState(false);
  const [selfieStatus, setSelfieStatus] = useState<"not_taken" | "taking" | "success">("not_taken");
  const [ocrConfirmationShown, setOcrConfirmationShown] = useState(false);
  
  // Document lists status state
  const [docList, setDocList] = useState<Record<string, "Required" | "Uploaded" | "Under review" | "Accepted" | "Rejected">>({
    "PAN / Form 60": "Accepted",
    "Aadhaar Card": "Under review",
    "6 Months Bank Statements": "Rejected",
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
  const [activeKfsOffer, setActiveKfsOffer] = useState<any>(null);
  const [consentMarketing, setConsentMarketing] = useState(false);

  // Error validations state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simulation handlers
  useEffect(() => {
    // Autosave simulator
    let id: any;
    if (step > 1 && step < 10) {
      setSaveStatus("saving");
      id = setTimeout(() => {
        setSaveStatus(data === "failed" ? "error" : "saved");
      }, 600);
    }
    return () => {
      if (id) clearTimeout(id);
    };
  }, [step, loanType, loanAmount, grossSalary, fullName, data]);

  // CIBIL lookup simulator
  useEffect(() => {
    let id: any;
    if (step === 8 && cibilConsent && cibilScore === "checking") {
      id = setTimeout(() => {
        setCibilScore(data === "failed" ? "failed" : 745);
      }, 1500);
    }
    return () => {
      if (id) clearTimeout(id);
    };
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
      if (!addressStreet.trim()) nextErrors.addressStreet = "Street/Area is mandatory.";
      if (!addressPin.trim() || addressPin.length !== 6) nextErrors.addressPin = "A valid 6-digit PIN is mandatory.";
      if (!addressCity.trim()) nextErrors.addressCity = "City is mandatory.";
      if (!addressState.trim()) nextErrors.addressState = "State is mandatory.";
      if (!timeAtAddress.trim()) nextErrors.timeAtAddress = "Time at current address is mandatory.";
      if (!nationality.trim()) nextErrors.nationality = "Nationality is mandatory.";
      
      if (!isPermanentSame) {
        if (!permHouse.trim()) nextErrors.permHouse = "Permanent House/Flat number is mandatory.";
        if (!permStreet.trim()) nextErrors.permStreet = "Permanent Street/Area is mandatory.";
        if (!permPin.trim() || permPin.length !== 6) nextErrors.permPin = "A valid 6-digit Permanent PIN is mandatory.";
      }

      if (panAvailable && (!pan.trim() || pan.length !== 10)) {
        nextErrors.pan = "A valid 10-character PAN is mandatory.";
      }
      if (!panAvailable && !form60.trim()) {
        nextErrors.form60 = "Form 60 declaration detail is required when PAN is unavailable.";
      }
      if (!preferredOvd) {
        nextErrors.preferredOvd = "Selecting a preferred OVD type is mandatory.";
      }
    }

    if (step === 4) {
      if (occupationType === "salaried") {
        if (!employerName.trim()) nextErrors.employerName = "Employer name is mandatory.";
        if (!grossSalary || Number(grossSalary) <= 0) nextErrors.grossSalary = "Salaried gross monthly salary is mandatory.";
        if (!netSalary || Number(netSalary) <= 0) nextErrors.netSalary = "Net monthly take-home salary is mandatory.";
        if (!salaryBank.trim()) nextErrors.salaryBank = "Salary credit bank account details are mandatory.";
        if (!salaryMode) nextErrors.salaryMode = "Salary payment mode is mandatory.";
      } else if (occupationType === "self_employed_business" || occupationType === "self_employed_professional") {
        if (!bizName.trim()) nextErrors.bizName = "Business name is mandatory.";
        if (!bizConstitution) nextErrors.bizConstitution = "Business constitution is mandatory.";
        if (!bizNature.trim()) nextErrors.bizNature = "Nature of business/profession is mandatory.";
        if (!bizGrossTurnover || Number(bizGrossTurnover) <= 0) nextErrors.bizGrossTurnover = "Annual turnover is mandatory.";
        if (!bizNetProfit || Number(bizNetProfit) <= 0) nextErrors.bizNetProfit = "Net profit / taxable income is mandatory.";
        if (!bizBank.trim()) nextErrors.bizBank = "Business bank details are mandatory.";
        if (bizGstStatus === "registered" && (!bizGstNumber.trim() || bizGstNumber.length !== 15)) {
          nextErrors.bizGstNumber = "A valid 15-character GSTIN is mandatory since you declared GST registration.";
        }
        if (bizUdyamStatus === "registered" && !bizUdyamNumber.trim()) {
          nextErrors.bizUdyamNumber = "Udyam registration number is mandatory since you claimed Udyam registration.";
        }
      } else if (occupationType === "gig") {
        if (!bizName.trim()) nextErrors.bizName = "Gig platform name / activity details are mandatory.";
        if (!grossSalary || Number(grossSalary) <= 0) nextErrors.grossSalary = "Average monthly earnings input is mandatory.";
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
      subtitle={!isMobile ? `Step ${step} of 10 — ${STEPS[step - 1]!.label}` : ""}
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
              {loanType === "home" && (
                <div className="grid gap-1.5 p-3 rounded-lg border border-[#DDE7F5] bg-neutral-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                    Conditionally Mandatory alert
                  </span>
                  <Label htmlFor="product-subtype-home">Home Loan Subtype</Label>
                  <select
                    id="product-subtype-home"
                    value={productSubtype}
                    onChange={(e) => setProductSubtype(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="Ready Property Purchase">Ready Property Purchase</option>
                    <option value="Self-Construction">Self-Construction</option>
                    <option value="Plot Purchase + Construction">Plot Purchase + Construction</option>
                  </select>
                  <p className="text-[11px] text-muted-foreground">
                    * Required because you selected Home Loan type.
                  </p>
                </div>
              )}

              {loanType === "mortgage" && (
                <div className="grid gap-1.5 p-3 rounded-lg border border-[#DDE7F5] bg-neutral-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                    Conditionally Mandatory alert
                  </span>
                  <Label htmlFor="product-subtype-lap">Mortgage / LAP Subtype</Label>
                  <select
                    id="product-subtype-lap"
                    value={productSubtype}
                    onChange={(e) => setProductSubtype(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="Commercial Property LAP">Commercial Property LAP</option>
                    <option value="Residential Property LAP">Residential Property LAP</option>
                    <option value="Plot LAP">Plot LAP</option>
                  </select>
                  <p className="text-[11px] text-muted-foreground">
                    * Required because you selected Mortgage / LAP loan type.
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
                  <Label htmlFor="personal-email" className="flex items-center gap-1">
                    Email Address
                    <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Recommended</span>
                  </Label>
                  <Input
                    id="personal-email"
                    type="email"
                    placeholder="E.g. rahul.sharma@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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

                {/* Conditionally Mandatory father or spouse name */}
                <div className="grid gap-1.5">
                  <Label htmlFor="spouse-name" className="flex items-center gap-1">
                    Father's or Spouse's Name
                    {maritalStatus === "Married" ? (
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold uppercase">
                        Conditionally Mandatory
                      </span>
                    ) : (
                      <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Recommended</span>
                    )}
                  </Label>
                  <Input
                    id="spouse-name"
                    value={fatherOrSpouseName}
                    onChange={(e) => setFatherOrSpouseName(e.target.value)}
                    placeholder="Enter full name of father or spouse"
                  />
                  {maritalStatus === "Married" && (
                    <p className="text-[10px] text-amber-700 italic">
                      * Required because your marital status is Married.
                    </p>
                  )}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="mother-name" className="flex items-center gap-1">
                    Mother's Name
                    <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Recommended</span>
                  </Label>
                  <Input
                    id="mother-name"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    placeholder="Enter mother's full legal name"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="nationality-status">Nationality & Residential Status</Label>
                  <Input
                    id="nationality-status"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="dependents-count" className="flex items-center gap-1">
                      No. of Dependants
                      <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Rec.</span>
                    </Label>
                    <Input
                      id="dependents-count"
                      type="number"
                      value={dependentsCount}
                      onChange={(e) => setDependentsCount(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="children-count" className="flex items-center gap-1">
                      No. of Children
                      <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Optional</span>
                    </Label>
                    <Input
                      id="children-count"
                      type="number"
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#002B98] mb-4">Current Address & Identity</h3>
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
                  <Input
                    id="addr-street"
                    value={addressStreet}
                    onChange={(e) => setAddressStreet(e.target.value)}
                    aria-invalid={Boolean(errors.addressStreet)}
                  />
                  {errors.addressStreet && <p className="text-xs text-rose-600 font-semibold">{errors.addressStreet}</p>}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="addr-landmark">Landmark</Label>
                  <Input
                    id="addr-landmark"
                    value={addressLandmark}
                    onChange={(e) => setAddressLandmark(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="addr-pin">PIN Code</Label>
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
                    <Label htmlFor="addr-city">City</Label>
                    <Input
                      id="addr-city"
                      value={addressCity}
                      onChange={(e) => setAddressCity(e.target.value)}
                      aria-invalid={Boolean(errors.addressCity)}
                    />
                    {errors.addressCity && <p className="text-xs text-rose-600 font-semibold">{errors.addressCity}</p>}
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="addr-state">State</Label>
                    <Input
                      id="addr-state"
                      value={addressState}
                      onChange={(e) => setAddressState(e.target.value)}
                      aria-invalid={Boolean(errors.addressState)}
                    />
                    {errors.addressState && <p className="text-xs text-rose-600 font-semibold">{errors.addressState}</p>}
                  </div>
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
                  <Label htmlFor="addr-time">Time at Current Address</Label>
                  <Input
                    id="addr-time"
                    value={timeAtAddress}
                    onChange={(e) => setTimeAtAddress(e.target.value)}
                    placeholder="E.g. 3 years, 6 months"
                    aria-invalid={Boolean(errors.timeAtAddress)}
                  />
                  {errors.timeAtAddress && <p className="text-xs text-rose-600 font-semibold">{errors.timeAtAddress}</p>}
                </div>

                <div className="grid gap-1.5 border border-dashed rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="perm-same-toggle" className="font-semibold">Permanent address same as current?</Label>
                    <input
                      type="checkbox"
                      id="perm-same-toggle"
                      checked={isPermanentSame}
                      onChange={(e) => setIsPermanentSame(e.target.checked)}
                      className="size-4 text-primary"
                    />
                  </div>

                  {/* Conditionally Mandatory Permanent Address details */}
                  {!isPermanentSame && (
                    <div className="grid gap-3 mt-3 pt-3 border-t animate-in fade-in duration-200">
                      <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                        Conditionally Mandatory Alert
                      </span>
                      <p className="text-[11px] text-muted-foreground -mt-1">
                        * Required because permanent address is declared different.
                      </p>

                      <div className="grid gap-1.5">
                        <Label htmlFor="perm-house">Permanent House / Flat number</Label>
                        <Input
                          id="perm-house"
                          value={permHouse}
                          onChange={(e) => setPermHouse(e.target.value)}
                          aria-invalid={Boolean(errors.permHouse)}
                        />
                        {errors.permHouse && <p className="text-xs text-rose-600 font-semibold">{errors.permHouse}</p>}
                      </div>

                      <div className="grid gap-1.5">
                        <Label htmlFor="perm-street">Permanent Street / Area</Label>
                        <Input
                          id="perm-street"
                          value={permStreet}
                          onChange={(e) => setPermStreet(e.target.value)}
                          aria-invalid={Boolean(errors.permStreet)}
                        />
                        {errors.permStreet && <p className="text-xs text-rose-600 font-semibold">{errors.permStreet}</p>}
                      </div>

                      <div className="grid gap-1.5">
                        <Label htmlFor="perm-pin">Permanent PIN Code</Label>
                        <Input
                          id="perm-pin"
                          maxLength={6}
                          inputMode="numeric"
                          value={permPin}
                          onChange={(e) => setPermPin(e.target.value.replace(/\D/g, ""))}
                          aria-invalid={Boolean(errors.permPin)}
                        />
                        {errors.permPin && <p className="text-xs text-rose-600 font-semibold">{errors.permPin}</p>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-3 pt-3 border-t">
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

                  {/* Branch PAN vs Form 60 */}
                  {panAvailable ? (
                    <div className="grid gap-1.5 p-3 rounded-lg border border-[#DDE7F5] bg-neutral-50 animate-in fade-in duration-200">
                      <span className="text-[10px] font-bold text-red-600 tracking-wider uppercase">
                        {Number(loanAmount) > 50000 
                          ? "Mandatory because: loan amount > 50,000" 
                          : "Mandatory"}
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
                        {Number(loanAmount) > 50000 
                          ? "* Required under RBI tax compliance guidelines for loans above ₹50,000." 
                          : "* Required for KYC verification."}
                      </p>
                      {errors.pan && <p className="text-xs text-rose-600 font-semibold">{errors.pan}</p>}
                    </div>
                  ) : (
                    <div className="grid gap-1.5 p-3 rounded-lg border border-amber-200 bg-amber-50 animate-in fade-in slide-in-from-top-1 duration-200">
                      <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase">
                        Conditionally Mandatory Alert
                      </span>
                      <Label htmlFor="form-60-declaration">Form 60 Details / Reasons</Label>
                      <Input
                        id="form-60-declaration"
                        placeholder="E.g. PAN card applied / agricultural income only..."
                        value={form60}
                        onChange={(e) => setForm60(e.target.value)}
                        aria-invalid={Boolean(errors.form60)}
                      />
                      <p className="text-[11px] text-amber-800">
                        * Required because PAN is unavailable. Form 60 will be submitted.
                      </p>
                      {errors.form60 && <p className="text-xs text-rose-700 font-semibold">{errors.form60}</p>}
                    </div>
                  )}

                  <div className="grid gap-1.5">
                    <Label htmlFor="preferred-ovd">Preferred Officially Valid Document (OVD) Type</Label>
                    <select
                      id="preferred-ovd"
                      value={preferredOvd}
                      onChange={(e) => setPreferredOvd(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <option value="DigiLocker Aadhaar">DigiLocker Aadhaar e-KYC (Recommended)</option>
                      <option value="Passport">Passport</option>
                      <option value="Voter ID Card">Voter ID Card</option>
                      <option value="Driving License">Driving License</option>
                    </select>
                    {errors.preferredOvd && <p className="text-xs text-rose-600 font-semibold">{errors.preferredOvd}</p>}
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="ckyc-id" className="flex items-center gap-1">
                      CKYC Identifier Number
                      <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Optional</span>
                    </Label>
                    <Input
                      id="ckyc-id"
                      value={ckycId}
                      onChange={(e) => setCkycId(e.target.value)}
                      placeholder="14-digit central KYC number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Employment & Income */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Employment & Income Details</h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="grid gap-1.5 mb-4">
                  <Label htmlFor="occ-type" className="font-semibold">Primary Occupation / Income Type</Label>
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
              </div>

              <div>
                {/* Empty right column for top selector spacing */}
              </div>
            </div>

            {/* SALARIED BRANCH */}
            {occupationType === "salaried" && (
              <div className="grid gap-6 md:grid-cols-2 border border-[#DDE7F5] rounded-xl p-5 bg-[#FAFBFF] animate-in fade-in duration-200">
                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Employer & Designation</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="emp-name">Employer Name</Label>
                      <Input id="emp-name" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
                      {errors.employerName && <p className="text-xs text-rose-600 font-semibold">{errors.employerName}</p>}
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="emp-type">Employment Type</Label>
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
                      <Label htmlFor="emp-designation">Designation</Label>
                      <Input id="emp-designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="emp-join-date">Joining Date with Current Employer</Label>
                      <Input id="emp-join-date" type="date" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="emp-industry" className="flex items-center gap-1">
                        Employer Industry / Type
                        <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Recommended</span>
                      </Label>
                      <Input id="emp-industry" value={employerIndustry} onChange={(e) => setEmployerIndustry(e.target.value)} />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="emp-experience" className="flex items-center gap-1">
                        Total Work Experience
                        <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Recommended</span>
                      </Label>
                      <Input id="emp-experience" value={totalExperience} onChange={(e) => setTotalExperience(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Salary & Bank details</h4>
                  <div className="grid gap-4">
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
                      <Label htmlFor="net-salary">Net Monthly Take-home Salary (INR)</Label>
                      <Input
                        id="net-salary"
                        inputMode="numeric"
                        value={netSalary}
                        onChange={(e) => setNetSalary(e.target.value.replace(/\D/g, ""))}
                        className="num"
                      />
                      <p className="text-xs text-muted-foreground">
                        Formatted: <strong className="text-foreground">{formatINR(Number(netSalary || 0))}</strong>
                      </p>
                      {errors.netSalary && <p className="text-xs text-rose-600 font-semibold">{errors.netSalary}</p>}
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="salary-mode">Salary Credit Mode</Label>
                      <select
                        id="salary-mode"
                        value={salaryMode}
                        onChange={(e) => setSalaryMode(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm"
                      >
                        <option value="Bank Transfer">Bank Transfer (Recommended)</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                      {errors.salaryMode && <p className="text-xs text-rose-600 font-semibold">{errors.salaryMode}</p>}
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="salary-bank">Salary Bank Account</Label>
                      <Input id="salary-bank" value={salaryBank} onChange={(e) => setSalaryBank(e.target.value)} />
                      {errors.salaryBank && <p className="text-xs text-rose-600 font-semibold">{errors.salaryBank}</p>}
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="official-email" className="flex items-center gap-1">
                        Official Work Email
                        <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Recommended</span>
                      </Label>
                      <Input id="official-email" value={officialEmail} onChange={(e) => setOfficialEmail(e.target.value)} />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="work-address" className="flex items-center gap-1">
                        Work Address
                        <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Recommended</span>
                      </Label>
                      <Input id="work-address" value={workAddress} onChange={(e) => setWorkAddress(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SELF-EMPLOYED BRANCH */}
            {(occupationType === "self_employed_business" || occupationType === "self_employed_professional") && (
              <div className="grid gap-6 md:grid-cols-2 border border-[#DDE7F5] rounded-xl p-5 bg-[#FAFBFF] animate-in fade-in duration-200">
                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Business Profile</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-name">Business / Profession Name</Label>
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
                        <option value="Professional Practice">Professional Practice (CA, Dr, Lawyer)</option>
                      </select>
                      {errors.bizConstitution && <p className="text-xs text-rose-600 font-semibold">{errors.bizConstitution}</p>}
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-nature">Nature of Business / Profession</Label>
                      <Input id="biz-nature" value={bizNature} onChange={(e) => setBizNature(e.target.value)} placeholder="E.g. Retail trade, Consulting" />
                      {errors.bizNature && <p className="text-xs text-rose-600 font-semibold">{errors.bizNature}</p>}
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-reg-date">Commencement / Registration Date</Label>
                      <Input id="biz-reg-date" type="date" value={bizRegDate} onChange={(e) => setBizRegDate(e.target.value)} />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-vintage">Business Vintage (Years)</Label>
                      <Input id="biz-vintage" value={bizVintage} onChange={(e) => setBizVintage(e.target.value)} placeholder="E.g. 5 years" />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-address">Business Operating Address</Label>
                      <Input id="biz-address" value={bizAddress} onChange={(e) => setBizAddress(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Financials & Registrations</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-turnover">Gross Annual Turnover / Receipts (INR)</Label>
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
                      <Label htmlFor="biz-net-profit">Net Profit or Taxable Income (INR)</Label>
                      <Input
                        id="biz-net-profit"
                        inputMode="numeric"
                        value={bizNetProfit}
                        onChange={(e) => setBizNetProfit(e.target.value.replace(/\D/g, ""))}
                        className="num"
                      />
                      <p className="text-xs text-muted-foreground">
                        Formatted: <strong className="text-foreground">{formatINR(Number(bizNetProfit || 0))}</strong>
                      </p>
                      {errors.bizNetProfit && <p className="text-xs text-rose-600 font-semibold">{errors.bizNetProfit}</p>}
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-bank-acc">Business Primary Bank Account</Label>
                      <Input id="biz-bank-acc" value={bizBank} onChange={(e) => setBizBank(e.target.value)} />
                      {errors.bizBank && <p className="text-xs text-rose-600 font-semibold">{errors.bizBank}</p>}
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-itr-status">ITR Filing Status</Label>
                      <select
                        id="biz-itr-status"
                        value={bizItrStatus}
                        onChange={(e) => setBizItrStatus(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm"
                      >
                        <option value="filed">Filed for Assessment Year 2026-27</option>
                        <option value="not_filed">Not Filed</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5 border rounded-lg p-3 bg-white">
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

                      {/* Conditionally Mandatory GSTIN */}
                      {bizGstStatus === "registered" && (
                        <div className="grid gap-1.5 mt-2 pt-2 border-t animate-in fade-in duration-200">
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
                          <p className="text-[10px] text-muted-foreground">
                            * Required because business is declared GST-registered.
                          </p>
                          {errors.bizGstNumber && <p className="text-xs text-rose-600 font-semibold">{errors.bizGstNumber}</p>}
                        </div>
                      )}
                    </div>

                    <div className="grid gap-1.5 border rounded-lg p-3 bg-white">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="udyam-status-toggle">Is this business registered under Udyam / MSME?</Label>
                        <input
                          type="checkbox"
                          id="udyam-status-toggle"
                          checked={bizUdyamStatus === "registered"}
                          onChange={(e) => setBizUdyamStatus(e.target.checked ? "registered" : "unregistered")}
                          className="size-4"
                        />
                      </div>

                      {/* Conditionally Mandatory Udyam Registration Number */}
                      {bizUdyamStatus === "registered" && (
                        <div className="grid gap-1.5 mt-2 pt-2 border-t animate-in fade-in duration-200">
                          <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                            Conditionally Mandatory alert
                          </span>
                          <Label htmlFor="udyam-number">Udyam Registration Number</Label>
                          <Input
                            id="udyam-number"
                            className="font-mono"
                            value={bizUdyamNumber}
                            onChange={(e) => setBizUdyamNumber(e.target.value)}
                          />
                          <p className="text-[10px] text-muted-foreground">
                            * Required because you claimed Udyam registration.
                          </p>
                          {errors.bizUdyamNumber && <p className="text-xs text-rose-600 font-semibold">{errors.bizUdyamNumber}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GIG / INFORMAL BRANCH */}
            {occupationType === "gig" && (
              <div className="grid gap-4 border border-[#DDE7F5] rounded-xl p-5 bg-[#FAFBFF] max-w-xl animate-in fade-in duration-200">
                <h4 className="font-bold text-[#002B98] text-sm">Gig / Informal Income Details</h4>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="platform-name">Gig Platform Names / Activity Description</Label>
                  <Input 
                    id="platform-name" 
                    value={bizName} 
                    onChange={(e) => setBizName(e.target.value)} 
                    placeholder="E.g. Swiggy delivery, Zomato, freelance web developer..." 
                  />
                  {errors.bizName && <p className="text-xs text-rose-600 font-semibold">{errors.bizName}</p>}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="gig-avg-receipts">Average Monthly Earnings (INR)</Label>
                  <Input
                    id="gig-avg-receipts"
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
                  <Label htmlFor="gig-payment-mode">Wages/Earnings Payment Mode</Label>
                  <select
                    id="gig-payment-mode"
                    value={salaryMode}
                    onChange={(e) => setSalaryMode(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm"
                  >
                    <option value="UPI mandate">UPI / Digital Transfer</option>
                    <option value="Bank Account Credit">Direct Bank Credit</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="gig-vintage-val" className="flex items-center gap-1">
                    Activity Vintage (Months/Years)
                    <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Recommended</span>
                  </Label>
                  <Input id="gig-vintage-val" value={totalExperience} onChange={(e) => setTotalExperience(e.target.value)} placeholder="E.g. 18 months" />
                </div>
              </div>
            )}

            {/* OTHER BRANCH */}
            {occupationType === "other" && (
              <div className="grid gap-4 border border-[#DDE7F5] rounded-xl p-5 bg-[#FAFBFF] max-w-xl animate-in fade-in duration-200">
                <h4 className="font-bold text-[#002B98] text-sm">Other Supported Income</h4>
                <p className="text-xs text-muted-foreground">
                  Lenders will review receipts such as pension, agricultural income or rent on a case-by-case basis.
                </p>

                <div className="grid gap-1.5">
                  <Label htmlFor="other-income-desc">Describe your source of income</Label>
                  <Input id="other-income-desc" placeholder="E.g. Monthly family pension, farm receipts..." />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="other-income-val">Monthly Income Value (INR)</Label>
                  <Input id="other-income-val" defaultValue="25000" className="num" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Loan-specific Details */}
        {step === 5 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Loan-specific Information</h3>

            {/* HOME LOAN DETAILS */}
            {loanType === "home" && (
              <div className="grid gap-6 md:grid-cols-2 animate-in fade-in duration-200">
                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Property Requirements</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="home-subtype">Home Loan Sub-type</Label>
                      <select
                        id="home-subtype"
                        value={homeSubtype}
                        onChange={(e) => setHomeSubtype(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <option value="Ready Property Purchase">Ready Property Purchase</option>
                        <option value="Self-Construction">Self-Construction</option>
                        <option value="Plot Purchase + Construction">Plot Purchase + Construction</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5 border rounded-lg p-3 bg-[#FAFBFF]">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="prop-identified-toggle" className="font-semibold">Has property been identified?</Label>
                        <input
                          type="checkbox"
                          id="prop-identified-toggle"
                          checked={propertyIdentified}
                          onChange={(e) => setPropertyIdentified(e.target.checked)}
                          className="size-4"
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        * Under RBI regulations, loan offers differ for identified vs unidentified property pipelines.
                      </p>
                    </div>

                    {propertyIdentified && (
                      <div className="grid gap-4 mt-2 p-3 border rounded-lg bg-neutral-50 animate-in fade-in duration-150">
                        <div className="grid gap-1.5">
                          <Label htmlFor="prop-address">Property Site Address</Label>
                          <Input
                            id="prop-address"
                            value={propertyAddress}
                            onChange={(e) => setPropertyAddress(e.target.value)}
                            placeholder="Enter property street address & city"
                          />
                        </div>

                        <div className="grid gap-1.5">
                          <Label htmlFor="prop-status">Property Status</Label>
                          <select
                            id="prop-status"
                            value={propertyStatus}
                            onChange={(e) => setPropertyStatus(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm"
                          >
                            <option value="Ready to Move">Ready to Move</option>
                            <option value="Under Construction">Under Construction</option>
                            <option value="Plot Only">Raw Plot</option>
                          </select>
                        </div>

                        <div className="grid gap-1.5">
                          <Label htmlFor="approved-plan-status">Plan / Structure Approval Status</Label>
                          <select
                            id="approved-plan-status"
                            value={approvedPlanStatus}
                            onChange={(e) => setApprovedPlanStatus(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm"
                          >
                            <option value="Approved">Approved by Municipal Corporation / RERA</option>
                            <option value="Pending">Approval Application Pending</option>
                            <option value="Unapproved">Unapproved Layout</option>
                          </select>
                        </div>

                        <div className="grid gap-1.5">
                          <Label htmlFor="prop-plot-area">Plot Area (Sq. Ft / Yards)</Label>
                          <Input
                            id="prop-plot-area"
                            value={plotArea}
                            onChange={(e) => setPlotArea(e.target.value)}
                            placeholder="E.g. 1200 sq.ft."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Financials & Co-Applicants</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="prop-cost">Total Property Cost / Valuation (INR)</Label>
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
                      <Label htmlFor="down-payment">Your Down Payment / Own Contribution (INR)</Label>
                      <Input
                        id="down-payment"
                        inputMode="numeric"
                        value={propertyDownPayment}
                        onChange={(e) => setPropertyDownPayment(e.target.value.replace(/\D/g, ""))}
                        className="num"
                      />
                      <p className="text-xs text-muted-foreground">
                        Formatted: <strong className="text-foreground">{formatINR(Number(propertyDownPayment || 0))}</strong>
                      </p>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="builder-details">Builder / Seller Details</Label>
                      <Input
                        id="builder-details"
                        value={builderDetails}
                        onChange={(e) => setBuilderDetails(e.target.value)}
                        placeholder="E.g. DLF, Sobha Developers, Private seller name"
                      />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="proposed-ownership">Proposed Ownership Shares / Distribution</Label>
                      <Input
                        id="proposed-ownership"
                        value={proposedOwnership}
                        onChange={(e) => setProposedOwnership(e.target.value)}
                        placeholder="E.g. Self 70%, Spouse 30%"
                      />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="co-applicant-role">Co-Applicant Relation</Label>
                      <select
                        id="co-applicant-role"
                        value={coApplicantRole}
                        onChange={(e) => setCoApplicantRole(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                      >
                        <option value="None">None</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Father">Father</option>
                        <option value="Son">Son</option>
                        <option value="Brother">Brother</option>
                      </select>
                    </div>

                    {coApplicantRole !== "None" && (
                      <div className="grid gap-4 p-4 rounded-xl border border-amber-200 bg-amber-50/80 shadow-sm animate-in fade-in duration-200">
                        <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                          <h5 className="font-bold text-[#002B98] text-xs uppercase tracking-wider">Co-Applicant Details</h5>
                          <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-semibold">REQUIRED</span>
                        </div>

                        {/* Profile Details */}
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="grid gap-1.5">
                            <Label htmlFor="co-applicant-name">Co-Applicant Legal Name</Label>
                            <Input
                              id="co-applicant-name"
                              value={coApplicantName}
                              onChange={(e) => setCoApplicantName(e.target.value)}
                              placeholder="Full name as in PAN"
                              required
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <Label htmlFor="co-applicant-dob">Date of Birth</Label>
                            <Input
                              id="co-applicant-dob"
                              type="date"
                              value={coApplicantDob}
                              onChange={(e) => setCoApplicantDob(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="grid gap-1.5">
                            <Label htmlFor="co-applicant-pan">PAN Number</Label>
                            <Input
                              id="co-applicant-pan"
                              value={coApplicantPan}
                              onChange={(e) => setCoApplicantPan(e.target.value.toUpperCase())}
                              placeholder="ABCDE1234F"
                              maxLength={10}
                              required
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <Label htmlFor="co-applicant-aadhaar">Aadhaar Card (Last 4 digits)</Label>
                            <Input
                              id="co-applicant-aadhaar"
                              value={coApplicantAadhaar}
                              onChange={(e) => setCoApplicantAadhaar(e.target.value.replace(/\D/g, ""))}
                              placeholder="1234"
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>

                        {/* Income Parameters */}
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="grid gap-1.5">
                            <Label htmlFor="co-applicant-income">Net Monthly Income (INR)</Label>
                            <Input
                              id="co-applicant-income"
                              inputMode="numeric"
                              value={coApplicantIncome}
                              onChange={(e) => setCoApplicantIncome(e.target.value.replace(/\D/g, ""))}
                              placeholder="E.g. 50000"
                              required
                            />
                            {coApplicantIncome && (
                              <p className="text-[10px] text-amber-800">
                                Formatted: {formatINR(Number(coApplicantIncome))}
                              </p>
                            )}
                          </div>

                          <div className="grid gap-1.5">
                            <Label htmlFor="co-applicant-occupation">Occupation Type</Label>
                            <select
                              id="co-applicant-occupation"
                              value={coApplicantOccupation}
                              onChange={(e) => setCoApplicantOccupation(e.target.value)}
                              className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-white px-3 py-2 text-sm"
                            >
                              <option value="Salaried">Salaried</option>
                              <option value="Self-Employed Professional">Self-Employed Professional</option>
                              <option value="Self-Employed Business">Self-Employed Business</option>
                              <option value="Retired">Retired/Other</option>
                            </select>
                          </div>
                        </div>

                        {/* File Uploads */}
                        <div className="grid gap-3 border-t border-amber-200/50 pt-3">
                          <Label className="text-xs font-semibold text-amber-900">Required Documents</Label>
                          <div className="grid gap-2 sm:grid-cols-3">
                            <div className="rounded border border-dashed border-amber-300 bg-amber-50/40 p-2.5 text-center text-[10px]">
                              <p className="font-semibold mb-1">PAN Card Proof</p>
                              {coApplicantPanFile ? (
                                <span className="text-emerald-700 font-semibold">✓ {coApplicantPanFile}</span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setCoApplicantPanFile("co_applicant_pan.pdf")}
                                  className="text-primary underline font-medium hover:text-primary-hover"
                                >
                                  Upload PAN PDF
                                </button>
                              )}
                            </div>

                            <div className="rounded border border-dashed border-amber-300 bg-amber-50/40 p-2.5 text-center text-[10px]">
                              <p className="font-semibold mb-1">Aadhaar Proof</p>
                              {coApplicantAadhaarFile ? (
                                <span className="text-emerald-700 font-semibold">✓ {coApplicantAadhaarFile}</span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setCoApplicantAadhaarFile("co_applicant_aadhaar.pdf")}
                                  className="text-primary underline font-medium hover:text-primary-hover"
                                >
                                  Upload Aadhaar PDF
                                </button>
                              )}
                            </div>

                            <div className="rounded border border-dashed border-amber-300 bg-amber-50/40 p-2.5 text-center text-[10px]">
                              <p className="font-semibold mb-1">Income Proof (Form 16/ITR)</p>
                              {coApplicantIncomeFile ? (
                                <span className="text-emerald-700 font-semibold">✓ {coApplicantIncomeFile}</span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setCoApplicantIncomeFile("co_applicant_income.pdf")}
                                  className="text-primary underline font-medium hover:text-primary-hover"
                                >
                                  Upload Income PDF
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Mandatory Consent */}
                        <div className="flex items-start gap-2 border-t border-amber-200/50 pt-3">
                          <input
                            type="checkbox"
                            id="co-applicant-consent"
                            checked={coApplicantConsent}
                            onChange={(e) => setCoApplicantConsent(e.target.checked)}
                            className="mt-0.5 size-4 rounded border-amber-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor="co-applicant-consent" className="text-[11px] text-amber-900 leading-tight select-none cursor-pointer">
                            I hereby authorize ShriNeo Capital to perform soft credit queries and verify bureau footprints for the co-applicant in compliance with TransUnion CIBIL credit score retrieval parameters.
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MORTGAGE / LAP DETAILS */}
            {loanType === "mortgage" && (
              <div className="grid gap-6 md:grid-cols-2 animate-in fade-in duration-200">
                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Collateral Property Profile</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="lap-subtype-select">Mortgage / LAP Subtype</Label>
                      <select
                        id="lap-subtype-select"
                        value={productSubtype}
                        onChange={(e) => setProductSubtype(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                      >
                        <option value="Commercial Property LAP">Commercial Property LAP</option>
                        <option value="Residential Property LAP">Residential Property LAP</option>
                        <option value="Plot LAP">Plot LAP</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="lap-purpose">End-Use of Funds</Label>
                      <select
                        id="lap-purpose"
                        value={lapEndUse}
                        onChange={(e) => setLapEndUse(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                      >
                        <option value="Business Expansion">Business Working Capital / Expansion</option>
                        <option value="Debt Consolidation">Debt Consolidation</option>
                        <option value="Education">Higher Education Expenses</option>
                        <option value="Personal Purchase">Personal asset purchase</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5 border rounded-lg p-3 bg-[#FAFBFF]">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lap-identified-toggle" className="font-semibold">Is property title document identified?</Label>
                        <input
                          type="checkbox"
                          id="lap-identified-toggle"
                          checked={propertyIdentified}
                          onChange={(e) => setPropertyIdentified(e.target.checked)}
                          className="size-4"
                        />
                      </div>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="lap-owners">Registered Owner Name(s)</Label>
                      <Input
                        id="lap-owners"
                        value={lapOwners}
                        onChange={(e) => setLapOwners(e.target.value)}
                        placeholder="Names as listed on the sale deed"
                      />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="lap-prop-type">Property Type</Label>
                      <select
                        id="lap-prop-type"
                        value={lapPropertyType}
                        onChange={(e) => setLapPropertyType(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                      >
                        <option value="Residential House">Residential Independent House</option>
                        <option value="Residential Apartment">Residential Flat/Apartment</option>
                        <option value="Commercial Shop">Commercial Shop / Showroom</option>
                        <option value="Industrial Plot">Industrial Building / Plot</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="lap-address">Collateral Property Address</Label>
                      <Input
                        id="lap-address"
                        value={lapPropertyAddress}
                        onChange={(e) => setLapPropertyAddress(e.target.value)}
                        placeholder="Complete property site address"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Market Valuation & Existing Charges</h4>
                  <div className="grid gap-4">
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
                      <Label htmlFor="lap-title-status">Property Title Status</Label>
                      <select
                        id="lap-title-status"
                        value={lapTitleStatus}
                        onChange={(e) => setLapTitleStatus(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                      >
                        <option value="Clear">Clear & Marketable Title (Recommended)</option>
                        <option value="Disputed">Litigation Pending / Disputed</option>
                        <option value="Ancestral Verification">Ancestral verification needed</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5 border rounded-lg p-3 bg-white">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lap-charge-toggle" className="font-semibold">Is there any existing mortgage charge?</Label>
                        <input
                          type="checkbox"
                          id="lap-charge-toggle"
                          checked={lapExistingCharge}
                          onChange={(e) => setLapExistingCharge(e.target.checked)}
                          className="size-4 text-primary"
                        />
                      </div>

                      {lapExistingCharge && (
                        <div className="grid gap-1.5 mt-2 pt-2 border-t animate-in fade-in duration-200">
                          <Label htmlFor="lap-lender-details">Existing Lender & Outstanding Amount</Label>
                          <Input
                            id="lap-lender-details"
                            value={lapLenderDetails}
                            onChange={(e) => setLapLenderDetails(e.target.value)}
                            placeholder="E.g. SBI, 15 Lakhs outstanding"
                          />
                          <p className="text-[10px] text-amber-700">
                            * Requires NOC or Balance Transfer (take-over) execution.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="lap-rental-proof" className="flex items-center gap-1">
                        Monthly Rental Income from Property (if any)
                        <span className="text-[10px] bg-neutral-100 text-muted-foreground px-1.5 py-0.5 rounded">Optional</span>
                      </Label>
                      <Input
                        id="lap-rental-proof"
                        inputMode="numeric"
                        value={lapRentalIncome}
                        onChange={(e) => setLapRentalIncome(e.target.value.replace(/\D/g, ""))}
                        className="num"
                        placeholder="E.g. 20000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BUSINESS LOAN DETAILS */}
            {loanType === "business" && (
              <div className="grid gap-6 md:grid-cols-2 animate-in fade-in duration-200">
                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Business Working Capital</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-purpose">Specific Business Facility End-Use</Label>
                      <select
                        id="biz-purpose"
                        value={bizLoanPurpose}
                        onChange={(e) => setBizLoanPurpose(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                      >
                        <option value="Working Capital">Working Capital Cash Credit (CC) / Overdraft (OD)</option>
                        <option value="Capex">Machinery Purchase (Capex Term Loan)</option>
                        <option value="Inventory">Inventory Purchase / Festive Stocking</option>
                        <option value="Expansion">Store Renovation / Franchise Expansion</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-stock">Estimated Stock / Inventory Valuation (INR)</Label>
                      <Input
                        id="biz-stock"
                        inputMode="numeric"
                        value={bizStockValue}
                        onChange={(e) => setBizStockValue(e.target.value.replace(/\D/g, ""))}
                        className="num"
                      />
                      <p className="text-xs text-muted-foreground">
                        Formatted: <strong className="text-foreground">{formatINR(Number(bizStockValue || 0))}</strong>
                      </p>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-receivables">Outstanding Book Debts / Receivables (INR)</Label>
                      <Input
                        id="biz-receivables"
                        inputMode="numeric"
                        value={bizReceivables}
                        onChange={(e) => setBizReceivables(e.target.value.replace(/\D/g, ""))}
                        className="num"
                      />
                      <p className="text-xs text-muted-foreground">
                        Formatted: <strong className="text-foreground">{formatINR(Number(bizReceivables || 0))}</strong>
                      </p>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-customers">Primary Customer Profile / Buyers Segment</Label>
                      <Input
                        id="biz-customers"
                        value={bizCustomers}
                        onChange={(e) => setBizCustomers(e.target.value)}
                        placeholder="E.g. B2B Corporate buyers, local retail clients"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Promoters & Equity Shares</h4>
                  <div className="grid gap-4">
                    <div className="border rounded-xl p-3 bg-[#FAFBFF]">
                      <span className="text-[10px] font-bold text-[#002B98] uppercase tracking-wide block mb-2">
                        Promoter Shareholding Ledger
                      </span>

                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-muted-foreground">
                          <span>Promoter Name</span>
                          <span>Shareholding %</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Input defaultValue="Rahul Sharma (Self)" className="h-8 text-xs bg-neutral-50" disabled />
                          <Input defaultValue="80%" className="h-8 text-xs text-right bg-neutral-50" disabled />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Input defaultValue="Co-promoter Name" placeholder="E.g. Geeta Sharma" className="h-8 text-xs" />
                          <Input defaultValue="20%" placeholder="20%" className="h-8 text-xs text-right" />
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-muted-foreground mt-3 italic">
                        * Required to map all beneficial owners with &gt; 15% equity under RBI AML framework.
                      </p>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="biz-existing-loans-val">Ongoing Business Debt Outstanding (INR)</Label>
                      <Input
                        id="biz-existing-loans-val"
                        inputMode="numeric"
                        value={bizExistingLoans}
                        onChange={(e) => setBizExistingLoans(e.target.value.replace(/\D/g, ""))}
                        className="num"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SACHET / NANO DETAILS */}
            {loanType === "sachet" && (
              <div className="grid gap-6 md:grid-cols-2 animate-in fade-in duration-200">
                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Micro-Credit Parameters</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="sachet-usage">Sachet Loan Primary End-Use</Label>
                      <select
                        id="sachet-usage"
                        value={sachetUse}
                        onChange={(e) => setSachetUse(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                      >
                        <option value="Personal">Personal household purchase</option>
                        <option value="Business">Informal business working capital</option>
                        <option value="Medical">Emergency / medical bills</option>
                        <option value="School fees">School fees / education dues</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="sachet-freq">Wages / Receipts Frequency</Label>
                      <select
                        id="sachet-freq"
                        value={sachetFrequency}
                        onChange={(e) => setSachetFrequency(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                      >
                        <option value="monthly">Monthly Salary / Earnings</option>
                        <option value="weekly">Weekly Contractor wages</option>
                        <option value="daily">Daily Wage / Cash sales</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="sachet-payment-mode">Preferred Auto-Repayment Mode</Label>
                      <select
                        id="sachet-payment-mode"
                        value={sachetPaymentMode}
                        onChange={(e) => setSachetPaymentMode(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm"
                      >
                        <option value="UPI mandate">UPI e-mandate (Instant setup)</option>
                        <option value="Direct debit">NACH Debit mandate</option>
                        <option value="Cash collection">Weekly agent cash collection</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#002B98] text-sm mb-4">Ongoing Commitments</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="sachet-ongoing-emi">Total Active Weekly/Monthly EMIs (INR)</Label>
                      <Input
                        id="sachet-ongoing-emi"
                        inputMode="numeric"
                        value={sachetOngoingEmi}
                        onChange={(e) => setSachetOngoingEmi(e.target.value.replace(/\D/g, ""))}
                        className="num"
                        placeholder="E.g. 1000"
                      />
                    </div>

                    <div className="grid gap-1.5 border rounded-lg p-3 bg-[#FAFBFF]">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sachet-overdue-toggle" className="font-semibold">Do you have any overdue payments?</Label>
                        <input
                          type="checkbox"
                          id="sachet-overdue-toggle"
                          checked={sachetOverdueDecl}
                          onChange={(e) => setSachetOverdueDecl(e.target.checked)}
                          className="size-4"
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        * Essential declaration under RBI Micro-finance Directions (2022).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PERSONAL LOAN DETAILS */}
            {loanType === "personal" && (
              <div className="max-w-xl animate-in fade-in duration-200">
                <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 flex gap-3 text-teal-800">
                  <div className="size-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <div>
                    <h4 className="font-bold text-sm text-teal-900">Unsecured Personal Loan module ready</h4>
                    <p className="text-xs mt-1 text-teal-800 leading-relaxed">
                      Personal loans do not require any collateral valuation, property title clearance, or business promoter tables.
                      Click <strong>Save & Continue</strong> to proceed directly to bank statements verification.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 6: Financial Obligations & Bank Data */}
        {step === 6 && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-[#002B98] mb-4">Financial Obligations</h3>
              <div className="grid gap-4">
                <div className="border rounded-xl p-4 bg-[#FAFBFF] border-[#DDE7F5]">
                  <span className="text-[10px] font-bold text-[#002B98] tracking-wider uppercase block mb-3">
                    Bureau Registry Liabilities (Auto-Detected)
                  </span>
                  
                  <div className="space-y-3">
                    <div className="flex items-start justify-between p-2.5 rounded-lg bg-white border border-neutral-100">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          id="liability-auto"
                          onChange={(e) => {
                            const val = e.target.checked ? 8500 : 0;
                            setOngoingEmi(prev => String(Math.max(0, Number(prev) + (e.target.checked ? 8500 : -8500))));
                          }}
                          className="mt-1 size-4 text-primary"
                        />
                        <div>
                          <Label htmlFor="liability-auto" className="font-semibold text-xs cursor-pointer">Auto Loan (ICICI Bank)</Label>
                          <span className="text-[10px] text-muted-foreground block">Outstanding: ₹3,20,000 | EMI: ₹8,500</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-neutral-700">₹8,500/mo</span>
                    </div>

                    <div className="flex items-start justify-between p-2.5 rounded-lg bg-white border border-neutral-100">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          id="liability-cc"
                          onChange={(e) => {
                            setOngoingEmi(prev => String(Math.max(0, Number(prev) + (e.target.checked ? 2200 : -2200))));
                          }}
                          className="mt-1 size-4 text-primary"
                        />
                        <div>
                          <Label htmlFor="liability-cc" className="font-semibold text-xs cursor-pointer">Credit Card dues (SBI Card)</Label>
                          <span className="text-[10px] text-muted-foreground block">Outstanding: ₹45,000 | Min Due: ₹2,200</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-neutral-700">₹2,200/mo</span>
                    </div>

                    <div className="flex items-start justify-between p-2.5 rounded-lg bg-white border border-neutral-100">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          id="liability-pl"
                          onChange={(e) => {
                            setOngoingEmi(prev => String(Math.max(0, Number(prev) + (e.target.checked ? 4300 : -4300))));
                          }}
                          className="mt-1 size-4 text-primary"
                        />
                        <div>
                          <Label htmlFor="liability-pl" className="font-semibold text-xs cursor-pointer">Personal Loan (HDFC Bank)</Label>
                          <span className="text-[10px] text-muted-foreground block">Outstanding: ₹1,50,000 | EMI: ₹4,300</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-neutral-700">₹4,300/mo</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                    * Checking/unchecking will automatically calculate the total ongoing EMI value below.
                  </p>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="monthly-emi" className="font-semibold text-sm">Total Calculated Monthly Repayments (EMIs)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">₹</span>
                    <Input
                      id="monthly-emi"
                      inputMode="numeric"
                      value={ongoingEmi}
                      onChange={(e) => setOngoingEmi(e.target.value.replace(/\D/g, ""))}
                      className="pl-7 font-bold text-lg"
                    />
                  </div>
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
                  <div className="grid gap-1.5 p-3 rounded-lg border border-rose-200 bg-rose-50/50 animate-in fade-in duration-200">
                    <span className="text-[10px] font-bold text-rose-700 tracking-wider uppercase">
                      Conditionally Mandatory Alert
                    </span>
                    <Label htmlFor="overdue-details">Provide details of overdue / defaulted accounts</Label>
                    <Input
                      id="overdue-details"
                      placeholder="E.g. SBI Card 2 months overdue, total Rs 8,500..."
                      value={overdueDetails}
                      onChange={(e) => setOverdueDetails(e.target.value)}
                    />
                    <p className="text-[10px] text-rose-800">
                      * Required because you declared active overdue accounts.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#002B98] mb-4">Bank Verification</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="primary-bank">Salary credit Bank</Label>
                    <select
                      id="primary-bank"
                      value={primaryBank}
                      onChange={(e) => setPrimaryBank(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="SBI Bank">State Bank of India</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="primary-acc-type">Account Type</Label>
                    <select
                      id="primary-acc-type"
                      value={primaryBankAccountType}
                      onChange={(e) => setPrimaryBankAccountType(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-[#DDE7F5] bg-background px-3 py-2 text-sm focus-visible:outline-none"
                    >
                      <option value="Savings">Savings Account</option>
                      <option value="Current">Current Account</option>
                      <option value="Overdraft">Overdraft Account</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label className="font-semibold text-xs">Verify Bank Statements via:</Label>
                  <div className="grid gap-3 grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setBankStatementMethod("aa")}
                      className={cn(
                        "flex flex-col p-3 rounded-lg border text-left transition-all",
                        bankStatementMethod === "aa"
                          ? "border-[#002B98] bg-[#FAFBFF] ring-1 ring-[#002B98]"
                          : "border-[#DDE7F5] bg-white hover:bg-neutral-50"
                      )}
                    >
                      <span className="font-semibold text-[#002B98] text-xs flex items-center gap-1">
                        Account Aggregator
                        <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-bold uppercase">
                          Rec.
                        </span>
                      </span>
                      <span className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                        Consent-based fetch from bank. Instant approval setup.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBankStatementMethod("pdf")}
                      className={cn(
                        "flex flex-col p-3 rounded-lg border text-left transition-all",
                        bankStatementMethod === "pdf"
                          ? "border-[#002B98] bg-[#FAFBFF] ring-1 ring-[#002B98]"
                          : "border-[#DDE7F5] bg-white hover:bg-neutral-50"
                      )}
                    >
                      <span className="font-semibold text-foreground text-xs">Upload Statement PDF</span>
                      <span className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                        Manual upload. Takes 12-24 hours for manual credit underwriting review.
                      </span>
                    </button>
                  </div>
                </div>

                {bankStatementMethod === "aa" && (
                  <div className="border border-[#DDE7F5] bg-[#FAFBFF] rounded-xl p-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-[#002B98] text-xs flex items-center gap-1.5">
                        <ShieldCheck className="size-4 text-[#0051AE]" />
                        RBI Account Aggregator Fetch
                      </h4>

                      {/* Connectivity error toggle helper */}
                      <label className="text-[10px] text-muted-foreground flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={aaStatus === "failed"}
                          onChange={(e) => {
                            setAaStatus(e.target.checked ? "failed" : "idle");
                            setOtpSent(false);
                            setOtpValue("");
                          }}
                          className="size-3 text-red-500 rounded"
                        />
                        Simulate connection issue
                      </label>
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                      Safe, read-only statements fetch. ShriNeo will not ask for your passwords, transaction PINs, or credentials.
                    </p>

                    {aaStatus === "idle" && (
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          setAaStatus("connecting");
                          setOtpSent(true);
                        }}
                        className="w-full justify-center"
                      >
                        Request OTP via Account Aggregator
                      </Button>
                    )}

                    {aaStatus === "connecting" && otpSent && (
                      <div className="space-y-3 p-3 rounded-lg border border-amber-200 bg-amber-50/50 animate-in slide-in-from-top-1 duration-200">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="aa-otp" className="text-xs font-bold text-amber-800">
                            Enter OTP sent to +91 9876543210
                          </Label>
                          <span className="text-[9px] bg-neutral-200 text-muted-foreground px-1 py-0.5 rounded font-mono font-semibold">
                            Verification Code: 123456
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Input
                            id="aa-otp"
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                            value={otpValue}
                            onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                            className="bg-white text-center tracking-widest font-mono text-sm h-9"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => setOtpValue("123456")}
                          >
                            Autofill
                          </Button>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            className="flex-1"
                            disabled={otpValue.length !== 6}
                            onClick={() => {
                              setAaStatus("success");
                            }}
                          >
                            Verify & Consent
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setAaStatus("idle");
                              setOtpSent(false);
                              setOtpValue("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {aaStatus === "success" && (
                      <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 space-y-2 animate-in fade-in duration-200">
                        <span className="text-xs text-emerald-800 font-bold flex items-center gap-1.5">
                          <Check className="size-4 text-emerald-600" /> Account Aggregator Connected
                        </span>
                        
                        <div className="text-[11px] text-emerald-950 space-y-1 bg-white p-2.5 rounded border border-emerald-100">
                          <div className="flex justify-between">
                            <span>Retrieved Account:</span>
                            <strong className="font-semibold">{primaryBank} (Savings)</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Average Monthly Deposits:</span>
                            <strong className="font-semibold">₹72,500</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg. Quarter Balance (AQB):</span>
                            <strong className="font-semibold">₹24,300</strong>
                          </div>
                          <div className="flex justify-between text-emerald-700">
                            <span>Income Verification status:</span>
                            <strong className="font-bold uppercase text-[9px] tracking-wide">Highly Correlated</strong>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100"
                          onClick={() => {
                            setAaStatus("idle");
                            setOtpSent(false);
                            setOtpValue("");
                          }}
                        >
                          Change / Recalibrate account
                        </Button>
                      </div>
                    )}

                    {aaStatus === "failed" && (
                      <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 space-y-2 animate-in fade-in duration-200">
                        <span className="text-xs text-rose-800 font-bold flex items-center gap-1.5">
                          Alert: Aggregator connection failure
                        </span>
                        <p className="text-[11px] text-rose-950 leading-relaxed">
                          Your salary bank's server did not respond to the token request. Check your connectivity or switch verification method.
                        </p>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            className="bg-rose-600 hover:bg-rose-700 text-white"
                            onClick={() => {
                              setAaStatus("connecting");
                              setOtpSent(true);
                            }}
                          >
                            Retry connection
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setBankStatementMethod("pdf")}
                          >
                            Switch to PDF Upload
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {bankStatementMethod === "pdf" && (
                  <div className="border border-dashed border-[#DDE7F5] rounded-xl p-5 bg-white text-center space-y-3 animate-in fade-in duration-200">
                    <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-muted-foreground">
                      📄
                    </div>
                    <div>
                      <span className="font-semibold text-xs block text-foreground">Select bank statements PDF file</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5 block leading-relaxed">
                        Please upload statements covering the last 6 months (Apr-Sep 2026). Max file size 10MB.
                      </span>
                    </div>

                    <div className="max-w-xs mx-auto">
                      <Input type="file" className="text-xs" accept=".pdf" />
                    </div>

                    <div className="grid gap-1.5 max-w-xs mx-auto pt-2 border-t">
                      <Label htmlFor="pdf-pass" className="text-[10px] text-left text-muted-foreground font-semibold">
                        PDF Password (if any)
                      </Label>
                      <Input
                        id="pdf-pass"
                        type="password"
                        placeholder="Leave blank if not password protected"
                        className="text-xs h-8"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Documents & Identity Verification */}
        {step === 7 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-2">Verification & Document Uploads</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Complete your KYC and verification checks. You can choose your preferred OVD (Officially Valid Document) verification channel below.
            </p>

            {/* Choose-Your-Own KYC selector */}
            <div className="mb-6 rounded-xl border border-[#DDE7F5] bg-neutral-50 p-4">
              <h4 className="font-bold text-[#002B98] text-xs uppercase tracking-wider mb-3">OVD Verification Selector</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOvdMethod("digilocker")}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-colors text-xs font-semibold",
                    ovdMethod === "digilocker" 
                      ? "border-primary bg-[#E6F1FB] text-primary" 
                      : "border-border bg-white text-muted-foreground hover:bg-neutral-100"
                  )}
                >
                  <span className="text-base mb-1">🔗</span>
                  <span>DigiLocker KYC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOvdMethod("camera")}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-colors text-xs font-semibold",
                    ovdMethod === "camera" 
                      ? "border-primary bg-[#E6F1FB] text-primary" 
                      : "border-border bg-white text-muted-foreground hover:bg-neutral-100"
                  )}
                >
                  <span className="text-base mb-1">📷</span>
                  <span>Liveness Camera</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOvdMethod("upload")}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-colors text-xs font-semibold",
                    ovdMethod === "upload" 
                      ? "border-primary bg-[#E6F1FB] text-primary" 
                      : "border-border bg-white text-muted-foreground hover:bg-neutral-100"
                  )}
                >
                  <span className="text-base mb-1">📁</span>
                  <span>File Upload</span>
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
              <div className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Upload files for verification. Document period: <strong className="text-foreground font-semibold font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded">Apr-Sep 2026</strong> (based on standard 6 months bank configuration).
                </p>

                {/* Dynamic document card list */}
                <div className="grid gap-3">
                  {getRequiredDocuments().map((doc) => {
                    const status = docList[doc.name] || doc.status;
                    return (
                      <div 
                        key={doc.name} 
                        className={cn(
                          "rounded-lg border px-4 py-3 transition-all",
                          status === "Accepted" && "border-emerald-200 bg-emerald-50/20",
                          status === "Under review" && "border-amber-200 bg-amber-50/20",
                          status === "Rejected" && "border-rose-200 bg-rose-50/20",
                          status === "Required" && "border-[#DDE7F5] bg-neutral-50/50",
                          status === "Uploaded" && "border-blue-200 bg-blue-50/20"
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <span className="text-sm font-semibold text-foreground">{doc.name}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] font-bold bg-neutral-200 text-muted-foreground px-1.5 py-0.5 rounded uppercase">
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
                            <span className={cn(
                              "text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide text-[9px]",
                              status === "Accepted" && "bg-emerald-100 text-emerald-800",
                              status === "Under review" && "bg-amber-100 text-amber-800",
                              status === "Rejected" && "bg-rose-100 text-rose-800",
                              status === "Required" && "bg-neutral-200 text-neutral-600",
                              status === "Uploaded" && "bg-blue-100 text-blue-800"
                            )}>
                              {status}
                            </span>
                            
                            {(status === "Required" || status === "Rejected" || status === "Uploaded") && (
                              <>
                                {(doc.name === "PAN / Form 60" || doc.name === "Aadhaar Card") && ovdMethod === "digilocker" ? (
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="h-8 text-xs font-semibold"
                                    onClick={() => {
                                      toast.success(`Retrieved ${doc.name} from DigiLocker registry.`);
                                      setDocList(prev => ({ ...prev, [doc.name]: "Accepted" }));
                                    }}
                                  >
                                    Pull DigiLocker
                                  </Button>
                                ) : (doc.name === "PAN / Form 60" || doc.name === "Aadhaar Card") && ovdMethod === "camera" ? (
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-8 text-xs font-semibold"
                                    onClick={() => {
                                      toast.success(`Live photo of ${doc.name} captured.`);
                                      setDocList(prev => ({ ...prev, [doc.name]: "Under review" }));
                                    }}
                                  >
                                    Snap Photo
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-8 text-xs bg-white hover:bg-neutral-50"
                                    onClick={() => {
                                      setDocList(prev => ({ ...prev, [doc.name]: "Uploaded" }));
                                    }}
                                  >
                                    {status === "Required" ? "Upload File" : status === "Rejected" ? "Re-upload" : "Replace"}
                                  </Button>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {/* Extra message for rejected files */}
                        {status === "Rejected" && (
                          <div className="mt-2.5 p-2 rounded bg-rose-50 border border-rose-100 text-[11px] text-rose-800 leading-relaxed">
                            <strong>Reason:</strong> PDF is password-protected or blurred. Please upload a clear, decrypted PDF statement.
                          </div>
                        )}

                        {/* Extra message for under review */}
                        {status === "Under review" && (
                          <p className="mt-1.5 text-[11px] text-amber-700">
                            ⚙️ Running automated OCR extraction... matching details against CKYC registry.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Selfie Liveness triggering check */}
                <div className="border border-[#DDE7F5] rounded-xl p-4 bg-[#FAFBFF]">
                  <h4 className="font-bold text-[#002B98] text-sm">Face Liveness Verification (Video KYC)</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    RBI guidelines require live selfie comparison against CKYC photo database to verify applicant identity.
                  </p>

                  {selfieTriggered ? (
                    <div className="mt-4 grid gap-4 max-w-sm mx-auto p-4 rounded-xl border bg-white border-neutral-100 shadow-sm text-center">
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-900 border flex items-center justify-center text-white">
                        {selfieStatus === "not_taken" && (
                          <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-lg flex flex-col items-center justify-center p-3">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary-foreground px-2 py-0.5 rounded mb-2">
                              Align face inside frame
                            </span>
                            <span className="text-[11px] text-neutral-400">Position face in center & blink once</span>
                          </div>
                        )}
                        {selfieStatus === "taking" && (
                          <div className="absolute inset-0 bg-neutral-950/70 flex flex-col items-center justify-center">
                            <span className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent mb-2" />
                            <span className="text-xs text-neutral-200">Verifying liveness check...</span>
                          </div>
                        )}
                        {selfieStatus === "success" && (
                          <div className="absolute inset-0 bg-emerald-950/80 flex flex-col items-center justify-center p-4">
                            <div className="size-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg font-bold mb-2">
                              ✓
                            </div>
                            <span className="text-xs font-semibold text-white">Liveness Verification Passed</span>
                            <span className="text-[10px] text-emerald-300 mt-0.5">Confidence: 99.8% Match</span>
                          </div>
                        )}
                        <span className="text-4xl">👤</span>
                      </div>

                      <div className="flex gap-2">
                        {selfieStatus === "not_taken" && (
                          <Button
                            type="button"
                            size="sm"
                            className="w-full justify-center"
                            onClick={() => {
                              setSelfieStatus("taking");
                              setTimeout(() => setSelfieStatus("success"), 1500);
                            }}
                          >
                            Capture Face Profile
                          </Button>
                        )}
                        {selfieStatus === "success" && (
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            className="w-full justify-center"
                            onClick={() => setSelfieStatus("not_taken")}
                          >
                            Recapture Selfie
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      className="mt-3 flex items-center gap-1.5 bg-white"
                      onClick={() => setSelfieTriggered(true)}
                    >
                      📷 Trigger Video KYC Liveness Camera
                    </Button>
                  )}
                </div>
              </div>

              {/* Sidebar with extracted OCR details */}
              <div className="border border-[#DDE7F5] rounded-xl p-4 bg-[#F8FAFD] h-fit">
                <h4 className="font-bold text-[#002B98] text-sm">OCR Extracted Documents Check</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Details extracted from PAN and Aadhaar. Please check mismatches below.
                </p>

                <div className="mt-4 p-3 bg-[#FFF9EB] border border-amber-200 rounded-lg space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-start gap-1.5 text-amber-900 text-xs">
                    <span className="text-amber-600 font-bold">⚠️</span>
                    <div>
                      <strong className="block text-amber-950 font-bold">Name Mismatch Detected (92% Match)</strong>
                      <p className="text-[11px] text-amber-900 leading-relaxed mt-0.5">
                        Aadhaar details read: <strong className="font-semibold text-black">RAHUL KUMAR SHARMA</strong>.
                        PAN details read: <strong className="font-semibold text-black">RAHUL SHARMA</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-amber-200/50">
                    <input
                      type="checkbox"
                      id="name-mismatch-override"
                      className="size-3.5 text-amber-600 border-amber-300 rounded"
                    />
                    <Label htmlFor="name-mismatch-override" className="text-[11px] text-amber-950 leading-snug cursor-pointer">
                      I confirm both names refer to me (Rahul Sharma).
                    </Label>
                  </div>
                </div>

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
                  <p className="font-semibold text-[#002B98]">KYC Extraction Status Check</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Matches CKYC Database Address: <strong className="text-emerald-600 font-bold">100% Match</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: Credit Profile & Matching */}
        {step === 8 && (
          <div>
            <h3 className="text-lg font-bold text-[#002B98] mb-4">Credit Score & Lender Matching</h3>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Bureau CIBIL Card */}
              <div className="rounded-xl border border-[#DDE7F5] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">CIBIL Credit Score</h4>
                  
                  {/* Bureau state simulation control panel */}
                  {cibilConsent && (
                    <div className="flex gap-1.5 bg-neutral-100 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setCibilScore(742)}
                        className={cn("text-[9px] px-1.5 py-0.5 rounded font-semibold", typeof cibilScore === "number" ? "bg-white shadow text-[#002B98]" : "text-muted-foreground")}
                      >
                        Excellent
                      </button>
                      <button
                        type="button"
                        onClick={() => setCibilScore("NH")}
                        className={cn("text-[9px] px-1.5 py-0.5 rounded font-semibold", cibilScore === "NH" ? "bg-white shadow text-[#002B98]" : "text-muted-foreground")}
                      >
                        No History
                      </button>
                      <button
                        type="button"
                        onClick={() => setCibilScore("failed")}
                        className={cn("text-[9px] px-1.5 py-0.5 rounded font-semibold", cibilScore === "failed" ? "bg-white shadow text-[#002B98]" : "text-muted-foreground")}
                      >
                        Timeout
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="my-5 flex flex-col justify-center min-h-[90px]">
                  {cibilScore === "checking" ? (
                    <div className="flex items-center gap-2 animate-pulse">
                      <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      <span className="text-sm text-muted-foreground font-semibold">Retrieving records from TransUnion Bureau...</span>
                    </div>
                  ) : cibilScore === "failed" ? (
                    <div className="p-3 rounded-lg border border-rose-200 bg-rose-50 flex items-start gap-2 text-rose-900">
                      <AlertCircle className="size-5 shrink-0 mt-0.5 text-rose-600" />
                      <div>
                        <span className="text-xs font-bold block text-rose-950">Bureau Connection Timeout</span>
                        <p className="text-[10px] text-rose-800 leading-normal mt-0.5">
                          Unable to retrieve scores from TransUnion servers. Click 'Retry check' or proceed using SNV Cashflow score.
                        </p>
                      </div>
                    </div>
                  ) : cibilScore === "NH" ? (
                    <div className="p-3 rounded-lg border border-amber-200 bg-amber-50 flex items-start gap-2 text-amber-900">
                      <AlertCircle className="size-5 shrink-0 mt-0.5 text-amber-600" />
                      <div>
                        <span className="text-3xl font-extrabold text-amber-800 tracking-tight block">NH</span>
                        <span className="text-[10.5px] font-bold block text-amber-950 mt-1">No Credit History / New-To-Credit</span>
                        <p className="text-[10px] text-amber-800 leading-normal mt-0.5">
                          No previous trade lines found. ShriNeo will use bank transactions to establish creditworthiness.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-extrabold text-[#002B98] tracking-tight">{cibilScore}</span>
                      <p className="text-xs text-muted-foreground mt-1 font-semibold flex items-center gap-1 text-emerald-600">
                        <span>✓ Verified Available (Low risk bracket)</span>
                      </p>
                    </div>
                  )}
                </div>

                {!cibilConsent ? (
                  <div className="grid gap-2 border-t pt-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We require your explicit consent before checking bureau records. This will not trigger a hard inquiry footprint.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCibilConsent(true);
                        setCibilScore("checking");
                        setTimeout(() => setCibilScore(742), 1200);
                      }}
                      className="w-full inline-flex h-9 items-center justify-center rounded-lg bg-[#002B98] text-xs font-semibold text-white hover:bg-[#001A5C]"
                    >
                      Authorize Bureau Consent & Check Credit Profile
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between border-t pt-3 text-xs text-emerald-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Check className="size-4" /> Consent Authorized
                    </span>
                    {cibilScore === "failed" && (
                      <Button
                        type="button"
                        size="xs"
                        variant="secondary"
                        onClick={() => {
                          setCibilScore("checking");
                          setTimeout(() => setCibilScore(742), 1200);
                        }}
                      >
                        Retry Bureau Check
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* SNV Trust Score Card */}
              <div className="rounded-xl border border-[#DDE7F5] bg-white p-5 shadow-sm">
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">SNV Trust Score</h4>

                <div className="my-5 flex flex-col justify-center min-h-[90px]">
                  {snvScore === "calculating" ? (
                    <div className="flex items-center gap-2 animate-pulse text-emerald-600">
                      <span className="size-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                      <span className="text-sm font-semibold">Recalculating cashflow credit metrics...</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-extrabold text-emerald-600 tracking-tight">{snvScore} / 100</span>
                      <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                        Advisory cashflow score computed from verified deposits, time at address, and debt obligation ratios.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-3 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-muted-foreground">Source: Verified Bank Statements</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    disabled={snvScore === "calculating"}
                    onClick={() => {
                      setSnvScore("calculating" as any);
                      setTimeout(() => setSnvScore(85), 1500);
                    }}
                  >
                    Recalculate Cashflow Score
                  </Button>
                </div>
              </div>
            </div>

            {/* Lender Sharing Consent */}
            <div className="mt-6 border rounded-xl p-4 bg-[#F8FAFD]">
              <h4 className="font-bold text-[#002B98] text-sm mb-3">Regulated Lender Partners & Sharing Consents</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                We will share your verified application packet with selected partner lenders to retrieve live offers. Uncheck to exclude any specific lender.
              </p>
              
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 mb-4">
                {[
                  { id: "sbi", name: "State Bank of India", type: "Public Bank" },
                  { id: "hdfc", name: "HDFC Bank", type: "Private Bank" },
                  { id: "icici", name: "ICICI Bank", type: "Private Bank" },
                  { id: "axis", name: "Axis Bank", type: "Private Bank" }
                ].map((lender) => (
                  <div key={lender.id} className="flex items-center gap-2 p-3 bg-white border rounded-lg">
                    <input
                      type="checkbox"
                      defaultChecked
                      id={`share-${lender.id}`}
                      className="size-4 text-[#002B98] rounded border-neutral-300"
                    />
                    <div className="leading-none">
                      <Label htmlFor={`share-${lender.id}`} className="text-xs font-semibold block cursor-pointer">{lender.name}</Label>
                      <span className="text-[9px] text-muted-foreground">{lender.type}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 border-t pt-4">
                <input
                  type="checkbox"
                  id="lender-sharing-consent-toggle"
                  checked={lenderSharingConsent}
                  onChange={(e) => setLenderSharingConsent(e.target.checked)}
                  className="size-4 mt-0.5"
                />
                <label htmlFor="lender-sharing-consent-toggle" className="text-xs font-semibold text-foreground leading-snug">
                  I agree to share my application details, bank cashflow summaries, and credit score with the selected regulated partner lenders. **I understand that the regulated lender makes the final underwriting credit decision.**
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
                  <p className="text-sm font-semibold text-foreground">{formatINR(Number(loanAmount || 350000))} ({loanType ? loanType.toUpperCase() : "PERSONAL"} Loan)</p>
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
                          <td className="p-3 font-semibold text-[#002B98]">{formatINR(offer.amount)}</td>
                          <td className="p-3">{offer.tenure} Months</td>
                          <td className="p-3">{offer.apr}% APR</td>
                          <td className="p-3 font-semibold">{formatINR(offer.emi)}/mo</td>
                          <td className="p-3 text-center">
                            <button 
                              type="button"
                              onClick={() => setActiveKfsOffer(offer)}
                              className="text-[#0051AE] inline-flex items-center gap-1 hover:underline font-bold"
                            >
                              View KFS
                              <ExternalLink className="size-3" />
                            </button>
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

            {/* KFS Modal Overlay */}
            {activeKfsOffer && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="relative w-full max-w-2xl rounded-2xl bg-white border shadow-2xl p-6 overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div>
                      <h4 className="text-base font-extrabold text-[#002B98] uppercase tracking-wide">
                        Key Fact Statement (KFS)
                      </h4>
                      <p className="text-[10px] text-muted-foreground font-semibold">
                        Under RBI Digital Lending Guidelines (Ref: RBI/2022-23/111)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveKfsOffer(null)}
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-neutral-100 hover:text-foreground text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This Key Fact Statement lists all primary interest parameters, processing fees, and payment charges related to your digital loan offer with <strong>{activeKfsOffer.lender}</strong>.
                    </p>

                    <div className="border rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left border-collapse">
                        <tbody className="divide-y">
                          <tr className="bg-neutral-50">
                            <td className="p-2.5 font-bold text-[#002B98]">Lending Institution (RE)</td>
                            <td className="p-2.5 font-semibold text-right">{activeKfsOffer.lender}</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">Sanctioned Loan Amount</td>
                            <td className="p-2.5 text-right font-bold">{formatINR(activeKfsOffer.amount)}</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold text-rose-800">Processing Fees (Deducted upfront)</td>
                            <td className="p-2.5 text-right text-rose-800 font-semibold">- {formatINR(activeKfsOffer.fee)}</td>
                          </tr>
                          <tr className="bg-emerald-50/50">
                            <td className="p-2.5 font-bold text-emerald-900">Net Disbursed Amount</td>
                            <td className="p-2.5 text-right text-emerald-800 font-extrabold">{formatINR(activeKfsOffer.amount - activeKfsOffer.fee)}</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">Rate of Interest type</td>
                            <td className="p-2.5 text-right">Fixed Rate</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">Annual Percentage Rate (APR)</td>
                            <td className="p-2.5 text-right font-bold text-[#002B98]">{activeKfsOffer.apr}% p.a.</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">Tenure</td>
                            <td className="p-2.5 text-right">{activeKfsOffer.tenure} Months</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold text-foreground">Monthly Installment (EMI)</td>
                            <td className="p-2.5 text-right font-extrabold text-[#002B98]">{formatINR(activeKfsOffer.emi)}/mo</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold text-muted-foreground">Total Interest Payable</td>
                            <td className="p-2.5 text-right font-semibold">{formatINR((activeKfsOffer.emi * activeKfsOffer.tenure) - activeKfsOffer.amount)}</td>
                          </tr>
                          <tr className="bg-neutral-50 font-bold">
                            <td className="p-2.5">Total Repayment Amount</td>
                            <td className="p-2.5 text-right">{formatINR(activeKfsOffer.emi * activeKfsOffer.tenure)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-neutral-50 border rounded-xl p-3 text-[11px] space-y-2 text-muted-foreground leading-normal">
                      <strong className="text-foreground block font-bold text-xs uppercase text-[#002B98]">Contingent Fees & Charges</strong>
                      <p>
                        <strong>1. Penal Charges:</strong> Overdue amount will attract a late penalty fee of 2.0% per month, charged on the unpaid instalment.
                      </p>
                      <p>
                        <strong>2. Foreclosure policy:</strong> Foreclosure or prepayment charges are NIL after 3 successful EMI cycles.
                      </p>
                      <p>
                        <strong>3. Cool-off period:</strong> A cool-off period of 3 days is provided during which you can return the principal loan amount without penalty.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end border-t pt-4 mt-5">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveKfsOffer(null)}
                    >
                      Close KFS Window
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setActiveKfsOffer(null);
                        alert(`Selected offer from ${activeKfsOffer.lender}. Starting disbursal setup.`);
                        setProto("application", "disbursed");
                      }}
                    >
                      Accept & Select Offer
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
            (step === 9 && (!consentAccuracy || !consentBureau || !consentKyc || !consentSharing))
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
