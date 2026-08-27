import type { Metadata } from "next";
import { ALL_ROUTES, getRoute } from "./content";

export const SITE_URL = "https://skilldrift.ai";
export const SITE_NAME = "SkillDrift";
/**
 * og:locale takes `language_TERRITORY`, not a bare language code, so plain
 * "en" is not valid and gets ignored. `en_US` is the Open Graph default and
 * the neutral choice for a product sold worldwide; `en_IN` was pinning every
 * route to one market. The page's own `lang` attribute stays "en".
 */
export const LOCALE = "en_US";

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
