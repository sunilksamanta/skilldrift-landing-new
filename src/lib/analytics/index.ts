/**
 * The only place this site talks to Mixpanel. Deliberately the same shape as
 * the web app's analytics module, so the two behave identically:
 *
 *  - Non-blocking: every call is wrapped, nothing throws into UI code, and
 *    nothing is ever awaited. A Mixpanel outage costs events, never a page.
 *  - No lost events: calls made before `initAnalytics()` are queued and
 *    flushed once the SDK is ready.
 *  - Catalog-enforced names: `track()` only accepts names from events.ts.
 *
 * The one difference from the app: `cookie_domain: '.skilldrift.ai'`. The
 * marketing site is the apex and the app is a subdomain, so without it
 * Mixpanel would mint a second device id on the hop and the anonymous funnel
 * would break exactly where it matters — at sign-up.
 */

import mixpanel from "mixpanel-browser";
import type { AnalyticsEventName, AnalyticsEventProperties } from "./events";
import { anonSessionId, readIntent } from "../anon-session";

export { AnalyticsEvents } from "./events";
export type { AnalyticsEventName, AnalyticsEventProperties } from "./events";

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "";

/** Shared with the app so one cookie spans apex and subdomain. */
export const COOKIE_DOMAIN = ".skilldrift.ai";

/** The app turned auto pageviews off in Aug 2026; the catalog is the truth. */
const AUTO_TRACK_PAGEVIEWS = false;

let initialized = false;
const MAX_QUEUE = 100;
const preInitQueue: Array<() => void> = [];

function safely(fn: () => void): void {
  try {
    fn();
  } catch (error) {
    // Analytics must never break the product.
    console.error("[analytics]", error);
  }
}

function whenReady(fn: () => void): void {
  if (initialized) safely(fn);
  else if (preInitQueue.length < MAX_QUEUE) preInitQueue.push(fn);
}

/** Idempotent. Called once from the root layout. */
export function initAnalytics(): void {
  if (initialized || !TOKEN || typeof window === "undefined") return;
  safely(() => {
    // The shared cookie domain is only legal on the real host. A browser
    // rejects a `.skilldrift.ai` cookie outright from localhost or a preview
    // domain, and Mixpanel then has nowhere to persist its device id — so on
    // anything else we let it fall back to a host-only cookie.
    const onBrandDomain = window.location.hostname.endsWith("skilldrift.ai");

    mixpanel.init(TOKEN, {
      debug: process.env.NODE_ENV === "development",
      track_pageview: AUTO_TRACK_PAGEVIEWS,
      persistence: "cookie",
      ...(onBrandDomain
        ? { cookie_domain: COOKIE_DOMAIN, cross_subdomain_cookie: true }
        : {}),
    });
    mixpanel.register({ platform: "web", surface: "marketing" });
    initialized = true;
    preInitQueue.splice(0).forEach(safely);
  });
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const UTM_STORE_KEY = "sd-inbound-utm";

/**
 * The acquisition parameters the visitor arrived with, whether they are still
 * in the URL or were captured on an earlier page this session — the same
 * store `UtmForwarder` writes.
 */
function acquisition(): AnalyticsEventProperties {
  const out: AnalyticsEventProperties = {};
  if (typeof window === "undefined") return out;

  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(UTM_STORE_KEY) ?? "{}");
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    out[key] = params.get(key) ?? stored[key] ?? null;
  }
  return out;
}

/**
 * Fire an event. Fire-and-forget — never await this.
 *
 * `anon_session_id` and `page_path` are attached here rather than at every
 * call site: they are the join key and the context, and an event that forgets
 * either is not much use.
 */
export function track(
  event: AnalyticsEventName,
  properties?: AnalyticsEventProperties,
): void {
  if (!TOKEN) return;
  const base: AnalyticsEventProperties = {
    anon_session_id: anonSessionId(),
    page_path: typeof window === "undefined" ? null : window.location.pathname,
    intent: readIntent(),
    ...acquisition(),
  };
  const payload = { ...base, ...properties };

  // Development only: a readable log of what was fired, so duplicate-event
  // bugs can be counted in the console instead of guessed at from Mixpanel.
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    const w = window as unknown as { __sdAnalytics?: unknown[] };
    (w.__sdAnalytics ??= []).push({ event, ...payload });
  }

  whenReady(() => mixpanel.track(event, payload));
}
