import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { campaignFor, signUpHref } from "@/lib/cta";

/*
 * /closed-loop-career-development
 * Drop-in App Router page. No new dependencies, no new components.
 * Uses the site's existing global classes (wrap, sect, sect--alt, sd-page-hero, sd-pad-34)
 * and CSS variables (--tx, --tx2, --tx3, --ac, --acline, --acsoft, --card, --line, --btn, --btntx),
 * exactly as /learning-sprints does. Header and footer are rendered here, as on every page.
 */

const URL = "https://www.skilldrift.ai/closed-loop-career-development";
const TITLE = "What Is Closed Loop Career Development? | SkillDrift";
const DESCRIPTION =
  "Closed loop career development measures your skill gap, closes it with learning built around your gap, and updates your resume and job matches as you go.";
const DEFINITION =
  "Closed loop career development measures the gap between a person and the role they want, closes it with learning built around that gap and that role, and updates their resume, gaps and job matches as they go.";

const CAMPAIGN = campaignFor("/closed-loop-career-development");
const cta = (content: string) => signUpHref(CAMPAIGN, content);

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "SkillDrift",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/* One source for the FAQ, so the visible answers and the FAQPage JSON-LD can never drift apart. */
const FAQ: { q: string; a: string }[] = [
  {
    q: "What is closed loop career development?",
    a: `${DEFINITION} Closed means the end of one step feeds the start of the next, so finishing a course changes something you can see.`,
  },
  {
    q: "What is hyper-personalised learning?",
    a: "Hyper-personalised learning is learning built around one person's measured gap between their current skills and a specific role, and framed in the language of that role. It starts from what you are missing, not from a topic you picked, so what you learn next depends on your own gaps.",
  },
  {
    q: "How is this different from an online course platform?",
    a: "A course platform starts from its library: you choose a topic and take the same course as everyone else who chose it. SkillDrift starts from you. Each roadmap is built from your own gaps and matched to the role you are aiming at, and when you finish it your resume, your remaining gaps and your job match scores update.",
  },
  {
    q: "Is there an AI that tells me which skills I am missing and helps me learn them?",
    a: "Yes. That is what closed loop career development does. SkillDrift reads your resume against the role you want, names the skills you are missing, builds the learning around each gap, and rescores your job matches out of 100 as you close them.",
  },
  {
    q: "What should I learn next for my career?",
    a: "Start from the role you want, not from a topic. Compare your resume with a real job posting for that role, then learn the skill the posting asks for that your resume shows least. SkillDrift does this for you and updates the answer each time you finish something.",
  },
  {
    q: "Where does the loop start?",
    a: "With your resume. Upload it and SkillDrift names your gaps against the role you want, or against any job description you paste. A mock interview for the same role finds the gaps a resume cannot show, and those become learning too. The gap analysis is free.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    isPartOf: { "@type": "WebSite", name: "SkillDrift", url: "https://www.skilldrift.ai" },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${URL}#term`,
    name: "Closed loop career development",
    alternateName: ["Closed-loop career development", "Closed loop career platform"],
    description: DEFINITION,
    url: URL,
    inDefinedTermSet: { "@type": "DefinedTermSet", name: "SkillDrift glossary", url: URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "SkillDrift", item: "https://www.skilldrift.ai" },
      { "@type": "ListItem", position: 2, name: "How it works", item: "https://www.skilldrift.ai/how-it-works" },
      { "@type": "ListItem", position: 3, name: "Closed loop career development", item: URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

/* Shared styles, copied from the patterns on /learning-sprints */
const pill: CSSProperties = { display: "inline-block", padding: "9px 20px", borderRadius: 999, border: "1px solid var(--acline)", fontSize: 14 };
const headRow: CSSProperties = { marginTop: 26, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 48, alignItems: "end" };
const h2: CSSProperties = { fontSize: "clamp(28px,3.1vw,44px)", lineHeight: 1.13, fontWeight: 600, letterSpacing: "-0.025em" };
const lede: CSSProperties = { fontSize: 16, lineHeight: 1.62, color: "var(--tx2)" };
const grid = (min: number, gap = 20): CSSProperties => ({ marginTop: 44, display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(min(${min}px,100%),1fr))`, gap });
const card: CSSProperties = { padding: 28, borderRadius: 18, border: "1px solid var(--line)", background: "var(--card)" };
const cardAccent: CSSProperties = { ...card, border: "1px solid var(--acline)", background: "linear-gradient(160deg, var(--acsoft), transparent 72%), var(--card)" };
const h3: CSSProperties = { marginTop: 0, fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" };
const body: CSSProperties = { marginTop: 10, fontSize: 15, lineHeight: 1.6, color: "var(--tx2)" };
const eyebrow: CSSProperties = { fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ac)" };

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="17" height="17" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function LoopDiagram() {
  const nodes = [
    { x: 220.0, y: 56.0, w: 128, t: "1. Measure", s: "the gap to a role", c: "#0A0A0C" },
    { x: 353.1, y: 152.7, w: 124, t: "2. Build", s: "learning for you", c: "#7C5DF9" },
    { x: 302.3, y: 309.3, w: 128, t: "3. Prove", s: "sprint, certificate", c: "#0A0A0C" },
    { x: 137.7, y: 309.3, w: 132, t: "4. Update", s: "resume, gaps, jobs", c: "#0A0A0C" },
    { x: 86.9, y: 152.7, w: 112, t: "5. Measure", s: "again", c: "#0A0A0C" },
  ];
  const arcs = [
    "M289.1 74.2 A140 140 0 0 1 323.5 101.7",
    "M359.8 204.1 A140 140 0 0 1 350.7 246.2",
    "M234.6 335.2 A140 140 0 0 1 214.0 335.9",
    "M91.6 251.7 A140 140 0 0 1 80.7 209.7",
    "M110.6 108.6 A140 140 0 0 1 144.6 78.0",
  ];
  return (
    <svg viewBox="0 0 440 372" role="img" aria-label="The closed loop: measure the gap, build the learning, prove it, update everything, measure again" style={{ position: "relative", display: "block", width: "100%", height: "auto", fontFamily: "inherit" }}>
      <defs>
        <marker id="sdClArrow" viewBox="0 0 10 10" markerWidth="7" markerHeight="7" refX="7" refY="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#fff" />
        </marker>
      </defs>
      <circle cx="220" cy="196" r="140" fill="none" stroke="#fff" strokeOpacity=".14" strokeWidth="18" />
      <g stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" markerEnd="url(#sdClArrow)">
        {arcs.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fontSize="13" fontWeight="600" textAnchor="middle">
        {nodes.map((n) => (
          <g key={n.t + n.x} transform={`translate(${n.x},${n.y})`}>
            <rect x={-n.w / 2} y={-23} width={n.w} height={46} rx={12} fill="#fff" />
            <text y={-3} fill={n.c}>{n.t}</text>
            <text y={13} fontSize="10.5" fontWeight="400" fill="#5A5C66">{n.s}</text>
          </g>
        ))}
      </g>
      <g textAnchor="middle" fill="#fff">
        <text x="220" y="190" fontSize="11.5" letterSpacing="1.6" opacity=".85">ONE PERSON</text>
        <text x="220" y="212" fontSize="16" fontWeight="600">One target role</text>
      </g>
    </svg>
  );
}

function Score({ score, band, good, chips }: { score: number; band: string; good: boolean; chips: { s: string; ok: boolean }[] }) {
  const tone = good ? "#1F9D6B" : "#C7811A";
  return (
    <div style={{ ...card, padding: 26 }}>
      <div style={{ fontWeight: 600 }}>Data Analyst, entry level</div>
      <div style={{ fontSize: 52, fontWeight: 600, lineHeight: 1, margin: "14px 0 8px" }}>
        {score}
        <span style={{ fontSize: 18, color: "var(--tx2)", fontWeight: 500 }}> / 100</span>
      </div>
      <span style={{ display: "inline-block", fontSize: 13, fontWeight: 600, padding: "5px 11px", borderRadius: 999, color: tone, background: good ? "rgba(31,157,107,.12)" : "rgba(199,129,26,.12)" }}>{band}</span>
      <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {chips.map((c) => (
          <span key={c.s} style={{ fontSize: 12.5, padding: "5px 10px", borderRadius: 8, border: `1px solid ${c.ok ? "rgba(31,157,107,.4)" : "rgba(199,129,26,.4)"}`, color: c.ok ? "#1F9D6B" : "#C7811A" }}>
            {c.s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ClosedLoopCareerDevelopmentPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--tx)", minHeight: "100vh", overflowX: "hidden" }}>
      <SiteHeader campaign={CAMPAIGN} />
    <main>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="wrap" style={{ paddingTop: 26 }}>
        <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--tx3)" }}>
          <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link style={{ color: "var(--tx2)" }} href="/">SkillDrift</Link>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span aria-hidden="true" style={{ color: "var(--tx3)" }}>/</span>
            <Link style={{ color: "var(--tx2)" }} href="/how-it-works">How it works</Link>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span aria-hidden="true" style={{ color: "var(--tx3)" }}>/</span>
            <span aria-current="page" style={{ color: "var(--tx)" }}>Closed loop career development</span>
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", padding: "56px 0 96px", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: -320, right: -120, width: 1400, height: 1100, pointerEvents: "none", background: "linear-gradient(206deg, rgba(255,255,255,.72) 0%, rgba(255,255,255,.42) 7%, rgba(150,124,255,.26) 16%, rgba(96,73,192,.11) 30%, transparent 46%)", transform: "rotate(-2deg)", opacity: 0.9 }} />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="sd-page-hero" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(420px,100%),1fr))", gap: 72, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)" }}>The category</div>
              <h1 style={{ marginTop: 18, maxWidth: 900, fontSize: "clamp(34px,4.1vw,58px)", lineHeight: 1.07, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--tx)" }}>
                What is closed loop career development?
              </h1>
              <p style={{ marginTop: 24, maxWidth: 640, fontSize: 17, lineHeight: 1.62, color: "var(--tx2)" }}>
                <strong style={{ color: "var(--tx)", fontWeight: 500 }}>{DEFINITION}</strong> Closed means the end of one step feeds the start of the next. Finishing a course changes something you can see.
              </p>
              <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <a href={cta("hero_primary")} style={{ height: 54, padding: "0 30px", borderRadius: 14, background: "var(--btn)", color: "var(--btntx)", fontSize: 16, fontWeight: 500, display: "inline-flex", alignItems: "center" }}>
                  See your gaps
                </a>
                <a href="#steps" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 16, fontWeight: 500, color: "var(--tx)" }}>
                  How the loop works
                  <Arrow />
                </a>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: 22, padding: 30, overflow: "hidden", boxShadow: "0 30px 70px rgba(20,10,60,.30)", backgroundColor: "#5B49B4", backgroundImage: "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px),linear-gradient(160deg, #8C6CFF 0%, #7C5DF9 45%, #6049C0 100%)", backgroundSize: "28px 28px, 28px 28px, 100% 100%" }}>
              <LoopDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Parts of this loop already exist */}
      <section className="sect">
        <div className="wrap">
          <span style={pill}>Why it needs a name</span>
          <div style={headRow}>
            <h2 style={h2}>Parts of this loop already exist.</h2>
            <p style={lede}>Most of the pieces are familiar. Each tool does its part and hands the person the job of joining them up.</p>
          </div>
          <div style={grid(240)}>
            {[
              ["Job boards", "Match you to roles", "A score against today's resume. Nothing changes it except you rewriting the resume."],
              ["Course platforms", "Teach from a catalogue", "The same course, written for everyone who picks it. Finishing it updates nothing else."],
              ["Company learning", "Personalise for employees", "Useful inside one employer. It does not follow a person's own career or the open job market."],
              ["Chatbots", "Know only what you tell them", "A study plan in a minute, and some now remember you. They cannot score you against real job postings or update your resume when you learn."],
            ].map(([tag, title, text]) => (
              <div key={tag} style={card}>
                <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--tx3)", marginBottom: 10 }}>{tag}</div>
                <h3 style={h3}>{title}</h3>
                <p style={body}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, padding: "22px 26px", borderRadius: 18, border: "1px solid var(--acline)", background: "var(--acsoft)", fontSize: 17, lineHeight: 1.6 }}>
            <strong style={{ fontWeight: 600 }}>What is missing is the connection.</strong> A closed loop does the joining: the gap decides the learning, the learning is built around the learner&rsquo;s gap, and finishing it changes the resume and the jobs they match without anyone editing anything.
          </div>
        </div>
      </section>

      {/* Five steps */}
      <section id="steps" className="sect sect--alt">
        <div className="wrap">
          <span style={pill}>How the loop works</span>
          <div style={headRow}>
            <h2 style={h2}>Five steps, and the second one is new.</h2>
            <p style={lede}>Tailoring learning to one person&rsquo;s gap and role used to cost too much. Generative AI changed that. SkillDrift uses it for one job: matching the learning to the gap your resume shows, for the role you want.</p>
          </div>
          <div style={grid(190, 14)}>
            {[
              ["1", "Measure the gap", "Against the role you want, from your resume, a job description or a mock interview."],
              ["2", "Build the learning", "Built around your gap and your target role, not picked by topic."],
              ["3", "Prove it", "Finish a short sprint and earn the certificate for it."],
              ["4", "Update everything", "The certificate goes on your resume, your gaps shrink and jobs are rescored out of 100."],
              ["5", "Measure again", "The next gap is visible instead of guessed at. The loop starts again."],
            ].map(([n, title, text]) => {
              const hl = n === "2";
              return (
                <div key={n} style={hl ? cardAccent : card}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: hl ? "var(--ac)" : "var(--btn)", color: hl ? "#fff" : "var(--btntx)", display: "grid", placeItems: "center", fontWeight: 600, marginBottom: 14 }}>{n}</div>
                  <h3 style={h3}>{title}</h3>
                  <p style={body}>{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hyper-personalised learning */}
      <section className="sect">
        <div className="wrap">
          <span style={pill}>Hyper-personalised learning</span>
          <div style={headRow}>
            <h2 style={h2}>The same subject, framed for the person reading it.</h2>
            <p style={lede}>Hyper-personalised learning is built around one person&rsquo;s measured gap and framed in the language of the role they want. The lesson itself changes, not only the order of recommendations.</p>
          </div>
          <div style={grid(340, 22)}>
            <div className="sd-pad-34" style={{ ...card, padding: 34, borderRadius: 22 }}>
              <div style={{ ...eyebrow, color: "var(--tx3)" }}>A catalogue course</div>
              <h3 style={{ ...h3, marginTop: 12, fontSize: 20 }}>Design systems</h3>
              <p style={{ marginTop: 12, fontSize: 17, lineHeight: 1.55 }}>Written once, for designers and engineers. Every learner who picks it reads the same opening.</p>
              <p style={{ marginTop: 16, fontSize: 13.5, color: "var(--tx2)" }}>Recommended to you. Written for everyone.</p>
            </div>
            <div className="sd-pad-34" style={{ ...cardAccent, padding: 34, borderRadius: 22, background: "linear-gradient(165deg, var(--acsoft), transparent 62%), var(--card)" }}>
              <div style={eyebrow}>A SkillDrift track, for a senior sales leader</div>
              <h3 style={{ ...h3, marginTop: 12, fontSize: 20 }}>Design Systems at Scale</h3>
              <p style={{ marginTop: 12, fontSize: 17, lineHeight: 1.55 }}>
                &ldquo;As a senior sales leader, your advantage is that you can connect design-system decisions directly to revenue outcomes.&rdquo;
              </p>
              <p style={{ marginTop: 16, fontSize: 13.5, color: "var(--tx2)" }}>Built around one person&rsquo;s gap and target role. Quoted from a live SkillDrift track.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Four tests */}
      <section className="sect sect--alt">
        <div className="wrap">
          <span style={pill}>Check any learning product</span>
          <div style={headRow}>
            <h2 style={h2}>Four tests for hyper-personalised learning.</h2>
            <p style={lede}>The first two tests make learning personal. The fourth makes it closed loop.</p>
          </div>
          <div style={grid(240)}>
            {[
              "Does it start from a gap that was measured, against a named role or a real posting, rather than a topic you chose?",
              "Is it framed for that role? The same subject should read differently for a sales leader and for a software engineer.",
              "Is it small enough to finish? One named gap at a time, in short sprints.",
              "Does finishing it move something you can see: your resume, your remaining gaps, the jobs you match?",
            ].map((t, i) => (
              <div key={i} style={card}>
                <div style={{ fontSize: 13, color: "var(--ac)", fontWeight: 600, marginBottom: 8 }}>Test {i + 1}</div>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="sect">
        <div className="wrap">
          <span style={pill}>The loop, closed</span>
          <div style={headRow}>
            <h2 style={h2}>Same job. Same person. Two gaps closed.</h2>
            <p style={lede}>An example of what step 4 looks like. The job did not change. The resume did, without anyone editing it.</p>
          </div>
          <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 22, alignItems: "center", maxWidth: 900 }}>
            <Score score={58} band="Stretch" good={false} chips={[{ s: "Excel", ok: true }, { s: "SQL, missing", ok: false }, { s: "Statistics, missing", ok: false }]} />
            <div style={{ textAlign: "center", fontSize: 14, color: "var(--tx2)" }}>
              <div style={{ fontSize: 30, color: "var(--ac)" }}>&rarr;</div>
              two sprints, built for this gap
            </div>
            <Score score={81} band="Good fit" good chips={[{ s: "Excel", ok: true }, { s: "SQL", ok: true }, { s: "Statistics", ok: true }]} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sect sect--alt">
        <div className="wrap">
          <span style={pill}>FAQ</span>
          <div style={headRow}>
            <h2 style={h2}>Questions people ask about the loop.</h2>
            <p style={lede}>
              For the full loop, end to end, see{" "}
              <Link href="/how-it-works" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>how it works</Link>.
            </p>
          </div>
          {/* Same accordion markup as the homepage FAQ */}
          <div style={{ marginTop: 52 }}>
            {FAQ.map((f, i) => (
              <details key={f.q} open={i === 0} style={{ borderBottom: "1px solid var(--line)" }}>
                <summary style={{ listStyle: "none", cursor: "pointer", padding: "26px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, fontSize: 19, fontWeight: 500 }}>
                  {f.q}
                  <span style={{ flex: "0 0 auto", color: "var(--tx2)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" width="20" height="20" strokeWidth="1.7" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p style={{ padding: "0 0 26px", maxWidth: 820, fontSize: 16, lineHeight: 1.68, color: "var(--tx2)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA, same band as the other feature pages */}
      <section aria-label="Get started with SkillDrift" style={{ position: "relative", width: "100%", overflow: "hidden", backgroundColor: "#5B49B4", backgroundImage: "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px),linear-gradient(180deg, #6A55C8 0%, #5B49B6 46%, #4B3C99 100%)", backgroundSize: "120px 120px, 120px 120px, 100% 100%" }}>
        <div className="wrap" style={{ position: "relative", paddingTop: 88, paddingBottom: 88, textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px,3.2vw,44px)", lineHeight: 1.14, fontWeight: 600, letterSpacing: "-0.025em", color: "#FFFFFF" }}>Start the loop with your resume.</h2>
          <p style={{ margin: "20px auto 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,.80)" }}>
            See your gaps against the role you want, then start the first lesson built for your gap.
          </p>
          <div style={{ marginTop: 34, display: "flex", alignItems: "center", justifyContent: "center", gap: 30, flexWrap: "wrap" }}>
            <a href={cta("closing_primary")} style={{ height: 56, padding: "0 36px", borderRadius: 14, background: "#FFFFFF", color: "#1A1330", fontSize: 16.5, fontWeight: 500, display: "inline-flex", alignItems: "center" }}>
              See your gaps
            </a>
          </div>
          <p style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,.62)" }}>The gap analysis is free</p>
        </div>
      </section>
    </main>
      <SiteFooter campaign={CAMPAIGN} />
    </div>
  );
}
