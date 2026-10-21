import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

async function fonts() {
  const [medium, semibold] = await Promise.all([
    readFile(path.join(FONT_DIR, "Switzer-Medium.ttf")),
    readFile(path.join(FONT_DIR, "Switzer-Semibold.ttf")),
  ]);
  return [
    { name: "Switzer", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Switzer", data: semibold, weight: 600 as const, style: "normal" as const },
  ];
}

async function markDataUri() {
  const buf = await readFile(path.join(process.cwd(), "public/assets/mark.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

/**
 * One OG card per route, rendered at build time. Deep violet field (the same
 * band as the homepage), the score ring as the brand mark, the page's own H1 as the headline, and the
 * eyebrow as a kicker — so a shared link is legible about which page it is.
 */
export async function renderOgImage({
  kicker,
  headline,
  footer = "skilldrift.ai",
}: {
  kicker: string;
  headline: string;
  footer?: string;
}) {
  const [loadedFonts, mark] = await Promise.all([fonts(), markDataUri()]);

  // Long H1s need to step down a size or two to stay on four lines.
  const size = headline.length > 62 ? 54 : headline.length > 44 ? 62 : 70;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 76px",
          backgroundColor: "#1d1250",
          backgroundImage:
            "radial-gradient(900px 560px at 92% 0%, rgba(155,130,255,0.5) 0%, rgba(91,63,208,0.25) 45%, rgba(29,18,80,0) 75%), linear-gradient(160deg, #1d1250 0%, #2f1d86 55%, #4a2fc4 100%)",
          backgroundSize: "100% 100%, 100% 100%",
          position: "relative",
          fontFamily: "Switzer",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={56} height={56} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 38, fontWeight: 600, letterSpacing: "-0.02em" }}>
              SkillDrift
            </span>
            <span style={{ fontSize: 17, fontWeight: 500, color: "#C9BCFF" }}>
              Your Personal Career Coach!
            </span>
          </div>
        </div>

        {/* The score ring: the site's repeated mark. */}
        <div
          style={{
            position: "absolute",
            right: 76,
            top: 150,
            width: 230,
            height: 230,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="230" height="230" viewBox="0 0 230 230" style={{ position: "absolute", left: 0, top: 0 }}>
            <circle cx="115" cy="115" r="98" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="18" />
            <circle
              cx="115"
              cy="115"
              r="98"
              fill="none"
              stroke="#B9A6FF"
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray="615.75"
              strokeDashoffset="129.3"
              transform="rotate(-90 115 115)"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 76, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>79</span>
            <span style={{ marginTop: 6, fontSize: 18, fontWeight: 500, color: "#C9BCFF" }}>out of 100</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C9BCFF",
            }}
          >
            {kicker}
          </span>
          <span
            style={{
              marginTop: 22,
              fontSize: size,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.028em",
              maxWidth: 760,
            }}
          >
            {headline}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            fontSize: 22,
            color: "#C9BCFF",
          }}
        >
          <span>{footer}</span>
          <span style={{ color: "#FFFFFF" }}>
            Upload your resume - free
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: loadedFonts },
  );
}
