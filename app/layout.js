import "./globals.css";

export const metadata = {
  title: "Autonomous — We apply to jobs for you",
  description:
    "Tell us your target role and the companies you want to work at. We research each one, tailor your resume to fit, and send the applications — far more than you could by hand. You bring the resume; we handle the rest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
