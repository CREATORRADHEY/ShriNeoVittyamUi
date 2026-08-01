import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { SiteNav } from "@/components/stratos/site-nav";
import { Hero } from "@/components/stratos/hero";
import { BentoGrid } from "@/components/stratos/bento-grid";
import { SecuritySection } from "@/components/stratos/security-section";
import { Pricing } from "@/components/stratos/pricing";
import { ConversionCta } from "@/components/stratos/conversion-cta";
import { SiteFooter } from "@/components/stratos/site-footer";

const title = "Stratos — Institutional Treasury & Global Settlements";
const description =
  "Stratos unifies institutional treasury management, multi-rail cross-border settlements, and programmable liquidity for modern enterprises.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <div ref={scope} className="min-h-dvh bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <BentoGrid />
        <SecuritySection />
        <Pricing />
        <ConversionCta />
      </main>
      <SiteFooter />
    </div>
  );
}
