import type { ReactNode } from "react";
import { Check } from "../icons";
import { Pill } from "../SectionBits";
import RichText from "./RichText";

/**
 * The section kit every inner page is assembled from. Adding a page should mean
 * choosing blocks and writing copy, never writing layout again.
 */

export function Section({
  id,
  alt,
  eyebrow,
  heading,
  copy,
  children,
  headingId,
}: {
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  heading?: string;
  copy?: ReactNode;
  children?: ReactNode;
  headingId?: string;
}) {
  return (
    <section id={id} className={alt ? "sect sect--alt" : "sect"}>
      <div className="wrap">
        {eyebrow && <Pill>{eyebrow}</Pill>}
        {heading && (
          <div
            style={{
              marginTop: eyebrow ? 26 : 0,
              display: "grid",
              gridTemplateColumns: copy
                ? "repeat(auto-fit,minmax(min(320px,100%),1fr))"
                : "minmax(0,1fr)",
              gap: 48,
              alignItems: "end",
            }}
          >
            <h2
              id={headingId}
              style={{
                fontSize: "clamp(28px,3.1vw,44px)",
                lineHeight: 1.13,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                maxWidth: copy ? undefined : 900,
              }}
            >
              <RichText text={heading} />
            </h2>
            {copy && (
              <p style={{ fontSize: 16, lineHeight: 1.62, color: "var(--tx2)" }}>
                {copy}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/** Numbered walkthrough — "how this one tool actually runs". */
export function StepList({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <ol
      style={{
        marginTop: 48,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))",
        gap: 28,
      }}
    >
      {steps.map((step, i) => (
        <li
          key={step.title}
          style={{
            padding: "28px 26px",
            borderRadius: 18,
            border: "1px solid var(--line)",
            background: "var(--card)",
          }}
        >
          <span
            style={{
              display: "grid",
              placeItems: "center",
              width: 38,
              height: 38,
              borderRadius: 999,
              border: "1px solid var(--acline)",
              background: "var(--acsoft)",
              color: "var(--ac)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            style={{
              marginTop: 18,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              marginTop: 10,
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--tx2)",
            }}
          >
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Feature/benefit cards, optionally with an accent card leading. */
export function CardGrid({
  cards,
  min = 300,
}: {
  cards: { title: string; body: string; accent?: boolean; tag?: string }[];
  min?: number;
}) {
  return (
    <div
      style={{
        marginTop: 44,
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit,minmax(min(${min}px,100%),1fr))`,
        gap: 20,
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            padding: 28,
            borderRadius: 18,
            border: card.accent ? "1px solid var(--acline)" : "1px solid var(--line)",
            background: card.accent
              ? "linear-gradient(160deg, var(--acsoft), transparent 72%), var(--card)"
              : "var(--card)",
          }}
        >
          {card.tag && (
            <span
              style={{
                display: "inline-block",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: card.accent ? "var(--ac)" : "var(--tx3)",
              }}
            >
              {card.tag}
            </span>
          )}
          <h3
            style={{
              marginTop: card.tag ? 14 : 0,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {card.title}
          </h3>
          <p
            style={{
              marginTop: 10,
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--tx2)",
            }}
          >
            <RichText text={card.body} />
          </p>
        </div>
      ))}
    </div>
  );
}

/** Tick list, used for "what you get" and "what it costs" panels. */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        marginTop: 26,
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{ display: "flex", gap: 13, fontSize: 15, lineHeight: 1.55 }}
        >
          <span style={{ flex: "0 0 auto", color: "var(--ac)", marginTop: 1 }}>
            <Check />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Credit-cost rows, so every feature page states its own price honestly. */
export function PriceTable({
  rows,
  note,
}: {
  rows: { label: string; note?: string; cost: string }[];
  note?: ReactNode;
}) {
  return (
    <div
      className="sd-pad-34"
      style={{
        marginTop: 44,
        padding: 34,
        borderRadius: 22,
        border: "1px solid var(--line)",
        background: "var(--card)",
      }}
    >
      <ul style={{ display: "flex", flexDirection: "column" }}>
        {rows.map((row, i) => (
          <li
            key={row.label}
            style={{
              display: "flex",
              alignItems: row.note ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "15px 0",
              borderBottom: i === rows.length - 1 ? undefined : "1px solid var(--line)",
              fontSize: 15,
            }}
          >
            <span>
              {row.label}
              {row.note && (
                <span
                  style={{
                    display: "block",
                    marginTop: 4,
                    fontSize: 13,
                    color: "var(--ac)",
                  }}
                >
                  {row.note}
                </span>
              )}
            </span>
            <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{row.cost}</span>
          </li>
        ))}
      </ul>
      {note && (
        <p
          style={{
            marginTop: 20,
            fontSize: 14,
            lineHeight: 1.65,
            color: "var(--tx2)",
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * The company facts strip: one label/value row each, no prose. Terse on
 * purpose — this is what a reader (or an answer engine) comes here to check.
 */
export function FactList({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl
      className="sd-pad-34"
      style={{
        marginTop: 44,
        padding: "10px 34px",
        borderRadius: 22,
        border: "1px solid var(--line)",
        background: "var(--card)",
      }}
    >
      {facts.map((fact, i) => (
        <div
          key={fact.label}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 28px",
            padding: "20px 0",
            borderBottom: i === facts.length - 1 ? undefined : "1px solid var(--line)",
          }}
        >
          <dt
            style={{
              flex: "0 0 200px",
              fontSize: 12.5,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--tx3)",
              lineHeight: 1.9,
            }}
          >
            {fact.label}
          </dt>
          <dd
            style={{
              flex: "1 1 320px",
              margin: 0,
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            <RichText text={fact.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
