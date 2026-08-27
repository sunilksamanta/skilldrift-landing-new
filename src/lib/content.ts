import pages from "@/content/pages.json";
import type { PagesFile, RouteContent } from "@/content/types";

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

export function getRouteBySlug(slug: string): RouteContent | undefined {
  return bySlug.get(slug);
}

export function getRoute(path: string): RouteContent {
  const route = ALL_ROUTES.find((entry) => entry.path === path);
  if (!route) throw new Error(`No content entry for route "${path}"`);
  return route;
}
