import { formatINR, formatPercent } from "@/lib/format";
import { StatusPill } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

/**
 * Illustrative offer comparison. Lender names are placeholders and the terms
 * are not live quotes — everything here is clearly labelled demonstration data.
 */
const demoOffers = [
  {
    lender: "Participating Bank A",
    amount: 300000,
    rate: 11.5,
    apr: 12.4,
    emi: 9885,
    tenureMonths: 36,
    processingFee: 3540,
    badge: "Lowest total cost",
    rationale: "Lowest total repayment across matching lenders for this amount and tenure.",
  },
  {
    lender: "Participating NBFC B",
    amount: 300000,
    rate: 12.9,
    apr: 14.1,
    emi: 10086,
    tenureMonths: 36,
    processingFee: 5900,
    badge: "Highest approval likelihood",
    rationale: "Criteria most closely match the profile information provided.",
  },
  {
    lender: "Participating Bank C",
    amount: 275000,
    rate: 11.9,
    apr: 12.9,
    emi: 7583,
    tenureMonths: 42,
    processingFee: 4130,
    badge: "Lowest EMI",
    rationale: "Longer tenure reduces the monthly instalment but increases total interest.",
  },
];

export function OfferComparisonPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Offers are ranked by total cost of borrowing by default. No lender pays for placement and
          no matching offer is hidden.
        </p>
        <StatusPill tone="neutral">
          <FileText aria-hidden className="size-3.5" />
          Demonstration data
        </StatusPill>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <caption className="sr-only">
            Illustrative comparison of loan offers from participating lenders
          </caption>
          <thead className="bg-surface">
            <tr>
              {[
                "Lender",
                "Amount",
                "Rate p.a.",
                "APR",
                "Monthly EMI",
                "Tenure",
                "Processing fee",
                "",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demoOffers.map((offer) => (
              <tr key={offer.lender} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-4 text-left font-medium">
                  {offer.lender}
                  <span className="mt-1.5 block">
                    <StatusPill tone="info">{offer.badge}</StatusPill>
                  </span>
                  <span className="mt-1.5 block text-xs font-normal text-muted-foreground">
                    {offer.rationale}
                  </span>
                </th>
                <td className="num px-4 py-4 whitespace-nowrap">{formatINR(offer.amount)}</td>
                <td className="num px-4 py-4 whitespace-nowrap">{formatPercent(offer.rate, 1)}</td>
                <td className="num px-4 py-4 whitespace-nowrap">{formatPercent(offer.apr, 1)}</td>
                <td className="num px-4 py-4 whitespace-nowrap">{formatINR(offer.emi)}</td>
                <td className="num px-4 py-4 whitespace-nowrap">{offer.tenureMonths} months</td>
                <td className="num px-4 py-4 whitespace-nowrap">
                  {formatINR(offer.processingFee)}
                </td>
                <td className="px-4 py-4">
                  <Button size="sm" variant="outline" disabled>
                    View Key Fact Statement
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted-foreground">
        Live offers appear inside your application after your details and consent are recorded. The
        final decision belongs to the participating lender.
      </p>
    </div>
  );
}
