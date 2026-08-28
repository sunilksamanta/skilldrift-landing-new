import Link from "next/link";
import MobileMenu from "./MobileMenu";
import TrackedLink from "./TrackedLink";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";
import { BLOG_URL, signInHref } from "@/lib/cta";

/** All nav destinations are real routes now; only the blog leaves the site. */
const nav: { href: string; label: string; external?: boolean }[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/jobs", label: "Jobs" },
  { href: "/pricing", label: "Pricing" },
  { href: BLOG_URL, label: "Blog", external: true },
];

export default function SiteHeader({ campaign = "site" }: { campaign?: string }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(18px)",
        background: "color-mix(in oklab, var(--bg) 78%, transparent)",
        borderBottom: "1px solid transparent",
      }}
    >
      <div
        className="wrap sd-headpad"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
        }}
      >
        <Link
          href="/"
          className="sd-lockup"
          style={{ display: "block", flex: "0 0 auto", minWidth: 0 }}
          aria-label="SkillDrift home"
        >
          <Wordmark markSize={46} textSize={29} />
        </Link>

        <nav
          className="sd-nav"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px 28px",
            margin: "0 auto",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--tx)" }}
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} style={{ color: "var(--tx)" }}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div
          className="sd-headactions"
          style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}
        >
          <ThemeToggle />
          <TrackedLink
            className="sd-header-cta"
            href={signInHref(campaign, "header_sign_in")}
            section="header"
            label="sign_in"
            style={{
              height: 44,
              padding: "0 26px",
              borderRadius: 999,
              background: "var(--btn)",
              color: "var(--btntx)",
              fontSize: 16,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Sign in
          </TrackedLink>
          <MobileMenu
            items={nav}
            signInLabel="Sign in"
            signInHref={signInHref(campaign, "menu_sign_in")}
          />
        </div>
      </div>
    </header>
  );
}
