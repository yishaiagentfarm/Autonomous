"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { scanResume } from "./atsScan";

// ---------------------------------------------------------------------------
// PRE-SELL OFFER PAGE — implements approved spec 4110ef3a verbatim.
// Built on the proven instrumentation scaffold (task 08d37766):
//   Analytics:  Umami Cloud  -> https://cloud.umami.is/script.js
//               website id    4a57c88b-c0e8-4f79-b1ef-699af84f47ab
//               custom events: scan_run, clicks_to_pay, email_captured
//               (Umami auto-pageview = unique visitors -> conversion %
//                = clicks_to_pay / unique visitors stays computable)
//   Email:      FormSubmit.co AJAX -> /ajax/7aa38b6421bfc605ccc0e64aa6a7edb2
// 100% client-side. No backend, no API, Stripe NOT live ($0 fake-door).
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
  const scanRef = useRef(null);

  // Free-scan state
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [scanError, setScanError] = useState("");

  // Reserve / email-capture state
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");
  const emailRef = useRef(null);

  function scrollToScan() {
    if (scanRef.current)
      scanRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleScan() {
    const r = scanResume(resume, jd);
    track("scan_run");
    if (r.error) {
      setScanError(r.error);
      setResult(null);
      return;
    }
    setScanError("");
    setResult(r);
  }

  // The click-to-pay CTA: fires the conversion-intent event the go/no-go gate
  // counts, then reveals the email field.
  function handleReserve() {
    track("clicks_to_pay");
    setShowEmail(true);
    setTimeout(() => emailRef.current && emailRef.current.focus(), 300);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || status === "sending") return;
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
          _subject: "New founding-spot reservation (ATS scan pre-sell)",
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== "false") {
        track("email_captured");
        setStatus("done");
        setMessage("You're in. Founding rate reserved — watch your inbox.");
        setEmail("");
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

  const bullets = [
    {
      h: "Real ATS match score, not vibes",
      p: "See the parse match-rate and the exact keywords this job wants that your resume is missing. (ChatGPT can't simulate the parser; it just gives prose.)",
    },
    {
      h: "Bulk per-application tailoring",
      p: "Paste your resume once, generate a targeted version for 10, 30, 50 roles, and track which version you sent where. (ChatGPT makes you re-paste and re-prompt every single time.)",
    },
    {
      h: "Tuned for tech roles",
      p: "Knows K8s = Kubernetes, the stack keywords recruiters filter on, and seniority signals — without robotic keyword-stuffing that gets you flagged.",
    },
    {
      h: "Founding rate locked for life: $19/mo (or $29/quarter)",
      p: "Under half the price of Jobscan ($50/mo), built for people between paychecks.",
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
          {/* ---------------- SECTION 1 — HERO ---------------- */}
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
              For laid-off tech professionals applying at volume
            </span>

            <h1
              style={{
                fontSize: "clamp(1.9rem, 6vw, 2.8rem)",
                lineHeight: 1.14,
                margin: "22px 0 16px",
                fontWeight: 800,
              }}
            >
              Laid off and applying to 40 jobs a week? The ATS is rejecting most
              of them before a human ever looks.
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
              Built for laid-off software, product, and data folks applying at
              volume. See the exact match-rate Greenhouse and Workday give your
              resume — and the keywords you&apos;re missing for <em>each</em> job
              — then tailor every application in minutes.
            </p>

            <button onClick={scrollToScan} style={btnPrimary}>
              Run my free ATS scan ↓
            </button>
          </section>

          {/* ---------------- BENEFIT BULLETS ---------------- */}
          <section
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "1fr",
              margin: "36px 0 8px",
            }}
          >
            {bullets.map((b, i) => (
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
                    marginBottom: 4,
                    color: C.sky,
                  }}
                >
                  {b.h}
                </div>
                <div style={{ fontSize: "0.96rem", lineHeight: 1.5, color: C.dim }}>
                  {b.p}
                </div>
              </div>
            ))}
          </section>

          {/* ---------------- SECTION 2 — FREE ATS SCAN ---------------- */}
          <section
            ref={scanRef}
            style={{
              marginTop: 44,
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
              Free ATS scan
            </h2>
            <p style={{ color: C.dim, margin: "0 0 20px", fontSize: "0.98rem" }}>
              Paste your resume and one job description. Runs entirely in your
              browser — nothing is uploaded.
            </p>

            <label style={label}>Paste your resume (plain text)</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste the full text of your resume…"
              rows={6}
              style={textarea}
            />

            <label style={{ ...label, marginTop: 16 }}>
              Paste the job description
            </label>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full job posting…"
              rows={6}
              style={textarea}
            />

            <button
              onClick={handleScan}
              style={{ ...btnPrimary, width: "100%", maxWidth: "none", marginTop: 18 }}
            >
              Scan my resume
            </button>

            {scanError && (
              <p style={{ color: C.amber, marginTop: 14, fontSize: "0.95rem" }}>
                {scanError}
              </p>
            )}

            {/* ---- RESULT PANEL ---- */}
            {result && (
              <div style={{ marginTop: 26 }}>
                <div
                  style={{
                    textAlign: "center",
                    padding: "18px 0",
                    borderTop: `1px solid ${C.border}`,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <div style={{ fontSize: "0.9rem", color: C.dim, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    ATS match
                  </div>
                  <div
                    style={{
                      fontSize: "3.4rem",
                      fontWeight: 800,
                      lineHeight: 1.05,
                      color:
                        result.score >= 70
                          ? C.mint
                          : result.score >= 45
                          ? C.amber
                          : C.red,
                    }}
                  >
                    {result.score}%
                  </div>
                  <div style={{ fontSize: "0.9rem", color: C.dim }}>
                    {result.matchedCount} of {result.totalKeywords} keywords this
                    posting scans for are in your resume
                  </div>
                </div>

                {result.missing.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <div style={resultHeading}>
                      Keywords this job is scanning for that aren&apos;t in your
                      resume:
                    </div>
                    {result.missing.map((m, i) => (
                      <details key={i} style={missItem}>
                        <summary style={missSummary}>
                          <span style={{ fontWeight: 600 }}>{m.display}</span>
                          {m.weight >= 2 && (
                            <span style={emphTag}>emphasized {m.weight}×</span>
                          )}
                        </summary>
                        {m.sentence ? (
                          <p style={missDetail}>
                            From the posting: &ldquo;{m.sentence}&rdquo;
                          </p>
                        ) : (
                          <p style={missDetail}>Mentioned in the job description.</p>
                        )}
                      </details>
                    ))}
                  </div>
                )}

                {result.covered.length > 0 && (
                  <div style={{ marginTop: 18 }}>
                    <div style={resultHeading}>Already covered:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {result.covered.map((c, i) => (
                        <span key={i} style={coveredTag}>
                          ✓ {c.display}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p
                  style={{
                    marginTop: 18,
                    fontSize: "0.85rem",
                    color: C.dim,
                    lineHeight: 1.5,
                    fontStyle: "italic",
                  }}
                >
                  This is a keyword-parse estimate — the same signal ATS like
                  Greenhouse/Workday rank on. Nothing left your browser. The paid
                  tool rewrites your bullets to close these gaps without
                  keyword-stuffing.
                </p>
              </div>
            )}
          </section>

          {/* ---------------- SECTION 3 — PAID OFFER + CLICK-TO-PAY ---------- */}
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
                fontSize: "1.04rem",
                lineHeight: 1.55,
                margin: "0 0 6px",
                color: C.ink,
              }}
            >
              That&apos;s your free scan. The full tool (launching soon) rewrites
              your bullets to close these gaps, bulk-tailors 30+ roles, and
              exports ATS-safe formatting.
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                margin: "0 0 20px",
                color: C.sky,
              }}
            >
              Founding rate $19/mo or $29/quarter — locked for life.
            </p>

            <button onClick={handleReserve} style={{ ...btnPrimary, background: C.mint }}>
              Reserve my founding spot — $19/mo →
            </button>

            {showEmail && (
              <form onSubmit={handleSubmit} style={{ marginTop: 22, textAlign: "left" }}>
                <label htmlFor="reserve-email" style={label}>
                  Lock the founding rate — drop your email and we&apos;ll invite
                  you the day we launch.
                </label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input
                    id="reserve-email"
                    ref={emailRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    style={emailInput}
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      ...btnSubmit,
                      background: status === "sending" ? "#3a4a6b" : C.mint,
                      cursor: status === "sending" ? "default" : "pointer",
                    }}
                  >
                    {status === "sending" ? "Reserving…" : "Reserve"}
                  </button>
                </div>
                {message && (
                  <p
                    role="status"
                    style={{
                      marginTop: 14,
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
            )}
          </section>

          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "rgba(230,233,242,0.45)", marginTop: 30 }}>
            Founding-member pre-launch. No charge today — reserve your rate and
            we&apos;ll email you at launch.
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
const btnSubmit = {
  flex: "0 0 auto",
  padding: "13px 24px",
  fontSize: "1rem",
  fontWeight: 700,
  color: "#0b1020",
  border: "none",
  borderRadius: 10,
};
const label = {
  display: "block",
  fontSize: "0.92rem",
  fontWeight: 600,
  marginBottom: 8,
  color: "#e6e9f2",
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
const emailInput = {
  flex: "1 1 220px",
  minWidth: 0,
  padding: "13px 14px",
  fontSize: "1rem",
  borderRadius: 10,
  border: "1px solid #2a3358",
  background: "#0b1020",
  color: "#e6e9f2",
  boxSizing: "border-box",
};
const resultHeading = {
  fontSize: "0.95rem",
  fontWeight: 700,
  marginBottom: 10,
  color: "#e6e9f2",
};
const missItem = {
  background: "#0b1020",
  border: "1px solid #2a3358",
  borderRadius: 10,
  padding: "10px 14px",
  marginBottom: 8,
};
const missSummary = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: "0.97rem",
  listStyle: "revert",
};
const emphTag = {
  fontSize: "0.72rem",
  fontWeight: 600,
  color: "#fbbf24",
  border: "1px solid rgba(251,191,36,0.4)",
  borderRadius: 999,
  padding: "1px 8px",
};
const missDetail = {
  margin: "10px 0 0",
  fontSize: "0.9rem",
  lineHeight: 1.5,
  color: "rgba(230,233,242,0.72)",
};
const coveredTag = {
  fontSize: "0.86rem",
  color: "#a7f3d0",
  background: "rgba(167,243,208,0.08)",
  border: "1px solid rgba(167,243,208,0.3)",
  borderRadius: 999,
  padding: "4px 12px",
};
