import TrackedLink from "./TrackedLink";
import { Pill, SectionIntro, primaryButton } from "./SectionBits";

/* stroke-dashoffset for r=19 (circumference 119.4) at the listed match score. */
const jobs = [
  {
    score: 78,
    dash: 26.3,
    role: "Product Analyst",
    meta: "Fintech company · Bengaluru · Full-time",
    tags: [{ label: "SQL" }, { label: "Dashboards" }],
    featured: false,
  },
  {
    score: 84,
    dash: 19.1,
    role: "Data Analyst - Internship",
    meta: "SaaS company · Remote · 6 months",
    tags: [{ label: "Under 1 yr exp", solid: true }],
    featured: true,
  },
  {
    score: 67,
    dash: 39.4,
    role: "Senior Business Analyst",
    meta: "Consulting firm · Mumbai · Full-time",
    tags: [{ label: "2 gaps to close" }],
    featured: false,
  },
  {
    score: 54,
    dash: 54.9,
    role: "Head of Analytics",
    meta: "Retail group · Gurugram · Full-time",
    tags: [{ label: "5 gaps to close" }],
    featured: false,
  },
];

export default function JobsSection() {
  return (
    <section id="jobs" className="sect sect--alt">
      <div className="wrap">
        <Pill>Jobs &amp; internships</Pill>
        <SectionIntro
          heading="Real roles. Ranked for you, out of 100."
          copy="Including internships and openings for people with under a year of experience, scored the same way as everything else, so you know where you actually stand."
        />

        <ul
          style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 12 }}
        >
          {jobs.map((job) => (
            <li
              key={job.role}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                padding: "22px 26px",
                borderRadius: 16,
                flexWrap: "wrap",
                border: job.featured
                  ? "1px solid var(--acline)"
                  : "1px solid var(--line)",
                background: job.featured
                  ? "linear-gradient(120deg, var(--acsoft), transparent 60%), var(--card)"
                  : "var(--card)",
              }}
            >
              <span
                style={{ flex: "0 0 auto", position: "relative", width: 58, height: 58 }}
              >
                <svg
                  viewBox="0 0 44 44"
                  style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="22"
                    cy="22"
                    r="19"
                    fill="none"
                    stroke="var(--line2)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r="19"
                    fill="none"
                    stroke="var(--ac)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="119.4"
                    strokeDashoffset={job.dash}
                  />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  {job.score}
                </span>
              </span>
              <span style={{ flex: "1 1 auto" }}>
                <span style={{ display: "block", fontSize: 17, fontWeight: 500 }}>
                  {job.role}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 4,
                    fontSize: 14,
                    color: "var(--tx3)",
                  }}
                >
                  {job.meta}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                {job.tags.map((tag) => (
                  <span
                    key={tag.label}
                    style={
                      "solid" in tag && tag.solid
                        ? {
                            padding: "6px 13px",
                            borderRadius: 999,
                            background: "var(--ac)",
                            fontSize: 13,
                            color: "#FFFFFF",
                          }
                        : {
                            padding: "6px 13px",
                            borderRadius: 999,
                            border: "1px solid var(--line2)",
                            fontSize: 13,
                            color: "var(--tx2)",
                          }
                    }
                  >
                    {tag.label}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 22,
            flexWrap: "wrap",
          }}
        >
          <TrackedLink
            href="/jobs"
            section="jobs"
            label="browse_jobs"
            style={primaryButton}
          >
            Browse matched jobs
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
