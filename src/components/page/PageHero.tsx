import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight } from "../icons";
import { primaryButton } from "../SectionBits";
import SmartLink from "../SmartLink";

/**
 * The masthead every inner page opens with: eyebrow, H1, standfirst, one
 * primary CTA and one text link. Same gradient wash as the landing hero so the
 * two read as one site.
 */
export default function PageHero({
  eyebrow,
  h1,
  standfirst,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  aside,
  campaign,
}: {
  eyebrow: string;
  h1: string;
  standfirst: ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
  campaign?: string;
}) {
  const cta = primaryCta ?? { label: "Upload your resume — free", href: "/#top" };
  // The product shots already carry their own purple field, so they need no
  // frame — only a matching radius and a lift off the page.
  const shot = image ? (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1800 / 1290",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 30px 70px rgba(20,10,60,.30)",
      }}
    >
      <Image
        src={image}
        alt={imageAlt ?? ""}
        fill
        priority
        sizes="(max-width: 1000px) 100vw, 46vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  ) : null;
  const side = aside ?? shot;
  return (
    <section
      style={{
        position: "relative",
        padding: "56px 0 96px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -320,
          right: -120,
          width: 1400,
          height: 1100,
          pointerEvents: "none",
          background:
            "linear-gradient(206deg, rgba(255,255,255,.72) 0%, rgba(255,255,255,.42) 7%, rgba(150,124,255,.26) 16%, rgba(96,73,192,.11) 30%, transparent 46%)",
          transform: "rotate(-2deg)",
          opacity: 0.9,
        }}
      />

      <div className="wrap" style={{ position: "relative" }}>
        <div
          className="sd-page-hero"
          style={{
            display: "grid",
            gridTemplateColumns: side
              ? "repeat(auto-fit,minmax(min(420px,100%),1fr))"
              : "minmax(0,1fr)",
            gap: 72,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ac)",
              }}
            >
              {eyebrow}
            </div>
            <h1
              style={{
                marginTop: 18,
                maxWidth: 900,
                fontSize: "clamp(34px,4.1vw,58px)",
                lineHeight: 1.07,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                color: "var(--tx)",
              }}
            >
              {h1}
            </h1>
            <p
              style={{
                marginTop: 24,
                maxWidth: 640,
                fontSize: 17,
                lineHeight: 1.62,
                color: "var(--tx2)",
              }}
            >
              {standfirst}
            </p>
            <div
              style={{
                marginTop: 32,
                display: "flex",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <SmartLink href={cta.href} campaign={campaign} content="hero_primary" style={primaryButton}>
                {cta.label}
              </SmartLink>
              {secondaryCta && (
                <SmartLink
                  href={secondaryCta.href}
                  campaign={campaign}
                  content="hero_secondary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 16,
                    fontWeight: 500,
                    color: "var(--tx)",
                  }}
                >
                  {secondaryCta.label}
                  <ArrowRight />
                </SmartLink>
              )}
            </div>
          </div>

          {side}
        </div>
      </div>
    </section>
  );
}
