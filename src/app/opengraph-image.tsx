import { getRoute } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = getRoute("/").title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    kicker: "AI career platform",
    headline: getRoute("/").h1,
  });
}
