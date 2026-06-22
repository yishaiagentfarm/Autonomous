"use client";

import { useRef, useState } from "react";
import Script from "next/script";

// ---------------------------------------------------------------------------
// LANDING PAGE — vague-at-scale reframe (task 2398e65a).
// Founder direction + CEO creative brief:
//   Positioning = a done-for-you service that researches, tailors, and applies
//   resumes AT SCALE (many tailored versions across categories of business).
//   Sell the OUTCOME (more shots on goal, done for you), NOT the mechanism.
//   Deliberately vague: no before/after example, no list of what research we
//   do, no concrete mechanism detail. High-level over specific.
//   Visual: dark grey / near-black base + ONE emerald accent, used sparingly.
//
//   The previous specific / before-after version is preserved in the repo at
//   archive/OfferPage.specific.js (and in git history) for later A/B.
//
//   Copy-only pre-sell. No backend; first orders fulfilled concierge/manual.
//
//   Analytics:  Umami Cloud -> https://cloud.umami.is/script.js
//               website id   4a57c88b-c0e8-4f79-b1ef-699af84f47ab
//               custom events: clicks_to_pay (CTA intent), email_captured
//               (successful form submit). Both carry the ?ref property so
//               each channel's conversion attributes (PE PR #1).
//   Capture:    FormSubmit.co AJAX -> /ajax/7aa38b6421bfc605ccc0e64aa6a7edb2
//               captures email + resume + target role + categories. 100%
//               client-side, Stripe NOT live ($0).
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

// ---- theme: dark grey / near-black base + ONE emerald accent ----
const C = {
  bg: "#0d0d0f",
  panel: "#141416",
  panelAlt: "#1a1a1d",
  border: "#2a2a2e",
  ink: "#ededed",
  dim: "rgba(237,237,237,0.66)",
  faint: "rgba(237,237,237,0.42)",
  accent: "#34d399", // emerald — headers/accents
  accentStrong: "#10b981", // emerald — primary buttons
  buttonInk: "#06140d",
  red: "#fca5a5",
};

