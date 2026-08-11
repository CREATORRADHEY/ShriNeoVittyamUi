import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import neoAvatarSrc from "@/assets/neo-avatar.png";

function WaveformIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect x="5" y="9" width="2" height="6" rx="1" />
      <rect x="9" y="5" width="2" height="14" rx="1" />
      <rect x="13" y="7" width="2" height="10" rx="1" />
      <rect x="17" y="10" width="2" height="4" rx="1" />
    </svg>
  );
}

interface NeoLauncherProps {
  onClick: () => void;
  open: boolean;
  dockOffset: number;
}

export function NeoLauncher({ onClick, open, dockOffset }: NeoLauncherProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fades in and reveals horizontally after a tiny delay on mount
    const id = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(id);
  }, []);

  const baseBottom = 16 + dockOffset;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open Neo assistant"
      aria-expanded={open}
      style={{ bottom: `${baseBottom}px` }}
      className={cn(
        "fixed right-4 z-40 flex items-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE] focus-visible:ring-offset-2",
        "transition-all duration-[300ms] ease-[cubic-bezier(0.2,0,0,1)]",
        "active:translate-y-[1px] active:shadow-[0_4px_12px_-4px_rgba(0,43,152,0.3)]",
        visible ? "translate-x-0 opacity-100" : "translate-x-[14px] opacity-0",
        // Hover state: moves upward 1-2px, border strengthens, shadow increases, no scaling
        "hover:-translate-y-[2px] hover:shadow-[0_12px_24px_-8px_rgba(0,43,152,0.45)]",
        "shadow-[0_8px_16px_-6px_rgba(0,43,152,0.35)] rounded-full",
        open && "opacity-0 pointer-events-none translate-x-[10px]"
      )}
    >
      {/* Dark navy pill wrapper */}
      <div className="flex h-11 items-center gap-2 rounded-full border border-white/20 bg-[#002B98] pl-[56px] pr-5 text-white transition-colors duration-200 hover:border-white/45 sm:h-[52px] sm:pl-[66px] sm:pr-6">
        <WaveformIcon className="size-4 text-white/80 sm:size-5" />
        <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-white sm:text-base">
          Neo
        </span>
      </div>

      {/* Overlapping avatar circle container */}
      <div className="absolute -left-1 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#002B98] shadow-md sm:size-14">
        <img
          src={neoAvatarSrc}
          alt=""
          className="size-full rounded-full object-cover"
        />
        {/* Status dot */}
        <span
          className="absolute right-0.5 bottom-0.5 size-[10px] rounded-full border-2 border-white bg-[#22C55E] sm:size-[11px]"
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
