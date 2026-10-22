import type { MetadataRoute } from "next";
import { BLOG_URL } from "@/lib/cta";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /**
         * `Llms` is not part of the Robots Exclusion Standard, so it goes
         * through `other`, which Next writes into the file verbatim. It points
         * AI crawlers at the plain-text summary of what the site offers, the
         * same way `Sitemap` points search crawlers at the URL list.
         */
        // llms-full.txt is the full text of every page (npm run llms:full).
        other: { Llms: `${SITE_URL}/llms.txt`, "Llms-full": `${SITE_URL}/llms-full.txt` },
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      // The blog keeps its own database-generated sitemap; the spec requires it
      // stay declared here. It lives on its own host — the old
      // `${SITE_URL}/blog/sitemap.xml` was a path on this site, which has no
      // /blog route and so never resolved.
      `${BLOG_URL}/sitemap.xml`,
    ],
    // The Host directive takes a hostname, not a URL.
    host: new URL(SITE_URL).host,
  };
}
