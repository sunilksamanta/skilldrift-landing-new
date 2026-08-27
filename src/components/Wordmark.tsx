import Image from "next/image";

/**
 * The brand lockup: mark, "SkillDrift", and the tagline set smaller directly
 * beneath the name so the three read as one logo rather than three elements.
 */
export default function Wordmark({
  markSize = 38,
  textSize = 26,
  tagline = true,
  tone = "default",
}: {
  markSize?: number;
  textSize?: number;
  tagline?: boolean;
  /** `onColor` is for the purple CTA field, where the tagline sits on white. */
  tone?: "default" | "onColor";
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
      <Image
        src="/assets/mark.png"
        alt=""
        width={220}
        height={221}
        priority
        style={{ height: markSize, width: "auto", display: "block" }}
      />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontSize: textSize,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: tone === "onColor" ? "#FFFFFF" : "var(--tx)",
          }}
        >
          SkillDrift
        </span>
        {tagline && (
          <span
            style={{
              marginTop: Math.round(textSize * 0.18),
              fontSize: Math.max(10, Math.round(textSize * 0.42)),
              fontWeight: 500,
              letterSpacing: "-0.005em",
              whiteSpace: "nowrap",
              color: tone === "onColor" ? "rgba(255,255,255,.82)" : "var(--ac)",
            }}
          >
            Your Personal Career Coach!
          </span>
        )}
      </span>
    </span>
  );
}
