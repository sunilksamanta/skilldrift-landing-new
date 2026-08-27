"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { APP_ORIGIN } from "@/lib/cta";

/**
 * Carries acquisition parameters across to the app.
 *
 * Links are server-rendered with this site's own defaults (`utm_source=
 * skilldrift.ai`, `utm_medium=cta`, plus the page and button), so they are
 * already valid without JavaScript. When a visitor arrives carrying their own
 * parameters — a Google ad, an email campaign — those take precedence per key,
 * and this site's defaults fill only the gaps. A visitor from `utm_source=
 * google` therefore reaches sign-in still attributed to Google, while our
 * `utm_content` still records which button they pressed.
 *
 * Captured parameters are held for the session, so they survive navigation
 * between pages where the query string is not repeated.
 */

const FORWARDED = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
  "msclkid",
  "ref",
] as const;

const STORE_KEY = "sd-inbound-utm";

function readInbound(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of FORWARDED) {
    const value = params.get(key);
    if (value) found[key] = value;
  }

  if (Object.keys(found).length > 0) {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(found));
    } catch {
      /* private mode — forwarding still works for this page view */
    }
    return found;
  }

  try {
    const stored = sessionStorage.getItem(STORE_KEY);
    return stored ? (JSON.parse(stored) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export default function UtmForwarder() {
  const pathname = usePathname();

  useEffect(() => {
    const inbound = readInbound();
    if (Object.keys(inbound).length === 0) return;

    const { host } = new URL(APP_ORIGIN);
    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.host !== host) return;

      // Inbound wins per key; anything it does not carry keeps our default.
      for (const [key, value] of Object.entries(inbound)) {
        url.searchParams.set(key, value);
      }
      anchor.href = url.toString();
    });
  }, [pathname]);

  return null;
}
