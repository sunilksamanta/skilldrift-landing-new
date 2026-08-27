import Link from "next/link";
import { ArrowRight, Check } from "./icons";
import { Pill, SectionIntro } from "./SectionBits";

const claims = [
  "Certificate written into the resume the moment you finish",
  "One click to LinkedIn, and the 50 credits come back",
  "Your match score re-scores itself, free, every time",
];

export default function LiveResumeSection() {
  return (
    <section id="live-resume" className="sect">
      <div className="wrap">
        <Pill>Nobody else does this</Pill>
        <SectionIntro
          heading="Your resume stops going stale."
          copy="Finish a course on SkillDrift and the certificate is added to your resume automatically: no re-uploading, no re-formatting, no forgetting it existed. Share it to LinkedIn in one click and the 50 credits it cost to issue land straight back in your balance."
        />

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))",
            gap: 44,
            alignItems: "center",
          }}
        >
          <ul style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {claims.map((claim) => (
              <li
                key={claim}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  padding: "22px 24px",
                  borderRadius: 16,
                  border: "1px solid var(--line)",
                  background: "var(--card)",
                }}
              >
                <span
                  style={{
                    flex: "0 0 auto",
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    display: "grid",
                    placeItems: "center",
                    background: "var(--acsoft)",
                    color: "var(--ac)",
                  }}
                >
                  <Check strokeWidth={2} />
                </span>
                <span style={{ fontSize: 16, lineHeight: 1.55 }}>{claim}</span>
              </li>
            ))}
            <li style={{ marginTop: 8 }}>
              <Link
                href="/how-it-works"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--tx)",
                }}
              >
                See how it works
                <ArrowRight />
              </Link>
            </li>
          </ul>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(230px,100%),1fr))",
              gap: 16,
            }}
          >
            <div
              style={{
                padding: 22,
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
              <div
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: "var(--tx2)",
                }}
              >
                Certifications
              </div>
              <div
                style={{
                  marginTop: 10,
                  height: 9,
                  borderRadius: 99,
                  background: "var(--card2)",
                  width: "82%",
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  height: 9,
                  borderRadius: 99,
                  background: "var(--card2)",
                  width: "58%",
                }}
              />
              <div
                style={{
                  marginTop: 26,
                  paddingTop: 16,
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--tx3)" }}>Match</span>
                <span style={{ fontSize: 22, fontWeight: 600 }}>71</span>
              </div>
            </div>

            <div
              style={{
                padding: 22,
                borderRadius: 18,
                border: "1px solid var(--acline)",
                background:
                  "linear-gradient(160deg, var(--acsoft), transparent 76%), var(--card)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ac)",
                }}
              >
                After - automatic
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: "var(--tx2)",
                }}
              >
                Certifications
              </div>
              <div
                style={{
                  marginTop: 10,
                  height: 9,
                  borderRadius: 99,
                  background: "var(--card2)",
                  width: "82%",
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  height: 9,
                  borderRadius: 99,
                  background: "var(--card2)",
                  width: "58%",
                }}
              />
              <div
                style={{
                  marginTop: 10,
                  padding: "8px 11px",
                  borderRadius: 9,
                  background: "var(--acsoft)",
                  border: "1px solid var(--acline)",
                  fontSize: 12.5,
                  animation: "sd-rise .6s ease both",
                }}
              >
                SkillDrift &middot; SQL for Analysts
              </div>
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--tx3)" }}>Match</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 12, color: "var(--ok)" }}>&#9650;</span>
                  <span style={{ fontSize: 22, fontWeight: 600, color: "var(--ac)" }}>
                    78
                  </span>
                </span>
              </div>
              <button
                type="button"
                style={{
                  marginTop: 16,
                  width: "100%",
                  height: 40,
                  borderRadius: 10,
                  border: "1px solid var(--line2)",
                  background: "transparent",
                  color: "var(--tx)",
                  fontSize: 13.5,
                }}
              >
                Share to LinkedIn &middot; +50 credits
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
