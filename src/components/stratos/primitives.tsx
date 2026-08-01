import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ink" | "quiet";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover shadow-[var(--shadow-primary)]",
  outline: "border border-border text-foreground hover:bg-muted",
  ink: "bg-ink text-ink-foreground hover:opacity-90",
  quiet: "text-muted-foreground hover:text-foreground",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-sm rounded-xl",
  lg: "min-h-14 px-8 py-4 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "muted" }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tone === "primary" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function Tile({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <div className={cn("reveal rounded-3xl p-8", className)} data-reveal-delay={delay}>
      {children}
    </div>
  );
}
