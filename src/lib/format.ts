/** Centralized formatting utilities — Indian numbering conventions. */

export function formatINR(value: number, options?: { compact?: boolean; decimals?: number }) {
  if (!Number.isFinite(value)) return "—";
  if (options?.compact) return `₹${compactIndian(value)}`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: options?.decimals ?? 0,
    minimumFractionDigits: options?.decimals ?? 0,
  }).format(value);
}

export function formatNumberIN(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

/** ₹1,00,000 -> "1 lakh", ₹1,00,00,000 -> "1 crore" (short Indian units). */
export function compactIndian(value: number) {
  if (value >= 1_00_00_000) return `${trim(value / 1_00_00_000)} Cr`;
  if (value >= 1_00_000) return `${trim(value / 1_00_000)} L`;
  if (value >= 1_000) return `${trim(value / 1_000)} K`;
  return formatNumberIN(value);
}

function trim(n: number) {
  return Number(n.toFixed(2)).toString();
}

export function formatPercent(value: number, decimals = 2) {
  return `${value.toFixed(decimals)}%`;
}

export function formatDateIN(input: string | number | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(input));
}
