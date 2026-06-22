"use client";

import { useRef, useState } from "react";
import Script from "next/script";

// ---------------------------------------------------------------------------
// LANDING PAGE — company-match-pro design port (task 2398e65a).
//
//   Founder: "use the loveable template and text. implant the data needed for
//   our company." Visual + copy are recreated verbatim from
//   company-match-pro/src/routes/index.tsx (light editorial / Swiss look:
//   cream base, dark slate text, ONE warm amber accent; mono+serif+extrabold
//   type). Styling lives in app/globals.css (tokens copied from
//   company-match-pro/src/styles.css).
//
//   PRESERVED from the prior build (the Lovable form is a dead client-side
//   stub — we do NOT regress to it):
//     Capture:   FormSubmit.co AJAX -> /ajax/7aa38b6421bfc605ccc0e64aa6a7edb2
//     Analytics: Umami Cloud (website id 4a57c88b-...), events clicks_to_pay +
//                email_captured, both carrying the ?ref attribution property.
//
//   Previous versions preserved: archive/OfferPage.specific.js (original
//   specific/before-after), and the interim emerald near-black build in git
//   history (commit f383084).
// ---------------------------------------------------------------------------

const UMAMI_WEBSITE_ID = "4a57c88b-c0e8-4f79-b1ef-699af84f47ab";
const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/7aa38b6421bfc605ccc0e64aa6a7edb2";

function track(event, data) {
  if (typeof window !== "undefined" && window.umami) {
    try {
      window.umami.track(event, data);
    } catch (e) {
      /* no-op */
    }
  }
}

// Read the ?ref query param so conversion events attribute per channel.
function getRef() {
  if (typeof window === "undefined") return "";
  try {
    return new URLSearchParams(window.location.search).get("ref") || "";
  } catch (e) {
    return "";
  }
}

const services = [
  {
    n: "01",
    title: "We research the companies",
    body: "For every company you're targeting, we do the homework on the role and the team — so your application speaks their language and fits the job.",
  },
  {
    n: "02",
    title: "We tailor your resume",
    body: "We rewrite your resume to fit each specific role — never a generic copy-paste — and reach out on your behalf where it helps you get noticed.",
  },
  {
    n: "03",
    title: "We apply at scale",
    body: "We send tailored applications across the companies you want to reach — so you get far more shots on goal than you could ever manage by hand.",
  },
];

const pipeline = [
  { company: "Stripe", status: "SENT · 2m", state: "sent" },
  { company: "Anthropic", status: "SENT · 5m", state: "sent" },
  { company: "Vercel", status: "TAILORING", state: "queue" },
  { company: "Linear", status: "TAILORING", state: "queue" },
  { company: "Scale AI", status: "QUEUED", state: "pending" },
  { company: "Notion", status: "QUEUED", state: "pending" },
];

