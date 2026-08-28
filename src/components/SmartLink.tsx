"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import SectionLink from "./SectionLink";
import { isSignIn, signUpHref } from "@/lib/cta";
import { trackCta } from "@/lib/analytics/cta";
import type { CtaSection } from "@/lib/analytics/cta";

/**
 * Resolves an href from `pages.json` to the right kind of link:
 *
 * - `/#section` → a homepage section, scrolled to smoothly, no fragment in the URL
 * - `#section`  → a section of the current page, same treatment
 * - `http(s)`, `mailto:` → a plain anchor
 * - anything else → a client-side route
 */
export default function SmartLink({
  href,
  children,
  style,
  ariaLabel,
  campaign,
  content,
  section,
  label,
}: {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
  ariaLabel?: string;
  /** Page the click happened on, for the UTM when `href` is the sign-in sentinel. */
  campaign?: string;
  /** Which button this is, for the UTM. */
  content?: string;
  /**
   * Set both to report the click as a CTA. Omitted on links that are
   * navigation rather than a call to action, which stay silent.
   */
  section?: CtaSection;
  label?: string;
}) {
  const report = () => {
    if (section && label) trackCta(section, label);
  };

  if (isSignIn(href)) {
    return (
      <a
        href={signUpHref(campaign ?? "site", content ?? "cta")}
        aria-label={ariaLabel}
        style={style}
        onClick={report}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("/#")) {
    return (
      <SectionLink
        to={href.slice(2)}
        style={style}
        ariaLabel={ariaLabel}
        onNavigate={report}
      >
        {children}
      </SectionLink>
    );
  }

  if (href.startsWith("#")) {
    const id = href.slice(1);
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        style={style}
        onClick={(event) => {
          report();
          if (event.metaKey || event.ctrlKey || event.shiftKey) return;
          const target = document.getElementById(id);
          if (!target) return;
          event.preventDefault();
          const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          target.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
          });
        }}
      >
        {children}
      </a>
    );
  }

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        style={style}
        onClick={report}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} style={style} onClick={report}>
      {children}
    </Link>
  );
}
