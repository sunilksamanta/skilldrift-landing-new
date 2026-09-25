import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "@/lib/content";
import { LIVE_ROLES } from "@/lib/roles";
import { SITE_URL } from "@/lib/seo";

/** Appendix A4, generated from pages.json. `lastmod` comes from the build. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...ALL_ROUTES.map((route) => ({
      // Matches the rendered canonical, which Next normalises without a trailing
      // slash on the root.
      url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency:
        route.path === "/" || route.path === "/jobs"
          ? ("weekly" as const)
          : ("monthly" as const),
      priority: route.priority,
    })),
    // Skills-by-role hub plus one entry per live role (lib/roles.ts).
    {
      url: `${SITE_URL}/closed-loop-career-development`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...LIVE_ROLES.map((r) => ({
      url: `${SITE_URL}/skills/${r.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
