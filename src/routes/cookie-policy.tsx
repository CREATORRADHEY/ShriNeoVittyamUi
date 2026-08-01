import { createFileRoute } from "@tanstack/react-router";
import { org, configured } from "@/config/org";
import { LegalPage, LegalSection } from "@/components/layout/legal-page";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — ShriNeo Capital" },
      {
        name: "description",
        content:
          "Which cookies and similar technologies ShriNeo Capital uses, what each is for, and how you can control them.",
      },
      { property: "og:title", content: "Cookie Policy — ShriNeo Capital" },
      {
        property: "og:description",
        content: "How cookies are used on the ShriNeo Capital platform, and how to control them.",
      },
      { property: "og:url", content: "/cookie-policy" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      intro="Cookies and similar technologies used on the ShriNeo Capital website and application."
    >
      <LegalSection heading="1. What cookies are">
        <p>
          Cookies are small files stored on your device by your browser. Similar technologies
          include local storage, which we use to remember preferences such as your chosen language.
        </p>
      </LegalSection>

      <LegalSection heading="2. Categories we use">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-foreground">Strictly necessary</strong> — sign-in, session
            security and fraud prevention. These cannot be switched off within the product.
          </li>
          <li>
            <strong className="text-foreground">Preference</strong> — remembering your language
            choice and interface settings.
          </li>
          <li>
            <strong className="text-foreground">Analytics</strong> — understanding which pages are
            used, only where you have accepted analytics cookies.
          </li>
        </ul>
        <p>We do not use cookies to sell your data or to build advertising profiles.</p>
      </LegalSection>

      <LegalSection heading="3. Controlling cookies">
        <p>
          You can delete or block cookies in your browser settings. Blocking strictly necessary
          cookies will prevent sign-in and application features from working. Where an analytics
          consent choice is offered in the product, you can change it at any time.
        </p>
      </LegalSection>

      <LegalSection heading="4. Third parties">
        <p>
          Verification, KYC and analytics providers acting on our instructions may set cookies when
          you use the relevant feature. Their processing is limited to the purpose we engage them
          for.
        </p>
      </LegalSection>

      <LegalSection heading="5. Contact">
        <p>
          Questions about this policy: {configured(org.supportEmail)}. Operated by{" "}
          {org.legalEntity}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
