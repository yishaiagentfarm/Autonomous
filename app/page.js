import Link from "next/link";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import FeatureAccordion from "./components/FeatureAccordion";

const SOURCES = [
  "GRANTS.GOV",
  "SBIR",
  "STTR",
  "SAM.GOV",
  "FEDERAL BAAs",
  "NIH",
  "NSF",
  "DARPA",
  "DOE",
  "NASA",
  "USDA",
  "DOD",
];

export default function Home() {
  return (
    <>
      <SiteNav />

      {/* hero — value-first headline + animated product mockup */}
      <section className="hero2">
        <div className="wrap hero2-grid">
          <div className="hero2-copy reveal">
            <div className="eyebrow">
              <span className="sq2" />
              <span className="lbl">AI grant-application drafting</span>
            </div>
            <h1 className="h1">
              Win more grants.{" "}
              <span className="serif">In an afternoon.</span>
            </h1>
            <p className="hero-sub">
              GrantHunter turns a federal solicitation into a submission-ready
              package — so you review and submit instead of starting from a
              blank page.
            </p>
            <div className="hero-cta-row2">
              <Link href="/pricing" className="btn-cta">
                Claim a beta seat — $199 refundable →
              </Link>
              <a href="#how" className="btn-ghost">
                How it works ↓
              </a>
            </div>
            <p className="hero-cta-note">
              Fully refundable · credited toward your subscription
            </p>
          </div>

          {/* animated product mockup */}
          <div className="hero2-mock reveal d2">
            <div className="mock">
              <div className="mock-head">
                <div className="mock-head-left">
                  <span className="mock-chip">GH</span>
                  <div>
                    <p className="mock-title">Compliance run</p>
                    <p className="mock-sub">SBIR Phase I · DoE</p>
                  </div>
                </div>
                <span className="mock-pill live">
                  <span className="mock-dot" /> Drafting
                </span>
              </div>
              <div className="mock-rows">
                <div className="mock-row active">
                  <span className="mock-tick" />
                  <div className="mock-row-body">
                    <p className="mock-tag">§3.1 Eligibility — mapped</p>
                    <span className="mock-bar pulse" style={{ width: "64%" }} />
                  </div>
                </div>
                <div className="mock-row">
                  <span className="mock-tick" />
                  <div className="mock-row-body">
                    <p className="mock-tag">§3.2 Technical approach</p>
                    <span
                      className="mock-bar pulse"
                      style={{ width: "82%", animationDelay: "160ms" }}
                    />
                  </div>
                </div>
                <div className="mock-row">
                  <span className="mock-tick ghost" />
                  <div className="mock-row-body">
                    <p className="mock-tag muted">§4.1 Budget narrative</p>
                    <span
                      className="mock-bar pulse"
                      style={{ width: "70%", animationDelay: "320ms" }}
                    />
                  </div>
                </div>
              </div>
              <div className="mock-foot">
                <span className="mock-foot-k">Requirements</span>
                <span className="mock-foot-v">12 / 12 captured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* trust marquee — sliding federal sources */}
      <section className="trust">
        <p className="trust-cap">Built on live federal opportunity data</p>
        <div className="marquee">
          <div className="marquee-track">
            {[...SOURCES, ...SOURCES].map((s, i) => (
              <span className="trust-mark" key={i}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* what you get — dropdowns for more data */}
      <section className="feat">
        <div className="wrap">
          <div className="feat-head">
            <h2 className="feat-h2">Everything in one workspace.</h2>
            <p className="feat-sub">Open each to see what GrantHunter does.</p>
          </div>
          <FeatureAccordion />
        </div>
      </section>

      {/* how it works — three steps */}
      <section className="steps" id="how">
        <div className="wrap">
          <p className="sec-label accent">How it works</p>
          <div className="step-grid">
            <div className="step">
              <span className="step-n">01</span>
              <h3 className="step-title">Paste the opportunity</h3>
              <p className="step-body">
                Drop in a Grants.gov or SBIR/STTR solicitation.
              </p>
            </div>
            <div className="step">
              <span className="step-n">02</span>
              <h3 className="step-title">GrantHunter drafts</h3>
              <p className="step-body">
                A compliance matrix and a first-draft narrative, built to the
                solicitation.
              </p>
            </div>
            <div className="step">
              <span className="step-n">03</span>
              <h3 className="step-title">You review &amp; submit</h3>
              <p className="step-body">
                Edit, approve, ship a stronger application in a fraction of the
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* dark proof band */}
      <section className="proof">
        <div className="wrap">
          <div className="proof-inner">
            <div>
              <p className="proof-eyebrow">Validated on real solicitations</p>
              <h2 className="proof-h2">
                Six live opportunities,{" "}
                <span className="serif-em">drafted end to end.</span>
              </h2>
              <p className="proof-p">
                GrantHunter produced compliance matrices and draft narratives
                against six live federal SBIR / STTR opportunities — the same
                solicitations beta users bring.
              </p>
              <Link href="/pricing" className="btn-cta light">
                Claim a beta seat — $199 →
              </Link>
            </div>
            <div className="proof-card">
              <div className="proof-stat">
                <span className="proof-num">6</span>
                <span className="proof-num-cap">opportunities drafted</span>
              </div>
              <div className="proof-meter">
                <div className="proof-meter-row">
                  <span className="proof-meter-k">Requirements captured</span>
                  <span className="proof-meter-v">100%</span>
                </div>
                <div className="proof-track">
                  <span className="proof-fill" style={{ width: "100%" }} />
                </div>
                <div className="proof-meter-row">
                  <span className="proof-meter-k">First draft per package</span>
                  <span className="proof-meter-v">~1 afternoon</span>
                </div>
                <div className="proof-track">
                  <span className="proof-fill" style={{ width: "82%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* offer / claim */}
      <section className="claim">
        <div className="wrap claim-grid">
          <div>
            <h2 className="claim-h2">
              Join the <span className="serif">private beta.</span>
            </h2>
            <p className="claim-lead">
              Reserve your seat with a fully refundable $199 deposit — credited
              toward your subscription, or returned in full.
            </p>
            <Link href="/pricing" className="btn-cta">
              See pricing →
            </Link>
          </div>
          <div className="price-card">
            <p className="price-note">Beta seat</p>
            <div className="price-row">
              <span className="price-amt">$199</span>
              <span className="price-per">refundable deposit</span>
            </div>
            <p className="perk-body">
              Credited toward your GrantHunter subscription. Questions?{" "}
              <a
                href="mailto:autonomous0880@gmail.com"
                style={{ color: "var(--accent)" }}
              >
                autonomous0880@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
