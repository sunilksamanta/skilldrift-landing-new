import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { DEMAND_PAGES, getDemandPage } from "@/lib/skillsDemand";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SkillDrift";

export function generateStaticParams() {
  return DEMAND_PAGES.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getDemandPage(slug);
  return renderOgImage({
    kicker: "Skills in demand",
    headline: p?.h1 ?? "Skills in demand, by role and industry",
  });
}
