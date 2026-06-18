export const metadata = {
  title: "BuildZero — Foundation",
  description: "Technical foundation skeleton: repo, hosting, and CI/CD proof.",
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
