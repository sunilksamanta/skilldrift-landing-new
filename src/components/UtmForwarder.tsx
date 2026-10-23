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

/** Applies the inbound parameters to every app link under `root`. Idempotent:
 *  a link that already carries them is left untouched, so re-running it (and
 *  the mutation it would otherwise cause) settles after one pass. */
function applyTo(root: ParentNode, inbound: Record<string, string>, host: string) {
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
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
    const next = url.toString();
    if (anchor.href !== next) anchor.href = next;
  });
}

export default function UtmForwarder() {
  const pathname = usePathname();

  useEffect(() => {
    const inbound = readInbound();
    if (Object.keys(inbound).length === 0) return;

    const { host } = new URL(APP_ORIGIN);
    applyTo(document, inbound, host);

    // Links rendered after load lose the visitor's parameters otherwise: the
    // free check's "Create account" link only exists once a result is back,
    // and links that follow the hero goal pick are re-rendered by React. A
    // visitor who arrived with a referral code (`ref`) would sign up without
    // it, and the person who invited them would not be credited. So watch for
    // new or changed links and apply the same parameters to them.
    const observer = new MutationObserver(() => applyTo(document, inbound, host));
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
