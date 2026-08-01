import { createFileRoute } from "@tanstack/react-router";
import { org, configured } from "@/config/org";
import { LegalPage, LegalSection } from "@/components/layout/legal-page";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ShriNeo Capital" },
      {
        name: "description",
        content:
          "What personal information ShriNeo Capital collects, why it is collected, who it is shared with, how long it is kept, and the rights available to you.",
      },
      { property: "og:title", content: "Privacy Policy — ShriNeo Capital" },
      {
        property: "og:description",
        content: "Our data collection, sharing, retention and rights commitments.",
      },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`How ${org.legalEntity}, operating the ShriNeo Capital platform, handles personal information.`}
    >
      <LegalSection heading="1. Who this policy covers">
        <p>
          This policy applies to the ShriNeo Capital website and application, operated by{" "}
          {org.legalEntity}. {org.roleStatement}
        </p>
      </LegalSection>

      <LegalSection heading="2. Information we collect">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Identity details, such as your name, PAN and Aadhaar-based verification results.</li>
          <li>Contact details, such as mobile number, email address and residential address.</li>
          <li>
            Financial information, such as income proof, bank statement data accessed with your
            consent, and credit bureau information.
          </li>
          <li>Application data, including the amount, purpose and tenure you request.</li>
          <li>Technical data, such as device and log information used to keep accounts secure.</li>
        </ul>
        <p>
          We collect the minimum required for a lender to assess your application, and we explain at
          the point of collection why each item is needed.
        </p>
      </LegalSection>

      <LegalSection heading="3. Why we use it">
        <p>
          To verify your identity, match you with participating lenders, present comparable offers,
          progress your application, meet legal and regulatory obligations, prevent fraud, and
          respond to your queries and complaints.
        </p>
      </LegalSection>

      <LegalSection heading="4. Consent">
        <p>
          Credit bureau checks, access to bank data and electronic signing are requested as separate
          consents. Each consent is recorded with a timestamp and can be reviewed. You may decline
          any consent, and you may withdraw a consent you previously gave — though this may mean an
          application cannot proceed.
        </p>
      </LegalSection>

      <LegalSection heading="5. Who we share information with">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Participating banks and NBFCs that you ask us to approach on your behalf.</li>
          <li>
            Verification, KYC, credit bureau and account aggregation service providers acting on our
            instructions.
          </li>
          <li>Registered agents, only after you approve their access with an OTP.</li>
          <li>Authorities, where disclosure is required by law.</li>
        </ul>
        <p>We do not sell personal information.</p>
      </LegalSection>

      <LegalSection heading="6. Retention">
        <p>
          Information is retained for as long as needed to serve you and to meet legal, regulatory
          and audit obligations, after which it is deleted or anonymised. Specific retention periods
          are set with reference to the applicable obligations and are available on request.
        </p>
      </LegalSection>

      <LegalSection heading="7. Your rights">
        <p>
          You may request access to the personal information we hold about you, ask for a correction
          where it is inaccurate, withdraw a consent, or request deletion where no legal obligation
          requires us to retain it. Write to the Grievance Officer to make a request.
        </p>
      </LegalSection>

      <LegalSection heading="8. Security">
        <p>
          We apply access controls, authentication and logging to protect personal information. No
          system can be guaranteed to be completely secure; if an incident affects your data, we
          will act on our obligations to notify affected users and authorities.
        </p>
      </LegalSection>

      <LegalSection heading="9. Contact">
        <p>
          Grievance Officer: {configured(org.grievanceOfficer.name)},{" "}
          {configured(org.grievanceOfficer.email)}. Registered office:{" "}
          {configured(org.registeredAddress)}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
