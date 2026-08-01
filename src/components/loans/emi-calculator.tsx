import { useId, useMemo, useState } from "react";
import { calculateEmi } from "@/lib/emi";
import { formatINR } from "@/lib/format";
import { useI18n } from "@/i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";

type Props = {
  minAmount: number;
  maxAmount: number;
  defaultAmount?: number;
  defaultRate?: number;
  minTenureMonths?: number;
  maxTenureMonths?: number;
  defaultTenureMonths?: number;
};

export function EmiCalculator({
  minAmount,
  maxAmount,
  defaultAmount,
  defaultRate = 12,
  minTenureMonths = 6,
  maxTenureMonths = 60,
  defaultTenureMonths = 24,
}: Props) {
  const { t } = useI18n();
  const baseId = useId();
  const [amount, setAmount] = useState(defaultAmount ?? Math.min(maxAmount, minAmount * 10));
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenureMonths);

  const result = useMemo(
    () => calculateEmi({ principal: amount, annualRatePercent: rate, tenureMonths: tenure }),
    [amount, rate, tenure],
  );

  const amountId = `${baseId}-amount`;
  const rateId = `${baseId}-rate`;
  const tenureId = `${baseId}-tenure`;

  return (
    <div className="grid gap-8 rounded-xl border border-border bg-card p-6 md:grid-cols-2 md:p-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">{t("emi.title")}</h3>

        <Field
          id={amountId}
          label={t("emi.principal")}
          hint={`${formatINR(minAmount)} – ${formatINR(maxAmount)}`}
        >
          <Input
            id={amountId}
            type="number"
            inputMode="numeric"
            className="num"
            min={minAmount}
            max={maxAmount}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(clamp(Number(e.target.value), minAmount, maxAmount))}
          />
          <Slider
            aria-label={t("emi.principal")}
            value={[amount]}
            min={minAmount}
            max={maxAmount}
            step={1000}
            onValueChange={([v]) => setAmount(v ?? minAmount)}
            className="mt-3"
          />
        </Field>

        <Field id={rateId} label={t("emi.rate")} hint="Indicative. Set by the lender.">
          <Input
            id={rateId}
            type="number"
            inputMode="decimal"
            className="num"
            min={1}
            max={36}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(clamp(Number(e.target.value), 1, 36))}
          />
        </Field>

        <Field id={tenureId} label={t("emi.tenure")} hint={`${minTenureMonths}–${maxTenureMonths}`}>
          <Input
            id={tenureId}
            type="number"
            inputMode="numeric"
            className="num"
            min={minTenureMonths}
            max={maxTenureMonths}
            step={1}
            value={tenure}
            onChange={(e) =>
              setTenure(clamp(Number(e.target.value), minTenureMonths, maxTenureMonths))
            }
          />
          <Slider
            aria-label={t("emi.tenure")}
            value={[tenure]}
            min={minTenureMonths}
            max={maxTenureMonths}
            step={1}
            onValueChange={([v]) => setTenure(v ?? minTenureMonths)}
            className="mt-3"
          />
        </Field>
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-lg bg-surface p-6">
        <dl className="space-y-5" aria-live="polite">
          <Result label={t("emi.monthly")} value={formatINR(result.monthlyEmi)} emphasis />
          <Result label={t("emi.interest")} value={formatINR(result.totalInterest)} />
          <Result label={t("emi.total")} value={formatINR(result.totalRepayment)} />
        </dl>
        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          {t("emi.note")}
        </p>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </Label>
      {children}
      <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function Result({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd
        className={
          emphasis ? "num mt-1 text-3xl font-semibold text-primary" : "num mt-1 text-xl font-medium"
        }
      >
        {value}
      </dd>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}
