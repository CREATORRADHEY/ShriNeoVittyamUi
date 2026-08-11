import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import neoAvatarSrc from "@/assets/neo-avatar.png";

function WaveformIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
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
    const id = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(id);
  }, []);

  const baseBottom = 24 + dockOffset;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open Neo assistant"
      aria-expanded={open}
      style={{ bottom: `${baseBottom}px` }}
      className={cn(
        /* Launcher positioning: fixed on bottom right (24px padding on desktop, 16px on mobile) */
        "fixed right-4 z-40 select-none rounded-full",
        "transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0051AE] focus-visible:ring-offset-2",
        /* Hover: translates -2px max, stronger shadow, no scaling */
        "hover:-translate-y-[2px] hover:shadow-[0_12px_24px_-8px_rgba(0,43,152,0.45)]",
        /* Pressed: translates 1px down, smaller shadow */
        "active:translate-y-[1px] active:shadow-[0_4px_12px_-4px_rgba(0,43,152,0.3)]",
        /* Shadows and visibility state */
        "shadow-[0_8px_16px_-6px_rgba(0,43,152,0.35)]",
        visible ? "translate-x-0 opacity-100" : "translate-x-[14px] opacity-0",
        open ? "pointer-events-none translate-x-[10px] opacity-0" : "pointer-events-auto",
        /* Dimensions: 180-205px wide, 60-66px high on desktop — reduced slightly for a cleaner fit */
        "h-[52px] w-[165px] sm:right-6 sm:h-[56px] sm:w-[178px]"
      )}
    >
      {/* Dark navy pill: overlaps circular avatar */}
      <div className="absolute right-0 top-1/2 flex h-[42px] w-[136px] -translate-y-1/2 items-center gap-2 rounded-full border border-white/20 bg-[#002B98] pl-[34px] pr-5 text-white transition-colors duration-200 hover:border-white/45 sm:h-[46px] sm:w-[148px] sm:pl-[40px]">
        <WaveformIcon className="size-4 shrink-0 text-white/80 sm:size-5" />
        <span className="font-display text-[14.5px] font-semibold tracking-[-0.01em] text-white">
          Neo
        </span>
      </div>

      {/* Avatar circle: overlaps by 22-30px */}
      <div className="absolute left-0 top-1/2 flex size-[52px] -translate-y-1/2 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#002B98] shadow-md sm:size-[60px]">
        <img
          src={neoAvatarSrc}
          alt=""
          className="size-full rounded-full object-cover"
        />
        {/* Status dot: 10-12px green dot with 2-3px white border */}
        <span
          className="absolute bottom-0.5 right-0.5 size-[9px] rounded-full border-2 border-white bg-[#22C55E] sm:size-[11px]"
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
