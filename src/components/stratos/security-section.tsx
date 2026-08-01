import vaultImg from "@/assets/vault-security.jpg";

const guarantees = [
  "SOC2 Type II Certified",
  "FIPS 140-2 Level 3 HSMs",
  "Full Asset Segregation",
];

export function SecuritySection() {
  return (
    <section id="security" className="bg-ink px-6 py-24 text-ink-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
        <div className="flex-1">
          <h2 className="reveal mb-6 text-4xl font-light tracking-tight">Hardened Infrastructure</h2>
          <p className="reveal mb-8 text-lg text-ink-foreground/60" data-reveal-delay="0.06">
            Your assets are protected by MPC-CMP technology and offline cold storage vaults. We
            maintain the highest regulatory standards globally.
          </p>
          <ul className="space-y-4">
            {guarantees.map((g, i) => (
              <li
                key={g}
                className="reveal flex items-center gap-4 text-sm font-medium"
                data-reveal-delay={0.12 + i * 0.06}
              >
                <span aria-hidden className="size-2 rounded-full bg-primary" />
                {g}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full flex-1">
          <div className="reveal aspect-square w-full overflow-hidden rounded-3xl outline outline-offset-[-1px] outline-white/10">
            <img
              src={vaultImg}
              alt="Close-up of a machined titanium vault door mechanism"
              width={1200}
              height={1200}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
