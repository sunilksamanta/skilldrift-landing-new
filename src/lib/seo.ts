import type { Metadata } from "next";
import { ALL_ROUTES, getRoute } from "./content";

export const SITE_URL = "https://skilldrift.ai";
export const SITE_NAME = "SkillDrift";
export const LOCALE = "en_IN";

/**
 * Route metadata lives in `src/content/pages.json` — the same file the page
 * bodies come from — so a route can never have content without meta, or meta
 * without content. Strings there are Appendix A2 literals.
 */
export { ALL_ROUTES, getRoute };

/*
 * OG images come from the `opengraph-image.tsx` file convention, which renders
 * one card per route at build time and injects og:image, its dimensions and
 * twitter:image automatically. That is why neither block below sets `images` —
 * doing so would override the generated URLs with paths that do not exist.
 */

export function buildMetadata(path: string): Metadata {
  const route = getRoute(path);
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title: route.title,
    description: route.description,
    authors: [{ name: SITE_NAME }],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: LOCALE,
      title: route.title,
      description: route.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
    },
  };
}
