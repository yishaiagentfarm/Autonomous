"use client";

import { useRef, useState } from "react";
import Script from "next/script";

// ---------------------------------------------------------------------------
// PRE-SELL OFFER PAGE — company-tailored + async-email reframe (task 71f1fdab).
// Founder direction (1ad73aa5) / CEO decision (knowledge 1da97568):
//   Positioning = resume TAILORED TO THE SPECIFIC TARGET COMPANY (we research
//   the company + role, then rewrite the resume to fit) — NOT generic ATS
//   keyword-matching. Delivery is async/email, framed as quiet reassurance,
//   never sold as the feature. Show the research depth, don't just claim it.
//
//   Copy-only pre-sell. No backend; first orders fulfilled concierge/manual.
//   Auto-submit of applications = Phase 2 (NOT built here).
//
//   Analytics:  Umami Cloud -> https://cloud.umami.is/script.js
//               website id   4a57c88b-c0e8-4f79-b1ef-699af84f47ab
//               custom events: clicks_to_pay (CTA intent), email_captured
//               (successful form submit). Both carry the ?ref property so
//               each channel's conversion attributes (PE PR #1).
//   Capture:    FormSubmit.co AJAX -> /ajax/7aa38b6421bfc605ccc0e64aa6a7edb2
//               captures email + resume + target company + target role + job
//               post (optional). 100% client-side, Stripe NOT live ($0).
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
// Returns "" when no ?ref is present.
function getRef() {
  if (typeof window === "undefined") return "";
  try {
    return new URLSearchParams(window.location.search).get("ref") || "";
  } catch (e) {
    return "";
  }
}

const C = {
  bg: "#0b1020",
  card: "#111935",
  cardAlt: "#161d3a",
  border: "#2a3358",
  ink: "#e6e9f2",
  sky: "#7dd3fc",
  mint: "#a7f3d0",
  amber: "#fbbf24",
  red: "#fca5a5",
  dim: "rgba(230,233,242,0.72)",
};

