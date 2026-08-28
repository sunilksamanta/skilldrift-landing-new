"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { trackCta } from "@/lib/analytics/cta";
import type { CtaSection } from "@/lib/analytics/cta";

/**
 * A link that reports itself.
 *
 * Most sections of this site are server components, which cannot carry an
 * `onClick`. Rather than turn each of them into a client component for the sake
 * of one button, they render this: the only client boundary is the link itself.
 *
 * The event is fired before navigation rather than awaited. Both Mixpanel and
 * gtag send over `sendBeacon`/`fetch(keepalive)`, which survives the document
 * unloading, so there is nothing to wait for and nothing to delay the click by.
 *
 * Routing behaviour is chosen from the href: absolute URLs, `mailto:` and
 * `tel:` become plain anchors, everything else a client-side route. Opening in
 * a new tab is opt-in via `newTab` rather than inferred from the protocol —
 * most absolute hrefs here point at app.skilldrift.ai, which is the same
 * journey continuing and belongs in the same tab.
 */
export default function TrackedLink({
  href,
  section,
  label,
  children,
  style,
  className,
  ariaLabel,
  extra,
  newTab,
  onClick,
}: {
  href: string;
  section: CtaSection;
  /** Which control this is, e.g. `sign_in`, or the target slug for a card. */
  label: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  ariaLabel?: string;
  /** Extra properties for this one CTA, on top of section and label. */
  extra?: Record<string, string | number | boolean | null | undefined>;
  /** Opens in a new tab. For links that genuinely leave SkillDrift. */
  newTab?: boolean;
  /** Runs after the event is fired, e.g. closing the mobile menu. */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackCta(section, label, extra);
    onClick?.(event);
  };

  const shared = {
    "aria-label": ariaLabel,
    className,
    style,
    onClick: handleClick,
  };

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        {...shared}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...shared}>
      {children}
    </Link>
  );
}
