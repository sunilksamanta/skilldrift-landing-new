import type { LegalDocument, LegalNode } from "@/content/types";
import RichText from "./RichText";
import dataProtection from "@/content/legal/data-protection.json";
import privacy from "@/content/legal/privacy.json";
import terms from "@/content/legal/terms.json";

/**
 * The three legal documents, copied verbatim from the previous SkillDrift
 * landing project and re-set in this site's design. Only the guest resume
 * upload section is new.
 */
const DOCS: Record<string, LegalDocument> = {
  privacy: privacy as LegalDocument,
  terms: terms as LegalDocument,
  "data-protection": dataProtection as LegalDocument,
};

const PANEL: Record<string, { border: string; background: string }> = {
  panel: { border: "var(--line)", background: "var(--card2)" },
  warn: { border: "var(--amber)", background: "var(--card2)" },
  alert: { border: "var(--ac)", background: "var(--acsoft)" },
};

function Nodes({ nodes }: { nodes: LegalNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        if ("h3" in node) {
          return (
            <h3
              key={i}
              style={{
                marginTop: i === 0 ? 0 : 26,
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              <RichText text={node.h3} />
            </h3>
          );
        }

        if ("list" in node) {
          return (
            <ul
              key={i}
              style={{
                marginTop: 14,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {node.list.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: 12,
                    fontSize: 15.5,
                    lineHeight: 1.62,
                    color: "var(--tx2)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "0 0 auto",
                      marginTop: 9,
                      width: 5,
                      height: 5,
                      borderRadius: 999,
                      background: "var(--ac)",
                    }}
                  />
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if ("panel" in node) {
          const tone = PANEL[node.panel] ?? PANEL.panel;
          return (
            <div
              key={i}
              style={{
                marginTop: 20,
                padding: "20px 22px",
                borderRadius: 14,
                border: `1px solid ${tone.border}`,
                background: tone.background,
              }}
            >
              <Nodes nodes={node.body} />
            </div>
          );
        }

        return (
          <p
            key={i}
            style={{
              marginTop: i === 0 ? 0 : 16,
              fontSize: 15.5,
              lineHeight: 1.68,
              color: "var(--tx2)",
            }}
          >
            <RichText text={node.p} />
          </p>
        );
      })}
    </>
  );
}

export default function LegalDoc({ doc }: { doc: string }) {
  const content = DOCS[doc];
  if (!content) return null;

  return (
    <section className="sect">
      <div className="wrap">
        <div style={{ maxWidth: 860 }}>
          {content.updated && (
            <p
              style={{
                fontSize: 13.5,
                letterSpacing: "0.02em",
                color: "var(--tx3)",
              }}
            >
              <RichText text={content.updated} />
            </p>
          )}

          {content.intro.length > 0 && (
            <div style={{ marginTop: 18 }}>
              {content.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  style={{
                    marginTop: 14,
                    fontSize: 16.5,
                    lineHeight: 1.68,
                    color: "var(--tx2)",
                  }}
                >
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          )}

          {content.sections.map((section) => (
            <section
              key={section.heading}
              style={{
                marginTop: 44,
                paddingTop: 28,
                borderTop: "1px solid var(--line)",
              }}
            >
              <h2
                style={{
                  marginBottom: 18,
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {section.heading}
              </h2>
              <Nodes nodes={section.body} />
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
