/**
 * Every call to action on the marketing site points at the app's sign-in, with
 * UTMs describing where the click came from. The one exception is the
 * homepage hero drop-zone, which resolves in place without an account.
 */

export const APP_SIGN_IN = "https://app.skilldrift.ai/sign-in";
export const BLOG_URL = "https://blog.skilldrift.ai";

/** Sentinel used in `pages.json` in place of a literal URL. */
export const SIGN_IN = "app:sign-in";

const UTM_SOURCE = "skilldrift.ai";
const UTM_MEDIUM = "cta";

/** `/interview-prep` → `interview_prep`; `/` → `home`. */
export function campaignFor(path: string): string {
  const slug = path.replace(/^\//, "").replace(/\/$/, "");
  return slug === "" ? "home" : slug.replace(/-/g, "_");
}

/**
 * `campaign` is the page the click happened on, `content` the specific button,
 * so the two together identify any CTA on the site uniquely.
 */
export function signInHref(campaign: string, content: string): string {
  const url = new URL(APP_SIGN_IN);
  url.searchParams.set("utm_source", UTM_SOURCE);
  url.searchParams.set("utm_medium", UTM_MEDIUM);
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

/** Convenience for the hand-built homepage, where the campaign is always `home`. */
export function homeCta(content: string): string {
  return signInHref("home", content);
}

export function isSignIn(href: string): boolean {
  return href === SIGN_IN;
}