export default function OfferPage() {
  const formRef = useRef(null);
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [categories, setCategories] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  function handleCtaClick() {
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
        setMessage("You're in. We'll be in touch shortly to get you set up.");
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

  const perks = [
    {
      h: "Background research",
      p: "We do the homework on the companies for you — so every version you send already feels like it belongs there.",
    },
    {
      h: "Custom tailoring",
      p: "Every version is tailored to fit, not mass-produced. And we reach out where it helps move things forward.",
    },
    {
      h: "Applying at scale",
      p: "Multiple tailored versions across each category of business — so you cover far more ground than you ever could by hand.",
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
        style={{ minHeight: "100vh", padding: "0 18px 72px", boxSizing: "border-box" }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* ---------------- HERO ---------------- */}
          <section style={{ padding: "64px 0 8px", textAlign: "center" }}>
            <span style={eyebrow}>Done for you · at scale</span>

            <h1
              style={{
                fontSize: "clamp(2.1rem, 6.4vw, 3.1rem)",
                lineHeight: 1.1,
                margin: "22px 0 18px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              More shots on goal,
              <br />
              <span style={{ color: C.accent }}>done for you.</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1.05rem, 3.4vw, 1.25rem)",
                lineHeight: 1.55,
                color: C.dim,
                margin: "0 auto 30px",
                maxWidth: 600,
              }}
            >
              We research, tailor, and apply on your behalf — far more widely than
              you could by hand. You bring the resume. We handle the rest.
            </p>

            <button onClick={handleCtaClick} style={btnPrimary}>
              Claim your founding spot →
            </button>
          </section>

          {/* ---------------- PERKS ---------------- */}
          <section style={{ margin: "56px 0 8px" }}>
            <h2 style={sectionHeader}>What you get</h2>
            <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr" }}>
              {perks.map((b, i) => (
                <div key={i} style={card}>
                  <div style={cardNum}>{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div style={cardTitle}>{b.h}</div>
                    <div style={cardBody}>{b.p}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- AT SCALE FRAMING ---------------- */}
          <section style={{ marginTop: 48 }}>
            <h2 style={sectionHeader}>The whole thing, handled</h2>
            <div
              style={{
                background: C.panelAlt,
                border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.accent}`,
                borderRadius: 16,
                padding: "26px 24px",
              }}
            >
              <p
                style={{
                  fontSize: "1.08rem",
                  lineHeight: 1.6,
                  color: C.ink,
                  margin: 0,
                }}
              >
                Getting noticed rewards both reach and fit — and doing both by
                hand is exhausting. We take it off your plate end to end: the
                research, the tailoring, the outreach. You get more shots on goal
                without the grind — working quietly in the background while you
                get on with your day.
              </p>
            </div>
          </section>

          {/* ---------------- OFFER + CAPTURE ---------------- */}
          <section
            ref={formRef}
            style={{
              marginTop: 48,
              background: C.panel,
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              padding: "30px 24px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(52,211,153,0.12)",
                border: `1px solid rgba(52,211,153,0.35)`,
                color: C.accent,
                fontSize: "0.84rem",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Founding rate $19/mo — locked for life
            </div>

            <h2
              style={{
                fontSize: "clamp(1.5rem, 4.6vw, 1.95rem)",
                margin: "0 0 8px",
                fontWeight: 800,
                letterSpacing: "-0.01em",
              }}
            >
              Claim your founding spot
            </h2>
            <p style={{ color: C.dim, margin: "0 0 24px", fontSize: "1rem", lineHeight: 1.55 }}>
              No charge today. Tell us where you&apos;re aiming and we&apos;ll get
              you set up — handled by real people, with a fast turnaround.
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

              <label htmlFor="cap-role" style={{ ...label, marginTop: 18 }}>
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

              <label htmlFor="cap-categories" style={{ ...label, marginTop: 18 }}>
                Where are you aiming?{" "}
                <span style={{ fontWeight: 400, color: C.dim }}>
                  (optional — the kinds of companies you want to reach)
                </span>
              </label>
              <input
                id="cap-categories"
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                placeholder="e.g. fintech, early-stage startups, healthcare"
                style={input}
              />

              <label htmlFor="cap-resume" style={{ ...label, marginTop: 18 }}>
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

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  ...btnPrimary,
                  width: "100%",
                  maxWidth: "none",
                  marginTop: 22,
                  background: status === "sending" ? "#1f3a30" : C.accentStrong,
                  color: status === "sending" ? C.dim : C.buttonInk,
                  cursor: status === "sending" ? "default" : "pointer",
                }}
              >
                {status === "sending" ? "Sending…" : "Claim my founding spot →"}
              </button>

              {message && (
                <p
                  role="status"
                  style={{
                    marginTop: 16,
                    marginBottom: 0,
                    fontSize: "0.97rem",
                    fontWeight: 600,
                    color: status === "error" ? C.red : C.accent,
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
              fontSize: "0.82rem",
              color: C.faint,
              marginTop: 32,
              lineHeight: 1.5,
            }}
          >
            Founding-member pre-launch · handled by real people · no charge today.
          </p>
        </div>
      </main>
    </>
  );
}

// ---- shared inline styles ----
const eyebrow = {
  display: "inline-block",
  padding: "6px 14px",
  borderRadius: 999,
  background: C.panelAlt,
  border: `1px solid ${C.border}`,
  fontSize: "0.78rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: C.accent,
  fontWeight: 600,
};
const sectionHeader = {
  fontSize: "0.82rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: C.faint,
  margin: "0 0 18px",
};
const card = {
  display: "flex",
  gap: 16,
  alignItems: "flex-start",
  background: C.panel,
  border: `1px solid ${C.border}`,
  borderRadius: 16,
  padding: "20px 22px",
  textAlign: "left",
};
const cardNum = {
  flex: "0 0 auto",
  fontSize: "0.95rem",
  fontWeight: 800,
  color: C.accent,
  fontVariantNumeric: "tabular-nums",
  paddingTop: 2,
};
const cardTitle = {
  fontWeight: 700,
  fontSize: "1.12rem",
  marginBottom: 6,
  color: C.ink,
};
const cardBody = {
  fontSize: "1rem",
  lineHeight: 1.55,
  color: C.dim,
};
const btnPrimary = {
  display: "inline-block",
  padding: "16px 32px",
  fontSize: "1.05rem",
  fontWeight: 700,
  color: C.buttonInk,
  background: C.accentStrong,
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
  color: C.ink,
};
const input = {
  width: "100%",
  padding: "13px 14px",
  fontSize: "1rem",
  borderRadius: 10,
  border: `1px solid ${C.border}`,
  background: C.bg,
  color: C.ink,
  boxSizing: "border-box",
};
const textarea = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "0.98rem",
  lineHeight: 1.5,
  borderRadius: 10,
  border: `1px solid ${C.border}`,
  background: C.bg,
  color: C.ink,
  boxSizing: "border-box",
  fontFamily: "inherit",
  resize: "vertical",
};
