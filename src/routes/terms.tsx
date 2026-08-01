import { createFileRoute } from "@tanstack/react-router";
import { org, configured } from "@/config/org";
import { LegalPage, LegalSection } from "@/components/layout/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — ShriNeo Capital" },
      {
        name: "description",
        content:
          "The terms governing your use of the ShriNeo Capital platform, operated by SHRINEO VITTIYAM PRIVATE LIMITED as a Lending Service Provider.",
      },
      { property: "og:title", content: "Terms and Conditions — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Your rights and obligations when using the ShriNeo Capital platform.",
      },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      intro={`These terms govern your use of the ShriNeo Capital platform, operated by ${org.legalEntity}.`}
    >
      <LegalSection heading="1. Our role">
        <p>
          {org.roleStatement} We introduce you to participating banks and NBFCs and present the
          offers they extend. Any loan is a contract between you and the lender, not with us.
        </p>
      </LegalSection>

      <LegalSection heading="2. Eligibility to use the platform">
        <p>
          You must be at least 18 years old, an Indian resident, and legally capable of entering
          into a contract. You agree to provide accurate, current information and to keep your
          account credentials confidential.
        </p>
      </LegalSection>

      <LegalSection heading="3. What we do not promise">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>We do not guarantee that any lender will approve your application.</li>
          <li>We do not set, negotiate or control interest rates, fees or sanctioned amounts.</li>
          <li>
            Indicative figures shown on the site, including calculator outputs, are estimates and
            not offers.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Your obligations">
        <p>
          You agree not to submit false documents or impersonate another person, not to misuse or
          attempt to disrupt the platform, and to notify us promptly if you suspect unauthorised use
          of your account.
        </p>
      </LegalSection>

      <LegalSection heading="5. Agents">
        <p>
          Registered agents may assist you only after you grant access with an OTP. Agents cannot
          accept an offer or sign documents on your behalf. You may revoke agent access at any time.
        </p>
      </LegalSection>

      <LegalSection heading="6. Fees">
        <p>
          Any fee payable by you is disclosed before you commit, on the offer and in the Key Fact
          Statement issued by the lender. We do not levy undisclosed charges.
        </p>
      </LegalSection>

      <LegalSection heading="7. Intellectual property">
        <p>
          The ShriNeo Capital name, logo, interface and content are owned by {org.legalEntity} and
          may not be copied or used without written permission.
        </p>
      </LegalSection>

      <LegalSection heading="8. Limitation of liability">
        <p>
          To the extent permitted by law, we are not liable for a lender's decisions, for losses
          arising from information you supplied inaccurately, or for interruptions outside our
          reasonable control. Nothing in these terms limits liability that cannot be limited by law.
        </p>
      </LegalSection>

      <LegalSection heading="9. Changes and termination">
        <p>
          We may update these terms as our services or obligations change, and will publish the
          updated version on this page. We may suspend access where we reasonably suspect fraud or
          misuse.
        </p>
      </LegalSection>

      <LegalSection heading="10. Governing law and contact">
        <p>
          These terms are governed by the laws of India. Queries: {configured(org.supportEmail)}.
          Registered office: {configured(org.registeredAddress)}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
