import { useEffect, useState } from "react";
import logo from "@/assets/shrineo-logo.png";

export function SplashLoader() {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Smooth progress animation over 1.4 seconds
    const duration = 1400;
    const start = performance.now();

    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);

      // Apply ease-out-quad curve for smoother completion feeling
      const eased = 1 - Math.pow(1 - pct / 100, 2);
      setProgress(Math.round(eased * 100));

      if (elapsed < duration) {
        frameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        // Begin fade out transition
        setTimeout(() => {
          setFadeOut(true);
          // Unmount after fade animation completes
          setTimeout(() => {
            setVisible(false);
          }, 500); // matches transition-opacity duration-500
        }, 150);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-[#00103A] via-[#001A5C] to-[#002B98] text-white transition-opacity duration-500 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center animate-[shrineo-rise_600ms_cubic-bezier(0.16,1,0.3,1)]">
        {/* Logo purely */}
        <img
          src={logo}
          alt="ShriNeo Capital logo"
          className="size-20 object-contain animate-[pulse_3s_infinite_ease-in-out]"
        />

        {/* Brand Text Stack */}
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white md:text-3xl">
          ShriNeo Capital
        </h1>
        <p className="mt-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#B9C6E8] font-mono text-center px-4">
          Bharat Ka Digital Lending Partner
        </p>

        {/* Progress Container */}
        <div className="mt-10 flex flex-col items-center">
          {/* Progress Track */}
          <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
            {/* Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-[#0051AE] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percentage */}
          <span className="num mt-3 text-[11px] font-medium tracking-[0.08em] uppercase text-[#B9C6E8]/60 font-mono">
            Loading {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
