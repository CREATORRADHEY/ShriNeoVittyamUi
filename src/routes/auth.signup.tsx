import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PartialDataState } from "@/components/design-system/states";
import { usePrototype } from "@/prototype/state";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Create an account — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Create a ShriNeo Capital account to compare loan offers from participating banks and NBFCs. Verification is by one-time password.",
      },
      { property: "og:title", content: "Create an account — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Start a loan application or register as an agent.",
      },
      { property: "og:url", content: "/auth/signup" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/auth/signup" }],
  }),
  component: SignUpPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Indian mobile number"),
  isAgent: z.string().optional(),
  terms: z.literal("on", { message: "Please accept the terms to continue" }),
});

type Errors = Partial<Record<"name" | "phone" | "terms", string>>;

function SignUpPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isAgentChecked, setIsAgentChecked] = useState(false);
  const navigate = useNavigate();
  const prototype = usePrototype();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);

    const isAgent = data.isAgent === "on";
    // Set prototype state and route
    prototype.set("role", isAgent ? "agent" : "borrower");
    setTimeout(() => {
      navigate({ to: isAgent ? "/app/agent" : "/app/borrower" });
    }, 1500);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Takes a minute. Nothing is shared with any lender until you ask us to."
      footer={
        <>
          Already registered?{" "}
          <Link to="/auth/signin" className="font-medium text-primary underline">
            Log in
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={onSubmit} className="grid gap-5">
        <div>
          <Label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Full name
          </Label>
          <Input id="name" name="name" autoComplete="name" className="h-11" required />
          {errors.name ? (
            <p role="alert" className="mt-1.5 text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

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
              required
            />
          </div>
          {errors.phone ? (
            <p role="alert" className="mt-1.5 text-sm text-destructive">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-start gap-3">
            <Checkbox
              id="isAgent"
              name="isAgent"
              className="mt-0.5"
              checked={isAgentChecked}
              onCheckedChange={(checked) => setIsAgentChecked(Boolean(checked))}
            />
            <Label htmlFor="isAgent" className="text-sm leading-snug font-normal">
              Are you a loan agent?
            </Label>
          </div>
          {isAgentChecked ? (
            <p className="pl-7 text-xs text-muted-foreground">
              You will be asked to complete KYC and agent verification after sign-up
            </p>
          ) : null}
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="terms" name="terms" className="mt-0.5" />
          <Label htmlFor="terms" className="text-sm leading-snug font-normal">
            I have read and accept the{" "}
            <Link to="/terms" className="text-primary underline">
              Terms and Conditions
            </Link>{" "}
            and the{" "}
            <Link to="/privacy-policy" className="text-primary underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.terms ? (
          <p role="alert" className="-mt-3 text-sm text-destructive">
            {errors.terms}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="min-h-11">
          Send one-time password
        </Button>
        <p className="text-xs text-muted-foreground">
          Creating an account does not start a credit check. Bureau checks, bank data access and
          e-sign are consented to separately, later in the process.
        </p>
      </form>

      {submitted ? (
        <div className="mt-5">
          <PartialDataState body="Registration successful! Directing you to your workspace..." />
        </div>
      ) : null}
    </AuthShell>
  );
}
