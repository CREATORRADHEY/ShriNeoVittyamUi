import { Link } from "@tanstack/react-router";
import logo from "@/assets/shrineo-logo.png";
import { products } from "@/config/products";
import { configured, org } from "@/config/org";

type FooterLink = { label: string; to?: string; href?: string };

const companyLinks: FooterLink[] = [
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Careers", href: "mailto:careers@shrineocapital.com" },
  { label: "Contact", to: "/contact" },
  { label: "Press", to: "/press" },
  { label: "Partner with us", to: "/for-lenders" },
];

const trustLinks: FooterLink[] = [
  { label: "Trust Center", to: "/trust-center" },
  { label: "SNV Trust Score", to: "/trust-center/snv-trust-score" },
  { label: "Security", to: "/trust-center/security" },
  { label: "Privacy and Data", to: "/trust-center/privacy-and-data" },
  { label: "Digital Lending Disclosures", to: "/digital-lending-disclosures" },
  { label: "Accessibility", to: "/accessibility" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "Grievance Redressal", to: "/grievance-redressal" },
];

const solutionsLinks: FooterLink[] = [
  { label: "For Borrowers", to: "/for-borrowers" },
  { label: "For Agents", to: "/for-agents" },
  { label: "For Lenders", to: "/for-lenders" },
];

const helpLinks: FooterLink[] = [
  { label: "FAQ", to: "/faq" },
  { label: "Help Center", to: "/help-center" },
  { label: "System Status", to: "/system-status" },
  { label: "Track a complaint", to: "/grievance-redressal" },
];

export function SiteFooter() {
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Products",
      links: products.map((product) => ({ label: product.name, to: product.path })),
    },
    { title: "Solutions", links: solutionsLinks },
    { title: "Company", links: companyLinks },
    { title: "Trust & Legal", links: trustLinks },
    { title: "Help", links: helpLinks },
  ];

  return (
    <footer className="navy-band w-full text-[#B9C6E8]">
      <div className="mx-auto w-full max-w-[1320px] px-5 md:px-10 lg:px-14 xl:px-16 pt-[70px] lg:pt-[88px]">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr_1fr] lg:gap-6 xl:gap-12">
          <div className="max-w-[260px] lg:max-w-none">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="ShriNeo Capital" className="block h-12 w-auto shrink-0 object-contain" />
              <span className="flex flex-col leading-tight">
                <span className="whitespace-nowrap text-[18px] font-semibold tracking-tight text-white">
                  ShriNeo Capital
                </span>
                <span className="whitespace-nowrap text-[10.5px] text-[#B9C6E8]/70">
                  Bharat Ka Digital Lending Partner
                </span>
              </span>
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-[#B9C6E8]">
              Digital Lending Partner for Bharat.
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-[#B9C6E8]/70">
              A brand of {org.legalEntity}.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.11em] text-[#B9C6E8]/75">
                {column.title}
              </h2>
              <ul className="mt-3 flex flex-col gap-0.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="flex min-h-11 w-fit items-center text-[14.5px] text-white/85 transition-opacity hover:text-white hover:opacity-100"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="flex min-h-11 w-fit items-center text-[14.5px] text-white/85 transition-opacity hover:text-white hover:opacity-100"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-11 grid gap-6 border-y border-white/15 py-6 lg:mt-16 lg:grid-cols-2 lg:gap-12">
          <div className="flex items-start gap-3">
            <svg
              width="18"
              height="20"
              viewBox="0 0 14 16"
              fill="none"
              aria-hidden="true"
              className="mt-0.5 flex-none"
            >
              <path
                d="M7 1.1 12.4 3.2v4.3c0 3.4-2.2 6.3-5.4 7.4-3.2-1.1-5.4-4-5.4-7.4V3.2L7 1.1z"
                stroke="#B9C6E8"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path
                d="M4.9 7.9 6.5 9.5l2.9-3"
                stroke="#B9C6E8"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-[14.5px] font-semibold text-white">
                RBI-aligned Lending Service Provider
              </p>
              {org.cin && (
                <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#B9C6E8]/80">
                  CIN: <span className="num">{org.cin}</span>
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-[14.5px] font-semibold text-white">Grievance Redressal Officer</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#B9C6E8]/85">
              Reachable for any complaint about a loan, an agent, or your data.
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="mailto:grievance@shrineocapital.com"
                className="inline-flex min-h-11 items-center border-b border-white/40 font-mono text-[12.5px] text-white transition-colors hover:border-white"
              >
                grievance@shrineocapital.com
              </a>
              <span className="font-mono text-xs text-[#B9C6E8]/70">
                {org.grievanceOfficer.name || ""}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3 py-5 pb-8 lg:pb-11">
          <p className="text-[12.5px] text-[#B9C6E8]/75">
            Loan funds move directly between the regulated lender and your bank account. ShriNeo
            does not hold or control loan funds at any stage.
          </p>
          <div className="flex w-full flex-wrap items-center justify-between gap-x-7 gap-y-2 border-t border-white/10 pt-3">
            <span className="text-[12.5px] text-[#B9C6E8]/75">
              &copy; {new Date().getFullYear()} {org.legalEntity}. All rights reserved.
            </span>
            <span className="text-[12.5px] text-[#B9C6E8]/75">
              Operated under RBI Digital Lending Guidelines.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
