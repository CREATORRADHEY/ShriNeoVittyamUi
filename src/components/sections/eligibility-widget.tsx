import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const MIN_AMOUNT = 1_000;
const MAX_AMOUNT = 5_00_00_000;

function groupIndian(digits: string) {
  if (!digits) return "";
  const n = digits.replace(/^0+(?=\d)/, "");
  const last3 = n.slice(-3);
  const rest = n.slice(0, -3);
  if (!rest) return last3;
  return `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${last3}`;
}

function groupMobile(digits: string) {
  return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
}

/** Count digits before the caret so formatting never moves the cursor oddly. */
function caretFromDigits(formatted: string, digitsBefore: number) {
  if (digitsBefore <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i += 1) {
    if (/\d/.test(formatted[i]!)) {
      seen += 1;
      if (seen === digitsBefore) return i + 1;
    }
  }
  return formatted.length;
}

const inputClass =
  "min-h-[52px] w-full rounded-[10px] border border-brand-200 bg-brand-50/70 px-3 text-base font-medium text-foreground transition-[border-color,box-shadow] duration-150 hover:border-brand-300 focus:border-primary focus:ring-2 focus:ring-primary/35 focus:outline-none aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/25";

/**
 * Homepage eligibility widget — a prototype entry point, not a live check.
 * No OTP, consent, rates or lender data live in this card.
 */
export function EligibilityWidget() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const amountRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  const [amount, setAmount] = useState("2,00,000");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState<{
    amount?: string | undefined;
    mobile?: string | undefined;
  }>({});
  const [invalidNudge, setInvalidNudge] = useState(false);
  const [loading, setLoading] = useState(false);

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const el = event.target;
    const caret = el.selectionStart ?? el.value.length;
    const digitsBefore = el.value.slice(0, caret).replace(/\D/g, "").length;
    const formatted = groupIndian(el.value.replace(/\D/g, "").slice(0, 9));
    setAmount(formatted);
    setErrors((e) => ({ ...e, amount: undefined }));
    requestAnimationFrame(() => {
      const pos = caretFromDigits(formatted, digitsBefore);
      amountRef.current?.setSelectionRange(pos, pos);
    });
  };

  const onMobileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const el = event.target;
    const caret = el.selectionStart ?? el.value.length;
    const digitsBefore = el.value.slice(0, caret).replace(/\D/g, "").length;
    const formatted = groupMobile(el.value.replace(/\D/g, "").slice(0, 10));
    setMobile(formatted);
    setErrors((e) => ({ ...e, mobile: undefined }));
    requestAnimationFrame(() => {
      const pos = caretFromDigits(formatted, digitsBefore);
      mobileRef.current?.setSelectionRange(pos, pos);
    });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const amountValue = Number(amount.replace(/\D/g, ""));
    const mobileDigits = mobile.replace(/\D/g, "");
    const next: { amount?: string | undefined; mobile?: string | undefined } = {};

    if (!amountValue || amountValue < MIN_AMOUNT || amountValue > MAX_AMOUNT) {
      next.amount = t("elig.error.amount");
    }
    if (!/^[6-9]\d{9}$/.test(mobileDigits)) {
      next.mobile = t("elig.error.mobile");
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setInvalidNudge(true);
      setTimeout(() => setInvalidNudge(false), 260);
      (next.amount ? amountRef : mobileRef).current?.focus();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      void navigate({ to: "/auth/signup" });
    }, 700);
  };

  return (
    <section
      id="check-eligibility"
      aria-labelledby="eligibility-title"
      className="bg-gradient-to-b from-background to-brand-50"
    >
      <div className="container-page py-14 md:py-20">
        <form
          noValidate
          onSubmit={onSubmit}
          className={cn(
            "rounded-[16px] border border-border bg-surface-warm p-5 shadow-[var(--shadow-panel)] sm:p-7",
            invalidNudge && "nudge-once",
          )}
        >
          <h2
            id="eligibility-title"
            className="font-display text-[clamp(1.375rem,2.2vw,1.625rem)] font-semibold tracking-tight text-primary"
          >
            {t("elig.title")}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-start">
            <div className="min-w-0">
              <label htmlFor="elig-amount" className="label-micro block text-muted-foreground">
                {t("elig.amount")}
              </label>
              <div className="mt-2 flex items-center gap-1">
                <span aria-hidden className="num shrink-0 text-base font-medium">
                  ₹
                </span>
                <input
                  ref={amountRef}
                  id="elig-amount"
                  name="amount"
                  inputMode="numeric"
                  autoComplete="off"
                  value={amount}
                  onChange={onAmountChange}
                  aria-invalid={Boolean(errors.amount)}
                  aria-describedby={errors.amount ? "elig-amount-error" : undefined}
                  className={cn(inputClass, "num")}
                />
              </div>
              {errors.amount ? (
                <p
                  id="elig-amount-error"
                  className="mt-2 flex items-start gap-1.5 text-sm text-destructive"
                >
                  <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
                  {errors.amount}
                </p>
              ) : null}
            </div>

            <div className="min-w-0">
              <label htmlFor="elig-mobile" className="label-micro block text-muted-foreground">
                {t("elig.mobile")}
              </label>
              <div className="mt-2 flex items-center gap-1">
                <span aria-hidden className="num shrink-0 text-base font-medium">
                  +91
                </span>
                <input
                  ref={mobileRef}
                  id="elig-mobile"
                  name="mobile"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="00000 00000"
                  value={mobile}
                  onChange={onMobileChange}
                  aria-invalid={Boolean(errors.mobile)}
                  aria-describedby={errors.mobile ? "elig-mobile-error" : undefined}
                  className={cn(inputClass, "num")}
                />
              </div>
              {errors.mobile ? (
                <p
                  id="elig-mobile-error"
                  className="mt-2 flex items-start gap-1.5 text-sm text-destructive"
                >
                  <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
                  {errors.mobile}
                </p>
              ) : null}
            </div>

            <div className="md:pt-[26px]">
              <button
                type="submit"
                className="cta-saffron font-display inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] px-5 text-base font-semibold transition-[background-color,transform] duration-150 hover:-translate-y-px active:translate-y-px md:w-[196px]"
              >
                {loading ? t("elig.loading") : t("elig.cta")}
                {loading ? null : <ArrowRight aria-hidden className="size-4" />}
              </button>
            </div>
          </div>

          <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
            {t("elig.trust")}
          </p>
        </form>
      </div>
    </section>
  );
}
