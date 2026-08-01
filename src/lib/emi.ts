export type EmiInput = {
  /** Loan principal in rupees. */
  principal: number;
  /** Nominal annual interest rate, e.g. 12.5 for 12.5%. */
  annualRatePercent: number;
  /** Tenure in months. */
  tenureMonths: number;
};

export type EmiResult = {
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
};

/** Standard reducing-balance EMI. Estimate only — lender terms are final. */
export function calculateEmi({ principal, annualRatePercent, tenureMonths }: EmiInput): EmiResult {
  if (principal <= 0 || tenureMonths <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalRepayment: 0 };
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const monthlyEmi =
    monthlyRate === 0
      ? principal / tenureMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalRepayment = monthlyEmi * tenureMonths;

  return {
    monthlyEmi: Math.round(monthlyEmi),
    totalInterest: Math.round(totalRepayment - principal),
    totalRepayment: Math.round(totalRepayment),
  };
}
