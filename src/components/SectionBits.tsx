import type { ReactNode } from "react";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "9px 20px",
        borderRadius: 999,
        border: "1px solid var(--acline)",
        fontSize: 14,
      }}
    >
      {children}
    </span>
  );
}

/**
 * The heading + supporting paragraph pair every section below the hero uses.
 * `align` mirrors the design's two variants: copy sitting on the baseline of
 * the heading, or both blocks starting at the top.
 */
export function SectionIntro({
  heading,
  copy,
  align = "end",
  copyPadTop,
}: {
  heading: ReactNode;
  copy: ReactNode;
  align?: "end" | "start";
  copyPadTop?: number;
}) {
  return (
    <div
      style={{
        marginTop: 26,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
        gap: 48,
        alignItems: align,
      }}
    >
      <h2
        style={{
          fontSize: "clamp(30px,3.3vw,46px)",
          lineHeight: 1.13,
          fontWeight: 600,
          letterSpacing: "-0.025em",
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          paddingTop: copyPadTop,
          fontSize: 16,
          lineHeight: 1.62,
          color: "var(--tx2)",
        }}
      >
        {copy}
      </p>
    </div>
  );
}

export const primaryButton: React.CSSProperties = {
  height: 54,
  padding: "0 30px",
  borderRadius: 14,
  background: "var(--btn)",
  color: "var(--btntx)",
  fontSize: 16,
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "center",
};
