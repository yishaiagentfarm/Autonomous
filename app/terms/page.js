import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Terms of Service — GrantHunter",
  description: "GrantHunter Terms of Service.",
};

export default function Terms() {
  return (
    <>
      <SiteNav />
      <section className="page-head">
        <div className="wrap">
          <h1>Terms of Service</h1>
          <p className="updated">Last updated: 29 June 2026</p>
        </div>
      </section>
      <section className="legal">
        <div className="wrap legal-inner">
          <h2>1. Who we are</h2>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of GrantHunter (&quot;GrantHunter&quot;, &quot;we&quot;,
            &quot;us&quot;), an AI-assisted grant-application drafting service.
            You can contact us at{" "}
            <a href="mailto:autonomous0880@gmail.com">autonomous0880@gmail.com</a>.
            By accessing our website or using our service, you agree to these
            Terms.
          </p>

          <h2>2. The service</h2>
          <p>
            GrantHunter helps users prepare grant applications by generating a
            compliance matrix from a funding solicitation and producing a
            first-draft narrative based on information you provide. GrantHunter
            is a drafting assistant. All output is a draft: you are solely
            responsible for reviewing, editing, verifying, and approving any
            material before it is submitted to any funding body. We do not
            guarantee that any application will be accepted or that any grant
            will be awarded.
          </p>

          <h2>3. Beta program and deposit</h2>
          <p>
            GrantHunter is currently offered as a private beta. A beta seat is
            reserved with a one-time $199 USD deposit. The deposit is fully
            refundable and is credited toward your subscription if you continue
            after the beta. See our <Link href="/refund">Refund Policy</Link> for
            details.
          </p>

          <h2>4. Payments</h2>
          <p>
            Our order process and payments are conducted by our online reseller
            and Merchant of Record, Paddle.com, who handle all billing,
            payment, and related customer enquiries. Paddle.com is the merchant
            of record for all orders. Prices are stated in US dollars unless
            noted otherwise.
          </p>

          <h2>5. Acceptable use</h2>
          <p>
            You agree to provide accurate information and to use GrantHunter only
            for lawful purposes. You must not use the service to create false,
            misleading, or fraudulent applications, or in any way that violates
            the rules of a funding program or applicable law.
          </p>

          <h2>6. Intellectual property</h2>
          <p>
            You retain ownership of the information you submit and of the final
            applications you produce. The GrantHunter software, website, and
            branding remain our property.
          </p>

          <h2>7. Disclaimer and limitation of liability</h2>
          <p>
            The service is provided &quot;as is&quot; without warranties of any
            kind. To the maximum extent permitted by law, GrantHunter is not
            liable for any indirect or consequential losses, or for any outcome
            of a grant application. Our total liability for any claim is limited
            to the amount you paid us in the preceding twelve months.
          </p>

          <h2>8. Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. Material changes will be
            reflected by the &quot;last updated&quot; date above and, where
            appropriate, communicated to you by email.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
            <a href="mailto:autonomous0880@gmail.com">autonomous0880@gmail.com</a>.
          </p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
