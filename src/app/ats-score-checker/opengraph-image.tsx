import { getRoute } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = getRoute("/ats-score-checker").title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    kicker: "Free ATS check, no signup",
    headline: getRoute("/ats-score-checker").h1,
  });
}
