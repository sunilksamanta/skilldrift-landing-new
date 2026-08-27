import RichText from "./page/RichText";
import { Plus } from "./icons";
import { Pill, SectionIntro } from "./SectionBits";

/**
 * Appendix A3 of docs/skilldrift-ssr-and-engineering-spec.md — literal ship
 * strings. These render as visible HTML *and* feed the FAQPage JSON-LD, so the
 * two can never drift apart.
 */
export const faqs = [
  {
    q: "What is SkillDrift?",
    a: "SkillDrift is an AI career platform that scores your skills against the role you want, builds the learning path that closes the gap, and matches you to jobs and internships rated out of 100. As you learn, your score re-scores itself and your resume updates automatically.",
  },
  {
    q: "Is SkillDrift free?",
    a: "The parts that tell you where you stand are free forever: skill gap analysis, a career path, resume and ATS analysis, job matching, jobs and internships, one AI course for your domain, industry news and podcasts. New accounts also get starter credits, enough to rewrite your resume, tailor it to a job and download it.",
  },
  {
    q: "Can SkillDrift analyse my resume without signing up?",
    a: "Yes. Drop your resume on the homepage and you get your readiness score, the three skills holding it down, and three matched roles, with no account. Signing up shows the full gap report, every match and your roadmap, and your resume carries across so you never upload it twice.",
  },
  {
    q: "Does SkillDrift invent numbers on my resume?",
    a: "No. SkillDrift asks you a short set of questions about what each achievement actually produced, and rewrites from your answers. Every figure on your resume is one you supplied, so nothing can surprise you in an interview.",
  },
  {
    q: "What does a credit cost, and what does it buy?",
    a: "{{In India one credit is one rupee: 299 credits cost 299 rupees.|A 299-credit top-up costs {topup} and credits never expire.}} Tailoring your resume to a job is 18 credits, a detailed job analysis is 37, a text-based mock interview is 50, a learning roadmap is 50, a resume download is 54 to 70, and a full outcome rewrite is 70. Unlimited access is {unlimited} a month.",
  },
  {
    q: "Can I use SkillDrift if I am a student or a fresher?",
    a: "Yes. We carry internships and roles for people with under a year of experience, scored the same way as everything else, so you can see where you genuinely stand rather than guessing.",
  },
  {
    q: "What happens when I finish a course?",
    a: "The certificate is added to your resume automatically, with no re-uploading and no re-formatting. Share it to LinkedIn in one click, as a post or straight into your certifications section, and the 50 credits it cost to issue come back to you.",
  },
  {
    q: "How is this different from a resume builder?",
    a: "A resume builder formats what you already wrote. SkillDrift starts from the role you want, tells you what is missing, helps you close it, and keeps your resume current as you do. The resume is an output of the loop, not the product.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="sect">
      <div className="wrap">
        <Pill>FAQ</Pill>
        <SectionIntro
          align="start"
          copyPadTop={8}
          heading="The questions people actually ask before signing up."
          copy="Every answer here is also the source for the FAQPage structured data — write them once, use them twice."
        />

        <div style={{ marginTop: 52 }}>
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              open={i === 0}
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  padding: "26px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 24,
                  fontSize: 19,
                  fontWeight: 500,
                }}
              >
                {faq.q}
                <span style={{ flex: "0 0 auto", color: "var(--tx2)" }}>
                  <Plus />
                </span>
              </summary>
              <p
                style={{
                  padding: "0 0 26px",
                  maxWidth: 820,
                  fontSize: 16,
                  lineHeight: 1.68,
                  color: "var(--tx2)",
                }}
              >
                <RichText text={faq.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
