import { ArrowRight } from "./icons";
import TrackedLink from "./TrackedLink";
import { homeCta } from "@/lib/cta";
import { Pill, SectionIntro, primaryButton } from "./SectionBits";

const pairs = [
  {
    before: "“Worked on a college project using Python and machine learning.”",
    after:
      "“Built a churn-prediction model in Python across 40,000 customer records, reaching 82% precision, shipped as capstone for a six-person team.”",
  },
  {
    before: "“Responsible for managing vendor relationships and procurement.”",
    after:
      "“Renegotiated 14 vendor contracts across two regions, cutting annual spend 18% without switching a single supplier.”",
  },
  {
    before: "“Led the engineering team and was involved in technical strategy.”",
    after:
      "“Grew engineering from 9 to 34 across three squads; cut median deploy time from 40 minutes to 6 and halved release failures.”",
  },
];

const assurances = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11a3 3 0 1 1 6 0c0 2-3 2.4-3 5" />
        <circle cx="12" cy="19" r=".6" fill="currentColor" />
      </svg>
    ),
    title: "It asks you. It never invents.",
    body: "SkillDrift asks a short set of questions and rewrites from your answers. Every figure on your resume is one you supplied, nothing is generated, so nothing can surprise you in an interview.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 17l5-5 4 3 7-8" />
      </svg>
    ),
    title: "Your ATS score moves with it",
    body: "The rewrite fixes structure and parsing at the same time, so the resume reads well to both a machine and a person.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="3" width="11" height="15" rx="2" />
        <path d="M9 21h9a2 2 0 0 0 2-2V8" />
      </svg>
    ),
    title: "Your original stays untouched",
    body: "The rewrite becomes your new master copy only if you accept it. Side-by-side comparison before you commit.",
  },
];

export default function RewriteSection() {
  return (
    <section id="rewrite" className="sect sect--alt">
      <div className="wrap">
        <Pill>Resume rewrite</Pill>
        <SectionIntro
          heading="Your resume says what you did. It should say what happened."
          copy="Almost every resume lists duties. Every hiring manager scans for outcomes. SkillDrift asks you what actually happened, then rewrites each line around the result (the number, the scale, the change) and formats it so the ATS can read it."
        />

        <div
          style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 18 }}
        >
          {pairs.map((pair) => (
            <div
              key={pair.before}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
                gap: 18,
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  padding: "26px 28px",
                  borderRadius: 18,
                  border: "1px solid var(--line)",
                  background: "var(--card)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--tx3)",
                  }}
                >
                  Before
                </div>
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 16,
                    lineHeight: 1.62,
                    color: "var(--tx2)",
                  }}
                >
                  {pair.before}
                </p>
              </div>
              <div
                style={{
                  padding: "26px 28px",
                  borderRadius: 18,
                  border: "1px solid var(--acline)",
                  background:
                    "linear-gradient(150deg, var(--acsoft), transparent 74%), var(--card)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ac)",
                  }}
                >
                  <ArrowRight size={15} strokeWidth={2} />
                  After
                </div>
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 16,
                    lineHeight: 1.62,
                    color: "var(--tx)",
                  }}
                >
                  {pair.after}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(290px,100%),1fr))",
            gap: 20,
          }}
        >
          {assurances.map((item) => (
            <div
              key={item.title}
              style={{
                padding: 28,
                borderRadius: 18,
                border: "1px solid var(--line)",
                background: "var(--card)",
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "var(--acsoft)",
                  color: "var(--ac)",
                }}
              >
                {item.icon}
              </span>
              <h3 style={{ marginTop: 20, fontSize: 18, fontWeight: 600 }}>
                {item.title}
              </h3>
              <p
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--tx2)",
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            gap: 22,
            flexWrap: "wrap",
          }}
        >
          <TrackedLink
            href={homeCta("rewrite_upload")}
            section="resume_rewrite"
            label="upload_free"
            style={primaryButton}
          >
            Upload your resume - free
          </TrackedLink>
          <TrackedLink
            href="/resume-rewrite"
            section="resume_rewrite"
            label="see_rewrite"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 16,
              fontWeight: 500,
              color: "var(--tx)",
            }}
          >
            See a real rewrite, before and after
            <ArrowRight />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
