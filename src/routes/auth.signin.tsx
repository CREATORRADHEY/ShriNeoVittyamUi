import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PartialDataState } from "@/components/design-system/states";

export const Route = createFileRoute("/auth/signin")({
  head: () => ({
    meta: [
      { title: "Log in — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Log in to your ShriNeo Capital account with your registered mobile number to track your loan application.",
      },
      { property: "og:title", content: "Log in — ShriNeo Capital" },
      { property: "og:description", content: "Access your ShriNeo Capital account." },
      { property: "og:url", content: "/auth/signin" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/auth/signin" }],
  }),
  component: SignInPage,
});

const phoneSchema = z
  .string()
  .trim()
  .regex(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Indian mobile number.");

function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("phone");
    const result = phoneSchema.safeParse(String(value ?? ""));
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Enter a valid mobile number.");
      setSubmitted(false);
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  return (
    <AuthShell
      title="Log in"
      subtitle="We send a one-time password to your registered mobile number. No password to remember."
      footer={
        <>
          New to ShriNeo?{" "}
          <Link to="/auth/signup" className="font-medium text-primary underline">
            Create an account
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={onSubmit} className="grid gap-5">
        <div>
          <Label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Mobile number
          </Label>
          <div className="flex items-center gap-2">
            <span className="num grid h-11 place-items-center rounded-md border border-input px-3 text-sm text-muted-foreground">
              +91
            </span>
            <Input
              id="phone"
              name="phone"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              className="num h-11"
              aria-describedby={error ? "phone-error" : undefined}
              aria-invalid={error ? true : undefined}
              required
            />
          </div>
          {error ? (
            <p id="phone-error" role="alert" className="mt-1.5 text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        <Button type="submit" size="lg" className="min-h-11">
          Send one-time password
        </Button>
      </form>

      {submitted ? (
        <div className="mt-5">
          <PartialDataState body="Accounts are not live yet, so no OTP has been sent. Sign-in will work as soon as the secure account service is connected." />
        </div>
      ) : null}
    </AuthShell>
  );
}
