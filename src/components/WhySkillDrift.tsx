import { RingMark } from "./ScoreRing";

/*
 * The user's answer to "why check this in SkillDrift?" on the role and
 * in-demand skill pages: three things a list of skills, a chatbot or a job
 * board does not do. Kept short; the detail lives on the feature pages.
 */
export default function WhySkillDrift({ role }: { role?: string }) {
  const jobs = role ? `${role} jobs` : "jobs in this field";
  const items = [
    {
      h: `Real ${jobs}, scored for you`,
      b: `Each one scored out of 100 against your resume, with the skills you already show and the ones to close named.`,
    },
    {
      h: "A plan that moves your scores",
      b: "Learning built for each gap and sized to your hours. Finish it and the certificate goes into your resume, and the jobs that ask for that skill move up.",
    },
    {
      h: "Ready for the interview",
      b: `Practise the ${role ?? "real"} interview out loud and get an honest score out of 10, with the weak answers turned into a plan.`,
    },
  ];
  return (
    <div style={{ marginTop: 36 }}>
      <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>Why check this in SkillDrift?</h3>
      <ul
        style={{
          listStyle: "none",
          margin: "18px 0 0",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))",
          gap: 16,
        }}
      >
        {items.map((it) => (
          <li
            key={it.h}
            style={{ padding: "20px 22px", borderRadius: 16, border: "1px solid var(--line)", background: "var(--card)" }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, fontWeight: 600 }}>
              <RingMark size={16} />
              {it.h}
            </span>
            <span style={{ display: "block", marginTop: 8, fontSize: 14.5, lineHeight: 1.6, color: "var(--tx2)" }}>{it.b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
