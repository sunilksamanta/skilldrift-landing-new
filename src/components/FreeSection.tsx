import Link from "next/link";
import { Regional } from "./Regional";
import { ArrowRight, Check } from "./icons";
import { Pill, SectionIntro } from "./SectionBits";

const freeItems: [string, string][] = [
  ["Skill gap analysis", " — scored against the role you want"],
  ["A career path", ", built automatically when you upload your resume"],
  [
    "Re-scoring every time you upskill",
    " — the loop never costs you anything to turn",
  ],
  ["Resume and ATS analysis", " — the full diagnosis"],
  ["Job matching with match scores", ", out of 100"],
  ["Jobs and internships", " we bring onto the platform"],
  ["Basic job analysis", " on any role"],
  ["One AI course for your domain", " — the whole course, not a preview"],
  ["Podcasts", " alongside your learning resources"],
  ["Industry news for your field", ", curated daily"],
];

const paidItems: { label: string; note?: string; cost: string }[] = [
  { label: "Tailor your resume to one job", cost: "18" },
  { label: "Detailed job analysis", cost: "37" },
  { label: "Text-based mock interview", cost: "50" },
  { label: "Build a learning roadmap", cost: "50" },
  {
    label: "Issue a certificate to your resume",
    note: "Share it on LinkedIn and you get all 50 back",
    cost: "50",
  },
  { label: "Download your resume", cost: "54–70" },
  { label: "Rewrite your resume around outcomes", cost: "70" },
  { label: "Recorded practice interview", cost: "150" },
  { label: "Live voice interview with the AI coach", cost: "200" },
];

export default function FreeSection() {
  return (
    <section id="free" className="sect">
      <div className="wrap">
        <Pill>What&rsquo;s free</Pill>
        <SectionIntro
          heading="Most of SkillDrift costs nothing."
          copy="Finding out where you stand is free — permanently. You spend credits only when you’re producing something to send to an employer."
        />

        <div
          style={{
            marginTop: 52,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(360px,100%),1fr))",
            gap: 22,
            alignItems: "start",
          }}
        >
          <div
            className="sd-pad-34"
            style={{
              padding: 34,
              borderRadius: 22,
              border: "1px solid var(--acline)",
              background:
                "linear-gradient(165deg, var(--acsoft), transparent 62%), var(--card)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em" }}>
                Free, always
              </h3>
              <span
                style={{
                  padding: "7px 14px",
                  borderRadius: 999,
                  background: "var(--ac)",
                  color: "#FFFFFF",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                }}
              >
                NO CARD, NO LIMIT
              </span>
            </div>
            <p
              style={{
                marginTop: 12,
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--tx2)",
              }}
            >
              Everything that tells you where you stand and what to do about it.
            </p>
            <ul
              style={{
                marginTop: 26,
                display: "flex",
                flexDirection: "column",
                gap: 15,
              }}
            >
              {freeItems.map(([lead, rest]) => (
                <li
                  key={lead}
                  style={{
                    display: "flex",
                    gap: 13,
                    fontSize: 15,
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{ flex: "0 0 auto", color: "var(--ac)", marginTop: 1 }}
                  >
                    <Check />
                  </span>
                  <span>
                    <strong style={{ fontWeight: 500 }}>{lead}</strong>
                    <span style={{ color: "var(--tx2)" }}>{rest}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="sd-pad-34"
            style={{
              padding: 34,
              borderRadius: 22,
              border: "1px solid var(--line)",
              background: "var(--card)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em" }}>
                Costs credits
              </h3>
              <span
                style={{
                  padding: "7px 14px",
                  borderRadius: 999,
                  border: "1px solid var(--line2)",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  color: "var(--tx2)",
                }}
              >
                <Regional in="IN INDIA, 1 CREDIT = ₹1" row="299 CREDITS = $6.99" />
              </span>
            </div>
            <p
              style={{
                marginTop: 12,
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--tx2)",
              }}
            >
              Everything that produces a finished artefact &mdash; something you send,
              download, or put your name on. One of them refunds itself.
            </p>
            <ul style={{ marginTop: 26, display: "flex", flexDirection: "column" }}>
              {paidItems.map((item, i) => (
                <li
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: item.note ? "flex-start" : "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "15px 0",
                    borderBottom:
                      i === paidItems.length - 1
                        ? undefined
                        : "1px solid var(--line)",
                    fontSize: 15,
                  }}
                >
                  <span>
                    {item.label}
                    {item.note && (
                      <span
                        style={{
                          display: "block",
                          marginTop: 4,
                          fontSize: 13,
                          color: "var(--ac)",
                        }}
                      >
                        {item.note}
                      </span>
                    )}
                  </span>
                  <span style={{ fontWeight: 600 }}>{item.cost}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 26,
                fontSize: 15,
                fontWeight: 500,
                color: "var(--tx)",
              }}
            >
              See plans and what credits cost
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <p
          style={{
            marginTop: 34,
            fontSize: 20,
            lineHeight: 1.5,
            maxWidth: 820,
            fontWeight: 500,
          }}
        >
          The pricing philosophy in one line:{" "}
          <span style={{ color: "var(--ac)" }}>
            diagnosis is free, production is paid.
          </span>
        </p>
      </div>
    </section>
  );
}
