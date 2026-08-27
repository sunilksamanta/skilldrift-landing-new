import Image from "next/image";
import { Pill, SectionIntro } from "./SectionBits";

const steps = [
  {
    n: "01",
    title: "Upload",
    body: "We read your skills straight from your resume. No forms to fill.",
  },
  {
    n: "02",
    title: "Score",
    body: "Pick a target role and see your gap out of 100, skill by skill.",
  },
  {
    n: "03",
    title: "Roadmap",
    body: "The exact skills to close it, in the order that moves your score.",
  },
  { n: "04", title: "Learn", body: "Bite-size sprints, not 40-hour courses." },
  {
    n: "05",
    title: "Certify",
    body: "Finish a course and the certificate writes itself into your resume.",
  },
];

/* Node positions on the ring, as percentages of the square container. */
const nodes = [
  { n: 1, label: "Upload", left: "50%", top: "11.7%" },
  { n: 2, label: "Score", left: "83.2%", top: "30.8%" },
  { n: 3, label: "Roadmap", left: "83.2%", top: "69.2%" },
  { n: 4, label: "Learn", left: "50%", top: "88.3%" },
  { n: 5, label: "Certify", left: "16.8%", top: "69.2%" },
  { n: 6, label: "Rise", left: "16.8%", top: "30.8%", accent: true },
];

const arcs = [
  "M351.7 75.9 A230 230 0 0 1 468.2 143.1",
  "M519.9 232.7 A230 230 0 0 1 519.9 367.3",
  "M468.2 456.9 A230 230 0 0 1 351.7 524.1",
  "M248.3 524.1 A230 230 0 0 1 131.8 456.9",
  "M80.1 367.3 A230 230 0 0 1 80.1 232.7",
  "M131.8 143.1 A230 230 0 0 1 248.3 75.9",
];

export default function LoopSection() {
  return (
    <section id="loop" className="sect">
      <div className="wrap">
        <Pill>The closed loop</Pill>
        <SectionIntro
          heading="Most tools hand you one piece. SkillDrift closes the loop."
          copy="Every other product gives you one arc of this circle: a course library, a resume builder, a job board. The loop is why your score moves instead of your bookmarks piling up."
        />

        <div
          className="sd-pad-48"
          style={{
            marginTop: 60,
            borderRadius: 26,
            border: "1px solid var(--line)",
            background:
              "linear-gradient(160deg, rgba(124,93,249,.10), transparent 46%), var(--bg2)",
            padding: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(380px,100%),1fr))",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 520,
              margin: "0 auto",
              aspectRatio: "1",
              containerType: "inline-size",
            }}
          >
            <svg
              viewBox="0 0 600 600"
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <defs>
                <marker
                  id="sdArrow2"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0 0.5 L9 5 L0 9.5 z" fill="var(--ac)" />
                </marker>
                <radialGradient id="sdCore2" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(124,93,249,.30)" />
                  <stop offset="100%" stopColor="rgba(124,93,249,0)" />
                </radialGradient>
              </defs>
              <circle
                cx="300"
                cy="300"
                r="230"
                fill="none"
                stroke="var(--line2)"
                strokeWidth="1"
              />
              <circle
                cx="300"
                cy="300"
                r="158"
                fill="none"
                stroke="var(--line)"
                strokeWidth="1"
              />
              <circle
                cx="300"
                cy="300"
                r="86"
                fill="none"
                stroke="var(--line)"
                strokeWidth="1"
              />
              <circle cx="300" cy="300" r="150" fill="url(#sdCore2)" />
              <g
                fill="none"
                stroke="var(--ac)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 6"
                markerEnd="url(#sdArrow2)"
                style={{ animation: "sd-dash 1.6s linear infinite" }}
              >
                {arcs.map((d) => (
                  <path key={d} d={d} />
                ))}
              </g>
            </svg>

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: "26cqw",
                textAlign: "center",
              }}
            >
              <Image
                src="/assets/mark.png"
                alt=""
                width={220}
                height={221}
                style={{ height: "6cqw", width: "auto", display: "block", margin: "0 auto 1.6cqw" }}
              />
              <div
                style={{
                  fontSize: "clamp(11px,2.8cqw,17px)",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                Gaps shrink in real time
              </div>
              <div
                style={{
                  marginTop: "0.7cqw",
                  fontSize: "clamp(9px,2.1cqw,13px)",
                  color: "var(--tx3)",
                }}
              >
                Then round again
              </div>
            </div>

            {nodes.map((node) => (
              <div
                key={node.n}
                style={{
                  position: "absolute",
                  left: node.left,
                  top: node.top,
                  transform: "translate(-50%,-50%)",
                  width: "15cqw",
                  height: "15cqw",
                  borderRadius: 999,
                  border: node.accent ? "1px solid var(--ac)" : "1px solid var(--acline)",
                  background: node.accent
                    ? "linear-gradient(160deg, var(--acsoft), transparent 70%), var(--card2)"
                    : "var(--card2)",
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                }}
              >
                <span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(12px,3.2cqw,21px)",
                      fontWeight: 600,
                      lineHeight: 1,
                      color: node.accent ? "var(--ac)" : undefined,
                    }}
                  >
                    {node.n}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: "0.3cqw",
                      fontSize: "clamp(8px,1.9cqw,12px)",
                      color: "var(--tx2)",
                    }}
                  >
                    {node.label}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <ol style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {steps.map((step) => (
              <li
                key={step.n}
                style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 14 }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--ac)",
                    paddingTop: 3,
                  }}
                >
                  {step.n}
                </span>
                <span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 19,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: 6,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--tx2)",
                    }}
                  >
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
            <li style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 14 }}>
              <span
                style={{ fontSize: 14, fontWeight: 500, color: "var(--ac)", paddingTop: 3 }}
              >
                06
              </span>
              <span>
                <span
                  style={{
                    display: "block",
                    fontSize: 19,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Rise
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 6,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--tx2)",
                  }}
                >
                  Your score re-scores itself{" "}
                  <strong style={{ color: "var(--ac)", fontWeight: 500 }}>free</strong>, and
                  better roles unlock. Then round again.
                </span>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
