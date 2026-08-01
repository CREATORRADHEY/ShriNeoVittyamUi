import { Link } from "@tanstack/react-router";
import logo from "@/assets/shrineo-logo.png.asset.json";
import { products } from "@/config/products";
import { configured, org } from "@/config/org";
import { useI18n } from "@/i18n";

export function SiteFooter() {
  const { t } = useI18n();

  const company = [
    { to: "/about", label: t("nav.about") },
    { to: "/for-borrowers", label: t("nav.forBorrowers") },
    { to: "/for-agents", label: t("nav.forAgents") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  const legal = [
    { to: "/trust-center", label: t("nav.trust") },
    { to: "/privacy-policy", label: t("footer.privacy") },
    { to: "/terms", label: t("footer.terms") },
    { to: "/cookie-policy", label: t("footer.cookies") },
    { to: "/grievance-redressal", label: t("footer.grievance") },
  ] as const;

  return (
    <footer className="bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo.url} alt="" width={36} height={36} className="size-9 object-contain" />
            <span className="text-base font-semibold">ShriNeo Capital</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A vernacular-first digital lending platform connecting borrowers with participating
            banks and NBFCs.
          </p>
          <p className="mt-3 text-sm font-medium">{org.brandLine}</p>
        </div>

        <FooterColumn title={t("footer.products")}>
          {products.map((product) => (
            <li key={product.slug}>
              <Link to={product.path} className="hover:text-foreground hover:underline">
                {product.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t("footer.company")}>
          {company.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="hover:text-foreground hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t("footer.legal")}>
          {legal.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="hover:text-foreground hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-border">
        <div className="container-page grid gap-6 py-8 text-sm text-muted-foreground md:grid-cols-2">
          <div className="space-y-1">
            <p className="font-medium text-foreground">Regulatory and registration</p>
            <p>{org.roleStatement}</p>
            <p>
              CIN: <span className="num">{configured(org.cin)}</span>
            </p>
            <p>Registered office: {configured(org.registeredAddress)}</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Grievance Officer</p>
            <p>{configured(org.grievanceOfficer.name)}</p>
            <p>{configured(org.grievanceOfficer.email)}</p>
            <p>{org.grievanceOfficer.responseWindow}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {org.legalEntity}. All rights reserved.
          </p>
          <p>{t("footer.alignment")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{children}</ul>
    </nav>
  );
}
