import Link from "next/link";
import { Pill, SectionIntro } from "./SectionBits";

/**
 * "Every goal, one career guide." Sits under the loop: the loop is one turn,
 * this is the whole career. The goals are the goal answers the app offers,
 * the stages are the career cycle the app follows after a user gets a role.
 * Detail lives on /career-progression.
 */

const goals = [
  "Get an internship",
  "Land my first full-time job",
  "Clear my placement interviews",
  "Build my skills before I start applying",
  "Find a new job in my field",
  "Get more interview calls from my applications",
  "Prepare for interviews I have coming up",
  "Get better at my current job",
];

const stages = [
  {
    n: "01",
    title: "Starting out",
    body: "Skills read from your projects and coursework, with internships and first jobs scored out of 100.",
  },
  {
    n: "02",
    title: "Looking for a job",
    body: "A job board for every application, a tailored resume and help asking for a referral.",
  },
  {
    n: "03",
    title: "Got the role",
    body: "Tap I got the role. SkillDrift adds it to your resume and checks a month later that you started.",
  },
  {
    n: "04",
    title: "Growing in the role",
    body: "Each month in the role adds to your skills. Log a win a week and keep the best ones on your resume.",
  },
  {
    n: "05",
    title: "Review season",
    body: "See how ready you are for the next level and get a draft self-review built from your wins.",
  },
  {
    n: "06",
    title: "Your next move",
    body: "Promoted, moving on or changing field: your resume, your plan and your jobs follow.",
  },
];

export default function CareerLifeSection() {
  return (
    <section id="career-for-life" className="sect sect--tight">
      <div className="wrap">
        <Pill>For your whole career</Pill>
        <SectionIntro
          heading="Every goal, one career guide. From your first internship to your next promotion."
          copy={
            <>
              Pick the goal you have today and SkillDrift plans the steps. It stays with you after
              you get there. Every course you finish and every month in a role adds to the same
              skill scores, so your growth is tracked, not guessed.{" "}
              <Link
                href="/career-progression"
                style={{ textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                See how SkillDrift follows your career
              </Link>
            </>
          }
        />

        <div
          className="sd-pad-48"
          style={{
            marginTop: 52,
            borderRadius: 26,
            border: "1px solid var(--line)",
            background:
              "linear-gradient(200deg, rgba(124,93,249,.10), transparent 50%), var(--bg2)",
            padding: 48,
          }}
        >
          <div style={{ fontSize: 12.5, letterSpacing: "0.14em", color: "var(--ac)" }}>
            THE GOALS YOU CAN PICK
          </div>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              marginTop: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {goals.map((goal) => (
              <li
                key={goal}
                style={{
                  padding: "9px 16px",
                  borderRadius: 999,
                  border: "1px solid var(--acline)",
                  background: "var(--card)",
                  fontSize: 14.5,
                  lineHeight: 1.35,
                }}
              >
                {goal}
              </li>
            ))}
          </ul>

          <ol
            className="sd-stage-grid"
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
              gap: 18,
            }}
          >
            {stages.map((stage) => (
              <li
                key={stage.n}
                style={{
                  padding: "22px 22px 20px",
                  borderRadius: 18,
                  border: "1px solid var(--line)",
                  background: "var(--card)",
                }}
              >
                <span className="sd-role-card__num">{stage.n}</span>
                <h3
                  style={{
                    marginTop: 16,
                    fontSize: 19,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stage.title}
                </h3>
                <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.6, color: "var(--tx2)" }}>
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
