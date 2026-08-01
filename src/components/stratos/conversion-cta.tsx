import { useState, type FormEvent } from "react";
import { Button } from "./primitives";

type State = "idle" | "submitting" | "success" | "error";

export function ConversionCta() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setState("error");
      setMessage("Enter a valid work email address.");
      return;
    }
    setState("submitting");
    setMessage("");
    window.setTimeout(() => {
      setState("success");
      setMessage("Thanks — our institutional team will be in touch within one business day.");
    }, 900);
  };

  return (
    <section className="px-6 pb-24">
      <div className="reveal mx-auto max-w-7xl rounded-4xl bg-muted p-12 text-center md:p-24">
        <h2 className="mb-8 text-4xl font-light tracking-tight text-balance md:text-6xl">
          Ready to upgrade your <br className="hidden md:block" />
          <span className="font-normal">financial operating system?</span>
        </h2>

        {state === "success" ? (
          <p
            role="status"
            className="mx-auto max-w-md text-base font-medium text-foreground"
          >
            {message}
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col items-center justify-center gap-4 md:flex-row"
          >
            <label htmlFor="cta-email" className="sr-only">
              Work email
            </label>
            <input
              id="cta-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              aria-invalid={state === "error"}
              aria-describedby={state === "error" ? "cta-email-error" : undefined}
              placeholder="work@company.com"
              className={
                "min-h-14 w-full rounded-xl border bg-background px-6 py-4 placeholder:text-muted-foreground md:w-80 " +
                (state === "error" ? "border-destructive" : "border-border")
              }
            />
            <Button type="submit" size="lg" variant="ink" className="w-full md:w-auto" disabled={state === "submitting"}>
              {state === "submitting" ? "Submitting…" : "Get Started Now"}
            </Button>
          </form>
        )}

        {state === "error" && (
          <p id="cta-email-error" role="alert" className="mt-4 text-sm font-medium text-destructive">
            {message}
          </p>
        )}

        <p className="mt-8 text-sm text-muted-foreground">
          Trusted by 2,000+ institutional clients worldwide.
        </p>
      </div>
    </section>
  );
}
