import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { ArrowRight } from "@/components/icons";
import { primaryButton } from "@/components/SectionBits";
import { signUpHref } from "@/lib/cta";

/**
 * Appendix A5 — this route returns HTTP 404, carries `noindex`, and links back
 * to the homepage and its drop-zone.
 */
export const metadata: Metadata = {
  title: "Page not found | SkillDrift",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--tx)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <SiteHeader campaign={"not_found"} />
      <main style={{ flex: "1 1 auto", display: "grid", placeItems: "center" }}>
        <div className="wrap" style={{ padding: "96px 100px", textAlign: "center" }}>
          <div
            style={{
              fontSize: 12.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ac)",
            }}
          >
            404
          </div>
          <h1
            style={{
              marginTop: 18,
              fontSize: "clamp(30px,3.4vw,46px)",
              lineHeight: 1.12,
              fontWeight: 600,
              letterSpacing: "-0.025em",
            }}
          >
            That page isn&rsquo;t here.
          </h1>
          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 480,
              fontSize: 16,
              lineHeight: 1.62,
              color: "var(--tx2)",
            }}
          >
            The link may be old, or the address slightly off. Your readiness score is
            two minutes away either way.
          </p>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <a href={signUpHref("not_found", "notfound_primary")} style={primaryButton}>
              Upload your resume - free
            </a>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 16,
                fontWeight: 500,
                color: "var(--tx)",
              }}
            >
              Back to the homepage
              <ArrowRight />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter campaign={"not_found"} />
    </div>
  );
}
