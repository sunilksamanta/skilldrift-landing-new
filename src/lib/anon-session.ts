/**
 * The anonymous session identity.
 *
 * `anon_session_id` is the join key for the whole anonymous funnel — the
 * events fired here, the ones the API fires while scoring, and the sign-up
 * event fired in the app after the visitor crosses over. It is minted once,
 * before the first event, and never regenerated for the life of the cookie.
 *
 * It lives in a first-party cookie on `.skilldrift.ai` rather than in
 * localStorage, because localStorage is per-origin: a value written on
 * skilldrift.ai is invisible on app.skilldrift.ai, which is precisely the hop
 * the funnel has to survive.
 */

const COOKIE = "sd_anon_id";
const INTENT_COOKIE = "sd_anon_intent";
const UPLOAD_AT_COOKIE = "sd_anon_upload_at";
const SCORE_COOKIE = "sd_anon_score";

/** 400 days, the maximum Chrome will honour. */
const MAX_AGE = 400 * 24 * 60 * 60;

/**
 * `.skilldrift.ai` in production so the cookie spans the apex and the app.
 * On localhost a dotted domain is rejected outright, so the attribute is
 * omitted and the cookie stays host-only.
 */
function domainAttribute(): string {
  if (typeof window === "undefined") return "";
  const { hostname } = window.location;
  return hostname.endsWith("skilldrift.ai") ? "; domain=.skilldrift.ai" : "";
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${name}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}` +
    `; SameSite=Lax${secure}${domainAttribute()}`;
}

function uuid(): string {
  const webCrypto = typeof crypto !== "undefined" ? crypto : undefined;
  if (webCrypto?.randomUUID) return webCrypto.randomUUID();

  // Older Safari: still a v4 shape, still from the CSPRNG where available.
  const bytes = new Uint8Array(16);
  if (webCrypto?.getRandomValues) {
    webCrypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** The id for this visitor, minting one on first call. Never regenerates. */
export function anonSessionId(): string | null {
  if (typeof document === "undefined") return null;
  const existing = readCookie(COOKIE);
  if (existing) return existing;
  const minted = uuid();
  writeCookie(COOKIE, minted);
  return minted;
}

/** The intent card the visitor picked, if any. */
export function readIntent(): string | null {
  return readCookie(INTENT_COOKIE);
}

export function setIntent(intent: string): void {
  writeCookie(INTENT_COOKIE, intent);
}

/**
 * The two facts the app needs at sign-up but cannot recompute: when the
 * upload happened, and what the analysis scored. Cookies, not localStorage,
 * for the same reason as the id — the app is a different origin.
 */
export function markUploadStarted(): void {
  writeCookie(UPLOAD_AT_COOKIE, String(Date.now()));
}

export function setReadinessScore(score: number): void {
  writeCookie(SCORE_COOKIE, String(score));
}
