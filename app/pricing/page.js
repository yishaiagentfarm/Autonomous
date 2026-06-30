import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Pricing — GrantHunter",
  description:
    "Turn a grant opportunity into a submission-ready package in an afternoon. Reserve a private-beta seat with a fully refundable $199 deposit, credited toward your $49/mo Pro subscription at launch.",
};

export default function Pricing() {
  return (
    <>
      <SiteNav />

      <section className="page-head">
        <div className="wrap">
          <h1>
            Turn a grant opportunity into a{" "}
            <span className="serif-em">submission-ready package</span> — in an
            afternoon, not a week.
          </h1>
          <p className="lede">
            Matched opportunities, a full compliance matrix, and a first-draft
            narrative — done for you. Here&apos;s how to get in today and what it
            costs at launch.
          </p>
        </div>
      </section>

      {/* Two prices, shown as ONE journey: reserve today → subscribe at launch */}
      <section className="tiers">
        <div className="wrap">
          <p className="sec-label accent">Today → at launch</p>

          <div className="seq-grid">
            {/* STEP 1 — today */}
            <div className="seq-step feature">
              <div className="seq-badge">Step 1 · Today</div>
              <p className="tier-name">Beta seat</p>
              <div className="tier-price">
                <span className="amt">$199</span>
                <span className="per">one-time · fully refundable deposit</span>
              </div>
              <p className="tier-desc">
                Reserves your place in the private beta and your onboarding slot.
                It&apos;s a hold, not a purchase.
              </p>

              <div className="clarifier">
                <strong>The $199 is a refundable hold, not a higher price.</strong>{" "}
                Get it back any time during beta — or it&apos;s credited toward
                Pro, covering your first ~4 months.{" "}
                <span className="clarifier-kicker">You never pay it twice.</span>
              </div>

              <ul>
                <li>Priority onboarding with a GrantHunter specialist</li>
                <li>Compliance matrix + narrative drafts on your opportunities</li>
                <li>Credited toward your first subscription invoice</li>
                <li>Refundable in full at any time during the beta</li>
              </ul>
              <Link href="/refund" className="btn-cta">
                Read the refund policy →
              </Link>
            </div>

            {/* connector */}
            <div className="seq-arrow" aria-hidden="true">
              <span>→</span>
            </div>

            {/* STEP 2 — at launch */}
            <div className="seq-step">
              <div className="seq-badge muted">Step 2 · When beta ends</div>
              <p className="tier-name">Pro subscription</p>
              <div className="tier-price">
                <span className="amt">$49</span>
                <span className="per">per month</span>
              </div>
              <p className="tier-desc">
                The ongoing price once GrantHunter leaves beta. Your $199 deposit
                is credited here first — so your beta hold isn&apos;t an extra
                cost, it&apos;s a head start.
              </p>
              <ul>
                <li>Unlimited compliance-matrix generation</li>
                <li>Narrative first drafts for each opportunity</li>
                <li>Opportunity feed from Grants.gov / SBIR-STTR</li>
                <li>Email support</li>
              </ul>
              <a href="mailto:autonomous0880@gmail.com" className="btn-cta">
                Ask about Pro →
              </a>
            </div>
          </div>

          {/* Clarity table: what each one IS (not "pick one") */}
          <div className="compare-wrap">
            <p className="compare-caption">
              Two different things, not two plans to choose between:
            </p>
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    Beta seat <span className="th-sub">— today</span>
                  </th>
                  <th scope="col">
                    Pro <span className="th-sub">— at launch</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">What it is</th>
                  <td>Refundable deposit that reserves your seat</td>
                  <td>Monthly subscription</td>
                </tr>
                <tr>
                  <th scope="row">Price</th>
                  <td>$199 one-time — refunded or credited to Pro</td>
                  <td>$49 / month</td>
                </tr>
                <tr>
                  <th scope="row">Available</th>
                  <td>Now (private beta)</td>
                  <td>When beta ends</td>
                </tr>
                <tr>
                  <th scope="row">Priority onboarding with a specialist</th>
                  <td className="yes">✓</td>
                  <td className="no">—</td>
                </tr>
                <tr>
                  <th scope="row">Compliance matrix per opportunity</th>
                  <td className="yes">✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <th scope="row">Narrative first drafts</th>
                  <td className="yes">✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <th scope="row">Opportunity feed (Grants.gov, SBIR/STTR)</th>
                  <td className="yes">✓</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <th scope="row">Fully refundable</th>
                  <td className="yes">✓ 100%</td>
                  <td className="no">—</td>
                </tr>
              </tbody>
            </table>
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
                <a href="mailto:autonomous0880@gmail.com">
                  autonomous0880@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
