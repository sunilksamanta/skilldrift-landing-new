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
 * One OG card per route, rendered at build time. Dark field, the brand's purple
 * bloom top-right, a faint grid, the page's own H1 as the headline, and the
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
  const size = headline.length > 62 ? 62 : headline.length > 44 ? 72 : 82;

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
          backgroundColor: "#08090A",
          backgroundImage:
            "radial-gradient(1100px 620px at 88% -12%, rgba(168,146,255,0.42) 0%, rgba(96,73,192,0.18) 42%, rgba(8,9,10,0) 72%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 88px 88px, 88px 88px",
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
            <span style={{ fontSize: 17, fontWeight: 500, color: "#9C86FF" }}>
              Your Personal Career Coach!
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#9C86FF",
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
              maxWidth: 1000,
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
            borderTop: "1px solid rgba(255,255,255,0.14)",
            fontSize: 22,
            color: "#9EA0A8",
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
