/**
 * The only place this site talks to Mixpanel and GA4. Deliberately the same
 * shape as
 * the web app's analytics module, so the two behave identically:
 *
 *  - Non-blocking: every call is wrapped, nothing throws into UI code, and
 *    nothing is ever awaited. A Mixpanel outage costs events, never a page.
 *  - No lost events: calls made before `initAnalytics()` are queued and
 *    flushed once the SDK is ready.
 *  - Catalog-enforced names: `track()` only accepts names from events.ts.
 *
 * Every `track()` call fans out to both tools from one place, so the two can
 * never end up measuring different things: Mixpanel gets the Title Case name,
 * GA4 the snake_case one from `GA4_NAMES`, and both get the identical property
 * bag. GA4 needs no code beyond this — gtag is already on the page and the
 * events are plain client-side clicks. The only measurement this cannot reach
 * is the pair of events the API fires server-side ("Anonymous Analysis
 * Completed", "Anonymous Session Merged"); those land in Mixpanel only, and
 * getting them into GA4 would take the Measurement Protocol on the API side.
 *
 * The one difference from the app: `cookie_domain: '.skilldrift.ai'`. The
 * marketing site is the apex and the app is a subdomain, so without it
 * Mixpanel would mint a second device id on the hop and the anonymous funnel
 * would break exactly where it matters — at sign-up.
 */

import mixpanel from "mixpanel-browser";
import { GA4_NAMES } from "./events";
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
 *
 * A missing Mixpanel token silences Mixpanel only. GA4 is configured from the
 * layout with a hardcoded measurement id, so it keeps recording either way —
 * an unset token in one environment should not take both tools down.
 */
export function track(
  event: AnalyticsEventName,
  properties?: AnalyticsEventProperties,
): void {
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

  if (TOKEN) whenReady(() => mixpanel.track(event, payload));
  sendToGa4(event, payload);
}

type Gtag = (
  command: "event",
  name: string,
  params: Record<string, string | number | boolean>,
) => void;

/**
 * The same event, to the GA4 property the gtag snippet in the root layout
 * already configured.
 *
 * No queue on this side: gtag pushes onto `window.dataLayer`, which the inline
 * snippet creates before the tag itself loads, so a call made early is held by
 * gtag rather than lost. Nulls are dropped instead of sent — GA4 stores a
 * missing parameter as absent, which is what an unknown UTM actually means,
 * whereas the string "null" would show up as a real value in reports.
 *
 * Reminder for whoever adds a property: GA4 will accept it here but will not
 * show it in a report until it is registered as a custom dimension in the
 * property's admin. Mixpanel needs no such step, so a new property appears in
 * one tool and not the other until someone does it.
 */
function sendToGa4(
  event: AnalyticsEventName,
  properties: AnalyticsEventProperties,
): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;

  const params: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value !== null && value !== undefined) params[key] = value;
  }

  safely(() => gtag("event", GA4_NAMES[event], params));
}
