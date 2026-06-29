import Link from "next/link";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />

      {/* hero */}
      <section className="hero">
        <div className="wrap hero-col reveal">
          <div className="eyebrow">
            <span className="sq2" />
            <span className="lbl">AI grant-application drafting</span>
          </div>
          <h1 className="h1">
            Win more grants in <span className="serif">a fraction</span> of the
            time.
          </h1>
          <p className="hero-sub">
            GrantHunter reads a funding opportunity and drafts the two things
            that take the longest: a <span className="strong">compliance
            matrix</span> mapping every requirement to your response, and a
            first-draft <span className="strong">narrative</span> tailored to
            the solicitation. You review and submit — instead of starting from a
            blank page.
          </p>
          <Link href="/pricing" className="btn-cta">
            Claim a beta seat — $199 refundable deposit →
          </Link>
        </div>
      </section>

      {/* what you get */}
      <section className="whatyouget">
        <div className="wrap">
          <p className="sec-label accent">What GrantHunter does</p>
          <div className="perk-grid">
            <div className="perk">
              <div className="perk-head">
                <span className="perk-n">01</span>
                <h3 className="perk-title">Compliance matrix</h3>
              </div>
              <p className="perk-body">
                Every &quot;shall&quot; and &quot;must&quot; in the solicitation
                is extracted into a requirement-by-requirement matrix, so nothing
                eligible gets missed and reviewers can see compliance at a glance.
              </p>
            </div>
            <div className="perk">
              <div className="perk-head">
                <span className="perk-n">02</span>
                <h3 className="perk-title">Narrative first draft</h3>
              </div>
              <p className="perk-body">
                A structured first-draft narrative written to the
                solicitation&apos;s sections and evaluation criteria, grounded in
                the details you provide about your organization and project.
              </p>
            </div>
            <div className="perk">
              <div className="perk-head">
                <span className="perk-n">03</span>
                <h3 className="perk-title">Opportunity fit</h3>
              </div>
              <p className="perk-body">
                Paste a Grants.gov / SBIR-STTR opportunity and GrantHunter
                summarizes scope, eligibility and deadlines so you decide what to
                pursue before you invest writing time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* who it's for */}
      <section className="scale">
        <div className="wrap scale-grid">
          <div>
            <h2 className="scale-h2">
              Built for the people who <span className="serif">write the
              grants.</span>
            </h2>
            <p className="scale-p">
              Freelance grant writers, consulting agencies, and GovCon small
              businesses spend days per application on compliance and first
              drafts. GrantHunter compresses that to hours — you keep full
              editorial control and accountability for what gets submitted.
            </p>
          </div>
          <div>
            <p className="sec-label">Proven on real opportunities</p>
            <p className="scale-p">
              In our build validation, GrantHunter produced compliance matrices
              and draft narratives against six live federal SBIR / STTR
              opportunities pulled from Grants.gov — the same kind of
              solicitation beta users bring. It is a drafting assistant: a human
              expert reviews, edits, and approves every application before
              submission.
            </p>
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
