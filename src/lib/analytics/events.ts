/**
 * Mixpanel event catalog for the marketing site.
 *
 * Same conventions as the web app's `src/lib/analytics/events.ts`, so both
 * products land in one project without two naming schemes:
 *   - Action events: "Object Verbed" in Title Case, never snake_case.
 *   - The platform is never in the name; every event carries a `platform`
 *     super property instead (`web` from a browser, `server` from the API).
 *   - Property names stay snake_case.
 *
 * Every event here belongs to the anonymous funnel — someone who dropped a
 * resume on the marketing site without an account. They all carry
 * `anon_session_id`, which is the join key across this site, the app and the
 * API. Two of the six fire server-side and live in the API's catalog:
 * "Anonymous Analysis Completed" and "Anonymous Session Merged".
 */

export const AnalyticsEvents = {
  /** A file has landed in the drop zone; nothing has been sent yet. */
  ANONYMOUS_UPLOAD_STARTED: "Anonymous Upload Started",
  /** Parsing or scoring failed. Without it, started-minus-completed is a hole. */
  ANONYMOUS_ANALYSIS_FAILED: "Anonymous Analysis Failed",
  /** The result panel was actually on screen, not merely returned. */
  ANONYMOUS_RESULT_VIEWED: "Anonymous Result Viewed",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

/** Loosely-typed property bag; keep property names snake_case. */
export type AnalyticsEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;
