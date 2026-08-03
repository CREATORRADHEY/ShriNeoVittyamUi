import { Link } from "@tanstack/react-router";
import logo from "@/assets/shrineo-logo.png.asset.json";
import { products } from "@/config/products";
import { configured, org } from "@/config/org";

type FooterLink = { label: string; to?: string; href?: string };

const companyLinks: FooterLink[] = [
  { label: "About", to: "/about" },
  { label: "Blog", to: "/help-center" },
  { label: "Careers", href: "mailto:careers@shrineocapital.com" },
  { label: "Contact", to: "/contact" },
  { label: "Press", to: "/about" },
  { label: "Partners", to: "/for-lenders" },
];

const trustLinks: FooterLink[] = [
  { label: "Trust Center", to: "/trust-center" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "Grievance Redressal", to: "/grievance-redressal" },
];

export function SiteFooter() {
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Products",
      links: products.map((product) => ({ label: product.name, to: product.path })),
    },
    { title: "Company", links: companyLinks },
    { title: "Trust & Legal", links: trustLinks },
  ];

  return (
    <footer className="w-full bg-[#000890] text-[#B9C6E8]">
      <div className="mx-auto w-full max-w-[1320px] px-5 pt-[70px] sm:px-8 lg:px-12 lg:pt-[88px]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <div className="max-w-xs">
            <span className="inline-flex rounded-[10px] bg-white px-3.5 py-2.5">
              <img src={logo.url} alt="ShriNeo Capital" className="block h-11 w-auto object-contain" />
            </span>
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
              <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#B9C6E8]/80">
                CIN: <span className="num">{configured(org.cin)}</span>
              </p>
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
                {configured(org.grievanceOfficer.name)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3 py-5 pb-8 lg:pb-11">
          <span className="text-[12.5px] text-[#B9C6E8]/75">
            &copy; {new Date().getFullYear()} {org.legalEntity}. All rights reserved.
          </span>
          <span className="text-[12.5px] text-[#B9C6E8]/75">
            Operated under RBI Digital Lending Guidelines.
          </span>
        </div>
      </div>
    </footer>
  );
}
