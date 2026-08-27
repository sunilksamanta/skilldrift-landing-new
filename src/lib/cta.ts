/**
 * Every call to action on the marketing site points at the app's sign-up, with
 * UTMs describing where the click came from. Two exceptions: the header's
 * "Sign in" button, which is for people who already have an account, and the
 * homepage hero drop-zone, which resolves in place without an account at all.
 */

export const APP_ORIGIN = "https://app.skilldrift.ai";
export const APP_SIGN_UP = `${APP_ORIGIN}/sign-up`;
export const APP_SIGN_IN = `${APP_ORIGIN}/sign-in`;
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

/** What the guest analysis already knows about the visitor, so the sign-up
 *  form can be filled in for them rather than asked again. */
export type Prefill = {
  name?: string | null;
  email?: string | null;
  guestToken?: string | null;
};

function withUtm(base: string, campaign: string, content: string) {
  const url = new URL(base);
  url.searchParams.set("utm_source", UTM_SOURCE);
  url.searchParams.set("utm_medium", UTM_MEDIUM);
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return url;
}

/**
 * `campaign` is the page the click happened on, `content` the specific button,
 * so the two together identify any CTA on the site uniquely.
 */
export function signUpHref(
  campaign: string,
  content: string,
  prefill?: Prefill,
): string {
  const url = withUtm(APP_SIGN_UP, campaign, content);
  if (prefill?.name) url.searchParams.set("name", prefill.name);
  if (prefill?.email) url.searchParams.set("email", prefill.email);
  if (prefill?.guestToken) url.searchParams.set("guestToken", prefill.guestToken);
  return url.toString();
}

/** Only for people who already have an account — the header button. */
export function signInHref(campaign: string, content: string): string {
  return withUtm(APP_SIGN_IN, campaign, content).toString();
}

/** Convenience for the hand-built homepage, where the campaign is always `home`. */
export function homeCta(content: string, prefill?: Prefill): string {
  return signUpHref("home", content, prefill);
}

export function isSignIn(href: string): boolean {
  return href === SIGN_IN;
}
