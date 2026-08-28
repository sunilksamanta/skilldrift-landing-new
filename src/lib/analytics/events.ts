/**
 * Event catalog for the marketing site — one list, two destinations.
 *
 * Same conventions as the web app's `src/lib/analytics/events.ts`, so both
 * products land in one Mixpanel project without two naming schemes:
 *   - Action events: "Object Verbed" in Title Case, never snake_case.
 *   - The platform is never in the name; every event carries a `platform`
 *     super property instead (`web` from a browser, `server` from the API).
 *   - Property names stay snake_case.
 *
 * GA4 will not take those names — it wants snake_case, and its reports key off
 * the exact string — so every event also declares a GA4 name in `GA4_NAMES`
 * below. The map is a `Record<AnalyticsEventName, string>`, which means adding
 * an event here without naming it there is a type error rather than an event
 * that silently reaches only one of the two tools.
 *
 * Every event here belongs to the anonymous funnel — someone browsing, or
 * dropping a resume, without an account. They all carry `anon_session_id`,
 * which is the join key across this site, the app and the API. Two events fire
 * server-side and live in the API's catalog, not here: "Anonymous Analysis
 * Completed" and "Anonymous Session Merged". Those reach Mixpanel but not GA4,
 * which has no server SDK in play — see the note in index.ts.
 */

export const AnalyticsEvents = {
  /** A file has landed in the drop zone; nothing has been sent yet. */
  ANONYMOUS_UPLOAD_STARTED: "Anonymous Upload Started",
  /** Parsing or scoring failed. Without it, started-minus-completed is a hole. */
  ANONYMOUS_ANALYSIS_FAILED: "Anonymous Analysis Failed",
  /** The result panel was actually on screen, not merely returned. */
  ANONYMOUS_RESULT_VIEWED: "Anonymous Result Viewed",
  /**
   * Any call to action anywhere on the site. One event for all of them, with
   * `section` and `label` naming the button, rather than an event per button —
   * so a new CTA needs no new event and the funnel stays comparable.
   */
  CTA_CLICKED: "CTA Clicked",
  /** One of the three "Where are you right now?" cards was chosen. */
  INTENT_SELECTED: "Intent Selected",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

/**
 * The GA4 name for each event. GA4 caps names at 40 characters and treats
 * `google_`, `ga_` and `firebase_` as reserved prefixes; none of these come
 * close to either limit.
 */
export const GA4_NAMES: Record<AnalyticsEventName, string> = {
  [AnalyticsEvents.ANONYMOUS_UPLOAD_STARTED]: "anonymous_upload_started",
  [AnalyticsEvents.ANONYMOUS_ANALYSIS_FAILED]: "anonymous_analysis_failed",
  [AnalyticsEvents.ANONYMOUS_RESULT_VIEWED]: "anonymous_result_viewed",
  [AnalyticsEvents.CTA_CLICKED]: "cta_click",
  [AnalyticsEvents.INTENT_SELECTED]: "intent_selected",
};

/** Loosely-typed property bag; keep property names snake_case. */
export type AnalyticsEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;
