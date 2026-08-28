import Image from "next/image";
import Link from "next/link";
import Wordmark from "./Wordmark";
import SectionLink from "./SectionLink";
import TrackedLink from "./TrackedLink";
import { signInHref } from "@/lib/cta";

type FooterLink =
  | { href: string; label: string; external?: boolean; cta?: string }
  | { section: string; label: string }
  | { signIn: true; label: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/features", label: "Features" },
      { href: "/jobs", label: "Jobs" },
      { href: "/pricing", label: "Pricing" },
      { signIn: true, label: "Sign in" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/contact", label: "Careers" },
      {
        href: "https://skilldrift.org",
        label: "For Institutions",
        external: true,
        cta: "institutions",
      },
      { href: "/contact", label: "For employers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-use", label: "Terms of Use" },
      { href: "/data-protection", label: "Data Protection" },
    ],
  },
  {
    title: "Follow",
    links: [
      { href: "https://www.linkedin.com/company/skilldrift", label: "LinkedIn", external: true },
      { href: "https://www.youtube.com/@SkillDrift-AI", label: "YouTube", external: true },
      { href: "https://www.instagram.com/skilldriftindia/", label: "Instagram", external: true },
      { href: "https://www.facebook.com/skilldriftindia", label: "Facebook Page", external: true },
    ],
  },
  /*
   * Split out of "Follow", which is where the directory listings had ended up.
   * Nobody follows a Capterra page, and lumping ten links under one heading
   * made the column longer than the four beside it. These are also the entries
   * that matter for `sameAs` in schema.ts — every URL in this column appears
   * there and vice versa, so keep the two lists in step when either changes.
   */
  {
    title: "Listed on",
    links: [
      {
        href: "https://theresanaiforthat.com/ai/skilldrift/",
        label: "There's An AI For That",
        external: true,
      },
      {
        href: "https://alternativeto.net/software/skilldrift/",
        label: "AlternativeTo",
        external: true,
      },
      { href: "https://www.capterra.com/p/10166550/SkillDrift/", label: "Capterra", external: true },
      { href: "https://www.getapp.com/all-software/a/skilldrift/", label: "GetApp", external: true },
      {
        href: "https://www.softwareadvice.com/product/674176-SkillDrift/",
        label: "Software Advice",
        external: true,
      },
      {
        href: "https://www.crunchbase.com/organization/skilldrift",
        label: "Crunchbase",
        external: true,
      },
    ],
  },
];

const socialStyle: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: 999,
  border: "1px solid var(--line2)",
  display: "grid",
  placeItems: "center",
  color: "var(--tx2)",
};

export default function SiteFooter({ campaign = "site" }: { campaign?: string }) {
  return (
    <footer
      id="footer"
      style={{
        padding: "80px 0 40px",
        borderTop: "1px solid var(--line)",
        background: "var(--bg2)",
      }}
    >
      <div className="wrap">
        <div
          className="sd-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(min(260px,100%),1.5fr) repeat(auto-fit,minmax(min(150px,100%),1fr))",
            gap: 44,
          }}
        >
          <div>
            <Link href="/" aria-label="SkillDrift home" style={{ display: "inline-block" }}>
              <Wordmark markSize={36} textSize={23} />
            </Link>
            <p
              style={{
                marginTop: 18,
                maxWidth: 270,
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--tx2)",
              }}
            >
              Start with where you are. We&rsquo;ll help you figure out what&rsquo;s
              next.
            </p>
            <span
              style={{
                marginTop: 26,
                display: "inline-flex",
                padding: 10,
                borderRadius: 8,
                background: "#FFFFFF",
              }}
            >
              <Image
                src="/assets/nvidia.png"
                alt="NVIDIA Inception Program"
                width={501}
                height={217}
                style={{ height: 44, width: "auto", display: "block" }}
              />
            </span>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>{column.title}</h3>
              <ul
                style={{
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  fontSize: 15,
                }}
              >
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"signIn" in link ? (
                      <a
                        href={signInHref(campaign, "footer_sign_in")}
                        style={{ color: "var(--tx2)" }}
                      >
                        {link.label}
                      </a>
                    ) : "section" in link ? (
                      <SectionLink to={link.section} style={{ color: "var(--tx2)" }}>
                        {link.label}
                      </SectionLink>
                    ) : "cta" in link && link.cta ? (
                      <TrackedLink
                        href={link.href}
                        section="footer"
                        label={link.cta}
                        newTab={link.external}
                        style={{ color: "var(--tx2)" }}
                      >
                        {link.label}
                      </TrackedLink>
                    ) : "external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--tx2)" }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} style={{ color: "var(--tx2)" }}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            paddingTop: 26,
            borderTop: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 22,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 14, color: "var(--tx3)" }}>
            &copy; 2026 SkillDrift. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="https://www.instagram.com/skilldriftindia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={socialStyle}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/skilldrift" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={socialStyle}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 8.5h3v11h-3zM6 4a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 6 4zM10 8.5h2.9v1.5c.5-.9 1.6-1.7 3.2-1.7 2.4 0 3.4 1.5 3.4 4.2v7h-3v-6.3c0-1.4-.5-2.2-1.7-2.2-1.1 0-1.8.8-1.8 2.2v6.3h-3z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/skilldriftindia" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={socialStyle}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.6-1.5h1.6V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H7.5v3h2.8v8z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@SkillDrift-AI" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={socialStyle}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.4 8.2a2.5 2.5 0 0 0-1.8-1.8C18 6 12 6 12 6s-6 0-7.6.4A2.5 2.5 0 0 0 2.6 8.2C2.2 9.8 2.2 12 2.2 12s0 2.2.4 3.8a2.5 2.5 0 0 0 1.8 1.8C6 18 12 18 12 18s6 0 7.6-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-3.8.4-3.8s0-2.2-.4-3.8zM10.2 15V9l5.2 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
