import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="nav-left">
          <Link href="/" className="brand">GrantHunter</Link>
          <div className="nav-links">
            <Link href="/pricing">Pricing</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/refund">Refunds</Link>
          </div>
        </div>
        <Link href="/pricing" className="btn-solid">Get a beta seat →</Link>
      </div>
    </nav>
  );
}
