import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Refund Policy — GrantHunter",
  description:
    "GrantHunter Refund Policy: the $199 beta deposit is fully refundable, with at least a 30-day money-back guarantee.",
};

export default function Refund() {
  return (
    <>
      <SiteNav />
      <section className="page-head">
        <div className="wrap">
          <h1>Refund Policy</h1>
          <p className="updated">Last updated: 29 June 2026</p>
        </div>
      </section>
      <section className="legal">
        <div className="wrap legal-inner">
          <h2>The beta deposit is fully refundable</h2>
          <p>
            The $199 GrantHunter beta deposit is fully refundable. If GrantHunter
            isn&apos;t the right fit, you can request a full refund and we will
            return the entire amount — no questions asked.
          </p>

          <h2>30-day money-back guarantee</h2>
          <p>
            At a minimum, you may request a full refund within 30 days of your
            payment. During the private beta we extend this further: your deposit
            remains refundable in full at any point during the beta period. If
            you continue to a paid subscription, your deposit is credited toward
            your first invoice.
          </p>

          <h2>How to request a refund</h2>
          <p>
            Email{" "}
            <a href="mailto:autonomous0880@gmail.com">autonomous0880@gmail.com</a>{" "}
            from the address you used to purchase, and we&apos;ll process your
            refund to your original payment method. Refunds are issued through
            Paddle.com, our Merchant of Record. You can also contact Paddle
            directly via the receipt they email you, or at{" "}
            <a href="https://paddle.net" target="_blank" rel="noopener noreferrer">
              paddle.net
            </a>
            .
          </p>

          <h2>Processing time</h2>
          <p>
            Once approved, refunds are typically processed within a few business
            days; the time for the funds to appear depends on your bank or card
            issuer.
          </p>

          <h2>Questions</h2>
          <p>
            See our <Link href="/terms">Terms of Service</Link> for the full
            agreement, or email{" "}
            <a href="mailto:autonomous0880@gmail.com">autonomous0880@gmail.com</a>{" "}
            with any questions about refunds.
          </p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
