"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";

export const SCROLL_TARGET_KEY = "sd-scroll-target";

/**
 * Links to a section of the homepage without ever putting a `#fragment` in the
 * address bar.
 *
 * On the homepage it scrolls in place. From an inner page it stores the target,
 * navigates to `/`, and `ScrollOnLoad` finishes the job once the page mounts.
 * The rendered `href` is a real, crawlable link so the markup still degrades to
 * a plain navigation without JavaScript.
 */
export default function SectionLink({
  to,
  children,
  style,
  className,
  ariaLabel,
}: {
  /** `id` of the target section on the homepage. */
  to: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  ariaLabel?: string;
}) {
  const router = useRouter();

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    return true;
  };

  return (
    // A plain anchor rather than next/link: this element never performs a
    // default navigation — it either scrolls in place or calls router.push
    // itself — so Link's own click handling would only be in the way.
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/"
      aria-label={ariaLabel}
      className={className}
      style={style}
      onClick={(event) => {
        // Let modified clicks open a new tab the way the user expects.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
          return;
        }
        event.preventDefault();

        if (window.location.pathname === "/") {
          if (to === "top") {
            const reduce = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            return;
          }
          if (scrollTo(to)) return;
        }

        try {
          sessionStorage.setItem(SCROLL_TARGET_KEY, to);
        } catch {
          /* private mode — the navigation still lands on the homepage */
        }
        router.push("/");
      }}
    >
      {children}
    </a>
  );
}
