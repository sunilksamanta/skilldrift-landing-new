import { CONTENT_ROUTES, getRouteBySlug } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SkillDrift";

export function generateStaticParams() {
  return CONTENT_ROUTES.map((route) => ({ slug: route.path.replace(/^\//, "") }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  return renderOgImage({
    kicker: route?.breadcrumb ?? route?.hero?.eyebrow ?? "SkillDrift",
    headline: route?.h1 ?? "SkillDrift",
  });
}
