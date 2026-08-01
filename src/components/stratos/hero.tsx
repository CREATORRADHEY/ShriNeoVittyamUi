import { Button, Eyebrow } from "./primitives";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28">
      <div className="max-w-3xl">
        <div className="reveal">
          <Eyebrow>SERIES C FUNDED</Eyebrow>
        </div>

        <h1
          className="reveal mt-6 mb-8 text-5xl leading-[0.92] font-light tracking-tighter text-balance sm:text-6xl md:text-8xl"
          data-reveal-delay="0.08"
        >
          Capital moves at the <span className="font-normal text-primary">speed of light.</span>
        </h1>

        <p
          className="reveal mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          data-reveal-delay="0.16"
        >
          Unified institutional treasury management, global cross-border settlements, and
          programmable liquidity for modern enterprises.
        </p>

        <div className="reveal flex flex-wrap gap-4" data-reveal-delay="0.24">
          <Button size="lg">Open Account</Button>
          <Button size="lg" variant="outline">
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  );
}
