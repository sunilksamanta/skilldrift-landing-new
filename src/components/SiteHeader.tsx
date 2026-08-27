import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";
import { BLOG_URL, signInHref } from "@/lib/cta";

/** All nav destinations are real routes now; only the blog leaves the site. */
const nav: { href: string; label: string; external?: boolean }[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/jobs", label: "Jobs" },
  { href: "/pricing", label: "Price" },
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
          flexWrap: "wrap",
          gap: "20px 32px",
        }}
      >
        <Link href="/" style={{ display: "block", flex: "0 0 auto" }} aria-label="SkillDrift home">
          <Wordmark markSize={40} textSize={25} />
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
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flex: "0 0 auto",
          }}
        >
          <ThemeToggle />
          <a
            href={signInHref(campaign, "header_sign_up")}
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
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}
