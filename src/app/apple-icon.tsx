import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * iOS fills transparency on a home-screen icon with black and applies its own
 * rounded mask, so the mark is composited onto the brand's dark field with
 * padding rather than shipped transparent.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const mark = await readFile(path.join(process.cwd(), "public/assets/mark.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090A",
          backgroundImage:
            "radial-gradient(120% 120% at 78% 6%, rgba(124,93,249,0.34) 0%, rgba(8,9,10,0) 62%)",
        }}
      >
        <img
          src={`data:image/png;base64,${mark.toString("base64")}`}
          width={112}
          height={112}
          alt=""
        />
      </div>
    ),
    size,
  );
}
