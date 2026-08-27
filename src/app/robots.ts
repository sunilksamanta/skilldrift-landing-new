import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      // The blog keeps its own database-generated sitemap; the spec requires it
      // stay declared here.
      `${SITE_URL}/blog/sitemap.xml`,
    ],
    host: SITE_URL,
  };
}
