import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ResumeUploadCard from "@/components/ResumeUploadCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrackedLink from "@/components/TrackedLink";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import { Plus } from "@/components/icons";
import { CardGrid, Section, StepList } from "@/components/page/blocks";
import { getRoute } from "@/lib/content";
import { campaignFor } from "@/lib/cta";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/*
 * Indexable route for the ATS checker cluster (~600k searches/month worldwide;
 * "ats cv checker" 201k, "ats score checker" 165k, "free ats resume checker"
 * 14.8k — the big heads are LOW competition). We already answer this query for
 * free; this page simply carries the words people actually type. It adds NO
 * product logic: the same anonymous upload card as the homepage, under a
 * title, H1 and sections aimed at the query. Title/description/h1 live in
 * pages.json like every other route, so sitemap, canonical and OG derive
 * from the same record.
 */

const PATH = "/ats-score-checker";

export const metadata: Metadata = buildMetadata(PATH);

const BANDS = [
  {
    title: "Needs work",
    body: "Structure or formatting is getting in the way. Parsers are likely to drop or mangle sections.",
  },
  {
    title: "Good",
    body: "Readable by most systems, with specific things still costing you against your target role.",
  },
  {
    title: "Very good",
    body: "Performs well with most ATS systems. What is left is content, not formatting.",
  },
  {
    title: "Excellent",
    body: "Parses cleanly and reads strongly against the role you are aiming at.",
  },
];

const STEPS = [
  {
    title: "Upload your resume",
    body: "PDF, DOC or DOCX, up to 5 MB. No account needed to see your result, and it takes about a minute.",
  },
  {
    title: "Read your ATS rating",
    body: "You get one of four bands, plus the three things holding your score down, named. Not “improve your formatting”: the specific gaps, each measured against the average for your target role.",
  },
  {
    title: "Fix what is named, then check again",
    body: "An ATS rating tells you the machine can read you. It does not tell you that you are ready. The same upload also scores the gap between your skills and the role you want, and the loop that closes it starts from there.",
  },
];

const WHAT_YOU_GET = [
  {
    title: "Your ATS rating",
    body: "How your resume reads to the software, on the four bands above.",
  },
  {
    title: "Three things holding your score down, named",
    body: "Not “improve your formatting”. The specific gaps, each measured against the average for your target role. Named for free.",
  },
  {
    title: "Your skill gap map",
    body: "Where you sit against the industry average on the skills the role actually needs.",
  },
  {
    title: "Your closest matching roles",
    body: "The roles you are nearest to today, scored out of 100 against your real skills.",
  },
];

const FAQS = [
  {
    q: "Is the ATS check free?",
    a: "Yes, and you do not need an account. Upload a resume and you get your ATS rating, your skill gap map and the three things holding your score down, named. The detail on each one, and what to do about it, is behind a free signup.",
  },
  {
    q: "Why is my ATS score a rating and not a number out of 100?",
    a: "Because every applicant tracking system parses differently, a single number implies a precision that no tool actually has. SkillDrift rates your resume across four bands, Needs work, Good, Very good and Excellent, so the result means the same thing whichever system reads it.",
  },
  {
    q: "What file types can I upload?",
    a: "PDF, DOC and DOCX, up to 5 MB. It takes about a minute.",
  },
  {
    q: "What happens to my resume?",
    a: "It is read to score it and find matches, and stored so you do not have to upload it again if you make an account. If you do not, it is deleted after 30 days.",
  },
  {
    q: "Does a good ATS rating mean I will get the interview?",
    a: "No. It means the machine can read you properly. Whether a human then wants to meet you depends on the skills behind the words, which is why the same upload also names the gaps between you and the role you are aiming at.",
  },
];

export default function AtsScoreCheckerPage() {
  const route = getRoute(PATH);
  const campaign = campaignFor(PATH);

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--tx)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <JsonLd
        schemas={[webPageSchema(PATH), breadcrumbSchema(PATH), faqPageSchema(FAQS)]}
      />
      <SiteHeader campaign={campaign} />

      <main>
        <Breadcrumbs
          trail={[{ name: "SkillDrift", href: "/" }, { name: "ATS score checker" }]}
        />

        {/* Hero: the query's words, then the same upload card as the homepage. */}
        <section style={{ padding: "28px 0 8px" }}>
          <div className="wrap">
            <h1
              style={{
                maxWidth: 900,
                fontSize: "clamp(36px,4.2vw,58px)",
                lineHeight: 1.08,
                fontWeight: 600,
                letterSpacing: "-0.025em",
              }}
            >
              {route.h1}
            </h1>
            <p
              style={{
                marginTop: 24,
                maxWidth: 720,
                fontSize: 17,
                lineHeight: 1.62,
                color: "var(--tx2)",
              }}
            >
              Most resumes are read by software before a person sees them. Upload yours and
              SkillDrift tells you how it reads to an applicant tracking system, what is
              holding it back, and how it scores against the role you actually want.
            </p>
            <p
              style={{
                marginTop: 14,
                maxWidth: 720,
                fontSize: 15.5,
                lineHeight: 1.6,
                color: "var(--tx2)",
              }}
            >
              <strong style={{ color: "var(--tx)" }}>
                No account required to see your score.
              </strong>{" "}
              PDF, DOC or DOCX, up to 5 MB, about a minute.
            </p>
          </div>
        </section>

        {/* The existing homepage upload card. No props, no behaviour changes. */}
        <ResumeUploadCard />

        <Section
          alt
          eyebrow="The rating"
          heading="Your ATS score, rated and not numbered"
          copy="Every applicant tracking system parses a resume differently, so a single number out of 100 implies a precision no tool actually has. SkillDrift rates your resume across four bands, so the answer means the same thing whichever system reads it."
        >
          <CardGrid cards={BANDS} min={240} />
        </Section>

        <Section
          eyebrow="How it works"
          heading="How to check if your resume is ATS friendly"
        >
          <StepList steps={STEPS} />
          <p style={{ marginTop: 32, fontSize: 15.5, color: "var(--tx2)" }}>
            Passing the parser is the easy half.{" "}
            <TrackedLink
              href="/how-it-works"
              section="ats_checker"
              label="how_it_works"
              style={{
                color: "var(--tx)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              See how the whole loop works
            </TrackedLink>
            .
          </p>
        </Section>

        <Section
          alt
          eyebrow="CV or resume"
          heading="Works as an ATS CV checker too"
          copy="The checker reads a CV exactly the way it reads a resume. Whatever your document is called, and however it is laid out, upload it and you get the same rating, the same gaps and the same matches. The format does not matter."
        />

        <Section eyebrow="Included free" heading="What you get in the same pass">
          <CardGrid cards={WHAT_YOU_GET} min={260} />
        </Section>

        <Section alt eyebrow="FAQ" heading="Questions people ask" id="faq">
          <div style={{ marginTop: 52 }}>
            {FAQS.map((faq, i) => (
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
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <p style={{ marginTop: 40, fontSize: 15.5, color: "var(--tx2)" }}>
            Ready when you are:{" "}
            <TrackedLink
              href="#top"
              section="ats_checker"
              label="back_to_upload"
              style={{
                color: "var(--tx)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              upload your resume and get your ATS rating free
            </TrackedLink>
            .
          </p>
        </Section>
      </main>

      <SiteFooter campaign={campaign} />
    </div>
  );
}
