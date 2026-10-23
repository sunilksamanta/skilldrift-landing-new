import { Check } from "./icons";
import ShotPicture from "./ShotPicture";
import TrackedLink from "./TrackedLink";
import { Pill, SectionIntro, primaryButton } from "./SectionBits";

/*
 * The AI course, in the words people search: a free AI course for your field,
 * with a certificate, then an AI course for your own role built from what the
 * jobs you match ask for ("AI in your field"). The screen is the real roadmap
 * window from the test app, company names swapped. Detail lives on
 * /learning-sprints#ai-in-your-field.
 */
const points = [
  {
    h: "Free, for your field",
    b: "Your first AI course is on us, built for your field, such as AI for Field Sales or AI for Electronics and Communication. Finish it and the certificate goes into your resume.",
  },
  {
    h: "Then AI for your exact role",
    b: "SkillDrift reads the jobs you match. When enough of them ask for AI tools such as ChatGPT, Copilot or generative AI, it builds an AI course for your role, such as AI tools for digital marketing.",
  },
  {
    h: "You see why before you pay",
    b: "How many of your jobs ask, for example 9 of your 60, with lines quoted from two employers. 50 credits, or included in Active Seeker.",
  },
];

export default function AiCourseSection() {
  return (
    <section id="ai-course" className="sect sect--alt">
      <div className="wrap">
        <Pill>AI courses</Pill>
        <SectionIntro
          heading="A free AI course for your field. Then the AI your jobs ask for."
          copy="Most AI courses are the same for everyone. SkillDrift starts from your field, then from the jobs you actually match, so you learn the AI employers in your role are asking for right now."
        />
        <div className="sd-shot-grid">
          <div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 22, listStyle: "none", margin: 0, padding: 0 }}>
              {points.map((p) => (
                <li key={p.h} style={{ display: "flex", gap: 13 }}>
                  <span style={{ flex: "0 0 auto", marginTop: 3, color: "var(--ac)" }}>
                    <Check />
                  </span>
                  <span>
                    <span style={{ display: "block", fontSize: 17, fontWeight: 600 }}>{p.h}</span>
                    <span style={{ display: "block", marginTop: 6, fontSize: 15, lineHeight: 1.6, color: "var(--tx2)" }}>{p.b}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 30 }}>
              <TrackedLink href="/learning-sprints#ai-in-your-field" section="ai_course" label="ai_course_more" style={primaryButton}>
                See how the AI course is built
              </TrackedLink>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              borderRadius: 22,
              overflow: "hidden",
              border: "1px solid var(--line)",
              boxShadow: "0 30px 70px -20px rgba(76,52,180,.28)",
            }}
          >
            <ShotPicture
              desktop="/assets/shots/ai-in-field.png"
              mobile="/assets/shots/m-ai-in-field.png"
              alt="An AI course in SkillDrift built from the jobs a person matches: AI tools for digital marketing, because 9 of their 60 matches ask for AI tools, with lines quoted from two employers and the price before building"
              sizes="(max-width: 760px) 100vw, 60vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
