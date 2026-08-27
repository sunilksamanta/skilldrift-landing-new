import Image from "next/image";

/**
 * The brand lockup: mark, "SkillDrift", and the tagline set smaller directly
 * beneath the name so the three read as one logo rather than three elements.
 *
 * `markSize` and `textSize` are defaults, not fixed values — a caller can
 * override either with the `--sd-mark` / `--sd-text` custom properties, which
 * is how the header shrinks the lockup on narrow screens.
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
        style={{
          height: `var(--sd-mark, ${markSize}px)`,
          width: "auto",
          display: "block",
        }}
      />
      {/* The lockup sets its own alignment so a centred container — the CTA
          band — cannot centre "SkillDrift" over the wider tagline. */}
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontSize: `var(--sd-text, ${textSize}px)`,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: tone === "onColor" ? "#FFFFFF" : "var(--tx)",
          }}
        >
          SkillDrift
        </span>
        {tagline && (
          <span
            data-sd-tagline=""
            style={{
              marginTop: `calc(var(--sd-text, ${textSize}px) * 0.18)`,
              fontSize: `max(10px, calc(var(--sd-text, ${textSize}px) * 0.42))`,
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
