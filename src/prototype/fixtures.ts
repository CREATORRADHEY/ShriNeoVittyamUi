/**
 * Canonical Prototype Seed Data & Shared Entities
 * Structured around shared IDs to guarantee cross-role consistency.
 */

// Shared Entity Types
export interface BorrowerEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  pan: string;
  aadhaar: string;
  dob: string;
  pin: string;
}

export interface AgentEntity {
  id: string;
  name: string;
  photo: string;
  serviceArea: string;
  languages: string[];
  availability: string;
  rating: string;
  filesCompleted: number;
}

export interface LenderEntity {
  id: string;
  name: string;
  type: string;
}

export interface ApplicationEntity {
  id: string;
  borrowerId: string;
  loanType: string;
  amount: number;
  tenure: number;
  emi: number;
  fee: number;
  lenderId: string;
  status: string;
  dateCreated: string;
}

export interface RequestEntity {
  id: string;
  appId: string;
  lenderId: string;
  requiredItem: string;
  reason: string;
  requestDate: string;
  dueDate: string;
  acceptedFormat: string;
  status:
    | "New"
    | "Opened"
    | "Draft"
    | "Submitted"
    | "Received"
    | "Under review"
    | "Accepted"
    | "Rejected";
  recipientVisibility: string;
}

export interface DocumentEntity {
  id: string;
  appId: string;
  name: string;
  type: "M" | "CM" | "R" | "O";
  status: "Required" | "Uploaded" | "Under review" | "Accepted" | "Rejected";
  reason?: string;
}

export interface OfferEntity {
  id: string;
  appId: string;
  lenderName: string;
  amount: number;
  tenure: number;
  apr: number;
  emi: number;
  fee: number;
}

export interface PaymentEntity {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  status: "Upcoming" | "Paid" | "Overdue";
  mandateBank: string;
}

export interface GrievanceEntity {
  id: string;
  userId: string;
  appId: string;
  category: string;
  slaDays: number;
  dateRaised: string;
  status: "Open" | "Escalated" | "Resolved";
  conversation: { sender: string; text: string; time: string }[];
}

export interface AuditEventEntity {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}

// 1. Configurable Geography Pools
export const GEOGRAPHY = {
  Rajasthan: {
    cities: ["Jaipur", "Jodhpur", "Kota"],
    pins: ["302001", "342001", "324001"],
  },
  UttarPradesh: {
    cities: ["Noida", "Kanpur", "Lucknow"],
    pins: ["201301", "208001", "226001"],
  },
  Gujarat: {
    cities: ["Ahmedabad", "Surat", "Vadodara"],
    pins: ["380001", "395001", "390001"],
  },
  DelhiNCR: {
    cities: ["New Delhi", "Gurugram", "Noida"],
    pins: ["110001", "122001", "201301"],
  },
};

// 2. Canonical Core Entities
export const CANONICAL_BORROWER: BorrowerEntity = {
  id: "B-883",
  name: "Rohit Sharma",
  email: "rohit.sharma@example.com",
  phone: "+91 98765 43210",
  pan: "ABCDE1234F",
  aadhaar: "xxxx-xxxx-9204",
  dob: "15-08-1992",
  pin: "560103",
};

export const CANONICAL_AGENT: AgentEntity = {
  id: "AG-4471",
  name: "Rahul Kumar",
  photo: "👨‍💼",
  serviceArea: "Jaipur (RJ)",
  languages: ["Hindi", "English"],
  availability: "Available (9 AM - 6 PM)",
  rating: "4.8",
  filesCompleted: 184,
};

export const CANONICAL_LENDER: LenderEntity = {
  id: "L-904",
  name: "SBI Digital Finance",
  type: "Public RE",
};

// 3. TEAM-APPROVED CANONICAL PROTOTYPE SCENARIO
export const CANONICAL_APPLICATION: ApplicationEntity = {
  id: "APP-2026-001284",
  borrowerId: "B-883",
  loanType: "personal",
  amount: 350000,
  tenure: 36,
  emi: 11540,
  fee: 3500,
  lenderId: "L-904",
  status: "submitted",
  dateCreated: "08 Mar 2026",
};

// 4. Shared Requests & Documents
export const CANONICAL_REQUEST: RequestEntity = {
  id: "REQ-884021",
  appId: "APP-2026-001284",
  lenderId: "L-904",
  requiredItem: "6 Months Bank Statements",
  reason: "Automated OCR read mismatch in address verification",
  requestDate: "11 Mar 2026",
  dueDate: "18 Mar 2026",
  acceptedFormat: "Clear decrypted PDF / Account Aggregator consent",
  status: "New",
  recipientVisibility: "SBI Underwriting Team only",
};

export const CANONICAL_DOCUMENTS: DocumentEntity[] = [
  { id: "D-1", appId: "APP-2026-001284", name: "PAN Card", type: "M", status: "Accepted" },
  { id: "D-2", appId: "APP-2026-001284", name: "Aadhaar Card", type: "M", status: "Under review" },
  {
    id: "D-3",
    appId: "APP-2026-001284",
    name: "6 Months Bank Statements",
    type: "M",
    status: "Rejected",
    reason: "PDF password incorrect",
  },
];

export const CANONICAL_OFFERS: OfferEntity[] = [
  {
    id: "OFF-1",
    appId: "APP-2026-001284",
    lenderName: "SBI Digital Finance",
    amount: 350000,
    tenure: 36,
    apr: 11.5,
    emi: 11540,
    fee: 3500,
  },
  {
    id: "OFF-2",
    appId: "APP-2026-001284",
    lenderName: "HDFC Bank Spark",
    amount: 320000,
    tenure: 36,
    apr: 12.2,
    emi: 10650,
    fee: 3000,
  },
  {
    id: "OFF-3",
    appId: "APP-2026-001284",
    lenderName: "ICICI Instant Credit",
    amount: 350000,
    tenure: 36,
    apr: 12.9,
    emi: 11780,
    fee: 4000,
  },
];

export const CANONICAL_PAYMENT: PaymentEntity = {
  id: "PAY-992",
  loanId: "LN-2026-092",
  amount: 11540,
  dueDate: "05 Apr 2026",
  status: "Upcoming",
  mandateBank: "State Bank of India (Savings)",
};

export const CANONICAL_GRIEVANCE: GrievanceEntity = {
  id: "TKT-1082",
  userId: "B-883",
  appId: "APP-2026-001284",
  category: "KYC Mismatch Error",
  slaDays: 3,
  dateRaised: "12 Mar 2026",
  status: "Open",
  conversation: [
    {
      sender: "you",
      text: "My Aadhaar has my middle name but PAN doesn't. How do I verify?",
      time: "12 Mar, 10:00",
    },
    {
      sender: "agent",
      text: "I have uploaded the name mismatch confirmation. Admin is reviewing.",
      time: "12 Mar, 11:30",
    },
  ],
};

export const CANONICAL_AUDIT_LOGS: AuditEventEntity[] = [
  {
    id: "AUD-101",
    timestamp: "08 Mar 2026, 11:04",
    actor: "Rohit Sharma",
    action: "Consent Authorized",
    details: "Approved credit bureau query consent",
  },
  {
    id: "AUD-102",
    timestamp: "09 Mar 2026, 16:20",
    actor: "L-904 (SBI)",
    action: "PII Unmasked",
    details: "Unmasked name and phone number for manual verification",
  },
  {
    id: "AUD-103",
    timestamp: "11 Mar 2026, 09:45",
    actor: "L-904 (SBI)",
    action: "Info Requested",
    details: "Requested re-upload of bank statements (REQ-884021)",
  },
];
