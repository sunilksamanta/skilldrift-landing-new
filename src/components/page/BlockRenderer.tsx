import type { Block } from "@/content/types";
import { ArrowRight, Check } from "../icons";
import PlanCards from "../PlanCards";
import FeatureRows from "./FeatureRows";
import RichText from "./RichText";
import { CardGrid, PriceTable, Section, StepList } from "./blocks";

/** Maps one `pages.json` block onto its component. */
export default function BlockRenderer({
  block,
  campaign,
}: {
  block: Block;
  campaign?: string;
}) {
  // featureRows brings its own sections, so it is handled before the shared
  // section shell is built.
  if (block.type === "featureRows") return <FeatureRows />;

  const shell = {
    id: block.id,
    alt: block.alt,
    eyebrow: block.eyebrow,
    heading: block.heading,
    copy: block.copy ? <RichText text={block.copy} /> : undefined,
  };

  switch (block.type) {
    case "plans":
      return (
        <Section {...shell}>
          <PlanCards campaign={campaign} />
        </Section>
      );

    case "cards":
      return (
        <Section {...shell}>
          <CardGrid cards={block.cards} min={block.min} />
        </Section>
      );

    case "steps":
      return (
        <Section {...shell}>
          <StepList steps={block.steps} />
        </Section>
      );

    case "prices":
      return (
        <Section {...shell}>
          <PriceTable
            rows={block.rows}
            note={block.note ? <RichText text={block.note} /> : undefined}
          />
        </Section>
      );

    case "split":
      return (
        <Section {...shell}>
          <div
            style={{
              marginTop: 44,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))",
              gap: 22,
              alignItems: "start",
            }}
          >
            {block.panels.map((panel) => (
              <div
                key={panel.title}
                className="sd-pad-34"
                style={{
                  padding: 34,
                  borderRadius: 22,
                  border: panel.accent
                    ? "1px solid var(--acline)"
                    : "1px solid var(--line)",
                  background: panel.accent
                    ? "linear-gradient(165deg, var(--acsoft), transparent 62%), var(--card)"
                    : "var(--card)",
                }}
              >
                <h3
                  style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}
                >
                  {panel.title}
                </h3>
                {panel.body && (
                  <p
                    style={{
                      marginTop: 12,
                      fontSize: 15,
                      lineHeight: 1.62,
                      color: "var(--tx2)",
                    }}
                  >
                    <RichText text={panel.body} />
                  </p>
                )}
                {panel.items && (
                  <ul
                    style={{
                      marginTop: 26,
                      display: "flex",
                      flexDirection: "column",
                      gap: 15,
                    }}
                  >
                    {panel.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          gap: 13,
                          fontSize: 15,
                          lineHeight: 1.55,
                        }}
                      >
                        <span
                          style={{
                            flex: "0 0 auto",
                            marginTop: 1,
                            color: panel.accent ? "var(--ac)" : "var(--tx2)",
                          }}
                        >
                          <Check />
                        </span>
                        <span>
                          <RichText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      );

    case "stats":
      return (
        <Section {...shell}>
          <div
            style={{
              marginTop: 44,
              display: "flex",
              flexWrap: "wrap",
              border: "1px solid var(--line)",
              borderRadius: 18,
              overflow: "hidden",
              background: "var(--bg2)",
            }}
          >
            {block.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="sd-stat"
                style={{
                  flex: "1 1 190px",
                  padding: 28,
                  borderLeft: i === 0 ? undefined : "1px solid var(--line)",
                  background: "var(--bg2)",
                }}
              >
                <div
                  style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </div>
                <div style={{ marginTop: 6, fontSize: 14, color: "var(--tx3)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Section>
      );

    case "prose":
      return (
        <Section {...shell}>
          <div
            style={{
              marginTop: 40,
              maxWidth: 780,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            {block.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                style={{ fontSize: 17, lineHeight: 1.68, color: "var(--tx2)" }}
              >
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </Section>
      );

    case "contact":
      return (
        <Section {...shell}>
          <div
            style={{
              marginTop: 44,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))",
              gap: 18,
            }}
          >
            {block.channels.map((channel) => (
              <a
                key={channel.href}
                href={channel.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "26px 28px",
                  borderRadius: 18,
                  border: "1px solid var(--line)",
                  background: "var(--card)",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--tx3)",
                  }}
                >
                  {channel.label}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    fontSize: 17,
                    fontWeight: 500,
                    color: "var(--ac)",
                  }}
                >
                  {channel.value}
                  <ArrowRight size={16} />
                </span>
                {channel.note && (
                  <span
                    style={{ fontSize: 14, lineHeight: 1.55, color: "var(--tx2)" }}
                  >
                    {channel.note}
                  </span>
                )}
              </a>
            ))}
          </div>
        </Section>
      );
  }
}
