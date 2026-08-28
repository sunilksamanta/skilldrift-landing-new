import pages from "@/content/pages.json";
import type { PagesFile, RouteContent } from "@/content/types";
import { campaignFor } from "@/lib/cta";

const file = pages as PagesFile;

export const ALL_ROUTES: RouteContent[] = file.routes;

const bySlug = new Map(
  ALL_ROUTES.filter((route) => !route.custom).map((route) => [
    route.path.replace(/^\//, ""),
    route,
  ]),
);

/** Every content-driven route, i.e. everything except the hand-built homepage. */
export const CONTENT_ROUTES = [...bySlug.values()];

/** The seven pages that sit under Features, in nav order. */
export const FEATURE_ROUTES = CONTENT_ROUTES.filter((route) => route.feature);

/**
 * The analytics `label` for a link pointing at this page.
 *
 * Prefers the route's declared `ctaLabel` and falls back to the slug. The
 * fallback is right for six of the seven feature pages; `/job-match` declares
 * `job_fit` because the card has been called "Job fit analysis" since before
 * the URL was settled, and the reports are keyed on the card name.
 */
export function ctaLabelFor(route: RouteContent): string {
  return route.ctaLabel ?? campaignFor(route.path);
}

export function getRouteBySlug(slug: string): RouteContent | undefined {
  return bySlug.get(slug);
}

export function getRoute(path: string): RouteContent {
  const route = ALL_ROUTES.find((entry) => entry.path === path);
  if (!route) throw new Error(`No content entry for route "${path}"`);
  return route;
}
