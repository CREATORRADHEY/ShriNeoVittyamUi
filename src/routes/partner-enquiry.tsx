import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PublicShell } from "@/components/layout/public-shell";
import { PageHero } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/design-system/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PartialDataState } from "@/components/design-system/states";

export const Route = createFileRoute("/partner-enquiry")({
  head: () => ({
    meta: [
      { title: "Partner enquiry — banks, NBFCs and enterprises | ShriNeo Capital" },
      {
        name: "description",
        content:
          "Start a partnership conversation with ShriNeo Capital. For banks, NBFCs and enterprises evaluating a sourcing, co-lending or distribution arrangement.",
      },
      { property: "og:title", content: "Partner with ShriNeo Capital" },
      {
        property: "og:description",
        content: "Enquiry route for banks, NBFCs and enterprise distribution partners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/partner-enquiry" },
    ],
    links: [{ rel: "canonical", href: "/partner-enquiry" }],
  }),
  component: PartnerEnquiryPage,
});

const schema = z.object({
  organisation: z.string().trim().min(2, "Enter your organisation name").max(140),
  type: z.string().min(1, "Select an organisation type"),
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid work email address").max(160),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Indian mobile number"),
  interest: z.string().trim().min(10, "Tell us briefly what you are exploring").max(1000),
  consent: z.literal("on", { message: "Please confirm consent to be contacted" }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function PartnerEnquiryPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

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
  }

  return (
    <PublicShell>
      <PageHero
        eyebrow="Partnerships"
        title="Partner with ShriNeo Capital"
        body="For banks, NBFCs and enterprises evaluating a sourcing, distribution or assisted-journey arrangement. Borrower and agent queries are handled elsewhere."
        actions={
          <Link
            to="/for-lenders"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            See how lender integration works
          </Link>
        }
      />

      <Section labelledBy="form-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-xl">
            <SectionHeading id="form-title" title="Tell us about your organisation" />
            <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5">
              <div>
                <Label htmlFor="organisation" className="mb-1.5 block text-sm font-medium">
                  Organisation name
                </Label>
                <Input id="organisation" name="organisation" className="h-11" required />
                {errors.organisation ? (
                  <p role="alert" className="mt-1.5 text-sm text-destructive">
                    {errors.organisation}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="type" className="mb-1.5 block text-sm font-medium">
                  Organisation type
                </Label>
                <select
                  id="type"
                  name="type"
                  defaultValue=""
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-base"
                  required
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="bank">Bank</option>
                  <option value="nbfc">NBFC</option>
                  <option value="fintech">Fintech or technology provider</option>
                  <option value="enterprise">Enterprise distribution partner</option>
                </select>
                {errors.type ? (
                  <p role="alert" className="mt-1.5 text-sm text-destructive">
                    {errors.type}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Your full name
                </Label>
                <Input id="name" name="name" autoComplete="name" className="h-11" required />
                {errors.name ? (
                  <p role="alert" className="mt-1.5 text-sm text-destructive">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Work email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="h-11"
                  required
                />
                {errors.email ? (
                  <p role="alert" className="mt-1.5 text-sm text-destructive">
                    {errors.email}
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
                    maxLength={10}
                    autoComplete="tel-national"
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

              <div>
                <Label htmlFor="interest" className="mb-1.5 block text-sm font-medium">
                  Partnership interest
                </Label>
                <Textarea id="interest" name="interest" rows={5} required />
                {errors.interest ? (
                  <p role="alert" className="mt-1.5 text-sm text-destructive">
                    {errors.interest}
                  </p>
                ) : null}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="consent" name="consent" className="mt-0.5" />
                <Label htmlFor="consent" className="text-sm leading-snug font-normal">
                  I consent to ShriNeo Capital contacting me about this enquiry, in line with the{" "}
                  <Link to="/privacy-policy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                  .
                </Label>
              </div>
              {errors.consent ? (
                <p role="alert" className="-mt-3 text-sm text-destructive">
                  {errors.consent}
                </p>
              ) : null}

              <Button type="submit" size="lg" className="min-h-11">
                Submit enquiry
              </Button>

              {submitted ? (
                <PartialDataState body="Your details have been validated, but the enquiry has not been sent: the secure submission service is not connected yet. Please email partnerships@shrineocapital.com in the meantime." />
              ) : null}
            </form>
          </div>

          <aside className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-base font-semibold tracking-tight">What happens next</h2>
            <ol className="mt-4 grid gap-3 text-base leading-relaxed text-muted-foreground">
              <li>We acknowledge the enquiry and confirm the right team.</li>
              <li>An introductory call covers product scope, geography and volumes.</li>
              <li>Compliance, data handling and integration are reviewed before any agreement.</li>
            </ol>
            <p className="mt-6 text-sm text-muted-foreground">
              ShriNeo Capital is a Lending Service Provider. Nothing on this page constitutes an
              offer, a commitment or an existing partnership.
            </p>
          </aside>
        </div>
      </Section>
    </PublicShell>
  );
}
