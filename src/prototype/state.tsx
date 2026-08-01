/**
 * PROTOTYPE-ONLY state. Not part of the production product.
 * No authentication, no network, no persistence beyond localStorage.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const ROLES = ["borrower", "agent", "lender", "admin"] as const;
export type Role = (typeof ROLES)[number];

export const ACCOUNT_SCENARIOS = [
  "new",
  "partial",
  "active",
  "action-required",
  "restricted",
  "suspended",
  "archived",
] as const;
export type AccountScenario = (typeof ACCOUNT_SCENARIOS)[number];

export const DATA_SCENARIOS = [
  "populated",
  "empty",
  "loading",
  "partial",
  "failed",
  "offline",
  "stale",
] as const;
export type DataScenario = (typeof DATA_SCENARIOS)[number];

export const APPLICATION_SCENARIOS = [
  "draft",
  "submitted",
  "documents-required",
  "lender-review",
  "manual-review",
  "approved",
  "rejected",
  "disbursal-initiated",
  "disbursed",
  "closed",
] as const;
export type ApplicationScenario = (typeof APPLICATION_SCENARIOS)[number];

export const DEVICES = ["desktop", "tablet", "mobile"] as const;
export type Device = (typeof DEVICES)[number];

export type PrototypeState = {
  role: Role;
  account: AccountScenario;
  data: DataScenario;
  application: ApplicationScenario;
  device: Device;
  toolbarOpen: boolean;
};

const DEFAULT_STATE: PrototypeState = {
  role: "borrower",
  account: "active",
  data: "populated",
  application: "lender-review",
  device: "desktop",
  toolbarOpen: true,
};

type Ctx = PrototypeState & {
  set: <K extends keyof PrototypeState>(key: K, value: PrototypeState[K]) => void;
  reset: () => void;
};

const PrototypeContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "shrineo.prototype.v1";

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PrototypeState>(DEFAULT_STATE);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<PrototypeState>) });
    } catch {
      /* prototype only */
    }
  }, []);

  const set = useCallback<Ctx["set"]>((key, value) => {
    setState((prev) => {
      const next = { ...prev, [key]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* prototype only */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* prototype only */
    }
  }, []);

  const value = useMemo(() => ({ ...state, set, reset }), [state, set, reset]);
  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const ctx = useContext(PrototypeContext);
  if (!ctx) throw new Error("usePrototype must be used within PrototypeProvider");
  return ctx;
}

/** Dev-only surfaces are hidden in a production build. */
export const isPrototypeMode = import.meta.env.DEV;

export const ROLE_LABEL: Record<Role, string> = {
  borrower: "Borrower",
  agent: "Agent",
  lender: "Lender",
  admin: "Admin",
};

export const ROLE_HOME: Record<Role, string> = {
  borrower: "/app/borrower",
  agent: "/app/agent",
  lender: "/app/lender",
  admin: "/app/admin",
};

export const ACCOUNT_LABEL: Record<AccountScenario, string> = {
  new: "New user",
  partial: "Partially completed",
  active: "Active",
  "action-required": "Action required",
  restricted: "Restricted",
  suspended: "Suspended",
  archived: "Archived",
};

export const DATA_LABEL: Record<DataScenario, string> = {
  populated: "Fully populated",
  empty: "Empty",
  loading: "Loading",
  partial: "Partial response",
  failed: "Failed response",
  offline: "Offline",
  stale: "Stale data",
};

export const APPLICATION_LABEL: Record<ApplicationScenario, string> = {
  draft: "Draft",
  submitted: "Submitted",
  "documents-required": "Documents required",
  "lender-review": "Lender review",
  "manual-review": "Manual review",
  approved: "Approved",
  rejected: "Rejected",
  "disbursal-initiated": "Disbursal initiated",
  disbursed: "Disbursed",
  closed: "Closed",
};

export const DEVICE_LABEL: Record<Device, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};

/** Frame width used to simulate a device inside the portal shell. */
export const DEVICE_WIDTH: Record<Device, string> = {
  desktop: "100%",
  tablet: "834px",
  mobile: "390px",
};
