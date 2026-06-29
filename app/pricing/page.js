import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Pricing — GrantHunter",
  description:
    "GrantHunter pricing: reserve a private-beta seat with a fully refundable $199 deposit, credited toward your subscription.",
};

export default function Pricing() {
  return (
    <>
      <SiteNav />

      <section className="page-head">
        <div className="wrap">
          <h1>Pricing</h1>
          <p className="lede">
            GrantHunter is in private beta. Reserve a seat now with a fully
            refundable deposit; full subscription pricing is shown below and
            launches when the beta ends.
          </p>
        </div>
      </section>

      <section className="tiers">
        <div className="wrap">
          <div className="tier-grid">
            <div className="tier feature">
              <p className="tier-name">Beta seat — available now</p>
              <div className="tier-price">
                <span className="amt">$199</span>
                <span className="per">one-time, refundable deposit</span>
              </div>
              <p className="tier-desc">
                Secures your place in the private beta and your onboarding slot.
                Fully refundable, and credited toward your subscription if you
                continue.
              </p>
              <ul>
                <li>Priority onboarding with a GrantHunter specialist</li>
                <li>Compliance matrix + narrative drafting on your opportunities</li>
                <li>Deposit credited toward your first subscription invoice</li>
                <li>Refundable in full at any time during the beta</li>
              </ul>
              <Link href="/refund" className="btn-cta">Read the refund policy →</Link>
            </div>

            <div className="tier">
              <p className="tier-name">Pro — at general availability</p>
              <div className="tier-price">
                <span className="amt">$49</span>
                <span className="per">per month</span>
              </div>
              <p className="tier-desc">
                Intended subscription pricing for individual grant writers and
                small teams once GrantHunter leaves beta. Final pricing will be
                confirmed before any subscription begins.
              </p>
              <ul>
                <li>Unlimited compliance-matrix generation</li>
                <li>Narrative first drafts for each opportunity</li>
                <li>Opportunity summaries from Grants.gov / SBIR-STTR</li>
                <li>Email support</li>
              </ul>
              <a href="mailto:autonomous0880@gmail.com" className="btn-cta">
                Ask about Pro →
              </a>
            </div>
          </div>

          <div className="legal" style={{ paddingBottom: 0 }}>
            <div className="legal-inner">
              <h2>What you&apos;re paying for</h2>
              <p>
                The $199 charge is a refundable deposit that reserves a seat in
                the GrantHunter private beta and your onboarding. It is not a
                subscription. The deposit is credited toward your first
                subscription invoice if you choose to continue, and is otherwise
                refundable in full — see our{" "}
                <Link href="/refund">Refund Policy</Link>.
              </p>
              <p>
                Payments are processed securely by Paddle.com, our authorized
                reseller and Merchant of Record. Prices are shown in US dollars.
                Questions about pricing? Email{" "}
                <a href="mailto:autonomous0880@gmail.com">autonomous0880@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
