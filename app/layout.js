export const metadata = {
  title: "Get your resume tailored to the exact company you're applying to",
  description:
    "Tell us the role and the company. We research their job post, recent news, and engineering/product blog, then rewrite your resume to fit what that team actually cares about — emailed back to you, fast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          background: "#0b1020",
          color: "#e6e9f2",
        }}
      >
        {children}
      </body>
    </html>
  );
}
