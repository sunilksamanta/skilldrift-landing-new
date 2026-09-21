import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Skills needed for a job, role by role";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    kicker: "Skills by role",
    headline: "Skills needed for a job, role by role",
  });
}
