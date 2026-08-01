/**
 * CMS/environment-configurable organisation facts.
 * Values marked `null` are intentionally unset: they must be supplied by the
 * business from verified records. Nothing here may be invented in code.
 */

export type ConfigurableValue = string | null;

export const org = {
  /** Customer-facing product name — use everywhere in the UI. */
  brandName: "ShriNeo Capital",
  /** Registered legal entity — legal contexts only. */
  legalEntity: "SHRINEO VITTIYAM PRIVATE LIMITED",
  brandLine: "A brand of SHRINEO VITTIYAM PRIVATE LIMITED",
  role: "Lending Service Provider (LSP)",
  roleStatement:
    "ShriNeo Capital operates as a Lending Service Provider. It is not a bank or an NBFC and does not lend its own funds.",
  /** Populate from verified registration records. */
  cin: null as ConfigurableValue,
  registeredAddress: null as ConfigurableValue,
  supportEmail: null as ConfigurableValue,
  supportPhone: null as ConfigurableValue,
  /** Grievance officer details required by RBI Digital Lending Directions. */
  grievanceOfficer: {
    name: null as ConfigurableValue,
    designation: null as ConfigurableValue,
    email: null as ConfigurableValue,
    phone: null as ConfigurableValue,
    address: null as ConfigurableValue,
    responseWindow: "Acknowledgement within 3 working days; resolution target 30 days",
  },
  /** Partner count is CMS data — never hard-code a marketing number. */
  partnerCountLabel: null as ConfigurableValue,
  regulatoryNote: "Operated in alignment with applicable RBI Digital Lending Directions",
} as const;

export const PENDING_LABEL = "To be configured";

export function configured(value: ConfigurableValue) {
  return value ?? PENDING_LABEL;
}