export default function OfferPage() {
  const formRef = useRef(null);
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [categories, setCategories] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  function handleCtaClick(e) {
    if (e) e.preventDefault();
    track("clicks_to_pay", { ref: getRef() });
    if (formRef.current)
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => emailRef.current && emailRef.current.focus(), 400);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    if (!email || !resume || !role) {
      setStatus("error");
      setMessage("Please add your email, target role, and resume.");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          target_role: role,
          target_categories: categories,
          resume,
          ref: getRef(),
          _subject: "New founding-member request (tailored-at-scale)",
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== "false") {
        track("email_captured", { ref: getRef() });
        setStatus("done");
        setMessage("");
        setEmail("");
        setResume("");
        setRole("");
        setCategories("");
      } else {
        setStatus("error");
        setMessage(
          (data && data.message) || "Something went wrong — please try again."
        );
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error — please try again.");
    }
  }

  return (
    <>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id={UMAMI_WEBSITE_ID}
        strategy="afterInteractive"
      />

      {/* ---------------- NAV ---------------- */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <div className="nav-left">
            <span className="brand">Autonomous</span>
            <div className="nav-links">
              <a href="#what-you-get">What you get</a>
              <a href="#scale">Scale</a>
              <a href="#claim">Claim spot</a>
            </div>
          </div>
          <a href="#claim" className="btn-solid" onClick={handleCtaClick}>
            Claim Founding Spot
          </a>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-col">
            <div className="eyebrow reveal d1">
              <span className="sq2" />
              <span className="lbl">Done-for-you job applications</span>
            </div>
            <h1 className="h1 reveal d2">
              We apply to jobs{" "}
              <span className="serif">for you.</span>
            </h1>
            <p className="hero-sub reveal d3">
              Tell us your target role and the kind of companies you want to
              work at. We research each one, tailor your resume to fit, and
              send the applications — far more than you could by hand.{" "}
              <span className="strong">
                You bring the resume. We handle the rest.
              </span>
            </p>
            <a href="#claim" className="btn-cta reveal d4" onClick={handleCtaClick}>
              Claim your founding spot
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- WHAT YOU GET ---------------- */}
      <section id="what-you-get" className="whatyouget">
        <div className="wrap">
          <div className="sec-label">What you get</div>
          <div className="perk-grid">
            {services.map((s) => (
              <div key={s.n} className="perk">
                <div className="perk-head">
                  <span className="perk-n">{s.n}</span>
                  <h3 className="perk-title">{s.title}</h3>
                </div>
                <p className="perk-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SCALE ---------------- */}
      <section id="scale" className="scale">
        <div className="wrap scale-grid">
          <div>
            <div className="sec-label" style={{ marginBottom: 24 }}>
              The whole thing, handled
            </div>
            <h2 className="scale-h2">
              Reach <span className="serif">and</span> fit — without the grind.
            </h2>
            <p className="scale-p">
              Landing interviews rewards both reach and fit — and doing both by
              hand is exhausting. We take the whole job hunt off your plate: the
              company research, the resume tailoring, the applying and outreach.
              You get more shots on goal while we work quietly in the
              background.
            </p>
          </div>

          <div className="pipe-grid">
            {pipeline.map((p) => (
              <div key={p.company} className={`tile ${p.state}`}>
                <div className="tile-sq" />
                <div
                  className={`tile-status ${p.state === "sent" ? "sent" : ""}`}
                >
                  {p.status}
                </div>
                <div className="tile-co">{p.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CLAIM ---------------- */}
      <section id="claim" className="claim">
        <div className="wrap claim-grid">
          <div>
            <div className="sec-label accent" style={{ marginBottom: 24 }}>
              Founding pre-launch
            </div>
            <h2 className="claim-h2">
              Claim your <span className="serif">founding spot.</span>
            </h2>
            <p className="claim-lead">
              We&apos;re onboarding our first founding members now. Tell us your
              target role and where you&apos;re aiming, and we&apos;ll start
              applying for you — handled by real people, with a fast turnaround.
            </p>
            <div className="price-card">
              <div className="price-row">
                <span className="price-amt">$19</span>
                <span className="price-per">/ month at launch</span>
              </div>
              <p className="price-note">
                Founding members lock this rate for life — and you&apos;re not
                charged a cent until we launch.
              </p>
            </div>
          </div>

          <form ref={formRef} className="form-card" onSubmit={handleSubmit}>
            {status === "done" ? (
              <div className="success">
                <div className="sq10" />
                <h3>You&apos;re in.</h3>
                <p>
                  We&apos;ll be in touch shortly to get you set up. Real people,
                  fast turnaround.
                </p>
              </div>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="cap-email" className="field-label">
                    Email
                  </label>
                  <input
                    id="cap-email"
                    ref={emailRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="field-input"
                  />
                </div>

                <div className="field">
                  <label htmlFor="cap-role" className="field-label">
                    Target role / job title
                  </label>
                  <input
                    id="cap-role"
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Senior Product Designer"
                    className="field-input"
                  />
                </div>

                <div className="field">
                  <label htmlFor="cap-categories" className="field-label">
                    Where are you aiming?
                    <span className="field-hint">
                      — optional — the kinds of companies you want to reach
                    </span>
                  </label>
                  <input
                    id="cap-categories"
                    type="text"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                    placeholder="e.g. Seed-stage AI tooling, fintech, climate"
                    className="field-input"
                  />
                </div>

                <div className="field">
                  <label htmlFor="cap-resume" className="field-label">
                    Paste your resume
                  </label>
                  <textarea
                    id="cap-resume"
                    required
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    placeholder="Paste plain text — we'll handle the formatting."
                    rows={5}
                    className="field-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-submit"
                >
                  {status === "sending" ? "Sending…" : "Claim my founding spot"}
                  <span aria-hidden>→</span>
                </button>

                {message ? (
                  <p
                    role="status"
                    className={`form-msg ${
                      status === "error" ? "error" : "ok"
                    }`}
                  >
                    {message}
                  </p>
                ) : (
                  <p className="form-foot">
                    Handled by real people · no charge today
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="foot">
        <div className="wrap foot-inner">
          <div className="foot-copy">
            © 2026 Autonomous — Done for you, at scale
          </div>
          <div className="foot-links">
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
