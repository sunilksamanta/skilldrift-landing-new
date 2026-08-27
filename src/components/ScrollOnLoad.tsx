"use client";

import { useEffect } from "react";
import { SCROLL_TARGET_KEY } from "./SectionLink";

/** Give the incoming page up to this long to render the target section. */
const MAX_WAIT_MS = 2000;
const RETRY_MS = 50;

/**
 * Survives React's double-invoked effects in development: the first pass takes
 * the target out of sessionStorage, so it is held here until a scroll actually
 * lands rather than being lost when that pass is torn down. Reset to
 * `undefined` once handled so a later visit reads storage again.
 */
let pending: string | null | undefined;

/**
 * Completes a cross-page section link: mounted on the homepage, it reads the
 * target a `SectionLink` stashed before navigating and scrolls to it.
 *
 * The section may not exist on the first tick after a route transition, so this
 * retries on a timer — not `requestAnimationFrame`, which is paused while the
 * tab is in the background and would strand the scroll.
 */
export default function ScrollOnLoad() {
  useEffect(() => {
    if (pending === undefined) {
      try {
        pending = sessionStorage.getItem(SCROLL_TARGET_KEY);
        sessionStorage.removeItem(SCROLL_TARGET_KEY);
      } catch {
        pending = undefined;
        return;
      }
    }

    const target = pending;
    if (!target) {
      pending = undefined;
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

    if (target === "top") {
      pending = undefined;
      window.scrollTo({ top: 0, behavior });
      return;
    }

    const started = Date.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const attempt = () => {
      const el = document.getElementById(target);
      if (el) {
        pending = undefined;
        el.scrollIntoView({ behavior, block: "start" });
        return;
      }
      if (Date.now() - started < MAX_WAIT_MS) {
        timer = setTimeout(attempt, RETRY_MS);
      } else {
        pending = undefined;
      }
    };

    attempt();
    return () => clearTimeout(timer);
  }, []);

  return null;
}
