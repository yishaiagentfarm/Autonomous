export const metadata = {
  title: "Free ATS Resume Scan — Founding offer for laid-off tech pros",
  description:
    "See the real ATS match-rate Greenhouse and Workday give your resume and the exact keywords you're missing for each job. Free, runs in your browser.",
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
