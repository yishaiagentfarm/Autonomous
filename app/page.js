const DEPLOY_LABEL = "v1 — initial deploy";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 640 }}>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>
          Deploy pipeline is live ✅
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.5, opacity: 0.9 }}>
          This is the company&apos;s technical-foundation skeleton: a GitHub repo,
          free-tier hosting, and a CI/CD pipeline that auto-deploys every push to{" "}
          <code>main</code>. We&apos;ll adapt this skeleton into the chosen product.
        </p>
        <p
          style={{
            marginTop: "1.5rem",
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: 999,
            background: "#161d3a",
            border: "1px solid #2a3358",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          Build marker: {DEPLOY_LABEL}
        </p>
      </div>
    </main>
  );
}
