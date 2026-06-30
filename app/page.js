import Link from "next/link";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import FeatureTabs from "./components/FeatureTabs";

export default function Home() {
  return (
    <>
      <SiteNav />

      {/* hero — two column: value-first copy + animated product mockup */}
      <section className="hero2">
        <div className="wrap hero2-grid">
          <div className="hero2-copy reveal">
            <div className="eyebrow">
              <span className="sq2" />
              <span className="lbl">AI grant-application drafting</span>
            </div>
            <h1 className="h1">
              A <span className="display-stroke">submission-ready</span> grant
              package — in <span className="serif">an afternoon,</span> not a
              week.
            </h1>
            <p className="hero-sub">
              GrantHunter turns a funding opportunity into a{" "}
              <span className="strong">compliance matrix</span> mapping every
              requirement to your response and a first-draft{" "}
              <span className="strong">narrative</span> written to the
              solicitation. You review and submit — instead of starting from a
              blank page.
            </p>
            <div className="hero-cta-row2">
              <Link href="/pricing" className="btn-cta">
                Claim a beta seat — $199 refundable →
              </Link>
              <a href="#how" className="btn-ghost">
                See how it works ↓
              </a>
            </div>
            <p className="hero-cta-note">
              Fully refundable · credited toward your subscription
            </p>
          </div>

          {/* animated product mockup — the "skeleton + animation" */}
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
                    <p className="mock-tag muted">§3.4 Past performance</p>
                    <span
                      className="mock-bar pulse"
                      style={{ width: "48%", animationDelay: "320ms" }}
                    />
                  </div>
                </div>
                <div className="mock-row">
                  <span className="mock-tick ghost" />
                  <div className="mock-row-body">
                    <p className="mock-tag muted">§4.1 Budget narrative</p>
                    <span
                      className="mock-bar pulse"
                      style={{ width: "70%", animationDelay: "480ms" }}
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

      {/* trust strip — built on live federal sources */}
      <section className="trust">
        <div className="wrap">
          <p className="trust-cap">Built on live federal opportunity data</p>
          <div className="trust-row">
            <span className="trust-mark">GRANTS.GOV</span>
            <span className="trust-mark">SBIR</span>
            <span className="trust-mark">STTR</span>
            <span className="trust-mark">SAM.GOV</span>
            <span className="trust-mark">FEDERAL&nbsp;BAAs</span>
          </div>
        </div>
      </section>

      {/* tabbed features — one workspace, every requirement */}
      <section className="feat">
        <div className="wrap">
          <div className="feat-head">
            <h2 className="feat-h2">
              One workspace. <span className="serif">Every requirement.</span>
            </h2>
            <p className="feat-sub">
              GrantHunter does the slow first pass for you — and hands you a
              draft you can edit, approve, and submit.
            </p>
          </div>
          <FeatureTabs />
        </div>
      </section>

      {/* how it works — three steps, display numerals */}
      <section className="steps" id="how">
        <div className="wrap">
          <p className="sec-label accent">How it works</p>
          <div className="step-grid">
            <div className="step">
              <span className="step-n display-stroke">01</span>
              <h3 className="step-title">Paste the opportunity</h3>
              <p className="step-body">
                Drop in a Grants.gov or SBIR/STTR solicitation. GrantHunter
                summarizes scope, eligibility and deadlines so you decide what
                to pursue before investing writing time.
              </p>
            </div>
            <div className="step">
              <span className="step-n display-stroke">02</span>
              <h3 className="step-title">GrantHunter drafts</h3>
              <p className="step-body">
                It builds a requirement-by-requirement compliance matrix and a
                structured first-draft narrative, written to the
                solicitation&apos;s sections and evaluation criteria.
              </p>
            </div>
            <div className="step">
              <span className="step-n display-stroke">03</span>
              <h3 className="step-title">You review &amp; submit</h3>
              <p className="step-body">
                You keep full editorial control: edit, refine and approve. The
                heavy lifting is done — you ship a stronger application in a
                fraction of the time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* dark proof section — validated on real opportunities */}
      <section className="proof">
        <div className="wrap">
          <div className="proof-inner">
            <div>
              <p className="proof-eyebrow">Validated on real solicitations</p>
              <h2 className="proof-h2">
                Six live SBIR / STTR opportunities,{" "}
                <span className="serif-em">drafted end to end.</span>
              </h2>
              <p className="proof-p">
                In build validation, GrantHunter produced compliance matrices
                and draft narratives against six live federal SBIR / STTR
                opportunities pulled from Grants.gov — the same kind of
                solicitation beta users bring. It is a drafting assistant: a
                human expert reviews, edits, and approves every application
                before submission.
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
              We&apos;re onboarding a small group of grant writers and GovCon
              teams. Reserve your seat with a fully refundable $199 deposit — it
              secures onboarding and is credited toward your subscription, or
              returned in full if GrantHunter isn&apos;t right for you.
            </p>
            <Link href="/pricing" className="btn-cta">See pricing →</Link>
          </div>
          <div className="price-card">
            <p className="price-note">Beta seat</p>
            <div className="price-row">
              <span className="price-amt">$199</span>
              <span className="price-per">refundable deposit</span>
            </div>
            <p className="perk-body">
              Fully refundable. Credited toward your GrantHunter subscription
              when you continue after the beta. Questions?{" "}
              <a href="mailto:autonomous0880@gmail.com" style={{ color: "var(--accent)" }}>
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
