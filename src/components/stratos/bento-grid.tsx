import { useEffect, useRef, useState } from "react";
import networkImg from "@/assets/settlement-network.jpg";
import { Tile } from "./primitives";

const bars = [50, 66, 75, 50, 100, 84];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setSeen(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

export function BentoGrid() {
  const { ref, seen } = useInView<HTMLDivElement>();

  return (
    <section id="platform" className="mx-auto max-w-7xl px-6 py-20" aria-labelledby="platform-heading">
      <h2 id="platform-heading" className="sr-only">
        Platform capabilities
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Tile className="bg-muted md:col-span-2">
          <h3 className="mb-4 text-2xl font-semibold">Multi-rail Settlements</h3>
          <p className="mb-8 text-muted-foreground">
            Execute transactions across SWIFT, SEPA, and instant digital rails from one dashboard.
          </p>
          <div className="aspect-[2/1] w-full overflow-hidden rounded-xl bg-background/50 outline outline-offset-[-1px] outline-border">
            <img
              src={networkImg}
              alt="Global settlement network with payment corridors connecting financial hubs"
              width={1600}
              height={800}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </Tile>

        <Tile className="flex flex-col justify-between bg-ink text-ink-foreground" delay={0.05}>
          <div className="num text-4xl font-light">99.99%</div>
          <div className="mt-8 text-sm tracking-widest uppercase opacity-60">Uptime Guarantee</div>
        </Tile>

        <Tile className="bg-primary text-primary-foreground" delay={0.1}>
          <h3 className="mb-4 text-xl font-medium">API-First</h3>
          <p className="text-sm opacity-80">
            Integrate treasury directly into your product stack with our robust SDK.
          </p>
        </Tile>

        <Tile className="bg-muted" delay={0.05}>
          <div
            aria-hidden
            className="mb-6 grid size-12 place-items-center rounded-full bg-background text-lg font-bold"
          >
            $
          </div>
          <h3 className="text-lg font-semibold">FX Engine</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Real-time mid-market rates with zero hidden spread.
          </p>
        </Tile>

        <Tile className="border border-border bg-card md:col-span-3" delay={0.1}>
          <div ref={ref} className="flex h-32 items-end justify-between gap-2" aria-hidden>
            {bars.map((h, i) => (
              <div
                key={i}
                className="w-full rounded-t-lg bg-primary transition-[height,opacity] duration-700 ease-[var(--ease-quartz)]"
                style={{
                  height: seen ? `${h}%` : "0%",
                  opacity: 0.1 + i * 0.18,
                  transitionDelay: `${i * 70}ms`,
                }}
              />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Institutional Volume</h3>
              <p className="text-sm text-muted-foreground">
                Visualizing $4.2B+ monthly throughput
              </p>
            </div>
            <div className="text-right">
              <div className="num text-2xl font-bold">+22.4%</div>
              <div className="text-[10px] tracking-wider text-muted-foreground uppercase">
                Year over Year
              </div>
            </div>
          </div>
        </Tile>
      </div>
    </section>
  );
}
