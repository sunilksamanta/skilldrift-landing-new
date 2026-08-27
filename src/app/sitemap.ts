import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

/** Appendix A4, generated from pages.json. `lastmod` comes from the build. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ALL_ROUTES.map((route) => ({
    // Matches the rendered canonical, which Next normalises without a trailing
    // slash on the root.
    url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency:
      route.path === "/" || route.path === "/jobs" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
