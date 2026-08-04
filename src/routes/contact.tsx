import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { org, configured } from "@/config/org";
import { PublicShell } from "@/components/layout/public-shell";
import { Section, SectionHeading, Eyebrow } from "@/components/design-system/section";
import { SuccessState } from "@/components/design-system/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ShriNeo Capital — support and enquiries" },
      {
        name: "description",
        content:
          "Reach the ShriNeo Capital team for product questions, agent enquiries and support. Complaints are handled through our Grievance Redressal process.",
      },
      { property: "og:title", content: "Contact ShriNeo Capital" },
      {
        property: "og:description",
        content: "Support, agent enquiries and registered office details.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a 10-digit mobile number."),
  topic: z.string().trim().min(1, "Choose what your message is about.").max(80),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more, in at least 10 characters.")
    .max(1000, "Please keep your message under 1000 characters."),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function ContactPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

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
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <PublicShell>
      <Section labelledBy="contact-title">
        <div className="max-w-3xl">
          <Eyebrow>Contact</Eyebrow>
          <h1
            id="contact-title"
            className="editorial text-[clamp(2rem,5vw,3rem)] tracking-tight text-balance"
          >
            Talk to a person who can actually help
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            For questions about products, applications or agent registration. If you wish to raise a
            complaint, please use the Grievance Redressal process so it is formally tracked.
          </p>
        </div>
      </Section>

      <Section tone="surface" labelledBy="form-title">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading id="form-title" title="Send us a message" />
            {sent ? (
              <div className="mt-6">
                <SuccessState
                  title="Message ready to send"
                  body="Message delivery is not connected yet, so nothing has been sent. Once our support inbox is live, submissions from this form will reach the ShriNeo Capital team."
                  action={
                    <Button variant="outline" onClick={() => setSent(false)} className="min-h-11">
                      Write another message
                    </Button>
                  }
                />
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="mt-6 grid gap-5">
                <Field id="name" label="Full name" error={errors.name}>
                  <Input id="name" name="name" autoComplete="name" required />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="email" label="Email address" error={errors.email}>
                    <Input id="email" name="email" type="email" autoComplete="email" required />
                  </Field>
                  <Field id="phone" label="Mobile number" error={errors.phone}>
                    <Input
                      id="phone"
                      name="phone"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      className="num"
                      required
                    />
                  </Field>
                </div>
                <Field id="topic" label="What is this about?" error={errors.topic}>
                  <select
                    id="topic"
                    name="topic"
                    required
                    defaultValue="Loan products"
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-base"
                  >
                    <option>Loan products</option>
                    <option>An existing application</option>
                    <option>Agent registration</option>
                    <option>Lender partnership</option>
                    <option>Something else</option>
                  </select>
                </Field>
                <Field id="message" label="Your message" error={errors.message}>
                  <Textarea id="message" name="message" rows={5} maxLength={1000} required />
                </Field>
                <div>
                  <Button type="submit" size="lg" className="min-h-11">
                    Send message
                  </Button>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Please do not include passwords, OTPs or full bank account numbers in this form.
                  </p>
                </div>
              </form>
            )}
          </div>

          <div className="h-fit rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Reach us directly</h2>
            <dl className="mt-4 space-y-5 text-sm">
              <Detail icon={Mail} term="Support email" detail={configured(org.supportEmail)} />
              <Detail icon={Phone} term="Support phone" detail={configured(org.supportPhone)} />
              <Detail
                icon={MapPin}
                term="Registered office"
                detail={configured(org.registeredAddress)}
              />
              <Detail
                icon={Clock}
                term="Grievance response"
                detail={org.grievanceOfficer.responseWindow}
              />
            </dl>
            <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
              {org.legalEntity} — {org.role}
            </p>
          </div>
        </div>
      </Section>
    </PublicShell>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Detail({ icon: Icon, term, detail }: { icon: typeof Mail; term: string; detail: string }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-muted-foreground">
        <Icon aria-hidden className="size-4" />
        {term}
      </dt>
      <dd className="mt-1 font-medium">{detail}</dd>
    </div>
  );
}
