import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/**
 * Content strings in `pages.json` may carry inline links as `[label](/href)`.
 * Nothing else is parsed — this is deliberately not a markdown renderer.
 */
export default function RichText({ text }: { text: string }) {
  // Built per call: a shared /g regex carries `lastIndex` between renders.
  const link = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = link.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    const [, label, href] = match;
    parts.push(
      <Link
        key={`${href}-${match.index}`}
        href={href}
        style={{ textDecoration: "underline", textUnderlineOffset: 3 }}
      >
        {label}
      </Link>,
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