export default function OfferPage() {
  const formRef = useRef(null);
  const emailRef = useRef(null);

  // Capture-form state
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobPost, setJobPost] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  // Hero/price CTA: fires the conversion-intent event the go/no-go gate counts,
  // then scrolls to the capture form and focuses the first field.
  function handleCtaClick() {
    track("clicks_to_pay", { ref: getRef() });
    if (formRef.current)
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => emailRef.current && emailRef.current.focus(), 400);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    if (!email || !resume || !company || !role) {
      setStatus("error");
      setMessage("Please fill in your email, resume, target company, and role.");
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
          target_company: company,
          target_role: role,
          resume,
          job_post: jobPost,
          ref: getRef(),
          _subject: "New tailored-resume request (company-tailored pre-sell)",
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== "false") {
        track("email_captured", { ref: getRef() });
        setStatus("done");
        setMessage(
          "Got it. We're on it — watch your inbox for your tailored resume."
        );
        setEmail("");
        setResume("");
        setCompany("");
        setRole("");
        setJobPost("");
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

  const cards = [
    {
      h: "We research the company, not just the keywords",
      p: "We read the real job post, the company's recent news, and their engineering/product blog to find what this team actually prioritizes — then rewrite your bullets to speak to it. Not the generic ATS keywords ChatGPT guesses at.",
    },
    {
      h: "See the difference",
      p: null,
      beforeAfter: true,
    },
    {
      h: "Submit once. We do the work.",
      p: "No dashboard to wrestle, no re-prompting. Send your resume and target role, and we research, rewrite, and email your tailored resume back — fast.",
    },
  ];

  return (
    <>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id={UMAMI_WEBSITE_ID}
        strategy="afterInteractive"
      />

      <main
        style={{
          minHeight: "100vh",
          padding: "0 18px 64px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* ---------------- HERO ---------------- */}
          <section style={{ padding: "56px 0 8px", textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: 999,
                background: C.cardAlt,
                border: `1px solid ${C.border}`,
                fontSize: "0.78rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: C.dim,
              }}
            >
              For when one role really matters — done right, not 50 done generically
            </span>

            <h1
              style={{
                fontSize: "clamp(1.9rem, 6vw, 2.8rem)",
                lineHeight: 1.14,
                margin: "22px 0 16px",
                fontWeight: 800,
              }}
            >
              Get your resume rewritten to fit the exact company you&apos;re
              applying to.
            </h1>

            <p
              style={{
                fontSize: "clamp(1.02rem, 3.4vw, 1.2rem)",
                lineHeight: 1.55,
                color: C.dim,
                margin: "0 auto 28px",
                maxWidth: 560,
              }}
            >
              Tell us the role and the company. We read their job post, recent
              news, and engineering/product blog — then rewrite your resume to
              match what that team actually cares about. It lands in your inbox,
              fast.
            </p>

            <button onClick={handleCtaClick} style={btnPrimary}>
              Tailor my resume →
            </button>
          </section>

          {/* ---------------- VALUE CARDS ---------------- */}
          <section
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "1fr",
              margin: "36px 0 8px",
            }}
          >
            {cards.map((b, i) => (
              <div
                key={i}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "16px 18px",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.02rem",
                    marginBottom: 6,
                    color: C.sky,
                  }}
                >
                  {b.h}
                </div>
                {b.p && (
                  <div
                    style={{ fontSize: "0.96rem", lineHeight: 1.5, color: C.dim }}
                  >
                    {b.p}
                  </div>
                )}
                {b.beforeAfter && (
                  <div style={{ display: "grid", gap: 10, marginTop: 4 }}>
                    <div style={baCol}>
                      <div style={baLabel}>Before</div>
                      <div style={baText}>
                        &ldquo;Built backend services in Go.&rdquo;
                      </div>
                    </div>
                    <div style={{ ...baCol, borderColor: "rgba(167,243,208,0.4)" }}>
                      <div style={{ ...baLabel, color: C.mint }}>
                        After — targeting a fintech that emphasizes reliability
                      </div>
                      <div style={baText}>
                        &ldquo;Re-architected the payment-ledger service in Go,
                        cutting reconciliation errors 40% — matching
                        [Company]&apos;s public push on payment reliability.&rdquo;
                      </div>
                    </div>
                    <div style={{ fontSize: "0.88rem", color: C.dim }}>
                      Specific, true to you, aimed at them.
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* ---------------- PRICE + CTA ---------------- */}
          <section
            style={{
              marginTop: 24,
              background: "linear-gradient(160deg, #15224a, #111935)",
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: "26px 22px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                margin: "0 0 6px",
                color: C.sky,
              }}
            >
              Founding rate $19/mo — locked for life.
            </p>
            <p
              style={{
                fontSize: "1.0rem",
                lineHeight: 1.55,
                margin: "0 0 20px",
                color: C.dim,
              }}
            >
              No charge today. Reserve your spot and we&apos;ll email your first
              tailored resume.
            </p>

            <button
              onClick={handleCtaClick}
              style={{ ...btnPrimary, background: C.mint }}
            >
              Tailor my resume →
            </button>
          </section>

          {/* ---------------- CAPTURE FORM ---------------- */}
          <section
            ref={formRef}
            style={{
              marginTop: 24,
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: "26px 22px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.4rem, 4.5vw, 1.8rem)",
                margin: "0 0 6px",
                fontWeight: 800,
              }}
            >
              Send us the role — we&apos;ll tailor your resume to it
            </h2>
            <p style={{ color: C.dim, margin: "0 0 20px", fontSize: "0.98rem" }}>
              Founding-member pre-launch. First tailored resumes are fulfilled by
              our team. We&apos;ll email you back fast.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="cap-email" style={label}>
                Email
              </label>
              <input
                id="cap-email"
                ref={emailRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={input}
              />

              <label htmlFor="cap-company" style={{ ...label, marginTop: 16 }}>
                Target company
              </label>
              <input
                id="cap-company"
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Stripe"
                style={input}
              />

              <label htmlFor="cap-role" style={{ ...label, marginTop: 16 }}>
                Target role / job title
              </label>
              <input
                id="cap-role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Backend Engineer"
                style={input}
              />

              <label htmlFor="cap-resume" style={{ ...label, marginTop: 16 }}>
                Paste your resume
              </label>
              <textarea
                id="cap-resume"
                required
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste the full text of your resume…"
                rows={6}
                style={textarea}
              />

              <label htmlFor="cap-jobpost" style={{ ...label, marginTop: 16 }}>
                Job post URL or paste{" "}
                <span style={{ fontWeight: 400, color: C.dim }}>
                  (optional — helps us research faster)
                </span>
              </label>
              <textarea
                id="cap-jobpost"
                value={jobPost}
                onChange={(e) => setJobPost(e.target.value)}
                placeholder="Link to the job posting, or paste it here…"
                rows={3}
                style={textarea}
              />

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  ...btnPrimary,
                  width: "100%",
                  maxWidth: "none",
                  marginTop: 20,
                  background: status === "sending" ? "#3a4a6b" : C.mint,
                  cursor: status === "sending" ? "default" : "pointer",
                }}
              >
                {status === "sending"
                  ? "Sending…"
                  : "Send me my tailored resume →"}
              </button>

              {message && (
                <p
                  role="status"
                  style={{
                    marginTop: 16,
                    marginBottom: 0,
                    fontSize: "0.97rem",
                    fontWeight: 600,
                    color: status === "error" ? C.red : C.mint,
                  }}
                >
                  {message}
                </p>
              )}
            </form>
          </section>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.8rem",
              color: "rgba(230,233,242,0.45)",
              marginTop: 30,
            }}
          >
            Founding-member pre-launch. No charge today — send us your target
            role and we&apos;ll email your first tailored resume.
          </p>
        </div>
      </main>
    </>
  );
}

// ---- shared inline styles ----
const btnPrimary = {
  display: "inline-block",
  padding: "15px 30px",
  fontSize: "1.05rem",
  fontWeight: 700,
  color: "#0b1020",
  background: "#7dd3fc",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  width: "100%",
  maxWidth: 380,
};
const label = {
  display: "block",
  fontSize: "0.92rem",
  fontWeight: 600,
  marginBottom: 8,
  color: "#e6e9f2",
};
const input = {
  width: "100%",
  padding: "13px 14px",
  fontSize: "1rem",
  borderRadius: 10,
  border: "1px solid #2a3358",
  background: "#0b1020",
  color: "#e6e9f2",
  boxSizing: "border-box",
};
const textarea = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "0.98rem",
  lineHeight: 1.5,
  borderRadius: 10,
  border: "1px solid #2a3358",
  background: "#0b1020",
  color: "#e6e9f2",
  boxSizing: "border-box",
  fontFamily: "inherit",
  resize: "vertical",
};
const baCol = {
  background: "#0b1020",
  border: "1px solid #2a3358",
  borderRadius: 10,
  padding: "10px 14px",
};
const baLabel = {
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "rgba(230,233,242,0.55)",
  marginBottom: 4,
};
const baText = {
  fontSize: "0.95rem",
  lineHeight: 1.5,
  color: "#e6e9f2",
};
