/**
 * reCAPTCHA v3 — invisible scoring, no challenge to solve.
 *
 * The script is loaded lazily, on the first token request, for two reasons:
 * the homepage should not pay for a third-party script nobody on it will use,
 * and Google's badge only appears once the script is on the page.
 *
 * The site key is public by design — it is visible in the page source of every
 * site that uses reCAPTCHA — which is why it carries the `NEXT_PUBLIC_` prefix.
 * The *secret* key is the server's, and must never appear in this repo.
 */

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SRC = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;

let loading: Promise<void> | null = null;

/** Injects the script once; every later call reuses the same promise. */
function loadScript(): Promise<void> {
  if (typeof document === "undefined") return Promise.reject(new Error("no document"));
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("recaptcha failed")));
      if (window.grecaptcha) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      // Let a later attempt retry rather than caching the failure forever.
      loading = null;
      reject(new Error("recaptcha failed to load"));
    };
    document.head.appendChild(script);
  });

  return loading;
}

/**
 * A token for one action, or `null` if reCAPTCHA is unavailable — no key
 * configured, script blocked, offline.
 *
 * Deliberately fails open: whether a missing token is fatal is the server's
 * call, and it answers with a real error the visitor can act on. Blocking the
 * upload here would turn an ad-blocker into a broken product.
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (!RECAPTCHA_SITE_KEY) return null;

  try {
    await loadScript();
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) return null;

    return await new Promise<string | null>((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action })
          .then((token) => resolve(token || null))
          .catch(() => resolve(null));
      });
    });
  } catch {
    return null;
  }
}
