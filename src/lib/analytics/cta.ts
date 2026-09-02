/**
 * The two click events that describe navigation on this site.
 *
 * `trackCta` is deliberately one event rather than one per button. A CTA is
 * identified by `section` (where on the page) plus `label` (which control), so
 * adding a button never means adding an event, and every CTA on the site stays
 * comparable in the same funnel.
 */

import { track } from "./index";
import { AnalyticsEvents } from "./events";
import type { AnalyticsEventProperties } from "./events";
import { readIntent, setIntent } from "../anon-session";

/**
 * Where on the page the CTA sits. A closed set, so a typo is a build failure
 * rather than an orphan value nobody notices in a report six weeks later.
 */
export type CtaSection =
  | "header"
  | "mobile_menu"
  | "hero"
  | "upload_widget"
  | "intent_cards"
  | "resume_rewrite"
  | "live_resume"
  | "feature_grid"
  | "proof"
  | "jobs"
  | "credits"
  | "anon_result"
  | "pricing_free"
  | "pricing_topup"
  | "pricing_unlimited"
  | "related_features"
  | "ats_checker"
  | "final_cta"
  | "footer";

/**
 * `anon_session_id`, `page_path` and the UTMs are added by `track()`, so a
 * call site only has to say which button was pressed.
 *
 * `intent_door` is the door the visitor had chosen when they clicked, read
 * from the `sd_anon_intent` cookie, and is null until they choose one. It
 * carries the same value as the `intent` property `track()` puts on every
 * event; both names are sent because the CTA reports are written against
 * `intent_door` while the rest of the anonymous funnel — including the two
 * events the API fires server-side — has always keyed on `intent`. Renaming
 * either one would break a report that already exists.
 */
export function trackCta(
  section: CtaSection,
  label: string,
  extra?: AnalyticsEventProperties,
): void {
  track(AnalyticsEvents.CTA_CLICKED, {
    section,
    label,
    intent_door: readIntent(),
    ...extra,
  });
}

/** One per browsing session, so re-clicks can be told apart from the first pick. */
const FIRST_SELECTION_KEY = "sd-intent-picked";

function isFirstSelection(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (sessionStorage.getItem(FIRST_SELECTION_KEY)) return false;
    sessionStorage.setItem(FIRST_SELECTION_KEY, "1");
    return true;
  } catch {
    // Private mode, or storage disabled. Reporting a re-click as a first pick
    // would inflate the number that matters, so assume it is not the first.
    return false;
  }
}

/**
 * One of the three "Where are you right now?" cards was chosen.
 *
 * Fires on click only — never on page load, and never for the card that starts
 * selected, so the count is of decisions rather than of page views.
 *
 * The intent is written to the `sd_anon_intent` cookie in the same call, not
 * by the caller: that cookie is what puts `intent` on every later event,
 * including the upload, and splitting the two invites a click that reports an
 * intent the funnel never sees again.
 */
export function trackIntentSelected(intent: string): void {
  setIntent(intent);
  track(AnalyticsEvents.INTENT_SELECTED, {
    intent,
    source: "homepage_cards",
    is_first_selection: isFirstSelection(),
  });
}
