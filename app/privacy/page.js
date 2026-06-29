import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Privacy Policy — GrantHunter",
  description: "GrantHunter Privacy Policy.",
};

export default function Privacy() {
  return (
    <>
      <SiteNav />
      <section className="page-head">
        <div className="wrap">
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: 29 June 2026</p>
        </div>
      </section>
      <section className="legal">
        <div className="wrap legal-inner">
          <h2>1. Overview</h2>
          <p>
            This Privacy Policy explains how GrantHunter (&quot;we&quot;,
            &quot;us&quot;) collects, uses, and protects your information when you
            use our website and service. We can be reached at{" "}
            <a href="mailto:autonomous0880@gmail.com">autonomous0880@gmail.com</a>.
          </p>

          <h2>2. Information we collect</h2>
          <ul>
            <li>
              <strong>Contact details</strong> you provide, such as your name and
              email address.
            </li>
            <li>
              <strong>Project information</strong> you submit so we can draft
              grant materials — for example, details about your organization, the
              funding opportunity, and your project.
            </li>
            <li>
              <strong>Payment information</strong> is collected and processed
              directly by our payment provider, Paddle.com. We do not store your
              full card details.
            </li>
            <li>
              <strong>Basic usage data</strong>, such as anonymous analytics about
              how the website is used.
            </li>
          </ul>

          <h2>3. How we use your information</h2>
          <ul>
            <li>To provide, operate, and improve the GrantHunter service.</li>
            <li>To generate the drafts and materials you request.</li>
            <li>To process payments and provide customer support.</li>
            <li>To communicate with you about your account and the beta.</li>
          </ul>

          <h2>4. Payments and third parties</h2>
          <p>
            Payments are handled by Paddle.com, our Merchant of Record, under
            their own privacy notice. We use AI model providers to generate
            drafts; the information you submit may be processed by these
            providers solely to produce your output. We do not sell your personal
            information.
          </p>

          <h2>5. Data retention and security</h2>
          <p>
            We keep your information only as long as needed to provide the service
            and meet legal obligations, and we apply reasonable measures to
            protect it. You may request access to, correction of, or deletion of
            your personal data at any time.
          </p>

          <h2>6. Your rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct,
            delete, or restrict the use of your personal data. To exercise any of
            these, email{" "}
            <a href="mailto:autonomous0880@gmail.com">autonomous0880@gmail.com</a>.
          </p>

          <h2>7. Changes</h2>
          <p>
            We may update this policy from time to time; the &quot;last
            updated&quot; date above reflects the latest version.
          </p>

          <h2>8. Contact</h2>
          <p>
            Questions about your privacy? Email{" "}
            <a href="mailto:autonomous0880@gmail.com">autonomous0880@gmail.com</a>.
          </p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
