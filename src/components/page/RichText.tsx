import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Price, Regional } from "../Regional";
import type { PriceToken } from "@/lib/region";

/**
 * Content strings in `pages.json` may carry three things, and nothing else —
 * this is deliberately not a markdown renderer:
 *
 * - inline links, as `[label](/href)`
 * - a price, as `{topup}` / `{unlimited}` / `{free}`, in the visitor's currency
 * - a regional variant, as `{{shown in India|shown everywhere else}}`
 *
 * Variants may contain prices and links; prices and links may not contain
 * variants.
 */
export default function RichText({ text }: { text: string }) {
  return <>{renderVariants(text)}</>;
}

const VARIANT = /\{\{([\s\S]*?)\|([\s\S]*?)\}\}/g;
const PRICE = /\{(free|topup|unlimited)\}/g;
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderVariants(text: string): ReactNode[] {
  return split(text, VARIANT, (match, key) => (
    <Regional
      key={key}
      in={renderPrices(match[1])}
      row={renderPrices(match[2])}
    />
  )).map((part, i) =>
    typeof part === "string" ? (
      <Fragment key={i}>{renderPrices(part)}</Fragment>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function renderPrices(text: string): ReactNode[] {
  return split(text, PRICE, (match, key) => (
    <Price key={key} kind={match[1] as PriceToken} />
  )).map((part, i) =>
    typeof part === "string" ? (
      <Fragment key={i}>{renderLinks(part)}</Fragment>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const UNDERLINE = { textDecoration: "underline", textUnderlineOffset: 3 } as const;

function renderLinks(text: string): ReactNode[] {
  return split(text, LINK, (match, key) => {
    const [, label, href] = match;
    // Anything off-site — a store listing, a mailto — is a plain anchor.
    if (!href.startsWith("/")) {
      const external = /^https?:/.test(href);
      return (
        <a
          key={key}
          href={href}
          style={UNDERLINE}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      );
    }
    return (
      <Link key={key} href={href} style={UNDERLINE}>
        {label}
      </Link>
    );
  });
}

/** Splits on a global regex, mapping each match through `render`. */
function split(
  text: string,
  pattern: RegExp,
  render: (match: RegExpExecArray, key: string) => ReactNode,
): ReactNode[] {
  const re = new RegExp(pattern.source, pattern.flags);
  const parts: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    parts.push(render(match, `${match.index}`));
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));

  return parts;
}
