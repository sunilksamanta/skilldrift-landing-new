import { ArrowRight } from "../icons";
import SmartLink from "../SmartLink";

/**
 * Closing CTA for inner pages. Same purple grid field as the landing page's
 * closing section, without the phone — the app shot is the homepage's moment.
 */
export default function CtaBand({
  heading,
  copy,
  primary,
  secondary,
  note,
}: {
  heading: string;
  copy: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  note?: string;
}) {
  const cta = primary ?? { label: "Upload your resume — free", href: "/#top" };
  const footnote =
    note ?? "No card required · first application free · takes 2 minutes";
  return (
    <section
      aria-label="Get started with SkillDrift"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#5B49B4",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px),linear-gradient(180deg, #6A55C8 0%, #5B49B6 46%, #4B3C99 100%)",
        backgroundSize: "120px 120px, 120px 120px, 100% 100%",
      }}
    >
      <div
        className="wrap"
        style={{
          position: "relative",
          paddingTop: 88,
          paddingBottom: 88,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px,3.2vw,44px)",
            lineHeight: 1.14,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            color: "#FFFFFF",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            margin: "20px auto 0",
            maxWidth: 560,
            fontSize: 17,
            lineHeight: 1.6,
            color: "rgba(255,255,255,.80)",
          }}
        >
          {copy}
        </p>
        <div
          style={{
            marginTop: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            flexWrap: "wrap",
          }}
        >
          <SmartLink
            href={cta.href}
            style={{
              height: 56,
              padding: "0 36px",
              borderRadius: 14,
              background: "#FFFFFF",
              color: "#1A1330",
              fontSize: 16.5,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {cta.label}
          </SmartLink>
          {secondary && (
            <SmartLink
              href={secondary.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontSize: 16.5,
                fontWeight: 500,
                color: "rgba(255,255,255,.9)",
              }}
            >
              {secondary.label}
              <ArrowRight size={18} strokeWidth={1.9} />
            </SmartLink>
          )}
        </div>
        <p style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,.62)" }}>
          {footnote}
        </p>
      </div>
    </section>
  );
}
