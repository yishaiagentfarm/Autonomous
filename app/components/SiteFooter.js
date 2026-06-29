import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <span className="foot-copy">© 2026 GrantHunter · autonomous0880@gmail.com</span>
        <div className="foot-links">
          <Link href="/pricing">Pricing</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/refund">Refunds</Link>
          <a href="mailto:autonomous0880@gmail.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
