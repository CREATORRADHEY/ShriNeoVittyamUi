import { Button } from "./primitives";

const tiers = [
  {
    name: "Foundations",
    price: "$0",
    suffix: "/mo",
    copy: "Pay only for what you use. Perfect for early-stage teams.",
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Growth",
    price: "$499",
    suffix: "/mo",
    copy: "Advanced treasury controls and lower settlement fees.",
    cta: "Contact Sales",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "",
    copy: "Unlimited volume, dedicated AM, and custom API limits.",
    cta: "Book Demo",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="reveal mb-4 text-4xl font-semibold tracking-tight">Transparent Tiers</h2>
        <p className="reveal text-muted-foreground" data-reveal-delay="0.06">
          Scalable plans for startups to global giants.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {tiers.map((t, i) => (
          <div
            key={t.name}
            data-reveal-delay={i * 0.08}
            className={
              "reveal rounded-3xl p-8 " +
              (t.featured
                ? "border-2 border-primary shadow-[var(--shadow-quartz)]"
                : "border border-border")
            }
          >
            <h3
              className={
                "mb-2 text-sm tracking-widest uppercase " +
                (t.featured ? "text-primary" : "text-muted-foreground")
              }
            >
              {t.name}
            </h3>
            <div className="num mb-6 text-3xl font-bold">
              {t.price}
              {t.suffix && <span className="text-sm font-normal">{t.suffix}</span>}
            </div>
            <p className="mb-8 text-sm text-muted-foreground">{t.copy}</p>
            <Button variant={t.featured ? "primary" : "outline"} className="w-full">
              {t.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
