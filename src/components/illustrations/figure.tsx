import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared wrapper for every ShriNeo finance illustration.
 * - Tokenised colours only (no hard-coded hex)
 * - Accessible: role="img" + <title>/<desc> derived from props
 * - No critical text baked into the artwork; captions live in HTML
 */
export function Figure({
  title,
  desc,
  viewBox = "0 0 400 260",
  className,
  children,
}: {
  title: string;
  desc?: string | undefined;
  viewBox?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}) {
  const id = title.replace(/\W+/g, "-").toLowerCase();

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${id}-t${desc ? ` ${id}-d` : ""}`}
      className={cn("h-auto w-full", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={`${id}-t`}>{title}</title>
      {desc ? <desc id={`${id}-d`}>{desc}</desc> : null}
      {children}
    </svg>
  );
}

/** Illustration palette — resolves to design tokens at runtime. */
export const ink = {
  line: "var(--border-strong)",
  soft: "var(--brand-100)",
  softer: "var(--brand-50)",
  brand: "var(--primary)",
  brandMid: "var(--brand-500)",
  brandLight: "var(--brand-300)",
  surface: "var(--surface)",
  card: "var(--card)",
  teal: "var(--success)",
  tealSoft: "var(--success-surface)",
  amber: "var(--warning)",
  amberSoft: "var(--warning-surface)",
  muted: "var(--muted-foreground)",
} as const;

/** Rounded panel used across illustrations to represent a card/screen. */
export function Panel({
  x,
  y,
  w,
  h,
  fill = ink.card,
  stroke = ink.line,
  r = 10,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  stroke?: string;
  r?: number;
}) {
  return (
    <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={1.25} />
  );
}

/** Neutral content line inside a panel. */
export function Bar({
  x,
  y,
  w,
  h = 6,
  fill = ink.soft,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
}

/** Directional connector between two stages. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = ink.brandMid,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 6;
  const hx = x2 - Math.cos(angle) * 1;
  const hy = y2 - Math.sin(angle) * 1;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - Math.cos(angle) * head}
        y2={y2 - Math.sin(angle) * head}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray={dashed ? "4 4" : undefined}
      />
      <polygon
        points={`${hx},${hy} ${hx - Math.cos(angle - 0.4) * head},${hy - Math.sin(angle - 0.4) * head} ${hx - Math.cos(angle + 0.4) * head},${hy - Math.sin(angle + 0.4) * head}`}
        fill={color}
      />
    </g>
  );
}

/** Small numbered stage marker. */
export function Stage({ cx, cy, n }: { cx: number; cy: number; n: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={11} fill={ink.softer} stroke={ink.brandLight} strokeWidth={1} />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill={ink.brand}
        fontFamily="var(--font-mono)"
      >
        {n}
      </text>
    </g>
  );
}
