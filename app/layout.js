import "./globals.css";

export const metadata = {
  title: "More shots on goal, done for you — Tailored applications at scale",
  description:
    "We research, tailor, and apply on your behalf — far more widely than you could by hand. You bring the resume. We handle the rest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
