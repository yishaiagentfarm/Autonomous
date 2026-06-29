import "./globals.css";

export const metadata = {
  title: "GrantHunter — AI drafts your grant applications",
  description:
    "GrantHunter reads a funding opportunity and drafts a compliance matrix and a first-draft narrative tailored to the solicitation. Built for grant writers, agencies, and GovCon small businesses. Reserve a private-beta seat with a refundable $199 deposit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
