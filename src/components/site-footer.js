import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="about">
      <div className="footer-top">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark">
              <span />
            </span>
            <span>
              motor<span className="brand-light">atlas</span>
              <small>THE OPEN ROAD, EXPLAINED</small>
            </span>
          </Link>
          <p className="footer-note">
            A thoughtful field guide to the machines
            <br className="desktop-only" /> that move us.
          </p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Take the scenic route</span>
          <Link href="/#explore">
            Browse the garage <ArrowUpRight size={14} />
          </Link>
          <Link href="/#categories">
            Explore vehicle types <ArrowUpRight size={14} />
          </Link>
        </div>
        <a className="back-top" href="#top">
          Back to top ↑
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Motor Atlas</span>
        <span>Independent guide · Specs are estimates and vary by market</span>
        <span>Made for the long way around.</span>
      </div>
    </footer>
  );
}
