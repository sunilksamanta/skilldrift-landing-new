import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { LIVE_ROLES, getRole } from "@/lib/roles";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SkillDrift";

export function generateStaticParams() {
  return LIVE_ROLES.map((r) => ({ role: r.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role: slug } = await params;
  const r = getRole(slug);
  return renderOgImage({
    kicker: "Skills by role",
    headline: r?.h1 ?? "Skills needed for a job",
  });
}
