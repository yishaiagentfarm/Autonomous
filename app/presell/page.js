"use client";

import { useState } from "react";
import Script from "next/script";

// ---------------------------------------------------------------------------
// PRE-SELL LANDING-PAGE SCAFFOLD (copy-independent instrumentation)
// Analytics:  Umami Cloud  -> script https://cloud.umami.is/script.js
//             website id    4a57c88b-c0e8-4f79-b1ef-699af84f47ab
//             custom event  "clicks_to_pay" (CTA), "email_captured" (form)
// Email:      FormSubmit.co AJAX -> /ajax/7aa38b6421bfc605ccc0e64aa6a7edb2
// NOTE: placeholder copy only. The approved offer (spec 4110ef3a) is
//       implemented on top of this scaffold in task c2442c56.
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

export default function Presell() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  // The "click-to-pay" CTA: this is the conversion-intent signal the
  // go/no-go gate counts. It fires a SEPARATE custom event so
  // conversion % = clicks_to_pay / unique visitors is computable.
  function handleCta() {
    track("clicks_to_pay");
    const form = document.getElementById("reserve-form");
    if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = document.getElementById("reserve-email");
    if (input) setTimeout(() => input.focus(), 350);
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
          _subject: "New pre-sell reservation (scaffold)",
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== "false") {
        track("email_captured");
        setStatus("done");
        setMessage("You're on the list. We'll be in touch.");
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

  return (
    <>
      {/* Umami analytics — auto-tracks pageview (unique visitors) on load */}
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id={UMAMI_WEBSITE_ID}
        strategy="afterInteractive"
      />

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "32px 20px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%", maxWidth: 560 }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: 999,
              background: "#161d3a",
              border: "1px solid #2a3358",
              fontSize: "0.8rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            Placeholder — instrumentation scaffold
          </span>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 6vw, 2.6rem)",
              lineHeight: 1.15,
              margin: "20px 0 12px",
            }}
          >
            Your headline goes here
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 4vw, 1.15rem)",
              lineHeight: 1.55,
              opacity: 0.9,
              margin: "0 auto 28px",
              maxWidth: 480,
            }}
          >
            This is a copy-independent landing-page scaffold. The approved offer
            copy, pricing, and the free-scan mechanic get dropped in on top of
            this page. The buttons and form below are fully wired to live
            analytics and email capture.
          </p>

          <button
            onClick={handleCta}
            style={{
              display: "inline-block",
              padding: "15px 30px",
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#0b1020",
              background: "#7dd3fc",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              width: "100%",
              maxWidth: 360,
            }}
          >
            Reserve your founding spot →
          </button>
          <p style={{ fontSize: "0.85rem", opacity: 0.6, marginTop: 10 }}>
            (CTA fires the <code>clicks_to_pay</code> conversion event)
          </p>

          <form
            id="reserve-form"
            onSubmit={handleSubmit}
            style={{
              marginTop: 40,
              padding: 24,
              background: "#111935",
              border: "1px solid #2a3358",
              borderRadius: 16,
              textAlign: "left",
            }}
          >
            <label
              htmlFor="reserve-email"
              style={{ display: "block", fontSize: "0.95rem", marginBottom: 8 }}
            >
              Reserve your spot — drop your email
            </label>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <input
                id="reserve-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={{
                  flex: "1 1 200px",
                  minWidth: 0,
                  padding: "13px 14px",
                  fontSize: "1rem",
                  borderRadius: 10,
                  border: "1px solid #2a3358",
                  background: "#0b1020",
                  color: "#e6e9f2",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  flex: "0 0 auto",
                  padding: "13px 22px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#0b1020",
                  background: status === "sending" ? "#3a4a6b" : "#a7f3d0",
                  border: "none",
                  borderRadius: 10,
                  cursor: status === "sending" ? "default" : "pointer",
                }}
              >
                {status === "sending" ? "Sending…" : "Notify me"}
              </button>
            </div>
            {message && (
              <p
                role="status"
                style={{
                  marginTop: 14,
                  marginBottom: 0,
                  fontSize: "0.95rem",
                  color: status === "error" ? "#fca5a5" : "#a7f3d0",
                }}
              >
                {message}
              </p>
            )}
          </form>

          <p style={{ fontSize: "0.8rem", opacity: 0.5, marginTop: 28 }}>
            Scaffold for the pre-sell go/no-go gate. Not the final product.
          </p>
        </div>
      </main>
    </>
  );
}
