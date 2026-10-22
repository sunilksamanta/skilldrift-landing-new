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
    a: "The parts that tell you where you stand are free forever: skill gap analysis, a career path, resume and ATS analysis, job matching, jobs and internships, one AI course for your domain, industry news and podcasts. New accounts also get 160 credits, enough to rewrite your resume, tailor it to a job and download it.",
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
    a: "{{In India one credit is one rupee: 299 credits cost 299 rupees.|A Casual User pack of 299 credits costs {topup}, and credits you buy never expire.}} Tailoring your resume to a job is 18 credits, a Deep fit analysis is 37, a text-based mock interview is 50, a learning roadmap is 50, a resume download is 54 to 70, and a full outcome rewrite is 70. Active Seeker, with no credit counting, is {unlimited} a month.",
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
    q: "Is the learning on SkillDrift personalised to me?",
    a: "Yes. SkillDrift starts from the gaps your resume, a job description or a mock interview shows, and builds each learning roadmap around those gaps and the role you are aiming at. When you finish, your gaps and job scores update and the certificate is added to your resume. We call this closed loop career development.",
  },
  {
    q: "Is there a free AI course on SkillDrift?",
    a: "Yes. Your first AI course is free and built for your field, such as AI for Field Sales or AI for Electronics and Communication, and the certificate goes into your resume when you finish. SkillDrift also reads the jobs you match in your own role. When enough of them ask for AI tools, it builds an AI course for that role, such as AI tools for digital marketing, and shows you the postings that ask for it. That course is 50 credits, or included in Active Seeker.",
  },
  {
    q: "How is this different from a resume builder?",
    a: "A resume builder formats what you already wrote. SkillDrift starts from the role you want, tells you what is missing, helps you close it, and keeps your resume current as you do. The resume is an output of the loop, not the product.",
  },
  {
    q: "I finished courses but I am still not getting interviews. Why?",
    a: "Usually the course did not match what the jobs you apply to ask for, or it never reached your resume. SkillDrift starts from those jobs: each one is scored out of 100 and the missing skills are named, so your upskilling goes where it counts. Finish and verify a roadmap and the certificate is written into your resume, and every job that asks for that skill re-scores by the amount shown before you started. We call this skill compounding: every real step adds to the same scores.",
  },
  {
    q: "How much does finishing a course raise my scores?",
    a: "Each roadmap shows how much it will raise your readiness before you start. Finish and verify it, and readiness rises by exactly that amount, along with every job that asks for that skill. SkillDrift shows you the number rather than promising that one course makes you job ready.",
  },
  {
    q: "How does SkillDrift help me apply for jobs?",
    a: "Open the Apply Kit on any job and SkillDrift prepares the application: a resume tailored to the job, a cover note, answers to the questions it asks and help asking for a referral. It checks the job is still open first, and a day or two later asks whether you applied, so your job board stays right.",
  },
  {
    q: "Why did a job disappear from my matches?",
    a: "It closed, or it was posted more than 30 days ago. SkillDrift hides those jobs and never charges for one. Jobs you have already applied to stay on your board.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="sect">
      <div className="wrap">
        <Pill>FAQ</Pill>
        <SectionIntro heading="The questions people actually ask before signing up." />

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
